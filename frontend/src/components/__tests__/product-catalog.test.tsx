import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ProductCatalog } from "@/components/product-catalog";
import type { Category, PaginatedProducts } from "@/lib/api";

const categories: Category[] = [
  {
    id: 1,
    name: "Herbal Extracts",
    slug: "herbal-extracts",
    description: "Botanical extracts",
    sort_order: 1,
    is_active: true,
    created_at: "",
    updated_at: "",
    product_count: 2,
  },
];

const initialData: PaginatedProducts = {
  total: 2,
  page: 1,
  limit: 100,
  items: [
    {
      id: 1,
      category_id: 1,
      common_name: "Ashwagandha Extract",
      botanical_name: "Withania somnifera",
      specification: "Withanolides 5%",
      sort_order: 1,
      is_active: true,
      created_at: "",
      updated_at: "",
      category: categories[0],
    },
    {
      id: 2,
      category_id: 1,
      common_name: "Turmeric Extract",
      botanical_name: "Curcuma longa",
      specification: "Curcuminoids 95%",
      sort_order: 2,
      is_active: true,
      created_at: "",
      updated_at: "",
      category: categories[0],
    },
  ],
};

describe("ProductCatalog", () => {
  afterEach(() => {
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

    render(<ProductCatalog categories={categories} initialData={initialData} />);
    await userEvent.type(
      screen.getByPlaceholderText(/search product details/i),
      "ashwa",
    );

    await waitFor(() => {
      expect(screen.queryByText("Turmeric Extract")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Ashwagandha Extract")).toBeInTheDocument();
  });
});
