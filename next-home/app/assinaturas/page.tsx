import type { Metadata } from "next";
import { AssinaturasClient } from "@/components/AssinaturasClient";

export const metadata: Metadata = {
  title: "Assinatura de Viagens | 7 Diárias por Ano",
  description:
    "Plano de 7 diárias por ano em hotéis e resorts 4 e 5 estrelas com até 60% de economia. Tarifa exclusiva ilimitada e agência de viagens dedicada. Assine agora!",
  keywords:
    "assinatura de viagens, plano de viagens mensal, clube de hospedagem, diárias hotel com desconto, RDC assinaturas, férias planejadas, economia em hotéis, viagens com desconto",
  alternates: { canonical: "/assinaturas" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Assinatura RDC Viagens - 7 Diárias",
  description: "Plano de assinatura com 7 diárias por ano em hotéis e resorts de 4 e 5 estrelas, tarifa exclusiva ilimitada com até 60% de desconto, agência dedicada e Portal do Assinante.",
  brand: { "@type": "Brand", name: "RDC Viagens" },
  offers: { "@type": "Offer", price: "319.90", priceCurrency: "BRL", priceValidUntil: "2026-12-31", availability: "https://schema.org/InStock" },
};

export default function AssinaturasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <AssinaturasClient />
    </>
  );
}
