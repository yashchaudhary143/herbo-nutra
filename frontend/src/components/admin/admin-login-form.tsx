"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { clientApiFetch } from "@/lib/api";

const loginSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setError(null);
    setIsPending(true);

    startTransition(async () => {
      try {
        await clientApiFetch("/api/admin/auth/login", {
          method: "POST",
          body: JSON.stringify(values),
        });
        router.push("/admin");
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : "Unable to sign in.");
      } finally {
        setIsPending(false);
      }
    });
  });

  return (
    <form className="glass-panel grid gap-4 rounded-[2rem] p-8" onSubmit={onSubmit}>
      <div>
        <input className="field" placeholder="Admin email" {...register("email")} />
        {errors.email ? <p className="mt-2 text-xs text-red-600">{errors.email.message}</p> : null}
      </div>
      <div>
        <input className="field" type="password" placeholder="Password" {...register("password")} />
        {errors.password ? (
          <p className="mt-2 text-xs text-red-600">{errors.password.message}</p>
        ) : null}
      </div>
      <button type="submit" className="button-primary" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
