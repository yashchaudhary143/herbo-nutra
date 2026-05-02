"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { clientApiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/methods", label: "Methods" },
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
    <div className="admin-layout min-h-screen">
      <div className="section-shell grid admin-shell-grid">
        <aside className="admin-card admin-sidebar h-fit">
          <div className="admin-sidebar-content">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--forest-700)]">
              Admin Panel
            </p>
            <h1 className="admin-shell-title">Herbo Nutra</h1>
            <p className="admin-shell-subtitle">Catalog operations, method control, and inbound leads.</p>
            <div className="mt-6 flex flex-col gap-2.5">
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
              className="button-secondary mt-8 flex w-full items-center justify-center gap-2 rounded-[1.35rem] border-[var(--line-admin)] bg-white/72 py-3 text-[var(--forest-900)] hover:bg-[var(--surface-muted)]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
