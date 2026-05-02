from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MethodBase(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=255, pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
    description: str = Field(min_length=2)
    sort_order: int = 0
    is_active: bool = True


class MethodCreate(MethodBase):
    pass


class MethodUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=255)
    slug: str | None = Field(
        default=None,
        min_length=2,
        max_length=255,
        pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
    )
    description: str | None = Field(default=None, min_length=2)
    sort_order: int | None = None
    is_active: bool | None = None


class MethodRead(MethodBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
