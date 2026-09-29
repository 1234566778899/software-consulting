import { getDictionary, hasLocale } from "@/i18n";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "C&J Software Consulting";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "es");
  return renderOg({ eyebrow: t.hero.eyebrow, title: t.hero.title.map((s) => s.t).join("") });
}
