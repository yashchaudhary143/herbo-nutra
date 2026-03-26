from fastapi import HTTPException
import httpx

from app.core.config import Settings


async def verify_turnstile(
    settings: Settings, token: str | None, remote_ip: str | None = None
) -> None:
    if not settings.turnstile_enabled:
        return

    if not token:
        raise HTTPException(status_code=400, detail="Captcha verification is required.")

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": settings.turnstile_secret_key,
                "response": token,
                "remoteip": remote_ip,
            },
        )
        response.raise_for_status()
        payload = response.json()
        if not payload.get("success"):
            raise HTTPException(status_code=400, detail="Captcha verification failed.")

