import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { 
  Check, 
  X,
  Star, 
  MapPin, 
  Building2, 
  Headphones, 
  Gift,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Quote,
  ShoppingCart,
  Users,
  Sparkles,
  Crown,
  Zap,
  Clock,
  Wallet,
  UserPlus,
  ArrowRight,
  Heart,
  Plane,
  CalendarCheck,
  TrendingUp,
  XCircle,
  CheckCircle2,
  CircleDollarSign,
  Baby,
  Compass,
  Hotel,
  BadgePercent,
  Globe,
  ConciergeBell,
  Gem,
  Handshake
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscriptionModal from "@/components/SubscriptionModal";
import SEO from "@/components/SEO";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
/*
 * Design Philosophy: Tropical Elegance
 * - Espaços amplos e respiráveis que evocam a sensação de férias
 * - Uso estratégico de imagens de destinos como elementos principais
 * - Tipografia elegante e legível que transmite confiança
 * - Cores: Azul profundo (#0540D4) + Laranja institucional (#FF8A1F)
 */

// Preço médio de diária em hotel 4-5 estrelas no mercado
const MARKET_DAILY_RATE = 550;

const plans = [
  { id: "2-diarias", days: 2, price: 97.20, popular: false, recommended: false },
  { id: "3-diarias", days: 3, price: 143.50, popular: false, recommended: false },
  { id: "4-diarias", days: 4, price: 189.90, popular: false, recommended: false },
  { id: "5-diarias", days: 5, price: 235.20, popular: false, recommended: false },
  { id: "6-diarias", days: 6, price: 279.30, popular: false, recommended: false },
  { id: "7-diarias", days: 7, price: 319.90, popular: true, recommended: true },
];

const sharedBenefits = [
  { icon: Hotel, text: "Hotéis e resorts selecionados com até 60% OFF" },
  { icon: Users, text: "Até 3 pessoas por reserva" },
  { icon: Plane, text: "Agência de viagens exclusiva" },
  { icon: Globe, text: "Acesso ao Portal do Assinante" },
  { icon: Gift, text: "Clube de Vantagens com descontos exclusivos" },
  { icon: UserPlus, text: "Programa Indique e Ganhe" },
  { icon: Headphones, text: "Atendimento por telefone, chat e WhatsApp" },
];

// Função para calcular economia de cada plano
const getEconomy = (plan: typeof plans[0]) => {
  const marketAnnual = plan.days * MARKET_DAILY_RATE;
  const rdcAnnual = plan.price * 12;
  const savings = marketAnnual - rdcAnnual;
  const percent = Math.round((savings / marketAnnual) * 100);
  const effectiveDaily = rdcAnnual / plan.days;
  return { marketAnnual, rdcAnnual, savings, percent, effectiveDaily };
};

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    plan: "7 Diárias",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    text: "Já viajei para 5 destinos com a assinatura RDC. A economia é real e o atendimento é excepcional. Minha família nunca viajou tanto!",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Mendes",
    location: "Rio de Janeiro, RJ",
    plan: "5 Diárias",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "Sempre sonhei em conhecer a Serra Gaúcha e com a assinatura RDC consegui realizar esse sonho investindo muito menos do que imaginava.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Beatriz Costa",
    location: "Belo Horizonte, MG",
    plan: "7 Diárias",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "A assinatura de 7 diárias transformou a forma como minha família viaja. Agora temos viagens programadas o ano todo com qualidade e economia.",
    rating: 5
  },
  {
    id: 4,
    name: "Roberto Almeida",
    location: "Curitiba, PR",
    plan: "6 Diárias",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "Indico para todos os meus amigos e já acumulei muitos pontos com o programa de indicação. A assinatura RDC entrega o que promete!",
    rating: 5
  }
];

const competitors = [
  {
    name: "RDC Viagens",
    isRdc: true,
    model: "Assinatura de Viagens",
    predictability: "Máxima",
    pricing: "Mensalidade",
    savings: "Até 60%",
    effort: "Mínimo",
    support: "Agência dedicada + Telefone, Chat e WhatsApp",
    bestFor: "Planejar, pagar aos poucos e viajar mais com economia"
  },
  {
    name: "Sites de Reserva",
    isRdc: false,
    model: "Avulso (Marketplace)",
    predictability: "Nenhuma",
    pricing: "Preços dinâmicos",
    savings: "10-20% em programas de fidelidade",
    effort: "Máximo",
    support: "Chatbot e FAQ",
    bestFor: "Autonomia total"
  },
  {
    name: "Plataformas de Hotéis",
    isRdc: false,
    model: "Avulso (Marketplace)",
    predictability: "Nenhuma",
    pricing: "Preços dinâmicos",
    savings: "1 noite grátis a cada 10",
    effort: "Máximo",
    support: "Chatbot e FAQ",
    bestFor: "Recompensa por acúmulo"
  },
  {
    name: "Agências Online",
    isRdc: false,
    model: "Avulso (Agência Online)",
    predictability: "Baixa",
    pricing: "Preços dinâmicos",
    savings: "Promoções pontuais",
    effort: "Alto",
    support: "Autoatendimento",
    bestFor: "Pacote pronto"
  }
];

const differentials = [
  {
    icon: Wallet,
    title: "Sem comprometer o cartão",
    description: "Mensalidade recorrente que cabe no orçamento. Seu limite fica livre para o que importa."
  },
  {
    icon: Clock,
    title: "Planejamento é tranquilidade",
    description: "Você conta com uma agência dedicada para assinantes, que cuida de cada detalhe e encontra as melhores opções para sua jornada."
  },
  {
    icon: Sparkles,
    title: "Economia real, não promoção pontual",
    description: "Hospedagem nos melhores hotéis com economia de até 60%. Não é sobre gastar menos, é sobre investir melhor."
  },
  {
    icon: Zap,
    title: "Diárias com flexibilidade total",
    description: "Além da hospedagem, suas diárias podem ser usadas para passagens aéreas, aluguel de carro, cruzeiros, transfers e experiências no destino."
  },
  {
    icon: Users,
    title: "Viaje com quem você ama",
    description: "Sua assinatura vale para você e mais dois acompanhantes. Porque as melhores jornadas são compartilhadas."
  },
  {
    icon: Headphones,
    title: "Atendimento humanizado",
    description: "Fale com nossa equipe por telefone, chat ou WhatsApp. Pessoas reais, não chatbots."
  }
];

const faqs = [
  {
    question: "Como funciona a Assinatura RDC?",
    answer: "A Assinatura RDC é o jeito inteligente de viajar o ano todo: você paga uma mensalidade e passa a ter acesso a diárias de hospedagem para usar quando quiser — com flexibilidade para trocar por outros serviços de viagem. São mais de 200 mil hotéis no Brasil e no mundo, com economia de até 60%. Suas diárias valem por 12 meses e você conta com uma agência dedicada para planejar cada detalhe."
  },
  {
    question: "Qual a diferença entre a Assinatura RDC e sites de reserva online?",
    answer: "A principal diferença é o modelo: enquanto sites de reserva online são marketplaces com preços dinâmicos onde você faz tudo sozinho, a Assinatura RDC oferece economia de até 60%, uma agência dedicada para planejar sua viagem e o Portal do Assinante para você montar tudo no seu ritmo. A inteligência está na previsibilidade financeira e no suporte humano especializado por telefone, chat e WhatsApp."
  },
  {
    question: "Posso cancelar a assinatura a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Recomendamos entrar em contato com nossa equipe de atendimento — antes de cancelar, podemos te mostrar como aproveitar melhor sua assinatura. Muitos assinantes descobrem benefícios que ainda não conheciam."
  },
  {
    question: "Como funciona o Programa de Indicação?",
    answer: "Ao indicar amigos e familiares que se tornem assinantes, você acumula pontos que podem ser trocados por descontos em hospedagem, passagens aéreas, aluguel de carro e experiências. É uma forma inteligente de viajar ainda mais investindo menos."
  },
  {
    question: "As diárias acumulam de um ano para o outro?",
    answer: "Suas diárias são válidas por 12 meses a partir da data de adesão, dando flexibilidade para você planejar com calma. Diárias não utilizadas após esse período não são transferidas."
  },
  {
    question: "Posso usar minhas diárias para passagens aéreas?",
    answer: "Sim! Você pode trocar suas diárias por passagens aéreas, aluguel de carro e até cruzeiros. É a flexibilidade que você precisa para montar a jornada ideal."
  }
];

export default function Assinaturas() {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | undefined>(undefined);
  const [compareApi, setCompareApi] = useState<CarouselApi>();
  const [compareIndex, setCompareIndex] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [testimonialsApi, setTestimonialsApi] = useState<CarouselApi>();
  const [testimonialsIndex, setTestimonialsIndex] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);

  useEffect(() => {
    if (!compareApi) return;
    setCompareCount(compareApi.scrollSnapList().length);
    setCompareIndex(compareApi.selectedScrollSnap());
    compareApi.on("select", () => {
      setCompareIndex(compareApi.selectedScrollSnap());
    });
  }, [compareApi]);


  useEffect(() => {
    if (!testimonialsApi) return;
    setTestimonialsCount(testimonialsApi.scrollSnapList().length);
    setTestimonialsIndex(testimonialsApi.selectedScrollSnap());
    testimonialsApi.on("select", () => {
      setTestimonialsIndex(testimonialsApi.selectedScrollSnap());
    });
  }, [testimonialsApi]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowFloatingButton(scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPlans = () => {
      <SEO
        title="Planos de Assinatura de Viagens | RDC Viagens"
        description="Conheça os planos de assinatura da RDC Viagens. De 2 a 7 diárias por ano nos melhores hotéis com economia de até 60%. Planos a partir de R$ 97,20/mês."
        keywords="planos de assinatura viagens, assinatura hotéis, férias planejadas, economia viagens, RDC assinaturas"
        canonical="https://rdcviagens.com.br/assinaturas"
      />
    const plansSection = document.getElementById("planos");
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openSubscriptionModal = (plan?: typeof plans[0]) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-29 pb-12 md:pt-34 md:pb-16 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E68200] text-white border-0">
              Assinatura de Viagem RDC
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              O jeito inteligente de{" "}
              <span className="text-[#FF9100]">viajar o ano todo</span>
            </h1>
            <p className="text-base md:text-xl text-[#C7E5F3] mb-4 md:mb-6">
              A <strong>Assinatura RDC</strong> é planejamento inteligente: você paga uma mensalidade e tem acesso a <strong>diárias de hospedagem</strong> com economia de até 60%. Previsibilidade que vira viagem.
            </p>
            <p className="text-sm md:text-lg text-[#FFB040] italic mb-6 md:mb-8">
              Porque as melhores memórias são feitas ao lado de quem a gente ama.
            </p>
            <Button 
              size="lg" 
              className="bg-[#FF9100] hover:bg-[#E68200] text-white px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-full"
              onClick={scrollToPlans}
            >
              Ver planos
            </Button>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Social Proof Stats Bar */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#001A9E]">+35</p>
              <p className="text-xs md:text-sm text-[#777777] mt-1">anos de mercado</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#001A9E]">+200 mil</p>
              <p className="text-xs md:text-sm text-[#777777] mt-1">destinos disponíveis</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#001A9E]">Milhões</p>
              <p className="text-xs md:text-sm text-[#777777] mt-1">de diárias entregues</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#001A9E]">Até 60%</p>
              <p className="text-xs md:text-sm text-[#777777] mt-1">de economia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É - Perfis de Viajante */}
      <section className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 bg-[#FFF0D6] text-[#CC7400] border-0">
              Para quem é
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              A Assinatura RDC foi feita para você
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              Se você se identifica com algum desses perfis, a <strong>Assinatura RDC</strong> pode transformar a forma como você viaja
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#E8E8E8] hover:shadow-md hover:border-[#FFCC80] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#001A9E]" />
              </div>
              <h3 className="font-bold text-[#2D2D2D] mb-2">Famílias</h3>
              <p className="text-sm text-[#555555]">Querem <strong>viajar todo ano</strong> com qualidade, sem comprometer o orçamento familiar. Buscam planejamento, previsibilidade e mais momentos juntos.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#E8E8E8] hover:shadow-md hover:border-[#FFCC80] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FFF0D6] flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#E68200]" />
              </div>
              <h3 className="font-bold text-[#2D2D2D] mb-2">Casais</h3>
              <p className="text-sm text-[#555555]">Sonham em <strong>conhecer novos destinos</strong> juntos, mas sempre adiam por causa dos custos. Querem transformar intenção em realidade.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#E8E8E8] hover:shadow-md hover:border-[#FFCC80] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#D4F5E9] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-[#06D6A0]" />
              </div>
              <h3 className="font-bold text-[#2D2D2D] mb-2">Viajantes frequentes</h3>
              <p className="text-sm text-[#555555]">Viajam várias vezes ao ano e querem <strong>economizar de verdade</strong> sem abrir mão de hotéis de qualidade e atendimento personalizado.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#E8E8E8] hover:shadow-md hover:border-[#FFCC80] transition-all">
              <div className="w-12 h-12 rounded-full bg-[#F0E4FF] flex items-center justify-center mb-4">
                <CalendarCheck className="w-6 h-6 text-[#8050C0]" />
              </div>
              <h3 className="font-bold text-[#2D2D2D] mb-2">Quem adia as férias</h3>
              <p className="text-sm text-[#555555]">Sempre diz "ano que vem eu viajo" mas nunca consegue. Com a Assinatura RDC, viajar entra no <strong>planejamento financeiro</strong> de forma leve e inteligente.</p>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Antes vs Depois */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 bg-[#D4F5E9] text-[#06D6A0] border-0">
              Transformação
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              A diferença de ter a Assinatura RDC
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              Descubra como a assinatura <strong>transforma sua forma de viajar</strong>
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Antes */}
            <div className="bg-[#F6F6F6] rounded-2xl p-6 md:p-8 border border-[#D6D6D6]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#999999]">Sem a Assinatura RDC</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#777777]">Férias adiadas ano após ano por falta de planejamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#777777]">Gastos imprevisíveis que comprometem o cartão de crédito</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#777777]">Horas pesquisando preços em dezenas de sites diferentes</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#777777]">Sem suporte humano — apenas chatbots e FAQs genéricos</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#777777]">Preços dinâmicos que mudam a cada busca</span>
                </li>
              </ul>
            </div>

            {/* Depois */}
            <div className="bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-6 md:p-8 border-2 border-[#FFCC80] shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4F5E9] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#06D6A0]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#2D2D2D]">Com a Assinatura RDC</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#06D6A0] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#404040]"><strong>Viagens programadas</strong> no calendário da família</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#06D6A0] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#404040]"><strong>Mensalidade</strong> que não compromete o limite do cartão</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#06D6A0] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#404040]"><strong>Agência dedicada</strong> que cuida de todo o planejamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#06D6A0] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#404040]"><strong>Atendimento humano</strong> por telefone, chat e WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#06D6A0] mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-[#404040]"><strong>Economia de até 60%</strong> nos melhores hotéis e resorts</span>
                </li>
              </ul>

              {/* Benefícios emocionais */}
              <div className="mt-6 pt-5 border-t border-[#FFCC80]/60">
                <p className="text-xs font-semibold text-[#E68200] uppercase tracking-wider mb-3">E o mais importante...</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-[#FF9100] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#404040]"><strong>Tempo de qualidade</strong> com quem você mais ama</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#FF9100] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#404040]"><strong>Memórias inesquecíveis</strong> que ficam para sempre</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Compass className="w-5 h-5 text-[#FF9100] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#404040]"><strong>Conhecer lugares novos</strong> e ampliar horizontes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[#FF9100] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#404040]"><strong>Reenergizar corpo e mente</strong> para voltar renovado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#FF9100] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-[#404040]"><strong>Fortalecer laços</strong> com a família e amigos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Como Funciona em 3 Passos */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] text-white overflow-hidden">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 bg-white/20 text-white border-0">
              Simples assim
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              Como funciona
            </h2>
            <p className="text-sm md:text-lg text-[#8ECAE6] max-w-2xl mx-auto">
              Em <strong>3 passos simples</strong> você começa a viajar com a Assinatura RDC
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
              {/* Linha conectora - desktop */}
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-[#FF9100]/50 via-[#FF9100] to-[#E68200]/50"></div>

              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF9100] flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-lg shadow-[#FF9100]/30 relative z-10">
                  <span className="text-2xl md:text-3xl font-bold">1</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6">
                  <CircleDollarSign className="w-8 h-8 text-[#FF9100] mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Escolha seu plano</h3>
                  <p className="text-[#8ECAE6] text-sm">Selecione a quantidade de diárias ideal para o seu perfil. Planos a partir de <strong>R$ 97,20/mês</strong>.</p>
                </div>
              </div>

              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF9100] flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-lg shadow-[#FF9100]/30 relative z-10">
                  <span className="text-2xl md:text-3xl font-bold">2</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6">
                  <Headphones className="w-8 h-8 text-[#FF9100] mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Planeje sua viagem</h3>
                  <p className="text-[#8ECAE6] text-sm">Monte tudo pelo <strong>Portal do Assinante</strong> no seu ritmo ou conte com nossa <strong>agência dedicada</strong> para cuidar de cada detalhe.</p>
                </div>
              </div>

              <div className="relative text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FF9100] flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-lg shadow-[#FF9100]/30 relative z-10">
                  <span className="text-2xl md:text-3xl font-bold">3</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6">
                  <Plane className="w-8 h-8 text-[#FF9100] mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Viaje com economia</h3>
                  <p className="text-[#8ECAE6] text-sm">Aproveite hotéis de <strong>4 e 5 estrelas</strong> com até 60% de economia. Suas diárias valem por 12 meses.</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 md:mt-10">
              <Button 
                size="lg" 
                className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full"
                onClick={scrollToPlans}
              >
                Escolher meu plano
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>



      {/* O que você recebe ao assinar */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-8 md:mb-14">
            <Badge className="mb-3 bg-[#FFF0D6] text-[#CC7400] border-0">
              Tudo incluso na sua assinatura
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              O que você recebe ao assinar
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              Cada plano da <strong className="text-[#2D2D2D]">Assinatura RDC</strong> inclui um pacote completo de benefícios para você viajar mais e melhor
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Diárias de hospedagem */}
            <div className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Diárias de Hospedagem</h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                De <strong className="text-[#2D2D2D]">2 a 7 diárias por ano</strong> em hotéis e resorts de todo o Brasil e exterior, com validade de 12 meses.
              </p>
            </div>

            {/* Tarifa especial */}
            <div className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BadgePercent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Tarifa Especial</h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                Acesso a <strong className="text-[#2D2D2D]">tarifas com até 60% de desconto</strong> em mais de 200 mil destinos — sem consumir suas diárias.
              </p>
            </div>

            {/* Portal do Assinante */}
            <div className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Portal do Assinante</h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                Plataforma exclusiva para pesquisar, comparar e <strong className="text-[#2D2D2D]">reservar suas viagens</strong> com autonomia e praticidade.
              </p>
            </div>

            {/* Agência dedicada */}
            <div className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ConciergeBell className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Agência Dedicada</h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                Equipe especializada para montar <strong className="text-[#2D2D2D]">roteiros personalizados</strong>, cuidar de passagens, transfers e cada detalhe da viagem.
              </p>
            </div>

            {/* Clube de Vantagens */}
            <div className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Clube de Vantagens</h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                <strong className="text-[#2D2D2D]">Descontos exclusivos</strong> em marcas parceiras de gastronomia, entretenimento, saúde, educação e muito mais.
              </p>
            </div>

            {/* Programa de Indicação */}
            <div className="group bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-5 md:p-6 border border-[#E8F4FA] hover:shadow-lg hover:border-[#FFB040] transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF9100] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">Programa de Indicação</h3>
              <p className="text-[#555555] text-sm leading-relaxed">
                Indique amigos e <strong className="text-[#2D2D2D]">acumule pontos</strong> para trocar por descontos em hospedagem, voos, carros e experiências.
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <Button 
              size="lg" 
              className="bg-[#001A9E] hover:bg-[#001070] text-white px-8 shadow-lg shadow-[#001A9E]/30"
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver planos e preços
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
        </AnimateOnScroll>
      </section>



      {/* Plans Section */}
      <section id="planos" className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              Escolha quantas diárias você quer por ano
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              A única diferença entre os planos é a <strong>quantidade de diárias</strong>. Todos incluem os mesmos serviços e benefícios.
            </p>
          </div>

          {/* Grid de planos — 3 colunas desktop, 2 mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const dailyCost = (plan.price / 30).toFixed(2).replace(".", ",");
              return (
                <div 
                  key={plan.id}
                  className={`relative rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    plan.recommended 
                      ? "bg-gradient-to-b from-[#FF9100] to-[#E68200] text-white shadow-lg shadow-[#FF9100]/25 ring-2 ring-[#FF9100] lg:scale-105 z-10" 
                      : "bg-white border border-[#D6D6D6] hover:border-[#8ECAE6]"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 bg-white text-[#E68200] text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        <Crown className="w-3 h-3" />
                        Mais popular
                      </span>
                    </div>
                  )}

                  <div className={`text-4xl md:text-5xl font-bold mb-0.5 ${plan.recommended ? "text-white" : "text-[#001A9E]"}`}>
                    {plan.days}
                  </div>
                  <div className={`text-xs md:text-sm font-semibold mb-3 md:mb-4 ${plan.recommended ? "text-[#FFF0D6]" : "text-[#777777]"}`}>
                    diárias/ano
                  </div>

                  <div className={`border-t mb-3 md:mb-4 ${plan.recommended ? "border-[#FF9100]/30" : "border-[#E8E8E8]"}`}></div>

                  <div className="mb-3 md:mb-4">
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className={`text-xs ${plan.recommended ? "text-[#FFCC80]" : "text-[#999999]"}`}>R$</span>
                      <span className={`text-2xl md:text-3xl font-bold ${plan.recommended ? "text-white" : "text-[#2D2D2D]"}`}>
                        {plan.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <p className={`text-xs ${plan.recommended ? "text-[#FFCC80]" : "text-[#999999]"}`}>/mês</p>
                    <div className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold ${
                      plan.recommended ? "bg-white/20 text-white" : "bg-[#F6F6F6] text-[#001A9E]"
                    }`}>
                      R$ {dailyCost}/dia
                    </div>
                  </div>

                  <Button 
                    className={`w-full text-xs md:text-sm ${
                      plan.recommended 
                        ? "bg-white text-[#E68200] hover:bg-[#FFF8EB] font-bold" 
                        : "bg-[#001A9E] hover:bg-[#001070] text-white"
                    }`}
                    size="sm"
                    onClick={() => window.open('https://rdcviagens.com.br/assinar', '_blank')}
                  >
                    Assinar agora
                  </Button>
                  <button 
                    className={`w-full mt-2 text-[10px] md:text-xs font-medium underline underline-offset-2 ${
                      plan.recommended ? "text-[#FFF0D6] hover:text-white" : "text-[#999999] hover:text-[#001A9E]"
                    } transition-colors`}
                    onClick={() => openSubscriptionModal(plan)}
                  >
                    Falar com consultor
                  </button>

                  <p className={`text-[9px] md:text-[10px] mt-2 ${plan.recommended ? "text-[#FFCC80]" : "text-[#999999]"}`}>
                    + adesão de R$ 880
                  </p>
                </div>
              );
            })}
          </div>

          {/* Benefícios inclusos em todos os planos */}
          <div className="mt-10 md:mt-14 max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E] border-0">
                <Check className="w-3 h-3 mr-1" />
                Incluso em todos os planos
              </Badge>
              <h3 className="text-lg md:text-xl font-bold text-[#2D2D2D]">
                Todos os planos incluem
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {sharedBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2.5 p-3 md:p-4 bg-white rounded-xl border border-[#E8E8E8] hover:border-[#8ECAE6] hover:shadow-sm transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F6F6F6] flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 text-[#001A9E]" />
                  </div>
                  <span className="text-xs md:text-sm text-[#404040] font-medium leading-tight">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        </AnimateOnScroll>
      </section>


      {/* Referral Program Banner */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-[#001A9E] to-[#001070]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#FF9100] flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Programa de Indicação</h3>
                <p className="text-[#C7E5F3] text-lg">
                  Indique amigos, <strong>acumule pontos</strong> e troque por descontos em hospedagem, voos, carros e mais!
                </p>
              </div>
            </div>
            <Link href="/programa-indicacao">
              <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white whitespace-nowrap">
                Quero indicar e ganhar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Comparison Table */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E] border-0">
              Comparativo
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              Por que escolher a Assinatura RDC?
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              Compare e descubra por que somos a <strong>escolha inteligente</strong> para quem quer viajar mais
            </p>
          </div>

          {/* Mobile: Cards com swipe */}
          <div className="lg:hidden">
            <Carousel
              setApi={setCompareApi}
              opts={{
                align: "center",
                loop: true,
                startIndex: 0,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {competitors.map((comp) => {
                  const criteria = [
                    { label: "Modelo", value: comp.model, type: "text" as const },
                    { label: "Previsibilidade", value: comp.predictability, type: comp.isRdc ? "success" as const : "text" as const },
                    { label: "Preços", value: comp.pricing, type: "text" as const },
                    { label: "Economia", value: comp.savings, type: comp.isRdc ? "highlight" as const : "text" as const },
                    { label: "Seu esforço", value: comp.effort, type: comp.isRdc ? "success" as const : "danger" as const },
                    { label: "Suporte", value: comp.support, type: comp.isRdc ? "success" as const : "text" as const },
                    { label: "Melhor para...", value: comp.bestFor, type: "text" as const },
                  ];

                  return (
                    <CarouselItem key={comp.name} className="pl-3 basis-[92%]">
                      <Card 
                        className={`overflow-hidden border-2 transition-shadow ${
                          comp.isRdc 
                            ? "border-[#FFB040] shadow-lg shadow-[#FFF0D6]" 
                            : "border-[#E8E8E8]"
                        }`}
                      >
                        {/* Card Header */}
                        <div className={`px-5 py-4 flex items-center justify-between ${
                          comp.isRdc 
                            ? "bg-gradient-to-r from-[#FF9100] to-[#E68200]" 
                            : "bg-[#F6F6F6]"
                        }`}>
                          <span className={`font-bold text-lg ${
                            comp.isRdc ? "text-white" : "text-[#2D2D2D]"
                          }`}>
                            {comp.name}
                          </span>
                          {comp.isRdc && (
                            <Badge className="bg-white text-[#E68200] border-0 text-xs font-semibold">
                              Recomendado
                            </Badge>
                          )}
                        </div>

                        {/* Card Body */}
                        <CardContent className="p-0">
                          {criteria.map((item, idx) => (
                            <div 
                              key={idx} 
                              className={`flex items-start justify-between gap-3 px-5 py-3 ${
                                idx < criteria.length - 1 ? "border-b border-[#E8E8E8]" : ""
                              } ${idx === criteria.length - 1 && comp.isRdc ? "bg-[#FFF8EB]" : ""}`}
                            >
                              <span className="text-sm font-medium text-[#777777] shrink-0 w-28">
                                {item.label}
                              </span>
                              <span className={`text-sm text-right ${
                                item.type === "success" 
                                  ? "text-[#06D6A0] font-semibold" 
                                  : item.type === "highlight" 
                                    ? "text-[#06D6A0] font-bold" 
                                    : item.type === "danger" 
                                      ? "text-[#EF4444]" 
                                      : comp.isRdc 
                                        ? "text-[#CC7400] font-semibold" 
                                        : "text-[#555555]"
                              }`}>
                                {item.type === "success" && <Check className="w-3.5 h-3.5 inline mr-1" />}
                                {item.type === "highlight" && <Sparkles className="w-3.5 h-3.5 inline mr-1" />}
                                {item.label === "Suporte" && comp.isRdc && <Headphones className="w-3.5 h-3.5 inline mr-1" />}
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>

            {/* Navigation: Setas + Dots */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => compareApi?.scrollPrev()}
                className="w-9 h-9 rounded-full border border-[#D6D6D6] flex items-center justify-center text-[#777777] hover:bg-[#F6F6F6] hover:text-[#404040] transition-colors"
                aria-label="Card anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: compareCount }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => compareApi?.scrollTo(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      idx === compareIndex
                        ? "w-7 h-2.5 bg-[#FF9100]"
                        : "w-2.5 h-2.5 bg-[#D6D6D6] hover:bg-[#999999]"
                    }`}
                    aria-label={`Ir para ${competitors[idx]?.name || `card ${idx + 1}`}`}
                  />
                ))}
              </div>

              <button
                onClick={() => compareApi?.scrollNext()}
                className="w-9 h-9 rounded-full border border-[#D6D6D6] flex items-center justify-center text-[#777777] hover:bg-[#F6F6F6] hover:text-[#404040] transition-colors"
                aria-label="Próximo card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Hint de swipe */}
            <p className="text-center text-xs text-[#999999] mt-3">
              Deslize para comparar
            </p>
          </div>

          {/* Desktop: Tabela comparativa */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-[#F6F6F6] border-b-2 border-[#D6D6D6] font-semibold text-[#404040]">
                    Critério
                  </th>
                  {competitors.map((comp) => (
                    <th 
                      key={comp.name} 
                      className={`p-4 text-center border-b-2 ${
                        comp.isRdc 
                          ? "bg-[#FFF8EB] border-[#FFB040]" 
                          : "bg-[#F6F6F6] border-[#D6D6D6]"
                      }`}
                    >
                      <span className={`font-bold ${comp.isRdc ? "text-[#E68200]" : "text-[#404040]"}`}>
                        {comp.name}
                      </span>
                      {comp.isRdc && (
                        <Badge className="ml-2 bg-[#FF9100] text-white border-0 text-xs">
                          Recomendado
                        </Badge>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">Modelo</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}
                    >
                      <span className={comp.isRdc ? "font-semibold text-[#CC7400]" : "text-[#555555]"}>
                        {comp.model}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">Previsibilidade</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}
                    >
                      {comp.isRdc ? (
                        <span className="inline-flex items-center gap-1 text-[#06D6A0] font-semibold">
                          <Check className="w-4 h-4" /> {comp.predictability}
                        </span>
                      ) : (
                        <span className="text-[#777777]">{comp.predictability}</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">Preços</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}
                    >
                      <span className={comp.isRdc ? "font-semibold text-[#CC7400]" : "text-[#555555]"}>
                        {comp.pricing}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">Economia</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}
                    >
                      {comp.isRdc ? (
                        <span className="inline-flex items-center gap-1 text-[#06D6A0] font-bold">
                          <Sparkles className="w-4 h-4" /> {comp.savings}
                        </span>
                      ) : (
                        <span className="text-[#777777]">{comp.savings}</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">Seu esforço</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}
                    >
                      {comp.isRdc ? (
                        <span className="inline-flex items-center gap-1 text-[#06D6A0] font-semibold">
                          <Check className="w-4 h-4" /> {comp.effort}
                        </span>
                      ) : (
                        <span className="text-[#EF4444]">{comp.effort}</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b border-[#E8E8E8] font-medium text-[#404040]">Suporte</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center border-b ${comp.isRdc ? "bg-[#FFF8EB]/50 border-orange-100" : "border-[#E8E8E8]"}`}
                    >
                      {comp.isRdc ? (
                        <span className="inline-flex items-center gap-1 text-[#06D6A0] font-semibold">
                          <Headphones className="w-4 h-4" /> {comp.support}
                        </span>
                      ) : (
                        <span className="text-[#777777]">{comp.support}</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-[#F6F6F6]">
                  <td className="p-4 font-medium text-[#404040]">Melhor para...</td>
                  {competitors.map((comp) => (
                    <td 
                      key={comp.name} 
                      className={`p-4 text-center ${comp.isRdc ? "bg-[#FFF0D6]" : ""}`}
                    >
                      <span className={comp.isRdc ? "font-bold text-[#CC7400]" : "text-[#555555]"}>
                        {comp.bestFor}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-[#F6F6F6] rounded-2xl border border-[#E8F4FA]">
            <p className="text-center text-[#001070]">
              <strong>Resumindo:</strong> O assinante RDC valoriza <strong>planejamento, previsibilidade e economia</strong>. 
               Se você quer viajar mais, investindo menos e com o suporte de quem entende do assunto, a Assinatura RDC é para você.
            </p>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Differentials Section */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070] text-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              Por que a Assinatura RDC é diferente
            </h2>
            <p className="text-sm md:text-lg text-[#8ECAE6] max-w-2xl mx-auto">
              Diferenciais que fazem da Assinatura RDC a <strong>escolha inteligente</strong> para suas jornadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {differentials.map((diff, index) => (
              <div key={index} className="flex gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF9100] flex items-center justify-center">
                    <diff.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2">{diff.title}</h3>
                  <p className="text-[#8ECAE6] text-xs md:text-sm">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Testimonials Section - Prova Social */}
      <section className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E] border-0">
              Depoimentos
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              O que nossos assinantes dizem
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              <strong>Milhões de diárias entregues</strong> e mais de <strong>35 anos de mercado</strong>. Pioneira em assinatura de viagens no Brasil.
            </p>
          </div>

          {/* Mobile: Carrossel de depoimentos */}
          <div className="lg:hidden">
            <Carousel
              setApi={setTestimonialsApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-3">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-3 basis-[85%] sm:basis-[60%]">
                    <Card className="bg-white border-0 shadow-md h-full">
                      <CardContent className="pt-5 pb-5">
                        <Quote className="w-6 h-6 text-[#FF9100] mb-3 opacity-50" />
                        <p className="text-sm text-[#404040] mb-4 italic leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-sm text-[#2D2D2D]">{testimonial.name}</p>
                            <p className="text-xs text-[#777777]">{testimonial.location}</p>
                            <p className="text-xs text-[#FF9100] font-medium">{testimonial.plan}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5 mt-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-[#FF9100] fill-yellow-400" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => testimonialsApi?.scrollPrev()}
                className="w-8 h-8 rounded-full border border-[#D6D6D6] flex items-center justify-center text-[#777777] hover:bg-[#F0F0F0]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: testimonialsCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => testimonialsApi?.scrollTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === testimonialsIndex ? "w-6 bg-[#FF9100]" : "w-2 bg-[#D6D6D6]"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => testimonialsApi?.scrollNext()}
                className="w-8 h-8 rounded-full border border-[#D6D6D6] flex items-center justify-center text-[#777777] hover:bg-[#F0F0F0]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop: Grid de depoimentos */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-[#FF9100] mb-4 opacity-50" />
                  <p className="text-[#404040] mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#2D2D2D]">{testimonial.name}</p>
                      <p className="text-sm text-[#777777]">{testimonial.location}</p>
                      <p className="text-xs text-[#FF9100] font-medium">{testimonial.plan}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FF9100] fill-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Agency Banner */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-[#00148A] to-[#001070]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <Badge className="mb-4 bg-[#FF9100] text-white border-0">
                Exclusivo para Assinantes
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                Sua agência de viagens dedicada
              </h2>
              <p className="text-[#8ECAE6] text-sm md:text-lg leading-relaxed">
                Como assinante RDC, você tem acesso a uma <strong>agência dedicada</strong> que cuida de cada detalhe: passagens, hospedagem, <strong>roteiros personalizados</strong>, transfers e muito mais.
              </p>
            </div>
            <Link href="/agencia">
              <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 whitespace-nowrap">
                Conhecer a agência
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-sm md:text-lg text-[#555555] max-w-2xl mx-auto">
              Tire suas dúvidas sobre a Assinatura RDC
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#D6D6D6]">
                <button
                  className="w-full py-5 flex items-center justify-between text-left hover:text-[#001A9E] transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-lg pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0 text-[#FF9100]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#999999]" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="pb-5 text-[#555555] animate-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3 md:mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-sm md:text-lg text-[#555555] mb-6 md:mb-8">
              Nossa equipe está pronta para ajudar você a encontrar o <strong>plano ideal</strong> para suas próximas jornadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8"
                onClick={() => openSubscriptionModal()}
              >
                Falar com um especialista
              </Button>
              <Button size="lg" variant="outline" className="border-[#001A9E] text-[#001A9E] hover:bg-[#F6F6F6] px-8">
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      <Footer />

      {/* Floating Buy Button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          showFloatingButton 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Button 
          size="lg"
          className="bg-[#FF9100] hover:bg-[#E68200] text-white shadow-lg shadow-[#FF9100]/30 rounded-full px-6 py-6 animate-pulse hover:animate-none"
          onClick={() => openSubscriptionModal()}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
              Quero conhecer os planos
        </Button>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal 
        open={modalOpen} 
        onOpenChange={setModalOpen}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
