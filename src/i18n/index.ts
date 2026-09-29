import es from "./es";
import en from "./en";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

const dictionaries = { es, en };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** "/#id" → "/es#id", "/blog" → "/es/blog". */
export const localHref = (lang: Locale, href: string) =>
  href.startsWith("/#") ? `/${lang}${href.slice(1)}` : `/${lang}${href === "/" ? "" : href}`;

export const getDictionary = (locale: Locale) => dictionaries[locale];
