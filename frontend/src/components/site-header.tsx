import Link from "next/link";

import { company, navigation, utilityBar } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(255,255,255,0.96)] backdrop-blur-md">
      <div className="border-b border-[var(--line)] bg-[var(--green-950)] text-white">
        <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-2 text-xs">
          <div className="flex flex-wrap gap-4 text-white/80">
            {utilityBar.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <a href={`tel:${company.phone}`} className="font-medium text-white">
            {company.phone}
          </a>
        </div>
      </div>

      <div className="section-shell flex flex-wrap items-center justify-between gap-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center border border-[var(--line-strong)] bg-white font-display text-lg font-semibold text-[var(--green-950)]">
            HN
          </div>
          <div>
            <p className="text-base font-semibold text-[var(--foreground)]">{company.shortName}</p>
            <p className="text-xs text-[var(--muted)]">Herbal and nutraceutical ingredients</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium text-[var(--foreground)]">
            Home
          </Link>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact" className="button-secondary">
            Contact
          </Link>
          <Link href="/inquiry" className="button-primary">
            Send Inquiry
          </Link>
        </div>
      </div>

      <div className="section-shell pb-4 lg:hidden">
        <nav className="flex flex-wrap gap-2">
          <Link href="/" className="border border-[var(--line-strong)] bg-white px-3 py-2 text-sm font-medium">
            Home
          </Link>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="border border-[var(--line-strong)] bg-white px-3 py-2 text-sm font-medium text-[var(--muted)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
