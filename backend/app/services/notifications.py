import smtplib
from email.message import EmailMessage

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
