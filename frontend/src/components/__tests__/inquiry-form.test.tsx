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

    render(<InquiryForm source="inquiry" productOptions={["Ashwagandha Extract"]} />);

    await userEvent.type(screen.getByPlaceholderText(/your name/i), "Riya Sharma");
    await userEvent.type(screen.getByPlaceholderText(/company name/i), "Wellness Labs");
    await userEvent.type(screen.getByPlaceholderText(/email address/i), "riya@example.com");
    await userEvent.type(screen.getByPlaceholderText(/phone number/i), "+91 99000 00000");
    await userEvent.type(screen.getByPlaceholderText(/product requirement/i), "Ashwagandha Extract");
    await userEvent.type(
      screen.getByPlaceholderText(/share specification, quantity/i),
      "Looking for MOQ and specification details.",
    );
    await userEvent.click(screen.getByRole("button", { name: /submit inquiry/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Thank you. Our team will get back to you shortly."),
      ).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/inquiries",
      expect.objectContaining({
        method: "POST",
      }),
    );
  });
});
