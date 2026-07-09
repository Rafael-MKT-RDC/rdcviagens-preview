"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { SwipeCarousel } from "@/components/SwipeCarousel";
import type { Depoimento } from "@/lib/cms";
import SubscriptionModal from "@/components/SubscriptionModal";
import {
  Check, X, Star, Headphones, ChevronDown, ChevronUp, Quote, ShoppingCart, Users,
  Sparkles, Zap, Clock, Wallet, UserPlus, ArrowRight, Heart, Plane, CalendarCheck, XCircle,
  CheckCircle2, CircleDollarSign, Compass, Hotel, BadgePercent, Globe, ConciergeBell, Gem, Handshake,
} from "lucide-react";

const plans = [{ id: "7-diarias", days: 7, price: 319.9, popular: true, recommended: true }];

const FALLBACK_TESTIMONIALS = [
  { id: 1, name: "Maria Silva", location: "São Paulo, SP", plan: "7 Diárias", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", text: "Já viajei para 5 destinos com a assinatura RDC. A economia é real e o atendimento é excepcional. Minha família nunca viajou tanto!", rating: 5 },
  { id: 2, name: "Carlos Mendes", location: "Rio de Janeiro, RJ", plan: "5 Diárias", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", text: "Sempre sonhei em conhecer a Serra Gaúcha e com a assinatura RDC consegui realizar esse sonho investindo muito menos do que imaginava.", rating: 5 },
  { id: 3, name: "Ana Beatriz Costa", location: "Belo Horizonte, MG", plan: "7 Diárias", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", text: "A assinatura de 7 diárias transformou a forma como minha família viaja. Agora temos viagens programadas o ano todo com qualidade e economia.", rating: 5 },
  { id: 4, name: "Roberto Almeida", location: "Curitiba, PR", plan: "6 Diárias", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", text: "Indico para todos os meus amigos e já acumulei muitos pontos com o programa de indicação. A assinatura RDC entrega o que promete!", rating: 5 },
];

const competitors = [
  { name: "RDC Viagens", isRdc: true, model: "Assinatura de Viagens", predictability: "Máxima", pricing: "Mensalidade", savings: "Até 60%", effort: "Mínimo", support: "Agência dedicada + Telefone, Chat e WhatsApp", bestFor: "Planejar, pagar aos poucos e viajar mais com economia" },
  { name: "Sites de Reserva", isRdc: false, model: "Avulso (Marketplace)", predictability: "Nenhuma", pricing: "Preços dinâmicos", savings: "10-20% em programas de fidelidade", effort: "Máximo", support: "Chatbot e FAQ", bestFor: "Autonomia total" },
  { name: "Plataformas de Hotéis", isRdc: false, model: "Avulso (Marketplace)", predictability: "Nenhuma", pricing: "Preços dinâmicos", savings: "1 noite grátis a cada 10", effort: "Máximo", support: "Chatbot e FAQ", bestFor: "Recompensa por acúmulo" },
  { name: "Agências Online", isRdc: false, model: "Avulso (Agência Online)", predictability: "Baixa", pricing: "Preços dinâmicos", savings: "Promoções pontuais", effort: "Alto", support: "Autoatendimento", bestFor: "Pacote pronto" },
];

const differentials = [
  { icon: Wallet, title: "Sem comprometer o cartão", description: "Mensalidade recorrente que cabe no orçamento. Seu limite fica livre para o que importa." },
  { icon: Clock, title: "Planejamento é tranquilidade", description: "Você conta com uma agência dedicada para assinantes, que cuida de cada detalhe e encontra as melhores opções para sua jornada." },
  { icon: Sparkles, title: "Economia real, não promoção pontual", description: "Hospedagem nos melhores hotéis com economia de até 60%. Não é sobre gastar menos, é sobre investir melhor." },
  { icon: Zap, title: "Diárias com flexibilidade total", description: "Além da hospedagem, suas diárias podem ser usadas para passagens aéreas, aluguel de carro, cruzeiros, transfers e experiências no destino." },
  { icon: Users, title: "Viaje com quem você ama", description: "Sua assinatura vale para você e mais dois acompanhantes. Porque as melhores jornadas são compartilhadas." },
  { icon: Headphones, title: "Atendimento humanizado", description: "Fale com nossa equipe por telefone, chat ou WhatsApp. Pessoas reais, não chatbots." },
];

const faqs = [
  { question: "Como funciona a Assinatura RDC?", answer: "A Assinatura RDC é o jeito inteligente de viajar o ano todo: você paga uma mensalidade e passa a ter acesso a diárias de hospedagem para usar quando quiser — com flexibilidade para trocar por outros serviços de viagem. São mais de 200 mil hotéis no Brasil e no mundo, com economia de até 60%. Suas diárias valem por 12 meses e você conta com uma agência dedicada para planejar cada detalhe." },
  { question: "Qual a diferença entre a Assinatura RDC e sites de reserva online?", answer: "A principal diferença é o modelo: enquanto sites de reserva online são marketplaces com preços dinâmicos onde você faz tudo sozinho, a Assinatura RDC oferece economia de até 60%, uma agência dedicada para planejar sua viagem e o Portal do Assinante para você montar tudo no seu ritmo. A inteligência está na previsibilidade financeira e no suporte humano especializado por telefone, chat e WhatsApp." },
  { question: "Posso cancelar a assinatura a qualquer momento?", answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Recomendamos entrar em contato com nossa equipe de atendimento — antes de cancelar, podemos te mostrar como aproveitar melhor sua assinatura. Muitos assinantes descobrem benefícios que ainda não conheciam." },
  { question: "Como funciona o Programa de Indicação?", answer: "Ao indicar amigos e familiares que se tornem assinantes, você acumula pontos que podem ser trocados por descontos em hospedagem, passagens aéreas, aluguel de carro e experiências. É uma forma inteligente de viajar ainda mais investindo menos." },
  { question: "As diárias acumulam de um ano para o outro?", answer: "Suas diárias são válidas por 12 meses a partir da data de adesão, dando flexibilidade para você planejar com calma. Diárias não utilizadas após esse período não são transferidas." },
  { question: "Posso usar minhas diárias para passagens aéreas?", answer: "Sim! Você pode trocar suas diárias por passagens aéreas, aluguel de carro e até cruzeiros. É a flexibilidade que você precisa para montar a jornada ideal." },
  { question: "Existe carência para usar minhas diárias?", answer: "Sim. Após a assinatura, o assinante já pode começar a reservar suas viagens, porém a liberação das diárias ocorre após 40 dias do pagamento da primeira mensalidade. Esse prazo garante a segurança da operação e permite que você já planeje sua viagem com antecedência junto à nossa agência dedicada." },
  { question: "O que é a Tarifa Exclusiva RDC?", answer: "A Tarifa Exclusiva é um benefício ilimitado da sua assinatura: você pode viajar mais, pagando muito menos, com até 60% abaixo do mercado. São mais de 200 mil hotéis e resorts disponíveis desde o primeiro dia da assinatura, sem carência e sem limite de uso. A tarifa exclusiva não consome suas diárias — é um desconto adicional que está sempre ativo para você reservar o ano todo." },
];

const perfis = [
  { icon: Users, bg: "bg-[#E8F4FA]", color: "text-[#001A9E]", title: "Famílias", desc: <>Querem <strong>viajar todo ano</strong> com qualidade, sem comprometer o orçamento familiar. Buscam planejamento, previsibilidade e mais momentos juntos.</> },
  { icon: Heart, bg: "bg-[#FFF0D6]", color: "text-[#E68200]", title: "Casais", desc: <>Sonham em <strong>conhecer novos destinos</strong> juntos, mas sempre adiam por causa dos custos. Querem transformar intenção em realidade.</> },
  { icon: Compass, bg: "bg-[#D4F5E9]", color: "text-[#06D6A0]", title: "Viajantes frequentes", desc: <>Viajam várias vezes ao ano e querem <strong>economizar de verdade</strong> sem abrir mão de hotéis de qualidade e atendimento personalizado.</> },
  { icon: CalendarCheck, bg: "bg-[#F0E4FF]", color: "text-[#8050C0]", title: "Quem adia as férias", desc: <>Sempre diz &ldquo;ano que vem eu viajo&rdquo; mas nunca consegue. Com a Assinatura RDC, viajar entra no <strong>planejamento financeiro</strong> de forma leve e inteligente.</> },
];

const beneficios = [
  { icon: Hotel, title: "Diárias de Hospedagem", desc: <><strong className="text-[#2D2D2D]">7 diárias por ano</strong> em hotéis e resorts de todo o Brasil e exterior.</> },
  { icon: BadgePercent, title: "Tarifa Exclusiva", desc: <>Uso <strong className="text-[#2D2D2D]">ilimitado e sem carência</strong>: até 60% abaixo do mercado em +200 mil hotéis e resorts, disponível desde o primeiro dia da assinatura, o ano todo — sem consumir suas diárias.</> },
  { icon: Globe, title: "Portal do Assinante", desc: <>Plataforma exclusiva para pesquisar, comparar e <strong className="text-[#2D2D2D]">reservar suas viagens</strong> com autonomia e praticidade.</> },
  { icon: ConciergeBell, title: "Agência Dedicada", desc: <>Equipe especializada para montar <strong className="text-[#2D2D2D]">roteiros personalizados</strong>, cuidar de passagens, transfers e cada detalhe da viagem.</> },
  { icon: Gem, title: "Clube de Vantagens", desc: <><strong className="text-[#2D2D2D]">Descontos exclusivos</strong> em marcas parceiras de gastronomia, entretenimento, saúde, educação e muito mais.</> },
  { icon: Handshake, title: "Programa de Indicação", desc: <>Indique amigos e <strong className="text-[#2D2D2D]">acumule pontos</strong> para trocar por descontos em hospedagem, voos, carros e experiências.</> },
];

export function AssinaturasClient({ depoimentos, cms = {} }: { depoimentos?: Depoimento[]; cms?: any }) {
  const testimonials = depoimentos && depoimentos.length
    ? depoimentos.map((d) => ({ id: d.id, name: d.nome, location: d.cargo ?? "", plan: "", image: d.foto ?? "", text: d.texto, rating: d.estrelas }))
    : FALLBACK_TESTIMONIALS;
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => setShowFloatingButton(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPlans = () => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  const openSubscriptionModal = (plan?: typeof plans[0]) => { setSelectedPlan(plan); setModalOpen(true); };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E68200] text-white border-0">{cms.heroBadge ?? "Assinatura de Viagem RDC"}</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">{cms.heroTituloLinha1 ?? "O jeito inteligente de"} <span className="text-[#FF9100]">{cms.heroDestaque ?? "viajar o ano todo"}</span></h1>
            <p className="text-base md:text-xl text-[#C7E5F3] mb-4 md:mb-6">A <strong>Assinatura RDC</strong> é planejamento inteligente: você paga uma mensalidade e tem acesso a <strong>diárias de hospedagem</strong> com economia de até 60%. Previsibilidade que vira viagem.</p>
            <p className="text-sm md:text-lg text-[#FFB040] italic mb-6 md:mb-8">Porque as melhores memórias são feitas ao lado de quem a gente ama.</p>
            <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-full" onClick={scrollToPlans}>Ver planos</Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full"><path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" /></svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-[#001A9E]">+35</p><p className="text-xs md:text-sm text-[#777777] mt-1">anos de mercado</p></div>
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-[#001A9E]">+200 mil</p><p className="text-xs md:text-sm text-[#777777] mt-1">destinos disponíveis</p></div>
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-[#001A9E]">Milhões</p><p className="text-xs md:text-sm text-[#777777] mt-1">de diárias entregues</p></div>
            <div className="text-center"><p className="text-3xl md:text-4xl font-bold text-[#001A9E]">Até 60%</p><p className="text-xs md:text-sm text-[#777777] mt-1">de economia</p></div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 bg-[#FFF0D6] text-[#CC7400] border-0">Para quem é</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">A Assinatura RDC foi feita para você</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">Se você se identifica com algum desses perfis, a <strong>Assinatura RDC</strong> pode transformar a forma como você viaja</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {perfis.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#E8E8E8] hover:shadow-md hover:border-[#FFCC80] transition-all">
                    <div className={`w-12 h-12 rounded-full ${p.bg} flex items-center justify-center mb-4`}><Icon className={`w-6 h-6 ${p.color}`} /></div>
                    <h3 className="font-bold text-[#2D2D2D] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#555555]">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Antes vs Depois */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 bg-[#D4F5E9] text-[#06D6A0] border-0">Transformação</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">A diferença de ter a Assinatura RDC</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">Descubra como a assinatura <strong>transforma sua forma de viajar</strong></p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-[#F6F6F6] rounded-2xl p-6 md:p-8 border border-[#D6D6D6]">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center"><XCircle className="w-5 h-5 text-[#EF4444]" /></div><h3 className="text-lg md:text-xl font-bold text-[#999999]">Sem a Assinatura RDC</h3></div>
                <ul className="space-y-4">
                  {["Férias adiadas ano após ano por falta de planejamento", "Gastos imprevisíveis que comprometem o cartão de crédito", "Horas pesquisando preços em dezenas de sites diferentes", "Sem suporte humano — apenas chatbots e FAQs genéricos", "Preços dinâmicos que mudam a cada busca"].map((t, i) => (
                    <li key={i} className="flex items-start gap-3"><X className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" /><span className="text-sm md:text-base text-[#777777]">{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-6 md:p-8 border-2 border-[#FFCC80] shadow-md">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-full bg-[#D4F5E9] flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#06D6A0]" /></div><h3 className="text-lg md:text-xl font-bold text-[#2D2D2D]">Com a Assinatura RDC</h3></div>
                <ul className="space-y-4">
                  {[<><strong>Viagens programadas</strong> no calendário da família</>, <><strong>Mensalidade</strong> que não compromete o limite do cartão</>, <><strong>Agência dedicada</strong> que cuida de todo o planejamento</>, <><strong>Atendimento humano</strong> por telefone, chat e WhatsApp</>, <><strong>Economia de até 60%</strong> nos melhores hotéis e resorts</>].map((t, i) => (
                    <li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-[#06D6A0] mt-0.5 flex-shrink-0" /><span className="text-sm md:text-base text-[#404040]">{t}</span></li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-[#FFCC80]/60">
                  <p className="text-xs font-semibold text-[#E68200] uppercase tracking-wider mb-3">E o mais importante...</p>
                  <ul className="space-y-3">
                    {[[Heart, <><strong>Tempo de qualidade</strong> com quem você mais ama</>], [Sparkles, <><strong>Memórias inesquecíveis</strong> que ficam para sempre</>], [Compass, <><strong>Conhecer lugares novos</strong> e ampliar horizontes</>], [Zap, <><strong>Reenergizar corpo e mente</strong> para voltar renovado</>], [Users, <><strong>Fortalecer laços</strong> com a família e amigos</>]].map(([Ic, t], i) => {
                      const Icon = Ic as typeof Heart;
                      return (<li key={i} className="flex items-start gap-3"><Icon className="w-5 h-5 text-[#FF9100] mt-0.5 flex-shrink-0" /><span className="text-sm md:text-base text-[#404040]">{t as React.ReactNode}</span></li>);
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Como funciona */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] text-white overflow-hidden">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 bg-white/20 text-white border-0">Simples assim</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Como funciona</h2>
              <p className="text-sm md:text-lg text-[#8ECAE6] max-w-2xl mx-auto">Em <strong>3 passos simples</strong> você começa a viajar com a Assinatura RDC</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
                <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#FF9100]/50 via-[#FF9100] to-[#E68200]/50" />
                {[{ n: "1", Icon: CircleDollarSign, t: "Escolha seu plano", d: <>Selecione a quantidade de diárias ideal para o seu perfil e comece a planejar suas viagens.</> }, { n: "2", Icon: Headphones, t: "Planeje sua viagem", d: <>Monte tudo pelo <strong>Portal do Assinante</strong> no seu ritmo ou conte com nossa <strong>agência dedicada</strong> para cuidar de cada detalhe.</> }, { n: "3", Icon: Plane, t: "Viaje com economia", d: <>Aproveite hotéis de <strong>4 e 5 estrelas</strong> com até 60% de economia. Suas diárias valem por 12 meses.</> }].map((s) => (
                  <div key={s.n} className="relative text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF9100] flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-lg shadow-[#FF9100]/30 relative z-10"><span className="text-2xl md:text-3xl font-bold">{s.n}</span></div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6"><s.Icon className="w-8 h-8 text-[#FF9100] mx-auto mb-3" /><h3 className="font-bold text-lg mb-2">{s.t}</h3><p className="text-[#8ECAE6] text-sm">{s.d}</p></div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8 md:mt-10"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full" onClick={() => openSubscriptionModal()}>Quero começar minha jornada<ArrowRight className="w-5 h-5 ml-2" /></Button></div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* O que recebe */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-8 md:mb-14">
              <Badge className="mb-3 bg-[#FFF0D6] text-[#CC7400] border-0">Tudo incluso na sua assinatura</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">O que você recebe ao assinar</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">Cada plano da <strong className="text-[#2D2D2D]">Assinatura RDC</strong> inclui um pacote completo de benefícios para você viajar mais e melhor</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {beneficios.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Icon className="w-6 h-6 text-white" /></div>
                    <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{b.title}</h3>
                    <p className="text-[#555555] text-sm leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 md:mt-12 text-center"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 shadow-lg shadow-[#FF9100]/30 rounded-full" onClick={() => openSubscriptionModal()}>Transformar minhas viagens<ArrowRight className="w-5 h-5 ml-2" /></Button></div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Planos */}
      <section id="planos" className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">Nosso plano de assinatura</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto"><strong>7 diárias por ano</strong> com todos os benefícios e serviços inclusos. O plano completo para quem quer viajar de verdade.</p>
            </div>
            <div className="flex justify-center max-w-md mx-auto">
              {plans.map((plan) => {
                const dailyCost = (plan.price / 30).toFixed(2).replace(".", ",");
                return (
                  <div key={plan.id} className={`relative rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full ${plan.recommended ? "bg-gradient-to-b from-[#FF9100] to-[#E68200] text-white shadow-lg shadow-[#FF9100]/25 ring-2 ring-[#FF9100] lg:scale-105 z-10" : "bg-white border border-[#D6D6D6] hover:border-[#8ECAE6]"}`}>
                    <div className={`text-4xl md:text-5xl font-bold mb-0.5 ${plan.recommended ? "text-white" : "text-[#001A9E]"}`}>{plan.days}</div>
                    <div className={`text-xs md:text-sm font-semibold mb-3 md:mb-4 ${plan.recommended ? "text-[#FFF0D6]" : "text-[#777777]"}`}>diárias/ano</div>
                    <div className={`border-t mb-3 md:mb-4 ${plan.recommended ? "border-[#FF9100]/30" : "border-[#E8E8E8]"}`} />
                    <div className="mb-3 md:mb-4">
                      <div className="flex items-baseline justify-center gap-0.5"><span className={`text-xs ${plan.recommended ? "text-[#FFCC80]" : "text-[#999999]"}`}>R$</span><span className={`text-2xl md:text-3xl font-bold ${plan.recommended ? "text-white" : "text-[#2D2D2D]"}`}>{plan.price.toFixed(2).replace(".", ",")}</span></div>
                      <p className={`text-xs ${plan.recommended ? "text-[#FFCC80]" : "text-[#999999]"}`}>/mês</p>
                      <div className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold ${plan.recommended ? "bg-white/20 text-white" : "bg-[#F6F6F6] text-[#001A9E]"}`}>R$ {dailyCost}/dia</div>
                    </div>
                    <Button className={`w-full text-xs md:text-sm ${plan.recommended ? "bg-white text-[#E68200] hover:bg-[#FFF8EB] font-bold" : "bg-[#001A9E] hover:bg-[#001070] text-white"}`} size="sm" onClick={() => window.open("https://rdcviagens.com.br/assinar", "_blank")}>Assinar agora</Button>
                    <button className={`w-full mt-2 text-[10px] md:text-xs font-medium underline underline-offset-2 ${plan.recommended ? "text-[#FFF0D6] hover:text-white" : "text-[#999999] hover:text-[#001A9E]"} transition-colors`} onClick={() => openSubscriptionModal(plan)}>Falar com consultor</button>
                    <p className={`text-[9px] md:text-[10px] mt-2 ${plan.recommended ? "text-[#FFCC80]" : "text-[#999999]"}`}>+ adesão de R$ 880</p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Referral banner */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-[#001A9E] to-[#001070]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#FF9100] flex items-center justify-center flex-shrink-0"><UserPlus className="w-10 h-10 text-white" /></div>
                <div className="text-white"><h3 className="text-2xl md:text-3xl font-bold mb-2">Programa de Indicação</h3><p className="text-[#C7E5F3] text-lg">Indique amigos, <strong>acumule pontos</strong> e troque por descontos em hospedagem, voos, carros e mais!</p></div>
              </div>
              <Link href="/programa-indicacao"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white whitespace-nowrap rounded-full">Quero indicar e ganhar<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Comparativo */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E] border-0">Comparativo</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">Por que escolher a Assinatura RDC?</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">Compare e descubra por que somos a <strong>escolha inteligente</strong> para quem quer viajar mais</p>
            </div>

            {/* Mobile carousel */}
            <div className="lg:hidden">
              <SwipeCarousel basis="basis-[92%]" hint="Deslize para comparar">
                {competitors.map((comp) => {
                  const criteria = [
                    { label: "Modelo", value: comp.model, type: "text" as const },
                    { label: "Previsibilidade", value: comp.predictability, type: comp.isRdc ? ("success" as const) : ("text" as const) },
                    { label: "Preços", value: comp.pricing, type: "text" as const },
                    { label: "Economia", value: comp.savings, type: comp.isRdc ? ("highlight" as const) : ("text" as const) },
                    { label: "Seu esforço", value: comp.effort, type: comp.isRdc ? ("success" as const) : ("danger" as const) },
                    { label: "Suporte", value: comp.support, type: comp.isRdc ? ("success" as const) : ("text" as const) },
                    { label: "Melhor para...", value: comp.bestFor, type: "text" as const },
                  ];
                  return (
                    <Card key={comp.name} className={`overflow-hidden border-2 transition-shadow ${comp.isRdc ? "border-[#FFB040] shadow-lg shadow-[#FFF0D6]" : "border-[#E8E8E8]"}`}>
                      <div className={`px-5 py-4 flex items-center justify-between ${comp.isRdc ? "bg-gradient-to-r from-[#FF9100] to-[#E68200]" : "bg-[#F6F6F6]"}`}>
                        <span className={`font-bold text-lg ${comp.isRdc ? "text-white" : "text-[#2D2D2D]"}`}>{comp.name}</span>
                        {comp.isRdc && <Badge className="bg-white text-[#E68200] border-0 text-xs font-semibold">Recomendado</Badge>}
                      </div>
                      <CardContent className="p-0">
                        {criteria.map((item, idx) => (
                          <div key={idx} className={`flex items-start justify-between gap-3 px-5 py-3 ${idx < criteria.length - 1 ? "border-b border-[#E8E8E8]" : ""} ${idx === criteria.length - 1 && comp.isRdc ? "bg-[#FFF8EB]" : ""}`}>
                            <span className="text-sm font-medium text-[#777777] shrink-0 w-28">{item.label}</span>
                            <span className={`text-sm text-right ${item.type === "success" ? "text-[#06D6A0] font-semibold" : item.type === "highlight" ? "text-[#06D6A0] font-bold" : item.type === "danger" ? "text-[#EF4444]" : comp.isRdc ? "text-[#CC7400] font-semibold" : "text-[#555555]"}`}>
                              {item.type === "success" && <Check className="w-3.5 h-3.5 inline mr-1" />}
                              {item.type === "highlight" && <Sparkles className="w-3.5 h-3.5 inline mr-1" />}
                              {item.label === "Suporte" && comp.isRdc && <Headphones className="w-3.5 h-3.5 inline mr-1" />}
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </SwipeCarousel>
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-[#F6F6F6] border-b-2 border-[#D6D6D6] font-semibold text-[#404040]">Critério</th>
                    {competitors.map((comp) => (
                      <th key={comp.name} className={`p-4 text-center border-b-2 ${comp.isRdc ? "bg-[#FFF8EB] border-[#FFB040]" : "bg-[#F6F6F6] border-[#D6D6D6]"}`}>
                        <span className={`font-bold ${comp.isRdc ? "text-[#E68200]" : "text-[#404040]"}`}>{comp.name}</span>
                        {comp.isRdc && <Badge className="ml-2 bg-[#FF9100] text-white border-0 text-xs">Recomendado</Badge>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {([
                    ["Modelo", (c: typeof competitors[0]) => c.model, "text"],
                    ["Previsibilidade", (c: typeof competitors[0]) => c.predictability, "successCheck"],
                    ["Preços", (c: typeof competitors[0]) => c.pricing, "text"],
                    ["Economia", (c: typeof competitors[0]) => c.savings, "highlight"],
                    ["Seu esforço", (c: typeof competitors[0]) => c.effort, "effort"],
                    ["Suporte", (c: typeof competitors[0]) => c.support, "support"],
                  ] as const).map(([label, get, kind]) => (
                    <tr key={label}>
                      <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">{label}</td>
                      {competitors.map((comp) => (
                        <td key={comp.name} className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}>
                          {comp.isRdc && kind === "successCheck" ? (<span className="inline-flex items-center gap-1 text-[#06D6A0] font-semibold"><Check className="w-4 h-4" /> {get(comp)}</span>)
                            : comp.isRdc && kind === "highlight" ? (<span className="inline-flex items-center gap-1 text-[#06D6A0] font-bold"><Sparkles className="w-4 h-4" /> {get(comp)}</span>)
                            : comp.isRdc && kind === "effort" ? (<span className="inline-flex items-center gap-1 text-[#06D6A0] font-semibold"><Check className="w-4 h-4" /> {get(comp)}</span>)
                            : comp.isRdc && kind === "support" ? (<span className="inline-flex items-center gap-1 text-[#06D6A0] font-semibold"><Headphones className="w-4 h-4" /> {get(comp)}</span>)
                            : kind === "effort" && !comp.isRdc ? (<span className="text-[#EF4444]">{get(comp)}</span>)
                            : (<span className={comp.isRdc ? "font-semibold text-[#CC7400]" : "text-[#555555]"}>{get(comp)}</span>)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-[#F6F6F6]">
                    <td className="p-4 font-medium text-[#404040]">Melhor para...</td>
                    {competitors.map((comp) => (<td key={comp.name} className={`p-4 text-center ${comp.isRdc ? "bg-[#FFF0D6]" : ""}`}><span className={comp.isRdc ? "font-bold text-[#CC7400]" : "text-[#555555]"}>{comp.bestFor}</span></td>))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-[#F6F6F6] rounded-2xl border border-[#E8F4FA]">
              <p className="text-center text-[#001070]"><strong>Resumindo:</strong> O assinante RDC valoriza <strong>planejamento, previsibilidade e economia</strong>. Se você quer viajar mais, investindo menos e com o suporte de quem entende do assunto, a Assinatura RDC é para você.</p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Differentials */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070] text-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Por que a Assinatura RDC é diferente</h2>
              <p className="text-sm md:text-lg text-[#8ECAE6] max-w-2xl mx-auto">Diferenciais que fazem da Assinatura RDC a <strong>escolha inteligente</strong> para suas jornadas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {differentials.map((diff, index) => {
                const Icon = diff.icon;
                return (
                  <div key={index} className="flex gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
                    <div className="flex-shrink-0"><div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF9100] flex items-center justify-center"><Icon className="w-5 h-5 md:w-6 md:h-6 text-white" /></div></div>
                    <div><h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{diff.title}</h3><p className="text-[#8ECAE6] text-xs md:text-sm">{diff.description}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E] border-0">Depoimentos</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">O que nossos assinantes dizem</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto"><strong>Milhões de diárias entregues</strong> e mais de <strong>35 anos de mercado</strong>. Pioneira em assinatura de viagens no Brasil.</p>
            </div>
            <div className="lg:hidden">
              <SwipeCarousel basis="basis-[85%] sm:basis-[60%]">
                {testimonials.map((t) => (
                  <Card key={t.id} className="bg-white border-0 shadow-md h-full">
                    <CardContent className="pt-5 pb-5">
                      <Quote className="w-6 h-6 text-[#FF9100] mb-3 opacity-50" />
                      <p className="text-sm text-[#404040] mb-4 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                        <div><p className="font-semibold text-sm text-[#2D2D2D]">{t.name}</p><p className="text-xs text-[#777777]">{t.location}</p><p className="text-xs text-[#FF9100] font-medium">{t.plan}</p></div>
                      </div>
                      <div className="flex gap-0.5 mt-3">{[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 text-[#FF9100] fill-yellow-400" />))}</div>
                    </CardContent>
                  </Card>
                ))}
              </SwipeCarousel>
            </div>
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {testimonials.map((t) => (
                <Card key={t.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Quote className="w-8 h-8 text-[#FF9100] mb-4 opacity-50" />
                    <p className="text-[#404040] mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div><p className="font-semibold text-[#2D2D2D]">{t.name}</p><p className="text-sm text-[#777777]">{t.location}</p><p className="text-xs text-[#FF9100] font-medium">{t.plan}</p></div>
                    </div>
                    <div className="flex gap-1 mt-4">{[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-[#FF9100] fill-yellow-400" />))}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Agency banner */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-[#00148A] to-[#001070]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <Badge className="mb-4 bg-[#FF9100] text-white border-0">Exclusivo para Assinantes</Badge>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">Sua agência de viagens dedicada</h2>
                <p className="text-[#8ECAE6] text-sm md:text-lg leading-relaxed">Como assinante RDC, você tem acesso a uma <strong>agência dedicada</strong> que cuida de cada detalhe: passagens, hospedagem, <strong>roteiros personalizados</strong>, transfers e muito mais.</p>
              </div>
              <Link href="/agencia"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 whitespace-nowrap">Conhecer a agência<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">Perguntas frequentes</h2>
              <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">Tire suas dúvidas sobre a Assinatura RDC</p>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#D6D6D6]">
                  <button className="w-full py-5 flex items-center justify-between text-left hover:text-[#001A9E] transition-colors" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <span className="font-medium text-lg pr-4">{faq.question}</span>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-[#FF9100]" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#999999]" />}
                  </button>
                  {openFaq === index && <div className="pb-5 text-[#555555]">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA final */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">Sua próxima jornada começa aqui</h2>
              <p className="text-sm md:text-lg text-[#8ECAE6] mb-6 md:mb-8">Cada viagem é uma história esperando para ser vivida. Deixe a gente te guiar nessa jornada — com <strong>economia, cuidado e liberdade</strong>.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full" onClick={() => openSubscriptionModal()}>Quero começar minha jornada<ArrowRight className="w-5 h-5 ml-2" /></Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 rounded-full" onClick={() => window.open("https://wa.me/5511999999999", "_blank")}>Falar pelo WhatsApp</Button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Floating button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${showFloatingButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
        <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white shadow-lg shadow-[#FF9100]/30 rounded-full px-6 py-6 animate-pulse hover:animate-none" onClick={() => openSubscriptionModal()}><ShoppingCart className="w-5 h-5 mr-2" />Iniciar minha jornada</Button>
      </div>

      <SubscriptionModal open={modalOpen} onOpenChange={setModalOpen} selectedPlan={selectedPlan} />
    </>
  );
}
