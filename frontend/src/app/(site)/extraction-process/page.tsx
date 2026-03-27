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
        title="Extraction and processing workflow"
        description="Show the production flow clearly: raw material, extraction, filtration, drying, and packaging."
        media={extractionContent.heroMedia}
      />

      <section className="section-shell">
        <SectionIntro
          title="Process stages"
          text="Each stage outlines how materials move from intake to finished packed ingredients."
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
            title="Quality and packing"
            text="Quality checks, handling controls, and packing readiness support consistent supply and dispatch."
          />
        </div>
      </section>
    </div>
  );
}
