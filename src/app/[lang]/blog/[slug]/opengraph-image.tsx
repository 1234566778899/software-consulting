import { hasLocale } from "@/i18n";
import { getPost } from "@/content/blog";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "C&J Software Consulting — Blog";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = hasLocale(raw) ? raw : "es";
  const post = getPost(slug);
  if (!post) return renderOg({ eyebrow: "Blog", title: "C&J Software Consulting" });
  return renderOg({ eyebrow: post.category[lang], title: post.title[lang], cover: post.cover });
}
