"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import type { ComplaintsDict } from "@/content/complaints";

type Provider = { legalName: string; ruc: string; address: string };
type Receipt = { number: string; registeredAt: string; data: Record<string, string> };

const noopSubscribe = () => () => {};

const input =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink transition-colors focus:border-wine focus:outline-none";
const label = "mb-1.5 block text-sm font-medium";

function Field({ id, text, children, full }: { id: string; text: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      {children}
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-line bg-canvas p-6 md:p-8">
      <legend className="-ml-2 px-2 text-lg font-semibold">{legend}</legend>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function ComplaintForm({
  t,
  provider,
  locale,
  privacyHref,
  email,
}: {
  t: ComplaintsDict;
  provider: Provider;
  locale: string;
  privacyHref: string;
  email: string;
}) {
  // The page is static, so today's date (Lima time) is read on the visitor's device.
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString(locale, { timeZone: "America/Lima", dateStyle: "long" }),
    () => "",
  );
  const [minor, setMinor] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setReceipt({ number: json.number, registeredAt: json.registeredAt, data });
      window.__lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  const providerBlock = (
    <dl className="grid gap-3 text-sm sm:grid-cols-3">
      <div>
        <dt className="text-ink-soft">{t.legalName}</dt>
        <dd className="font-medium">{provider.legalName}</dd>
      </div>
      <div>
        <dt className="text-ink-soft">{t.ruc}</dt>
        <dd className="font-medium">{provider.ruc}</dd>
      </div>
      <div>
        <dt className="text-ink-soft">{t.address}</dt>
        <dd className="font-medium">{provider.address}</dd>
      </div>
    </dl>
  );

  if (receipt) {
    const d = receipt.data;
    const rows: [string, string | undefined][] = [
      [t.names, d.names],
      [t.docType, `${d.docType} ${d.docNumber}`],
      [t.home, d.home],
      [t.phone, d.phone],
      [t.email, d.email],
      [t.minor, d.minor ? t.yes : t.no],
      ...(d.minor
        ? ([
            [t.guardianName, d.guardianName],
            [`${t.home} (${t.guardian})`, d.guardianHome],
            [`${t.phone} (${t.guardian})`, d.guardianPhone],
            [`${t.email} (${t.guardian})`, d.guardianEmail],
          ] as [string, string][])
        : []),
      [t.itemType, d.itemType],
      [t.amount, d.amount ? `S/ ${d.amount}` : "—"],
      [t.itemDescription, d.itemDescription],
      [t.kind, t.kinds[d.kind as "reclamo" | "queja"]?.label],
      [t.detail, d.detail],
      [t.request, d.request],
    ];
    return (
      <div className="rounded-3xl border border-line bg-surface p-6 md:p-10" role="status">
        <p className="text-sm font-medium tracking-[0.2em] text-wine uppercase">{t.sheet}</p>
        <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{t.successTitle}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{t.successBody}</p>
        <dl className="mt-8 grid gap-4 rounded-2xl bg-canvas p-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-ink-soft">{t.number}</dt>
            <dd className="font-mono text-lg font-semibold">{receipt.number}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-soft">{t.registeredAt}</dt>
            <dd className="text-lg font-semibold">{receipt.registeredAt}</dd>
          </div>
        </dl>
        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-3 font-semibold">{t.provider}</p>
          {providerBlock}
        </div>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {rows.map(([k, v], i) => (
            <div key={i} className="grid gap-1 py-3 text-sm sm:grid-cols-3">
              <dt className="text-ink-soft">{k}</dt>
              <dd className="whitespace-pre-wrap sm:col-span-2">{v || "—"}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-ink-soft">{t.legend1}</p>
        <p className="mt-1 text-xs text-ink-soft">{t.legend2}</p>
        <div className="print-hide mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full bg-wine px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-wine-deep"
          >
            {t.print}
          </button>
          <button
            type="button"
            onClick={() => setReceipt(null)}
            className="rounded-full border border-ink px-6 py-3 text-sm transition-colors hover:bg-ink hover:text-canvas"
          >
            {t.another}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-night p-6 text-white md:flex-row md:items-center md:p-8">
        <div>
          <p className="text-sm text-white/60">{t.sheet}</p>
          <p className="text-xl font-semibold">{t.title}</p>
        </div>
        <p className="text-sm">
          <span className="text-white/60">{t.date}: </span>
          {today}
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-canvas p-6 md:p-8">
        <p className="mb-4 text-lg font-semibold">{t.provider}</p>
        {providerBlock}
      </div>

      <Fieldset legend={t.s1}>
        <Field id="names" text={`${t.names} *`} full>
          <input id="names" name="names" required autoComplete="name" className={input} />
        </Field>
        <Field id="docType" text={`${t.docType} *`}>
          <select id="docType" name="docType" required className={input} defaultValue={t.docTypes[0]}>
            {t.docTypes.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field id="docNumber" text={`${t.docNumber} *`}>
          <input id="docNumber" name="docNumber" required inputMode="numeric" className={input} />
        </Field>
        <Field id="home" text={`${t.home} *`} full>
          <input id="home" name="home" required autoComplete="street-address" className={input} />
        </Field>
        <Field id="phone" text={t.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field id="email" text={`${t.email} *`}>
          <input id="email" name="email" type="email" required autoComplete="email" className={input} />
        </Field>
        <label className="flex cursor-pointer items-center gap-3 text-sm sm:col-span-2">
          <input
            type="checkbox"
            name="minor"
            value="1"
            checked={minor}
            onChange={(e) => setMinor(e.target.checked)}
            className="size-4 accent-wine"
          />
          {t.minor}
        </label>
        {minor && (
          <div className="grid gap-5 rounded-xl bg-surface p-5 sm:col-span-2 sm:grid-cols-2">
            <p className="font-medium sm:col-span-2">{t.guardian}</p>
            <Field id="guardianName" text={`${t.guardianName} *`} full>
              <input id="guardianName" name="guardianName" required className={input} />
            </Field>
            <Field id="guardianHome" text={`${t.home} *`} full>
              <input id="guardianHome" name="guardianHome" required className={input} />
            </Field>
            <Field id="guardianPhone" text={t.phone}>
              <input id="guardianPhone" name="guardianPhone" type="tel" className={input} />
            </Field>
            <Field id="guardianEmail" text={`${t.email} *`}>
              <input id="guardianEmail" name="guardianEmail" type="email" required className={input} />
            </Field>
          </div>
        )}
      </Fieldset>

      <Fieldset legend={t.s2}>
        <Field id="itemType" text={`${t.itemType} *`}>
          <select id="itemType" name="itemType" required className={input} defaultValue={t.itemTypes[1]}>
            {t.itemTypes.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field id="amount" text={t.amount}>
          <input id="amount" name="amount" type="number" min="0" step="0.01" inputMode="decimal" className={input} />
        </Field>
        <Field id="itemDescription" text={`${t.itemDescription} *`} full>
          <textarea id="itemDescription" name="itemDescription" required rows={2} className={`${input} resize-y`} />
        </Field>
      </Fieldset>

      <Fieldset legend={t.s3}>
        <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2" role="radiogroup" aria-label={t.kind}>
          {(["reclamo", "queja"] as const).map((k, i) => (
            <label
              key={k}
              className="flex cursor-pointer gap-3 rounded-xl border border-line-strong bg-surface p-4 transition-colors has-[:checked]:border-wine has-[:checked]:bg-marker/40"
            >
              <input type="radio" name="kind" value={k} required defaultChecked={i === 0} className="mt-1 accent-wine" />
              <span>
                <span className="block font-semibold">{t.kinds[k].label}</span>
                <span className="mt-1 block text-xs text-ink-soft">{t.kinds[k].hint}</span>
              </span>
            </label>
          ))}
        </div>
        <Field id="detail" text={`${t.detail} *`} full>
          <textarea id="detail" name="detail" required rows={5} className={`${input} resize-y`} />
        </Field>
        <Field id="request" text={`${t.request} *`} full>
          <textarea id="request" name="request" required rows={3} className={`${input} resize-y`} />
        </Field>
      </Fieldset>

      <div className="rounded-2xl border border-dashed border-line-strong p-6 md:p-8">
        <p className="text-lg font-semibold">{t.s4}</p>
        <p className="mt-2 text-sm text-ink-soft">{t.s4Note}</p>
      </div>

      <div className="grid gap-2 text-xs text-ink-soft">
        <p>{t.legend1}</p>
        <p>{t.legend2}</p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input type="checkbox" name="consent" value="1" required className="mt-0.5 size-4 shrink-0 accent-wine" />
        <span>
          {t.consentA}
          <Link href={privacyHref} target="_blank" className="text-wine underline underline-offset-2">
            {t.consentLink}
          </Link>
          {t.consentB}
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-700" role="alert">
          {t.error}{" "}
          <a className="underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="justify-self-start rounded-full bg-wine px-8 py-4 font-medium text-white transition-colors hover:bg-wine-deep disabled:opacity-60"
      >
        {busy ? t.sending : t.submit}
      </button>
    </form>
  );
}
