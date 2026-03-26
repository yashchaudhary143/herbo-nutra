"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useDeferredValue, useEffect, useEffectEvent, useState } from "react";

import {
  Category,
  CategoryProductsResponse,
  clientApiFetch,
  PaginatedProducts,
  Product,
} from "@/lib/api";

type ProductCatalogProps = {
  categories: Category[];
  initialData: PaginatedProducts | CategoryProductsResponse;
  lockedCategorySlug?: string;
};

function isCategoryResponse(
  value: PaginatedProducts | CategoryProductsResponse,
): value is CategoryProductsResponse {
  return "category" in value;
}

export function ProductCatalog({
  categories,
  initialData,
  lockedCategorySlug,
}: ProductCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(lockedCategorySlug ?? "");
  const [response, setResponse] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(search);

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

    if (deferredSearch) {
      params.set("search", deferredSearch);
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
  }, [deferredSearch, lockedCategorySlug, selectedCategory]);

  const items = response.items;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <h2 className="section-title text-2xl md:text-4xl">Product table</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Search by common name, botanical name, or specification.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="field pl-11"
              placeholder="Search product details"
              aria-label="Search products"
            />
          </label>
          {lockedCategorySlug ? (
            <div className="flex items-center border border-[var(--line-strong)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-medium text-[var(--foreground)]">
              {isCategoryResponse(response) ? response.category.name : "Category"}
            </div>
          ) : (
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="field"
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
        </div>
      </div>

      <div className="text-sm text-[var(--muted)]">{response.total} products listed</div>

      {error ? (
        <div className="border border-[rgba(182,62,36,0.24)] bg-[rgba(182,62,36,0.08)] px-5 py-4 text-sm text-[var(--danger)]">
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto border border-[var(--line)] bg-white">
        <table className="catalog-table">
          <thead>
            <tr>
              <th>Common Name</th>
              <th>Botanical Name</th>
              <th>Specification</th>
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
                  {!lockedCategorySlug ? (
                    <td>
                      {product.category ? (
                        <Link href={`/products/${product.category.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--green-950)]">
                          {product.category.name}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
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
                  colSpan={lockedCategorySlug ? 3 : 4}
                  className="bg-white px-5 py-10 text-center text-sm text-[var(--muted)]"
                >
                  {isLoading ? "Loading products..." : "No products match the current search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
