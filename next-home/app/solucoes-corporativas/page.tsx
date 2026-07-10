import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Handshake, Check, ArrowRight, Building2, Shield, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { getPageDoc } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Soluções Corporativas | Premiação e Gestão",
  description:
    "Soluções corporativas de viagens para empresas: premiação e incentivo, gestão de viagens para PMEs e parcerias estratégicas. Descubra como podemos ajudar!",
  keywords:
    "soluções corporativas viagens, viagens corporativas, premiação colaboradores, incentivo viagens, gestão viagens empresas, parcerias estratégicas turismo",
  alternates: { canonical: "/solucoes-corporativas" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Soluções Corporativas RDC Viagens",
  provider: { "@type": "Organization", name: "RDC Viagens" },
  description: "Soluções corporativas de viagens: premiação e incentivo, gestão de viagens para PMEs e parcerias estratégicas.",
  serviceType: ["Premiação Corporativa", "Gestão de Viagens", "Parcerias Estratégicas"],
};

const heroImg = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80";

const solutions = [
  { id: "travelcloud", logo: "/logos/b2b/travel_cloude_logo_branco.svg", title: "RDC Travel Cloud", subtitle: "Viagens dentro do seu ecossistema.", description: "Plataforma white label que permite que parceiros ofereçam viagens dentro de seus próprios ambientes digitais, com toda a operação turística especializada da RDC nos bastidores.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", href: "/solucoes-corporativas/travel-cloud", audience: "Para Fintechs, Plataformas de Benefícios, Apps de Despesas e Marketplaces", cta: "Vamos construir juntos?", features: ["White label: marca do parceiro preservada", "Operação turística completa pela RDC", "+200 mil hotéis e resorts disponíveis", "Modelos B2B e B2B2C flexíveis"] },
  { id: "gestao", logo: "/logos/b2b/gestao_de_viagens_logo_branco.svg", title: "RDC Viagens Corporativas", subtitle: "Sua empresa viaja. Nós cuidamos de tudo.", description: "Plataforma completa de reservas e produtos turísticos para viagens corporativas. Centralize reservas, controle gastos e economize — sem burocracia, sem complicação.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", href: "/solucoes-corporativas/gestao", audience: "Para Gestores, Marketing, Comercial e Facilities", cta: "Conheça a gestão inteligente", features: ["Reservas de voos, hotéis e carros em um só lugar", "Controle de gastos em tempo real", "Plataforma de reservas e produtos turísticos", "Relatórios gerenciais para tomada de decisão"] },
  { id: "premiacao", logo: "/logos/b2b/premiacao_logo_branco.svg", title: "RDC Premiação", subtitle: "Viagens que transformam resultados e valorizam reconhecimento.", description: "Uma solução estratégica para áreas como RH, Marketing e Comercial que buscam engajar públicos e impulsionar resultados com colaboradores, clientes e parceiros.", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80", href: "/solucoes-corporativas/premiacao", audience: "Para Diretores, Gestores de RH, Comercial, Marketing e Facilities", cta: "Descubra como premiar", features: ["Viagens como ferramenta de incentivo corporativo", "Impacto direto em engajamento e resultados", "Potencial de ROI baseado em dados de mercado", "Operação completa por conta da RDC"] },
  { id: "parcerias", logo: "/logos/b2b/parcerias_logo_branco.svg", title: "RDC Parcerias", subtitle: "Novas frentes de crescimento para o seu negócio.", description: "Alianças estratégicas com bancos, empresas, entidades e plataformas que buscam se diferenciar, gerar novas receitas e ampliar sua proposta de valor.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", href: "/solucoes-corporativas/parcerias", audience: "Para Bancos, Empresas, Entidades e Plataformas", cta: "Vamos construir juntos?", features: ["Modelos flexíveis de parceria e remuneração", "Integração via API, white-label ou co-branding", "Zero complexidade operacional para o parceiro", "Suporte dedicado de marketing e vendas"] },
];

const differentials = [
  { icon: Clock, title: "+35 anos de experiência", description: "Mais de três décadas conectando pessoas a destinos pelo mundo, com a solidez de quem entende o mercado de viagens." },
  { icon: Globe, title: "Alcance global", description: "Rede ampla de hotéis, voos e experiências no Brasil e no mundo, com tarifas negociadas e condições exclusivas." },
  { icon: Building2, title: "Soluções sob medida", description: "Cada empresa tem uma realidade diferente. Desenhamos modelos que se adaptam ao seu porte, segmento e objetivos." },
  { icon: Shield, title: "Operação completa", description: "Da reserva ao pós-venda, cuidamos de toda a operação. Sua empresa foca no que faz de melhor." },
];

export default async function SolucoesCorporativasPage() {
  const c = await getPageDoc<Record<string, string>>("paginaEmpresas");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="Soluções Corporativas RDC Viagens" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/80 to-[#082B41]/50" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E07F00] text-white border-0">{c.heroBadge ?? "Soluções Corporativas"}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{c.heroTitulo ?? "Viagens a serviço do"} <span className="text-[#FF9100]">{c.heroDestaque ?? "seu negócio"}</span></h1>
            <p className="text-xl text-[#DCE6EF] mb-8"><strong>Viagens corporativas</strong>, <strong>programas de incentivo</strong> e a <strong>unidade de parcerias estratégicas</strong> que impulsiona novos negócios e potencializa resultados para a sua empresa.</p>
            <div className="flex flex-wrap gap-4">
              <a href={c.heroCtaLink ?? "#solucoes"}><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-white px-8 rounded-full">{c.heroCta ?? "Conhecer soluções"}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solucoes" className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Soluções para cada necessidade da sua empresa</h2>
              <p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Cada uma voltada para atender diferentes necessidades da sua empresa: <strong>eficiência, engajar pessoas e gerar oportunidades de negócio</strong>. Escolha a solução ideal para o momento da sua empresa.</p>
            </div>
            <div className="space-y-20">
              {solutions.map((solution, index) => (
                <div key={solution.id} id={solution.id} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={solution.logo} alt={solution.title} className="h-12 md:h-16 w-auto mb-4" />
                    {/* Nome oculto visualmente (o logo já é o wordmark); mantido para SEO/acessibilidade. */}
                    <h3 className="sr-only">{solution.title}</h3>
                    <p className="text-[#FF9100] font-medium mb-2">{solution.subtitle}</p>
                    <p className="text-sm text-[#9FB2C2] mb-4">{solution.audience}</p>
                    <p className="text-[#C7D3E0] mb-6 leading-relaxed">{solution.description}</p>
                    <ul className="space-y-3 mb-8">
                      {solution.features.map((feature, i) => (<li key={i} className="flex items-center gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0" /><span className="text-[#DCE6EF]">{feature}</span></li>))}
                    </ul>
                    <Link href={solution.href}><Button className="bg-[#FF9100] hover:bg-[#E07F00] text-white">{solution.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={solution.image} alt={solution.title} className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#082B41]/60 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Differentials */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Por que a RDC Viagens</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">A experiência de quem está no mercado há <strong>mais de três décadas</strong>, com a <strong>agilidade</strong> de quem entende as necessidades de hoje</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {differentials.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F6F6F6] flex items-center justify-center mb-3 md:mb-4"><Icon className="w-5 h-5 md:w-6 md:h-6 text-[#E07F00]" /></div>
                      <h3 className="font-semibold text-sm md:text-lg text-[#2D2D2D] mb-1 md:mb-2">{item.title}</h3>
                      <p className="text-[#555555] text-sm leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#082B41] text-white">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">{c.ctaTitulo ?? "Não sabe qual solução é a ideal?"}</h2>
              <p className="text-lg text-[#C7D3E0] mb-8">Fale com nossa equipe. Vamos entender o cenário da sua empresa e indicar o caminho que faz <strong>mais sentido para os seus objetivos</strong>.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contato"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-white px-8">{c.ctaBotao ?? "Falar com a equipe"}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
