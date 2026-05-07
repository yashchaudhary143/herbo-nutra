import { fetchCategories, fetchCategoryProducts, fetchMethods } from "@/lib/api";
import { ProductCatalog } from "@/components/product-catalog";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, getCategoryMedia, getPublicCategoryLabel } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
  searchParams?: Promise<{ method?: string; search?: string }>;
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
  const selectedMethod = resolvedSearchParams?.method;
  const selectedSearch = resolvedSearchParams?.search;
  const [categories, methods, response] = await Promise.all([
    fetchCategories(),
    fetchMethods(),
    fetchCategoryProducts(categorySlug, { method: selectedMethod, search: selectedSearch }),
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

  const overview =
    category.description ??
    `${category.name} products are presented for technical comparison, sourcing review, and direct inquiry handoff.`;

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow={getPublicCategoryLabel(category.slug, category.name)}
        title={`${getPublicCategoryLabel(category.slug, category.name)} product range`}
        description={overview}
        media={getCategoryMedia(category)}
      />

      <section className="section-shell">
        <ProductCatalog
          categories={categories}
          methods={methods}
          initialData={
            response ?? {
              items: [],
              total: 0,
              page: 1,
              limit: 500,
              category,
            }
          }
          lockedCategorySlug={category.slug}
          initialMethodSlug={selectedMethod}
          initialSearchValue={selectedSearch}
        />
      </section>
    </div>
  );
}
