import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/es";
import { localHref, type Locale } from "@/i18n";
import { site } from "@/content/site";
import { complaints } from "@/content/complaints";
import { ComplaintsBookIcon } from "./ComplaintsBookIcon";

type Props = { t: Dictionary; lang: Locale };

/** Light footer with the "let's meet" CTA, as in the reference. Also renders the floating WhatsApp button. */
export function Footer({ t, lang }: Props) {
  const year = new Date().getFullYear();
  const tel = site.phone.replace(/\s/g, "");
  const cta = [
    { tipo: "empresa", label: t.cta.company, icon: "M4 20V8l8-4 8 4v12M9 20v-6h6v6" },
    { tipo: "proyecto", label: t.cta.project, icon: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" },
  ];

  return (
    <>
      <footer className="print-hide border-t border-line bg-canvas pt-16 pb-10">
        <div className="container-x">
          <Link href={`/${lang}`} aria-label={site.name} className="inline-block">
            <Image src="/brand/logo.png" alt={site.name} width={1317} height={453} className="h-14 w-auto" />
          </Link>
          <div className="mt-10 grid gap-12 border-t border-line pt-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="max-w-sm text-2xl leading-snug font-semibold tracking-tight">{t.cta.title}</p>
              <div className="mt-8 grid max-w-sm grid-cols-2 border-y border-line">
                {cta.map((c, i) => (
                  <Link
                    key={c.tipo}
                    href={`/${lang}?tipo=${c.tipo}#contacto`}
                    className={`group flex items-center gap-3 py-5 text-sm font-medium transition-colors hover:text-wine ${i ? "border-l border-line pl-6" : "pr-6"}`}
                  >
                    <span className="relative grid size-9 shrink-0 place-items-center">
                      <span className="absolute inset-x-0 top-3 h-4 -rotate-6 rounded-full bg-marker transition-colors group-hover:bg-marker-strong" />
                      <svg viewBox="0 0 24 24" className="relative size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                        <path d={c.icon} />
                      </svg>
                    </span>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
            <nav className="md:col-span-4" aria-label={t.footer.explore}>
              <p className="text-sm font-semibold">{t.footer.explore}</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-ink-soft">
                {t.nav.links.map((l) => (
                  <li key={l.href}>
                    <Link href={localHref(lang, l.href)} className="transition-colors hover:text-wine">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="text-sm md:col-span-3 md:text-right">
              <p className="font-semibold">{t.footer.contact}</p>
              <div className="mt-5 space-y-2.5 text-ink-soft">
                <a href={`tel:${tel}`} className="block transition-colors hover:text-wine">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="block transition-colors hover:text-wine">{site.email}</a>
                <p>{site.location}</p>
              </div>
              {/* Aviso del Libro de Reclamaciones virtual (art. 151, Ley 29571; Anexo III, D.S. 011-2011-PCM). */}
              <Link
                href={`/${lang}/libro-de-reclamaciones`}
                className="group mt-6 inline-flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 text-left transition-colors hover:border-wine"
              >
                <ComplaintsBookIcon className="size-9 shrink-0 text-wine" />
                <span className="leading-tight">
                  <span className="block font-semibold text-ink group-hover:text-wine">{complaints[lang].title}</span>
                  <span className="block text-xs text-ink-soft">{lang === "es" ? "Registra tu reclamo o queja" : "File a claim or complaint"}</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-5 border-t border-line pt-8 text-xs text-ink-faint md:flex-row md:items-center">
            <p className="flex flex-wrap gap-x-6 gap-y-2">
              <span>© {year} {site.name}. {t.footer.rights}</span>
              <Link href={`/${lang}/privacidad`} className="transition-colors hover:text-wine">
                {t.footer.privacy}
              </Link>
              <Link href={`/${lang}/libro-de-reclamaciones`} className="transition-colors hover:text-wine">
                {complaints[lang].title}
              </Link>
            </p>
            <div className="flex gap-5 text-sm text-ink">
              {site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-wine">LinkedIn</a>}
              {site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-wine">Instagram</a>}
            </div>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label={t.whatsapp}
        className="print-hide fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.77a9.36 9.36 0 0 1 2.76 6.66c0 5.2-4.23 9.42-9.44 9.42m8.02-17.43A11.26 11.26 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.25l5.61-1.47a11.3 11.3 0 0 0 5.83 1.6h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
        </svg>
      </a>
    </>
  );
}
