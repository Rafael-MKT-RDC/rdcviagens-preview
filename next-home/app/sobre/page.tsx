import type { Metadata } from "next";
import { Target, Eye, Compass, Shield, Lightbulb, Search, HandHeart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { TimelineScroller } from "@/components/TimelineScroller";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "Sobre Nós | +35 Anos de Experiência em Viagens",
  description:
    "Há mais de 35 anos democratizando o acesso a viagens de qualidade no Brasil. Pioneira em assinatura de viagens, com mais de 1 milhão de diárias entregues.",
  keywords:
    "sobre RDC Viagens, história RDC Viagens, empresa de turismo Brasil, assinatura viagens pioneira, quem somos RDC, valores RDC",
  alternates: { canonical: "/sobre" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre a RDC Viagens",
  description: "Mais de 35 anos democratizando o acesso a viagens de qualidade no Brasil.",
  mainEntity: {
    "@type": "Organization",
    name: "RDC Viagens",
    foundingDate: "1991",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 400 },
    slogan: "Transformamos intenção em jornada",
  },
};

const values = [
  { icon: Shield, title: "Confiança", description: <>Construímos <strong className="text-[#2D2D2D]">relações de confiança</strong> com assinantes, parceiros e colaboradores, <strong className="text-[#2D2D2D]">honrando cada compromisso</strong> e garantindo <strong className="text-[#2D2D2D]">segurança</strong> em todas as etapas da jornada.</> },
  { icon: Lightbulb, title: "Inovação", description: <>Inovamos continuamente para <strong className="text-[#2D2D2D]">simplificar e elevar a experiência de viagem</strong>, trazendo <strong className="text-[#2D2D2D]">novas ideias, tecnologias</strong> e formas de trabalhar que tornam cada jornada mais acessível, prática e inesquecível.</> },
  { icon: Search, title: "Transparência", description: <>Agimos com <strong className="text-[#2D2D2D]">honestidade e clareza</strong>, compartilhando informações de <strong className="text-[#2D2D2D]">forma aberta</strong> para que assinantes, parceiros e colaboradores saibam exatamente o que esperar em cada etapa da jornada.</> },
  { icon: HandHeart, title: "Cuidar de Pessoas", description: <>Colocamos <strong className="text-[#2D2D2D]">pessoas no centro</strong> de tudo que fazemos, tratando cada <strong className="text-[#2D2D2D]">assinante, colaborador e parceiro</strong> com atenção, empatia e respeito — porque acreditamos que uma <strong className="text-[#2D2D2D]">viagem inesquecível</strong> começa no <strong className="text-[#2D2D2D]">cuidado genuíno</strong> com quem está ao nosso lado em cada etapa da jornada.</> },
];

export default function SobrePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#FF9100] text-white border-0">Sobre a RDC</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nossa História</h1>
            <p className="text-xl text-[#C7E5F3]">
              Há mais de <strong>35 anos transformando o sonho de viajar</strong> em realidade para milhares de famílias brasileiras.
            </p>
          </div>
        </div>
      </section>

      {/* Quem somos */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">Quem Somos</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-8">
                A pioneira em assinatura de viagens no Brasil
              </h2>
              <div className="space-y-5 text-[#555555] text-lg leading-relaxed">
                <p>Fundada em 1991, a <strong className="text-[#2D2D2D]">RDC Viagens</strong> nasceu com uma ideia simples e transformadora: tornar viagens de qualidade acessíveis para todos os brasileiros. Fomos a primeira empresa do país a criar o conceito de <strong className="text-[#2D2D2D]">assinatura de viagens</strong>, permitindo que famílias planejem suas férias com economia, previsibilidade e acesso a hospedagem nos melhores hotéis e resorts.</p>
                <p>Ao longo de mais de três décadas, construímos uma trajetória marcada por <strong>inovação, parcerias estratégicas</strong> e um <strong>compromisso genuíno</strong> com a satisfação dos nossos assinantes. Da primeira Assinatura de Viagens RDC em 1993 ao marco de mais de 100 mil assinantes em 2022, cada etapa da nossa história reflete a busca constante por oferecer experiências que vão além da hospedagem.</p>
                <p>Hoje, a RDC Viagens é muito mais do que uma empresa de turismo. Somos um <strong>ecossistema completo de soluções de viagem</strong> que atende tanto famílias quanto empresas, com uma agência dedicada, um clube de vantagens exclusivo, programas de premiação corporativa e uma rede de mais de 2 mil hotéis parceiros em mais de 400 cidades.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 md:mt-12">
                <div className="text-center p-3 md:p-4 rounded-2xl bg-[#F6F6F6]"><span className="text-2xl md:text-3xl font-bold text-[#001A9E] block">+35</span><span className="text-xs md:text-sm text-[#555555]">Anos de história</span></div>
                <div className="text-center p-3 md:p-4 rounded-2xl bg-[#FFF8EB]"><span className="text-2xl md:text-3xl font-bold text-[#E68200] block">+100 mil</span><span className="text-xs md:text-sm text-[#555555]">Assinantes</span></div>
                <div className="text-center p-3 md:p-4 rounded-2xl bg-[#F6F6F6]"><span className="text-2xl md:text-3xl font-bold text-[#001A9E] block">+2 mil</span><span className="text-xs md:text-sm text-[#555555]">Hotéis parceiros</span></div>
                <div className="text-center p-3 md:p-4 rounded-2xl bg-[#FFF8EB]"><span className="text-2xl md:text-3xl font-bold text-[#E68200] block">+400</span><span className="text-xs md:text-sm text-[#555555]">Cidades atendidas</span></div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F6F6F6] to-white overflow-hidden">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">Linha do Tempo</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">Fatos Marcantes</h2>
              <p className="text-[#555555] mt-3 max-w-2xl mx-auto">Mais de três décadas de <strong>conquistas, inovação e compromisso</strong> com o viajante brasileiro.</p>
            </div>
            <TimelineScroller />
          </div>
        </AnimateOnScroll>
      </section>

      {/* Propósito */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070] text-white">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-[#FF9100]/20 flex items-center justify-center mx-auto mb-6"><Compass className="w-10 h-10 text-[#FF9100]" /></div>
              <Badge className="mb-4 bg-[#FF9100]/20 text-[#FFB040] border-0">Nosso Propósito</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">Realizar o sonho de cada viajante</h2>
              <p className="text-xl text-[#C7E5F3] leading-relaxed">Realizar o sonho de cada viajante, proporcionando <strong>experiências inesquecíveis</strong> com <strong>conforto, planejamento e economia</strong>.</p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-5"><Target className="w-7 h-7 text-[#001A9E]" /></div>
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">Missão</h3>
                  <p className="text-[#555555] leading-relaxed">Transformar o sonho de viajar em realidade para todos, oferecendo <strong>soluções acessíveis, confortáveis e bem planejadas</strong>, com opções práticas e econômicas para assinantes, empresas e parceiros, criando <strong>experiências inesquecíveis</strong> em cada viagem.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-[#FFF0D6] flex items-center justify-center mb-5"><Eye className="w-7 h-7 text-[#E68200]" /></div>
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">Visão</h3>
                  <p className="text-[#555555] leading-relaxed">Ser a <strong>marca líder em soluções de viagem</strong> acessíveis e transformadoras, alcançando até 2030 <strong>R$ 1 bilhão em faturamento, 1 milhão de assinantes e 1 milhão de diárias vendidas</strong>, gerando um impacto positivo e duradouro na vida das pessoas.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#FFF0D6] text-[#E68200] border-0">O que nos guia</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">Nossos Valores</h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {values.map((value, index) => {
                  const colors = [
                    { bg: "bg-[#E8F4FA]", icon: "text-[#001A9E]", border: "border-t-[#001A9E]" },
                    { bg: "bg-[#FFF0D6]", icon: "text-[#E68200]", border: "border-t-[#FF9100]" },
                    { bg: "bg-[#E8F4FA]", icon: "text-[#001A9E]", border: "border-t-[#00B4D8]" },
                    { bg: "bg-[#FFF0D6]", icon: "text-[#E68200]", border: "border-t-[#FF9100]" },
                  ];
                  const c = colors[index];
                  const Icon = value.icon;
                  return (
                    <Card key={index} className={`border-0 border-t-4 ${c.border} shadow-md hover:shadow-xl transition-all bg-white group`}>
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><Icon className={`w-7 h-7 ${c.icon}`} /></div>
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-3">{value.title}</h3>
                        <p className="text-[#555555] text-sm leading-relaxed">{value.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <TrustBadges />
    </>
  );
}
