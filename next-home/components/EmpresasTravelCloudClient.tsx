"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { RDStationForm } from "@/components/RDStationForm";
import { RD_FORMS } from "@/lib/rdstation";
import {
  Cloud, Check, ArrowLeft, ArrowRight, Globe, Shield, Zap, Users, Building2,
  Layers, Puzzle, Headphones as HeadphonesIcon, BarChart3, Wallet, Target,
  Smartphone, Award, Heart, TrendingUp, Settings, ChevronDown, CreditCard, Mail,
} from "lucide-react";

const PHONE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/travelcloud-phone-right-tilt-djSCuMu5Cgmgc3Krv2XNK3.webp";
const SKY_IMG = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&q=80";

const useCases = [
  { icon: CreditCard, title: "Fintechs e Cartões", description: <>Crie a <strong>categoria de viagem</strong> dentro do seu app. Nova fonte de <strong>relacionamento, ativação e monetização</strong> para sua base, com ou sem experiência white label.</>, audience: "Fintechs, bancos, cartões corporativos" },
  { icon: Wallet, title: "Gestão de Viagens Corporativas", description: <>Viagens a trabalho <strong>integradas ao ecossistema de despesas</strong>, com pagamento por cartão corporativo, regras de política e governança. Tudo em um único fornecedor.</>, audience: "Apps de despesas, plataformas empresariais" },
  { icon: Heart, title: "Plataformas de Benefícios e RH", description: <>Habilite viagens como benefício no seu ecossistema. O colaborador acessa direto no app que já usa, sem cadastro novo, sem fricção. <strong>Mais tempo de tela e mais engajamento.</strong></>, audience: "Plataformas de benefícios, HRtechs, multicontas" },
  { icon: Award, title: "Programas de Fidelidade e Comunidades", description: <>Aumente <strong>recorrência e valor percebido</strong> para membros ou clientes com uma jornada de turismo operada pela RDC. O usuário reserva sem sair do seu ecossistema.</>, audience: "Comunidades, clubes, marketplaces" },
];

const howItWorks = [
  { step: "01", title: "Habilitação", responsible: "Parceiro", description: <>O parceiro <strong>disponibiliza o acesso</strong> à base, define o público elegível, aprova a comunicação e decide se quer white label ou direcionamento simples.</>, icon: TrendingUp },
  { step: "02", title: "Distribuição e Conversão", responsible: "Parceiro + RDC", description: <>O usuário encontra a jornada de viagens no <strong>ambiente que já conhece</strong>, consulta destinos e condições e avança para reserva. Tudo dentro do ecossistema do parceiro.</>, icon: Target },
  { step: "03", title: "Operação Turística", responsible: "RDC", description: <>A <strong>complexidade turística fica invisível</strong>: inventário, tarifas, reservas, vouchers, remarcações, atendimento, conciliação e pós-venda. Tudo operado pela RDC.</>, icon: Settings },
];

const differentials = [
  { icon: Layers, title: "Infraestrutura turística completa", description: <>A RDC entrega a <strong>camada turística pronta</strong>: inventário, operação, atendimento, vouchers, remarcações, conciliação e pós-venda. O parceiro não precisa construir nada.</> },
  { icon: Puzzle, title: "White label ou direcionamento", description: <>O parceiro escolhe: experiência <strong>totalmente com sua marca</strong> (white label) ou direcionamento simples para a plataforma. Em ambos os casos, a RDC opera nos bastidores.</> },
  { icon: Globe, title: "Fornecedor único de viagens", description: <>O parceiro não precisa administrar múltiplos fornecedores. A RDC concentra <strong>inventário, operação e atendimento</strong> em um único ponto de contato. Menos complexidade, mais resultado.</> },
  { icon: Zap, title: "Go-to-market por escopo controlado", description: <>Entrada simplificada, com <strong>métricas de piloto</strong> e evolução modular. Sem necessidade de investir em tecnologia turística ou equipe especializada.</> },
  { icon: HeadphonesIcon, title: "Mais tempo de tela e receita", description: <>Com viagens integradas, o usuário <strong>passa mais tempo no app do parceiro</strong>. Isso gera mais engajamento e abre oportunidade de <strong>cross-sell</strong> com outros produtos e serviços.</> },
  { icon: Shield, title: "Governança e responsabilidades claras", description: <>Modelo que separa <strong>distribuição (parceiro)</strong> e <strong>operação turística (RDC)</strong>, com contratos, SLAs, LGPD e métricas definidas entre as partes.</> },
];

const benefits = [
  { icon: Globe, value: "+200 mil", label: "Hotéis e resorts", description: "Inventário global disponível" },
  { icon: Users, value: "+35", label: "Anos de operação", description: "Pioneira em turismo no Brasil" },
  { icon: Building2, value: "2", label: "Jornadas distintas", description: "Corporativa + Lazer/Benefício" },
  { icon: BarChart3, value: "3", label: "Modelos de integração", description: "Embed, White Label e Enterprise" },
];

const faqs: { question: string; answer: React.ReactNode }[] = [
  { question: "O que é a RDC Travel Cloud?", answer: <>É a <strong>infraestrutura de viagens</strong> da RDC Viagens que permite que parceiros ofereçam viagens com conveniência dentro de seus próprios ecossistemas digitais, sem construir operação turística. O usuário reserva sem sair do app. A RDC opera tudo nos bastidores: inventário, tarifas, reservas, atendimento e pós-venda.</> },
  { question: "Para quem é a RDC Travel Cloud?", answer: <>Para <strong>parceiros com app ou plataforma própria</strong> (fintechs, HRtechs, superapps de benefícios, bancos, cartões, marketplaces) que querem criar a <strong>categoria de viagem</strong> no seu ecossistema, sem precisar administrar múltiplos fornecedores. Também atende empresas que buscam gerir viagem corporativa ou oferecer viagem como benefício.</> },
  { question: "O parceiro precisa ter experiência em turismo?", answer: <><strong>Não.</strong> A solução é <strong>operada integralmente pela RDC</strong>. O parceiro distribui, comunica e se relaciona com sua base. A RDC cuida de toda a complexidade turística: inventário, tarifas, reservas, vouchers, remarcações, atendimento, conciliação e pós-venda.</> },
  { question: "Precisa ser white label?", answer: <><strong>Não necessariamente.</strong> A experiência pode ser white label (marca do parceiro como protagonista, RDC opera nos bastidores) ou um direcionamento mais simples (link, landing page ou cobranding). O parceiro escolhe o modelo que faz mais sentido para o seu negócio.</> },
  { question: "Como funciona o modelo comercial?", answer: <>O modelo possui duas frentes: o <strong>acesso à plataforma</strong> (receita da RDC pela disponibilização da solução, tecnologia e operação) e a <strong>monetização do parceiro</strong>, que pode acontecer por comissão sobre reservas realizadas e, na jornada de lazer, pela contratação do RDC Prime. Os percentuais variam conforme tipo de produto turístico e acordo comercial.</> },
  { question: "Quais são os modelos de integração disponíveis?", answer: <>Três modelos: <strong>Embed</strong> (link, landing page ou SSO, entrada simplificada), <strong>White Label</strong> (experiência completa com a marca do parceiro, recomendado) e <strong>Enterprise</strong> (integração profunda via Web API, com SLAs, segurança avançada, relatórios e governança de dados para grandes ecossistemas).</> },
  { question: "Qual a diferença entre a Travel Cloud e o RDC Prime?", answer: <>São produtos diferentes e complementares. A <strong>RDC Travel Cloud</strong> é a infraestrutura de distribuição e operação que permite ao parceiro oferecer viagens com conveniência no seu ecossistema. Já o <strong>RDC Prime</strong> é um produto específico de benefício de viagem de lazer para o colaborador e sua família, no modelo de assinatura. O Prime pode ser distribuído via Travel Cloud, mas é um produto separado com identidade própria.</> },
  { question: "O que significa conveniência na prática?", answer: <>Conveniência significa que o usuário <strong>reserva viagens sem sair do app que já usa</strong>. Sem cadastro novo, sem redirecionamento, sem fricção. Além disso, o parceiro não precisa gerenciar outro fornecedor: a RDC concentra tudo. O usuário fica mais tempo no app, o que gera mais engajamento e oportunidade de receita com outros produtos e serviços.</> },
];

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

export function EmpresasTravelCloudClient({ cms = {} }: { cms?: any }) {
  const scrollForm = () => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SKY_IMG} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/85 to-[#082B41]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082B41]/90 via-transparent to-[#082B41]/30" />
          <div className="absolute top-24 right-24 w-96 h-96 rounded-full bg-[#FF9100] opacity-10 blur-3xl" />
        </div>
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas"><Button variant="ghost" className="text-white hover:bg-white/10 mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para Soluções Corporativas</Button></Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/b2b/travel_cloude_logo_branco.svg" alt="RDC Travel Cloud" className="h-12 w-auto mb-6" />
              <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E07F00] text-[#082B41] border-0"><Cloud className="w-4 h-4 mr-2" />{cms.heroBadge ?? "RDC Travel Cloud"}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{cms.heroTitulo ?? "Crie mais conveniência."} <span className="text-[#FF9100]">{cms.heroDestaque ?? "Adicione a categoria de viagem no seu app."}</span></h1>
              <p className="text-xl text-[#C7D3E0] mb-4">{cms.heroSub1 ?? (<>Seu usuário reserva viagens <strong className="text-white">sem sair do app que já usa</strong>. Sem cadastro novo, sem outro fornecedor. A RDC opera toda a complexidade turística nos bastidores.</>)}</p>
              <p className="text-lg text-[#C7D3E0] mb-8">{cms.heroSub2 ?? (<>Um único fornecedor. Mais tempo de tela. <strong>Nova fonte de receita para o seu negócio.</strong></>)}</p>
              <div className="flex flex-wrap gap-4"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-white px-8 rounded-full" onClick={scrollForm}>{cms.heroCta ?? "Criar minha vertical de viagens"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </div>
            <div className="hidden lg:flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHONE_IMG} alt="App de benefícios com a categoria Viagem em destaque" className="max-h-[520px] w-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Numbers */}
      <section id="visao-geral" className="py-12 bg-[#082B41] border-t border-white/10">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3"><benefit.icon className="w-7 h-7 text-[#FF9100]" /></div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{benefit.value}</div>
                  <div className="text-[#FF9100] font-medium mb-1">{benefit.label}</div>
                  <div className="text-[#C7D3E0] text-sm">{benefit.description}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* O que é */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0"><Cloud className="w-4 h-4 mr-2" />{cms.oQueBadge ?? "O que é"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-6">{cms.oQueTitulo ?? "O que é a RDC Travel Cloud?"}</h2>
              <p className="text-lg text-[#555555] leading-relaxed mb-6">{cms.oQueP1 ?? (<>A RDC Travel Cloud é a <strong>infraestrutura de viagens</strong> que permite que parceiros (fintechs, plataformas de benefícios, apps corporativos, marketplaces) ofereçam viagens com conveniência dentro de seus próprios ecossistemas digitais.</>)}</p>
              <p className="text-lg text-[#555555] leading-relaxed mb-6">{cms.oQueP2 ?? (<>O parceiro <strong>distribui</strong>. A RDC <strong>opera</strong>. O usuário reserva sem sair do app. Toda a complexidade turística (inventário, tarifas, reservas, atendimento, pós-venda) fica invisível.</>)}</p>
              <p className="text-lg text-[#555555] leading-relaxed">{cms.oQueP3 ?? (<>Com mais de <strong>35 anos de operação turística</strong> e acesso a <strong>+200 mil hotéis e resorts</strong>, a RDC entrega a camada turística pronta para o parceiro começar a distribuir viagens sem investir em tecnologia ou equipe especializada.</>)}</p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Nova fonte de receita */}
      <section className="relative py-14 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#FF9100] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#0E4D6E] opacity-20 blur-3xl" />
        <AnimateOnScroll variant="fade">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-[#FF9100] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#FF9100]/30"><TrendingUp className="w-8 h-8 text-white" /></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{cms.receitaTitulo ?? "Nova fonte de receita para o seu negócio"}</h2>
              <p className="text-lg text-[#C7D3E0] mb-8 max-w-2xl mx-auto">{cms.receitaTexto ?? (<>Além de gerar conveniência para o usuário, a Travel Cloud abre uma <strong className="text-white">nova vertical de monetização</strong> para o parceiro. Comissões sobre reservas, adesão ao RDC Prime e aumento de engajamento com outros produtos e serviços do seu ecossistema.</>)}</p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF9100]/50 transition-colors"><p className="text-xl font-bold mb-2 text-[#FF9100]">{cms.receitaC1T ?? "Comissão"}</p><p className="text-[#C7D3E0] text-sm leading-relaxed">{cms.receitaC1D ?? "Receita sobre cada reserva realizada pelo usuário no seu ecossistema"}</p></div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF9100]/50 transition-colors"><p className="text-xl font-bold mb-2 text-[#FF9100]">{cms.receitaC2T ?? "Engajamento"}</p><p className="text-[#C7D3E0] text-sm leading-relaxed">{cms.receitaC2D ?? "Usuário passa mais tempo no app e consome outros produtos e serviços"}</p></div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#FF9100]/50 transition-colors"><p className="text-xl font-bold mb-2 text-[#FF9100]">{cms.receitaC3T ?? "Retenção"}</p><p className="text-[#C7D3E0] text-sm leading-relaxed">{cms.receitaC3D ?? "Viagem como benefício aumenta a percepção de valor e reduz churn"}</p></div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Frentes de aplicação (use cases) */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Smartphone className="w-4 h-4 mr-2" />{cms.frentesBadge ?? "Frentes de aplicação"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">{cms.frentesTitulo ?? "Para quem é a RDC Travel Cloud?"}</h2>
              <p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">{cms.frentesSubtitulo ?? (<>Uma infraestrutura de viagens para diferentes <strong className="text-white">modelos de negócio B2B e B2B2C</strong> que buscam criar a categoria de viagem no seu ecossistema com conveniência.</>)}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><useCase.icon className="w-7 h-7 text-white" /></div>
                    <h3 className="font-bold text-xl text-[#2D2D2D] mb-2">{useCase.title}</h3>
                    <p className="text-[#555555] leading-relaxed mb-3">{useCase.description}</p>
                    <p className="text-sm text-[#FF9100] font-semibold">{useCase.audience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Modelo operacional (how it works) */}
      <section id="viagem-corporativa" className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0"><Settings className="w-4 h-4 mr-2" />{cms.modeloBadge ?? "Modelo operacional"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{cms.modeloTitulo ?? "Como a Travel Cloud funciona"}</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">{cms.modeloSubtitulo ?? (<>Três movimentos simples: <strong>habilitação, distribuição e operação</strong>. O parceiro oferece conveniência ao usuário. A RDC cuida de toda a complexidade turística.</>)}</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-5xl font-black text-[#082B41]/10 absolute top-4 right-6">{step.step}</div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9100] to-[#E07F00] text-white flex items-center justify-center font-bold mb-4"><step.icon className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-[#2D2D2D] mb-1">{step.title}</h3>
                    <p className="text-sm font-semibold text-[#FF9100] mb-3">Responsável: {step.responsible}</p>
                    <p className="text-[#555555] leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Zap className="w-4 h-4 mr-2" />{cms.difBadge ?? "Diferenciais"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">{cms.difTitulo ?? "Por que a RDC Travel Cloud?"}</h2>
              <p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">{cms.difSubtitulo ?? (<>Conveniência para o usuário, simplicidade para o parceiro. <strong className="text-white">Operação turística completa, modelo adaptável e go-to-market acelerado.</strong></>)}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {differentials.map((diff, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><diff.icon className="w-6 h-6 text-white" /></div>
                    <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{diff.title}</h3>
                    <p className="text-[#555555] text-sm leading-relaxed">{diff.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* RDC Prime — universo B2C (base clara, laranja protagonista, Azul RDC de confiança) */}
      <section id="beneficio-lazer" className="py-20 md:py-28 bg-[#F6F6F6] text-[#2D2D2D]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/b2c/RDC_prime.png" alt="RDC Prime" className="h-14 md:h-20 w-auto mx-auto mb-6" />
                <Badge className="mb-5 bg-[#FF9100] hover:bg-[#E07F00] text-white border-0 shadow-md shadow-[#FF9100]/30"><Award className="w-4 h-4 mr-2" />{cms.primeBadge ?? "Produto complementar"}</Badge>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FF9100] mb-5">{cms.primeTitulo ?? "RDC Prime: benefício de viagem pessoal para o colaborador"}</h2>
                <p className="text-lg text-[#555555] max-w-2xl mx-auto">{cms.primeSubtitulo ?? (<>O <strong className="text-[#FF9100]">RDC Prime</strong> é um produto separado da Travel Cloud. É um <strong className="text-[#2D2D2D]">benefício de viagem de lazer</strong> voltado ao colaborador e sua família, no mesmo modelo de assinatura que já funciona em outros segmentos de bem-estar.</>)}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E8E8E8] rounded-3xl p-8 shadow-lg">
                  <h3 className="font-bold text-xl mb-4 text-[#FF9100]">{cms.primeComoTitulo ?? "Como funciona"}</h3>
                  <p className="text-[#555555] leading-relaxed mb-4">A empresa habilita o acesso e o colaborador interessado adere para utilizar as vantagens em <strong className="text-[#2D2D2D]">férias, feriados, fins de semana e viagens em família</strong>. O mesmo modelo de assinatura que já funciona para academias e bem-estar, agora aplicado a viagens.</p>
                  <p className="text-[#555555] text-sm">Benefício de <strong className="text-[#2D2D2D]">alto desejo</strong>, para a família toda, que ajuda na <strong className="text-[#2D2D2D]">retenção, engajamento e marca empregadora</strong>. Sem trabalho operacional para a empresa.</p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-3xl p-8 shadow-lg">
                  <h3 className="font-bold text-xl mb-4 text-[#FF9100]">{cms.primeRecebeTitulo ?? "O que o colaborador recebe"}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#555555]"><strong className="text-[#2D2D2D]">Tarifas exclusivas</strong> em +200 mil hotéis e resorts</span></li>
                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#555555]"><strong className="text-[#2D2D2D]">Atendimento dedicado</strong> com suporte humano e prioridade</span></li>
                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#555555]">Mais <strong className="text-[#2D2D2D]">flexibilidade</strong> para alterações e remarcações</span></li>
                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#555555]">Auxílio em <strong className="text-[#2D2D2D]">early check-in e late check-out</strong></span></li>
                    <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#555555]">Disponível <strong className="text-[#2D2D2D]">o ano todo</strong> — não depende de promoção ou data especial</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-white border border-[#E8E8E8] rounded-2xl p-6 text-center">
                <p className="text-[#555555] text-sm">{cms.primeNota ?? (<><strong className="text-[#FF9100]">Importante:</strong> O RDC Prime é ofertado <strong className="text-[#2D2D2D]">apenas na jornada de lazer/benefícios</strong>. Na viagem corporativa, o foco é gestão de despesas e governança, sem assinatura de benefício pessoal.</>)}</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Formulário (RD Station) */}
      <section id="formulario" className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Mail className="w-4 h-4 mr-2" />{cms.formBadge ?? "Vamos conversar"}</Badge>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">{cms.formTitulo ?? "Vamos desenhar sua vertical de viagens"}</h2>
                <p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">{cms.formSubtitulo ?? (<>Preencha o formulário e nossa equipe entrará em contato para entender seu modelo de negócio e apresentar a <strong className="text-white">solução mais adequada</strong>.</>)}</p>
              </div>
              <Card className="border border-[#E8E8E8] shadow-xl bg-white"><CardContent className="p-8"><RDStationForm formId={cms.formRdId ?? RD_FORMS.travelCloud} /></CardContent></Card>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">{cms.faqBadge ?? "Dúvidas frequentes"}</Badge>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">{cms.faqTitulo ?? "Perguntas sobre a RDC Travel Cloud"}</h2>
              </div>
              <div className="space-y-3">{faqs.map((faq, index) => (<FaqItem key={index} question={faq.question} answer={faq.answer} />))}</div>
              <div className="text-center mt-8">
                <p className="text-[#C7D3E0] mb-4">Não encontrou sua dúvida?</p>
                <Link href="/contato"><Button variant="outline" className="border-[#FF9100] text-[#FF9100] hover:bg-[#FF9100] hover:text-white rounded-full">Falar com nossa equipe</Button></Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{cms.ctaTitulo ?? "Crie a categoria de viagem no seu ecossistema"}</h2>
              <p className="text-lg text-[#C7D3E0] mb-8">{cms.ctaTexto ?? "Um único fornecedor. Mais tempo de tela. Mais receita. Seu usuário reserva viagens sem sair do app e você não precisa operar nada."}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-white px-8 rounded-full" onClick={scrollForm}>{cms.ctaBotao ?? "Criar minha vertical de viagens"}<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
