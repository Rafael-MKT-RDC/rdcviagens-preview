"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { B2BLeadForm } from "@/components/B2BLeadForm";
import { RD_FORMS } from "@/lib/rdstation";
import { B2BFaq } from "@/components/B2BFaq";
import { Plane, Check, ArrowLeft, ArrowRight, BarChart3, Shield, Clock, Wallet, Settings, Headphones as HeadphonesIcon, Users, Building2, TrendingDown, Zap, Target, Briefcase } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80";
const painPoints = [
  { icon: TrendingDown, title: "Gastos fora de controle?", description: "Sem visibilidade dos custos de viagem, cada deslocamento vira uma surpresa no orçamento. Sua empresa perde dinheiro sem perceber." },
  { icon: Clock, title: "Processo lento e burocrático?", description: "Cotações por e-mail, aprovações manuais e reservas descentralizadas consomem horas preciosas da sua equipe." },
  { icon: Shield, title: "Sem política de viagens?", description: "Colaboradores reservando por conta própria, sem padrão e sem conformidade com políticas. Cada viagem é um risco para o orçamento." },
  { icon: Users, title: "Equipe sobrecarregada?", description: "Secretárias, RH e gestores gastando tempo demais organizando viagens em vez de focar no que realmente importa." },
];
const benefits = [
  { icon: Wallet, value: "Até 30%", label: "de economia", description: "Reduza custos com tarifas negociadas e controle de gastos." },
  { icon: Zap, value: "80%", label: "mais rápido", description: "Processo de reserva simplificado e aprovações automáticas." },
  { icon: BarChart3, value: "100%", label: "de visibilidade", description: "Visibilidade completa sobre todos os gastos com viagens da empresa." },
  { icon: HeadphonesIcon, value: "24/7", label: "de suporte", description: "Equipe dedicada disponível para emergências e alterações." },
];
const solutions = [
  { title: "Plataforma de Reservas Simplificada", description: "Seus colaboradores fazem reservas em minutos, dentro da política da empresa, com aprovações automáticas.", items: ["Reservas de voos, hotéis e carros em um só lugar", "Self-booking intuitivo para colaboradores", "Aprovações automáticas conforme sua política", "Tarifas negociadas com economia real"] },
  { title: "Controle Total de Gastos", description: "Saiba exatamente quanto sua empresa gasta com viagens. Sem surpresas, sem estouros de orçamento.", items: ["Orçamento por departamento ou centro de custo", "Alertas automáticos de limites", "Relatórios gerenciais para tomada de decisão"] },
  { title: "Suporte Dedicado para PMEs", description: "Atendimento humanizado e consultivo, pensado para empresas que precisam de agilidade sem burocracia.", items: ["Consultor dedicado para sua empresa", "Suporte emergencial para alterações", "Atendimento ágil via WhatsApp", "Integração completa e treinamento da equipe"] },
];
const forWho = [
  { icon: Target, title: "Gestores e Diretores", description: "Tenha visibilidade total dos gastos com viagens e tome decisões estratégicas baseadas em dados." },
  { icon: Users, title: "RH e Departamento Pessoal", description: "Simplifique a logística de viagens de colaboradores, treinamentos e eventos corporativos." },
  { icon: Briefcase, title: "Marketing e Comercial", description: "Agilize viagens para eventos, feiras e reuniões com clientes sem burocracia." },
  { icon: Building2, title: "Secretárias e Serviços Gerais", description: "Centralize todas as reservas em uma plataforma intuitiva e economize horas de trabalho." },
];
const faqs = [
  { question: "A RDC Gestão de Viagens é indicada para pequenas empresas?", answer: "Sim! Nossa solução foi pensada para empresas de todos os portes, com planos flexíveis que se adaptam à realidade de PMEs. Não importa se sua empresa faz 5 ou 500 viagens por mês, temos uma solução que se adapta à sua empresa." },
  { question: "Preciso de um volume mínimo de viagens para contratar?", answer: "Não existe volume mínimo. Atendemos desde empresas que fazem viagens esporádicas até aquelas com grande volume mensal. O importante é que cada viagem seja bem gerenciada e econômica." },
  { question: "Como funciona a economia nas viagens?", answer: "Negociamos tarifas corporativas exclusivas com companhias aéreas, redes hoteleiras e locadoras. Além disso, o controle de gastos e a política de viagens integrada evitam desperdícios e reservas fora do padrão." },
];
const cargoOptions = ["Diretor / Nível Executivo", "Gerente", "Coordenador", "Analista", "Secretária Executiva", "Outro"];
const volumeOptions = ["Até 5 viagens/mês", "6 a 15 viagens/mês", "16 a 30 viagens/mês", "Mais de 30 viagens/mês"];

export function EmpresasGestaoClient({ cms = {} }: { cms?: any }) {
  const scrollForm = () => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="RDC Gestão de Viagens" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/80 to-[#082B41]/60" />
        </div>
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas"><Button variant="ghost" className="text-white hover:bg-white/10 mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para Soluções Corporativas</Button></Link>
          <div className="max-w-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/b2b/logo-gestao-cor.svg" alt="RDC Gestão de Viagens" className="h-14 md:h-18 w-auto mb-6 drop-shadow-lg" />
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E07F00] text-[#082B41] border-0"><Plane className="w-4 h-4 mr-2" />{cms.heroBadge ?? "Gestão Corporativa"}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{cms.heroTitulo ?? "Sua empresa viaja."} <span className="text-[#FF9100]">{cms.heroDestaque ?? "Nós cuidamos de tudo."}</span></h1>
            <p className="text-xl text-[#DCE6EF] mb-4">Gestão completa de viagens corporativas para <strong className="text-white">pequenas e médias empresas</strong>. <strong>Centralize reservas, controle gastos</strong> e economize até 30% — <strong>sem burocracia</strong>, sem complicação.</p>
            <p className="text-lg text-[#C7D3E0] mb-8">Mais de <strong>35 anos de experiência</strong> ajudando empresas como a sua a <strong>viajar melhor e gastar menos</strong>.</p>
            <div className="flex flex-wrap gap-4"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-[#082B41] px-8 rounded-full" onClick={scrollForm}>Solicitar proposta gratuita<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Sua empresa se identifica?</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Desafios que conhecemos bem</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Se sua empresa enfrenta algum desses problemas, a <strong>RDC Gestão de Viagens</strong> é a solução que você precisa.</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {painPoints.map((point, index) => { const Icon = point.icon; return (<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"><CardContent className="pt-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div><h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{point.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{point.description}</p></CardContent></Card>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Benefits numbers */}
      <section className="py-16 bg-[#082B41]">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {benefits.map((benefit, index) => { const Icon = benefit.icon; return (<div key={index} className="text-center"><div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3"><Icon className="w-7 h-7 text-[#FF9100]" /></div><div className="text-3xl md:text-4xl font-bold text-white mb-1">{benefit.value}</div><div className="text-[#FF9100] font-medium mb-1">{benefit.label}</div><div className="text-[#C7D3E0] text-sm">{benefit.description}</div></div>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Settings className="w-4 h-4 mr-2" />Como resolvemos</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Tudo que sua empresa precisa em um só lugar</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Uma solução pensada para o dia a dia de PMEs que precisam de <strong>agilidade, economia e controle</strong>.</p></div>
            <div className="grid lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow"><CardContent className="p-8"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9100] to-[#E07F00] text-white flex items-center justify-center font-bold mb-4">{index + 1}</div><h3 className="text-xl font-bold text-[#2D2D2D] mb-3">{solution.title}</h3><p className="text-[#555555] mb-6">{solution.description}</p><ul className="space-y-3">{solution.items.map((item, i) => (<li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#404040] text-sm">{item}</span></li>))}</ul></CardContent></Card>))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* For who */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Users className="w-4 h-4 mr-2" />Para quem é</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Feito para quem toma decisões</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Se você é responsável por <strong>organizar, aprovar ou gerenciar viagens</strong> na sua empresa, essa solução é para você.</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {forWho.map((item, index) => { const Icon = item.icon; return (<Card key={index} className="border-0 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1"><CardContent className="pt-8 pb-6"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mx-auto mb-4"><Icon className="w-8 h-8 text-white" /></div><h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{item.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{item.description}</p></CardContent></Card>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Form */}
      <section id="formulario" className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41] text-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12"><h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Vamos conversar sobre a sua empresa?</h2><p className="text-lg text-[#C7D3E0]">Preencha o formulário e nossos especialistas em gestão de viagens entrarão em contato para apresentar uma proposta sob medida.</p></div>
              <Card className="border-0 shadow-2xl"><CardContent className="p-8 md:p-10"><B2BLeadForm rdFormId={RD_FORMS.gestao} cargoOptions={cargoOptions} objetivoLabel="Volume de viagens por mês" objetivoOptions={volumeOptions} colaboradoresLabel="Número de funcionários" submitLabel="Solicitar proposta gratuita" /></CardContent></Card>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12"><Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">Perguntas Frequentes</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Perguntas sobre a Gestão de Viagens</h2></div>
            <B2BFaq items={faqs} />
            <div className="text-center mt-8"><p className="text-[#555555] mb-4">Não encontrou sua dúvida?</p><Link href="/duvidas"><Button variant="outline" className="border-[#FF9100] text-[#FF9100] hover:bg-[#F6F6F6] rounded-full">Ver todas as dúvidas</Button></Link></div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl font-bold text-[#2D2D2D] mb-4">Pronto para transformar a gestão de viagens da sua empresa?</h2>
              <p className="text-lg text-[#555555] mb-8">Fale com nossos especialistas e descubra como economizar nas viagens da sua empresa.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-[#082B41] px-8 rounded-full" onClick={scrollForm}>Solicitar proposta gratuita<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
