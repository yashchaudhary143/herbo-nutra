from datetime import UTC, datetime

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_settings_dependency
from app.core.config import Settings
from app.core.security import create_access_token, verify_password
from app.db.session import get_db
from app.models import AdminUser
from app.schemas.auth import AuthResponse, LoginRequest

router = APIRouter(prefix="/admin/auth", tags=["admin-auth"])


@router.post("/login", response_model=AuthResponse)
def login(
    payload: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings_dependency),
) -> AuthResponse:
    admin = db.query(AdminUser).filter(AdminUser.email == payload.email).first()
    if not admin or not verify_password(payload.password, admin.password_hash):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return AuthResponse(email=payload.email, message="Invalid email or password.")

    admin.last_login_at = datetime.now(UTC)
    db.add(admin)
    db.commit()

    token = create_access_token(admin.email, settings)
    response.set_cookie(
        key="herbo_admin_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=settings.secure_cookies,
        max_age=settings.access_token_expire_minutes * 60,
        path="/",
    )
    return AuthResponse(email=admin.email, message="Authenticated successfully.")


@router.post("/logout", response_model=AuthResponse)
def logout(response: Response, admin: AdminUser = Depends(get_current_admin)) -> AuthResponse:
    response.delete_cookie("herbo_admin_token", path="/")
    return AuthResponse(email=admin.email, message="Logged out successfully.")

