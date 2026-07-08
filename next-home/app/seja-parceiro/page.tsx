import type { Metadata } from "next";
import { SejaParceiroClient } from "@/components/SejaParceiroClient";

export const metadata: Metadata = {
  title: "Seja Parceiro Hoteleiro | Cadastre seu Hotel",
  description: "Cadastre seu hotel ou pousada na RDC Viagens e alcance mais de 200 mil assinantes ativos. Aumente sua ocupação com 35 anos de experiência. Seja parceiro!",
  keywords: "parceiro hoteleiro RDC, cadastrar hotel, parceria hoteleira, aumentar ocupação hotel, RDC Viagens parceiro, rede hoteleira",
  alternates: { canonical: "/seja-parceiro" },
};
export default function SejaParceiroPage() {
  return <SejaParceiroClient />;
}
