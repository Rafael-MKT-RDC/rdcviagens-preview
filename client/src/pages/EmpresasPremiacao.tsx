import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Plane,
  Check,
  ArrowLeft,
  ArrowRight,
  Heart,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Target,
  ChevronDown,
  BarChart3,
  Percent,
  Zap,
  Shield,
  User,
  Mail,
  Phone,
  Building2,
  Hash,
  Briefcase,
  UserCheck,
  BadgeCheck,
  HandHeart
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePageDoc } from "@/hooks/usePageDoc";
import { RDStationForm } from "@/components/RDStationForm";

/*
 * Página RDC Premiação
 * Público-alvo: Diretores, Gestores de RH, Comercial, Marketing e Facilities
 * Tom: Estratégico, orientado a resultados, linguagem corporativa ampla
 */

const painPoints = [
  {
    icon: Users,
    title: "Engajamento em queda?",
    description: "Cada vez mais, empresas buscam novas formas de reconhecer e engajar — e viagens se destacam como uma das mais desejadas."
  },
  {
    icon: TrendingUp,
    title: "Dificuldade para criar campanhas?",
    description: "Campanhas de premiação tradicionais já não geram o mesmo engajamento. Viagens vêm se consolidando como uma opção versátil, que engaja, gera valor e cria experiências memoráveis."
  },
  {
    icon: Award,
    title: "Premiações diferenciadas?",
    description: "Viagens como ferramenta de incentivo para engajar públicos, incentivar resultados e fortalecer relacionamentos com colaboradores, clientes e parceiros."
  },
  {
    icon: Target,
    title: "Resultados mensuráveis?",
    description: "A sua empresa pode medir o impacto real das campanhas de incentivo com viagens — um business case sólido para áreas como RH, Marketing e Comercial."
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Engajamento e Resultados",
    description: "Viagens criam vínculo emocional e geram impacto real nos indicadores da empresa. Uma ferramenta de incentivo que colaboradores, clientes e parceiros valorizam."
  },
  {
    icon: UserCheck,
    title: "Employer Branding",
    description: "Posicione sua empresa como referência. Viagens como incentivo diferenciam sua marca no mercado e fortalecem relacionamentos."
  },
  {
    icon: Zap,
    title: "Produtividade e Bem-estar",
    description: "Premiados que viajam retornam mais motivados, criativos e produtivos. Investir em experiências é investir em performance."
  },
  {
    icon: HandHeart,
    title: "Versatilidade",
    description: "Ideal para campanhas de incentivo, premiação por metas, reconhecimento e qualquer iniciativa que busque engajar públicos e impulsionar resultados."
  }
];

const features = [
  {
    title: "1. A empresa adquire créditos",
    description: "A empresa adquire créditos junto à RDC, ou seja, o valor que deseja distribuir. Sem mensalidade, sem taxa de adesão.",
    items: [
      "Sem custos fixos",
      "Valor flexível conforme a campanha",
      "Distribuição em lote ou individual",
      "Implementação simples e sem burocracia"
    ]
  },
  {
    title: "2. Defina os premiados",
    description: "A empresa define os beneficiários dos créditos, em lote ou individualmente. Controle e gestão simples, com relatórios.",
    items: [
      "Área exclusiva para gestão dos pontos",
      "Distribuição com total autonomia",
      "Relatórios de acompanhamento",
      "Gestão centralizada e simplificada"
    ]
  },
  {
    title: "3. Premiados viajam",
    description: "Os premiados recebem os créditos em pontos e acesso à plataforma de Turismo RDC, com autonomia para realizar reservas.",
    items: [
      "Acesso a mais de 200 mil hotéis no Brasil e no exterior",
      "Opções de hotéis para todos os estilos de viagem",
      "Flexibilidade para viajar quando, como e com quem quiser",
      "Apoio ao premiado em todas as etapas da viagem"
    ]
  }
];

const marketStats = [
  {
    icon: Percent,
    value: "112%",
    label: "de ROI",
    description: "Programas de viagem de incentivo bem estruturados produzem retorno de 112% sobre o investimento.",
    source: "Incentive Research Foundation",
    url: "https://theirf.org/"
  },
  {
    icon: TrendingUp,
    value: "+18%",
    label: "produtividade",
    description: "Aumento médio na produtividade em empresas com programas de viagem como incentivo.",
    source: "Incentive Research Foundation",
    url: "https://theirf.org/"
  },
  {
    icon: BarChart3,
    value: "3x",
    label: "mais impacto",
    description: "Viagens como incentivo geram 3x mais impacto motivacional do que premiações tradicionais em dinheiro.",
    source: "Aberdeen Research",
    url: "https://www.aberdeen.com/"
  },
  {
    icon: Heart,
    value: "96%",
    label: "motivação",
    description: "Dos colaboradores premiados com viagens se sentiram motivados pela oportunidade oferecida.",
    source: "SITE Research",
    url: "https://siteglobal.com/research/"
  }
];

const faqs = [
  {
    question: "Como funciona o RDC Premiação?",
    answer: "O RDC Premiação funciona por créditos: sua empresa adquire o valor que deseja distribuir, define os beneficiários (em lote ou individualmente), e os premiados recebem os créditos em pontos com acesso à plataforma de Turismo RDC. A empresa tem uma área exclusiva para gestão dos pontos e distribuição com total autonomia."
  },
  {
    question: "Qual o investimento para implementar?",
    answer: "O RDC Premiação não tem custos fixos — sem mensalidade e sem taxa de adesão. A empresa adquire créditos conforme o valor que deseja distribuir nas campanhas ou ações. Solicite uma proposta para receber valores detalhados de acordo com a sua necessidade."
  },
  {
    question: "Para quais áreas da empresa o programa é indicado?",
    answer: "O RDC Premiação é uma solução versátil indicada para diversas áreas: RH (retenção e reconhecimento), Marketing (campanhas de engajamento), Comercial (incentivo a vendas e parceiros) e Facilities. Qualquer área que busque engajar públicos e impulsionar resultados pode utilizar."
  },
  {
    question: "Como os premiados utilizam os créditos?",
    answer: "Os premiados acessam a plataforma de Turismo RDC onde podem pesquisar e reservar hospedagem em mais de 200 mil hotéis no Brasil e no exterior, com opções para todos os estilos de viagem. Têm flexibilidade para viajar quando, como e com quem quiserem, com apoio em todas as etapas."
  },
  {
    question: "A empresa tem controle sobre a distribuição dos créditos?",
    answer: "Sim! A empresa tem acesso a uma área exclusiva para gestão dos pontos e distribuição com total autonomia. O controle é simples, com relatórios de acompanhamento para monitorar as campanhas e ações de incentivo."
  },
  {
    question: "Quer transformar a forma de conceder incentivos?",
    answer: "Converse com nossa equipe de consultoria corporativa. Vamos entender o cenário da sua empresa e apresentar uma proposta personalizada para suas campanhas de incentivo com viagens — uma solução que engaja, gera valor e cria experiências memoráveis."
  }
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#D6D6D6] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F6F6F6] transition-colors"
      >
        <span className="font-medium text-[#2D2D2D] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#777777] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-[#555555] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
};

const maskCNPJ = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0,2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8)}`;
  return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8,12)}-${digits.slice(12,14)}`;
};

export default function EmpresasPremiacao() {
  const c = usePageDoc<any>('paginaPremiacao');
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    cnpj: '',
    email: '',
    celular: '',
    cargo: '',
    numColaboradores: '',
    objetivo: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.empresa || !formData.email || !formData.celular) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.");
      setFormData({ nome: '', empresa: '', cnpj: '', email: '', celular: '', cargo: '', numColaboradores: '', objetivo: '', mensagem: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Premiação | Incentivo com Viagens"
        description="Viagens como ferramenta de incentivo corporativo para engajar colaboradores, clientes e parceiros. Solução completa para RH e Marketing. Conheça os benefícios!"
        keywords="premiação corporativa viagens, incentivo colaboradores, campanha incentivo, engajamento corporativo, RDC premiação, viagens como prêmio, incentivo vendas"
        canonical="/solucoes-corporativas/premiacao"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "RDC Premiação",
          "provider": { "@type": "Organization", "name": "RDC Viagens" },
          "description": "Viagens como ferramenta de incentivo corporativo para engajar públicos e impulsionar resultados.",
          "serviceType": "Premiação e Incentivo Corporativo"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/GimvoAfcHdbhLYXE.jpg" 
            alt="RDC Premiação"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/80 to-[#082B41]/60"></div>
        </div>
        
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Soluções Corporativas
            </Button>
          </Link>
          
          <div className="max-w-3xl">
            <img src="/logos/b2b/logo-premiacao.svg" 
              alt="RDC Premiação" 
              className="h-14 md:h-18 w-auto mb-6 drop-shadow-lg" 
            />
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#FF9100] text-[#2D2D2D] border-0">
              <Plane className="w-4 h-4 mr-2" />
              {c.heroBadge ?? "Incentivo Corporativo"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {c.heroTitulo ?? "Viagens que transformam"}{" "}
              <span className="text-[#FF9100]">{c.heroDestaque ?? "resultados"}</span>
            </h1>
            <p className="text-xl text-[#F6F6F6] mb-4">
              Uma solução estratégica para áreas como <strong className="text-white">RH, Marketing e Comercial</strong> que buscam 
              engajar públicos e impulsionar resultados com colaboradores, clientes e parceiros.
            </p>
            <p className="text-lg text-[#F6F6F6] mb-8">
              Viagens como <strong>ferramenta de incentivo</strong> — engaje, gere valor e crie experiências memoráveis.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#FF9100] hover:bg-[#FF9100] text-[#2D2D2D] px-8 rounded-full"
                onClick={() => { const l = c.heroCtaLink ?? "#formulario-premiacao"; if (l.startsWith("#")) document.getElementById(l.slice(1))?.scrollIntoView({ behavior: "smooth" }); else if (/^https?:\/\//.test(l)) window.open(l, "_blank"); else window.location.assign(l); }}
              >
                {c.heroCta ?? "Solicitar proposta"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points - Desafios do RH */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">
              Desafios Corporativos
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Sua empresa enfrenta esses desafios?
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Se a resposta for sim para algum desses pontos, o <strong>RDC Premiação</strong> 
              é a solução que faltava para engajar públicos, incentivar resultados e fortalecer relacionamentos.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4">
                    <point.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Market Stats Section - Números de Mercado */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-[#FF9100]/20 text-[#FF9100] border-0">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dados de Mercado
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Números que comprovam: viagens são o melhor incentivo
            </h2>
            <p className="text-lg text-[#F6F6F6] max-w-2xl mx-auto">
              Pesquisas internacionais mostram que <strong>viagens como premiação</strong> geram resultados 
              superiores a qualquer outro tipo de recompensa — dados essenciais para o business case de áreas como RH, Marketing e Comercial.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {marketStats.map((stat, index) => (
              <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-[#FF9100]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#FF9100] font-medium mb-3">
                    {stat.label}
                  </div>
                  <p className="text-[#F6F6F6] text-sm leading-relaxed mb-3">
                    {stat.description}
                  </p>
                  <a
                    href={stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FF9100]/70 italic hover:text-[#FF9100] transition-colors underline underline-offset-2"
                  >
                    Fonte: {stat.source}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#FF9100] text-sm max-w-3xl mx-auto">
              Colaboradores premiados com viagens relatam <strong className="text-white">maior senso de valorização</strong>{" "}
              e <strong className="text-white">aumento no sentimento de lealdade à empresa</strong> — indicadores que impactam diretamente 
              o NPS e os indicadores que sua empresa acompanha.
            </p>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Impacto para sua empresa
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Resultados que a sua empresa pode medir
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              O RDC Premiação gera impacto nos <strong>KPIs que mais importam</strong> 
              para as frentes de incentivo da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">
              <Target className="w-4 h-4 mr-2" />
              Como funciona
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Implementação simples e sem custos fixos
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Uma solução completa que proporciona <strong>autonomia na gestão, com máxima simplicidade operacional</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-10 h-10 rounded-full bg-[#FF9100] text-[#2D2D2D] flex items-center justify-center font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#555555] mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" />
                        <span className="text-[#404040] text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Formulário de Contato */}
      <section id="formulario-premiacao" className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">
                <Plane className="w-4 h-4 mr-2" />
                Solicite uma proposta
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
                Leve o RDC Premiação para sua empresa
              </h2>
              <p className="text-lg text-[#555555]">
                Preencha o formulário e nossa <strong>equipe de consultoria corporativa</strong> entrará em contato 
                para apresentar uma proposta personalizada para sua empresa.
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {c.formRdId ? (
                  <div className="rdc-rd-form space-y-5">
                    <RDStationForm formId={c.formRdId} token="UA-7667371-1" />
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Nome */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        Nome completo <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          placeholder="Seu nome completo"
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Empresa */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        Empresa <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <input
                          type="text"
                          required
                          value={formData.empresa}
                          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                          placeholder="Nome da empresa"
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* CNPJ */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        CNPJ
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <input
                          type="text"
                          value={formData.cnpj}
                          onChange={(e) => setFormData({ ...formData, cnpj: maskCNPJ(e.target.value) })}
                          placeholder="00.000.000/0000-00"
                          maxLength={18}
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        E-mail corporativo <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@empresa.com.br"
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Celular */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        Celular / WhatsApp <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <input
                          type="tel"
                          required
                          value={formData.celular}
                          onChange={(e) => setFormData({ ...formData, celular: maskPhone(e.target.value) })}
                          placeholder="(11) 99999-9999"
                          maxLength={15}
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Cargo */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        Cargo
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <select
                          value={formData.cargo}
                          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors appearance-none bg-white"
                        >
                          <option value="">Selecione seu cargo</option>
                          <option value="CHRO / VP de RH">CHRO / VP de RH</option>
                          <option value="Diretor(a) de RH">Diretor(a) de RH</option>
                          <option value="Gerente de RH">Gerente de RH</option>
                          <option value="Coordenador(a) de RH">Coordenador(a) de RH</option>
                          <option value="Analista de RH">Analista de RH</option>
                          <option value="Business Partner">Business Partner</option>
                          <option value="Gestor(a) de Benefícios">Gestor(a) de Benefícios</option>
                          <option value="CEO / Diretor Geral">CEO / Diretor Geral</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Número de colaboradores */}
                  <div>
                    <label className="block text-sm font-medium text-[#404040] mb-2">
                      Número de colaboradores
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                      <select
                        value={formData.numColaboradores}
                        onChange={(e) => setFormData({ ...formData, numColaboradores: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors appearance-none bg-white"
                      >
                        <option value="">Selecione</option>
                        <option value="1-10">1 a 10</option>
                        <option value="11-50">11 a 50</option>
                        <option value="51-100">51 a 100</option>
                        <option value="101-500">101 a 500</option>
                        <option value="500+">Mais de 500</option>
                      </select>
                    </div>
                  </div>

                  {/* Objetivo */}
                  <div>
                    <label className="block text-sm font-medium text-[#404040] mb-2">
                      Principal objetivo
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                      <select
                        value={formData.objetivo}
                        onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors appearance-none bg-white"
                      >
                        <option value="">Selecione o objetivo principal</option>
                        <option value="Benefício para colaboradores">Benefício para colaboradores</option>
                        <option value="Campanha de incentivo / premiação">Campanha de incentivo / premiação</option>
                        <option value="Retenção de talentos">Retenção de talentos</option>
                        <option value="Employer branding">Employer branding</option>
                        <option value="Premiação por metas">Premiação por metas</option>
                        <option value="Reconhecimento de tempo de casa">Reconhecimento de tempo de casa</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-sm font-medium text-[#404040] mb-2">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Conte-nos mais sobre as necessidades da sua empresa..."
                      rows={4}
                      className="w-full px-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-[#FF9100] hover:bg-[#FF9100] text-[#2D2D2D] py-4 rounded-2xl text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Solicitar proposta gratuita
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-[#777777] text-center">
                    Ao enviar, você concorda com nossa política de privacidade.
                    Seus dados são protegidos e não serão compartilhados.
                  </p>
                </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Dúvidas frequentes
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Respostas para as <strong>principais perguntas sobre o programa</strong> de incentivo com viagens
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41] text-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Plane className="w-16 h-16 text-[#FF9100] mx-auto mb-6" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              {c.ctaTitulo ?? "Pronto para transformar a forma de conceder incentivos?"}
            </h2>
            <p className="text-lg text-[#F6F6F6] mb-8">
              Converse com nossa equipe de consultoria corporativa e descubra como o <strong>RDC Premiação</strong> 
              pode engajar públicos e impulsionar resultados na sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#FF9100] hover:bg-[#FF9100] text-[#2D2D2D] px-8"
                onClick={() => { const l = c.ctaBotaoLink ?? "#formulario-premiacao"; if (l.startsWith("#")) document.getElementById(l.slice(1))?.scrollIntoView({ behavior: "smooth" }); else if (/^https?:\/\//.test(l)) window.open(l, "_blank"); else window.location.assign(l); }}
              >
                {c.ctaBotao ?? "Solicitar proposta"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      <Footer />
    </div>
  );
}
