"""Replace product formats with testing methods."""

from alembic import op
import sqlalchemy as sa

revision = "0003_testing_methods"
down_revision = "0002_forms_and_email_only_inquiries"
branch_labels = None
depends_on = None


def _table_exists(table_name: str) -> bool:
    inspector = sa.inspect(op.get_bind())
    return table_name in inspector.get_table_names()


def _index_exists(table_name: str, index_name: str) -> bool:
    if not _table_exists(table_name):
        return False
    inspector = sa.inspect(op.get_bind())
    return any(index["name"] == index_name for index in inspector.get_indexes(table_name))


def _drop_index_if_exists(index_name: str, table_name: str) -> None:
    if _index_exists(table_name, index_name):
        op.drop_index(index_name, table_name=table_name)


def upgrade() -> None:
    if not _table_exists("methods"):
        op.create_table(
            "methods",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("slug", sa.String(length=255), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        )
        op.create_index("ix_methods_id", "methods", ["id"], unique=False)
        op.create_index("ix_methods_slug", "methods", ["slug"], unique=True)
        op.create_index("ix_methods_name", "methods", ["name"], unique=True)

    if not _table_exists("product_methods"):
        op.create_table(
            "product_methods",
            sa.Column("product_id", sa.Integer(), nullable=False),
            sa.Column("method_id", sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(["product_id"], ["products.id"], ondelete="CASCADE"),
            sa.ForeignKeyConstraint(["method_id"], ["methods.id"], ondelete="CASCADE"),
            sa.PrimaryKeyConstraint("product_id", "method_id"),
        )

    if _table_exists("product_forms"):
        op.drop_table("product_forms")
    if _table_exists("forms"):
        _drop_index_if_exists("ix_forms_name", table_name="forms")
        _drop_index_if_exists("ix_forms_slug", table_name="forms")
        _drop_index_if_exists("ix_forms_id", table_name="forms")
        op.drop_table("forms")


def downgrade() -> None:
    if not _table_exists("forms"):
        op.create_table(
            "forms",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("name", sa.String(length=255), nullable=False),
            sa.Column("slug", sa.String(length=255), nullable=False),
            sa.Column("description", sa.Text(), nullable=False),
            sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
            sa.Column("is_npd_featured", sa.Boolean(), nullable=False, server_default=sa.false()),
            sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        )
        op.create_index("ix_forms_id", "forms", ["id"], unique=False)
        op.create_index("ix_forms_slug", "forms", ["slug"], unique=True)
        op.create_index("ix_forms_name", "forms", ["name"], unique=True)

    if not _table_exists("product_forms"):
        op.create_table(
            "product_forms",
            sa.Column("product_id", sa.Integer(), nullable=False),
            sa.Column("form_id", sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(["product_id"], ["products.id"], ondelete="CASCADE"),
            sa.ForeignKeyConstraint(["form_id"], ["forms.id"], ondelete="CASCADE"),
            sa.PrimaryKeyConstraint("product_id", "form_id"),
        )

    if _table_exists("product_methods"):
        op.drop_table("product_methods")
    if _table_exists("methods"):
        _drop_index_if_exists("ix_methods_name", table_name="methods")
        _drop_index_if_exists("ix_methods_slug", table_name="methods")
        _drop_index_if_exists("ix_methods_id", table_name="methods")
        op.drop_table("methods")
