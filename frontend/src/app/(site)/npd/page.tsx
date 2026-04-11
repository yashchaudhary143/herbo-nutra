import Link from "next/link";

import { PublicHero } from "@/components/public-hero";
import { MediaPlaceholder } from "@/components/media-placeholder";
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
  const hasHerbalExtractPowder = featuredForms.some(
    (form) => form.slug === "herbal-extract-powder" || form.name.toLowerCase().includes("herbal extract powder"),
  );

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Formats"
        title={npdContent.title}
        description={npdContent.summary}
        media={npdContent.heroMedia}
      />

      <section className="section-shell py-14 md:py-20">
        <SectionIntro
          title="Available formats"
          text="Review the available advanced formats and explore the technologies best aligned with your formulation goals."
          align="compact"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredForms.map((form) => (
            <Link
              key={form.id}
              href={`/products?form=${encodeURIComponent(form.slug)}`}
              className="format-card block transition hover:-translate-y-0.5 hover:border-[var(--gold-500)]"
            >
              <p className="eyebrow">{form.name}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {form.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{form.description}</p>
            </Link>
          ))}
          {!hasHerbalExtractPowder ? (
            <Link
              href="/products?form=herbal-extracts"
              className="format-card block transition hover:-translate-y-0.5 hover:border-[var(--gold-500)]"
            >
              <p className="eyebrow">{npdContent.herbalExtractPowder.title}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {npdContent.herbalExtractPowder.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {npdContent.herbalExtractPowder.text}
              </p>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="section-shell py-14 md:py-20">
        <div className="editorial-split lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <SectionIntro
              title={npdContent.herbalExtractPowder.title}
              text={npdContent.herbalExtractPowder.text}
              align="compact"
            />
            <div className="mt-8 space-y-3">
              {npdContent.herbalExtractPowder.points.map((point) => (
                <div key={point} className="editorial-row">
                  {point}
                </div>
              ))}
            </div>
          </div>
          <MediaPlaceholder
            media={npdContent.herbalExtractPowder.media}
            className="min-h-[360px]"
            badge="Extract Powder"
          />
        </div>
      </section>
    </div>
  );
}
