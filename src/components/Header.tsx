"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/es";
import { localHref, type Locale } from "@/i18n";

type Props = {
  dict: Dictionary["nav"];
  lang: Locale;
  contact: { email: string; phone: string };
};

export function Header({ dict, lang, contact }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other: Locale = lang === "es" ? "en" : "es";
  const pathname = usePathname() ?? `/${lang}`;
  const switchHref = pathname.replace(/^\/(es|en)(?=\/|$)/, `/${other}`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-canvas/90 shadow-[0_1px_0_var(--line)] backdrop-blur-lg"
            : ""
        }`}
      >
        <div className="flex h-16 items-stretch justify-between pl-4 md:h-20 md:pl-10">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2.5"
            aria-label="C&J Software Consulting"
          >
            <Image
              src="/brand/logo.png"
              alt="C&J Software Consulting"
              width={1317}
              height={453}
              loading="eager"
              className="h-11 w-auto md:h-14"
            />
          </Link>

          <div className="flex items-stretch">
            <div className="hidden items-center gap-7 pr-7 md:flex">
              <Link
                href={localHref(lang, "/#proyectos")}
                className="text-[0.95rem] text-ink transition-colors hover:text-wine"
              >
                {dict.work}
              </Link>
              <Link
                href={localHref(lang, "/blog")}
                className="text-[0.95rem] text-ink transition-colors hover:text-wine"
              >
                {dict.blog}
              </Link>
              <Link
                href={localHref(lang, "/#contacto")}
                className="group flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[0.95rem] text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                {dict.hello}
                <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href={switchHref}
                hrefLang={other}
                scroll={false}
                className="text-xs font-medium tracking-widest text-ink-soft uppercase hover:text-ink"
              >
                {other}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={dict.menu}
              className="grid w-16 place-items-center bg-wine text-white transition-colors hover:bg-wine-deep md:w-20"
            >
              <span className="flex w-6 flex-col gap-1.5" aria-hidden>
                <span className="h-0.5 w-full bg-white" />
                <span className="h-0.5 w-full bg-white" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (outside <header>: its backdrop-filter would trap a fixed child) */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-night text-white transition-[opacity,visibility] duration-500 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-stretch justify-between pl-4 md:h-20 md:pl-10">
          <span className="flex items-center">
            <Image
              src="/brand/logo-light.png"
              alt="C&J Software Consulting"
              width={1317}
              height={453}
              className="h-11 w-auto md:h-14"
            />
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={dict.close}
            tabIndex={open ? 0 : -1}
            className="grid w-16 place-items-center bg-wine text-2xl text-white md:w-20"
          >
            ×
          </button>
        </div>
        <div className="container-x grid flex-1 content-center gap-12 overflow-y-auto py-10 md:grid-cols-12">
          <nav className="md:col-span-8" aria-label="Menú">
            <ul>
              {dict.links.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={localHref(lang, l.href)}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={`group flex items-baseline gap-5 py-2 font-serif text-4xl transition-all duration-500 hover:text-marker md:text-6xl ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: open ? `${120 + i * 50}ms` : "0ms",
                    }}
                  >
                    <span className="font-sans text-sm text-white/40">
                      0{i + 1}
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 self-end text-white/70 md:col-span-4">
            <a
              href={`mailto:${contact.email}`}
              tabIndex={open ? 0 : -1}
              className="block text-lg text-white hover:text-marker"
            >
              {contact.email}
            </a>
            <p>{contact.phone}</p>
            <Link
              href={switchHref}
              hrefLang={other}
              scroll={false}
              tabIndex={open ? 0 : -1}
              className="inline-block pt-4 text-sm tracking-widest text-marker uppercase"
            >
              {dict.language} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
