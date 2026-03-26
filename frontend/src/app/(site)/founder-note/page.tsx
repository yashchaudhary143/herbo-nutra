import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/media-placeholder";
import { PublicHero } from "@/components/public-hero";
import { buildMetadata, founderContent, seoDescriptions } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Founder’s Note",
  description: seoDescriptions.founder,
  path: "/founder-note",
});

export default function FounderNotePage() {
  return (
    <div className="page-frame page-gap">
      <PublicHero
        eyebrow="Founder"
        title={founderContent.title}
        description={founderContent.summary}
        media={founderContent.media}
      />

      <section className="section-shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="max-w-3xl space-y-6">
            {founderContent.body.map((paragraph) => (
              <p key={paragraph} className="editorial-copy">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {founderContent.values.map((value) => (
              <span key={value} className="border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]">
                {value}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/inquiry" className="button-link">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <MediaPlaceholder media={founderContent.media} className="min-h-[440px]" badge="Founder Portrait" />
      </section>
    </div>
  );
}
