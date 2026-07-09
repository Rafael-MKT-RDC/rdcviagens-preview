import type { MetadataRoute } from "next";

const BASE = "https://rdcviagens.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Rotas utilitárias/privadas não precisam ser indexadas.
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
