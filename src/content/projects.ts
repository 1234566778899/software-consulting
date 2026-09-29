import type { Locale } from "@/i18n";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  category: Localized;
  poster: string;
  video: string;
  url?: string;
};

// PLACEHOLDER: reemplazar con los proyectos reales. Cada proyecto necesita un
// póster 16:9 (.jpg ~1600×900) y un video .mp4 que se abre al hacer clic.
// El orden define el mosaico: fila 1 = [angosto, ancho, angosto], fila 2 = [medio, medio].
export const projects: Project[] = [
  {
    slug: "habitat",
    name: "Hábitat",
    category: { es: "Plataforma web · UX/UI", en: "Web platform · UX/UI" },
    poster: "/projects/realestate.jpg",
    video: "/projects/realestate.mp4",
  },
  {
    slug: "orbita",
    name: "Órbita",
    category: { es: "SaaS · Dashboard", en: "SaaS · Dashboard" },
    poster: "/projects/dashboard.jpg",
    video: "/projects/dashboard.mp4",
  },
  {
    slug: "sazon",
    name: "Sazón",
    category: { es: "App móvil · Delivery", en: "Mobile app · Delivery" },
    poster: "/projects/delivery.jpg",
    video: "/projects/delivery.mp4",
  },
  {
    slug: "capital",
    name: "Capital",
    category: { es: "App móvil · Fintech", en: "Mobile app · Fintech" },
    poster: "/projects/fintech.jpg",
    video: "/projects/fintech.mp4",
  },
  {
    slug: "atlas",
    name: "Atlas IA",
    category: { es: "Inteligencia artificial", en: "Artificial intelligence" },
    poster: "/projects/assistant.jpg",
    video: "/projects/assistant.mp4",
  },
];

// Video de la sección "Mira cómo se siente".
export const showcase = {
  poster: "/projects/dashboard.jpg",
  video: "/projects/dashboard.mp4",
  url: undefined as string | undefined,
};
