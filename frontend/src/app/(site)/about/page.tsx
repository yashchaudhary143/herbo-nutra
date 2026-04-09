import Image from "next/image";
 import { FileText, Award, Settings, Shield, Lightbulb } from "lucide-react";

import { PublicHero } from "@/components/public-hero";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionIntro } from "@/components/section-intro";
import { TeamMembersGrid } from "@/components/team-members-grid";
import {
  aboutContent,
  buildMetadata,
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

      <section className="section-shell">
        <div className="max-w-6xl">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
            Company overview
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
            <div className="overflow-hidden rounded-3xl border border-[var(--line)] shadow-md">
              <MediaPlaceholder
                media={aboutContent.qualityMedia}
                className="aspect-video"
              />
            </div>

            <div>
              <p className="text-lg leading-7 text-[var(--muted)]">
                {aboutContent.overview}
              </p>

              <div className="mt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--green-800)]">
                  Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Liposomal", "Micronized", "Phytosomal", "Granulated"].map(
                    (cap) => (
                      <span
                        key={cap}
                        className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--green-800)]"
                      >
                        {cap}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Settings,
                title: aboutContent.applicationUnderstanding.title,
                text: aboutContent.applicationUnderstanding.text,
              },
              {
                icon: Shield,
                title: aboutContent.quality.title,
                text: aboutContent.quality.text,
              },
              {
                icon: Lightbulb,
                title: aboutContent.development.title,
                text: aboutContent.development.text,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50 p-6 transition hover:shadow-md"
                >
                  <Icon className="h-8 w-8 text-[var(--green-800)]" />
                  <h3 className="mt-4 font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border-l-4 border-[var(--green-800)] bg-green-50/30 p-6">
            <p className="text-base leading-7 text-[var(--muted)]">
              {aboutContent.supply}
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Our Team"
          title={aboutContent.teamTitle}
          text={aboutContent.teamIntro}
          align="left"
        />
        <div className="mt-10">
          <TeamMembersGrid members={aboutContent.team} />
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--green-800)]">
              Documentation Support
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
              {aboutContent.technicalSupportTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-7 text-[var(--muted)]">
              {aboutContent.technicalSupportIntro}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {aboutContent.technicalDocuments.map((item, idx) => {
              const parts = item.split(" - ");
              const acronym = parts[0].trim();
              const description = parts[1] || acronym;

              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-green-50/50 to-slate-50/50 p-4 transition hover:-translate-y-0.5 hover:shadow-md border border-green-100/50"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                    <FileText className="h-5 w-5 text-[var(--green-800)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-[var(--foreground)]">
                      {acronym}
                    </p>
                    <p className="mt-0.5 text-xs leading-4 text-[var(--muted)]">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-6xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--green-800)]">
              Accreditations & Certifications
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-5xl">
              {aboutContent.certificationsTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-7 text-[var(--muted)]">
              {aboutContent.certificationsIntro}
            </p>
          </div>

          <div className="mt-10">
            <p className="mb-6 font-display text-xl font-semibold text-[var(--foreground)]">
              {aboutContent.certificationsLead}
            </p>

            <div className="grid gap-4 md:grid-cols-6">
              {aboutContent.certificationsPoints.map((cert, idx) => {
                const badge = cert
                  .split(" - ")[0]
                  .trim();

                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-slate-50 p-6 transition hover:bg-white hover:shadow-md"
                  >
                    <Award className="h-8 w-8 text-[var(--green-800)] opacity-70 transition group-hover:opacity-100" />
                    <p className="text-center text-xs font-semibold leading-tight text-[var(--foreground)]">
                      {badge}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#F9F9F7] p-6 space-y-4">
            <p className="text-base leading-7 text-[var(--muted)]">
              {aboutContent.certificationsCommitment}
            </p>
            <p className="text-base leading-7 text-[var(--muted)]">
              {aboutContent.certificationsClosing}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
