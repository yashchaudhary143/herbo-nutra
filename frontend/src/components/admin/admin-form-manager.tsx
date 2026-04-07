"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, Form, clientApiFetch } from "@/lib/api";

type FormState = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
  is_npd_featured: boolean;
};

const emptyState: FormState = {
  name: "",
  slug: "",
  description: "",
  sort_order: 0,
  is_active: true,
  is_npd_featured: false,
};

export function AdminFormManager() {
  const router = useRouter();
  const [items, setItems] = useState<Form[]>([]);
  const [form, setForm] = useState<FormState>(emptyState);
  const [error, setError] = useState<string | null>(null);

  async function reloadForms() {
    try {
      const response = await clientApiFetch<Form[]>("/api/admin/forms");
      setItems(response);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        router.push("/admin/login");
        return;
      }
      setError(requestError instanceof Error ? requestError.message : "Unable to load forms.");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadOnMount() {
      try {
        const response = await clientApiFetch<Form[]>("/api/admin/forms");
        if (!cancelled) {
          setItems(response);
        }
      } catch (requestError) {
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load forms.");
        }
      }
    }

    void loadOnMount();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      if (form.id) {
        await clientApiFetch(`/api/admin/forms/${form.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await clientApiFetch("/api/admin/forms", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setForm(emptyState);
      await reloadForms();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save form.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this form?")) {
      return;
    }
    await clientApiFetch(`/api/admin/forms/${id}`, { method: "DELETE" });
    await reloadForms();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[440px_1fr]">
      <form className="admin-card grid gap-4" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">{form.id ? "Edit form" : "Add form"}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--forest-900)]">
            Product forms and technologies
          </h2>
        </div>
        <input
          className="field"
          placeholder="Form name"
          value={form.name}
          onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
        />
        <input
          className="field"
          placeholder="Slug"
          value={form.slug}
          onChange={(event) => setForm((state) => ({ ...state, slug: event.target.value }))}
        />
        <textarea
          className="field min-h-40"
          placeholder="Description"
          value={form.description}
          onChange={(event) => setForm((state) => ({ ...state, description: event.target.value }))}
        />
        <input
          className="field"
          type="number"
          placeholder="Sort order"
          value={form.sort_order}
          onChange={(event) =>
            setForm((state) => ({ ...state, sort_order: Number(event.target.value) }))
          }
        />
        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(event) => setForm((state) => ({ ...state, is_active: event.target.checked }))}
          />
          Active
        </label>
        <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={form.is_npd_featured}
            onChange={(event) =>
              setForm((state) => ({ ...state, is_npd_featured: event.target.checked }))
            }
          />
          Feature on Formats page
        </label>
        <div className="flex flex-wrap gap-3">
          <button className="button-primary" type="submit">
            {form.id ? "Update form" : "Create form"}
          </button>
          {form.id ? (
            <button className="button-secondary" type="button" onClick={() => setForm(emptyState)}>
              Cancel edit
            </button>
          ) : null}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>

      <div className="admin-card overflow-x-auto">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Formats Page</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.is_npd_featured ? "Featured" : "-"}</td>
                <td>{item.is_active ? "Active" : "Inactive"}</td>
                <td>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--forest-700)]"
                      onClick={() =>
                        setForm({
                          id: item.id,
                          name: item.name,
                          slug: item.slug,
                          description: item.description ?? "",
                          sort_order: item.sort_order,
                          is_active: item.is_active,
                          is_npd_featured: item.is_npd_featured,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm font-semibold text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
