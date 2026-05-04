"""Add testing methods used by product upload sheets."""

from datetime import UTC, datetime

from alembic import op
import sqlalchemy as sa

revision = "0004_add_excel_upload_testing_methods"
down_revision = "0003_testing_methods"
branch_labels = None
depends_on = None


METHODS = [
    {
        "name": "Titration",
        "slug": "titration",
        "description": "Titration-based assay for routine active marker and compound strength checks.",
        "sort_order": 10,
    },
    {
        "name": "Gravimetry",
        "slug": "gravimetry",
        "description": "Gravimetric analysis for residue, solids, ash, and weight-based quality measurements.",
        "sort_order": 11,
    },
    {
        "name": "ELISA",
        "slug": "elisa",
        "description": "Enzyme-linked immunosorbent assay for targeted protein and bioactive screening.",
        "sort_order": 12,
    },
    {
        "name": "Kjeldahl Method",
        "slug": "kjeldahl-method",
        "description": "Kjeldahl nitrogen analysis for protein and nitrogen content estimation.",
        "sort_order": 13,
    },
]


def _table_exists(table_name: str) -> bool:
    inspector = sa.inspect(op.get_bind())
    return table_name in inspector.get_table_names()


def upgrade() -> None:
    if not _table_exists("methods"):
        return

    bind = op.get_bind()
    now = datetime.now(UTC)
    for method in METHODS:
        existing = bind.execute(
            sa.text("SELECT id FROM methods WHERE slug = :slug OR name = :name"),
            {"slug": method["slug"], "name": method["name"]},
        ).first()
        if existing:
            bind.execute(
                sa.text(
                    """
                    UPDATE methods
                    SET name = :name,
                        slug = :slug,
                        description = :description,
                        sort_order = :sort_order,
                        is_active = :is_active,
                        updated_at = :updated_at
                    WHERE id = :id
                    """
                ),
                {
                    **method,
                    "id": existing[0],
                    "is_active": True,
                    "updated_at": now,
                },
            )
            continue

        bind.execute(
            sa.text(
                """
                INSERT INTO methods
                    (name, slug, description, sort_order, is_active, created_at, updated_at)
                VALUES
                    (:name, :slug, :description, :sort_order, :is_active, :created_at, :updated_at)
                """
            ),
            {
                **method,
                "is_active": True,
                "created_at": now,
                "updated_at": now,
            },
        )


def downgrade() -> None:
    if not _table_exists("methods"):
        return

    bind = op.get_bind()
    for method in METHODS:
        bind.execute(sa.text("DELETE FROM methods WHERE slug = :slug"), {"slug": method["slug"]})
