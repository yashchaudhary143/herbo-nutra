"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { Category, Product } from "@/lib/api";

export type ProductRequirementGroup = {
  category: Category;
  products: Product[];
};

type SelectedProduct = {
  id: string;
  categoryId: number;
  categoryName: string;
  commonName: string;
  botanicalName: string;
  specification: string;
  isCustom?: boolean;
};

type ProductRequirementPickerProps = {
  groups: ProductRequirementGroup[];
  onChange: (value: string) => void;
};

function buildRequirementValue(selected: SelectedProduct[]) {
  if (!selected.length) {
    return "";
  }

  const grouped = new Map<string, string[]>();
  for (const item of selected) {
    const existing = grouped.get(item.categoryName) ?? [];
    existing.push(item.commonName);
    grouped.set(item.categoryName, existing);
  }

  return Array.from(grouped.entries())
    .map(([categoryName, items]) => `${categoryName}: ${items.join(", ")}`)
    .join("; ");
}

function matchProduct(groupName: string, product: Product, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    groupName,
    product.common_name,
    product.botanical_name,
    product.specification,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function ProductRequirementPicker({ groups, onChange }: ProductRequirementPickerProps) {
  const searchId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [customProduct, setCustomProduct] = useState("");
  const [selected, setSelected] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current || rootRef.current.contains(event.target as Node)) {
        return;
      }

      setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const visibleGroups = groups
    .map((group) => ({
      category: group.category,
      products: group.products.filter((product) => matchProduct(group.category.name, product, query)),
    }))
    .filter((group) => group.products.length > 0);

  function toggleProduct(category: Category, product: Product) {
    setSelected((current) => {
      const existingIndex = current.findIndex((item) => item.categoryId === category.id && item.commonName === product.common_name);

      if (existingIndex >= 0) {
        const nextSelected = current.filter((_, index) => index !== existingIndex);
        onChange(buildRequirementValue(nextSelected));
        return nextSelected;
      }

      const nextSelected = [
        ...current,
        {
          id: `catalog-${category.id}-${product.id}`,
          categoryId: category.id,
          categoryName: category.name,
          commonName: product.common_name,
          botanicalName: product.botanical_name,
          specification: product.specification,
        },
      ];
      onChange(buildRequirementValue(nextSelected));
      return nextSelected;
    });
  }

  function removeProduct(item: SelectedProduct) {
    setSelected((current) => {
      const nextSelected = current.filter(
        (entry) => entry.id !== item.id,
      );
      onChange(buildRequirementValue(nextSelected));
      return nextSelected;
    });
  }

  function addCustomProduct() {
    const value = customProduct.trim();
    if (!value) {
      return;
    }

    setSelected((current) => {
      const duplicate = current.some(
        (item) => item.isCustom && item.commonName.toLowerCase() === value.toLowerCase(),
      );
      if (duplicate) {
        return current;
      }

      const nextSelected = [
        ...current,
        {
          id: `custom-${value.toLowerCase()}`,
          categoryId: 0,
          categoryName: "Custom requirements",
          commonName: value,
          botanicalName: "",
          specification: "",
          isCustom: true,
        },
      ];
      onChange(buildRequirementValue(nextSelected));
      return nextSelected;
    });

    setCustomProduct("");
  }

  return (
    <div ref={rootRef} className="relative space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label className="block text-sm font-medium text-[var(--foreground)]">Product Requirements</label>
        {selected.length ? (
          <button
            type="button"
            className="text-xs font-medium text-[var(--green-950)]"
            onClick={() => {
              setSelected([]);
              onChange("");
            }}
          >
            Clear all
          </button>
        ) : null}
      </div>

      <button
        type="button"
        className="field flex min-h-12 items-center justify-between gap-3 text-left"
        aria-expanded={open}
        aria-controls={searchId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={selected.length ? "text-[var(--foreground)]" : "text-[var(--muted)]"}>
          {selected.length
            ? `${selected.length} requirement${selected.length === 1 ? "" : "s"} selected`
            : "Search and select products"}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {selected.length ? (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => removeProduct(item)}
              className="inline-flex items-center gap-2 border border-[var(--line-strong)] bg-[var(--surface-muted)] px-3 py-2 text-xs font-medium text-[var(--foreground)]"
            >
              {item.commonName}
              {item.isCustom ? (
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--green-950)]">
                  Custom
                </span>
              ) : null}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      ) : null}

      {open ? (
        <div
          id={searchId}
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]"
        >
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-3 py-2.5">
            <Search className="h-4 w-4 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product, botanical name, or category"
              className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />
            <div className="flex items-center gap-3">
              {query ? (
                <button
                  type="button"
                  className="text-xs font-medium text-[var(--green-950)]"
                  onClick={() => setQuery("")}
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                className="text-xs font-semibold text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                Done
              </button>
            </div>
          </div>

          <div className="max-h-[min(18rem,calc(100dvh-18rem))] space-y-4 overflow-y-auto p-3">
            {visibleGroups.length ? (
              visibleGroups.map((group) => (
                <section key={group.category.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">{group.category.name}</h4>
                    <span className="text-xs text-[var(--muted)]">{group.products.length} items</span>
                  </div>
                  <div className="grid gap-2">
                    {group.products.map((product) => {
                      const isSelected = selected.some(
                        (item) =>
                          item.categoryId === group.category.id &&
                          item.commonName === product.common_name &&
                          item.botanicalName === product.botanical_name,
                      );

                      return (
                        <label
                          key={product.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 transition ${
                            isSelected
                              ? "border-[var(--green-900)] bg-[var(--green-100)]"
                              : "border-[var(--line-strong)] bg-white hover:border-[var(--green-900)]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 accent-[var(--green-950)]"
                            checked={isSelected}
                            onChange={() => toggleProduct(group.category, product)}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-[var(--foreground)]">
                              {product.common_name}
                            </span>
                            <span className="block text-xs leading-5 text-[var(--muted)]">
                              {product.botanical_name} · {product.specification}
                            </span>
                          </span>
                          {isSelected ? (
                            <span className="text-xs font-semibold text-[var(--green-950)]">Selected</span>
                          ) : null}
                        </label>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface-muted)] p-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">No matching product found</p>
                <p className="mt-1 text-xs leading-6 text-[var(--muted)]">
                  Add the product manually and include any required specification in the message field.
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={customProduct}
                    onChange={(event) => setCustomProduct(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addCustomProduct();
                      }
                    }}
                    placeholder={query ? `Add "${query}" as a custom product` : "Add product name or requirement"}
                    className="field min-w-0 flex-1"
                  />
                  <button
                    type="button"
                    onClick={addCustomProduct}
                    className="button-secondary whitespace-nowrap"
                  >
                    Add product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
