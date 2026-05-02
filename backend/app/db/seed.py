from __future__ import annotations

from collections.abc import Iterable

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.security import hash_password
from app.models import AdminUser, Category, Method, Product

CATEGORY_DEFINITIONS = [
    {
        "name": "Herbal Extracts (Food Ingredients / Nutraceutical Ingredients)",
        "slug": "herbal-extracts",
        "description": "Herbal extracts, food ingredients, and nutraceutical ingredients managed through controlled sourcing and processing.",
        "sort_order": 1,
        "is_active": True,
    },
    {
        "name": "Amino Acids",
        "slug": "amino-acids",
        "description": "Amino acid ingredients produced for nutritional, functional, and specialty applications.",
        "sort_order": 2,
        "is_active": True,
    },
    {
        "name": "Plant Sourced Vitamins & Minerals",
        "slug": "plant-sourced-vitamins-minerals",
        "description": "Plant-sourced vitamin and mineral ingredients aligned with label-friendly formulation needs.",
        "sort_order": 3,
        "is_active": True,
    },
]

METHOD_DEFINITIONS = [
    {
        "name": "HPLC",
        "slug": "hplc",
        "description": "High-performance liquid chromatography for marker compound assay, potency checks, and identity support.",
        "sort_order": 1,
    },
    {
        "name": "LC-MS/MS",
        "slug": "lc-ms-ms",
        "description": "Liquid chromatography tandem mass spectrometry for sensitive multi-analyte confirmation and trace-level review.",
        "sort_order": 2,
    },
    {
        "name": "GC-MS",
        "slug": "gc-ms",
        "description": "Gas chromatography mass spectrometry for volatile compounds, aroma-linked actives, and residual solvent checks.",
        "sort_order": 3,
    },
    {
        "name": "ICP-MS",
        "slug": "icp-ms",
        "description": "Inductively coupled plasma mass spectrometry for trace elemental and heavy metal analysis.",
        "sort_order": 4,
    },
    {
        "name": "ICP-OES",
        "slug": "icp-oes",
        "description": "Inductively coupled plasma optical emission spectroscopy for elemental assay and mineral profiling.",
        "sort_order": 5,
    },
    {
        "name": "HPTLC",
        "slug": "hptlc",
        "description": "High-performance thin-layer chromatography for botanical fingerprinting and identity comparison.",
        "sort_order": 6,
    },
    {
        "name": "UV-Vis",
        "slug": "uv-vis",
        "description": "Ultraviolet-visible spectroscopy for absorbance-based assay and routine quality checks.",
        "sort_order": 7,
    },
    {
        "name": "AAS",
        "slug": "aas",
        "description": "Atomic absorption spectroscopy for targeted elemental and mineral testing.",
        "sort_order": 8,
    },
    {
        "name": "Microbiological Testing",
        "slug": "microbiological-testing",
        "description": "Microbiological testing for total counts, yeast and mold, and pathogen-related quality review.",
        "sort_order": 9,
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

    if any(keyword in name for keyword in ("arginine", "carnitine")):
        return "amino-acids"

    if any(keyword in name for keyword in ("vitamin", "zinc")):
        return "plant-sourced-vitamins-minerals"

    return "herbal-extracts"


def infer_method_slugs(product: dict[str, str], category_slug: str) -> list[str]:
    name = f"{product['common_name']} {product['botanical_name']} {product['specification']}".lower()
    method_slugs: list[str] = ["microbiological-testing"]

    if category_slug == "amino-acids":
        method_slugs.extend(["hplc", "uv-vis"])
    elif category_slug == "plant-sourced-vitamins-minerals":
        method_slugs.extend(["icp-ms", "icp-oes", "aas"])
    else:
        method_slugs.extend(["hplc", "hptlc"])

    if any(keyword in name for keyword in ("garlic", "ginger", "black pepper")):
        method_slugs.append("gc-ms")
    if any(keyword in name for keyword in ("vitamin c", "resveratrol", "green tea")):
        method_slugs.append("lc-ms-ms")
    if any(keyword in name for keyword in ("zinc", "mineral")):
        method_slugs.extend(["icp-ms", "icp-oes", "aas"])
    if any(keyword in name for keyword in ("mushroom", "polysaccharides", "beta-glucans")):
        method_slugs.append("uv-vis")

    deduped: list[str] = []
    for slug in method_slugs:
        if slug not in deduped:
            deduped.append(slug)
    return deduped


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


def _upsert_method(session: Session, payload: dict[str, object]) -> Method:
    item = session.scalar(select(Method).where(Method.slug == payload["slug"]))
    if item:
        for key, value in payload.items():
            setattr(item, key, value)
        session.add(item)
        return item

    item = Method(**payload)
    session.add(item)
    session.flush()
    return item


def _upsert_product(
    session: Session,
    category_id: int,
    payload: dict[str, object],
    methods: list[Method],
) -> None:
    product = session.scalar(
        select(Product).where(
            Product.common_name == payload["common_name"],
            Product.botanical_name == payload["botanical_name"],
        )
    )
    if product:
        product.category_id = category_id
        for key, value in payload.items():
            setattr(product, key, value)
        product.methods = methods
        session.add(product)
        return

    session.add(Product(category_id=category_id, methods=methods, **payload))


def seed_sample_catalog(session: Session) -> None:
    categories: dict[str, Category] = {}
    methods: dict[str, Method] = {}
    active_slugs = {payload["slug"] for payload in CATEGORY_DEFINITIONS}

    for category_payload in CATEGORY_DEFINITIONS:
        category = _upsert_category(session, category_payload)
        categories[category.slug] = category

    for legacy_category in session.scalars(select(Category)).all():
        if legacy_category.slug not in active_slugs:
            legacy_category.is_active = False
            session.add(legacy_category)

    for method_payload in METHOD_DEFINITIONS:
        item = _upsert_method(session, method_payload)
        methods[item.slug] = item

    session.flush()

    for index, product_data in enumerate(SEED_PRODUCTS, start=1):
        category_slug = infer_category_slug(product_data)
        category = categories[category_slug]
        product_methods = [
            methods[slug] for slug in infer_method_slugs(product_data, category_slug) if slug in methods
        ]
        payload = {
            **product_data,
            "sort_order": index,
            "is_active": True,
        }
        _upsert_product(session, category.id, payload, product_methods)

    session.commit()
