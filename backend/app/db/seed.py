from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.security import hash_password
from app.models import AdminUser, Category, Product

SAMPLE_CATALOG = [
    {
        "name": "Herbal Extracts",
        "slug": "herbal-extracts",
        "description": "Standardized botanical extracts for nutraceutical and ayurvedic formulations.",
        "sort_order": 1,
        "products": [
            {
                "common_name": "Ashwagandha Extract",
                "botanical_name": "Withania somnifera",
                "specification": "Withanolides 5%, 10%, water/alcohol soluble",
                "sort_order": 1,
            },
            {
                "common_name": "Turmeric Extract",
                "botanical_name": "Curcuma longa",
                "specification": "Curcuminoids 95%, low microbial load",
                "sort_order": 2,
            },
        ],
    },
    {
        "name": "Amino Acids",
        "slug": "amino-acids",
        "description": "High-purity amino acid ingredients for functional blends.",
        "sort_order": 2,
        "products": [
            {
                "common_name": "L-Arginine",
                "botanical_name": "Fermentation Derived",
                "specification": "USP grade, 98.5% min assay",
                "sort_order": 1,
            },
            {
                "common_name": "L-Carnitine",
                "botanical_name": "Synthetic/Fermentation Derived",
                "specification": "Food grade, 98% min",
                "sort_order": 2,
            },
        ],
    },
    {
        "name": "Vitamins & Minerals",
        "slug": "vitamins-minerals",
        "description": "Fortification ingredients aligned with export-ready compliance needs.",
        "sort_order": 3,
        "products": [
            {
                "common_name": "Vitamin C",
                "botanical_name": "Ascorbic Acid",
                "specification": "Food grade, 99% min",
                "sort_order": 1,
            },
            {
                "common_name": "Zinc Gluconate",
                "botanical_name": "Mineral Chelate",
                "specification": "USP grade, white free-flowing powder",
                "sort_order": 2,
            },
        ],
    },
]


def bootstrap_admin(session: Session, settings: Settings) -> None:
    user = session.scalar(select(AdminUser).where(AdminUser.email == settings.admin_email))
    if user:
        return

    session.add(
        AdminUser(
            email=settings.admin_email,
            password_hash=hash_password(settings.admin_password),
            is_active=True,
        )
    )
    session.commit()


def seed_sample_catalog(session: Session) -> None:
    existing_categories = session.scalar(select(func.count(Category.id)))
    if existing_categories:
        return

    for category_data in SAMPLE_CATALOG:
        category_payload = {key: value for key, value in category_data.items() if key != "products"}
        products = category_data["products"]
        category = Category(**category_payload)
        session.add(category)
        session.flush()
        for product_data in products:
            session.add(Product(category_id=category.id, **product_data))
    session.commit()
