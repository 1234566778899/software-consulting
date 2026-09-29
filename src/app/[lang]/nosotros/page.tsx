import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { site, stack } from "@/content/site";
import { team } from "@/content/team";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, ids, localeAlternates, ogBase, organizationJsonLd, twitterBase } from "@/lib/seo";

type Segment = { t: string; mark?: boolean };
const Marked = ({ segments }: { segments: Segment[] }) =>
  segments.map((s, i) => (s.mark ? <span key={i} className="mark">{s.t}</span> : <span key={i}>{s.t}</span>));

export async function generateMetadata({ params }: PageProps<"/[lang]/nosotros">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    alternates: localeAlternates(lang, "/nosotros"),
    openGraph: { ...ogBase(lang), url: `/${lang}/nosotros`, title: t.about.metaTitle, description: t.about.metaDescription },
    twitter: { ...twitterBase, title: t.about.metaTitle, description: t.about.metaDescription },
  };
}

// Black & white collage, as in the reference.
const collage = [
  { src: "/about/studio.jpg", cls: "col-span-12 md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto" },
  { src: "/blog/ux-desk.jpg", cls: "col-span-12 md:col-span-8 aspect-[16/10] md:mt-16" },
  { src: "/blog/design-system.jpg", cls: "col-span-12 md:col-span-5 aspect-[4/3]" },
  { src: "/blog/dev-desk.jpg", cls: "col-span-12 md:col-span-3 aspect-[3/4]" },
];

export default async function About({ params }: PageProps<"/[lang]/nosotros">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const pageUrl = absoluteUrl(`/${lang}/nosotros`);

  const structuredData = {
    "@graph": [
      { ...organizationJsonLd(), description: t.about.statementBody },
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.about.metaTitle,
        description: t.about.metaDescription,
        inLanguage: lang === "es" ? "es-PE" : "en",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.organization },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.blog.home, item: absoluteUrl(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: t.nav.links.find((l) => l.href === "/nosotros")?.label, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Header dict={t.nav} lang={lang} contact={{ email: site.email, phone: site.phone }} />
      <main>
        {/* HERO */}
        <section className="relative bg-surface pt-36 pb-40 md:pt-48 md:pb-56">
          <div className="container-x relative">
            <h1 className="rise max-w-4xl text-[2.6rem] leading-[1.08] font-semibold tracking-tight md:text-7xl">
              <Marked segments={t.about.title} />
            </h1>
            <span className="absolute right-10 bottom-[-6rem] hidden h-40 w-px bg-ink md:block" aria-hidden />
          </div>
        </section>

        {/* COLLAGE */}
        <section className="container-x -mt-24 md:-mt-36">
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {collage.map((c, i) => (
              <Reveal key={c.src} className={`relative overflow-hidden ${c.cls}`}>
                <Image
                  src={c.src}
                  alt=""
                  fill
                  loading={i < 2 ? "eager" : "lazy"}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* STATEMENT */}
        <section className="container-x grid gap-8 py-24 md:grid-cols-12 md:py-32">
          <Reveal className="md:col-span-6">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">{t.about.statement}</h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8">
            <p className="leading-relaxed text-ink-soft">{t.about.statementBody}</p>
          </Reveal>
        </section>

        {/* FOUNDERS */}
        <section className="container-x pb-24 md:pb-32">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-6xl">{t.about.foundersTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
            {team.map((m, i) => (
              <Reveal key={m.name} className={i % 2 ? "md:mt-24" : ""}>
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-3xl">{m.name}</h3>
                      <p className="mt-1 text-sm text-wine">{m.role[lang]}</p>
                    </div>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${t.about.linkedin}: ${m.name}`}
                      className="grid size-11 shrink-0 place-items-center rounded-full border border-ink transition-colors duration-300 hover:border-wine hover:bg-wine hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
                      </svg>
                    </a>
                  </div>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{m.bio[lang]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS TIMELINE (alternating, like the reference) */}
        <section className="border-t border-line py-24 md:py-32">
          <div className="container-x">
            <Reveal>
              <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">{t.about.processTitle}</h2>
            </Reveal>
            <ol className="relative mt-16 grid gap-10 md:mt-24 md:grid-cols-5 md:gap-0">
              <span className="absolute top-1/2 right-0 left-0 hidden h-px bg-ink md:block" aria-hidden />
              {t.process.steps.map((s, i) => {
                const up = i % 2 === 0;
                return (
                  <li key={s.title} className={`relative md:flex md:h-72 md:flex-col md:px-4 ${up ? "md:justify-start" : "md:justify-end"}`}>
                    <span
                      className={`absolute left-4 hidden w-px bg-ink md:block ${up ? "top-24 bottom-1/2" : "top-1/2 bottom-24"}`}
                      aria-hidden
                    />
                    <span className="absolute top-1/2 left-4 hidden size-2 -translate-x-[3.5px] -translate-y-1 rounded-full bg-ink md:block" aria-hidden />
                    <Reveal className="relative">
                      <span className="grid size-12 place-items-center rounded-full bg-wine font-serif text-lg text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 max-w-[14rem] text-sm leading-relaxed text-ink-soft md:hidden">{s.body}</p>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* STACK (instead of partners) */}
        <section className="container-x pb-24 text-center md:pb-32">
          <Reveal>
            <h2 className="text-2xl font-semibold">{t.about.stackTitle}</h2>
            <p className="mt-3 text-sm text-ink-soft">{t.about.stackLead}</p>
          </Reveal>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-10 gap-y-6">
            {stack.map((s) => (
              <li key={s} className="font-serif text-2xl text-ink-soft md:text-3xl">
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* VALUES BLOCK + PHOTO */}
        <section className="relative">
          <div className="container-x">
            <div className="bg-wine px-6 pt-16 pb-40 text-white md:px-16 md:pt-24 md:pb-56">
              {t.about.values.map((v, i) => (
                <Reveal key={v.title} className="grid gap-6 border-b border-white/30 py-10 md:grid-cols-12 md:items-center">
                  <div className="flex items-center gap-5 md:col-span-7">
                    <svg viewBox="0 0 32 32" className="size-10 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                      {i === 0 ? (
                        <path d="M16 27s-11-6.6-11-14a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.4-11 14-11 14z" />
                      ) : (
                        <path d="M4 12l6 5 6-10 6 10 6-5-3 13H7z" />
                      )}
                    </svg>
                    <h3 className="font-serif text-4xl leading-none md:text-6xl">{v.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/85 md:col-span-4 md:col-start-9">{v.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="relative -mt-28 grid grid-cols-12 md:-mt-40">
            <Reveal className="relative col-span-12 aspect-[16/9] md:col-span-8 md:aspect-auto md:h-[30rem]">
              <Image src="/about/studio.jpg" alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover grayscale" />
            </Reveal>
            <div className="col-span-12 flex items-end bg-night p-10 md:col-span-3">
              <Link
                href={`/${lang}#contacto`}
                className="group flex items-center gap-4 text-2xl font-semibold text-white"
              >
                {t.about.join}
                <svg viewBox="0 0 24 24" className="size-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="mt-16 overflow-hidden py-10" aria-hidden>
          <ul className="marquee flex w-max items-center gap-10 pr-10 text-3xl text-ink-faint md:text-4xl">
            {[...t.approach.craft, ...t.approach.craft].map((c, i) => (
              <li key={i} className="flex items-center gap-10 whitespace-nowrap">
                {c}
                <span className="size-3 rounded-full bg-wine" />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
