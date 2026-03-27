import Image from "next/image";

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
};

export function MediaPlaceholder({ media, className, badge }: MediaPlaceholderProps) {
  return (
    <div className={cn("relative overflow-hidden border border-[var(--line)] bg-white", toneStyles[media.tone], className)}>
      {media.src ? (
        <Image
          src={media.src}
          alt={media.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={media.tone === "hero"}
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(25,33,29,0.08))]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(25,33,29,0.16))]" />
      {badge ? (
        <div className="absolute left-5 top-5 z-10 border border-white/70 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] backdrop-blur">
          {badge}
        </div>
      ) : null}
    </div>
  );
}
