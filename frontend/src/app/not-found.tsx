import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-shell py-24">
      <div className="glass-panel rounded-[2rem] p-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-[var(--forest-900)]">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
          The route may have moved, or the page has not been published yet.
        </p>
        <Link href="/" className="button-primary mt-8">
          Return Home
        </Link>
      </div>
    </div>
  );
}
