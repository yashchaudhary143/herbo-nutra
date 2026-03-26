import { fetchCategories } from "@/lib/api";
import { InquiryForm } from "@/components/inquiry-form";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, categoryTeasers, company, contactCopy, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: seoDescriptions.contact,
  path: "/contact",
});

export default async function ContactPage() {
  const categories = await fetchCategories();
  const productOptions = categories.length
    ? categories.map((category) => category.name)
    : categoryTeasers.map((category) => category.title);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Contact"
        title="Visible company details and a direct contact form."
        description={contactCopy.prompt}
        media={categoryTeasers[2].media}
      />

      <section className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div>
            <h2 className="section-title text-2xl md:text-4xl">Get in touch</h2>
            <div className="mt-5 space-y-3 text-base leading-8 text-[var(--muted)]">
              <p>{company.address}</p>
              <p>{company.phone}</p>
              <p>{company.email}</p>
            </div>
          </div>

          <div className="grid gap-4">
            {contactCopy.details.map((item) => (
              <div key={item} className="border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>

          <div className="aspect-video overflow-hidden border border-[var(--line)]">
            <iframe src={company.mapEmbedUrl} title="Company location" className="h-full w-full" loading="lazy" />
          </div>
        </div>

        <InquiryForm source="contact" productOptions={productOptions} compact />
      </section>
    </div>
  );
}
