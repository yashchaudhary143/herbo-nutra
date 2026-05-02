import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import { buildMetadata, formatsContent, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Advanced Formats",
  description: seoDescriptions.formats,
  path: "/formats",
});

export default async function FormatsPage() {
  return (
    <div className="page-frame page-gap">
      <section id="formats-hero">
        <PublicHero
          eyebrow="Formats"
          title={formatsContent.title}
          description={formatsContent.summary}
          media={formatsContent.heroMedia}
        />
      </section>

      <section id="available-formats" className="section-shell py-14 md:py-20">
        <SectionIntro
          title="Available formats"
          text="Review the available advanced formats and explore the technologies best aligned with your formulation goals."
          align="compact"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {formatsContent.capabilities.map((format) => (
            <article key={format.title} className="format-card">
              <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {format.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{format.text}</p>
            </article>
          ))}
          <article className="format-card">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              {formatsContent.herbalExtractPowder.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {formatsContent.herbalExtractPowder.text}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
