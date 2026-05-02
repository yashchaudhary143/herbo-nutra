"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import type { Category } from "@/lib/api";
import { company, navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  categories: Category[];
};

export function SiteHeader({ categories }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const productSections = categories.map((category) => ({
    label: category.name,
    href: `/products/${category.slug}`,
  }));
  const navSections: Record<string, { label: string; href: string }[]> = {
    "/": [
      { label: "Overview", href: "/#hero" },
      { label: "Why Us", href: "/#positioning" },
      { label: "Categories", href: "/#categories" },
      { label: "Manufacturing", href: "/#manufacturing-preview" },
      { label: "Formats", href: "/#formats-preview" },
      { label: "Quality & Trust", href: "/#trust" },
      { label: "Get Started", href: "/#cta" },
    ],
    "/about": [
      { label: "Overview", href: "/about#overview" },
      { label: "Team", href: "/about#team" },
      { label: "Documentation", href: "/about#documentation" },
      { label: "Certifications", href: "/about#certifications" },
    ],
    "/products": productSections,
    "/formats": [
      { label: "Overview", href: "/formats#formats-hero" },
      { label: "Available formats", href: "/formats#available-formats" },
    ],
    "/sustainability": [
      { label: "Overview", href: "/sustainability" },
      { label: "Approach", href: "/sustainability#approach" },
      { label: "Practices", href: "/sustainability#practices" },
    ],
    "/extraction-process": [
      { label: "Overview", href: "/extraction-process#overview" },
      { label: "Process highlights", href: "/extraction-process#process-highlights" },
      { label: "Process stages", href: "/extraction-process#process-stages" },
      { label: "Infrastructure", href: "/extraction-process#infrastructure" },
      { label: "Packaging", href: "/extraction-process#packaging" },
      { label: "Flowcharts", href: "/extraction-process#flowcharts" },
    ],
    "/contact": [
      { label: "Requirements", href: "/contact#requirements" },
      { label: "Contact form", href: "/contact#contact-form" },
    ],
  };
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavItem = (href: string, label: string) => {
    const sections = navSections[href] ?? [];

    return (
      <div key={href} className="group relative">
        <Link
          href={href}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-semibold transition",
            isActive(href)
              ? "bg-[var(--green-100)] text-[var(--green-950)] shadow-[inset_0_0_0_1px_rgba(31,89,55,0.18)]"
              : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
          )}
        >
          {label}
        </Link>
        {sections.length ? (
          <div className="pointer-events-none absolute left-1/2 top-full z-40 mt-3 w-max -translate-x-1/2 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
            <div className="absolute -top-4 left-0 right-0 h-6" />
            <div className="min-w-[220px] rounded-2xl border border-[var(--line)] bg-white p-2 shadow-[0_18px_40px_rgba(18,33,25,0.12)]">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="block rounded-xl px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
                >
                  {section.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <header className="relative sticky top-0 z-40 bg-[rgba(255,255,255,0.98)] shadow-[0_10px_28px_rgba(18,33,25,0.14)] backdrop-blur">
      <div className="section-shell flex items-center justify-between gap-3 py-2.5 lg:py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-16 w-16 overflow-hidden bg-transparent lg:h-[72px] lg:w-[72px]">
            <Image
              src="/HerboNutraLogo.png"
              alt={`${company.shortName} logo`}
              width={72}
              height={72}
              unoptimized
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-[var(--foreground)] lg:text-lg">
              <span className="sm:hidden">Herbo Nutra</span>
              <span className="hidden sm:inline">{company.shortName}</span>
            </p>
            <p className="hidden text-xs leading-tight text-[var(--muted)] lg:block">{company.name}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {renderNavItem("/", "Home")}
          {navigation.map((item) => renderNavItem(item.href, item.label))}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--foreground)] lg:hidden"
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
              className={cn(
                "border px-4 py-3 text-sm font-medium transition",
                isActive("/")
                  ? "border-[var(--green-900)] bg-[var(--surface-muted)] text-[var(--green-950)]"
                  : "border-[var(--line-strong)] bg-white text-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              Home
            </Link>
            {navigation.map((item) => (
              <div key={item.href} className="space-y-2">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "block border px-4 py-3 text-sm font-medium transition",
                    isActive(item.href)
                      ? "border-[var(--green-900)] bg-[var(--surface-muted)] text-[var(--green-950)]"
                      : "border-[var(--line-strong)] bg-white text-[var(--muted)] hover:text-[var(--foreground)]",
                  )}
                >
                  {item.label}
                </Link>
                {item.href === "/products" && productSections.length ? (
                  <div className="grid gap-2 pl-4">
                    {productSections.map((section) => (
                      <Link
                        key={section.href}
                        href={section.href}
                        onClick={closeMenu}
                        className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] transition hover:border-[var(--green-900)]"
                      >
                        {section.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="mt-4 pb-10 sm:pb-12">
            <Link href="/contact" onClick={closeMenu} className="button-primary w-full">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
