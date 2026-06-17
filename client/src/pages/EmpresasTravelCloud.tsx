import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Cloud,
  Check,
  ArrowLeft,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Users,
  Building2,
  Layers,
  Puzzle,
  HeadphonesIcon,
  BarChart3,
  Wallet,
  Target,
  ChevronDown,
  User,
  Mail,
  Phone,
  Hash,
  Briefcase,
  CreditCard,
  Smartphone,
  Award,
  Heart,
  TrendingUp,
  Settings
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const useCases = [
  {
    icon: Heart,
    title: "Benefícios e RH",
    description: <>Viagens como benefício de <strong>alto valor percebido</strong> para colaboradores, associado a descanso, reconhecimento e <strong>marca empregadora</strong>.</>,
    audience: "Plataformas de benefícios, HRtechs, multicontas"
  },
  {
    icon: CreditCard,
    title: "Fintechs e Cartões",
    description: <>Nova categoria de <strong>relacionamento, ativação e monetização</strong> da base de clientes com experiência <strong>white label integrada</strong>.</>,
    audience: "Fintechs, bancos, cartões corporativos"
  },
  {
    icon: Wallet,
    title: "Gestão de Despesas",
    description: <>Viagens a negócios <strong>integradas ao ecossistema</strong> de despesas, pagamento e <strong>governança corporativa</strong>.</>,
    audience: "Apps de despesas, plataformas empresariais"
  },
  {
    icon: Award,
    title: "Programas de Fidelidade",
    description: <>Aumente <strong>recorrência e valor percebido</strong> para membros ou clientes com uma jornada de turismo <strong>operada pela RDC</strong>.</>,
    audience: "Comunidades, clubes, marketplaces"
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Distribuição",
    responsible: "Parceiro",
    description: <>Comunicação para empresas, colaboradores ou usuários; <strong>campanhas segmentadas</strong>; destaque no app; acompanhamento de <strong>adesão e engajamento</strong>.</>,
    icon: TrendingUp
  },
  {
    step: "02",
    title: "Conversão",
    responsible: "Parceiro + RDC",
    description: <>O usuário encontra o benefício no <strong>ambiente conhecido</strong>, consulta destinos, condições e serviços, escolhe a melhor opção e <strong>avança para reserva</strong>.</>,
    icon: Target
  },
  {
    step: "03",
    title: "Operação",
    responsible: "RDC",
    description: <>A <strong>complexidade turística fica invisível</strong> para o usuário: fornecedores, tarifas, reservas, vouchers, remarcações, conciliação e pós-viagem.</>,
    icon: Settings
  }
];

const differentials = [
  {
    icon: Layers,
    title: "Infraestrutura pronta",
    description: <>A RDC entrega a <strong>camada turística completa</strong> que o parceiro não precisa construir: inventário, operação, atendimento, vouchers, suporte e pós-venda.</>
  },
  {
    icon: Puzzle,
    title: "White label e protagonismo",
    description: <>A experiência vive dentro do <strong>ecossistema do parceiro</strong>, preservando sua <strong>marca e relacionamento</strong> com a base.</>
  },
  {
    icon: Globe,
    title: "Duas frentes de monetização",
    description: <>Atende tanto <strong>benefícios e lazer</strong> quanto <strong>viagens corporativas e despesas</strong>, com narrativas adaptáveis ao perfil do parceiro.</>
  },
  {
    icon: Zap,
    title: "Go-to-market mais rápido",
    description: <>Entrada por <strong>escopo controlado</strong>, reduzindo complexidade e criando base para <strong>evolução modular</strong>.</>
  },
  {
    icon: HeadphonesIcon,
    title: "Operação especializada",
    description: <>Mais de <strong>35 anos de experiência</strong> em turismo, com <strong>+200 mil hotéis</strong>, suporte dedicado e pós-venda completo.</>
  },
  {
    icon: Shield,
    title: "Responsabilidades claras",
    description: <>Modelo que separa <strong>distribuição (parceiro)</strong> e <strong>operação turística (RDC)</strong>, com governança e métricas definidas em contrato.</>
  }
];

const benefits = [
  { icon: Globe, value: "+200 mil", label: "Hotéis e resorts", description: "Inventário global disponível" },
  { icon: Users, value: "+35", label: "Anos de experiência", description: "Pioneira em turismo no Brasil" },
  { icon: Building2, value: "100%", label: "White label", description: "Marca do parceiro preservada" },
  { icon: BarChart3, value: "B2B + B2B2C", label: "Modelos flexíveis", description: "Adaptável à estratégia" }
];

const faqs = [
  {
    question: "O que é a RDC Travel Cloud?",
    answer: <>É uma <strong>plataforma white label</strong> da RDC Viagens que permite que empresas, plataformas de benefícios, fintechs, cartões, marketplaces e ecossistemas digitais <strong>ofereçam viagens aos seus públicos</strong> sem precisar estruturar uma operação turística própria. O parceiro mantém a <strong>marca e o relacionamento</strong> com sua base, enquanto a RDC atua nos bastidores com tecnologia, inventário, suporte, reserva, voucher, remarcação e pós-venda.</>
  },
  {
    question: "Para quem é a RDC Travel Cloud?",
    answer: <>Para <strong>plataformas de benefícios e RH</strong>, fintechs, bancos, cartões corporativos, apps de despesas, marketplaces, comunidades e programas de fidelidade que desejam incorporar viagens aos seus <strong>próprios ambientes digitais</strong> como nova categoria de valor.</>
  },
  {
    question: "O parceiro precisa ter experiência em turismo?",
    answer: <><strong>Não.</strong> Justamente por isso a solução é white label e <strong>operada pela RDC</strong>. O parceiro distribui e se relaciona com sua base; a RDC cuida de <strong>toda a complexidade turística</strong>: fornecedores, tarifas, reservas, vouchers, remarcações, conciliação e pós-venda.</>
  },
  {
    question: "O que é o RDC Prime dentro da Travel Cloud?",
    answer: <>O RDC Prime é uma <strong>camada de valor B2B2C</strong> que pode ser incorporada à Travel Cloud. Funciona de forma similar ao <strong>TotalPass ou Wellhub</strong>: a empresa habilita o acesso ao benefício e o colaborador interessado adere para utilizar vantagens como <strong>tarifas exclusivas, suporte 24h</strong> e prioridade no atendimento.</>
  },
  {
    question: "Como funciona o modelo comercial?",
    answer: <>O modelo pode combinar <strong>licenciamento, comissão por reserva, campanhas, assinatura e revenue share</strong> conforme o perfil do parceiro. A recomendação é iniciar com escopo controlado para <strong>validar métricas</strong> e evoluir modularmente.</>
  },
  {
    question: "Quanto tempo leva para integrar?",
    answer: <>O prazo depende do escopo. A recomendação é iniciar com <strong>escopo controlado</strong>, com responsáveis bem definidos de cada lado, <strong>métricas de piloto</strong> e evolução modular conforme resultados.</>
  }
];

function FaqItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#E0E0E0] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F8F8F8] transition-colors"
      >
        <span className="font-semibold text-[#2D2D2D] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#00B4D8] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-[#555555] leading-relaxed border-t border-[#F0F0F0]">
          <div className="pt-4">{answer}</div>
        </div>
      )}
    </div>
  );
}

export default function EmpresasTravelCloud() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    cargo: "",
    segmento: "",
    tamanhoBase: "",
    interesse: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.");
      setFormData({ nome: "", empresa: "", email: "", telefone: "", cargo: "", segmento: "", tamanhoBase: "", interesse: "" });
    }, 1500);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Travel Cloud | Plataforma White Label de Viagens"
        description="RDC Travel Cloud: plataforma white label para empresas, fintechs e plataformas de benefícios oferecerem viagens em seus ambientes digitais. Agende uma conversa!"
        keywords="travel cloud, white label viagens, plataforma viagens B2B, benefícios corporativos viagens, infraestrutura turismo, RDC Travel Cloud"
        canonical="/solucoes-corporativas/travel-cloud"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "RDC Travel Cloud",
          "provider": { "@type": "Organization", "name": "RDC Viagens" },
          "description": "Plataforma white label de viagens para ecossistemas parceiros e empresas, permitindo oferecer viagens dentro de seus próprios ambientes digitais com operação turística especializada da RDC.",
          "serviceType": "Plataforma White Label de Viagens"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-[#00148A] via-[#001070] to-[#000C5A]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#00B4D8] blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-[#FF9100] blur-3xl"></div>
          </div>
        </div>
        
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Soluções Corporativas
            </Button>
          </Link>
          
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#00B4D8] hover:bg-[#0096B4] text-white border-0">
              <Cloud className="w-4 h-4 mr-2" />
              Nova Solução Corporativa
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Viagens dentro do{" "}
              <span className="text-[#00B4D8]">seu ecossistema.</span>
            </h1>
            <p className="text-xl text-[#C7E5F3] mb-4">
              A <strong className="text-white">RDC Travel Cloud</strong> é uma plataforma <strong className="text-white">white label</strong> que permite 
              que parceiros ofereçam viagens dentro de seus próprios ambientes digitais, com <strong className="text-white">operação turística especializada</strong> da RDC.
            </p>
            <p className="text-lg text-[#8ECAE6] mb-8">
              Lance uma <strong>vertical de viagens</strong> sem construir turismo do zero. O parceiro distribui; a RDC opera.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#00B4D8] hover:bg-[#0096B4] text-white px-8 rounded-full"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar uma conversa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Numbers */}
      <section className="py-12 bg-[#00148A] border-t border-white/10">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-7 h-7 text-[#00B4D8]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {benefit.value}
                </div>
                <div className="text-[#00B4D8] font-medium mb-1">
                  {benefit.label}
                </div>
                <div className="text-[#8ECAE6] text-sm">
                  {benefit.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#006064] border-0">
              <Smartphone className="w-4 h-4 mr-2" />
              Frentes de aplicação
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Para quem é a RDC Travel Cloud?
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Uma infraestrutura de viagens para diferentes <strong>modelos de negócio B2B e B2B2C</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center mb-4">
                    <useCase.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-[#2D2D2D] mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-[#555555] leading-relaxed mb-3">
                    {useCase.description}
                  </p>
                  <p className="text-sm text-[#00B4D8] font-semibold">
                    {useCase.audience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#006064] border-0">
              <Settings className="w-4 h-4 mr-2" />
              Modelo operacional
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Como funciona na prática
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Três movimentos simples: <strong>distribuição, conversão e operação</strong>. O parceiro não precisa dominar turismo para capturar valor na categoria.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-5xl font-black text-[#00B4D8]/15 absolute top-4 right-6">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white flex items-center justify-center font-bold mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#00B4D8] mb-3">
                    Responsável: {step.responsible}
                  </p>
                  <p className="text-[#555555] leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Differentials Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#E0F7FA] text-[#006064] border-0">
              <Zap className="w-4 h-4 mr-2" />
              Diferenciais
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Por que a RDC Travel Cloud?
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Uma solução que combina <strong>experiência digital, operação turística e modelo de negócio adaptável</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentials.map((diff, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                <CardContent className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center mb-4">
                    <diff.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    {diff.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* RDC Prime Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#000C5A] text-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E08200] text-white border-0">
                <Award className="w-4 h-4 mr-2" />
                Camada de valor B2B2C
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                RDC Prime: benefício para o usuário final
              </h2>
              <p className="text-lg text-[#8ECAE6] max-w-2xl mx-auto">
                A Travel Cloud viabiliza a jornada white label. O <strong className="text-white">RDC Prime</strong> amplia valor percebido, suporte e recorrência para o colaborador.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 text-[#00B4D8]">Como funciona</h3>
                <p className="text-[#C7E5F3] leading-relaxed mb-4">
                  Similar ao modelo <strong className="text-white">TotalPass ou Wellhub</strong>: a empresa habilita o acesso ao benefício e o colaborador interessado adere para utilizar as vantagens.
                </p>
                <p className="text-[#8ECAE6] text-sm">
                  O universo é o de viagens e todos os serviços turísticos, ampliando a percepção de cuidado, conveniência e acesso a experiências.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 text-[#00B4D8]">Benefícios inclusos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7E5F3]">Acesso a tarifas com condições exclusivas RDC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7E5F3]">Suporte emergencial 24h com atendimento humano</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7E5F3]">Prioridade na Central RDC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7E5F3]">Mais flexibilidade para alterações na reserva</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7E5F3]">Auxílio em early check-in e late check-out</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#E0F7FA] text-[#006064] border-0">
                <Mail className="w-4 h-4 mr-2" />
                Vamos conversar
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
                Agende uma conversa para desenhar sua vertical de viagens
              </h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">
                Preencha o formulário e nossa equipe entrará em contato para entender seu modelo de negócio e apresentar a <strong>solução mais adequada</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#F6F6F6] rounded-2xl p-8 md:p-10 shadow-lg border border-[#E8E8E8]">
              <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors bg-white"
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors bg-white"
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Telefone <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                      placeholder="(11) 99999-9999"
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors bg-white"
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione seu cargo</option>
                      <option value="ceo">CEO / C-Level</option>
                      <option value="diretor">Diretor</option>
                      <option value="head-produto">Head de Produto / Tecnologia</option>
                      <option value="head-rh">Head de RH / Benefícios</option>
                      <option value="head-financeiro">Head Financeiro / Despesas</option>
                      <option value="comercial">Comercial / Parcerias</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Segmento */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Segmento da empresa
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.segmento}
                      onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione o segmento</option>
                      <option value="beneficios">Plataforma de Benefícios / RH</option>
                      <option value="fintech">Fintech / Banco / Cartão</option>
                      <option value="despesas">App de Despesas Corporativas</option>
                      <option value="marketplace">Marketplace / Plataforma Digital</option>
                      <option value="fidelidade">Programa de Fidelidade</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Tamanho da Base */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Tamanho da base de usuários
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.tamanhoBase}
                      onChange={(e) => setFormData({ ...formData, tamanhoBase: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione a faixa</option>
                      <option value="ate-5k">Até 5 mil usuários</option>
                      <option value="5k-50k">5 mil a 50 mil usuários</option>
                      <option value="50k-200k">50 mil a 200 mil usuários</option>
                      <option value="200k-1m">200 mil a 1 milhão</option>
                      <option value="1m+">Mais de 1 milhão</option>
                    </select>
                  </div>
                </div>

                {/* Interesse */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Principal interesse
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.interesse}
                      onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#00B4D8] focus:border-[#00B4D8] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione o interesse</option>
                      <option value="beneficios-lazer">Viagens como benefício / lazer</option>
                      <option value="corporativo">Viagens corporativas / despesas</option>
                      <option value="ambos">Ambos (lazer + corporativo)</option>
                      <option value="explorar">Quero explorar as possibilidades</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-[#00B4D8] hover:bg-[#0096B4] text-white px-10 rounded-full w-full sm:w-auto"
                >
                  {isSubmitting ? "Enviando..." : "Agendar conversa"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-[#777777] text-center sm:text-left">
                  Sem compromisso. Nossa equipe entrará em contato para entender seu modelo de negócio.
                </p>
              </div>
            </form>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#E0F7FA] text-[#006064] border-0">
                Dúvidas frequentes
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
                Perguntas sobre a RDC Travel Cloud
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-[#555555] mb-4">Não encontrou sua dúvida?</p>
              <Link href="/contato">
                <Button variant="outline" className="border-[#00B4D8] text-[#00B4D8] hover:bg-[#E0F7FA] rounded-full">
                  Falar com nossa equipe
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#2D2D2D] mb-4">
              Transforme sua base em um canal de viagens
            </h2>
            <p className="text-lg text-[#555555] mb-8">
              Com operação especializada da RDC, lance uma vertical de viagens sem construir turismo do zero.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#00B4D8] hover:bg-[#0096B4] text-white px-8 rounded-full"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar uma conversa
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
