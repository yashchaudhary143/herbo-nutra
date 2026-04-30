import Link from "next/link";

import { fetchCategories, fetchForms, fetchProducts } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ProductCatalog } from "@/components/product-catalog";
import { SectionIntro } from "@/components/section-intro";
import { PublicHero } from "@/components/public-hero";
import {
  buildMetadata,
  getCategoryMedia,
  getCategorySummary,
  productPageCopy,
  seoDescriptions,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Product Catalog",
  description: seoDescriptions.products,
  path: "/products",
});

type ProductsPageProps = {
  searchParams?: Promise<{
    form?: string;
    search?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedForm = resolvedSearchParams?.form ?? "";
  const selectedSearch = resolvedSearchParams?.search ?? "";
  const [categories, forms, productCatalog] = await Promise.all([
    fetchCategories(),
    fetchForms(),
    fetchProducts({ form: selectedForm, search: selectedSearch }),
  ]);

  return (
    <div className="page-frame page-gap">
      <section id="hero">
        <PublicHero
          eyebrow="Products"
          title="Browse the product range, then move straight into the table."
          description={productPageCopy.intro}
          media={productPageCopy.heroMedia}
        />
      </section>

      <section id="categories" className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="section-shell py-10 md:py-16">
          <SectionIntro
            title="Browse categories"
            text="Review categories first to align the right ingredients and formats with your formulation needs."
            align="compact"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <article key={category.id} className="category-card flex h-full flex-col">
                <MediaPlaceholder media={getCategoryMedia(category, index)} className="min-h-[220px]" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{category.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {getCategorySummary(category)}
                  </p>
                  <Link href={`/products/${category.slug}`} className="button-link mt-auto pt-6">
                    Explore category
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell">
        <ProductCatalog
          categories={categories}
          forms={forms}
          initialData={productCatalog}
          initialFormSlug={selectedForm}
          initialSearchValue={selectedSearch}
        />
      </section>
    </div>
  );
}
