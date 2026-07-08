import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Globe, ArrowRight, Headset } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Contato | Fale Conosco | Atendimento 0800",
  description:
    "Fale com a RDC Viagens pelo chat, WhatsApp ou televendas gratuito 0800-055-2600. Atendimento de segunda a sexta, das 9h às 19h. Tire suas dúvidas agora!",
  keywords: "contato RDC Viagens, telefone RDC, WhatsApp RDC, atendimento viagens, fale conosco, televendas 0800",
  alternates: { canonical: "/contato" },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contato RDC Viagens",
  description: "Canais de atendimento da RDC Viagens: chat, WhatsApp e televendas 0800-055-2600.",
};

export default function ContatoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#FF9100] text-white border-0">Contato</Badge>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Fale <span className="text-[#FF9100]">conosco</span></h1>
            <p className="text-base md:text-lg text-[#C7E5F3]">Estamos prontos para ajudar você a planejar sua <strong>próxima viagem inesquecível</strong>.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Canais de Atendimento</h2>
                <p className="text-base md:text-lg text-[#555555]">Escolha o canal mais conveniente para falar com a <strong>nossa equipe</strong>.</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#555555] mb-8 md:mb-10">
                <Clock className="w-5 h-5 text-[#FF9100] flex-shrink-0" /><span className="text-base font-medium">Segunda a sexta-feira, das 9h às 19h</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-12">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-[#E8F4FA] rounded-full flex items-center justify-center mx-auto mb-5"><Globe className="w-8 h-8 text-[#001A9E]" /></div>
                    <h3 className="font-bold text-xl text-[#2D2D2D] mb-4">Chat</h3>
                    <a href="https://rdcviagens.com.br" target="_blank" rel="noopener noreferrer"><Button className="bg-[#001A9E] hover:bg-[#001070] w-full">Acessar o chat</Button></a>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-[#D4F5E9] rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg className="w-9 h-9 text-[#06D6A0]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <h3 className="font-bold text-xl text-[#2D2D2D] mb-2">WhatsApp</h3>
                    <p className="text-2xl font-bold text-[#06D6A0] mb-4">11 4003-4910</p>
                    <a href="https://api.whatsapp.com/send?phone=551140034910" target="_blank" rel="noopener noreferrer"><Button className="bg-[#059E78] hover:bg-green-700 w-full">Enviar mensagem</Button></a>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow ring-2 ring-[#FFCC80]">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-16 h-16 bg-[#00148A] rounded-full flex items-center justify-center mx-auto mb-5"><Headset className="w-8 h-8 text-[#FF9100]" /></div>
                    <h3 className="font-bold text-xl text-[#2D2D2D] mb-2">Televendas</h3>
                    <a href="tel:08000552600" className="block"><p className="text-2xl font-bold text-[#001A9E] mb-1">0800-055-2600</p></a>
                    <p className="text-xs text-[#06D6A0] font-semibold mb-4">Ligação gratuita</p>
                    <a href="tel:08000552600"><Button className="bg-[#FF9100] hover:bg-[#E68200] w-full">Ligar agora</Button></a>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-[#F6F6F6] rounded-2xl p-6 md:p-8 text-center">
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">Tem alguma dúvida?</h3>
                <p className="text-[#555555] mb-6">Consulte nossa <strong>Central de Ajuda</strong> com as perguntas mais frequentes sobre a RDC Viagens.</p>
                <Link href="/duvidas"><Button variant="outline" className="border-[#001A9E] text-[#001A9E] hover:bg-[#F6F6F6]">Ver perguntas frequentes <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
