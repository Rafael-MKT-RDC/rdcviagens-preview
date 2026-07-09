import type { Metadata } from "next";
import { AgenciaClient } from "@/components/AgenciaClient";
import { getPageDoc } from "@/lib/cms";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Agência de Viagens | Pacotes Exclusivos",
  description:
    "Pacotes de viagens completos com aéreo, hotel, traslados e passeios. Condições especiais para assinantes RDC com consultores dedicados. Solicite sua cotação!",
  keywords:
    "agência viagens RDC, pacotes viagem completos, viagens com desconto, aéreo hotel, pacotes turísticos, consultores viagem",
  alternates: { canonical: "/agencia" },
};

export default async function AgenciaPage() {
  const cms = await getPageDoc<any>("paginaAgencia");
  return <AgenciaClient cms={cms} />;
}
