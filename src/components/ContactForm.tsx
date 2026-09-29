"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/es";

type Status = "idle" | "sending" | "sent" | "error";
type Kind = "company" | "project";

/** Floating label over an underline, as in the reference form. */
function Field({ id, label, type = "text", autoComplete }: { id: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <div className="relative pt-5">
      <input
        id={id}
        name={id}
        type={type}
        required={id !== "phone"}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full border-b border-white/35 bg-transparent pb-2 text-white transition-colors focus:border-white focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-5 left-0 text-sm text-white/85 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/60"
      >
        {label}
      </label>
    </div>
  );
}

export function ContactForm({ dict, email, privacyHref }: { dict: Dictionary["contact"]; email: string; privacyHref: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [kind, setKind] = useState<Kind>("company");

  // Footer CTAs link here with ?tipo=empresa|proyecto.
  useEffect(() => {
    const sync = () => {
      const tipo = new URLSearchParams(location.search).get("tipo");
      if (tipo === "proyecto") setKind("project");
      if (tipo === "empresa") setKind("company");
    };
    sync();
    window.addEventListener("cj:locationchange", sync);
    return () => window.removeEventListener("cj:locationchange", sync);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), kind };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="font-serif text-3xl leading-snug text-white" role="status">
        {dict.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7">
      <div className="flex flex-wrap gap-x-8 gap-y-3" role="radiogroup">
        {(["company", "project"] as const).map((k) => (
          <label key={k} className="flex cursor-pointer items-center gap-3 text-sm text-white">
            <input
              type="radio"
              name="kind"
              checked={kind === k}
              onChange={() => setKind(k)}
              className="peer sr-only"
            />
            <span className="grid size-5 place-items-center rounded-full border border-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
              <span className={`size-2.5 rounded-full bg-white transition-transform ${kind === k ? "scale-100" : "scale-0"}`} />
            </span>
            {k === "company" ? dict.company : dict.project}
          </label>
        ))}
      </div>

      <Field id="name" label={dict.name} autoComplete="name" />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="email" label={dict.email} type="email" autoComplete="email" />
        <Field id="phone" label={dict.phone} type="tel" autoComplete="tel" />
      </div>

      <div className="relative pt-5">
        <textarea
          id="message"
          name="message"
          required
          rows={3}
          placeholder=" "
          className="peer w-full resize-none border-b border-white/35 bg-transparent pb-2 text-white transition-colors focus:border-white focus:outline-none"
        />
        <label
          htmlFor="message"
          className="pointer-events-none absolute top-5 left-0 text-sm text-white/85 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white/60 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/60"
        >
          {dict.message}
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs text-white/80">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-white" />
        <span>
          {dict.consentA}
          <Link href={privacyHref} target="_blank" className="underline underline-offset-2 hover:text-white">{dict.consentLink}</Link>
          {dict.consentB}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full border border-white py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-night disabled:opacity-60"
      >
        {status === "sending" ? dict.sending : dict.submit}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-300" role="alert">
          {dict.error}{" "}
          <a className="underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      )}
    </form>
  );
}
