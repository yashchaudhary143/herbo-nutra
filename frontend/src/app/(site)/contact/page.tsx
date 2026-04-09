import { FileText, Zap, Package } from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { InquiryForm } from "@/components/inquiry-form";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, contactCopy, seoDescriptions } from "@/lib/site";

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
        description={contactCopy.prompt}
        media={contactCopy.heroMedia}
      />

      <section className="section-shell">
        <div className="max-w-3xl">
          <h2 className="section-title">What to include</h2>
          <p className="section-text mt-6">Provide the key details about your requirement so our team can respond with the most relevant information and options for your application.</p>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <FileText className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Product specification</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Name or ingredient type you're looking for</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <Zap className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Technical requirements</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Desired specification or strength for your application</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <Package className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Scale and delivery</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Quantity, packaging format, and target market</p>
          </div>
        </div>
      </section>

      <section className="section-shell max-w-2xl">
        <InquiryForm source="contact" productGroups={catalogGroups} />
      </section>
    </div>
  );
}
