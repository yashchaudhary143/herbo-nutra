"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CustomSelect } from "@/components/custom-select";
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
        <div className="admin-panel-header">
          <p className="eyebrow">Lead Pipeline</p>
          <h2 className="admin-title">Every inquiry stays visible even if notifications fail.</h2>
          <p className="admin-lead">
            Update lead status here even when downstream email or WhatsApp delivery is delayed or skipped.
          </p>
        </div>
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
                  <div className="space-y-0.5">
                    <p className="font-semibold text-[var(--forest-900)]">{item.name}</p>
                    <p>{item.company_name}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                  </div>
                </td>
                <td>
                  <p className="font-semibold">{item.product_requirement}</p>
                  <p className="mt-1.5 max-w-md text-[0.95rem] leading-6 text-[var(--muted)]">
                    {item.message}
                  </p>
                </td>
                <td className="capitalize">{item.source}</td>
                <td>
                  <div className="space-y-1 text-[0.92rem] text-[var(--muted)]">
                    <p>
                      <span className="font-medium text-[var(--foreground)]">Email:</span>{" "}
                      {item.email_status}
                    </p>
                    <p>
                      <span className="font-medium text-[var(--foreground)]">WhatsApp:</span>{" "}
                      {item.whatsapp_status}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="min-w-[170px]">
                    <CustomSelect
                      options={statuses.map((status) => ({
                        value: status,
                        label: status,
                      }))}
                    value={item.status}
                      onChange={(value) => handleStatusChange(item.id, value)}
                      ariaLabel={`Update status for ${item.name}`}
                    />
                  </div>
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
