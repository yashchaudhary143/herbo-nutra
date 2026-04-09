import { ManufacturingFlowchartCard } from "@/components/manufacturing-flowchart-card";
import { MediaCarousel } from "@/components/media-carousel";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import {
  buildMetadata,
  extractionContent,
  manufacturingFlowcharts,
  seoDescriptions,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Manufacturing",
  description: seoDescriptions.process,
  path: "/extraction-process",
});

export default function ExtractionProcessPage() {
  const infrastructureSlides = [
    {
      type: "image" as const,
      src: "/images/FacilityImage.jpg",
      title: "Infrastructure overview",
      note: "Production floor overview with core equipment and utility access.",
    },
    {
      type: "image" as const,
      src: "/images/HomeManufacturing.jpg",
      title: "Manufacturing floor",
      note: "Unit layout showing controlled process zones and movement paths.",
    },
    {
      type: "image" as const,
      src: "/images/QualityControl.jpg",
      title: "Quality support",
      note: "Quality oversight and release support linked to the unit workflow.",
    },
    {
      type: "video" as const,
      src: "/images/ProcessHero.jpg",
      title: "Unit walkthrough",
      note: "Placeholder video slide. Replace this with the final plant walkthrough video later.",
    },
  ];

  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Manufacturing"
        title={extractionContent.title}
        description={extractionContent.summary}
        media={extractionContent.heroMedia}
      />

      <section className="section-shell">
        <div className="plain-panel p-6 md:p-8">
          <SectionIntro
            title="Designed for process stability"
            text={extractionContent.sections[0]?.text ?? ""}
          />
          <div className="mt-8 grid gap-4">
            {extractionContent.sections.slice(1).map((section) => (
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
          title={extractionContent.sections[1]?.title ?? ""}
          text={extractionContent.sections[1]?.text ?? ""}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {extractionContent.sections.slice(2).map((section) => (
            <div key={section.title} className="plain-panel p-6">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{section.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[1fr_1fr]">
        <MediaCarousel
          items={infrastructureSlides}
          className="min-h-[420px]"
          badge="Infrastructure / Unit"
        />
        <div className="flex flex-col justify-center">
          <SectionIntro
            title={extractionContent.infrastructure.title}
            text={extractionContent.infrastructure.text}
          />
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center">
          <SectionIntro
            title={extractionContent.packaging.title}
            text={extractionContent.packaging.text}
          />
        </div>
        <MediaPlaceholder media={extractionContent.sideMedia} className="min-h-[420px]" badge="Packaging" />
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Flowcharts"
          title="Manufacturing flowcharts across all 8 forms"
          text="Each process family follows a structured sequence designed to support consistency, stability, and application-ready output."
        />
        <div className="mt-8 grid gap-6">
          {manufacturingFlowcharts.map((flow) => (
            <ManufacturingFlowchartCard
              key={flow.title}
              title={flow.title}
              subtitle={flow.subtitle}
              image={flow.image}
              steps={flow.steps}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
