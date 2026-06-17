import { Link } from "wouter";
import type { ReactNode } from "react";

/**
 * Link de CTA editável pelo CMS.
 * - Caminhos internos (ex.: "/assinaturas") usam o roteador do site (wouter).
 * - URLs externas (começando com http) abrem em nova aba com segurança.
 * - Âncoras na mesma página (ex.: "#formulario") rolam suavemente até a seção.
 */
export function CtaLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const url = (href ?? "").trim();
  const isExternal = /^(https?:)?\/\//.test(url) || /^(mailto:|tel:|wa\.me)/.test(url);

  if (isExternal) {
    const finalUrl = url.startsWith("wa.me") ? `https://${url}` : url;
    return (
      <a href={finalUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (url.startsWith("#")) {
    return (
      <a
        href={url}
        className={className}
        onClick={(e) => {
          const el = document.getElementById(url.slice(1));
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={url || "/"} className={className}>
      {children}
    </Link>
  );
}
