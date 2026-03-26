from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_settings_dependency
from app.core.config import Settings
from app.db.session import get_db
from app.models import Category, Inquiry, Product
from app.schemas.category import CategoryRead
from app.schemas.inquiry import InquiryCreate, InquirySubmissionResponse
from app.schemas.product import CategoryProductsResponse, PaginatedProducts, ProductRead
from app.services import notifications
from app.services.turnstile import verify_turnstile

router = APIRouter(tags=["public"])


def _search_filter(search: str | None):
    if not search:
        return None
    pattern = f"%{search.lower()}%"
    return or_(
        func.lower(Product.common_name).like(pattern),
        func.lower(Product.botanical_name).like(pattern),
        func.lower(Product.specification).like(pattern),
    )


@router.get("/categories", response_model=list[CategoryRead])
def list_categories(db: Session = Depends(get_db)) -> list[CategoryRead]:
    rows = (
        db.query(Category, func.count(Product.id).label("product_count"))
        .outerjoin(Product, Product.category_id == Category.id)
        .filter(Category.is_active.is_(True))
        .group_by(Category.id)
        .order_by(Category.sort_order.asc(), Category.name.asc())
        .all()
    )
    return [
        CategoryRead.model_validate(
            {
                **category.__dict__,
                "product_count": product_count,
            }
        )
        for category, product_count in rows
    ]


@router.get("/products", response_model=PaginatedProducts)
def list_products(
    search: str | None = None,
    category: str | None = None,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
) -> PaginatedProducts:
    query = db.query(Product).options(joinedload(Product.category)).join(Category)
    query = query.filter(Product.is_active.is_(True), Category.is_active.is_(True))

    if category:
        query = query.filter(Category.slug == category)

    search_clause = _search_filter(search)
    if search_clause is not None:
        query = query.filter(search_clause)

    total = query.count()
    items = (
        query.order_by(Category.sort_order.asc(), Product.sort_order.asc(), Product.common_name.asc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return PaginatedProducts(
        items=[ProductRead.model_validate(item) for item in items],
        total=total,
        page=page,
        limit=limit,
    )


@router.get("/categories/{slug}/products", response_model=CategoryProductsResponse)
def category_products(
    slug: str,
    search: str | None = None,
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
) -> CategoryProductsResponse:
    category = db.query(Category).filter(Category.slug == slug, Category.is_active.is_(True)).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    query = (
        db.query(Product)
        .options(joinedload(Product.category))
        .filter(Product.category_id == category.id, Product.is_active.is_(True))
    )

    search_clause = _search_filter(search)
    if search_clause is not None:
        query = query.filter(search_clause)

    total = query.count()
    items = (
        query.order_by(Product.sort_order.asc(), Product.common_name.asc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return CategoryProductsResponse(
        category=CategoryRead.model_validate({**category.__dict__, "product_count": total}),
        items=[ProductRead.model_validate(item) for item in items],
        total=total,
        page=page,
        limit=limit,
    )


@router.post("/inquiries", response_model=InquirySubmissionResponse, status_code=status.HTTP_201_CREATED)
async def submit_inquiry(
    payload: InquiryCreate,
    request: Request,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings_dependency),
) -> InquirySubmissionResponse:
    await verify_turnstile(
        settings=settings,
        token=payload.turnstile_token,
        remote_ip=request.client.host if request.client else None,
    )

    inquiry = Inquiry(
        source=payload.source,
        name=payload.name,
        company_name=payload.company_name,
        email=payload.email,
        phone=payload.phone,
        product_requirement=payload.product_requirement,
        message=payload.message,
        status="new",
        email_status="pending",
        whatsapp_status="pending",
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    inquiry.email_status = notifications.send_email_notification(settings, inquiry)
    inquiry.whatsapp_status = notifications.send_whatsapp_notification(settings, inquiry)
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    return InquirySubmissionResponse(
        inquiry=inquiry,
        message="Thank you. Our team will get back to you shortly.",
        email_status=inquiry.email_status,
        whatsapp_status=inquiry.whatsapp_status,
    )
