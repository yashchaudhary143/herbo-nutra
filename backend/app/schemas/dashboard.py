from pydantic import BaseModel


class DashboardStats(BaseModel):
    categories: int
    products: int
    inquiries: int
    new_inquiries: int

