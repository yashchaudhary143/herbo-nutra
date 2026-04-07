import Image from "next/image";

type ManufacturingFlowchartCardProps = {
  title: string;
  subtitle: string;
  image: string;
  steps: string[];
};

export function ManufacturingFlowchartCard({
  title,
  subtitle,
  image,
  steps,
}: ManufacturingFlowchartCardProps) {
  return (
    <article className="plain-panel overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
        <div className="soft-panel flex items-center justify-center p-6">
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <p className="eyebrow">{subtitle}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            {title}
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-4">
            {steps.map((step, index) => (
              <div key={`${title}-${step}`} className="flex items-center gap-2">
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(18,33,25,0.06)]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--green-950)] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="max-w-[17rem] text-sm font-medium leading-6 text-[var(--foreground)]">
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 ? (
                  <span className="text-lg font-semibold text-[var(--gold-500)]">→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
