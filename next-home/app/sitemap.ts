import type { MetadataRoute } from "next";

// Domínio canônico (mesmo do metadataBase em layout.tsx).
const BASE = "https://rdcviagens.com.br";

// Rotas estáticas do site. Prioridade/frequência aproximadas para orientar crawlers.
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/assinaturas", priority: 0.9, changeFrequency: "weekly" },
  { path: "/agencia", priority: 0.8, changeFrequency: "monthly" },
  { path: "/destinos", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sobre", priority: 0.6, changeFrequency: "yearly" },
  { path: "/programa-indicacao", priority: 0.6, changeFrequency: "monthly" },
  { path: "/clube-vantagens", priority: 0.6, changeFrequency: "monthly" },
  { path: "/viaje-tranquilo", priority: 0.6, changeFrequency: "monthly" },
  { path: "/seja-parceiro", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/duvidas", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contato", priority: 0.5, changeFrequency: "yearly" },
  { path: "/documentos", priority: 0.4, changeFrequency: "yearly" },
  { path: "/trabalhe-conosco", priority: 0.5, changeFrequency: "monthly" },
  { path: "/solucoes-corporativas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solucoes-corporativas/premiacao", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solucoes-corporativas/gestao", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solucoes-corporativas/parcerias", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solucoes-corporativas/travel-cloud", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
