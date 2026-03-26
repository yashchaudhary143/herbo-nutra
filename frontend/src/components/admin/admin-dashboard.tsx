"use client";

import { Boxes, Layers3, MessageSquareMore, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, clientApiFetch, DashboardStats } from "@/lib/api";

const cards = [
  { key: "categories", label: "Categories", icon: Layers3 },
  { key: "products", label: "Products", icon: Boxes },
  { key: "inquiries", label: "Inquiries", icon: MessageSquareMore },
  { key: "new_inquiries", label: "New Leads", icon: Sparkles },
] as const;

export function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clientApiFetch<DashboardStats>("/api/admin/dashboard")
      .then(setStats)
      .catch((requestError) => {
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.push("/admin/login");
          return;
        }
        setError(requestError instanceof Error ? requestError.message : "Unable to load dashboard.");
      });
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="admin-card">
        <p className="eyebrow">Operations Snapshot</p>
        <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-[var(--forest-900)]">
          Lead generation and catalog control in one place.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          Track product coverage, incoming leads, and immediate workload from the same admin surface.
        </p>
      </div>
      {error ? <div className="admin-card text-sm text-red-600">{error}</div> : null}
      <div className="admin-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="admin-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--muted)]">{card.label}</p>
                <Icon className="h-5 w-5 text-[var(--gold-500)]" />
              </div>
              <p className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-[var(--forest-900)]">
                {stats ? stats[card.key] : "--"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
