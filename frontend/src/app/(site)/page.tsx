import Link from "next/link";
import { ArrowRight, Globe, Leaf, Settings2 } from "lucide-react";

import { fetchCategories } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionIntro } from "@/components/section-intro";
import {
  buildMetadata,
  getCategoryMedia,
  getCategorySummary,
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

  const whyChooseUs = [
    {
      icon: Leaf,
      title: "Application-ready ingredients",
      text: "Botanical and nutraceutical ingredients developed for practical use, stability, and formulation fit.",
    },
    {
      icon: Settings2,
      title: "Controlled processing",
      text: "Measured manufacturing systems designed to keep quality, consistency, and repeatability aligned.",
    },
    {
      icon: Globe,
      title: "Reliable commercial support",
      text: "Clear specifications, responsive communication, and supply-focused execution for B2B buyers.",
    },
  ];

  const trustHighlights = [
    homeContent.sustainability,
    homeContent.global,
    homeContent.team,
  ];

  return (
    <div className="page-frame">
      <section id="hero" className="pt-0">
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
                    className="inline-flex min-w-[11.5rem] items-center justify-center rounded-full border border-white bg-white px-6 py-3.5 text-sm font-semibold text-[var(--green-950)] transition hover:bg-[var(--surface-muted)]"
                  >
                    Send Inquiry
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex min-w-[11.5rem] items-center justify-center rounded-full border border-white/55 bg-white/14 px-6 py-3.5 text-sm font-semibold !text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition hover:border-white/75 hover:bg-white/20"
                  >
                    View products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="positioning" className="border-t border-[var(--line)]">
        <div className="section-shell py-10 md:py-16">
          <div className="max-w-3xl">
            <h2 className="section-title">{homeContent.positioning.title}</h2>
            <p className="section-text mt-6">{homeContent.positioning.text}</p>
          </div>

          <div className="summary-grid">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="feature-card-soft">
                <item.icon className="mb-4 h-8 w-8 text-[var(--green-800)]" />
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="section-shell py-10 md:py-16">
          <div className="max-w-3xl">
            <SectionIntro
              title="Browse product range"
              text="Explore categories to align ingredients, formats, and specifications with your formulation goals."
              align="compact"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => (
              <article key={category.id} className="category-card">
                <MediaPlaceholder media={getCategoryMedia(category, index)} className="min-h-[220px]" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--foreground)]">{category.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {getCategorySummary(category)}
                  </p>
                  <Link href={`/products/${category.slug}`} className="button-link mt-5">
                    Explore category
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="manufacturing-preview" className="border-t border-[var(--line)]">
        <div className="section-shell py-10 md:py-16">
          <div className="editorial-split">
            <MediaPlaceholder media={homeContent.processMedia} className="min-h-[420px]" badge="Manufacturing" />
            <div className="max-w-2xl">
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
        </div>
      </section>

      <section id="formats-preview" className="border-t border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="section-shell py-10 md:py-16">
          <div className="editorial-split lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <SectionIntro
                title={homeContent.innovation.title}
                text={homeContent.innovation.text}
                align="compact"
              />
              <div className="mt-8 flex flex-wrap gap-3">
                {homeContent.innovation.formats.map((value) => (
                  <span key={value} className="home-chip">
                    {value}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-base leading-8 text-[var(--muted)]">{homeContent.innovation.closing}</p>
              <div className="mt-8">
                <Link href="/npd" className="button-link">
                  Explore advanced formats
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <MediaPlaceholder media={homeContent.founderMedia} className="min-h-[420px]" badge="Formats" />
          </div>
        </div>
      </section>

      <section id="trust" className="border-t border-[var(--line)]">
        <div className="section-shell py-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <SectionIntro
                title="Trust built into the system"
                text="Our public presentation is supported by consistent quality systems, controlled operations, and a team focused on practical buyer requirements."
                align="compact"
              />
              <div className="mt-8">
                <Link href="/about" className="button-link">
                  Learn more about the team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              {trustHighlights.map((item) => (
                <div key={item.title} className="trust-row">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="border-t border-[var(--line)]">
        <div className="section-shell py-12 md:py-18">
          <div className="home-cta-panel">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">Ready to start</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-5xl">
                {homeContent.finalStatement.title}
              </h2>
              <p className="mt-6 text-base leading-8 text-white/78">
                {homeContent.finalStatement.text}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="button-primary border-white bg-white text-[var(--green-950)] hover:bg-[var(--surface-muted)]">
                  Send inquiry
                </Link>
                <Link href="/products" className="button-primary border-white/50 bg-transparent text-white hover:bg-white/10">
                  View products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
