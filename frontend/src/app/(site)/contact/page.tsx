import { fetchCategories, fetchProducts } from "@/lib/api";
import { InquiryForm } from "@/components/inquiry-form";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, categoryTeasers, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: seoDescriptions.contact,
  path: "/contact",
});

export default async function ContactPage() {
  const [categories, productCatalog] = await Promise.all([fetchCategories(), fetchProducts()]);
  const catalogGroups = categories
    .map((category) => ({
      category,
      products: productCatalog.items.filter((product) => product.category_id === category.id),
    }))
    .filter((group) => group.products.length > 0);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Contact"
        title="Share your requirement and the team can respond directly."
        description="Use this page for product, specification, quantity, sampling, and pricing discussions."
        media={categoryTeasers[0].media}
      />

      <section className="section-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <div>
            <h2 className="section-title text-2xl md:text-4xl">What to include</h2>
            <div className="mt-6 grid gap-4">
              <div className="border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--muted)]">
                Product name or ingredient type
              </div>
              <div className="border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--muted)]">
                Required specification or strength
              </div>
              <div className="border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--muted)]">
                Quantity, packaging, and target market
              </div>
            </div>
          </div>
          <MediaPlaceholder media={categoryTeasers[1].media} className="min-h-[260px]" badge="Product Image" />
        </div>
        <InquiryForm source="contact" productGroups={catalogGroups} />
      </section>
    </div>
  );
}
