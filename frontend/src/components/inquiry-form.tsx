"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TurnstileWidget } from "@/components/turnstile-widget";
import { ProductRequirementPicker, type ProductRequirementGroup } from "@/components/product-requirement-picker";
import { clientApiFetch } from "@/lib/api";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required."),
  company_name: z.string().min(2, "Company name is required."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(7, "Phone number is required."),
  product_requirement: z.string().max(255),
  message: z.string().min(10, "Please add a more detailed requirement."),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

type InquiryFormProps = {
  source: "inquiry" | "contact";
  productGroups: ProductRequirementGroup[];
  compact?: boolean;
};

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-[var(--danger)]">{message}</p>;
}

export function InquiryForm({ source, productGroups, compact = false }: InquiryFormProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      company_name: "",
      email: "",
      phone: "",
      product_requirement: "",
      message: "",
    },
  });

  const submitLabel = "Send Inquiry";

  const onSubmit = handleSubmit((values) => {
    setServerMessage(null);
    setIsPending(true);

    startTransition(async () => {
      try {
        const composedMessage = [
          values.product_requirement ? `Products: ${values.product_requirement}` : null,
          values.message,
        ]
          .filter(Boolean)
          .join("\n\n");

        const response = await clientApiFetch<{ message: string }>("/api/inquiries", {
          method: "POST",
          body: JSON.stringify({
            ...values,
            message: composedMessage,
            source,
            turnstile_token: turnstileToken,
          }),
        });
        setServerMessage(response.message);
        reset();
        setTurnstileToken(null);
        setPickerKey((current) => current + 1);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong.";
        setServerMessage(message);
      } finally {
        setIsPending(false);
      }
    });
  });

  return (
    <div className="plain-panel p-6 md:p-8">
      <form className="grid gap-5" onSubmit={onSubmit}>
        <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Name</label>
            <input className="field" placeholder="Your name" {...register("name")} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Company Name</label>
            <input className="field" placeholder="Company name" {...register("company_name")} />
            <FieldError message={errors.company_name?.message} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Email</label>
            <input className="field" placeholder="Email address" {...register("email")} />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Phone</label>
            <input className="field" placeholder="Phone number" {...register("phone")} />
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        <div className="relative">
          <input type="hidden" {...register("product_requirement")} />
          <ProductRequirementPicker
            key={pickerKey}
            groups={productGroups}
            onChange={(value) =>
              setValue("product_requirement", value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
          <FieldError message={errors.product_requirement?.message} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">Message</label>
          <textarea
            className="field min-h-40 resize-y"
            placeholder="Share specification, packaging, target market, or timeline."
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        <TurnstileWidget siteKey={siteKey} onVerify={setTurnstileToken} />

        <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-5">
          <button type="submit" className="button-primary w-full sm:w-auto" disabled={isPending}>
            {isPending ? "Submitting..." : submitLabel}
          </button>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
            Your inquiry is stored in the backend and then routed through the configured email and WhatsApp workflow.
          </p>
        </div>

        {serverMessage ? (
          <div
            className={`px-4 py-3 text-sm ${
              isSubmitSuccessful
                ? "bg-[rgba(35,72,48,0.1)] text-[var(--green-950)]"
                : "bg-[rgba(182,62,36,0.12)] text-[var(--danger)]"
            }`}
          >
            {serverMessage}
          </div>
        ) : null}
      </form>
    </div>
  );
}
