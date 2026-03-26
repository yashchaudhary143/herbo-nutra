"use client";

import { useEffect, useEffectEvent, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  siteKey?: string;
  onVerify: (token: string | null) => void;
};

export function TurnstileWidget({ siteKey, onVerify }: TurnstileWidgetProps) {
  const id = useId().replace(/:/g, "");
  const widgetId = useRef<string | null>(null);
  const latestOnVerify = useEffectEvent(onVerify);
  const activeSiteKey = siteKey ?? "";

  useEffect(() => {
    if (!activeSiteKey) {
      latestOnVerify(null);
      return;
    }

    let cancelled = false;

    function mountWidget() {
      if (cancelled || !window.turnstile) {
        return;
      }

      if (widgetId.current) {
        window.turnstile.remove(widgetId.current);
      }

      widgetId.current = window.turnstile.render(`#${id}`, {
        sitekey: activeSiteKey,
        theme: "light",
        callback: (token: string) => latestOnVerify(token),
        "expired-callback": () => latestOnVerify(null),
      });
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile-script="true"]',
    );

    if (window.turnstile) {
      mountWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", mountWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = "true";
      script.addEventListener("load", mountWidget, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, [activeSiteKey, id]);

  if (!activeSiteKey) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/60 px-4 py-3 text-xs leading-6 text-[var(--muted)]">
        Turnstile is disabled until a site key is configured.
      </div>
    );
  }

  return <div id={id} />;
}
