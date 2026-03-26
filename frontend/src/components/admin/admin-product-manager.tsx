"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, Category, clientApiFetch, Product } from "@/lib/api";

type ProductFormState = {
  id?: number;
  category_id: number | "";
  common_name: string;
  botanical_name: string;
  specification: string;
  sort_order: number;
  is_active: boolean;
};

const emptyProduct: ProductFormState = {
  category_id: "",
  common_name: "",
  botanical_name: "",
  specification: "",
  sort_order: 0,
  is_active: true,
};

export function AdminProductManager() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyProduct);
  const [error, setError] = useState<string | null>(null);

  async function reloadProducts() {
    try {
      const [categoryResponse, productResponse] = await Promise.all([
        clientApiFetch<Category[]>("/api/admin/categories"),
        clientApiFetch<Product[]>("/api/admin/products"),
      ]);
      setCategories(categoryResponse);
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
        const [categoryResponse, productResponse] = await Promise.all([
          clientApiFetch<Category[]>("/api/admin/categories"),
          clientApiFetch<Product[]>("/api/admin/products"),
        ]);
        if (!cancelled) {
          setCategories(categoryResponse);
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
    await clientApiFetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await reloadProducts();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
      <form className="admin-card grid gap-4" onSubmit={handleSubmit}>
        <div>
          <p className="eyebrow">{form.id ? "Edit product" : "Add product"}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--forest-900)]">
            Structured catalog entries
          </h2>
        </div>
        <select
          className="field"
          value={form.category_id}
          onChange={(event) =>
            setForm((state) => ({ ...state, category_id: Number(event.target.value) || "" }))
          }
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          className="field"
          placeholder="Common name"
          value={form.common_name}
          onChange={(event) => setForm((state) => ({ ...state, common_name: event.target.value }))}
        />
        <input
          className="field"
          placeholder="Botanical name"
          value={form.botanical_name}
          onChange={(event) =>
            setForm((state) => ({ ...state, botanical_name: event.target.value }))
          }
        />
        <textarea
          className="field min-h-32"
          placeholder="Specification"
          value={form.specification}
          onChange={(event) =>
            setForm((state) => ({ ...state, specification: event.target.value }))
          }
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
            {form.id ? "Update product" : "Create product"}
          </button>
          {form.id ? (
            <button className="button-secondary" type="button" onClick={() => setForm(emptyProduct)}>
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
