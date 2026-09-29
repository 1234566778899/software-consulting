import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { legalOr, site } from "@/content/site";
import { complaints } from "@/content/complaints";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ComplaintForm } from "@/components/ComplaintForm";
import { ComplaintsBookIcon } from "@/components/ComplaintsBookIcon";
import { localeAlternates, ogBase, twitterBase } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/libro-de-reclamaciones">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = complaints[lang];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localeAlternates(lang, "/libro-de-reclamaciones"),
    openGraph: { ...ogBase(lang), url: `/${lang}/libro-de-reclamaciones`, title: c.metaTitle, description: c.metaDescription },
    twitter: { ...twitterBase, title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function ComplaintsBook({ params }: PageProps<"/[lang]/libro-de-reclamaciones">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const c = complaints[lang];

  return (
    <>
      <Header dict={t.nav} lang={lang} contact={{ email: site.email, phone: site.phone }} />
      <main className="pt-16 md:pt-20">
        <section className="border-b border-line bg-surface">
          <div className="container-x flex flex-col gap-6 py-14 md:flex-row md:items-center md:py-20">
            <ComplaintsBookIcon className="size-20 shrink-0 text-wine" />
            <div>
              <h1 className="rise text-4xl font-semibold tracking-tight md:text-5xl">{c.title}</h1>
              <p className="mt-4 max-w-2xl text-ink-soft">{c.lead}</p>
            </div>
          </div>
        </section>
        <section className="container-x max-w-4xl py-14 md:py-20">
          <ComplaintForm
            t={c}
            locale={lang === "es" ? "es-PE" : "en-US"}
            email={site.email}
            privacyHref={`/${lang}/privacidad`}
            provider={{
              legalName: legalOr(site.legal.name, site.name),
              ruc: legalOr(site.legal.ruc, c.pending),
              address: legalOr(site.legal.address, site.location),
            }}
          />
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
