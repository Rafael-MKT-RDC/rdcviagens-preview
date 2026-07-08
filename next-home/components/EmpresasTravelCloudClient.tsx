"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { B2BLeadForm } from "@/components/B2BLeadForm";
import { Cloud, ArrowLeft, ArrowRight, Globe, Shield, Zap, Users, Building2, Layers, Puzzle, Headphones as HeadphonesIcon, BarChart3, Wallet, Target, CreditCard, Award, Heart, TrendingUp, Settings, ChevronDown } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80";
const useCases = [
  { icon: Heart, title: "Benefícios e RH", description: <>Viagens como benefício de <strong>alto valor percebido</strong> para colaboradores, associado a descanso, reconhecimento e <strong>marca empregadora</strong>.</>, audience: "Plataformas de benefícios, HRtechs, multicontas" },
  { icon: CreditCard, title: "Fintechs e Cartões", description: <>Nova categoria de <strong>relacionamento, ativação e monetização</strong> da base de clientes com experiência <strong>white label integrada</strong>.</>, audience: "Fintechs, bancos, cartões corporativos" },
  { icon: Wallet, title: "Gestão de Despesas", description: <>Viagens a negócios <strong>integradas ao ecossistema</strong> de despesas, pagamento e <strong>governança corporativa</strong>.</>, audience: "Apps de despesas, plataformas empresariais" },
  { icon: Award, title: "Programas de Fidelidade", description: <>Aumente <strong>recorrência e valor percebido</strong> para membros ou clientes com uma jornada de turismo <strong>operada pela RDC</strong>.</>, audience: "Comunidades, clubes, marketplaces" },
];
const howItWorks = [
  { step: "01", title: "Distribuição", responsible: "Parceiro", description: <>Comunicação para empresas, colaboradores ou usuários; <strong>campanhas segmentadas</strong>; destaque no app; acompanhamento de <strong>adesão e engajamento</strong>.</>, icon: TrendingUp },
  { step: "02", title: "Conversão", responsible: "Parceiro + RDC", description: <>O usuário encontra o benefício no <strong>ambiente conhecido</strong>, consulta destinos, condições e serviços, escolhe a melhor opção e <strong>avança para reserva</strong>.</>, icon: Target },
  { step: "03", title: "Operação", responsible: "RDC", description: <>A <strong>complexidade turística fica invisível</strong> para o usuário: fornecedores, tarifas, reservas, vouchers, remarcações, conciliação e pós-viagem.</>, icon: Settings },
];
const differentials = [
  { icon: Layers, title: "Infraestrutura pronta", description: <>A RDC entrega a <strong>camada turística completa</strong> que o parceiro não precisa construir: inventário, operação, atendimento, vouchers, suporte e pós-venda.</> },
  { icon: Puzzle, title: "White label e protagonismo", description: <>A experiência vive dentro do <strong>ecossistema do parceiro</strong>, preservando sua <strong>marca e relacionamento</strong> com a base.</> },
  { icon: Globe, title: "Duas frentes de monetização", description: <>Atende tanto <strong>benefícios e lazer</strong> quanto <strong>viagens corporativas e despesas</strong>, com narrativas adaptáveis ao perfil do parceiro.</> },
  { icon: Zap, title: "Go-to-market mais rápido", description: <>Entrada por <strong>escopo controlado</strong>, reduzindo complexidade e criando base para <strong>evolução modular</strong>.</> },
  { icon: HeadphonesIcon, title: "Operação especializada", description: <>Mais de <strong>35 anos de experiência</strong> em turismo, com <strong>+200 mil hotéis</strong>, suporte dedicado e pós-venda completo.</> },
  { icon: Shield, title: "Responsabilidades claras", description: <>Modelo que separa <strong>distribuição (parceiro)</strong> e <strong>operação turística (RDC)</strong>, com governança e métricas definidas em contrato.</> },
];
const benefits = [
  { icon: Globe, value: "+200 mil", label: "Hotéis e resorts", description: "Inventário global disponível" },
  { icon: Users, value: "+35", label: "Anos de experiência", description: "Pioneira em turismo no Brasil" },
  { icon: Building2, value: "100%", label: "White label", description: "Marca do parceiro preservada" },
  { icon: BarChart3, value: "B2B + B2B2C", label: "Modelos flexíveis", description: "Adaptável à estratégia" },
];
const faqs: { question: string; answer: React.ReactNode }[] = [
  { question: "O que é a RDC Travel Cloud?", answer: <>É uma <strong>plataforma white label</strong> da RDC Viagens que permite que empresas, plataformas de benefícios, fintechs, cartões, marketplaces e ecossistemas digitais <strong>ofereçam viagens aos seus públicos</strong> sem precisar estruturar uma operação turística própria. O parceiro mantém a <strong>marca e o relacionamento</strong> com sua base, enquanto a RDC atua nos bastidores com tecnologia, inventário, suporte, reserva, voucher, remarcação e pós-venda.</> },
  { question: "Para quem é a RDC Travel Cloud?", answer: <>Para <strong>plataformas de benefícios e RH</strong>, fintechs, bancos, cartões corporativos, apps de despesas, marketplaces, comunidades e programas de fidelidade que desejam incorporar viagens aos seus <strong>próprios ambientes digitais</strong> como nova categoria de valor.</> },
  { question: "O parceiro precisa ter experiência em turismo?", answer: <><strong>Não.</strong> Justamente por isso a solução é white label e <strong>operada pela RDC</strong>. O parceiro distribui e se relaciona com sua base; a RDC cuida de <strong>toda a complexidade turística</strong>: fornecedores, tarifas, reservas, vouchers, remarcações, conciliação e pós-venda.</> },
  { question: "O que é o RDC Prime dentro da Travel Cloud?", answer: <>O RDC Prime é uma <strong>camada de valor B2B2C</strong> que pode ser incorporada à Travel Cloud. Funciona de forma similar ao <strong>TotalPass ou Wellhub</strong>: a empresa habilita o acesso ao benefício e o colaborador interessado adere para utilizar vantagens como <strong>tarifas exclusivas, suporte 24h</strong> e prioridade no atendimento.</> },
  { question: "Como funciona o modelo comercial?", answer: <>O modelo pode combinar <strong>licenciamento, comissão por reserva, campanhas, assinatura e revenue share</strong> conforme o perfil do parceiro. A recomendação é iniciar com escopo controlado para <strong>validar métricas</strong> e evoluir modularmente.</> },
  { question: "Quanto tempo leva para integrar?", answer: <>O prazo depende do escopo. A recomendação é iniciar com <strong>escopo controlado</strong>, com responsáveis bem definidos de cada lado, <strong>métricas de piloto</strong> e evolução modular conforme resultados.</> },
];
const cargoOptions = ["CEO / C-Level", "Diretor", "Head de Produto / Tecnologia", "Head de RH / Benefícios", "Head Financeiro / Despesas", "Comercial / Parcerias", "Outro"];
const segmentoOptions = ["Plataforma de Benefícios / RH", "Fintech / Banco / Cartão", "App de Despesas Corporativas", "Marketplace / Plataforma Digital", "Programa de Fidelidade", "Outro"];

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#E0E0E0] rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F8F8F8] transition-colors">
        <span className="font-semibold text-[#2D2D2D] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#FF9100] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-5 pb-5 text-[#555555] leading-relaxed border-t border-[#F0F0F0]"><div className="pt-4">{answer}</div></div>}
    </div>
  );
}

export function EmpresasTravelCloudClient() {
  const scrollForm = () => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="RDC Travel Cloud" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/85 to-[#082B41]/60" />
        </div>
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas"><Button variant="ghost" className="text-white hover:bg-white/10 mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para Soluções Corporativas</Button></Link>
          <div className="max-w-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/b2b/logo-travelcloud-cor.svg" alt="RDC Travel Cloud" className="h-14 md:h-18 w-auto mb-6 drop-shadow-lg" />
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E07F00] text-[#082B41] border-0"><Cloud className="w-4 h-4 mr-2" />Nova Solução Corporativa</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Viagens dentro do <span className="text-[#FF9100]">seu ecossistema.</span></h1>
            <p className="text-xl text-[#DCE6EF] mb-4">A <strong className="text-white">RDC Travel Cloud</strong> é uma plataforma <strong className="text-white">white label</strong> que permite que parceiros ofereçam viagens dentro de seus próprios ambientes digitais, com <strong className="text-white">operação turística especializada</strong> da RDC.</p>
            <p className="text-lg text-[#C7D3E0] mb-8">Lance uma <strong>vertical de viagens</strong> sem construir turismo do zero. O parceiro distribui; a RDC opera.</p>
            <div className="flex flex-wrap gap-4"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-[#082B41] px-8 rounded-full" onClick={scrollForm}>Agendar uma conversa<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        </div>
      </section>

      {/* Benefits bar */}
      <section className="py-12 bg-[#082B41] border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((b, index) => { const Icon = b.icon; return (<div key={index} className="text-center"><div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3"><Icon className="w-7 h-7 text-[#FF9100]" /></div><div className="text-2xl md:text-3xl font-bold text-white mb-1">{b.value}</div><div className="text-[#FF9100] font-medium mb-1 text-sm">{b.label}</div><div className="text-[#C7D3E0] text-xs">{b.description}</div></div>); })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Casos de uso</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Para quem é a RDC Travel Cloud?</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Uma infraestrutura de viagens para diferentes <strong>modelos de negócio B2B e B2B2C</strong>.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {useCases.map((u, index) => { const Icon = u.icon; return (<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"><CardContent className="pt-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div><h3 className="font-bold text-xl text-[#2D2D2D] mb-2">{u.title}</h3><p className="text-[#555555] text-sm leading-relaxed mb-3">{u.description}</p><p className="text-xs text-[#E07F00] font-medium">{u.audience}</p></CardContent></Card>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Como funciona</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Como funciona na prática</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Três movimentos simples: <strong>distribuição, conversão e operação</strong>. O parceiro não precisa dominar turismo para capturar valor na categoria.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howItWorks.map((s) => { const Icon = s.icon; return (<Card key={s.step} className="border-0 shadow-lg"><CardContent className="p-8"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9100] to-[#E07F00] text-white flex items-center justify-center font-bold text-lg">{s.step}</div><Icon className="w-6 h-6 text-[#E07F00]" /></div><h3 className="text-xl font-bold text-[#2D2D2D] mb-1">{s.title}</h3><p className="text-xs font-semibold text-[#E07F00] uppercase tracking-wider mb-3">{s.responsible}</p><p className="text-[#555555] text-sm leading-relaxed">{s.description}</p></CardContent></Card>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Differentials */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Diferenciais</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Por que a RDC Travel Cloud?</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Uma solução que combina <strong>experiência digital, operação turística e modelo de negócio adaptável</strong>.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {differentials.map((d, index) => { const Icon = d.icon; return (<Card key={index} className="border-0 shadow-lg bg-white"><CardContent className="pt-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div><h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{d.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{d.description}</p></CardContent></Card>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Form */}
      <section id="formulario" className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12"><Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0"><Cloud className="w-4 h-4 mr-2" />Vamos conversar</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Agende uma conversa para desenhar sua vertical de viagens</h2><p className="text-lg text-[#555555]">Preencha o formulário e nossa equipe entrará em contato para entender seu ecossistema e desenhar o modelo ideal.</p></div>
              <Card className="border border-[#E8E8E8] shadow-xl"><CardContent className="p-8"><B2BLeadForm cargoOptions={cargoOptions} objetivoLabel="Segmento" objetivoOptions={segmentoOptions} showColaboradores={false} submitLabel="Agendar conversa" /></CardContent></Card>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12"><Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">Perguntas Frequentes</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Perguntas sobre a RDC Travel Cloud</h2></div>
            <div className="max-w-3xl mx-auto space-y-3">{faqs.map((faq, index) => (<FaqItem key={index} question={faq.question} answer={faq.answer} />))}</div>
            <div className="text-center mt-8"><Link href="/contato"><Button variant="outline" className="border-[#FF9100] text-[#FF9100] hover:bg-white rounded-full">Falar com nossa equipe<ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
