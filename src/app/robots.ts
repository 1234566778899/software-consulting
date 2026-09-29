import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Only the production domain should be indexed; previews and localhost are blocked.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : Boolean(process.env.NEXT_PUBLIC_SITE_URL);
  return {
    rules: isProduction ? { userAgent: "*", allow: "/", disallow: ["/api/"] } : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
