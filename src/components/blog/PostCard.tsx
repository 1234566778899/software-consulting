import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { Post } from "@/content/blog";

type Labels = { by: string; min: string };

export function PostCard({ post, lang, labels }: { post: Post; lang: Locale; labels: Labels }) {
  return (
    <article className="group">
      <Link href={`/${lang}/blog/${post.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-line">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <p className="mt-5 flex items-center gap-2 text-xs font-semibold">
          {post.category[lang]}
          <span className="size-1.5 rounded-full bg-wine" aria-hidden />
          <span className="font-normal text-ink-soft">
            {post.minutes} {labels.min}
          </span>
        </p>
        <h3 className="mt-2 text-lg leading-snug font-semibold transition-colors duration-300 group-hover:text-wine">
          {post.title[lang]}
        </h3>
        <p className="mt-4 text-xs text-ink-soft">
          {labels.by} <span className="font-semibold text-ink">{post.author}</span>
        </p>
      </Link>
    </article>
  );
}
