"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CustomSelect } from "@/components/custom-select";
import { ApiError, Category, Form, clientApiFetch, Product } from "@/lib/api";

type ProductFormState = {
  id?: number;
  category_id: number | "";
  common_name: string;
  botanical_name: string;
  specification: string;
  form_ids: number[];
  sort_order: number;
  is_active: boolean;
};

const emptyProduct: ProductFormState = {
  category_id: "",
  common_name: "",
  botanical_name: "",
  specification: "",
  form_ids: [],
  sort_order: 0,
  is_active: true,
};

export function AdminProductManager() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyProduct);
  const [error, setError] = useState<string | null>(null);

  async function reloadProducts() {
    try {
      const [categoryResponse, formResponse, productResponse] = await Promise.all([
        clientApiFetch<Category[]>("/api/admin/categories"),
        clientApiFetch<Form[]>("/api/admin/forms"),
        clientApiFetch<Product[]>("/api/admin/products"),
      ]);
      setCategories(categoryResponse);
      setForms(formResponse);
      setProducts(productResponse);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        router.push("/admin/login");
        return;
      }
      setError(requestError instanceof Error ? requestError.message : "Unable to load products.");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadOnMount() {
      try {
        const [categoryResponse, formResponse, productResponse] = await Promise.all([
          clientApiFetch<Category[]>("/api/admin/categories"),
          clientApiFetch<Form[]>("/api/admin/forms"),
          clientApiFetch<Product[]>("/api/admin/products"),
        ]);
        if (!cancelled) {
          setCategories(categoryResponse);
          setForms(formResponse);
          setProducts(productResponse);
        }
      } catch (requestError) {
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load products.");
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

    const payload = {
      ...form,
      category_id: Number(form.category_id),
    };

    try {
      if (form.id) {
        await clientApiFetch(`/api/admin/products/${form.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await clientApiFetch("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setForm(emptyProduct);
      await reloadProducts();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save product.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this product?")) {
      return;
    }
    setError(null);
    try {
      await clientApiFetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProducts((current) => current.filter((product) => product.id !== id));
      setForm((current) => (current.id === id ? emptyProduct : current));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete product.");
    }
  }

  function getFormPreviewText(item: Form) {
    const trimmed = item.description?.trim();
    if (!trimmed) {
      return "Visible on the public catalog and inquiry flow.";
    }
    return trimmed.length > 88 ? `${trimmed.slice(0, 88).trimEnd()}...` : trimmed;
  }

  const categoryOptions = [
    { value: "", label: "Select category" },
    ...categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    })),
  ];

  return (
    <div className="space-y-6">
      <form className="admin-card admin-form-grid" onSubmit={handleSubmit}>
        <div className="admin-panel-header">
          <p className="eyebrow">{form.id ? "Edit product" : "Add product"}</p>
          <h2 className="admin-title">Structured catalog entries</h2>
        </div>
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="grid items-start gap-4 md:grid-cols-2">
            <div className="admin-field-stack">
              <label className="admin-field-label">Category</label>
              <CustomSelect
                options={categoryOptions}
                value={form.category_id === "" ? "" : String(form.category_id)}
                onChange={(value) =>
                  setForm((state) => ({ ...state, category_id: value ? Number(value) : "" }))
                }
                ariaLabel="Select product category"
              />
            </div>
            <div className="admin-field-stack">
              <label className="admin-field-label">Common name</label>
              <input
                className="field"
                placeholder="Common name"
                value={form.common_name}
                onChange={(event) =>
                  setForm((state) => ({ ...state, common_name: event.target.value }))
                }
              />
            </div>
            <div className="admin-field-stack">
              <label className="admin-field-label">Botanical name</label>
              <input
                className="field"
                placeholder="Botanical name"
                value={form.botanical_name}
                onChange={(event) =>
                  setForm((state) => ({ ...state, botanical_name: event.target.value }))
                }
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
            <div className="admin-field-stack md:col-span-2">
              <label className="admin-field-label">Specification</label>
              <textarea
                className="field min-h-32"
                placeholder="Specification"
                value={form.specification}
                onChange={(event) =>
                  setForm((state) => ({ ...state, specification: event.target.value }))
                }
              />
            </div>
            <label className="admin-choice-row text-sm text-[var(--muted)] md:col-span-2">
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
                  Inactive products stay in the database but disappear from the live catalog and inquiry flow.
                </span>
              </span>
            </label>
          </div>
          <div className="admin-section-card h-full">
            <div className="admin-field-stack">
              <p className="admin-field-label">Available forms</p>
              <p className="admin-inline-help">
                Link each product to the formats and technologies customers can request from the catalog.
              </p>
            </div>
            <div className="admin-choice-grid mt-3">
              {forms.map((item) => (
                <label key={item.id} className="admin-choice-row text-sm text-[var(--muted)]">
                  <input
                    className="admin-checkbox"
                    type="checkbox"
                    checked={form.form_ids.includes(item.id)}
                    onChange={(event) =>
                      setForm((state) => ({
                        ...state,
                        form_ids: event.target.checked
                          ? [...state.form_ids, item.id]
                          : state.form_ids.filter((id) => id !== item.id),
                      }))
                    }
                  />
                  <span>
                    <span className="block font-medium text-[var(--foreground)]">{item.name}</span>
                    <span className="admin-inline-help">{getFormPreviewText(item)}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="admin-actions border-t border-[var(--line-admin)] pt-4">
          <button className="button-primary min-w-[152px]" type="submit">
            {form.id ? "Update product" : "Create product"}
          </button>
          {form.id ? (
            <button
              className="button-secondary min-w-[140px]"
              type="button"
              onClick={() => setForm(emptyProduct)}
            >
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
              <th>Common Name</th>
              <th>Botanical Name</th>
              <th>Specification</th>
              <th>Category</th>
              <th>Forms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.common_name}</td>
                <td>{product.botanical_name}</td>
                <td>{product.specification}</td>
                <td>{product.category?.name ?? "-"}</td>
                <td>{product.forms.length ? product.forms.map((item) => item.name).join(", ") : "-"}</td>
                <td>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--forest-700)]"
                      onClick={() =>
                        setForm({
                          id: product.id,
                          category_id: product.category_id,
                          common_name: product.common_name,
                          botanical_name: product.botanical_name,
                          specification: product.specification,
                          form_ids: product.forms.map((item) => item.id),
                          sort_order: product.sort_order,
                          is_active: product.is_active,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-sm font-semibold text-red-600"
                      onClick={() => handleDelete(product.id)}
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
