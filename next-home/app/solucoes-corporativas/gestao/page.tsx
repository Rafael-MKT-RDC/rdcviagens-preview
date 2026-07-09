import type { Metadata } from "next";
import { EmpresasGestaoClient } from "@/components/EmpresasGestaoClient";
import { getPageDoc } from "@/lib/cms";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Gestão de Viagens Corporativas para PMEs",
  description: "Gestão completa de viagens corporativas para pequenas e médias empresas. Economize até 30%, centralize reservas e controle gastos. Solicite uma demonstração!",
  keywords: "gestão viagens corporativas, travel management PME, viagens empresariais, controle gastos viagem, reservas corporativas, RDC gestão",
  alternates: { canonical: "/solucoes-corporativas/gestao" },
};
const schema = { "@context": "https://schema.org", "@type": "Service", name: "RDC Gestão de Viagens", provider: { "@type": "Organization", name: "RDC Viagens" }, description: "Gestão completa de viagens corporativas para pequenas e médias empresas com economia de até 30%.", serviceType: "Gestão de Viagens Corporativas" };
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "A RDC Gestão de Viagens é indicada para pequenas empresas?", acceptedAnswer: { "@type": "Answer", text: "Sim. A solução foi pensada para empresas de todos os portes, com planos flexíveis que se adaptam à realidade de PMEs, seja para 5 ou 500 viagens por mês." } },
    { "@type": "Question", name: "Preciso de um volume mínimo de viagens para contratar?", acceptedAnswer: { "@type": "Answer", text: "Não existe volume mínimo. Atendemos desde empresas com viagens esporádicas até grandes volumes mensais; o importante é que cada viagem seja bem gerenciada e econômica." } },
    { "@type": "Question", name: "Como funciona a economia nas viagens?", acceptedAnswer: { "@type": "Answer", text: "Negociamos tarifas corporativas exclusivas com companhias aéreas, redes hoteleiras e locadoras. O controle de gastos e a política de viagens integrada evitam desperdícios e reservas fora do padrão." } },
  ],
};
export default async function GestaoPage() {
  const cms = await getPageDoc<any>("paginaGestao");
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><EmpresasGestaoClient cms={cms} /></>);
}
