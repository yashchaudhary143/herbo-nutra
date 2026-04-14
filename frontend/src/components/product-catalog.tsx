"use client";

import { useEffect, useEffectEvent, useState } from "react";

import { CustomSelect } from "@/components/custom-select";
import {
  ApiError,
  Category,
  CategoryProductsResponse,
  clientApiFetch,
  Form,
  PaginatedProducts,
  Product,
} from "@/lib/api";
import { getPublicCategoryLabel } from "@/lib/site";

type ProductCatalogProps = {
  categories: Category[];
  forms: Form[];
  initialData: PaginatedProducts | CategoryProductsResponse;
  lockedCategorySlug?: string;
  initialFormSlug?: string;
  initialSearchValue?: string;
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
  initialSearchValue = "",
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(lockedCategorySlug ?? "");
  const [selectedForm, setSelectedForm] = useState(initialFormSlug);
  const [searchTerm, setSearchTerm] = useState(initialSearchValue);
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
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
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
  }, [lockedCategorySlug, searchTerm, selectedCategory, selectedForm]);

  const items = response.items;
  const categoryOptions = [
    { value: "", label: "All categories" },
    ...categories.map((category) => ({
      value: category.slug,
      label: getPublicCategoryLabel(category.slug, category.name),
    })),
  ];
  const formOptions = [
    { value: "", label: "All forms" },
    ...forms.map((form) => ({ value: form.slug, label: form.name })),
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_560px] lg:items-end">
        <div>
          <h2 className="section-title text-2xl md:text-4xl">Product table</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Search products, compare specifications, and narrow the range by category or format.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            className="field"
            type="search"
            placeholder="Search product details"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search product details"
          />
          {lockedCategorySlug ? (
            <div className="filter-trigger bg-[var(--surface-muted)] text-[var(--foreground)]">
              {isCategoryResponse(response)
                ? getPublicCategoryLabel(response.category.slug, response.category.name)
                : "Category"}
            </div>
          ) : (
            <CustomSelect
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              ariaLabel="Filter by category"
            />
          )}
          <CustomSelect
            options={formOptions}
            value={selectedForm}
            onChange={setSelectedForm}
            ariaLabel="Filter by form"
          />
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
                          {getPublicCategoryLabel(product.category.slug, product.category.name)}
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
