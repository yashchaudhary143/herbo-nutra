"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderTree, Gauge, FlaskConical, Inbox, LogOut, PackageSearch } from "lucide-react";

import { clientApiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: Gauge },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/methods", label: "Methods", icon: FlaskConical },
  { href: "/admin/products", label: "Products", icon: PackageSearch },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
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
        <aside className="admin-sidebar">
          <div className="admin-sidebar-content">
            <div className="border-b border-[var(--line-admin)] px-4 py-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--forest-700)]">
                Admin Panel
              </p>
              <h1 className="admin-shell-title">Herbo Nutra</h1>
              <p className="admin-shell-subtitle">Catalog and inquiry operations.</p>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin navigation">
            {links.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "admin-shell-link gap-2.5",
                    active && "admin-shell-link-active",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            </nav>
            <button
              type="button"
              onClick={handleLogout}
              className="button-secondary m-3 mt-auto flex w-[calc(100%-1.5rem)] items-center justify-center gap-2 border-[var(--line-admin)] bg-white py-2.5 text-[var(--forest-900)] hover:bg-[var(--surface-muted)]"
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
