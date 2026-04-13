import { fetchCategories, fetchCategoryProducts, fetchForms } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ProductCatalog } from "@/components/product-catalog";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, categoryContentBySlug, getPublicCategoryLabel, productPageCopy } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
  searchParams?: Promise<{ form?: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const readableName = categorySlug
    .split("-")
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");

  return buildMetadata({
    title: `${readableName} Catalog`,
    description: `Browse ${readableName} products from Herbo Nutra Extract with common name, botanical name, and specification data.`,
    path: `/products/${categorySlug}`,
  });
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categorySlug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedForm = resolvedSearchParams?.form;
  const [categories, forms, response] = await Promise.all([
    fetchCategories(),
    fetchForms(),
    fetchCategoryProducts(categorySlug, { form: selectedForm }),
  ]);

  const fallbackName = categorySlug
    .split("-")
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");
  const publicCategoryName = getPublicCategoryLabel(categorySlug, fallbackName);

  const category = response?.category ?? {
    id: 0,
    name: publicCategoryName,
    slug: categorySlug,
    description: null,
    sort_order: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product_count: 0,
  };

  const content = categoryContentBySlug[categorySlug] ?? {
    overview:
      category.description ??
      "Category overview and product data are kept short and readable on this page.",
    applications: ["Sourcing review", "Technical comparison", "Direct inquiry handoff"],
    trustNote: "The main job of this page is to keep the table easy to review.",
    media: {
      title: `${category.name} category image`,
      note: "Category photography appears here when available.",
      tone: "catalog" as const,
    },
  };

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow={getPublicCategoryLabel(category.slug, category.name)}
        title={`${getPublicCategoryLabel(category.slug, category.name)} product range`}
        description={content.overview}
        media={content.media}
      />

      <section className="section-shell">
        <ProductCatalog
          categories={categories}
          forms={forms}
          initialData={
            response ?? {
              items: [],
              total: 0,
              page: 1,
              limit: 100,
              category,
            }
          }
          lockedCategorySlug={category.slug}
          initialFormSlug={selectedForm}
        />
      </section>
    </div>
  );
}
