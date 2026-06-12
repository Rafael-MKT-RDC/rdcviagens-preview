import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  /** Schema.org article author (para páginas de blog/conteúdo) */
  author?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  noindex = false,
  author,
}: SEOProps) {
  useEffect(() => {
    // Título: garante sufixo "| RDC Viagens"
    document.title = title.includes("RDC Viagens") ? title : `${title} | RDC Viagens`;

    // Helper: cria ou atualiza meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Meta básico
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    if (author) setMeta("name", "author", author);

    // Open Graph
    setMeta("property", "og:site_name", "RDC Viagens");
    setMeta("property", "og:locale", "pt_BR");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    if (canonical) setMeta("property", "og:url", canonical);
    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("property", "og:image:width", "1200");
      setMeta("property", "og:image:height", "630");
    }

    // Twitter Card
    setMeta("name", "twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("name", "twitter:site", "@rdcviagens");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (ogImage) setMeta("name", "twitter:image", ogImage);

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, keywords, canonical, ogType, ogImage, noindex, author]);

  return null;
}
