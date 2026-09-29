import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Desarrollo de software a medida y diseño UX/UI en Lima, Perú.",
    start_url: "/es",
    display: "standalone",
    background_color: "#f5f4f0",
    theme_color: "#7b1e2e",
    lang: "es-PE",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
