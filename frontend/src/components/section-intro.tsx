type SectionIntroProps = {
  label?: string;
  title: string;
  text?: string;
  align?: "left" | "split" | "compact";
};

export function SectionIntro({ label, title, text, align = "left" }: SectionIntroProps) {
  if (align === "split") {
    return (
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          {label ? <p className="eyebrow">{label}</p> : null}
          <h2 className="section-title mt-3">{title}</h2>
        </div>
        {text ? <p className="section-text max-w-2xl">{text}</p> : <div />}
      </div>
    );
  }

  if (align === "compact") {
    return (
      <div className="max-w-2xl">
        {label ? <p className="eyebrow">{label}</p> : null}
        <h2 className="mt-2 font-display text-[3rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--foreground)] md:text-[4rem]">
          {title}
        </h2>
        {text ? <p className="mt-3 text-xl leading-7 text-[var(--muted)]">{text}</p> : null}
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {label ? <p className="eyebrow">{label}</p> : null}
      <h2 className="section-title mt-3">{title}</h2>
      {text ? <p className="section-text mt-4">{text}</p> : null}
    </div>
  );
}
