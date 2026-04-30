from collections.abc import Generator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import create_app


@pytest.fixture()
def settings(tmp_path: Path) -> Settings:
    db_path = tmp_path / "test.db"
    return Settings(
        database_url=f"sqlite:///{db_path}",
        secret_key="test-secret-key-with-sufficient-length-123",
        admin_email="admin@example.com",
        admin_password="Password123!",
        seed_sample_data=True,
        smtp_host=None,
        smtp_from_email=None,
        inquiry_notification_email=None,
    )


@pytest.fixture()
def client(settings: Settings) -> Generator[TestClient, None, None]:
    app = create_app(settings)
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def admin_cookie(client: TestClient) -> dict[str, str]:
    response = client.post(
        "/api/admin/auth/login",
        json={"email": "admin@example.com", "password": "Password123!"},
    )
    assert response.status_code == 200
    cookie = response.cookies.get("herbo_admin_token")
    assert cookie
    return {"herbo_admin_token": cookie}
