from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.category import CategoryRead


class ProductBase(BaseModel):
    category_id: int
    common_name: str = Field(min_length=2, max_length=255)
    botanical_name: str = Field(min_length=2, max_length=255)
    specification: str = Field(min_length=2)
    sort_order: int = 0
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    category_id: int | None = None
    common_name: str | None = Field(default=None, min_length=2, max_length=255)
    botanical_name: str | None = Field(default=None, min_length=2, max_length=255)
    specification: str | None = Field(default=None, min_length=2)
    sort_order: int | None = None
    is_active: bool | None = None


class ProductRead(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    category: CategoryRead | None = None


class PaginatedProducts(BaseModel):
    items: list[ProductRead]
    total: int
    page: int
    limit: int


class CategoryProductsResponse(PaginatedProducts):
    category: CategoryRead

