import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Shield, Eye, Compass, Lightbulb, Search, Rocket, Award, Plane, Building2, Users, TrendingUp, Star, Globe, Handshake, Trophy, ChevronLeft, ChevronRight, HandHeart } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePageDoc } from "@/hooks/usePageDoc";

const timeline = [
  {
    year: "1991",
    title: "Fundação",
    description: "Início das atividades e criação da RDC.",
    icon: Rocket,
    accent: "blue" as const
  },
  {
    year: "1993–1994",
    title: "Primeira grande virada",
    description: "Lançamento da primeira Assinatura de Viagens RDC e lançamento do Projeto Caixatur. Escala inicial: +4.000 assinantes, +150 hotéis, +30 mil diárias atendidas.",
    icon: TrendingUp,
    accent: "orange" as const
  },
  {
    year: "1997",
    title: "Parcerias de peso",
    description: "Convênio RDC–FENAG e parceria com o Banco da Amazônia (Plano Amazônia Férias).",
    icon: Handshake,
    accent: "blue" as const
  },
  {
    year: "2001–2002",
    title: "Inovação + reconhecimento",
    description: "Criação do Viaje Bem pelo Brasil (plano + passagem aérea) e parceria RDC + Vasp. Prêmio Top de Turismo (ADVB).",
    icon: Plane,
    accent: "orange" as const
  },
  {
    year: "2008",
    title: "Consolidação de escala",
    description: "RDC chega a +40 mil assinantes.",
    icon: Users,
    accent: "blue" as const
  },
  {
    year: "2009",
    title: "Agência do assinante",
    description: "RDC Viagens se firma como agência do assinante.",
    icon: Building2,
    accent: "orange" as const
  },
  {
    year: "2017",
    title: "Novo patamar",
    description: "RDC ultrapassa +70 mil assinantes e +100 mil diárias entregues.",
    icon: TrendingUp,
    accent: "blue" as const
  },
  {
    year: "2019",
    title: "Reposicionamento",
    description: "Evolução para Assinatura de Viagens RDC (\u201CA Assinatura do Viajante\u201D).",
    icon: Star,
    accent: "orange" as const
  },
  {
    year: "2019",
    title: "Excelência reconhecida",
    description: "Conquista do selo RA 1000 (Reclame Aqui).",
    icon: Trophy,
    accent: "blue" as const
  },
  {
    year: "2022",
    title: "Marco histórico",
    description: "RDC atinge: +100 mil assinantes, +70 mil reservas, +250 mil diárias utilizadas, +2 mil hotéis parceiros, +400 cidades atendidas, +400 RDCLovers.",
    icon: Globe,
    accent: "orange" as const
  }
];

const values = [
  { icon: Shield, title: "Confiança", description: <>Construímos <strong className="text-[#2D2D2D]">relações de confiança</strong> com assinantes, parceiros e colaboradores, <strong className="text-[#2D2D2D]">honrando cada compromisso</strong> e garantindo <strong className="text-[#2D2D2D]">segurança</strong> em todas as etapas da jornada.</> },
  { icon: Lightbulb, title: "Inovação", description: <>Inovamos continuamente para <strong className="text-[#2D2D2D]">simplificar e elevar a experiência de viagem</strong>, trazendo <strong className="text-[#2D2D2D]">novas ideias, tecnologias</strong> e formas de trabalhar que tornam cada jornada mais acessível, prática e inesquecível.</> },
  { icon: Search, title: "Transparência", description: <>Agimos com <strong className="text-[#2D2D2D]">honestidade e clareza</strong>, compartilhando informações de <strong className="text-[#2D2D2D]">forma aberta</strong> para que assinantes, parceiros e colaboradores saibam exatamente o que esperar em cada etapa da jornada.</> },
  { icon: HandHeart, title: "Cuidar de Pessoas", description: <>Colocamos <strong className="text-[#2D2D2D]">pessoas no centro</strong> de tudo que fazemos, tratando cada <strong className="text-[#2D2D2D]">assinante, colaborador e parceiro</strong> com atenção, empatia e respeito — porque acreditamos que uma <strong className="text-[#2D2D2D]">viagem inesquecível</strong> começa no <strong className="text-[#2D2D2D]">cuidado genuíno</strong> com quem está ao nosso lado em cada etapa da jornada.</> }
];

function TimelineScroller({ items }: { items: typeof timeline }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollToItem = (index: number) => {
    setActiveIndex(index);
    const el = scrollRef.current;
    if (!el) return;
    const children = el.children;
    if (children[index]) {
      const child = children[index] as HTMLElement;
      const scrollPosition = child.offsetLeft - el.offsetLeft - (el.clientWidth / 2) + (child.clientWidth / 2);
      el.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  const scrollByDirection = (direction: 'left' | 'right') => {
    const newIndex = direction === 'right'
      ? Math.min(activeIndex + 1, items.length - 1)
      : Math.max(activeIndex - 1, 0);
    scrollToItem(newIndex);
  };

  return (
    <div className="relative">
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByDirection('left')}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-[#D6D6D6] items-center justify-center hover:bg-[#F6F6F6] hover:border-[#8ECAE6] transition-all duration-200"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-[#001A9E]" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollByDirection('right')}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-[#D6D6D6] items-center justify-center hover:bg-[#F6F6F6] hover:border-[#8ECAE6] transition-all duration-200"
          aria-label="Próximo"
        >
          <ChevronRight className="w-6 h-6 text-[#001A9E]" />
        </button>
      )}

      {/* Fade edges */}
      {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F6F6F6] to-transparent z-10 pointer-events-none" />}
      {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F6F6F6] to-transparent z-10 pointer-events-none" />}

      {/* Timeline track */}
      <div
        ref={scrollRef}
        className="flex gap-0 overflow-x-auto pb-6 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          const isBlue = item.accent === 'blue';

          return (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
              onClick={() => scrollToItem(index)}
            >
              {/* Year marker row */}
              <div className="relative flex flex-col items-center">
                {/* Year badge */}
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                  ? (isBlue ? 'bg-[#001A9E] text-white shadow-lg shadow-[#001A9E]/30' : 'bg-[#FF9100] text-white shadow-lg shadow-[#FF9100]/30')
                  : 'bg-[#F0F0F0] text-[#777777] group-hover:bg-[#D6D6D6]'
                }`}>
                  {item.year}
                </div>

                {/* Connector line + dot */}
                <div className="flex flex-col items-center my-3">
                  <div className={`w-0.5 h-5 transition-colors duration-300 ${isActive ? (isBlue ? 'bg-[#00B4D8]' : 'bg-[#FF9100]') : 'bg-[#D6D6D6]'}`} />
                  <div className={`w-4 h-4 rounded-full border-[3px] transition-all duration-300 ${isActive
                    ? (isBlue ? 'border-[#001A9E] bg-[#E8F4FA] scale-125' : 'border-[#FF9100] bg-[#FFF0D6] scale-125')
                    : 'border-[#D6D6D6] bg-white group-hover:border-[#999999]'
                  }`} />
                  <div className={`w-0.5 h-5 transition-colors duration-300 ${isActive ? (isBlue ? 'bg-[#00B4D8]' : 'bg-[#FF9100]') : 'bg-[#D6D6D6]'}`} />
                </div>
              </div>

              {/* Content card */}
              <div className={`mx-2 rounded-2xl px-5 py-4 transition-all duration-300 border min-h-[150px] flex flex-col ${isActive
                ? (isBlue
                  ? 'bg-[#F6F6F6] border-[#8ECAE6] shadow-lg shadow-blue-100/50'
                  : 'bg-[#FFF8EB] border-[#FFCC80] shadow-lg shadow-[#FFF0D6]/50')
                : 'bg-[#F6F6F6]/80 border-[#E8E8E8] group-hover:bg-white group-hover:border-[#D6D6D6] group-hover:shadow-md'
              }`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive
                    ? (isBlue ? 'bg-[#001A9E] text-white' : 'bg-[#FF9100] text-white')
                    : 'bg-[#D6D6D6]/80 text-[#999999] group-hover:bg-[#D6D6D6]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className={`font-bold text-[15px] leading-snug transition-colors duration-300 ${isActive
                    ? (isBlue ? 'text-[#001070]' : 'text-[#CC7400]')
                    : 'text-[#2D2D2D]'
                  }`}>
                    {item.title}
                  </h3>
                </div>
                <div className={`w-8 h-[2px] rounded-full mb-3 transition-colors duration-300 ${isActive
                  ? (isBlue ? 'bg-[#00B4D8]' : 'bg-[#FF9100]')
                  : 'bg-[#D6D6D6]'
                }`} />
                <p className={`text-[13px] leading-[1.7] transition-colors duration-300 flex-1 ${isActive ? 'text-[#404040]' : 'text-[#777777]'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToItem(index)}
            className={`rounded-full transition-all duration-300 ${index === activeIndex
              ? (item.accent === 'blue' ? 'w-8 h-2.5 bg-[#001A9E]' : 'w-8 h-2.5 bg-[#FF9100]')
              : 'w-2.5 h-2.5 bg-[#D6D6D6] hover:bg-[#999999]'
            }`}
            aria-label={`Ir para ${item.year}`}
          />
        ))}
      </div>

      <p className="text-center text-sm text-[#999999] mt-3 flex items-center justify-center gap-2">
        <ChevronLeft className="w-3.5 h-3.5" />
        Deslize para explorar
        <ChevronRight className="w-3.5 h-3.5" />
      </p>
    </div>
  );
}

export default function Sobre() {
  const c = usePageDoc<any>('paginaSobre');
  const timelineData = timeline.map((tl, i) => ({ ...tl, ...(c.timeline?.[i] ?? {}) }));
  const valuesData = values.map((v, i) => ({ ...v, ...(c.valores?.[i] ?? {}) }));
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Sobre Nós | +35 Anos de Experiência em Viagens"
        description="Há mais de 35 anos democratizando o acesso a viagens de qualidade no Brasil. Pioneira em assinatura de viagens, com mais de 1 milhão de diárias entregues."
        keywords="sobre RDC Viagens, história RDC Viagens, empresa de turismo Brasil, assinatura viagens pioneira, quem somos RDC, valores RDC"
        canonical="/sobre"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Sobre a RDC Viagens",
          "description": "Mais de 35 anos democratizando o acesso a viagens de qualidade no Brasil.",
          "mainEntity": {
            "@type": "Organization",
            "name": "RDC Viagens",
            "foundingDate": "1991",
            "numberOfEmployees": { "@type": "QuantitativeValue", "value": 400 },
            "slogan": "Transformamos intenção em jornada"
          }
        }}
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#FF9100] text-white border-0">{c.heroBadge ?? "Sobre a RDC"}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {c.heroTitulo ?? "Nossa História"}
            </h1>
            <p className="text-xl text-[#C7E5F3]">{c.heroSubtitulo ?? "Há mais de 35 anos transformando o sonho de viajar em realidade para milhares de famílias brasileiras."}</p>
          </div>
        </div>
      </section>

      {/* Sobre a empresa - texto expandido */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">{c.quemBadge ?? "Quem Somos"}</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-8">
              {c.quemTitulo ?? "A pioneira em assinatura de viagens no Brasil"}
            </h2>
            <div className="space-y-5 text-[#555555] text-lg leading-relaxed">
              <p>{c.quemParagrafo1 ?? "Fundada em 1991, a RDC Viagens nasceu com uma ideia simples e transformadora: tornar viagens de qualidade acessíveis para todos os brasileiros. Fomos a primeira empresa do país a criar o conceito de assinatura de viagens, permitindo que famílias planejem suas férias com economia, previsibilidade e acesso a hospedagem nos melhores hotéis e resorts."}</p>
              <p>{c.quemParagrafo2 ?? "Ao longo de mais de três décadas, construímos uma trajetória marcada por inovação, parcerias estratégicas e um compromisso genuíno com a satisfação dos nossos assinantes. Da primeira Assinatura de Viagens RDC em 1993 ao marco de mais de 100 mil assinantes em 2022, cada etapa da nossa história reflete a busca constante por oferecer experiências que vão além da hospedagem."}</p>
              <p>{c.quemParagrafo3 ?? "Hoje, a RDC Viagens é muito mais do que uma empresa de turismo. Somos um ecossistema completo de soluções de viagem que atende tanto famílias quanto empresas, com uma agência dedicada, um clube de vantagens exclusivo, programas de premiação corporativa e uma rede de mais de 2 mil hotéis parceiros em mais de 400 cidades."}</p>
            </div>

            {/* Números em destaque */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 md:mt-12">
              <div className="text-center p-3 md:p-4 rounded-2xl bg-[#F6F6F6]">
                <span className="text-2xl md:text-3xl font-bold text-[#001A9E] block">{c.quemStats?.[0]?.value ?? "+35"}</span>
                <span className="text-xs md:text-sm text-[#555555]">{c.quemStats?.[0]?.label ?? "Anos de história"}</span>
              </div>
              <div className="text-center p-3 md:p-4 rounded-2xl bg-[#FFF8EB]">
                <span className="text-2xl md:text-3xl font-bold text-[#E68200] block">{c.quemStats?.[1]?.value ?? "+100 mil"}</span>
                <span className="text-xs md:text-sm text-[#555555]">{c.quemStats?.[1]?.label ?? "Assinantes"}</span>
              </div>
              <div className="text-center p-3 md:p-4 rounded-2xl bg-[#F6F6F6]">
                <span className="text-2xl md:text-3xl font-bold text-[#001A9E] block">{c.quemStats?.[2]?.value ?? "+2 mil"}</span>
                <span className="text-xs md:text-sm text-[#555555]">{c.quemStats?.[2]?.label ?? "Hotéis parceiros"}</span>
              </div>
              <div className="text-center p-3 md:p-4 rounded-2xl bg-[#FFF8EB]">
                <span className="text-2xl md:text-3xl font-bold text-[#E68200] block">{c.quemStats?.[3]?.value ?? "+400"}</span>
                <span className="text-xs md:text-sm text-[#555555]">{c.quemStats?.[3]?.label ?? "Cidades atendidas"}</span>
              </div>
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
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">{c.timelineBadge ?? "Linha do Tempo"}</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">{c.timelineTitulo ?? "Fatos Marcantes"}</h2>
            <p className="text-[#555555] mt-3 max-w-2xl mx-auto">{c.timelineSubtitulo ?? "Mais de três décadas de conquistas, inovação e compromisso com o viajante brasileiro."}</p>
          </div>

          <TimelineScroller items={timelineData} />
        </div>
        </AnimateOnScroll>
      </section>

      {/* Propósito - destaque especial */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070] text-white">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[#FF9100]/20 flex items-center justify-center mx-auto mb-6">
              <Compass className="w-10 h-10 text-[#FF9100]" />
            </div>
            <Badge className="mb-4 bg-[#FF9100]/20 text-[#FFB040] border-0">{c.propositoBadge ?? "Nosso Propósito"}</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
              {c.propositoTitulo ?? "Realizar o sonho de cada viajante"}
            </h2>
            <p className="text-xl text-[#C7E5F3] leading-relaxed">{c.propositoTexto ?? "Realizar o sonho de cada viajante, proporcionando experiências inesquecíveis com conforto, planejamento e economia."}</p>
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
                <div className="w-14 h-14 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#001A9E]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">{c.missaoTitulo ?? "Missão"}</h3>
                <p className="text-[#555555] leading-relaxed">{c.missaoTexto ?? "Transformar o sonho de viajar em realidade para todos, oferecendo soluções acessíveis, confortáveis e bem planejadas, com opções práticas e econômicas para assinantes, empresas e parceiros, criando experiências inesquecíveis em cada viagem."}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-full bg-[#FFF0D6] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#E68200]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">{c.visaoTitulo ?? "Visão"}</h3>
                <p className="text-[#555555] leading-relaxed">{c.visaoTexto ?? "Ser a marca líder em soluções de viagem acessíveis e transformadoras, alcançando até 2030 R$ 1 bilhão em faturamento, 1 milhão de assinantes e 1 milhão de diárias vendidas, gerando um impacto positivo e duradouro na vida das pessoas."}</p>
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
            <Badge className="mb-4 bg-[#FFF0D6] text-[#E68200] border-0">{c.valoresBadge ?? "O que nos guia"}</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D]">{c.valoresTitulo ?? "Nossos Valores"}</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {valuesData.map((value, index) => {
                const colors = [
                  { bg: 'bg-[#E8F4FA]', icon: 'text-[#001A9E]', border: 'border-t-[#001A9E]' },
                  { bg: 'bg-[#FFF0D6]', icon: 'text-[#E68200]', border: 'border-t-[#FF9100]' },
                  { bg: 'bg-[#E8F4FA]', icon: 'text-[#001A9E]', border: 'border-t-[#00B4D8]' },
                  { bg: 'bg-[#FFF0D6]', icon: 'text-[#E68200]', border: 'border-t-[#FF9100]' },
                ];
                const c = colors[index];
                return (
                  <Card key={index} className={`border-0 border-t-4 ${c.border} shadow-md hover:shadow-xl transition-all duration-300 bg-white group`}>
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className={`w-7 h-7 ${c.icon}`} />
                      </div>
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

      {/* Trust Badges */}
      <TrustBadges />

      <Footer />
    </div>
  );
}
