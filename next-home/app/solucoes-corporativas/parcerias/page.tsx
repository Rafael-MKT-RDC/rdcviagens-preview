import type { Metadata } from "next";
import { EmpresasParceriasClient } from "@/components/EmpresasParceriasClient";

export const metadata: Metadata = {
  title: "Parcerias Estratégicas | RDC Viagens",
  description: "Alianças estratégicas com bancos, empresas, entidades e plataformas. Gere novas receitas e diferencie sua oferta com viagens — sem complexidade operacional.",
  keywords: "parcerias estratégicas RDC, parceria viagens, white label viagens, receita recorrente, co-branding turismo, parceria banco empresa",
  alternates: { canonical: "/solucoes-corporativas/parcerias" },
};
const schema = { "@context": "https://schema.org", "@type": "Service", name: "RDC Parcerias", provider: { "@type": "Organization", name: "RDC Viagens" }, description: "Alianças estratégicas com bancos, empresas, entidades e plataformas.", serviceType: "Parcerias Estratégicas" };
export default function ParceriasPage() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><EmpresasParceriasClient /></>);
}
