import Link from "next/link";

import { certificationStrip, company, navigation } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[var(--green-950)] text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.7fr_0.9fr]">
        <div>
          <p className="eyebrow text-[var(--gold-100)]">Herbo Nutra Extract</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
            Botanical and nutraceutical ingredients with a clear B2B path.
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            {certificationStrip.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Pages</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/76">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-white/76">
            <p>{company.address}</p>
            <p>
              <a href={`tel:${company.phone}`}>{company.phone}</a>
            </p>
            <p>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p>WhatsApp: {company.whatsapp}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
