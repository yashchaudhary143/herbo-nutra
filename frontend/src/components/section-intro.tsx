type SectionIntroProps = {
  label?: string;
  title: string;
  text?: string;
  align?: "left" | "split";
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

  return (
    <div className="max-w-3xl">
      {label ? <p className="eyebrow">{label}</p> : null}
      <h2 className="section-title mt-3">{title}</h2>
      {text ? <p className="section-text mt-4">{text}</p> : null}
    </div>
  );
}
