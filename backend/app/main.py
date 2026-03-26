from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.admin import router as admin_router
from app.api.admin_auth import router as admin_auth_router
from app.api.public import router as public_router
from app.core.config import Settings, get_settings
from app.db.base import Base
from app.db.seed import bootstrap_admin, seed_sample_catalog
from app.db.session import get_engine, get_session_factory


def create_app(settings: Settings | None = None) -> FastAPI:
    active_settings = settings or get_settings()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        engine = get_engine(active_settings)
        if active_settings.auto_create_tables:
            Base.metadata.create_all(bind=engine)
            session_factory = get_session_factory(active_settings)
            session = session_factory()
            try:
                bootstrap_admin(session, active_settings)
                if active_settings.seed_sample_data:
                    seed_sample_catalog(session)
            finally:
                session.close()
        yield

    app = FastAPI(title=active_settings.app_name, lifespan=lifespan)
    app.state.settings = active_settings
    app.state.session_factory = get_session_factory(active_settings)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=active_settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(public_router, prefix=active_settings.api_prefix)
    app.include_router(admin_auth_router, prefix=active_settings.api_prefix)
    app.include_router(admin_router, prefix=active_settings.api_prefix)
    return app


app = create_app()

