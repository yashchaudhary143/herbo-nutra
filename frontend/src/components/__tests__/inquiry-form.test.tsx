import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InquiryForm } from "@/components/inquiry-form";

describe("InquiryForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("submits a valid inquiry and shows the thank-you message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          message: "Thank you. Our team will get back to you shortly.",
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    render(
      <InquiryForm
        source="contact"
        productGroups={[
          {
            category: {
              id: 1,
              name: "Nutraceutical Ingredients",
              slug: "nutraceutical-ingredients",
              description: null,
              sort_order: 1,
              is_active: true,
              created_at: "2026-03-26T00:00:00Z",
              updated_at: "2026-03-26T00:00:00Z",
              product_count: 1,
            },
            products: [
              {
                id: 1,
                category_id: 1,
                common_name: "Ashwagandha Extract",
                botanical_name: "Withania somnifera",
                specification: "5% withanolides",
                sort_order: 1,
                is_active: true,
                created_at: "2026-03-26T00:00:00Z",
                updated_at: "2026-03-26T00:00:00Z",
                forms: [],
              },
            ],
          },
        ]}
      />,
    );

    await userEvent.type(screen.getByPlaceholderText(/your name/i), "Riya Sharma");
    await userEvent.type(screen.getByPlaceholderText(/company name/i), "Wellness Labs");
    await userEvent.type(screen.getByPlaceholderText(/email address/i), "riya@example.com");
    await userEvent.type(screen.getByPlaceholderText(/phone number/i), "+91 99000 00000");
    await userEvent.click(screen.getByRole("button", { name: /search and select products/i }));
    await userEvent.click(screen.getByRole("checkbox", { name: /ashwagandha extract/i }));
    await userEvent.type(
      screen.getByPlaceholderText(/share specification, packaging/i),
      "Looking for product details and MOQ information.",
    );
    await userEvent.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Thank you. Our team will get back to you shortly."),
      ).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/inquiries",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining(
          "Products: Nutraceutical Ingredients: Ashwagandha Extract",
        ),
      }),
    );
  });
});
