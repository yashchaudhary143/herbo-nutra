import { BarChart3, Settings, TrendingUp, Zap } from "lucide-react";

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

  const processHighlights = [
    {
      icon: Settings,
      title: "Integrated capabilities",
      text: "Equipment, extraction systems, and finishing operations aligned for stable ingredient production.",
    },
    {
      icon: TrendingUp,
      title: "Controlled optimization",
      text: "Defined parameters, monitored conditions, and predictable processing behavior across batches.",
    },
    {
      icon: BarChart3,
      title: "Operational efficiency",
      text: "Yield, handling, and process discipline managed to reduce unnecessary variation and loss.",
    },
    {
      icon: Zap,
      title: "Scalable output",
      text: "Infrastructure designed to support regular supply and scale-up without compromising consistency.",
    },
  ];

  const processCards = [
    extractionContent.sections[1],
    extractionContent.sections[2],
    {
      title: "Production control and scale",
      text:
        "Critical parameters, operating efficiency, and scale-up readiness are managed together so output remains stable as volume grows.",
    },
  ];

  return (
    <div className="page-frame page-gap">
      <section id="overview">
        <PublicHero
          eyebrow="Manufacturing"
          title={extractionContent.title}
          description={extractionContent.summary}
          media={extractionContent.heroMedia}
        />
      </section>

      <section id="process-highlights" className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="section-shell py-10 md:py-16">
          <div className="max-w-3xl">
            <SectionIntro
              title="Designed for process stability"
              text={extractionContent.sections[0]?.text ?? ""}
              align="compact"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {processHighlights.map((item) => (
              <article key={item.title} className="feature-card-soft">
                <item.icon className="mb-4 h-8 w-8 text-[var(--green-800)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process-stages" className="border-t border-[var(--line)]">
        <div className="section-shell py-10 md:py-16">
          <div className="max-w-3xl">
            <SectionIntro
              title="From raw material to finished ingredient"
              text="A structured process sequence designed to support consistency, stability, and complete ingredient development through each transformation stage."
              align="compact"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {processCards.map((section) =>
              section ? (
                <article key={section.title} className="feature-card-soft">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{section.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{section.text}</p>
                </article>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section id="infrastructure" className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="section-shell py-10 md:py-16">
          <div className="editorial-split">
            <MediaCarousel
              items={infrastructureSlides}
              className="min-h-[420px]"
              badge="Infrastructure / Unit"
            />
            <div className="max-w-2xl">
              <SectionIntro
                title={extractionContent.infrastructure.title}
                text={extractionContent.infrastructure.text}
                align="compact"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="packaging" className="border-t border-[var(--line)]">
        <div className="section-shell py-10 md:py-16">
          <div className="editorial-split lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <SectionIntro
                title={extractionContent.packaging.title}
                text={extractionContent.packaging.text}
                align="compact"
              />
            </div>
            <MediaPlaceholder media={extractionContent.sideMedia} className="min-h-[420px]" badge="Packaging" />
          </div>
        </div>
      </section>

      <section id="flowcharts" className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="section-shell py-10 md:py-16">
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
        </div>
      </section>
    </div>
  );
}
