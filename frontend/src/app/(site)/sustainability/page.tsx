import Image from "next/image";
import { Leaf, Recycle, TreePine, Sprout, Heart } from "lucide-react";

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

      <section id="overview" className="section-shell">
        <div className="max-w-5xl">
          <SectionIntro
            title={sustainabilityContent.sections[0]?.title ?? ""}
            text={sustainabilityContent.sections[0]?.text ?? ""}
          />
          <div className="mt-6 grid gap-4">
            {sustainabilityContent.sections.slice(1).map((section, index) => {
              const icons = [Leaf, Recycle, TreePine, Sprout];
              const Icon = icons[index % icons.length];
              return (
                <div key={section.title} className="sustainability-section-card">
                  <div className="flex items-start gap-4">
                    <Icon className="sustainability-icon" />
                    <div className="flex-1">
                      <h3 className="sustainability-heading">{section.title}</h3>
                      <p className="sustainability-text">{section.text}</p>
                    </div>
                  </div>
                  {index < sustainabilityContent.sections.slice(1).length - 1 && (
                    <div className="sustainability-separator" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="approach" className="section-shell mt-10">
        <div className="max-w-6xl">
          <div className="mb-10">
            <p className="eyebrow">Sustainability in action</p>
            <h2 className="section-title mt-3">Visual examples of our sustainable workflow</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                src: "/images/RawMaterial.jpg",
                title: "Traceable sourcing",
                caption: "Sourcing natural ingredients through responsible, transparent supply chains.",
              },
              {
                src: "/images/Extraction.jpg",
                title: "Efficient extraction",
                caption: "Process control and recovery practices designed to minimize waste.",
              },
              {
                src: "/images/QualityControl.jpg",
                title: "Quality oversight",
                caption: "Inspection and stability checks that keep the output consistent and reliable.",
              },
            ].map((item) => (
              <div key={item.title} className="sustainability-image-card rounded-3xl overflow-hidden border border-[var(--line)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-5">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                  <p className="text-sm leading-6 text-[var(--muted)]">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="practices" className="section-shell sustainability-practices-section">
        <SectionIntro
          title="How this approach is applied"
          text="This perspective is reflected in how sourcing, process control, and operational discipline are handled across the business."
        />
        <div className="editorial-row-grid mt-6">
          {sustainabilityContent.practices.map((item, index) => {
            const icons = [Heart, Leaf, Recycle];
            const Icon = icons[index % icons.length];
            return (
              <div key={item} className="sustainability-practice-item">
                <Icon className="sustainability-practice-icon" />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="closing" className="section-shell sustainability-closing-section">
        <div className="grid gap-6 border-t border-[var(--line)] pt-6">
          <div className="flex items-start gap-4">
            <TreePine className="sustainability-closing-icon" />
            <div>
              <p className="eyebrow">Closing</p>
              <h2 className="section-title mt-3">{sustainabilityContent.closing}</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
