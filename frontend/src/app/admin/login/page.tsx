import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="admin-layout min-h-screen">
      <div className="section-shell flex min-h-screen items-center justify-center py-12">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_480px]">
          <div className="self-center">
            <p className="eyebrow">Secure Access</p>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.05em] text-[var(--forest-900)]">
              Admin control for products, categories, and inbound leads.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
              This login is intended for Herbo Nutra internal operations only.
            </p>
          </div>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
