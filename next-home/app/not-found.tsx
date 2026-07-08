import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Página Não Encontrada",
  description:
    "A página que você procura não foi encontrada. Navegue pelo site da RDC Viagens para descobrir planos de assinatura, destinos e soluções corporativas de viagens.",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-20">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FEE2E2] rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-[#EF4444]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Página não encontrada</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">A página que você procura não existe ou foi movida.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/"><Button className="bg-[#0020B8] hover:bg-[#001A9E] text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg"><Home className="w-4 h-4 mr-2" />Voltar ao início</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
