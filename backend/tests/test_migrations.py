from pathlib import Path

from alembic import command
from alembic.config import Config
from sqlalchemy import create_engine, inspect, text

from app.core.config import get_settings


def test_alembic_upgrade_head_matches_runtime_tables(tmp_path, monkeypatch):
    db_path = tmp_path / "migrated.db"
    database_url = f"sqlite:///{db_path}"
    backend_dir = Path(__file__).resolve().parents[1]

    monkeypatch.setenv("DATABASE_URL", database_url)
    get_settings.cache_clear()

    try:
        config = Config(str(backend_dir / "alembic.ini"))
        config.set_main_option("script_location", str(backend_dir / "alembic"))
        command.upgrade(config, "head")
    finally:
        get_settings.cache_clear()

    engine = create_engine(database_url)
    inspector = inspect(engine)

    tables = set(inspector.get_table_names())
    assert {"methods", "product_methods"}.issubset(tables)
    assert "product_forms" not in tables
    assert "whatsapp_status" not in {
        column["name"] for column in inspector.get_columns("inquiries")
    }
    with engine.connect() as connection:
        method_slugs = {
            row[0]
            for row in connection.execute(
                text("SELECT slug FROM methods WHERE slug IN ('titration', 'gravimetry', 'elisa', 'kjeldahl-method')")
            )
        }
    assert method_slugs == {"titration", "gravimetry", "elisa", "kjeldahl-method"}
