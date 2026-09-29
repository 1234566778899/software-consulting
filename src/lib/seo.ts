import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n";
import { site } from "@/content/site";
import { team } from "@/content/team";

export const absoluteUrl = (path = "") => `${site.url}${path}`;

/** Canonical + hreflang for a path without the locale prefix ("" for home, "/blog", "/blog/slug"). */
export function localeAlternates(lang: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l === "es" ? "es-PE" : "en", `/${l}${path}`])),
      "x-default": `/es${path}`,
    },
  };
}

export const ogLocale = (lang: Locale) => (lang === "es" ? "es_PE" : "en_US");

/** Next merges metadata shallowly: every page spreads these so nothing from the layout is lost. */
export const ogBase = (lang: Locale) => ({
  siteName: site.name,
  locale: ogLocale(lang),
  alternateLocale: [ogLocale(lang === "es" ? "en" : "es")],
});
export const twitterBase = { card: "summary_large_image" as const };

/** Stable @id references so the graph nodes link to each other across pages. */
export const ids = {
  organization: absoluteUrl("/#organization"),
  website: absoluteUrl("/#website"),
};

export function organizationJsonLd() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ids.organization,
    name: site.name,
    alternateName: "C&J",
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.png"), width: 1317, height: 453 },
    image: absoluteUrl("/brand/logo.png"),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [{ "@type": "Country", name: "Perú" }, { "@type": "Place", name: "Latinoamérica" }],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phone,
      email: site.email,
      availableLanguage: ["Spanish", "English"],
    },
    founder: team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role.es,
      image: absoluteUrl(m.photo),
      sameAs: [m.linkedin],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Peruana de Ciencias Aplicadas", alternateName: "UPC" },
    })),
    ...(site.linkedin || site.instagram ? { sameAs: [site.linkedin, site.instagram].filter(Boolean) } : {}),
  };
}

/** Renders JSON-LD safely (escapes "<" as recommended by the Next.js guide). */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}
