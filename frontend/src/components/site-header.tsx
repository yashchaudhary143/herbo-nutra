"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { company, navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="relative sticky top-0 z-40 bg-[rgba(255,255,255,0.97)] shadow-[0_10px_30px_rgba(18,33,25,0.08)] backdrop-blur-md">
      <div className="section-shell flex items-center justify-between gap-4 py-3 lg:py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden bg-transparent lg:h-16 lg:w-16">
            <Image
              src="/HerboNutraLogo.png"
              alt={`${company.shortName} logo`}
              width={64}
              height={64}
              unoptimized
              priority
              className="h-full w-full object-contain"
            />
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
          <Link
            href="/"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              isActive("/")
                ? "bg-[var(--green-100)] text-[var(--green-950)] shadow-[inset_0_0_0_1px_rgba(31,89,55,0.14)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
            )}
          >
            Home
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                isActive(item.href)
                  ? "bg-[var(--green-100)] text-[var(--green-950)] shadow-[inset_0_0_0_1px_rgba(31,89,55,0.14)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

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
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "border px-4 py-3 text-sm font-medium transition",
                  isActive(item.href)
                    ? "border-[var(--green-900)] bg-[var(--surface-muted)] text-[var(--green-950)]"
                    : "border-[var(--line-strong)] bg-white text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pb-10 sm:pb-12">
            <Link href="/contact" onClick={closeMenu} className="button-primary w-full">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
