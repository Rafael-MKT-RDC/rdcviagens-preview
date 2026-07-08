import type { Metadata } from "next";
import { DestinosClient } from "@/components/DestinosClient";

export const metadata: Metadata = {
  title: "Destinos | +200 Mil Hotéis e Resorts",
  description:
    "Explore mais de 200 mil hotéis e resorts no Brasil e no mundo: Nordeste, Europa, Caribe e muito mais. Redes Accor, Marriott e Hilton. Descubra os destinos!",
  keywords:
    "destinos RDC Viagens, hotéis Brasil, resorts nordeste, viagens internacionais, Accor, Marriott, Hilton, hotéis 4 estrelas, hotéis 5 estrelas",
  alternates: { canonical: "/destinos" },
};

export default function DestinosPage() {
  return <DestinosClient />;
}
