"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, clientApiFetch, PaginatedInquiries } from "@/lib/api";

const statuses = ["new", "contacted", "qualified", "closed"];

export function AdminInquiryManager() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<PaginatedInquiries | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function reloadInquiries() {
    try {
      const response = await clientApiFetch<PaginatedInquiries>("/api/admin/inquiries?limit=100");
      setInquiries(response);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        router.push("/admin/login");
        return;
      }
      setError(requestError instanceof Error ? requestError.message : "Unable to load inquiries.");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadOnMount() {
      try {
        const response = await clientApiFetch<PaginatedInquiries>("/api/admin/inquiries?limit=100");
        if (!cancelled) {
          setInquiries(response);
        }
      } catch (requestError) {
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load inquiries.");
        }
      }
    }

    void loadOnMount();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleStatusChange(id: number, status: string) {
    await clientApiFetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await reloadInquiries();
  }

  return (
    <div className="space-y-6">
      <div className="admin-card">
        <p className="eyebrow">Lead Pipeline</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--forest-900)]">
          Every inquiry stays visible even if notifications fail.
        </h2>
      </div>
      {error ? <div className="admin-card text-sm text-red-600">{error}</div> : null}
      <div className="admin-card overflow-x-auto">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Requirement</th>
              <th>Source</th>
              <th>Delivery</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries?.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="space-y-1">
                    <p className="font-semibold text-[var(--forest-900)]">{item.name}</p>
                    <p>{item.company_name}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                  </div>
                </td>
                <td>
                  <p className="font-semibold">{item.product_requirement}</p>
                  <p className="mt-2 max-w-md">{item.message}</p>
                </td>
                <td className="capitalize">{item.source}</td>
                <td>
                  <p>Email: {item.email_status}</p>
                  <p>WhatsApp: {item.whatsapp_status}</p>
                </td>
                <td>
                  <select
                    className="field min-w-[140px]"
                    value={item.status}
                    onChange={(event) => handleStatusChange(item.id, event.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            )) ?? (
              <tr>
                <td colSpan={5} className="bg-white/90 px-5 py-10 text-center text-sm text-[var(--muted)]">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
