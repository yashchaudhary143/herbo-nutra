import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fetchCategories, fetchProducts } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { ProductCatalog } from "@/components/product-catalog";
import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import {
  buildMetadata,
  categoryTeasers,
  productPageCopy,
  seoDescriptions,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Product Catalog",
  description: seoDescriptions.products,
  path: "/products",
});

export default async function ProductsPage() {
  const [categories, initialData] = await Promise.all([fetchCategories(), fetchProducts()]);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Products"
        title="Browse the product range, then move straight into the table."
        description={productPageCopy.intro}
        media={categoryTeasers[0].media}
      />

      <section className="section-shell">
        <SectionIntro
          title="Categories"
          text="Choose a category page if you want a shorter, more focused product view."
          align="split"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {categoryTeasers.map((item) => (
            <article key={item.slug} className="plain-panel overflow-hidden">
              <MediaPlaceholder media={item.media} className="min-h-[220px]" badge={item.title} />
              <div className="p-6">
                <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
                <Link href={`/products/${item.slug}`} className="button-link mt-5">
                  View category
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <ProductCatalog categories={categories} initialData={initialData} />
      </section>
    </div>
  );
}
