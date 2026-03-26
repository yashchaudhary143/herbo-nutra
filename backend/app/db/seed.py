from __future__ import annotations

from collections.abc import Iterable

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.security import hash_password
from app.models import AdminUser, Category, Product

CATEGORY_DEFINITIONS = [
    {
        "name": "Herbal Extracts",
        "slug": "herbal-extracts",
        "description": "Standardized botanical extracts for nutraceutical and ayurvedic formulations.",
        "sort_order": 1,
    },
    {
        "name": "Mushroom Extracts",
        "slug": "mushroom-extracts",
        "description": "Functional mushroom ingredients for immunity, cognition, and wellness formulations.",
        "sort_order": 2,
    },
    {
        "name": "Specialty Botanicals",
        "slug": "specialty-botanicals",
        "description": "Polyphenols, bioactives, and plant actives for targeted formulation programs.",
        "sort_order": 3,
    },
    {
        "name": "Amino Acids",
        "slug": "amino-acids",
        "description": "High-purity amino acid ingredients for functional blends.",
        "sort_order": 4,
    },
    {
        "name": "Vitamins & Minerals",
        "slug": "vitamins-minerals",
        "description": "Fortification ingredients aligned with export-ready compliance needs.",
        "sort_order": 5,
    },
]

SEED_PRODUCTS = [
    {
        "common_name": "Turmeric",
        "botanical_name": "Curcuma longa",
        "specification": "Curcumin 95%",
    },
    {
        "common_name": "Maitake Mushroom",
        "botanical_name": "Grifola frondosa",
        "specification": "Beta-glucans 20-30%",
    },
    {
        "common_name": "Milk Thistle",
        "botanical_name": "Silybum marianum",
        "specification": "Silymarin 70-80%",
    },
    {
        "common_name": "Grape Seed",
        "botanical_name": "Vitis vinifera",
        "specification": "Proanthocyanidins 95%",
    },
    {
        "common_name": "Green Tea",
        "botanical_name": "Camellia sinensis",
        "specification": "EGCG 40-50%",
    },
    {
        "common_name": "Black Pepper",
        "botanical_name": "Piper nigrum",
        "specification": "Piperine 95%",
    },
    {
        "common_name": "Resveratrol (from Knotweed)",
        "botanical_name": "Polygonum cuspidatum",
        "specification": "Trans-Resveratrol 98-99%",
    },
    {
        "common_name": "Boswellia",
        "botanical_name": "Boswellia serrata",
        "specification": "Boswellic acids 65%",
    },
    {
        "common_name": "Reishi Mushroom",
        "botanical_name": "Ganoderma lucidum",
        "specification": "Polysaccharides 20-30%",
    },
    {
        "common_name": "Mucuna Pruriens",
        "botanical_name": "Mucuna pruriens",
        "specification": "L-DOPA 15-20%",
    },
    {
        "common_name": "Ginkgo Biloba",
        "botanical_name": "Ginkgo biloba",
        "specification": "24% Flavone glycosides",
    },
    {
        "common_name": "Bacopa",
        "botanical_name": "Bacopa monnieri",
        "specification": "Bacosides 20-50%",
    },
    {
        "common_name": "Ginseng",
        "botanical_name": "Panax ginseng",
        "specification": "Ginsenosides 5-10%",
    },
    {
        "common_name": "Lion's Mane Mushroom",
        "botanical_name": "Hericium erinaceus",
        "specification": "Polysaccharides 20-30%",
    },
    {
        "common_name": "Garlic",
        "botanical_name": "Allium sativum",
        "specification": "Allicin 1-5%",
    },
    {
        "common_name": "Olive Leaf",
        "botanical_name": "Olea europaea",
        "specification": "Oleuropein 10-40%",
    },
    {
        "common_name": "Ginger",
        "botanical_name": "Zingiber officinale",
        "specification": "Gingerols 5%",
    },
    {
        "common_name": "Ashwagandha Extract",
        "botanical_name": "Withania somnifera",
        "specification": "Withanolides 5%, 10%, water/alcohol soluble",
    },
    {
        "common_name": "Turmeric Extract",
        "botanical_name": "Curcuma longa",
        "specification": "Curcuminoids 95%, low microbial load",
    },
    {
        "common_name": "L-Arginine",
        "botanical_name": "Fermentation Derived",
        "specification": "USP grade, 98.5% min assay",
    },
    {
        "common_name": "L-Carnitine",
        "botanical_name": "Synthetic/Fermentation Derived",
        "specification": "Food grade, 98% min",
    },
    {
        "common_name": "Vitamin C",
        "botanical_name": "Ascorbic Acid",
        "specification": "Food grade, 99% min",
    },
    {
        "common_name": "Zinc Gluconate",
        "botanical_name": "Mineral Chelate",
        "specification": "USP grade, white free-flowing powder",
    },
]


def infer_category_slug(product: dict[str, str]) -> str:
    name = f"{product['common_name']} {product['botanical_name']} {product['specification']}".lower()

    if "mushroom" in name or any(keyword in name for keyword in ("grifola frondosa", "ganoderma lucidum", "hericium erinaceus")):
        return "mushroom-extracts"

    if any(
        keyword in name
        for keyword in (
            "grape seed",
            "resveratrol",
            "green tea",
            "milk thistle",
            "silymarin",
            "proanthocyanidins",
            "egcg",
        )
    ):
        return "specialty-botanicals"

    if any(keyword in name for keyword in ("arginine", "carnitine", "vitamin", "zinc")):
        return "amino-acids" if "arginine" in name or "carnitine" in name else "vitamins-minerals"

    return "herbal-extracts"


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


def _upsert_category(session: Session, payload: dict[str, object]) -> Category:
    category = session.scalar(select(Category).where(Category.slug == payload["slug"]))
    if category:
        for key, value in payload.items():
            setattr(category, key, value)
        session.add(category)
        return category

    category = Category(**payload)
    session.add(category)
    session.flush()
    return category


def _upsert_product(session: Session, category_id: int, payload: dict[str, object]) -> None:
    product = session.scalar(
        select(Product).where(
            Product.category_id == category_id,
            Product.common_name == payload["common_name"],
        )
    )
    if product:
        for key, value in payload.items():
            setattr(product, key, value)
        session.add(product)
        return

    session.add(Product(category_id=category_id, **payload))


def seed_sample_catalog(session: Session) -> None:
    categories: dict[str, Category] = {}

    for category_payload in CATEGORY_DEFINITIONS:
        category = _upsert_category(session, category_payload)
        categories[category.slug] = category

    session.flush()

    for index, product_data in enumerate(SEED_PRODUCTS, start=1):
        category_slug = infer_category_slug(product_data)
        category = categories[category_slug]
        payload = {
            **product_data,
            "sort_order": index,
            "is_active": True,
        }
        _upsert_product(session, category.id, payload)

    session.commit()
