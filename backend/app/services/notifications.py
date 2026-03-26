import smtplib
from email.message import EmailMessage

import httpx

from app.core.config import Settings
from app.models import Inquiry


def _format_inquiry_message(settings: Settings, inquiry: Inquiry) -> str:
    return (
        f"New inquiry for {settings.company_name}\n\n"
        f"Source: {inquiry.source}\n"
        f"Name: {inquiry.name}\n"
        f"Company: {inquiry.company_name}\n"
        f"Email: {inquiry.email}\n"
        f"Phone: {inquiry.phone}\n"
        f"Requirement: {inquiry.product_requirement}\n\n"
        f"Message:\n{inquiry.message}"
    )


def send_email_notification(settings: Settings, inquiry: Inquiry) -> str:
    if not settings.smtp_enabled:
        return "skipped"

    message = EmailMessage()
    message["Subject"] = f"New B2B inquiry from {inquiry.company_name}"
    message["From"] = settings.smtp_from_email
    message["To"] = settings.inquiry_notification_email
    message.set_content(_format_inquiry_message(settings, inquiry))

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username and settings.smtp_password:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(message)
    except Exception:
        return "failed"

    return "sent"


def send_whatsapp_notification(settings: Settings, inquiry: Inquiry) -> str:
    if not settings.whatsapp_enabled:
        return "skipped"

    try:
        response = httpx.post(
            f"{settings.whatsapp_api_base_url}/{settings.whatsapp_phone_number_id}/messages",
            headers={
                "Authorization": f"Bearer {settings.whatsapp_access_token}",
                "Content-Type": "application/json",
            },
            json={
                "messaging_product": "whatsapp",
                "to": settings.whatsapp_recipient_number,
                "type": "text",
                "text": {
                    "preview_url": False,
                    "body": _format_inquiry_message(settings, inquiry)[:4000],
                },
            },
            timeout=20.0,
        )
        response.raise_for_status()
    except Exception:
        return "failed"

    return "sent"

