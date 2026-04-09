"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type MediaCarouselItem = {
  type: "image" | "video";
  src: string;
  title: string;
  note: string;
};

type MediaCarouselProps = {
  items: MediaCarouselItem[];
  badge?: string;
  className?: string;
};

export function MediaCarousel({ items, badge, className }: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative overflow-hidden border border-[var(--line)] bg-white">
        <div className="relative min-h-[420px]">
          <Image
            src={activeItem.src}
            alt={activeItem.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(25,33,29,0.18))]" />
          {badge ? (
            <div className="absolute left-5 top-5 z-10 border border-white/70 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] backdrop-blur">
              {badge}
            </div>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 z-10 bg-[linear-gradient(180deg,rgba(13,20,16,0),rgba(13,20,16,0.72))] p-5 text-white">
            <div className="flex items-center gap-3">
              {activeItem.type === "video" ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/14 backdrop-blur">
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
              ) : null}
              <div>
                <p className="text-sm font-semibold">
                  {activeItem.type === "video" ? "Placeholder Video" : activeItem.title}
                </p>
                <p className="mt-1 text-sm text-white/80">{activeItem.note}</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 left-0 z-10 flex items-center p-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/82 text-[var(--foreground)] shadow-[0_10px_30px_rgba(18,33,25,0.16)] backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 z-10 flex items-center p-3">
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/82 text-[var(--foreground)] shadow-[0_10px_30px_rgba(18,33,25,0.16)] backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={`${item.type}-${item.title}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative overflow-hidden border bg-white text-left transition",
              activeIndex === index
                ? "border-[var(--green-900)] shadow-[0_12px_32px_rgba(18,33,25,0.12)]"
                : "border-[var(--line)] hover:border-[var(--line-strong)]",
            )}
          >
            <div className="relative h-20">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(25,33,29,0.26))]" />
              {item.type === "video" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/88 text-[var(--foreground)]">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                </div>
              ) : null}
            </div>
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-[var(--foreground)]">
                {item.type === "video" ? "Video" : item.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
