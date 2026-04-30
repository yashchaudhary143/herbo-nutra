from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class InquiryCreate(BaseModel):
    source: str = Field(default="inquiry", max_length=50)
    name: str = Field(min_length=2, max_length=255)
    company_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=50)
    product_requirement: str = Field(default="", max_length=255)
    message: str = Field(min_length=10, max_length=4000)


class InquiryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    source: str
    name: str
    company_name: str
    email: EmailStr
    phone: str
    product_requirement: str
    message: str
    status: str
    email_status: str
    created_at: datetime


class InquiryUpdate(BaseModel):
    status: str = Field(min_length=2, max_length=50)


class PaginatedInquiries(BaseModel):
    items: list[InquiryRead]
    total: int
    page: int
    limit: int


class InquirySubmissionResponse(BaseModel):
    inquiry: InquiryRead
    message: str
    email_status: str
