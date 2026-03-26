import { MediaPlaceholder } from "@/components/media-placeholder";
import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
import {
  aboutContent,
  buildMetadata,
  certificationStrip,
  seoDescriptions,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Herbo Nutra Extract",
  description: seoDescriptions.about,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="About"
        title={aboutContent.title}
        description={aboutContent.intro}
        media={aboutContent.facilityMedia}
        stats={aboutContent.stats}
      />

      <section className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="plain-panel p-6 md:p-8">
          <SectionIntro title="Mission and vision" text={aboutContent.mission} />
          <p className="mt-5 border-l-2 border-[var(--green-100)] pl-4 text-base leading-8 text-[var(--muted)]">
            {aboutContent.vision}
          </p>
          <div className="mt-8 grid gap-4">
            {aboutContent.bullets.map((item) => (
              <div key={item} className="border-t border-[var(--line)] pt-4 text-sm leading-7 text-[var(--muted)]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <MediaPlaceholder media={aboutContent.qualityMedia} className="min-h-[420px]" badge="Quality" />
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Certifications"
          title="Trust cues should be visible, not buried."
          text="This company profile keeps certifications and quality language easy to scan."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {certificationStrip.map((item) => (
            <span key={item} className="border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--foreground)]">
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
