"use client";

import { useEffect, useEffectEvent, useState } from "react";

import {
  ApiError,
  Category,
  CategoryProductsResponse,
  clientApiFetch,
  Form,
  PaginatedProducts,
  Product,
} from "@/lib/api";

type ProductCatalogProps = {
  categories: Category[];
  forms: Form[];
  initialData: PaginatedProducts | CategoryProductsResponse;
  lockedCategorySlug?: string;
  initialFormSlug?: string;
};

function isCategoryResponse(
  value: PaginatedProducts | CategoryProductsResponse,
): value is CategoryProductsResponse {
  return "category" in value;
}

export function ProductCatalog({
  categories,
  forms,
  initialData,
  lockedCategorySlug,
  initialFormSlug = "",
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(lockedCategorySlug ?? "");
  const [selectedForm, setSelectedForm] = useState(initialFormSlug);
  const [response, setResponse] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runCatalogSearch = useEffectEvent(
    async (
      endpoint: string,
      active: {
        current: boolean;
      },
    ) => {
      if (active.current) {
        setIsLoading(true);
        setError(null);
      }

      try {
        const data = await clientApiFetch<PaginatedProducts | CategoryProductsResponse>(endpoint);
        if (active.current) {
          setResponse(data);
        }
      } catch (requestError) {
        if (active.current) {
          if (lockedCategorySlug && requestError instanceof ApiError && requestError.status === 404) {
            setResponse((current) =>
              isCategoryResponse(current)
                ? { ...current, items: [], total: 0 }
                : current,
            );
            setError(null);
            return;
          }

          setError(requestError instanceof Error ? requestError.message : "Unable to load products.");
        }
      } finally {
        if (active.current) {
          setIsLoading(false);
        }
      }
    },
  );

  useEffect(() => {
    const active = { current: true };
    const params = new URLSearchParams({ limit: "100" });

    if (selectedForm) {
      params.set("form", selectedForm);
    }

    const endpoint = lockedCategorySlug
      ? `/api/categories/${lockedCategorySlug}/products?${params.toString()}`
      : (() => {
          if (selectedCategory) {
            params.set("category", selectedCategory);
          }
          return `/api/products?${params.toString()}`;
        })();

    void runCatalogSearch(endpoint, active);

    return () => {
      active.current = false;
    };
  }, [lockedCategorySlug, selectedCategory, selectedForm]);

  const items = response.items;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <h2 className="section-title text-2xl md:text-4xl">Product table</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Browse products by category and format.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          {lockedCategorySlug ? (
            <div className="flex min-h-13 items-center border border-[var(--line-strong)] bg-[var(--surface-muted)] px-5 py-4 text-sm font-medium text-[var(--foreground)]">
              {isCategoryResponse(response) ? response.category.name : "Category"}
            </div>
          ) : (
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="field min-h-13 px-5 py-4"
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          <select
            value={selectedForm}
            onChange={(event) => setSelectedForm(event.target.value)}
            className="field min-h-13 px-5 py-4"
            aria-label="Filter by form"
          >
            <option value="">All forms</option>
            {forms.map((form) => (
              <option key={form.id} value={form.slug}>
                {form.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-sm text-[var(--muted)]">{response.total} products listed</div>

      {error ? (
        <div className="border border-[rgba(182,62,36,0.24)] bg-[rgba(182,62,36,0.08)] px-5 py-4 text-sm text-[var(--danger)]">
          {error}
        </div>
      ) : null}

      <div className="catalog-card overflow-x-auto">
        <table className="catalog-table">
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Botanical Name</th>
              <th>Specification</th>
              <th>Forms</th>
              {!lockedCategorySlug ? <th>Category</th> : null}
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((product: Product) => (
                <tr key={product.id}>
                  <td className="font-semibold text-[var(--foreground)]">{product.common_name}</td>
                  <td>{product.botanical_name}</td>
                  <td>{product.specification}</td>
                  <td>
                    {product.forms.length ? (
                      <div className="flex flex-wrap gap-2">
                        {product.forms.map((form) => (
                          <span
                            key={form.id}
                            className="border border-[var(--line)] bg-[var(--surface-muted)] px-2 py-1 text-xs font-medium text-[var(--foreground)]"
                          >
                            {form.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  {!lockedCategorySlug ? (
                    <td>
                      {product.category ? (
                        <span className="text-sm font-medium text-[var(--foreground)]">
                          {product.category.name}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={lockedCategorySlug ? 4 : 5}
                  className="bg-white px-5 py-10 text-center text-sm text-[var(--muted)]"
                >
                  {isLoading ? "Loading products..." : "No products match the current filters."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
