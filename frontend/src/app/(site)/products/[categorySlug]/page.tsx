import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fetchCategories, fetchCategoryProducts, fetchForms } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ProductCatalog } from "@/components/product-catalog";
import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import { buildMetadata, categoryContentBySlug, productPageCopy } from "@/lib/site";

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

  const category = response?.category ?? {
    id: 0,
    name: categoryContentBySlug[categorySlug] ? fallbackName : fallbackName,
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
        eyebrow={category.name}
        title={`${category.name} product range`}
        description={content.overview}
        media={content.media}
      />

      <section className="section-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionIntro title="Typical applications" text={content.trustNote} />
          <div className="mt-6 grid gap-3">
            {content.applications.map((item) => (
              <div key={item} className="border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {productPageCopy.categoryTrustPoints.map((item) => (
              <span key={item} className="border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/contact" className="button-link">
              Request this category
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <MediaPlaceholder media={content.media} className="min-h-[360px]" badge="Category Image" />
      </section>

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
