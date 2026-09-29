import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { site } from "@/content/site";
import { projects, showcase } from "@/content/projects";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { ProjectTile } from "@/components/ProjectTile";
import { Showcase } from "@/components/Showcase";
import { CircleBadge } from "@/components/CircleBadge";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { posts } from "@/content/blog";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, ids, localeAlternates, ogBase, organizationJsonLd, twitterBase } from "@/lib/seo";

type Segment = { t: string; mark?: boolean };

function Marked({ segments }: { segments: Segment[] }) {
  return segments.map((s, i) => (s.mark ? <span key={i} className="mark">{s.t}</span> : <span key={i}>{s.t}</span>));
}

// Mosaic layout: row 1 = narrow / wide / narrow, row 2 = half / half.
const tileLayout = [
  { cls: "lg:col-span-3 h-[22rem] md:h-[30rem]", sizes: "(min-width: 1024px) 25vw, 100vw" },
  { cls: "lg:col-span-6 h-[22rem] md:h-[30rem]", sizes: "(min-width: 1024px) 50vw, 100vw" },
  { cls: "lg:col-span-3 h-[22rem] md:h-[30rem]", sizes: "(min-width: 1024px) 25vw, 100vw" },
  { cls: "lg:col-span-6 h-[22rem] md:h-[34rem]", sizes: "(min-width: 1024px) 50vw, 100vw" },
  { cls: "lg:col-span-6 h-[22rem] md:h-[34rem]", sizes: "(min-width: 1024px) 50vw, 100vw" },
];

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    alternates: localeAlternates(lang),
    openGraph: { ...ogBase(lang), url: `/${lang}`, title: t.meta.title, description: t.meta.description },
    twitter: { ...twitterBase, title: t.meta.title, description: t.meta.description },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const pageUrl = absoluteUrl(`/${lang}`);
  const structuredData = {
    "@graph": [
      {
        ...organizationJsonLd(),
        description: t.meta.description,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.services.eyebrow,
          itemListElement: t.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.body, provider: { "@id": ids.organization } },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.name,
        inLanguage: ["es-PE", "en"],
        publisher: { "@id": ids.organization },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang === "es" ? "es-PE" : "en",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.organization },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Header dict={t.nav} lang={lang} contact={{ email: site.email, phone: site.phone }} />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
          <div className="container-x pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
            <div className="relative h-full border-x border-line">
              <span className="absolute inset-y-0 left-1/2 w-px bg-line" />
            </div>
          </div>
          <div className="container-x relative text-center">
            <p className="rise text-sm font-medium tracking-[0.2em] text-wine uppercase">{t.hero.eyebrow}</p>
            <h1
              className="rise mx-auto mt-8 max-w-6xl text-[2.7rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.6rem]"
             
            >
              <Marked segments={t.hero.title} />
            </h1>
            <p
              className="rise mx-auto mt-10 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg"
             
            >
              {t.hero.lead}
            </p>
            <div className="rise mt-12 flex justify-center md:justify-start">
              <a href="#proyectos" aria-label={t.hero.badge.trim()} className="text-ink transition-colors hover:text-wine">
                <CircleBadge text={t.hero.badge} size={112}>
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M12 4v16M6 14l6 6 6-6" />
                  </svg>
                </CircleBadge>
              </a>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="proyectos" className="container-x">
          <Reveal className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <h2 className="font-serif text-5xl md:text-6xl">{t.work.title}</h2>
            <p className="max-w-sm text-ink-soft">{t.work.lead}</p>
          </Reveal>
          <div className="grid gap-3 md:gap-4 lg:grid-cols-12">
            {projects.map((p, i) => (
              <Reveal key={p.slug} className={tileLayout[i % tileLayout.length].cls}>
                <ProjectTile
                  name={p.name}
                  category={p.category[lang]}
                  poster={p.poster}
                  video={p.video}
                  viewLabel={t.work.view}
                  url={p.url}
                  visitLabel={t.video.visit}
                  badge={p.url ? undefined : t.work.soon}
                  closeLabel={t.video.close}
                  sizes={tileLayout[i % tileLayout.length].sizes}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
          <div className="flex justify-center py-16 md:py-24">
            <a href="#contacto" className="text-ink transition-colors hover:text-wine" aria-label={t.work.more}>
              <CircleBadge text={t.work.more} size={150}>
                <span className="text-4xl font-light" aria-hidden>+</span>
              </CircleBadge>
            </a>
          </div>
        </section>

        {/* STATEMENT */}
        <section className="container-x">
          <Reveal className="relative overflow-hidden bg-wine px-6 py-16 text-white md:px-20 md:py-28">
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <p className="font-serif text-3xl leading-[1.15] md:col-span-9 md:text-5xl lg:text-6xl">{t.statement.text}</p>
              <div className="md:col-span-3 md:text-right">
                <svg viewBox="0 0 24 48" className="h-16 w-8 md:ml-auto" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                  <path d="M12 2v44M4 38l8 8 8-8" />
                </svg>
              </div>
            </div>
            <p className="mt-10 text-lg text-white/75">{t.statement.sub}</p>
          </Reveal>
        </section>

        {/* CRAFT MARQUEE */}
        <div className="overflow-hidden border-b border-line py-10 md:py-14" aria-hidden>
          <ul className="marquee flex w-max items-center gap-10 pr-10 font-serif text-4xl text-ink md:text-6xl">
            {[...t.approach.craft, ...t.approach.craft].map((c, i) => (
              <li key={i} className="flex items-center gap-10 whitespace-nowrap">
                {c}
                <span className="size-3 rounded-full bg-wine" />
              </li>
            ))}
          </ul>
        </div>

        {/* APPROACH */}
        <section id="enfoque" className="container-x py-24 md:py-36">
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
              <p className="text-sm font-medium tracking-[0.2em] text-wine uppercase">{t.approach.eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl leading-[1.1] md:text-6xl">{t.approach.title}</h2>
              <p className="mt-8 text-lg leading-relaxed text-ink-soft">{t.approach.lead}</p>
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {t.approach.items.map((it, i) => (
                <Reveal key={it.title} className="bg-surface p-8 md:p-10">
                  <span className="grid size-10 place-items-center rounded-full bg-wine text-sm font-semibold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-xl font-semibold">{it.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{it.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section className="bg-night py-24 text-white md:py-36">
          <div className="container-x">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium tracking-[0.2em] text-marker uppercase">{t.showcase.eyebrow}</p>
              <h2 className="mt-6 font-serif text-5xl md:text-7xl">{t.showcase.title}</h2>
              <p className="mt-6 text-lg text-white/65">{t.showcase.lead}</p>
            </Reveal>
            <Reveal className="mx-auto mt-16 max-w-6xl">
              <Showcase
                poster={showcase.poster}
                video={showcase.video}
                label={t.showcase.label}
                cta={t.showcase.cta}
                url={showcase.url}
                visitLabel={t.video.visit}
                closeLabel={t.video.close}
              />
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="servicios" className="container-x py-24 md:py-36">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] text-wine uppercase">{t.services.eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] md:text-6xl">{t.services.title}</h2>
          </Reveal>
          <div className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((s) => (
              <Reveal key={s.title} className="border-r border-b border-line">
                <article className="group h-full p-8 transition-colors hover:bg-surface md:p-12">
                  <ServiceIcon name={s.icon} />
                  <h3 className="mt-8 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="proceso" className="bg-surface py-24 md:py-36">
          <div className="container-x">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] text-wine uppercase">{t.process.eyebrow}</p>
                <h2 className="mt-6 font-serif text-4xl md:text-6xl">{t.process.title}</h2>
              </div>
            </Reveal>
            <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
              <span className="absolute top-6 right-0 left-0 hidden h-px bg-line-strong md:block" aria-hidden />
              {t.process.steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <Reveal>
                    <span className="relative grid size-12 place-items-center rounded-full border border-ink bg-surface font-serif text-lg">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BLOG */}
        <section className="bg-night text-white">
          <div className="grid lg:grid-cols-12">
            <div className="relative aspect-[16/9] lg:col-span-8 lg:aspect-auto lg:min-h-[26rem]">
              <Image src={posts[0].cover} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
            </div>
            <Reveal className="flex flex-col justify-between gap-10 px-6 py-14 md:px-12 lg:col-span-4">
              <h2 className="font-serif text-5xl leading-none md:text-6xl">{t.blog.homeTitle}</h2>
              <div className="flex items-end justify-between">
                <Link href={`/${lang}/blog`} className="text-sm text-marker underline-offset-4 hover:underline">
                  {t.blog.homeMore}
                </Link>
                <svg viewBox="0 0 24 48" className="h-16 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                  <path d="M12 2v44M4 38l8 8 8-8" />
                </svg>
              </div>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => {
              const d = new Date(`${p.date}T12:00:00`);
              return (
                <Link
                  key={p.slug}
                  href={`/${lang}/blog/${p.slug}`}
                  className={`group block px-6 py-12 transition-colors duration-300 hover:bg-wine md:px-12 ${i % 2 ? "bg-night" : "bg-night-2"}`}
                >
                  <p className="flex items-center gap-2 text-sm text-white/80">
                    <span className="grid size-8 place-items-center rounded-full bg-wine text-xs font-semibold text-white transition-colors group-hover:bg-white group-hover:text-wine">
                      {String(d.getDate()).padStart(2, "0")}
                    </span>
                    {d.toLocaleDateString(lang === "es" ? "es-PE" : "en-US", { month: "short" })}
                  </p>
                  <h3 className="mt-6 text-xl leading-snug font-semibold">{p.title[lang]}</h3>
                  <p className="mt-8 line-clamp-3 text-sm leading-relaxed text-white/60 group-hover:text-white/85">{p.excerpt[lang]}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="preguntas" className="container-x py-24 md:py-36">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="font-serif text-4xl md:text-5xl">{t.faq.title}</h2>
            </Reveal>
            <div className="border-t border-line-strong lg:col-span-8">
              {t.faq.items.map((f) => (
                <details key={f.q} className="group border-b border-line-strong">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-lg font-medium md:text-xl [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-ink text-xl transition-all group-open:rotate-45 group-open:bg-wine group-open:border-wine group-open:text-white"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactSection dict={t.contact} lang={lang} />
      </main>

      <Footer t={t} lang={lang} />
    </>
  );
}
