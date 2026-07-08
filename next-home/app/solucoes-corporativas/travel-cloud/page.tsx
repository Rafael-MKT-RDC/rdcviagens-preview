import type { Metadata } from "next";
import { EmpresasTravelCloudClient } from "@/components/EmpresasTravelCloudClient";

export const metadata: Metadata = {
  title: "Travel Cloud | Plataforma White Label de Viagens",
  description: "Plataforma white label que permite oferecer viagens dentro do seu ecossistema digital, com operação turística completa da RDC. B2B e B2B2C. Agende uma conversa!",
  keywords: "travel cloud RDC, white label viagens, plataforma viagens API, viagens fintech, benefícios viagens, B2B2C turismo, infraestrutura de viagens",
  alternates: { canonical: "/solucoes-corporativas/travel-cloud" },
};
const schema = { "@context": "https://schema.org", "@type": "Service", name: "RDC Travel Cloud", provider: { "@type": "Organization", name: "RDC Viagens" }, description: "Plataforma white label de viagens para ecossistemas digitais (B2B e B2B2C).", serviceType: "Plataforma White Label de Viagens" };
export default function TravelCloudPage() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><EmpresasTravelCloudClient /></>);
}
