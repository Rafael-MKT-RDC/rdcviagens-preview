"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { B2BLeadForm } from "@/components/B2BLeadForm";
import { RD_FORMS } from "@/lib/rdstation";
import { B2BFaq } from "@/components/B2BFaq";
import { Plane, Check, ArrowLeft, ArrowRight, Heart, Users, TrendingUp, Award, Sparkles, Target, BarChart3, Percent, Zap, UserCheck, HandHeart } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&q=80";
const painPoints = [
  { icon: Users, title: "Engajamento em queda?", description: "Cada vez mais, empresas buscam novas formas de reconhecer e engajar — e viagens se destacam como uma das mais desejadas." },
  { icon: TrendingUp, title: "Dificuldade para criar campanhas?", description: "Campanhas de premiação tradicionais já não geram o mesmo engajamento. Viagens vêm se consolidando como uma opção versátil, que engaja, gera valor e cria experiências memoráveis." },
  { icon: Award, title: "Premiações diferenciadas?", description: "Viagens como ferramenta de incentivo para engajar públicos, incentivar resultados e fortalecer relacionamentos com colaboradores, clientes e parceiros." },
  { icon: Target, title: "Resultados mensuráveis?", description: "A sua empresa pode medir o impacto real das campanhas de incentivo com viagens — um business case sólido para áreas como RH, Marketing e Comercial." },
];
const benefits = [
  { icon: Heart, title: "Engajamento e Resultados", description: "Viagens criam vínculo emocional e geram impacto real nos indicadores da empresa. Uma ferramenta de incentivo que colaboradores, clientes e parceiros valorizam." },
  { icon: UserCheck, title: "Employer Branding", description: "Posicione sua empresa como referência. Viagens como incentivo diferenciam sua marca no mercado e fortalecem relacionamentos." },
  { icon: Zap, title: "Produtividade e Bem-estar", description: "Premiados que viajam retornam mais motivados, criativos e produtivos. Investir em experiências é investir em performance." },
  { icon: HandHeart, title: "Versatilidade", description: "Ideal para campanhas de incentivo, premiação por metas, reconhecimento e qualquer iniciativa que busque engajar públicos e impulsionar resultados." },
];
const features = [
  { title: "1. A empresa adquire créditos", description: "A empresa adquire créditos junto à RDC, ou seja, o valor que deseja distribuir. Sem mensalidade, sem taxa de adesão.", items: ["Sem custos fixos", "Valor flexível conforme a campanha", "Distribuição em lote ou individual", "Implementação simples e sem burocracia"] },
  { title: "2. Defina os premiados", description: "A empresa define os beneficiários dos créditos, em lote ou individualmente. Controle e gestão simples, com relatórios.", items: ["Área exclusiva para gestão dos pontos", "Distribuição com total autonomia", "Relatórios de acompanhamento", "Gestão centralizada e simplificada"] },
  { title: "3. Premiados viajam", description: "Os premiados recebem os créditos em pontos e acesso à plataforma de Turismo RDC, com autonomia para realizar reservas.", items: ["Acesso a mais de 200 mil hotéis no Brasil e no exterior", "Opções de hotéis para todos os estilos de viagem", "Flexibilidade para viajar quando, como e com quem quiser", "Apoio ao premiado em todas as etapas da viagem"] },
];
const marketStats = [
  { icon: Percent, value: "112%", label: "de ROI", description: "Programas de viagem de incentivo bem estruturados produzem retorno de 112% sobre o investimento.", source: "Incentive Research Foundation", url: "https://theirf.org/" },
  { icon: TrendingUp, value: "+18%", label: "produtividade", description: "Aumento médio na produtividade em empresas com programas de viagem como incentivo.", source: "Incentive Research Foundation", url: "https://theirf.org/" },
  { icon: BarChart3, value: "3x", label: "mais impacto", description: "Viagens como incentivo geram 3x mais impacto motivacional do que premiações tradicionais em dinheiro.", source: "Aberdeen Research", url: "https://www.aberdeen.com/" },
  { icon: Heart, value: "96%", label: "motivação", description: "Dos colaboradores premiados com viagens se sentiram motivados pela oportunidade oferecida.", source: "SITE Research", url: "https://siteglobal.com/research/" },
];
const faqs = [
  { question: "Como funciona o RDC Premiação?", answer: "O RDC Premiação funciona por créditos: sua empresa adquire o valor que deseja distribuir, define os beneficiários (em lote ou individualmente), e os premiados recebem os créditos em pontos com acesso à plataforma de Turismo RDC. A empresa tem uma área exclusiva para gestão dos pontos e distribuição com total autonomia." },
  { question: "Qual o investimento para implementar?", answer: "O RDC Premiação não tem custos fixos — sem mensalidade e sem taxa de adesão. A empresa adquire créditos conforme o valor que deseja distribuir nas campanhas ou ações. Solicite uma proposta para receber valores detalhados de acordo com a sua necessidade." },
  { question: "Para quais áreas da empresa o programa é indicado?", answer: "O RDC Premiação é uma solução versátil indicada para diversas áreas: RH (retenção e reconhecimento), Marketing (campanhas de engajamento), Comercial (incentivo a vendas e parceiros) e Facilities. Qualquer área que busque engajar públicos e impulsionar resultados pode utilizar." },
  { question: "Como os premiados utilizam os créditos?", answer: "Os premiados acessam a plataforma de Turismo RDC onde podem pesquisar e reservar hospedagem em mais de 200 mil hotéis no Brasil e no exterior, com opções para todos os estilos de viagem. Têm flexibilidade para viajar quando, como e com quem quiserem, com apoio em todas as etapas." },
  { question: "A empresa tem controle sobre a distribuição dos créditos?", answer: "Sim! A empresa tem acesso a uma área exclusiva para gestão dos pontos e distribuição com total autonomia. O controle é simples, com relatórios de acompanhamento para monitorar as campanhas e ações de incentivo." },
  { question: "Quer transformar a forma de conceder incentivos?", answer: "Converse com nossa equipe de consultoria corporativa. Vamos entender o cenário da sua empresa e apresentar uma proposta personalizada para suas campanhas de incentivo com viagens — uma solução que engaja, gera valor e cria experiências memoráveis." },
];
const cargoOptions = ["CHRO / VP de RH", "Diretor(a) de RH", "Gerente de RH", "Coordenador(a) de RH", "Analista de RH", "Business Partner", "Gestor(a) de Benefícios", "CEO / Diretor Geral", "Outro"];
const objetivoOptions = ["Benefício para colaboradores", "Campanha de incentivo / premiação", "Retenção de talentos", "Employer branding", "Premiação por metas", "Reconhecimento de tempo de casa", "Outro"];

export function EmpresasPremiacaoClient({ cms = {} }: { cms?: any }) {
  const scrollForm = () => document.getElementById("formulario-premiacao")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="RDC Premiação" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/80 to-[#082B41]/60" />
        </div>
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas"><Button variant="ghost" className="text-white hover:bg-white/10 mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para Soluções Corporativas</Button></Link>
          <div className="max-w-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/b2b/logo-premiacao-cor.svg" alt="RDC Premiação" className="h-14 md:h-18 w-auto mb-6 drop-shadow-lg" />
            <Badge className="mb-4 bg-[#FF9100] text-[#2D2D2D] border-0"><Plane className="w-4 h-4 mr-2" />{cms.heroBadge ?? "Incentivo Corporativo"}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{cms.heroTitulo ?? "Viagens que transformam"} <span className="text-[#FF9100]">{cms.heroDestaque ?? "resultados"}</span></h1>
            <p className="text-xl text-[#F6F6F6] mb-4">Uma solução estratégica para áreas como <strong className="text-white">RH, Marketing e Comercial</strong> que buscam engajar públicos e impulsionar resultados com colaboradores, clientes e parceiros.</p>
            <p className="text-lg text-[#F6F6F6] mb-8">Viagens como <strong>ferramenta de incentivo</strong> — engaje, gere valor e crie experiências memoráveis.</p>
            <div className="flex flex-wrap gap-4"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-[#2D2D2D] px-8 rounded-full" onClick={scrollForm}>Solicitar proposta<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Desafios Corporativos</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Sua empresa enfrenta esses desafios?</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Se a resposta for sim para algum desses pontos, o <strong>RDC Premiação</strong> é a solução que faltava para engajar públicos, incentivar resultados e fortalecer relacionamentos.</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {painPoints.map((point, index) => { const Icon = point.icon; return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"><CardContent className="pt-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div><h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{point.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{point.description}</p></CardContent></Card>
              ); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Market stats */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="text-center mb-14"><Badge className="mb-4 bg-[#FF9100]/20 text-[#FF9100] border-0"><BarChart3 className="w-4 h-4 mr-2" />Dados de Mercado</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Números que comprovam: viagens são o melhor incentivo</h2><p className="text-lg text-[#F6F6F6] max-w-2xl mx-auto">Pesquisas internacionais mostram que <strong>viagens como premiação</strong> geram resultados superiores a qualquer outro tipo de recompensa — dados essenciais para o business case de áreas como RH, Marketing e Comercial.</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {marketStats.map((stat, index) => { const Icon = stat.icon; return (
                <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"><CardContent className="pt-6 text-center"><div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4"><Icon className="w-7 h-7 text-[#FF9100]" /></div><div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div><div className="text-[#FF9100] font-medium mb-3">{stat.label}</div><p className="text-[#F6F6F6] text-sm leading-relaxed mb-3">{stat.description}</p><a href={stat.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF9100]/70 italic hover:text-[#FF9100] transition-colors underline underline-offset-2">Fonte: {stat.source}</a></CardContent></Card>
              ); })}
            </div>
            <div className="mt-10 text-center"><p className="text-[#FF9100] text-sm max-w-3xl mx-auto">Colaboradores premiados com viagens relatam <strong className="text-white">maior senso de valorização</strong> e <strong className="text-white">aumento no sentimento de lealdade à empresa</strong> — indicadores que impactam diretamente o NPS e os indicadores que sua empresa acompanha.</p></div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Sparkles className="w-4 h-4 mr-2" />Impacto para sua empresa</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Resultados que a sua empresa pode medir</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">O RDC Premiação gera impacto nos <strong>KPIs que mais importam</strong> para as frentes de incentivo da sua empresa.</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {benefits.map((benefit, index) => { const Icon = benefit.icon; return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow"><CardContent className="pt-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div><h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{benefit.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{benefit.description}</p></CardContent></Card>
              ); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Target className="w-4 h-4 mr-2" />Como funciona</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Implementação simples e sem custos fixos</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Uma solução completa que proporciona <strong>autonomia na gestão, com máxima simplicidade operacional</strong></p></div>
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg"><CardContent className="p-8"><div className="w-10 h-10 rounded-full bg-[#FF9100] text-[#2D2D2D] flex items-center justify-center font-bold mb-4">{index + 1}</div><h3 className="text-xl font-bold text-[#2D2D2D] mb-3">{feature.title}</h3><p className="text-[#555555] mb-6">{feature.description}</p><ul className="space-y-3">{feature.items.map((item, i) => (<li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#404040] text-sm">{item}</span></li>))}</ul></CardContent></Card>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Form */}
      <section id="formulario-premiacao" className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Plane className="w-4 h-4 mr-2" />Solicite uma proposta</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Leve o RDC Premiação para sua empresa</h2><p className="text-lg text-[#C7D3E0]">Preencha o formulário e nossa <strong>equipe de consultoria corporativa</strong> entrará em contato para apresentar uma proposta personalizada para sua empresa.</p></div>
              <Card className="border-0 shadow-xl"><CardContent className="p-8"><B2BLeadForm rdFormId={RD_FORMS.premiacao} cargoOptions={cargoOptions} objetivoOptions={objetivoOptions} submitLabel="Solicitar proposta gratuita" /></CardContent></Card>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12"><Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">Perguntas Frequentes</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Dúvidas frequentes</h2><p className="text-lg text-[#555555] max-w-2xl mx-auto">Respostas para as <strong>principais perguntas sobre o programa</strong> de incentivo com viagens</p></div>
            <B2BFaq items={faqs} />
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41] text-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Plane className="w-16 h-16 text-[#FF9100] mx-auto mb-6" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Pronto para transformar a forma de conceder incentivos?</h2>
              <p className="text-lg text-[#F6F6F6] mb-8">Converse com nossa equipe de consultoria corporativa e descubra como o <strong>RDC Premiação</strong> pode engajar públicos e impulsionar resultados na sua empresa.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-[#2D2D2D] px-8" onClick={scrollForm}>Solicitar proposta<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
