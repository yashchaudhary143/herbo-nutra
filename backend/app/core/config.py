from functools import lru_cache

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "Herbo Nutra Extract API"
    environment: str = "development"
    api_prefix: str = "/api"
    database_url: str = "sqlite:///./herbo_nutra.db"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 1440
    admin_email: str = "admin@herbonutra.com"
    admin_password: str = "ChangeMe123!"
    frontend_url: str = "http://localhost:3000"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    secure_cookies: bool = False
    auto_create_tables: bool = True
    seed_sample_data: bool = True

    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_use_tls: bool = True
    smtp_from_email: str | None = None
    inquiry_notification_email: str | None = None

    company_name: str = "Herbo Nutra Extract Pvt. Ltd."
    company_email: str = "info@herbonutraextract.com"
    company_phone: str = "+91 98765 43210"
    company_address: str = (
        "Plot 18, Herbal Industrial Estate, Vadodara, Gujarat 390010, India"
    )
    google_maps_embed_url: str = (
        "https://www.google.com/maps?q=Vadodara%2C%20Gujarat&z=13&output=embed"
    )

    @computed_field  # type: ignore[misc]
    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @computed_field  # type: ignore[misc]
    @property
    def smtp_enabled(self) -> bool:
        return bool(self.smtp_host and self.smtp_from_email and self.inquiry_notification_email)


@lru_cache
def get_settings() -> Settings:
    return Settings()
