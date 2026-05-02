from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class InquiryCreate(BaseModel):
    source: str = Field(default="inquiry", max_length=50)
    name: str = Field(min_length=2, max_length=255)
    company_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=50)
    product_requirement: str = Field(default="", max_length=255)
    message: str = Field(default="", max_length=4000)

    @model_validator(mode="after")
    def require_product_or_message(self) -> "InquiryCreate":
        if not self.product_requirement.strip() and not self.message.strip():
            raise ValueError("Select a product or add a short message.")
        return self


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
