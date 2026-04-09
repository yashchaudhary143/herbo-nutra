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
  homeStats,
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
    <div className="page-frame">
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
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/82">
                  {homeContent.heroSubtext}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="button-primary border-white bg-white text-[var(--green-950)] hover:bg-[var(--surface-muted)]"
                  >
                    Send Inquiry
                  </Link>
                  <Link
                    href="/products"
                    className="button-secondary border-white/28 bg-white/10 text-white hover:border-white/60 hover:bg-white/14"
                  >
                    View products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-band-accent">
        <div className="section-shell home-band">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="home-panel p-6 md:p-8">
              <SectionIntro
                title={homeContent.positioning.title}
                text={homeContent.positioning.text}
                align="compact"
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {homeContent.innovation.formats.map((value) => (
                  <span key={value} className="home-chip">
                    {value}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {homeStats.map((stat) => (
                <div key={stat.label} className="home-stat-card">
                  <p className="home-stat-value">{stat.value}</p>
                  <p className="home-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center">
              <SectionIntro
                title={homeContent.aboutSnapshot.title}
                text={homeContent.aboutSnapshot.body[0]}
                align="compact"
              />
              <p className="mt-4 editorial-copy">
                {homeContent.aboutSnapshot.body[1]}
              </p>
            </div>
            <MediaPlaceholder media={homeContent.processMedia} className="min-h-[400px]" badge="Understanding" />
          </div>
        </div>
      </section>

      <section className="home-band-framed">
        <div className="section-shell home-band">
          <SectionIntro
            title={homeContent.productExperience.title}
            text={homeContent.productExperience.intro}
            align="compact"
          />
          <div className="home-feature-grid">
            {homeContent.productExperience.points.map((item) => (
              <div key={item} className="home-feature-row">
                <span aria-hidden="true" className="home-feature-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
            {homeContent.productExperience.closing}
          </p>
        </div>
      </section>

      <section className="home-band">
        <div className="section-shell">
          <SectionIntro
            title="Browse the product range"
            text="Category views stay available for faster scanning before moving into the full specification table."
            align="compact"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {teaserCards.map((item) => (
              <article key={item.slug} className="plain-panel category-card overflow-hidden">
                <MediaPlaceholder media={item.media} className="min-h-[240px]" />
                <div className="p-6">
                  <h3 className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">
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
        </div>
      </section>

      <section className="home-band-muted">
        <div className="section-shell home-band grid gap-6 lg:grid-cols-[1fr_1fr]">
          <MediaPlaceholder media={homeContent.processMedia} className="min-h-[420px]" badge="Manufacturing" />
          <div className="flex flex-col justify-center">
            <SectionIntro
              title={homeContent.process.title}
              text={homeContent.process.text}
              align="compact"
            />
            <div className="mt-8">
              <Link href="/extraction-process" className="button-link">
                Explore manufacturing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-band">
        <div className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <SectionIntro
              title={homeContent.innovation.title}
              text={homeContent.innovation.text}
              align="compact"
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
        </div>
      </section>

      <section className="home-band-framed">
        <div className="section-shell home-band">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="home-editorial-card">
              <SectionIntro
                title={homeContent.sustainability.title}
                text={homeContent.sustainability.text}
                align="compact"
              />
              <div className="mt-6">
                <Link href="/sustainability" className="button-link">
                  Read sustainability approach
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="home-editorial-card">
              <SectionIntro
                title={homeContent.global.title}
                text={homeContent.global.text}
                align="compact"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-band-accent">
        <div className="section-shell home-band">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center">
              <SectionIntro
                title={homeContent.team.title}
                text={homeContent.team.text}
                align="compact"
              />
              <div className="mt-6">
                <Link href="/about" className="button-link">
                  Meet the team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <MediaPlaceholder media={homeContent.founderMedia} className="min-h-[420px]" badge="Leadership" />
          </div>

          <div className="mt-10 border-t border-[var(--line)] pt-10">
            <SectionIntro
              title="Defined by Structured Systems"
              text="These standards support how we maintain quality, safety, and consistency across operations."
              align="compact"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {certificationStrip.map((item) => (
                <span
                  key={item}
                  className="gold-outline border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 md:py-20">
        <div className="home-cta-panel">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">Final Statement</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white md:text-5xl">
                {homeContent.finalStatement.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">
                {homeContent.finalStatement.text}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="button-primary border-white bg-white text-[var(--green-950)] hover:bg-[var(--surface-muted)]">
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
