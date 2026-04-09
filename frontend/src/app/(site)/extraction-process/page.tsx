import { Zap, Settings, BarChart3, TrendingUp } from "lucide-react";
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
        <div className="max-w-3xl">
          <h2 className="section-title">Designed for process stability</h2>
          <p className="section-text mt-6">{extractionContent.sections[0]?.text ?? ""}</p>
        </div>
        
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <Settings className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Integrated capabilities</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Equipment and systems designed for consistent, controlled ingredient production.</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <TrendingUp className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Process optimization</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Controlled environment with monitored parameters for predictable, high-quality output.</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <BarChart3 className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Efficiency focus</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Streamlined workflows and resource management for cost-effective production at scale.</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <Zap className="h-8 w-8 text-[var(--green-800)] mb-4" />
            <h3 className="font-semibold text-[var(--foreground)]">Scalable production</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Infrastructure capable of growing with demand while maintaining quality and consistency.</p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-3xl">
          <h2 className="section-title">From raw material to finished ingredient</h2>
          <p className="section-text mt-6">A structured process sequence designed to support consistency, stability, and complete ingredient development through each transformation stage.</p>
        </div>
        
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {extractionContent.sections.slice(1).map((section) => (
            <div key={section.title} className="rounded-xl bg-gradient-to-br from-green-50/50 to-slate-50/50 p-5 border border-green-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="font-semibold text-[var(--foreground)] text-base">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{section.text}</p>
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
