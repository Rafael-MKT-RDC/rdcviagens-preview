import type { Metadata } from "next";
import { ViajeTranquiloClient } from "@/components/ViajeTranquiloClient";

export const metadata: Metadata = {
  title: "Viaje Tranquilo | Suporte 24h e Atendimento",
  description:
    "Prioridade no atendimento, suporte 24h, early check-in e late check-out por apenas R$ 29,90/mês. Serviço exclusivo para assinantes RDC. Contrate agora!",
  keywords: "viaje tranquilo RDC, atendimento VIP viagem, suporte 24h viagem, early check-in, late check-out, prioridade atendimento",
  alternates: { canonical: "/viaje-tranquilo" },
};

export default function ViajeTranquiloPage() {
  return <ViajeTranquiloClient />;
}
