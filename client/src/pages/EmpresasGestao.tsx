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
  BarChart3,
  Shield,
  Clock,
  Wallet,
  Globe,
  FileText,
  Settings,
  HeadphonesIcon,
  Users,
  Building2,
  TrendingDown,
  Zap,
  Target,
  ChevronDown,
  User,
  Mail,
  Phone,
  Hash,
  Briefcase
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePageDoc } from "@/hooks/usePageDoc";

const painPoints = [
  {
    icon: TrendingDown,
    title: "Gastos fora de controle?",
    description: "Sem visibilidade dos custos de viagem, cada deslocamento vira uma surpresa no orçamento. Sua empresa perde dinheiro sem perceber."
  },
  {
    icon: Clock,
    title: "Processo lento e burocrático?",
    description: "Cotações por e-mail, aprovações manuais e reservas descentralizadas consomem horas preciosas da sua equipe."
  },
  {
    icon: Shield,
    title: "Sem política de viagens?",
    description: "Colaboradores reservando por conta própria, sem padrão e sem conformidade com políticas. Cada viagem é um risco para o orçamento."
  },
  {
    icon: Users,
    title: "Equipe sobrecarregada?",
    description: "Secretárias, RH e gestores gastando tempo demais organizando viagens em vez de focar no que realmente importa."
  }
];

const solutions = [
  {
    title: "Plataforma de Reservas Simplificada",
    description: "Seus colaboradores fazem reservas em minutos, dentro da política da empresa, com aprovações automáticas.",
    items: [
      "Reservas de voos, hotéis e carros em um só lugar",
      "Self-booking intuitivo para colaboradores",
      "Aprovações automáticas conforme sua política",
      "Tarifas negociadas com economia real"
    ]
  },
  {
    title: "Controle Total de Gastos",
    description: "Saiba exatamente quanto sua empresa gasta com viagens. Sem surpresas, sem estouros de orçamento.",
    items: [
      "Orçamento por departamento ou centro de custo",
      "Alertas automáticos de limites",
      "Relatórios gerenciais para tomada de decisão"
    ]
  },
  {
    title: "Suporte Dedicado para PMEs",
    description: "Atendimento humanizado e consultivo, pensado para empresas que precisam de agilidade sem burocracia.",
    items: [
      "Consultor dedicado para sua empresa",
      "Suporte emergencial para alterações",
      "Atendimento ágil via WhatsApp",
      "Integração completa e treinamento da equipe"
    ]
  }
];

const benefits = [
  {
    icon: Wallet,
    value: "Até 30%",
    label: "de economia",
    description: "Reduza custos com tarifas negociadas e controle de gastos."
  },
  {
    icon: Zap,
    value: "80%",
    label: "mais rápido",
    description: "Processo de reserva simplificado e aprovações automáticas."
  },
  {
    icon: BarChart3,
    value: "100%",
    label: "de visibilidade",
    description: "Visibilidade completa sobre todos os gastos com viagens da empresa."
  },
  {
    icon: HeadphonesIcon,
    value: "24/7",
    label: "de suporte",
    description: "Equipe dedicada disponível para emergências e alterações."
  }
];

const forWho = [
  {
    icon: Target,
    title: "Gestores e Diretores",
    description: "Tenha visibilidade total dos gastos com viagens e tome decisões estratégicas baseadas em dados."
  },
  {
    icon: Users,
    title: "RH e Departamento Pessoal",
    description: "Simplifique a logística de viagens de colaboradores, treinamentos e eventos corporativos."
  },
  {
    icon: Briefcase,
    title: "Marketing e Comercial",
    description: "Agilize viagens para eventos, feiras e reuniões com clientes sem burocracia."
  },
  {
    icon: Building2,
    title: "Secretárias e Serviços Gerais",
    description: "Centralize todas as reservas em uma plataforma intuitiva e economize horas de trabalho."
  }
];

const faqs = [
  {
    question: "A RDC Gestão de Viagens é indicada para pequenas empresas?",
    answer: "Sim! Nossa solução foi pensada para empresas de todos os portes, com planos flexíveis que se adaptam à realidade de PMEs. Não importa se sua empresa faz 5 ou 500 viagens por mês, temos uma solução que se adapta à sua empresa."
  },
  {
    question: "Preciso de um volume mínimo de viagens para contratar?",
    answer: "Não existe volume mínimo. Atendemos desde empresas que fazem viagens esporádicas até aquelas com grande volume mensal. O importante é que cada viagem seja bem gerenciada e econômica."
  },
  {
    question: "Como funciona a economia nas viagens?",
    answer: "Negociamos tarifas corporativas exclusivas com companhias aéreas, redes hoteleiras e locadoras. Além disso, o controle de gastos e a política de viagens integrada evitam desperdícios e reservas fora do padrão."
  },

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

export default function EmpresasGestao() {
  const c = usePageDoc<any>('paginaGestao');
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    cnpj: '',
    email: '',
    celular: '',
    cargo: '',
    area: '',
    funcionarios: '',
    volumeViagens: ''
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
      setFormData({ nome: '', empresa: '', cnpj: '', email: '', celular: '', cargo: '', area: '', funcionarios: '', volumeViagens: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Gestão de Viagens Corporativas para PMEs"
        description="Gestão completa de viagens corporativas para pequenas e médias empresas. Economize até 30%, centralize reservas e controle gastos. Solicite uma demonstração!"
        keywords="gestão viagens corporativas, travel management PME, viagens empresariais, controle gastos viagem, reservas corporativas, RDC gestão"
        canonical="/solucoes-corporativas/gestao"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "RDC Gestão de Viagens",
          "provider": { "@type": "Organization", "name": "RDC Viagens" },
          "description": "Gestão completa de viagens corporativas para pequenas e médias empresas com economia de até 30%.",
          "serviceType": "Gestão de Viagens Corporativas"
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/AbahMgOqOmGaOCLA.jpg" 
            alt="RDC Gestão de Viagens"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00148A]/95 via-[#00148A]/80 to-[#00148A]/60"></div>
        </div>
        
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Soluções Corporativas
            </Button>
          </Link>
          
          <div className="max-w-3xl">
            <img src="/logos/b2b/logo-gestao.svg" 
              alt="RDC Gestão de Viagens" 
              className="h-14 md:h-18 w-auto mb-6 drop-shadow-lg" 
            />
            <Badge className="mb-4 bg-[#E8506A] hover:bg-rose-600 text-white border-0">
              <Plane className="w-4 h-4 mr-2" />
              {c.heroBadge ?? "Gestão Corporativa"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {c.heroTitulo ?? "Sua empresa viaja."}{" "}
              <span className="text-[#E8506A]">{c.heroDestaque ?? "Nós cuidamos de tudo."}</span>
            </h1>
            <p className="text-xl text-[#C7E5F3] mb-4">
              Gestão completa de viagens corporativas para <strong className="text-white">pequenas e médias empresas</strong>. 
              <strong>Centralize reservas, controle gastos</strong> e economize até 30% — <strong>sem burocracia</strong>, 
              sem complicação.
            </p>
            <p className="text-lg text-[#8ECAE6] mb-8">
              Mais de <strong>35 anos de experiência</strong> ajudando empresas como a sua a <strong>viajar melhor e gastar menos</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#E8506A] hover:bg-rose-600 text-white px-8 rounded-full"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {c.heroCta ?? "Solicitar proposta gratuita"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FEE2E2] text-[#B91C1C] border-0">
              Sua empresa se identifica?
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Desafios que conhecemos bem
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Se sua empresa enfrenta algum desses problemas, a <strong>RDC Gestão de Viagens</strong> 
              é a solução que você precisa.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8506A] to-[#C03050] flex items-center justify-center mb-4">
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

      {/* Benefits Numbers */}
      <section className="py-16 bg-[#00148A]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-7 h-7 text-[#E8506A]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {benefit.value}
                </div>
                <div className="text-[#F08090] font-medium mb-1">
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

      {/* Solutions Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FAD0D8] text-[#B83048] border-0">
              <Settings className="w-4 h-4 mr-2" />
              Como resolvemos
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Tudo que sua empresa precisa em um só lugar
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Uma solução pensada para o dia a dia de PMEs que precisam de 
              <strong>agilidade, economia e controle</strong>.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8506A] to-[#C03050] text-white flex items-center justify-center font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-[#555555] mb-6">
                    {solution.description}
                  </p>
                  <ul className="space-y-3">
                    {solution.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#E8506A] flex-shrink-0 mt-0.5" />
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

      {/* For Who Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FAD0D8] text-[#B83048] border-0">
              <Users className="w-4 h-4 mr-2" />
              Para quem é
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Feito para quem toma decisões
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Se você é responsável por <strong>organizar, aprovar ou gerenciar viagens</strong> 
              na sua empresa, essa solução é para você.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {forWho.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8506A] to-[#C03050] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] text-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#E8506A] hover:bg-rose-600 text-white border-0">
                <FileText className="w-4 h-4 mr-2" />
                Solicite uma proposta
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                Vamos conversar sobre a sua empresa?
              </h2>
              <p className="text-lg text-[#8ECAE6] max-w-2xl mx-auto">
                Preencha o formulário abaixo e nossa equipe entrará em contato 
                para entender suas necessidades e apresentar a <strong>solução mais adequada</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors"
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors"
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Corporativo */}
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
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors"
                    />
                  </div>
                </div>

                {/* Celular/WhatsApp */}
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
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors"
                    />
                  </div>
                </div>

                {/* Cargo/Função */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Cargo / Função
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione seu cargo</option>
                      <option value="diretor">Diretor / Nível Executivo</option>
                      <option value="gerente">Gerente</option>
                      <option value="coordenador">Coordenador</option>
                      <option value="analista">Analista</option>
                      <option value="secretaria">Secretária Executiva</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Área de Atuação */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Área de atuação
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione sua área</option>
                      <option value="marketing">Marketing</option>
                      <option value="rh">Recursos Humanos</option>
                      <option value="facilities">Serviços Gerais</option>
                      <option value="administrativo">Administrativo</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="comercial">Comercial</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Quantidade de Funcionários */}
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Quantidade de funcionários
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.funcionarios}
                      onChange={(e) => setFormData({ ...formData, funcionarios: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors appearance-none bg-white"
                    >
                      <option value="">Selecione a faixa</option>
                      <option value="1-10">1 a 10 funcionários</option>
                      <option value="11-50">11 a 50 funcionários</option>
                      <option value="51-200">51 a 200 funcionários</option>
                      <option value="201-500">201 a 500 funcionários</option>
                      <option value="500+">Mais de 500 funcionários</option>
                    </select>
                  </div>
                </div>

                {/* Volume Mensal de Viagens */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#404040] mb-2">
                    Volume mensal de viagens
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <select
                      value={formData.volumeViagens}
                      onChange={(e) => setFormData({ ...formData, volumeViagens: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#E8506A] focus:border-[#E8506A] transition-colors appearance-none bg-white"
                    >
                      <option value="">Quantas viagens sua empresa faz por mês?</option>
                      <option value="1-5">Até 5 viagens/mês</option>
                      <option value="6-15">6 a 15 viagens/mês</option>
                      <option value="16-30">16 a 30 viagens/mês</option>
                      <option value="31-50">31 a 50 viagens/mês</option>
                      <option value="50+">Mais de 50 viagens/mês</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-[#E8506A] hover:bg-rose-600 text-white px-10 rounded-full w-full sm:w-auto"
                >
                  {isSubmitting ? "Enviando..." : "Solicitar proposta gratuita"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-[#777777] text-center sm:text-left">
                  Sem compromisso. Nossa equipe entrará em contato em até 24h úteis.
                </p>
              </div>
            </form>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#FAD0D8] text-[#B83048] border-0">
                Dúvidas frequentes
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
                Perguntas sobre a Gestão de Viagens
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-[#555555] mb-4">Não encontrou sua dúvida?</p>
              <Link href="/duvidas">
                <Button variant="outline" className="border-[#E8506A] text-[#E8506A] hover:bg-[#FDE8EC] rounded-full">
                  Ver todas as dúvidas
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#2D2D2D] mb-4">
              {c.ctaTitulo ?? "Pronto para transformar a gestão de viagens da sua empresa?"}
            </h2>
            <p className="text-lg text-[#555555] mb-8">
              {c.ctaTexto ?? "Fale com nossos especialistas e descubra como economizar nas viagens da sua empresa."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#E8506A] hover:bg-rose-600 text-white px-8 rounded-full"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {c.ctaBotao ?? "Solicitar proposta gratuita"}
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
