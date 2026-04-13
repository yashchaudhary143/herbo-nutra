import Link from "next/link";

import { certificationStrip, company, navigation } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[var(--green-950)] text-white">
      <div className="section-shell grid gap-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Herbo Nutra Extract</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
              Botanical and nutraceutical ingredients with a clear B2B path.
            </h2>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <div className="mt-3 space-y-2 text-sm leading-6 text-white/76">
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

        <div className="grid gap-4 border-t border-white/10 pt-4 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">Pages</p>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/76 sm:grid-cols-4">
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
            <p className="text-sm font-semibold text-white">Certifications</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              {certificationStrip.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
