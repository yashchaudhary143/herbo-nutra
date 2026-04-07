from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_admin
from app.db.session import get_db
from app.models import Category, Form, Inquiry, Product
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate
from app.schemas.dashboard import DashboardStats
from app.schemas.form import FormCreate, FormRead, FormUpdate
from app.schemas.inquiry import InquiryRead, InquiryUpdate, PaginatedInquiries
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/dashboard", response_model=DashboardStats)
def dashboard(_: object = Depends(get_current_admin), db: Session = Depends(get_db)) -> DashboardStats:
    return DashboardStats(
        categories=db.query(func.count(Category.id)).scalar() or 0,
        products=db.query(func.count(Product.id)).scalar() or 0,
        inquiries=db.query(func.count(Inquiry.id)).scalar() or 0,
        new_inquiries=db.query(func.count(Inquiry.id)).filter(Inquiry.status == "new").scalar() or 0,
    )


@router.get("/forms", response_model=list[FormRead])
def admin_forms(_: object = Depends(get_current_admin), db: Session = Depends(get_db)) -> list[FormRead]:
    items = db.query(Form).order_by(Form.sort_order.asc(), Form.name.asc()).all()
    return [FormRead.model_validate(item) for item in items]


@router.post("/forms", response_model=FormRead, status_code=status.HTTP_201_CREATED)
def create_form(
    payload: FormCreate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> FormRead:
    existing = db.query(Form).filter((Form.slug == payload.slug) | (Form.name == payload.name)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Form name or slug already exists")

    item = Form(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return FormRead.model_validate(item)


@router.put("/forms/{form_id}", response_model=FormRead)
def update_form(
    form_id: int,
    payload: FormUpdate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> FormRead:
    item = db.get(Form, form_id)
    if not item:
        raise HTTPException(status_code=404, detail="Form not found")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.add(item)
    db.commit()
    db.refresh(item)
    return FormRead.model_validate(item)


@router.delete("/forms/{form_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_form(
    form_id: int,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> None:
    item = db.get(Form, form_id)
    if not item:
        raise HTTPException(status_code=404, detail="Form not found")
    db.delete(item)
    db.commit()


@router.get("/categories", response_model=list[CategoryRead])
def admin_categories(_: object = Depends(get_current_admin), db: Session = Depends(get_db)) -> list[CategoryRead]:
    rows = (
        db.query(Category, func.count(Product.id).label("product_count"))
        .outerjoin(Product, Product.category_id == Category.id)
        .group_by(Category.id)
        .order_by(Category.sort_order.asc(), Category.name.asc())
        .all()
    )
    return [
        CategoryRead.model_validate({**category.__dict__, "product_count": product_count})
        for category, product_count in rows
    ]


@router.post("/categories", response_model=CategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(
    payload: CategoryCreate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> CategoryRead:
    existing = db.query(Category).filter((Category.slug == payload.slug) | (Category.name == payload.name)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category name or slug already exists")

    category = Category(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return CategoryRead.model_validate({**category.__dict__, "product_count": 0})


@router.put("/categories/{category_id}", response_model=CategoryRead)
def update_category(
    category_id: int,
    payload: CategoryUpdate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> CategoryRead:
    category = db.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(category, key, value)
    db.add(category)
    db.commit()
    db.refresh(category)
    product_count = db.query(func.count(Product.id)).filter(Product.category_id == category.id).scalar() or 0
    return CategoryRead.model_validate({**category.__dict__, "product_count": product_count})


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(
    category_id: int,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> None:
    category = db.get(Category, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()


@router.get("/products", response_model=list[ProductRead])
def admin_products(
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> list[ProductRead]:
    items = (
        db.query(Product)
        .options(joinedload(Product.category), joinedload(Product.forms))
        .order_by(Product.sort_order.asc(), Product.common_name.asc())
        .all()
    )
    return [ProductRead.model_validate(item) for item in items]


@router.post("/products", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> ProductRead:
    category = db.get(Category, payload.category_id)
    if not category:
        raise HTTPException(status_code=400, detail="Category not found")

    form_ids = payload.form_ids
    forms = db.query(Form).filter(Form.id.in_(form_ids)).all() if form_ids else []
    if form_ids and len(forms) != len(set(form_ids)):
        raise HTTPException(status_code=400, detail="One or more forms were not found")

    product = Product(**payload.model_dump(exclude={"form_ids"}))
    product.forms = forms
    db.add(product)
    db.commit()
    db.refresh(product)
    product = (
        db.query(Product)
        .options(joinedload(Product.category), joinedload(Product.forms))
        .filter(Product.id == product.id)
        .first()
    )
    return ProductRead.model_validate(product)


@router.put("/products/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> ProductRead:
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    updates = payload.model_dump(exclude_unset=True)
    if "category_id" in updates and not db.get(Category, updates["category_id"]):
        raise HTTPException(status_code=400, detail="Category not found")
    if "form_ids" in updates:
        form_ids = updates.pop("form_ids") or []
        forms = db.query(Form).filter(Form.id.in_(form_ids)).all() if form_ids else []
        if len(forms) != len(set(form_ids)):
            raise HTTPException(status_code=400, detail="One or more forms were not found")
        product.forms = forms

    for key, value in updates.items():
        setattr(product, key, value)
    db.add(product)
    db.commit()
    refreshed = (
        db.query(Product)
        .options(joinedload(Product.category), joinedload(Product.forms))
        .filter(Product.id == product.id)
        .first()
    )
    return ProductRead.model_validate(refreshed)


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> None:
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()


@router.get("/inquiries", response_model=PaginatedInquiries)
def list_inquiries(
    status_filter: str | None = Query(default=None, alias="status"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> PaginatedInquiries:
    query = db.query(Inquiry)
    if status_filter:
        query = query.filter(Inquiry.status == status_filter)
    total = query.count()
    items = (
        query.order_by(Inquiry.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return PaginatedInquiries(
        items=[InquiryRead.model_validate(item) for item in items],
        total=total,
        page=page,
        limit=limit,
    )


@router.patch("/inquiries/{inquiry_id}", response_model=InquiryRead)
def update_inquiry(
    inquiry_id: int,
    payload: InquiryUpdate,
    _: object = Depends(get_current_admin),
    db: Session = Depends(get_db),
) -> InquiryRead:
    inquiry = db.get(Inquiry, inquiry_id)
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    inquiry.status = payload.status
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return InquiryRead.model_validate(inquiry)
