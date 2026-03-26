import { fetchCategories } from "@/lib/api";
import { InquiryForm } from "@/components/inquiry-form";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, categoryTeasers, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Send Inquiry",
  description: seoDescriptions.inquiry,
  path: "/inquiry",
});

export default async function InquiryPage() {
  const categories = await fetchCategories();
  const productOptions = categories.length
    ? categories.map((category) => category.name)
    : categoryTeasers.map((category) => category.title);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Inquiry"
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
        <InquiryForm source="inquiry" productOptions={productOptions} />
      </section>
    </div>
  );
}
