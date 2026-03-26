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
    if (!window.confirm("Delete this category and its products?")) {
      return;
    }
    await clientApiFetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    await reloadCategories();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form className="admin-card grid gap-4" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">{form.id ? "Edit category" : "Add category"}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--forest-900)]">
            Catalog taxonomy
          </h2>
        </div>
        <input
          className="field"
          placeholder="Category name"
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
          className="field min-h-32"
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
        <div className="flex flex-wrap gap-3">
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

      <div className="admin-card overflow-x-auto">
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
