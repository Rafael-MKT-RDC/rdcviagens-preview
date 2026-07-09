import type { Metadata } from "next";
import { ProgramaIndicacaoClient } from "@/components/ProgramaIndicacaoClient";
import { getPageDoc } from "@/lib/cms";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Programa Indique e Ganhe | Recompensas",
  description:
    "Indique amigos para a RDC Viagens e ganhe recompensas exclusivas a cada indicação confirmada. Quanto mais você indica, mais ganha. Comece a indicar agora!",
  keywords: "programa indicação RDC, indique e ganhe, recompensas viagens, indicar amigos, desconto assinatura viagens",
  alternates: { canonical: "/programa-indicacao" },
};

export default async function ProgramaIndicacaoPage() {
  const cms = await getPageDoc<any>("paginaIndicacao");
  return <ProgramaIndicacaoClient cms={cms} />;
}
