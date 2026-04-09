import Link from "next/link";
import { ArrowRight, Leaf, Zap, Globe } from "lucide-react";

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

      <section className="section-shell py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">{homeContent.positioning.title}</h2>
          <p className="section-text mt-6">{homeContent.positioning.text}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-gradient-to-br from-green-50/50 to-slate-50/50 p-6 border border-green-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-semibold text-[var(--foreground)]">Products & Ingredients</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Wide range of botanical and nutraceutical ingredients across multiple categories</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-green-50/50 to-slate-50/50 p-6 border border-green-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-semibold text-[var(--foreground)]">Multiple Formats</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Available in powders, extracts, and advanced formulation formats for your needs</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-green-50/50 to-slate-50/50 p-6 border border-green-200/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-semibold text-[var(--foreground)]">Quality Assured</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Stringent standards and certifications for safety, purity, and consistency</p>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h2 className="section-title">Why Choose Herbo Nutra</h2>
            <p className="section-text mt-6">{homeContent.aboutSnapshot.body[0]}</p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{homeContent.aboutSnapshot.body[1]}</p>
            <div className="mt-8">
              <Link href="/about" className="button-link">
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <MediaPlaceholder media={homeContent.processMedia} className="min-h-[400px]" badge="Expertise" />
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">Our Core Strengths</h2>
          <p className="section-text mt-6">{homeContent.productExperience.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Leaf, title: "Botanical Excellence", text: "Premium botanical ingredients sourced and processed with precision" },
            { icon: Zap, title: "Advanced Processing", text: "State-of-the-art extraction and formulation technology" },
            { icon: Globe, title: "Global Standards", text: "Quality certifications and compliance with international regulations" }
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <item.icon className="h-8 w-8 text-[var(--green-800)] mb-4" />
              <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-base leading-8 text-[var(--muted)] max-w-3xl">{homeContent.productExperience.closing}</p>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">Browse product range</h2>
          <p className="section-text mt-6">Category views for faster scanning of our complete ingredient portfolio, from traditional botanicals to advanced formulations.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teaserCards.map((item) => (
            <article key={item.slug} className="rounded-2xl overflow-hidden bg-white hover:shadow-md hover:-translate-y-0.5 transition-all border border-green-200/20">
              <MediaPlaceholder media={item.media} className="min-h-[200px]" />
              <div className="p-6">
                <h3 className="font-semibold text-[var(--foreground)] text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
                <Link href={`/products/${item.slug}`} className="button-link mt-4">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <MediaPlaceholder media={homeContent.processMedia} className="min-h-[380px]" badge="Manufacturing" />
          <div className="flex flex-col justify-center">
            <h2 className="section-title">Manufacturing Process</h2>
            <p className="section-text mt-6">{homeContent.process.text}</p>
            <Link href="/extraction-process" className="button-link mt-8">
              Explore manufacturing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="section-title">Advanced Formats</h2>
            <p className="section-text mt-6">{homeContent.innovation.text}</p>
            <div className="mt-8 grid gap-2 grid-cols-2 md:grid-cols-3">
              {homeContent.innovation.formats.map((value) => (
                <span
                  key={value}
                  className="rounded-lg bg-gradient-to-br from-green-50/30 to-slate-50/30 px-4 py-2 text-sm font-medium text-[var(--foreground)] border border-green-200/30"
                >
                  {value}
                </span>
              ))}
            </div>
            <p className="mt-8 text-base leading-8 text-[var(--muted)]">{homeContent.innovation.closing}</p>
            <Link href="/npd" className="button-link mt-8">
              Explore advanced formats
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <MediaPlaceholder media={homeContent.founderMedia} className="min-h-[380px]" badge="Innovation" />
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-semibold text-[var(--foreground)] text-lg">{homeContent.sustainability.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{homeContent.sustainability.text}</p>
            <Link href="/sustainability" className="button-link mt-5">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30">
            <h3 className="font-semibold text-[var(--foreground)] text-lg">{homeContent.global.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{homeContent.global.text}</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-green-50/30 to-slate-50/30 p-6 border border-green-200/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="font-semibold text-[var(--foreground)] text-lg">{homeContent.team.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{homeContent.team.text}</p>
            <Link href="/about" className="button-link mt-5">
              Meet the team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 md:py-16">
        <div className="max-w-3xl">
          <h2 className="section-title">Quality Standards & Certifications</h2>
          <p className="section-text mt-6">These certifications and standards support how we maintain quality, safety, and consistency across all our operations.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {certificationStrip.map((item) => (
            <div
              key={item}
              className="rounded-lg bg-gradient-to-br from-green-50/50 to-slate-50/50 px-4 py-3 text-sm font-medium text-[var(--foreground)] border border-green-200/40 text-center hover:shadow-sm transition-all"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
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
      </section>
    </div>
  );
}
