"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { clientApiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await clientApiFetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8f5ed_0%,#f0ead9_100%)]">
      <div className="section-shell grid gap-6 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="admin-card h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--forest-700)]">
            Admin Panel
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--forest-900)]">
            Herbo Nutra
          </h1>
          <div className="mt-6 flex flex-col gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "admin-shell-link",
                    active && "admin-shell-link-active",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--forest-900)] transition hover:bg-[var(--forest-100)]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
