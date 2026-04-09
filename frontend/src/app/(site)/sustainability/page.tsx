import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import { buildMetadata, seoDescriptions, sustainabilityContent } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sustainability",
  description: seoDescriptions.sustainability,
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Sustainability"
        title={sustainabilityContent.title}
        description={sustainabilityContent.summary}
        media={sustainabilityContent.heroMedia}
      />

      <section className="section-shell">
        <div className="max-w-5xl">
          <SectionIntro
            title={sustainabilityContent.sections[0]?.title ?? ""}
            text={sustainabilityContent.sections[0]?.text ?? ""}
          />
          <div className="mt-8 grid gap-4">
            {sustainabilityContent.sections.slice(1).map((section) => (
              <div key={section.title} className="border-t border-[var(--line)] pt-4">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{section.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          title="How this approach is applied"
          text="This perspective is reflected in how sourcing, process control, and operational discipline are handled across the business."
        />
        <div className="editorial-row-grid mt-8">
          {sustainabilityContent.practices.map((item) => (
            <div key={item} className="editorial-row">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 border-t border-[var(--line)] pt-8">
          <div>
            <p className="eyebrow">Closing</p>
            <h2 className="section-title mt-3">{sustainabilityContent.closing}</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
