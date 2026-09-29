import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DM_Serif_Display, Outfit } from "next/font/google";
import { getDictionary, hasLocale, locales } from "@/i18n";
import { site } from "@/content/site";
import { ogLocale } from "@/lib/seo";
import { SmoothScroll } from "@/components/SmoothScroll";
import "../globals.css";

const sans = Outfit({ variable: "--font-sans", subsets: ["latin"] });
const serif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${t.meta.title} | ${site.name}`, template: `%s | ${site.name}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale(lang),
      alternateLocale: [ogLocale(lang === "es" ? "en" : "es")],
    },
    twitter: { card: "summary_large_image" },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export const viewport: Viewport = {
  themeColor: "#7b1e2e",
  colorScheme: "light",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans" suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
