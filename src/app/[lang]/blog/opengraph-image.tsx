import { getDictionary, hasLocale } from "@/i18n";
import { posts } from "@/content/blog";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Blog C&J";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "es");
  return renderOg({ eyebrow: t.blog.title, title: t.meta.blogTitle, cover: posts[0].cover });
}
