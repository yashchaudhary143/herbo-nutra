from fastapi import Cookie, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.security import decode_access_token
from app.db.session import get_db
from app.models import AdminUser


def get_settings_dependency(request: Request) -> Settings:
    return request.app.state.settings


def get_current_admin(
    token: str | None = Cookie(default=None, alias="herbo_admin_token"),
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings_dependency),
) -> AdminUser:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    try:
        payload = decode_access_token(token, settings)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication token"
        ) from exc

    admin = db.query(AdminUser).filter(AdminUser.email == payload["sub"]).first()
    if not admin or not admin.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return admin

