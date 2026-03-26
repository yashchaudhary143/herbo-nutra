import Image from "next/image";

import { MediaPlaceholder } from "@/components/media-placeholder";
import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import {
  buildMetadata,
  extractionContent,
  processSteps,
  seoDescriptions,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Extraction Process",
  description: seoDescriptions.process,
  path: "/extraction-process",
});

export default function ExtractionProcessPage() {
  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Manufacturing"
        title="A simple process page with visible stages and less marketing noise."
        description="Show the production flow clearly: raw material, extraction, filtration, drying, and packaging."
        media={extractionContent.heroMedia}
      />

      <section className="section-shell">
        <SectionIntro
          title="Process stages"
          text="Each stage is kept short so the page reads like a manufacturing overview, not a brochure."
        />
        <div className="mt-8 grid gap-6">
          {processSteps.map((step, index) => (
            <article key={step.title} className="grid gap-5 border-t border-[var(--line)] pt-6 md:grid-cols-[220px_1fr] md:items-center">
              <div className="soft-panel flex items-center justify-center p-5">
                <Image src={step.image} alt={step.title} width={600} height={420} className="h-auto w-full max-w-[200px]" />
              </div>
              <div>
                <p className="eyebrow">Step {index + 1}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {step.title}
                </h2>
                <p className="mt-3 text-base leading-8 text-[var(--muted)]">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[1fr_1fr]">
        <MediaPlaceholder media={extractionContent.sideMedia} className="min-h-[360px]" badge="Quality And Packing" />
        <div className="flex flex-col justify-center">
          <SectionIntro
            title="Why this page matters"
            text="Buyers want to understand how a supplier thinks about quality, handling, and shipment readiness."
          />
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro title={extractionContent.videoTitle} />
        <div className="mt-6 aspect-video overflow-hidden border border-[var(--line)] bg-black">
          <iframe
            src={extractionContent.videoUrl}
            title={extractionContent.videoTitle}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
