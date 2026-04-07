import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fetchCategories } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionIntro } from "@/components/section-intro";
import {
  buildMetadata,
  categoryTeasers,
  certificationStrip,
  homeContent,
  seoDescriptions,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: "Herbal And Nutraceutical Ingredient Manufacturer",
  description: seoDescriptions.home,
  path: "/",
});

export default async function HomePage() {
  const categories = await fetchCategories();
  const teaserCards = categoryTeasers.filter(
    (teaser) => categories.find((category) => category.slug === teaser.slug) ?? teaser,
  );

  return (
    <div className="page-frame page-gap">
      <section className="pt-0">
        <div className="relative overflow-hidden">
          <MediaPlaceholder media={homeContent.heroMedia} className="min-h-[520px] md:min-h-[680px]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,45,29,0.84)_0%,rgba(21,59,37,0.58)_34%,rgba(21,59,37,0.18)_62%,rgba(21,59,37,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(182,146,77,0.18),transparent_24%)]" />
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center">
            <div className="section-shell w-full">
              <div className="max-w-xl rounded-[2rem] border border-white/14 bg-[rgba(12,34,22,0.44)] px-7 py-8 shadow-[0_24px_80px_rgba(7,23,14,0.28)] backdrop-blur-md md:px-10 md:py-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(243,231,204,0.9)]">
                  {homeContent.tagline}
                </p>
                <div className="mt-4 h-px w-20 bg-[rgba(243,231,204,0.7)]" />
                <p className="mt-5 text-lg font-medium leading-9 text-white/92 md:text-[1.85rem] md:leading-[1.45]">
                  {homeContent.heroText}
                </p>
                <p className="mt-5 text-sm font-medium tracking-[0.08em] text-white/78">
                  {homeContent.heroSubtext}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="button-primary border-white bg-white text-[var(--green-950)] hover:bg-[var(--surface-muted)]"
                  >
                    Send Inquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Positioning"
          title={homeContent.positioning.title}
          text={homeContent.positioning.text}
        />
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center">
          <SectionIntro
            label="About Snapshot"
            title={homeContent.aboutSnapshot.title}
            text={homeContent.aboutSnapshot.body[0]}
          />
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            {homeContent.aboutSnapshot.body[1]}
          </p>
        </div>
        <MediaPlaceholder media={homeContent.processMedia} className="min-h-[400px]" badge="Understanding" />
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Product Experience"
          title={homeContent.productExperience.title}
          text={homeContent.productExperience.intro}
          align="split"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {homeContent.productExperience.points.map((item) => (
            <div key={item} className="plain-panel p-6 text-sm leading-7 text-[var(--muted)]">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
          {homeContent.productExperience.closing}
        </p>
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Products"
          title="Browse the product range."
          text="Category views stay available for faster scanning before moving into the full specification table."
          align="split"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {teaserCards.map((item) => (
            <article key={item.slug} className="plain-panel category-card overflow-hidden">
              <MediaPlaceholder media={item.media} className="min-h-[240px]" />
              <div className="p-6">
                <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
                <Link href={`/products/${item.slug}`} className="button-link mt-5">
                  View category
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[1fr_1fr]">
        <MediaPlaceholder media={homeContent.processMedia} className="min-h-[420px]" badge="Manufacturing" />
        <div className="flex flex-col justify-center">
          <SectionIntro
            label="Manufacturing"
            title={homeContent.process.title}
            text={homeContent.process.text}
          />
          <div className="mt-8">
            <Link href="/extraction-process" className="button-link">
              Explore manufacturing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center">
          <SectionIntro
            label="Formats & Innovation"
            title={homeContent.innovation.title}
            text={homeContent.innovation.text}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {homeContent.innovation.formats.map((value) => (
              <span
                key={value}
                className="gold-outline border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)]"
              >
                {value}
              </span>
            ))}
          </div>
          <p className="mt-6 text-base leading-8 text-[var(--muted)]">
            {homeContent.innovation.closing}
          </p>
          <div className="mt-6">
            <Link href="/npd" className="button-link">
              Explore advanced formats
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <MediaPlaceholder media={homeContent.founderMedia} className="min-h-[420px]" badge="Formats" />
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-2">
        <div className="plain-panel p-6 md:p-8">
          <SectionIntro
            label="Sustainability"
            title={homeContent.sustainability.title}
            text={homeContent.sustainability.text}
          />
          <div className="mt-6">
            <Link href="/sustainability" className="button-link">
              Read sustainability approach
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="plain-panel p-6 md:p-8">
          <SectionIntro
            label="Global Outlook"
            title={homeContent.global.title}
            text={homeContent.global.text}
          />
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center">
          <SectionIntro
            label="Team"
            title={homeContent.team.title}
            text={homeContent.team.text}
          />
          <div className="mt-6">
            <Link href="/about" className="button-link">
              Meet the team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <MediaPlaceholder media={homeContent.founderMedia} className="min-h-[420px]" badge="Leadership" />
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Certifications"
          title="Defined by Structured Systems"
          text="These standards support how we maintain quality, safety, and consistency across operations."
        />
        <div className="mt-8 flex flex-wrap gap-2 border-y border-[var(--line)] py-5">
          {certificationStrip.map((item) => (
            <span
              key={item}
              className="gold-outline border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow">Final Statement</p>
            <h2 className="section-title mt-3">{homeContent.finalStatement.title}</h2>
            <p className="section-text mt-4 max-w-2xl">
              {homeContent.finalStatement.text}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="button-primary">
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
