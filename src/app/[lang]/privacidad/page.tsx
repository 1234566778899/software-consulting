import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { site } from "@/content/site";
import { privacy, privacyUpdated } from "@/content/privacy";
import { formatDate, headingId } from "@/content/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { localeAlternates, ogBase, twitterBase } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidad">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = privacy[lang];
  const description = p.intro.slice(0, 155).replace(/\s\S*$/, "…");
  return {
    title: p.title,
    description,
    alternates: localeAlternates(lang, "/privacidad"),
    openGraph: { ...ogBase(lang), url: `/${lang}/privacidad`, title: p.title, description },
    twitter: { ...twitterBase, title: p.title, description },
  };
}

export default async function Privacy({ params }: PageProps<"/[lang]/privacidad">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const p = privacy[lang];

  return (
    <>
      <Header dict={t.nav} lang={lang} contact={{ email: site.email, phone: site.phone }} />
      <main className="pt-16 md:pt-20">
        <section className="border-b border-line bg-surface">
          <div className="container-x py-14 md:py-20">
            <h1 className="rise text-4xl font-semibold tracking-tight md:text-6xl">{p.title}</h1>
            <p className="mt-4 text-sm text-ink-soft">
              {lang === "es" ? "Última actualización: " : "Last updated: "}
              <time dateTime={privacyUpdated}>{formatDate(privacyUpdated, lang)}</time>
            </p>
          </div>
        </section>

        <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28" aria-label={p.title}>
              <p className="border-b border-ink pb-3 text-sm font-semibold">{t.blog.toc}</p>
              <ol className="mt-4 space-y-2.5 text-xs leading-relaxed text-ink-soft">
                {p.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${headingId(s.heading)}`} className="transition-colors hover:text-wine">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            <p className="text-lg leading-relaxed">{p.intro}</p>
            {p.sections.map((s) => (
              <section key={s.heading} id={headingId(s.heading)} className="scroll-mt-28">
                <h2 className="mt-12 text-2xl font-semibold tracking-tight">{s.heading}</h2>
                {s.paragraphs.map((para) => (
                  <p key={para.slice(0, 32)} className="mt-4 leading-relaxed text-ink-soft">
                    {para}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-3">
                    {s.list.map((li) => (
                      <li key={li} className="flex gap-3 leading-relaxed text-ink-soft">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-wine" aria-hidden />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
