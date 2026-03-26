import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { fetchCategories } from "@/lib/api";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { SectionIntro } from "@/components/section-intro";
import {
  buildMetadata,
  categoryTeasers,
  certificationStrip,
  founderContent,
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
          <MediaPlaceholder media={homeContent.heroMedia} className="min-h-[520px] md:min-h-[680px]" hideContent />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,89,55,0.68)_0%,rgba(31,89,55,0.34)_42%,rgba(31,89,55,0.08)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center">
            <div className="section-shell w-full">
              <div className="max-w-2xl py-4 md:py-6 lg:py-8">
              <p className="text-sm font-medium tracking-[0.08em] text-white/82">
                Herbo Nutra Extract Pvt. Ltd.
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">
                Herbal and nutraceutical ingredients for B2B supply.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/82 md:text-lg">
                Clear product categories, visible manufacturing context, and a direct inquiry path.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="button-primary border-white bg-white text-[var(--green-950)] hover:bg-[var(--surface-muted)]">
                  Contact
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-wrap gap-2 border-y border-[var(--line)] py-5">
          {certificationStrip.map((item) => (
            <span key={item} className="border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro
          label="Product Categories"
          title="Browse by category."
          text="Move from category overview into the product table without extra noise."
          align="split"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {teaserCards.map((item) => (
            <article key={item.slug} className="plain-panel overflow-hidden">
              <MediaPlaceholder media={item.media} className="min-h-[240px]" badge={item.title} />
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
            title="Process visibility matters."
            text="Show buyers how raw material, extraction, quality checks, and packing fit together."
          />
          <div className="mt-8 grid gap-5">
            {homeContent.highlights.slice(0, 2).map((item) => (
              <div key={item.title} className="border-t border-[var(--line)] pt-5">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
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
            label="Founder"
            title="A simple founder note."
            text={founderContent.summary}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {founderContent.values.map((value) => (
              <span key={value} className="border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]">
                {value}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/founder-note" className="button-link">
              Read founder note
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <MediaPlaceholder media={homeContent.founderMedia} className="min-h-[420px]" badge="Leadership" />
      </section>

      <section className="section-shell">
        <div className="grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title mt-3">Need a product, specification, or quote?</h2>
          <p className="section-text mt-4 max-w-2xl">
            Send the requirement directly and the team can respond with the next step.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="button-primary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
