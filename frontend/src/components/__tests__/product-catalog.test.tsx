import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProductCatalog } from "@/components/product-catalog";
import type { Category, Form, PaginatedProducts } from "@/lib/api";

const categories: Category[] = [
  {
    id: 1,
    name: "Custom Botanicals",
    slug: "custom-botanicals",
    description: "Custom botanical catalog",
    sort_order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
    product_count: 1,
  },
  {
    id: 2,
    name: "Herbal Extracts (Food Ingredients / Nutraceutical Ingredients)",
    slug: "herbal-extracts",
    description: "Herbal extracts, food ingredients, and nutraceutical ingredients.",
    sort_order: 2,
    is_active: true,
    created_at: "",
    updated_at: "",
    product_count: 2,
  },
];

const forms: Form[] = [
  {
    id: 1,
    name: "Herbal Extracts",
    slug: "herbal-extracts",
    description: "Standardized botanical extract format.",
    sort_order: 1,
    is_active: true,
    is_npd_featured: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "Micronization Technology",
    slug: "micronization-technology",
    description: "Reduced particle size for improved dispersion.",
    sort_order: 2,
    is_active: true,
    is_npd_featured: true,
    created_at: "",
    updated_at: "",
  },
];

const initialData: PaginatedProducts = {
  total: 2,
  page: 1,
  limit: 100,
  items: [
    {
      id: 1,
      category_id: 2,
      common_name: "Ashwagandha Extract",
      botanical_name: "Withania somnifera",
      specification: "Withanolides 5%",
      sort_order: 1,
      is_active: true,
      created_at: "",
      updated_at: "",
      category: categories[1],
      forms: [forms[0], forms[1]],
    },
    {
      id: 2,
      category_id: 2,
      common_name: "Turmeric Extract",
      botanical_name: "Curcuma longa",
      specification: "Curcuminoids 95%",
      sort_order: 2,
      is_active: true,
      created_at: "",
      updated_at: "",
      category: categories[1],
      forms: [forms[0]],
    },
  ],
};

describe("ProductCatalog", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("filters products through API-backed search", async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      const data =
        url.includes("search=ashwa")
          ? { ...initialData, total: 1, items: [initialData.items[0]] }
          : initialData;

      return Promise.resolve(
        new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<ProductCatalog categories={categories} forms={forms} initialData={initialData} />);

    await userEvent.type(screen.getByPlaceholderText(/search product details/i), "ashwa");

    await waitFor(() => {
      expect(screen.queryByText("Turmeric Extract")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Ashwagandha Extract")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenLastCalledWith(
      expect.stringContaining("search=ashwa"),
      expect.any(Object),
    );
  });

  it("shows backend-driven category options and honors initial filters", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(initialData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <ProductCatalog
        categories={categories}
        forms={forms}
        initialData={initialData}
        initialFormSlug="micronization-technology"
        initialSearchValue="ashwagandha"
      />,
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(fetchMock).toHaveBeenLastCalledWith(
      expect.stringContaining("form=micronization-technology"),
      expect.any(Object),
    );
    expect(fetchMock).toHaveBeenLastCalledWith(
      expect.stringContaining("search=ashwagandha"),
      expect.any(Object),
    );

    await userEvent.click(screen.getByRole("button", { name: /filter by category/i }));
    const categoryListbox = screen.getByRole("listbox", { name: /filter by category/i });

    expect(within(categoryListbox).getByRole("option", { name: /custom botanicals/i })).toBeInTheDocument();
    expect(
      within(categoryListbox).getByRole("option", { name: /herbal extracts/i }),
    ).toBeInTheDocument();
  });
});
