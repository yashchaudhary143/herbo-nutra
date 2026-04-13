import Link from "next/link";

import { fetchCategories } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionIntro } from "@/components/section-intro";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, categoryTeasers, productPageCopy, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Product Catalog",
  description: seoDescriptions.products,
  path: "/products",
});

type ProductsPageProps = {
  searchParams?: Promise<{
    form?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const categories = await fetchCategories();
  const teaserCards = categoryTeasers.filter(
    (teaser) => categories.find((category) => category.slug === teaser.slug) ?? teaser,
  );

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
            {teaserCards.map((item) => (
              <article key={item.slug} className="category-card">
                <MediaPlaceholder media={item.media} className="min-h-[220px]" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
                  <Link href={`/products/${item.slug}`} className="button-link mt-5">
                    Explore category
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
