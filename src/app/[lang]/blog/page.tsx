import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { posts } from "@/content/blog";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CircleBadge } from "@/components/CircleBadge";
import { BlogNav } from "@/components/blog/BlogNav";
import { PostCard } from "@/components/blog/PostCard";
import { Newsletter } from "@/components/blog/Newsletter";
import { JsonLd } from "@/components/JsonLd";
import {
  absoluteUrl,
  ids,
  localeAlternates,
  ogBase,
  twitterBase,
} from "@/lib/seo";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  const filtered = Boolean((await searchParams).categoria);
  return {
    title: t.meta.blogTitle,
    description: t.meta.blogDescription,
    // Category filters are the same content re-ordered: canonical to the main index.
    alternates: localeAlternates(lang, "/blog"),
    robots: filtered ? { index: false, follow: true } : undefined,
    openGraph: {
      ...ogBase(lang),
      url: `/${lang}/blog`,
      title: t.meta.blogTitle,
      description: t.meta.blogDescription,
    },
    twitter: {
      ...twitterBase,
      title: t.meta.blogTitle,
      description: t.meta.blogDescription,
    },
  };
}

export default async function BlogIndex({
  params,
  searchParams,
}: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const raw = (await searchParams).categoria;
  const category = typeof raw === "string" ? raw : undefined;

  const list = category
    ? posts.filter((p) => p.category[lang] === category)
    : posts;
  const [featured] = posts;
  const labels = { by: t.blog.by, min: t.blog.min };
  const selection = posts.slice(1, 4);

  const blogUrl = absoluteUrl(`/${lang}/blog`);
  const structuredData = {
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        url: blogUrl,
        name: t.meta.blogTitle,
        description: t.meta.blogDescription,
        inLanguage: lang === "es" ? "es-PE" : "en",
        publisher: { "@id": ids.organization },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title[lang],
          url: absoluteUrl(`/${lang}/blog/${p.slug}`),
          datePublished: p.date,
          image: absoluteUrl(p.cover),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t.blog.home,
            item: absoluteUrl(`/${lang}`),
          },
          { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Header
        dict={t.nav}
        lang={lang}
        contact={{ email: site.email, phone: site.phone }}
      />
      <main className="pt-16 md:pt-20">
        <BlogNav
          lang={lang}
          title={t.blog.title}
          all={t.blog.all}
          active={category}
        />

        {!category && (
          <section className="relative">
            <div className="container-x flex items-center justify-between py-10 md:py-14">
              <h1 className="rise text-3xl font-semibold tracking-tight md:text-4xl">
                {t.blog.latest}
              </h1>
              <CircleBadge
                text={`${t.blog.title} · ${t.blog.title} · ${t.blog.title} · `}
                size={96}
                className="hidden text-ink md:inline-grid"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M12 4v16M6 14l6 6 6-6" />
                </svg>
              </CircleBadge>
            </div>
            <Reveal className="relative">
              <Link
                href={`/${lang}/blog/${featured.slug}`}
                className="group grid lg:grid-cols-12"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:ml-[max(1rem,calc((100vw-88rem)/2+2.5rem))] lg:aspect-auto lg:min-h-[28rem]">
                  <Image
                    src={featured.cover}
                    alt=""
                    fill
                    fetchPriority="high"
                    loading="eager"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="bg-wine px-6 py-12 text-white md:px-14 lg:col-span-5 lg:-mt-10 lg:mb-10 lg:py-16">
                  <span className="inline-block bg-night px-2.5 py-1 text-xs">
                    {featured.category[lang]}
                  </span>
                  <h2 className="mt-6 text-3xl leading-tight font-semibold md:text-4xl">
                    {featured.title[lang]}
                  </h2>
                  <p className="mt-6 border-y border-white/30 py-4 text-xs text-white/85">
                    {t.blog.by} {featured.author}
                  </p>
                  <span className="mt-8 inline-block rounded-full border border-white px-6 py-2.5 text-sm transition-colors duration-300 group-hover:bg-white group-hover:text-wine">
                    {t.blog.readMore}
                  </span>
                </div>
              </Link>
            </Reveal>
          </section>
        )}

        <section className="container-x py-16 md:py-24">
          {category && (
            <h1 className="rise mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
              {category}
            </h1>
          )}
          {list.length ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Reveal key={p.slug}>
                  <PostCard post={p} lang={lang} labels={labels} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-ink-soft">{t.blog.empty}</p>
          )}
        </section>

        <section className="container-x pb-20">
          <Reveal>
            <Newsletter dict={t.blog} consent={t.contact} privacyHref={`/${lang}/privacidad`} />
          </Reveal>
        </section>

        <section className="bg-surface py-20 md:py-24">
          <div className="container-x">
            <Reveal className="flex flex-col gap-4 md:flex-row md:items-center md:gap-16">
              <h2 className="shrink-0 text-2xl font-semibold">
                {t.blog.selection}
              </h2>
              <p className="max-w-xl text-sm text-ink-soft">
                {t.blog.selectionLead}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {selection.map((p) => (
                <Reveal key={p.slug}>
                  <PostCard post={p} lang={lang} labels={labels} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
