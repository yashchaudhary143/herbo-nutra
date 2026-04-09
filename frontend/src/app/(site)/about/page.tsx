import { PublicHero } from "@/components/public-hero";
import { SectionIntro } from "@/components/section-intro";
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
        <div className="plain-panel p-6 md:p-8">
          <SectionIntro title="Company overview" text={aboutContent.overview} />
          <div className="mt-8 grid gap-4">
            <div className="border-t border-[var(--line)] pt-4">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {aboutContent.applicationUnderstanding.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                {aboutContent.applicationUnderstanding.text}
              </p>
            </div>
            <div className="border-t border-[var(--line)] pt-4">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {aboutContent.quality.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                {aboutContent.quality.text}
              </p>
            </div>
            <div className="border-t border-[var(--line)] pt-4">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                {aboutContent.development.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                {aboutContent.development.text}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {aboutContent.development.points.map((item) => (
              <span key={item} className="border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-8 border-l-2 border-[var(--green-100)] pl-4 text-base leading-8 text-[var(--muted)]">
            {aboutContent.supply}
          </p>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Our Team"
          title={aboutContent.teamTitle}
          text={aboutContent.teamIntro}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {aboutContent.team.map((member) => (
            <article key={member.name} className="plain-panel p-5 md:p-6">
              <p className="eyebrow">{member.role}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-[2rem]">
                {member.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{member.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--muted)]">
                {member.points.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green-800)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {"closing" in member && member.closing ? (
                <p className="mt-4 pt-1 text-sm leading-6 text-[var(--muted)]">
                  {member.closing}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="max-w-4xl">
          <p className="eyebrow">Documentation Support</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] md:text-4xl">
            {aboutContent.technicalSupportTitle}
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            {aboutContent.technicalSupportIntro}
          </p>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {aboutContent.technicalDocuments.map((item) => (
            <div key={item} className="plain-panel px-4 py-3 text-sm leading-6 text-[var(--muted)]">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Accreditations & Certifications"
          title={aboutContent.certificationsTitle}
          text={aboutContent.certificationsIntro}
        />
        <p className="mt-6 text-lg font-semibold text-[var(--foreground)]">
          {aboutContent.certificationsLead}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {aboutContent.certificationsPoints.map((item) => (
            <span key={item} className="border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--foreground)]">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
          {aboutContent.certificationsCommitment}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
          {aboutContent.certificationsClosing}
        </p>
      </section>
    </div>
  );
}
