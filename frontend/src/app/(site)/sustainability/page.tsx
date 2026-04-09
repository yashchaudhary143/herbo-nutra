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

      <section className="section-shell">
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

      <section className="section-shell sustainability-practices-section">
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

      <section className="section-shell sustainability-closing-section">
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
