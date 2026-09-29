import Link from "next/link";
import type { Locale } from "@/i18n";
import { posts } from "@/content/blog";

/** Sub-header of the blog: title + category filters (like "Blog Staff" bar in the reference). */
export function BlogNav({ lang, title, all, active }: { lang: Locale; title: string; all: string; active?: string }) {
  const categories = [...new Set(posts.map((p) => p.category[lang]))];
  const base = `/${lang}/blog`;
  const item = (label: string, href: string, on: boolean) => (
    <Link
      key={href}
      href={href}
      scroll={false}
      className={`shrink-0 text-sm transition-colors hover:text-wine ${on ? "font-semibold text-wine" : "text-ink"}`}
    >
      {label}
    </Link>
  );
  return (
    <div className="border-b border-line">
      <div className="container-x flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
        <Link href={base} className="text-xl font-semibold">
          {title}
        </Link>
        <nav className="-mx-1 flex gap-6 overflow-x-auto px-1 pb-1 md:pb-0" aria-label={title}>
          {item(all, base, !active)}
          {categories.map((c) => item(c, `${base}?categoria=${encodeURIComponent(c)}`, active === c))}
        </nav>
      </div>
    </div>
  );
}
