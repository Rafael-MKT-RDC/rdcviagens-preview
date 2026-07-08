import type { Metadata } from "next";
import { ClubeVantagensClient } from "@/components/ClubeVantagensClient";

export const metadata: Metadata = {
  title: "Clube de Vantagens | Descontos Exclusivos",
  description:
    "Descontos de até 50% em restaurantes, entretenimento, saúde, educação e beleza em todo o Brasil. Benefício exclusivo para assinantes RDC. Aproveite agora!",
  keywords: "clube vantagens RDC, descontos exclusivos, benefícios assinantes, economia dia a dia, descontos restaurantes, RDC vantagens",
  alternates: { canonical: "/clube-vantagens" },
};

export default function ClubeVantagensPage() {
  return <ClubeVantagensClient />;
}
