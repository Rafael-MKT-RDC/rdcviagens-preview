import type { Metadata } from "next";
import { EmpresasGestaoClient } from "@/components/EmpresasGestaoClient";

export const metadata: Metadata = {
  title: "Gestão de Viagens Corporativas para PMEs",
  description: "Gestão completa de viagens corporativas para pequenas e médias empresas. Economize até 30%, centralize reservas e controle gastos. Solicite uma demonstração!",
  keywords: "gestão viagens corporativas, travel management PME, viagens empresariais, controle gastos viagem, reservas corporativas, RDC gestão",
  alternates: { canonical: "/solucoes-corporativas/gestao" },
};
const schema = { "@context": "https://schema.org", "@type": "Service", name: "RDC Gestão de Viagens", provider: { "@type": "Organization", name: "RDC Viagens" }, description: "Gestão completa de viagens corporativas para pequenas e médias empresas com economia de até 30%.", serviceType: "Gestão de Viagens Corporativas" };
export default function GestaoPage() {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><EmpresasGestaoClient /></>);
}
