"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, Category, clientApiFetch } from "@/lib/api";

type CategoryFormState = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

const emptyState: CategoryFormState = {
  name: "",
  slug: "",
  description: "",
  sort_order: 0,
  is_active: true,
};

export function AdminCategoryManager() {
  const router = useRouter();
  const [items, setItems] = useState<Category[]>([]);
  const [form, setForm] = useState<CategoryFormState>(emptyState);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  async function reloadCategories() {
    try {
      const response = await clientApiFetch<Category[]>("/api/admin/categories");
      setItems(response);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        router.push("/admin/login");
        return;
      }
      setError(requestError instanceof Error ? requestError.message : "Unable to load categories.");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadOnMount() {
      try {
        const response = await clientApiFetch<Category[]>("/api/admin/categories");
        if (!cancelled) {
          setItems(response);
        }
      } catch (requestError) {
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load categories.");
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
        await clientApiFetch(`/api/admin/categories/${form.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await clientApiFetch("/api/admin/categories", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setForm(emptyState);
      await reloadCategories();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save category.");
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await clientApiFetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      setItems((current) => current.filter((item) => item.id !== id));
      setForm((current) => (current.id === id ? emptyState : current));
      setPendingDeleteId(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete category.");
    }
  }

  return (
    <div className="space-y-6">
      <form className="admin-card admin-form-grid" onSubmit={handleSubmit}>
        <div className="admin-panel-header">
          <p className="eyebrow">{form.id ? "Edit category" : "Add category"}</p>
          <h2 className="admin-title">Catalog taxonomy</h2>
        </div>
        <div className="grid items-start gap-4 md:grid-cols-2">
          <div className="admin-field-stack">
            <label className="admin-field-label">Category name</label>
            <input
              className="field"
              placeholder="Category name"
              value={form.name}
              onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
            />
          </div>
          <div className="admin-field-stack">
            <label className="admin-field-label">Slug</label>
            <input
              className="field"
              placeholder="Slug"
              value={form.slug}
              onChange={(event) => setForm((state) => ({ ...state, slug: event.target.value }))}
            />
          </div>
          <div className="admin-field-stack md:col-span-2">
            <label className="admin-field-label">Description</label>
            <textarea
              className="field min-h-36"
              placeholder="Description"
              value={form.description}
              onChange={(event) => setForm((state) => ({ ...state, description: event.target.value }))}
            />
          </div>
          <div className="admin-field-stack">
            <label className="admin-field-label">Sort order</label>
            <input
              className="field"
              type="number"
              placeholder="Sort order"
              value={form.sort_order}
              onChange={(event) =>
                setForm((state) => ({ ...state, sort_order: Number(event.target.value) }))
              }
            />
          </div>
          <label className="admin-choice-row text-sm text-[var(--muted)] md:col-span-1">
            <input
              className="admin-checkbox"
              type="checkbox"
              checked={form.is_active}
              onChange={(event) =>
                setForm((state) => ({ ...state, is_active: event.target.checked }))
              }
            />
            <span>
              <span className="block font-medium text-[var(--foreground)]">Active</span>
              <span className="admin-inline-help">
                Inactive categories stay in admin but disappear from the public catalog.
              </span>
            </span>
          </label>
        </div>
        <div className="admin-actions border-t border-[var(--line-admin)] pt-4">
          <button className="button-primary" type="submit">
            {form.id ? "Update category" : "Create category"}
          </button>
          {form.id ? (
            <button className="button-secondary" type="button" onClick={() => setForm(emptyState)}>
              Cancel edit
            </button>
          ) : null}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>

      <div className="admin-card admin-table-card overflow-x-auto">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.product_count}</td>
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
                        })
                      }
                    >
                      Edit
                    </button>
                    {pendingDeleteId === item.id ? (
                      <span className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm font-semibold text-red-600"
                          onClick={() => handleDelete(item.id)}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          className="text-sm font-semibold text-[var(--muted)]"
                          onClick={() => setPendingDeleteId(null)}
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-sm font-semibold text-red-600"
                        onClick={() => setPendingDeleteId(item.id)}
                      >
                        Delete
                      </button>
                    )}
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
