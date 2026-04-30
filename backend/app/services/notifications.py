import smtplib
from email.message import EmailMessage
import re

from app.core.config import Settings
from app.models import Inquiry


def _format_inquiry_message(settings: Settings, inquiry: Inquiry) -> str:
    requirement = inquiry.product_requirement.strip() or "Not specified"
    return (
        f"New inquiry for {settings.company_name}\n\n"
        f"Source: {inquiry.source}\n"
        f"Name: {inquiry.name}\n"
        f"Company: {inquiry.company_name}\n"
        f"Email: {inquiry.email}\n"
        f"Phone: {inquiry.phone}\n"
        f"Requirement: {requirement}\n\n"
        f"Message:\n{inquiry.message}"
    )


def _notification_recipients(settings: Settings) -> list[str]:
    if not settings.inquiry_notification_email:
        return []
    return [
        recipient.strip()
        for recipient in re.split(r"[,;\n]+", settings.inquiry_notification_email)
        if recipient.strip()
    ]


def _build_email_message(settings: Settings, inquiry: Inquiry, recipient: str) -> EmailMessage:
    message = EmailMessage()
    message["Subject"] = f"[Herbo Nutra] New B2B inquiry from {inquiry.company_name}"
    message["From"] = f"{settings.company_name} <{settings.smtp_from_email}>"
    message["To"] = recipient
    message.set_content(_format_inquiry_message(settings, inquiry))
    return message


def send_email_notification(settings: Settings, inquiry: Inquiry) -> str:
    if not settings.smtp_enabled:
        return "skipped"

    recipients = _notification_recipients(settings)
    if not recipients:
        return "skipped"

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username and settings.smtp_password:
                smtp.login(settings.smtp_username, settings.smtp_password)
            for recipient in recipients:
                smtp.send_message(_build_email_message(settings, inquiry, recipient))
    except Exception:
        return "failed"

    return "sent"
