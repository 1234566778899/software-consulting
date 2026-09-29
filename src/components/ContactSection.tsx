import type { Dictionary } from "@/i18n/es";
import type { Locale } from "@/i18n";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

/** Split contact block modelled on the reference: color panel + dark form panel, then a contact strip. */
export function ContactSection({ dict, lang }: { dict: Dictionary["contact"]; lang: Locale }) {
  const tel = site.phone.replace(/\s/g, "");
  return (
    <section id="contacto" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2">
        <div className="bg-wine px-6 py-20 text-white md:px-16 lg:py-32 lg:pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
          <Reveal className="max-w-xl">
            <h2 className="text-4xl leading-[1.15] font-semibold tracking-tight md:text-5xl">
              {dict.title}{" "}
              <a href={`tel:${tel}`} className="whitespace-nowrap underline decoration-white/60 decoration-[3px] underline-offset-[10px] hover:decoration-white">
                {site.phone.replace("+51 ", "")}
              </a>
            </h2>
            <div className="mt-12 flex items-end justify-between gap-8">
              <p className="max-w-sm text-sm leading-relaxed text-white/85">{dict.body}</p>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid size-20 shrink-0 place-items-center rounded-full border border-white/70 transition-colors duration-300 hover:bg-white hover:text-wine"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
        <div className="bg-night px-6 py-20 md:px-16 lg:py-32 lg:pr-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
          <Reveal className="mx-auto max-w-lg">
            <ContactForm dict={dict} email={site.email} privacyHref={`/${lang}/privacidad`} />
          </Reveal>
        </div>
      </div>
      <div className="grid lg:grid-cols-3">
        <div className="flex flex-col gap-4 bg-night-2 px-6 py-10 text-lg font-medium text-white sm:flex-row sm:gap-12 md:px-16 lg:col-span-2 lg:pl-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]">
          <a href={`mailto:${site.email}`} className="hover:text-marker">
            {site.email}
          </a>
          <span>{site.location}</span>
        </div>
      </div>
    </section>
  );
}
