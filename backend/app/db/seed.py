from __future__ import annotations

from collections.abc import Iterable

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.security import hash_password
from app.models import AdminUser, Category, Form, Product

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

FORM_DEFINITIONS = [
    {
        "name": "Herbal Extracts",
        "slug": "herbal-extracts",
        "description": "We employ advanced hydro-alcoholic extraction and precision concentration technologies to isolate bioactive compounds from selected botanical sources while preserving heat-sensitive phytoconstituents and delivering stable, highly dispersible extracts.",
        "sort_order": 1,
        "is_npd_featured": False,
    },
    {
        "name": "Plant Sourced Vitamins & Minerals",
        "slug": "natural-sourced-vitamins-minerals",
        "description": "Our vitamins and minerals are derived using selective extraction and purification technologies from plant-sourced materials, maintaining nutrient structure, purity, stability, and label-friendly positioning.",
        "sort_order": 2,
        "is_npd_featured": False,
    },
    {
        "name": "Amino Acids",
        "slug": "amino-acids",
        "description": "We utilize controlled fermentation and enzymatic hydrolysis technologies followed by advanced purification and crystallization to deliver amino acids with high purity, consistency, and formulation performance.",
        "sort_order": 3,
        "is_npd_featured": False,
    },
    {
        "name": "Liposomal Technology",
        "slug": "liposomal-technology",
        "description": "Our liposomal technology uses phospholipid-based encapsulation, high-shear homogenization, and nano-sizing techniques to protect actives from degradation and improve stability, efficacy, and absorption.",
        "sort_order": 4,
        "is_npd_featured": True,
    },
    {
        "name": "Micronization Technology",
        "slug": "micronization-technology",
        "description": "We apply micronization technologies including jet milling to reduce particle size with micro-level precision, improving surface area, dissolution, solubility, dispersion, and formulation compatibility.",
        "sort_order": 5,
        "is_npd_featured": True,
    },
    {
        "name": "Phytosome Technology",
        "slug": "phytosome-technology",
        "description": "Our phytosome technology integrates herbal actives with phospholipids to form bioavailable complexes that significantly improve the absorption, stability, and effective utilization of botanical ingredients.",
        "sort_order": 6,
        "is_npd_featured": True,
    },
    {
        "name": "Granulation Technology",
        "slug": "granulation-technology",
        "description": "We use controlled granulation processes to transform fine powders into uniform, free-flowing granules that improve flowability, reduce dust, and support handling, compressibility, and process efficiency.",
        "sort_order": 7,
        "is_npd_featured": True,
    },
    {
        "name": "Nucleotide Technology",
        "slug": "nucleotide-technology",
        "description": "Our nucleotide production is driven by advanced fermentation and enzymatic processing followed by multi-stage purification to deliver stable, bioactive nucleotide fractions for nutritional and functional formulations.",
        "sort_order": 8,
        "is_npd_featured": True,
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


def infer_form_slugs(product: dict[str, str], category_slug: str) -> list[str]:
    name = f"{product['common_name']} {product['botanical_name']} {product['specification']}".lower()
    form_slugs: list[str] = []

    if category_slug == "amino-acids":
        form_slugs.append("amino-acids")
    elif category_slug == "plant-sourced-vitamins-minerals":
        form_slugs.append("natural-sourced-vitamins-minerals")
    else:
        form_slugs.append("herbal-extracts")

    if any(keyword in name for keyword in ("turmeric", "green tea", "vitamin c")):
        form_slugs.append("liposomal-technology")
    if any(keyword in name for keyword in ("turmeric", "ashwagandha", "arginine", "zinc", "bacopa")):
        form_slugs.append("micronization-technology")
    if any(keyword in name for keyword in ("turmeric", "milk thistle", "boswellia", "ginkgo", "green tea")):
        form_slugs.append("phytosome-technology")
    if any(keyword in name for keyword in ("vitamin c", "zinc", "carnitine", "garlic", "ginger")):
        form_slugs.append("granulation-technology")
    if any(keyword in name for keyword in ("vitamin c", "zinc gluconate")):
        form_slugs.append("nucleotide-technology")

    deduped: list[str] = []
    for slug in form_slugs:
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


def _upsert_form(session: Session, payload: dict[str, object]) -> Form:
    item = session.scalar(select(Form).where(Form.slug == payload["slug"]))
    if item:
        for key, value in payload.items():
            setattr(item, key, value)
        session.add(item)
        return item

    item = Form(**payload)
    session.add(item)
    session.flush()
    return item


def _upsert_product(
    session: Session,
    category_id: int,
    payload: dict[str, object],
    forms: list[Form],
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
        product.forms = forms
        session.add(product)
        return

    session.add(Product(category_id=category_id, forms=forms, **payload))


def seed_sample_catalog(session: Session) -> None:
    categories: dict[str, Category] = {}
    forms: dict[str, Form] = {}
    active_slugs = {payload["slug"] for payload in CATEGORY_DEFINITIONS}

    for category_payload in CATEGORY_DEFINITIONS:
        category = _upsert_category(session, category_payload)
        categories[category.slug] = category

    for legacy_category in session.scalars(select(Category)).all():
        if legacy_category.slug not in active_slugs:
            legacy_category.is_active = False
            session.add(legacy_category)

    for form_payload in FORM_DEFINITIONS:
        item = _upsert_form(session, form_payload)
        forms[item.slug] = item

    session.flush()

    for index, product_data in enumerate(SEED_PRODUCTS, start=1):
        category_slug = infer_category_slug(product_data)
        category = categories[category_slug]
        product_forms = [forms[slug] for slug in infer_form_slugs(product_data, category_slug) if slug in forms]
        payload = {
            **product_data,
            "sort_order": index,
            "is_active": True,
        }
        _upsert_product(session, category.id, payload, product_forms)

    session.commit()
