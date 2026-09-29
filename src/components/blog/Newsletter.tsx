"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/es";

type Props = {
  dict: Dictionary["blog"];
  consent: Pick<Dictionary["contact"], "consentA" | "consentLink" | "consentB">;
  /** "band": wide dark block (blog index). "card": compact sidebar card (post page). */
  variant?: "band" | "card";
  privacyHref: string;
};

function Megaphone() {
  return (
    <span className="grid size-20 shrink-0 place-items-center rounded-full bg-wine text-white">
      <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 10v4h3l7 4V6L6 10zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
      </svg>
    </span>
  );
}

export function Newsletter({ dict, consent, variant = "band", privacyHref }: Props) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) setDone(true);
  }

  const form = done ? (
    <p className="text-sm text-white" role="status">
      {dict.subscribed}
    </p>
  ) : (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex items-center border-b border-white/40 focus-within:border-white">
        <input
          type="email"
          name="email"
          required
          placeholder={dict.emailPlaceholder}
          aria-label={dict.emailPlaceholder}
          className="w-full bg-transparent py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button type="submit" disabled={busy} aria-label={dict.subscribe} className="p-2 text-white transition-transform hover:translate-x-1">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs text-white/75">
        <input type="checkbox" name="consent" required className="mt-0.5 size-3.5 shrink-0 accent-white" />
        <span>
          {consent.consentA}
          <Link href={privacyHref} target="_blank" className="underline underline-offset-2 hover:text-white">{consent.consentLink}</Link>
          {consent.consentB}
        </span>
      </label>
    </form>
  );

  if (variant === "card") {
    return (
      <div className="bg-night p-8 text-white">
        <Megaphone />
        <p className="mt-6 text-2xl leading-tight font-semibold text-marker">{dict.sidebarTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{dict.sidebarBody}</p>
        <div className="mt-8">{form}</div>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-10 bg-night px-8 py-12 text-white md:grid-cols-2 md:px-16">
      <div className="flex items-center gap-6">
        <Megaphone />
        <div>
          <p className="text-sm font-medium text-marker">{dict.newsletterEyebrow}</p>
          <p className="mt-1 font-serif text-3xl leading-tight md:text-4xl">{dict.newsletterTitle}</p>
        </div>
      </div>
      {form}
    </div>
  );
}
