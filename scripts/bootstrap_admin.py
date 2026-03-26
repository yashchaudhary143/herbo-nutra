#!/usr/bin/env python3
from app.core.config import get_settings
from app.db.base import Base
from app.db.seed import bootstrap_admin
from app.db.session import get_engine, get_session_factory


def main() -> None:
    settings = get_settings()
    engine = get_engine(settings)
    Base.metadata.create_all(bind=engine)
    session_factory = get_session_factory(settings)
    session = session_factory()
    try:
        bootstrap_admin(session, settings)
    finally:
        session.close()


if __name__ == "__main__":
    main()
