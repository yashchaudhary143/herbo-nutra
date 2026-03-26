import { cn } from "@/lib/utils";
import type { MediaSlot, MediaTone } from "@/lib/site";

const toneStyles: Record<MediaTone, string> = {
  hero: "bg-[linear-gradient(135deg,#dceedd_0%,#eef8ef_48%,#ffffff_100%)]",
  botanical: "bg-[linear-gradient(135deg,#dff1e1_0%,#f0f9f1_50%,#ffffff_100%)]",
  facility: "bg-[linear-gradient(135deg,#e3f0e4_0%,#f4faf4_52%,#ffffff_100%)]",
  lab: "bg-[linear-gradient(135deg,#e8f4e8_0%,#f7fbf7_52%,#ffffff_100%)]",
  packaging: "bg-[linear-gradient(135deg,#e9f2e6_0%,#f6faf3_50%,#fffdf8_100%)]",
  portrait: "bg-[linear-gradient(135deg,#e4efe5_0%,#f4f9f4_50%,#ffffff_100%)]",
  catalog: "bg-[linear-gradient(135deg,#edf5ea_0%,#f8fbf7_52%,#ffffff_100%)]",
};

type MediaPlaceholderProps = {
  media: MediaSlot;
  className?: string;
  badge?: string;
  hideContent?: boolean;
};

export function MediaPlaceholder({ media, className, badge, hideContent = false }: MediaPlaceholderProps) {
  return (
    <div className={cn("relative overflow-hidden border border-[var(--line)]", toneStyles[media.tone], className)}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(25,33,29,0.08))]" />
      {badge ? (
        <div className="absolute left-5 top-5 z-10 border border-white/70 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] backdrop-blur">
          {badge}
        </div>
      ) : null}
      {!hideContent ? (
        <div className="relative flex h-full min-h-[260px] items-end p-5 md:p-7">
          <div className="max-w-sm bg-white/88 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--green-800)]">
              Image Placeholder
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              {media.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{media.note}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
