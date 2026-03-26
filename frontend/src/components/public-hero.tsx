import { MediaPlaceholder } from "@/components/media-placeholder";
import type { MediaSlot } from "@/lib/site";

type PublicHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  media: MediaSlot;
  actions?: React.ReactNode;
  stats?: Array<{ value: string; label: string }>;
};

export function PublicHero({ eyebrow, title, description, media, actions, stats }: PublicHeroProps) {
  return (
    <section className="pt-0">
      <div className="relative overflow-hidden">
        <MediaPlaceholder media={media} className="min-h-[320px] md:min-h-[420px]" hideContent />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,89,55,0.68)_0%,rgba(31,89,55,0.38)_42%,rgba(31,89,55,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 top-0 flex items-center">
          <div className="section-shell w-full">
            <div className="max-w-3xl py-4 md:py-6">
              {eyebrow ? (
                <p className="text-sm font-medium tracking-[0.08em] text-white/82">{eyebrow}</p>
              ) : null}
              <h1 className="mt-3 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
                {description}
              </p>
              {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
              {stats?.length ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="border-l border-white/28 pl-4">
                      <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-white/72">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="section-shell">
        <div className="border-b border-[var(--line)]" />
      </div>
    </section>
  );
}
