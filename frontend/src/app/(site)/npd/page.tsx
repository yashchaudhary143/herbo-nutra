import Link from "next/link";

import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import { fetchForms } from "@/lib/api";
import { buildMetadata, npdContent, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Advanced Formats",
  description: seoDescriptions.npd,
  path: "/npd",
});

export default async function NpdPage() {
  const featuredForms = (await fetchForms()).filter((form) => form.is_npd_featured);

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Formats"
        title={npdContent.title}
        description={npdContent.summary}
        media={npdContent.heroMedia}
      />

      <section className="section-shell">
        <SectionIntro
          title="Available formats"
          text="These advanced formats support bioavailability, dispersion, handling, and application-specific development requirements."
          align="split"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredForms.map((form) => (
            <Link
              key={form.id}
              href={`/products?form=${encodeURIComponent(form.slug)}`}
              className="plain-panel block p-6 transition hover:-translate-y-0.5 hover:border-[var(--gold-500)] md:p-7"
            >
              <p className="eyebrow">{form.name}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {form.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{form.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
