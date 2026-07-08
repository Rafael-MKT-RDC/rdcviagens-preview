import type { Metadata } from "next";
import { ProgramaIndicacaoClient } from "@/components/ProgramaIndicacaoClient";

export const metadata: Metadata = {
  title: "Programa Indique e Ganhe | Recompensas",
  description:
    "Indique amigos para a RDC Viagens e ganhe recompensas exclusivas a cada indicação confirmada. Quanto mais você indica, mais ganha. Comece a indicar agora!",
  keywords: "programa indicação RDC, indique e ganhe, recompensas viagens, indicar amigos, desconto assinatura viagens",
  alternates: { canonical: "/programa-indicacao" },
};

export default function ProgramaIndicacaoPage() {
  return <ProgramaIndicacaoClient />;
}
