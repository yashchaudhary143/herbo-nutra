"""Add product forms and remove WhatsApp inquiry status."""

from alembic import op
import sqlalchemy as sa

revision = "0002_forms_and_email_only_inquiries"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def _table_exists(table_name: str) -> bool:
    inspector = sa.inspect(op.get_bind())
    return table_name in inspector.get_table_names()


def _column_exists(table_name: str, column_name: str) -> bool:
    if not _table_exists(table_name):
        return False
    inspector = sa.inspect(op.get_bind())
    return any(column["name"] == column_name for column in inspector.get_columns(table_name))


def upgrade() -> None:
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

    if _column_exists("inquiries", "whatsapp_status"):
        op.drop_column("inquiries", "whatsapp_status")


def downgrade() -> None:
    if _table_exists("product_forms"):
        op.drop_table("product_forms")

    if _table_exists("forms"):
        op.drop_index("ix_forms_name", table_name="forms")
        op.drop_index("ix_forms_slug", table_name="forms")
        op.drop_index("ix_forms_id", table_name="forms")
        op.drop_table("forms")

    if _table_exists("inquiries") and not _column_exists("inquiries", "whatsapp_status"):
        op.add_column(
            "inquiries",
            sa.Column("whatsapp_status", sa.String(length=50), nullable=False, server_default="pending"),
        )
