import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { posts } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

const languages = (path: string) => ({
  languages: {
    ...Object.fromEntries(locales.map((l) => [l === "es" ? "es-PE" : "en", absoluteUrl(`/${l}${path}`)])),
    "x-default": absoluteUrl(`/es${path}`),
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.map((p) => p.date).sort().at(-1);
  const pages: { path: string; lastModified?: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacidad", priority: 0.3, changeFrequency: "monthly" },
    { path: "/libro-de-reclamaciones", priority: 0.3, changeFrequency: "monthly" },
    { path: "/blog", lastModified: latestPost, priority: 0.8, changeFrequency: "weekly" },
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: p.date, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  return pages.flatMap(({ path, lastModified, priority, changeFrequency }) =>
    locales.map((lang) => ({
      url: absoluteUrl(`/${lang}${path}`),
      lastModified: lastModified ? new Date(`${lastModified}T12:00:00-05:00`) : new Date(),
      changeFrequency,
      priority: lang === "es" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: languages(path),
    })),
  );
}
