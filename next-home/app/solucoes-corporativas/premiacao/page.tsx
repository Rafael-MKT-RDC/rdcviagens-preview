import type { Metadata } from "next";
import { EmpresasPremiacaoClient } from "@/components/EmpresasPremiacaoClient";
import { getPageDoc } from "@/lib/cms";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Premiação | Incentivo com Viagens",
  description: "Viagens como ferramenta de incentivo corporativo para engajar colaboradores, clientes e parceiros. Solução completa para RH e Marketing. Conheça os benefícios!",
  keywords: "premiação corporativa viagens, incentivo colaboradores, campanha incentivo, engajamento corporativo, RDC premiação, viagens como prêmio, incentivo vendas",
  alternates: { canonical: "/solucoes-corporativas/premiacao" },
};
const schema = { "@context": "https://schema.org", "@type": "Service", name: "RDC Premiação", provider: { "@type": "Organization", name: "RDC Viagens" }, description: "Viagens como ferramenta de incentivo corporativo para engajar públicos e impulsionar resultados.", serviceType: "Premiação e Incentivo Corporativo" };
export default async function PremiacaoPage() {
  const cms = await getPageDoc<any>("paginaPremiacao");
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><EmpresasPremiacaoClient cms={cms} /></>);
}
