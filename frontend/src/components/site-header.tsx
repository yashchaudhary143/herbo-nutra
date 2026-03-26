"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { company, navigation, utilityBar } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="relative sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(255,255,255,0.96)] backdrop-blur-md">
      <div className="hidden border-b border-[var(--line)] bg-[var(--green-950)] text-white lg:block">
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

      <div className="section-shell flex items-center justify-between gap-3 py-3 lg:py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] bg-white font-display text-base font-semibold text-[var(--green-950)] lg:h-12 lg:w-12 lg:text-lg">
            HN
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--foreground)] lg:text-base">
              <span className="sm:hidden">Herbo Nutra</span>
              <span className="hidden sm:inline">{company.shortName}</span>
            </p>
            <p className="hidden text-xs leading-tight text-[var(--muted)] lg:block">{company.name}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-sm font-medium text-[var(--foreground)]">
            Home
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="button-secondary">
            Contact
          </Link>
          <Link href="/inquiry" className="button-primary">
            Send Inquiry
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--foreground)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full z-50 border-t border-[var(--line)] bg-white shadow-[0_16px_40px_rgba(18,33,25,0.12)] lg:hidden ${
          open ? "max-h-[calc(100dvh-4.75rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        } overflow-y-auto transition-[max-height,opacity] duration-200`}
      >
        <div className="section-shell min-h-[calc(100dvh-4.75rem)] pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 sm:pb-[calc(2rem+env(safe-area-inset-bottom))]">
          <nav className="grid gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="border border-[var(--line-strong)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-medium text-[var(--foreground)]"
            >
              Home
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border border-[var(--line-strong)] bg-white px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid gap-3 pb-10 sm:grid-cols-2 sm:pb-12">
            <Link href="/contact" className="button-secondary">
              Contact
            </Link>
            <Link href="/inquiry" className="button-primary">
              Send Inquiry
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
