import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getHomePage } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Assinatura de Viagens com até 60% de Economia",
  description:
    "Assinatura de viagens com até 60% de economia em mais de 200 mil hotéis e resorts no Brasil e no mundo. 7 diárias por ano e tarifa exclusiva ilimitada. Conheça!",
  keywords: [
    "assinatura de viagens", "RDC Viagens", "clube de viagens", "hospedagem com desconto",
    "hotéis 4 e 5 estrelas", "viagens planejadas", "economia em viagens", "turismo Brasil",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Assinatura de Viagens com até 60% de Economia | RDC Viagens",
    description: "Assinatura de viagens com até 60% de economia em +200 mil hotéis e resorts no Brasil e no mundo.",
    url: "/", type: "website", locale: "pt_BR", siteName: "RDC Viagens",
  },
};

export const revalidate = 30;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RDC Viagens",
  url: "https://rdcviagens.com.br",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://rdcviagens.com.br/busca?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default async function Page() {
  const cms = await getHomePage(); // SSR: conteúdo vem do Sanity (fallback se vazio)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <HomeClient cms={cms} />
    </>
  );
}
