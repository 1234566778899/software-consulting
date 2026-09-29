import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "@/i18n";
import { formatDate, getPost, headingId, posts } from "@/content/blog";
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

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!hasLocale(lang) || !post) return {};
  return {
    title: post.title[lang],
    description: post.excerpt[lang],
    alternates: localeAlternates(lang, `/blog/${slug}`),
    keywords: [
      post.category[lang],
      ...getDictionary(lang).meta.keywords.slice(0, 4),
    ],
    authors: [{ name: post.author, url: site.url }],
    openGraph: {
      ...ogBase(lang),
      type: "article",
      url: `/${lang}/blog/${slug}`,
      title: post.title[lang],
      description: post.excerpt[lang],
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      section: post.category[lang],
      tags: [post.category[lang]],
    },
    twitter: {
      ...twitterBase,
      title: post.title[lang],
      description: post.excerpt[lang],
    },
  };
}

const shareIcons = {
  facebook:
    "M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3V9a1 1 0 0 1 1-1z",
  whatsapp:
    "M20 11.5a8.5 8.5 0 0 1-12.6 7.4L4 20l1.1-3.3A8.5 8.5 0 1 1 20 11.5z",
  linkedin: "M6 9v10M6 5.5v.01M10 19v-6a3 3 0 0 1 6 0v6M10 9v10",
};

export default async function PostPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!hasLocale(lang) || !post) notFound();
  const t = getDictionary(lang);
  const sections = post.body[lang];
  const labels = { by: t.blog.by, min: t.blog.min };
  const related = [
    ...posts.filter(
      (p) => p.slug !== slug && p.category.es === post.category.es,
    ),
    ...posts.filter(
      (p) => p.slug !== slug && p.category.es !== post.category.es,
    ),
  ].slice(0, 3);

  const postUrl = absoluteUrl(`/${lang}/blog/${slug}`);
  const structuredData = {
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        mainEntityOfPage: postUrl,
        url: postUrl,
        headline: post.title[lang],
        description: post.excerpt[lang],
        image: [
          absoluteUrl(post.cover),
          absoluteUrl(`/${lang}/blog/${slug}/opengraph-image`),
        ],
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: lang === "es" ? "es-PE" : "en",
        articleSection: post.category[lang],
        wordCount: sections.reduce(
          (n, s) =>
            n +
            [...s.paragraphs, ...(s.list ?? [])].join(" ").split(/\s+/).length,
          0,
        ),
        timeRequired: `PT${post.minutes}M`,
        author: { "@type": "Organization", name: post.author, url: site.url },
        publisher: { "@id": ids.organization },
        isPartOf: { "@id": `${absoluteUrl(`/${lang}/blog`)}#blog` },
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
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl(`/${lang}/blog`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title[lang],
            item: postUrl,
          },
        ],
      },
    ],
  };

  const url = encodeURIComponent(postUrl);
  const text = encodeURIComponent(post.title[lang]);
  const shares = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: shareIcons.facebook,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${url}`,
      icon: shareIcons.whatsapp,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: shareIcons.linkedin,
    },
  ];

  const toc = (
    <ol className="space-y-2.5 text-xs leading-relaxed text-ink-soft">
      {sections.map((s) => (
        <li key={s.heading}>
          <a
            href={`#${headingId(s.heading)}`}
            className="transition-colors hover:text-wine"
          >
            {s.heading}
          </a>
        </li>
      ))}
      <li>
        <a href="#relacionados" className="transition-colors hover:text-wine">
          {t.blog.related}
        </a>
      </li>
    </ol>
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <Header
        dict={t.nav}
        lang={lang}
        contact={{ email: site.email, phone: site.phone }}
      />
      <main className="pt-16 md:pt-20">
        <BlogNav lang={lang} title={t.blog.title} all={t.blog.all} />

        <nav
          className="container-x flex flex-wrap items-center gap-2 py-5 text-xs text-ink-soft"
          aria-label="Breadcrumb"
        >
          <Link href={`/${lang}`} className="hover:text-wine">
            {t.blog.home}
          </Link>
          <span aria-hidden>›</span>
          <Link href={`/${lang}/blog`} className="hover:text-wine">
            Blog
          </Link>
          <span aria-hidden>›</span>
          <Link
            href={`/${lang}/blog?categoria=${encodeURIComponent(post.category[lang])}`}
            className="hover:text-wine"
          >
            {post.category[lang]}
          </Link>
          <span aria-hidden>›</span>
          <span className="font-semibold text-ink">{post.title[lang]}</span>
        </nav>

        {/* Split hero */}
        <header className="relative grid lg:grid-cols-12">
          <div className="relative aspect-[16/10] lg:col-span-6 lg:aspect-auto lg:min-h-[30rem]">
            <Image
              src={post.cover}
              alt={post.title[lang]}
              fill
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="rise relative bg-wine px-6 py-12 text-white md:px-14 lg:col-span-5 lg:my-8 lg:-ml-10 lg:flex lg:flex-col lg:justify-center lg:py-16">
            <span className="self-start bg-night px-2.5 py-1 text-xs">
              {post.category[lang]}
            </span>
            <h1 className="mt-6 text-3xl leading-tight font-semibold md:text-4xl">
              {post.title[lang]}
            </h1>
            <p className="mt-8 border-y border-white/30 py-4 text-xs text-white/85">
              {t.blog.by} {post.author} · {post.minutes} {t.blog.min}
            </p>
          </div>
          <CircleBadge
            text={`${t.blog.title} · ${t.blog.title} · ${t.blog.title} · `}
            size={96}
            className="absolute -top-12 right-[max(1rem,calc((100vw-88rem)/2+2.5rem))] hidden text-ink lg:inline-grid"
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
        </header>

        <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
          {/* Left: sticky contents + share */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="border-b border-ink pb-3 text-sm font-semibold">
                {t.blog.toc}
              </p>
              <div className="mt-4">{toc}</div>
              <p className="mt-8 border-t border-line pt-6 text-xs text-ink-soft">
                {t.blog.share}
              </p>
              <div className="mt-3 flex gap-2">
                {shares.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="grid size-9 place-items-center rounded-full bg-night text-white transition-colors hover:bg-wine"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Center: article */}
          <article className="lg:col-span-6">
            <details open className="group bg-surface p-5 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {t.blog.toc}
                <span
                  className="transition-transform group-open:rotate-180"
                  aria-hidden
                >
                  ⌃
                </span>
              </summary>
              <div className="mt-4 border-t border-line pt-4">{toc}</div>
            </details>

            <p className="mt-8 text-lg leading-relaxed lg:mt-0">
              {post.excerpt[lang]}
            </p>
            {sections.map((s) => (
              <section
                key={s.heading}
                id={headingId(s.heading)}
                className="scroll-mt-28"
              >
                <h2 className="mt-12 text-2xl font-semibold tracking-tight">
                  {s.heading}
                </h2>
                {s.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="mt-4 leading-relaxed text-ink-soft"
                  >
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-5 space-y-3">
                    {s.list.map((li) => (
                      <li
                        key={li}
                        className="flex gap-3 leading-relaxed text-ink-soft"
                      >
                        <span
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-wine"
                          aria-hidden
                        />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="mt-14 flex items-center gap-5 rounded-2xl bg-surface p-6">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-wine">
                <Image
                  src="/brand/monogram-light.png"
                  alt=""
                  width={404}
                  height={453}
                  className="h-9 w-auto"
                />
              </span>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.blog.authorBio}</p>
              </div>
            </div>
            <p className="mt-6 flex justify-between border-t border-line pt-5 text-xs">
              <span className="font-semibold">{t.blog.published}</span>
              <time dateTime={post.date} className="text-ink-soft">
                {formatDate(post.date, lang)}
              </time>
            </p>
          </article>

          {/* Right: newsletter */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <Newsletter dict={t.blog} consent={t.contact} privacyHref={`/${lang}/privacidad`} variant="card" />
            </div>
          </aside>
        </div>

        <section id="relacionados" className="scroll-mt-24 bg-surface py-20">
          <div className="container-x">
            <h2 className="text-2xl font-semibold">{t.blog.related}</h2>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
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
