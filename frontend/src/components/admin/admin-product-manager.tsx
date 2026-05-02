"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AdminModal } from "@/components/admin/admin-modal";
import { CustomSelect } from "@/components/custom-select";
import { ApiError, Category, Method, clientApiFetch, Product } from "@/lib/api";

type ProductFormState = {
  id?: number;
  category_id: number | "";
  common_name: string;
  botanical_name: string;
  specification: string;
  method_ids: number[];
  sort_order: number;
  is_active: boolean;
};

const emptyProduct: ProductFormState = {
  category_id: "",
  common_name: "",
  botanical_name: "",
  specification: "",
  method_ids: [],
  sort_order: 0,
  is_active: true,
};

export function AdminProductManager() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyProduct);
  const [error, setError] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function reloadProducts() {
    try {
      const [categoryResponse, formResponse, productResponse] = await Promise.all([
        clientApiFetch<Category[]>("/api/admin/categories"),
        clientApiFetch<Method[]>("/api/admin/methods"),
        clientApiFetch<Product[]>("/api/admin/products"),
      ]);
      setCategories(categoryResponse);
      setMethods(formResponse);
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
          clientApiFetch<Method[]>("/api/admin/methods"),
          clientApiFetch<Product[]>("/api/admin/products"),
        ]);
        if (!cancelled) {
          setCategories(categoryResponse);
          setMethods(formResponse);
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
      setIsModalOpen(false);
      await reloadProducts();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save product.");
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await clientApiFetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProducts((current) => current.filter((product) => product.id !== id));
      setForm((current) => (current.id === id ? emptyProduct : current));
      setPendingDeleteId(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete product.");
    }
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setUploadMessage(null);

    if (!uploadFile) {
      setError("Choose an Excel file before uploading.");
      return;
    }

    const payload = new FormData();
    payload.append("file", uploadFile);

    setIsUploading(true);
    try {
      const response = await fetch("/api/admin/products/upload", {
        method: "POST",
        body: payload,
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        const detail = data?.detail;
        const message =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail?.errors)
              ? detail.errors.join(" ")
              : typeof detail?.message === "string"
                ? detail.message
                : "Unable to upload products.";
        throw new Error(message);
      }

      setUploadFile(null);
      setUploadMessage(
        `Imported ${data.total} rows: ${data.created} created, ${data.updated} updated.`,
      );
      await reloadProducts();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to upload products.");
    } finally {
      setIsUploading(false);
    }
  }

  const categoryOptions = [
    { value: "", label: "Select category" },
    ...categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    })),
  ];

  return (
    <div className="space-y-4">
      <form className="admin-card admin-form-grid" onSubmit={handleUpload}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Bulk upload</p>
            <h2 className="admin-title mt-1">Upload products from Excel</h2>
            <p className="admin-inline-help mt-1">
              Use category slug, product details, comma-separated methods, and active status.
            </p>
          </div>
          <div className="grid flex-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:max-w-3xl">
          <div className="admin-field-stack">
            <label className="admin-field-label">Excel file</label>
            <input
              className="field"
              type="file"
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(event) => setUploadFile(event.target.files?.[0] ?? null)}
            />
          </div>
          <a className="button-secondary text-center" href="/api/admin/products/template">
            Download template
          </a>
          <button className="button-primary min-w-[140px]" type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Excel"}
          </button>
          </div>
        </div>
        {uploadMessage ? <p className="text-sm font-medium text-[var(--forest-700)]">{uploadMessage}</p> : null}
      </form>

      <div className="admin-page-toolbar">
        <div>
          <p className="eyebrow">Products</p>
          <h2 className="admin-title mt-1">Structured catalog entries</h2>
        </div>
        <button
          className="button-primary"
          type="button"
          onClick={() => {
            setForm(emptyProduct);
            setIsModalOpen(true);
          }}
        >
          Create product
        </button>
      </div>

      {isModalOpen ? (
        <AdminModal
          eyebrow={form.id ? "Edit product" : "Add product"}
          title={form.id ? "Edit product" : "Create product"}
          onClose={() => {
            setForm(emptyProduct);
            setIsModalOpen(false);
          }}
        >
          <form className="admin-form-grid p-5" onSubmit={handleSubmit}>
            <div className="grid items-start gap-4">
              <div className="grid items-start gap-4 md:grid-cols-2">
                <div className="admin-field-stack md:col-span-2">
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
                <div className="admin-field-stack md:col-span-2">
                  <label className="admin-field-label">Specification</label>
                  <textarea
                    className="field min-h-24"
                    placeholder="Specification"
                    value={form.specification}
                    onChange={(event) =>
                      setForm((state) => ({ ...state, specification: event.target.value }))
                    }
                  />
                </div>
                <label className="admin-choice-row text-sm text-[var(--muted)] md:max-w-md">
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
                      Inactive products disappear from the live catalog and inquiry flow.
                    </span>
                  </span>
                </label>
              </div>
              <div className="admin-section-card">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="admin-field-label">Available methods</p>
                    <p className="admin-inline-help">
                      Select the testing methods used for specification and quality review.
                    </p>
                  </div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    {form.method_ids.length} selected
                  </p>
                </div>
                <div className="admin-method-grid mt-3">
                  {methods.map((item) => (
                    <label key={item.id} className="admin-choice-row admin-method-choice text-sm text-[var(--muted)]">
                      <input
                        className="admin-checkbox"
                        type="checkbox"
                        checked={form.method_ids.includes(item.id)}
                        onChange={(event) =>
                          setForm((state) => ({
                            ...state,
                            method_ids: event.target.checked
                              ? [...state.method_ids, item.id]
                              : state.method_ids.filter((id) => id !== item.id),
                          }))
                        }
                      />
                      <span>
                        <span className="block font-medium text-[var(--foreground)]">{item.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="admin-actions">
              <button className="button-primary min-w-[152px]" type="submit">
                {form.id ? "Update product" : "Create product"}
              </button>
              <button
                className="button-secondary min-w-[140px]"
                type="button"
                onClick={() => {
                  setForm(emptyProduct);
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>
        </AdminModal>
      ) : null}

      <div className="admin-card admin-table-card overflow-x-auto">
        <table className="data-table min-w-full">
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Botanical Name</th>
              <th>Specification</th>
              <th>Category</th>
              <th>Methods</th>
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
                <td>{product.methods.length ? product.methods.map((item) => item.name).join(", ") : "-"}</td>
                <td>
                  <div className="admin-row-actions">
                    <button
                      type="button"
                      className="text-sm font-semibold text-[var(--forest-700)]"
                      onClick={() => {
                        setForm({
                          id: product.id,
                          category_id: product.category_id,
                          common_name: product.common_name,
                          botanical_name: product.botanical_name,
                          specification: product.specification,
                          method_ids: product.methods.map((item) => item.id),
                          sort_order: product.sort_order,
                          is_active: product.is_active,
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    {pendingDeleteId === product.id ? (
                      <span className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm font-semibold text-red-600"
                          onClick={() => handleDelete(product.id)}
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
                        onClick={() => setPendingDeleteId(product.id)}
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
