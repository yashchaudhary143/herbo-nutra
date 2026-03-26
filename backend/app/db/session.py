from collections.abc import Generator

from fastapi import Request
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import Settings, get_settings

_ENGINE_CACHE: dict[str, object] = {}


def _connect_args(database_url: str) -> dict[str, bool]:
    if database_url.startswith("sqlite"):
        return {"check_same_thread": False}
    return {}


def get_engine(settings: Settings | None = None):
    active_settings = settings or get_settings()
    cache_key = active_settings.database_url
    engine = _ENGINE_CACHE.get(cache_key)
    if engine is None:
        engine = create_engine(
            active_settings.database_url,
            future=True,
            pool_pre_ping=True,
            connect_args=_connect_args(active_settings.database_url),
        )
        _ENGINE_CACHE[cache_key] = engine
    return engine


def get_session_factory(settings: Settings | None = None):
    engine = get_engine(settings)
    return sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


def get_db(request: Request) -> Generator[Session, None, None]:
    session_factory = request.app.state.session_factory
    db = session_factory()
    try:
        yield db
    finally:
        db.close()

