import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Handshake,
  Check,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  Zap,
  Building2,
  Landmark,
  Globe,
  LayoutGrid,
  Rocket,
  DollarSign,
  Network,
  ChevronDown,
  User,
  Mail,
  Phone,
  Hash,
  MessageSquare
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

/*
 * Página RDC Parcerias
 * Posicionamento: Vertical que amplia o alcance da RDC por meio de alianças estratégicas
 * com bancos, empresas, entidades e plataformas, criando novos canais de aquisição,
 * novas fontes de receita e acelerando a entrada de novos assinantes no ecossistema.
 * Público-alvo: Decisores de bancos, empresas, entidades de classe e plataformas digitais
 */

const valueProps = [
  {
    icon: Network,
    title: "Diferencie sua oferta",
    description: "Agregue viagens ao portfólio da sua empresa e ofereça algo que seu público realmente valoriza — sem precisar criar nada do zero."
  },
  {
    icon: DollarSign,
    title: "Gere receita recorrente",
    description: "Cada pessoa da sua base que se torna assinante RDC gera comissão para você. Um modelo de receita adicional, sem investimento em infraestrutura."
  },
  {
    icon: Rocket,
    title: "Engaje e fidelize sua base",
    description: "Viagens criam conexão emocional. Oferecer esse benefício fortalece o vínculo com seu público e aumenta a retenção."
  },
  {
    icon: Zap,
    title: "Zero complexidade operacional",
    description: "A RDC cuida de toda a operação: plataforma, atendimento, reservas e pós-venda. Você foca no que faz de melhor."
  }
];

const partnerProfiles = [
  {
    icon: Landmark,
    title: "Bancos e Instituições Financeiras",
    description: "Imagine seus correntistas viajando com desconto exclusivo pelo seu relacionamento com o banco. Viagens vinculadas a cartões, contas e programas de pontos que aumentam retenção e engajamento.",
    opportunities: [
      "Benefício vinculado a cartões premium",
      "Programa de pontos com conversão em viagens",
      "Oferta exclusiva para correntistas",
      "Ações de cross-sell e up-sell"
    ]
  },
  {
    icon: Building2,
    title: "Empresas e Corporações",
    description: "Ofereça viagens como benefício exclusivo para colaboradores ou como ferramenta de relacionamento com clientes. Um diferencial que ninguém mais oferece.",
    opportunities: [
      "Benefício corporativo diferenciado",
      "Campanhas de incentivo e premiação",
      "Programas de fidelização de clientes",
      "Ações de endomarketing"
    ]
  },
  {
    icon: Users,
    title: "Entidades e Associações",
    description: "Dê aos seus associados um motivo a mais para valorizar a filiação. Viagens com condições exclusivas que só quem é associado tem acesso.",
    opportunities: [
      "Benefício exclusivo para associados",
      "Condições diferenciadas por convênio",
      "Fortalecimento do valor da associação",
      "Ações conjuntas de comunicação"
    ]
  },
  {
    icon: Globe,
    title: "Plataformas e Marketplaces",
    description: "Adicione viagens ao seu ecossistema digital. Integração via API ou white-label para que seus usuários reservem viagens sem sair da sua plataforma.",
    opportunities: [
      "Integração via API ou white-label",
      "Viagens como serviço dentro da plataforma",
      "Aumento de recorrência e lifetime value",
      "Co-branding e ações conjuntas"
    ]
  }
];

const howItWorks = [
  {
    step: "01",
    title: "Alinhamento estratégico",
    description: "Entendemos o seu negócio, sua base de clientes e seus objetivos para desenhar o modelo de parceria ideal."
  },
  {
    step: "02",
    title: "Proposta personalizada",
    description: "Apresentamos uma proposta comercial sob medida, com modelo de remuneração, escopo e cronograma definidos."
  },
  {
    step: "03",
    title: "Integração e ativação",
    description: "Implementamos a integração técnica e comercial, com treinamento, materiais e suporte dedicado."
  },
  {
    step: "04",
    title: "Gestão e crescimento",
    description: "Acompanhamos os resultados com relatórios periódicos e trabalhamos juntos para escalar a parceria."
  }
];

const faqs = [
  {
    question: "Qual o modelo de remuneração para parceiros?",
    answer: "Trabalhamos com modelos flexíveis de remuneração que podem incluir comissão por assinatura gerada, revenue share recorrente ou fee fixo por ativação, dependendo do perfil da parceria e do volume projetado. O modelo é definido na proposta comercial personalizada."
  },
  {
    question: "É necessário investimento inicial do parceiro?",
    answer: "Não. A RDC assume toda a operação de viagens, plataforma e suporte ao cliente final. O parceiro entra com o canal de distribuição e o relacionamento com sua base. Não há custo de implementação para o parceiro."
  },
  {
    question: "Como funciona a integração técnica?",
    answer: "Oferecemos diferentes níveis de integração: desde modelos simples com landing pages co-branded até integrações via API para plataformas que desejam oferecer viagens dentro do próprio ambiente digital. Nossa equipe técnica acompanha todo o processo."
  },
  {
    question: "Qual o prazo para ativação de uma parceria?",
    answer: "O prazo varia conforme a complexidade da integração. Modelos mais simples (landing page, cupom exclusivo) podem ser ativados em 2 a 4 semanas. Integrações via API ou white-label têm cronograma definido caso a caso."
  },
  {
    question: "A RDC oferece suporte de marketing para o parceiro?",
    answer: "Sim. Disponibilizamos materiais de comunicação, apoio na criação de campanhas, treinamento para equipes comerciais e suporte contínuo para maximizar os resultados da parceria."
  },
  {
    question: "Como é feito o acompanhamento dos resultados?",
    answer: "Fornecemos relatórios periódicos com métricas de performance: número de leads, conversões, assinaturas ativadas, receita gerada e indicadores de engajamento. Realizamos reuniões de acompanhamento para otimizar os resultados."
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

export default function EmpresasParcerias() {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    cnpj: '',
    email: '',
    celular: '',
    cargo: '',
    segmento: '',
    tamanhoBase: '',
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
      toast.success("Solicitação enviada com sucesso! Nossa equipe de parcerias entrará em contato em breve.");
      setFormData({ nome: '', empresa: '', cnpj: '', email: '', celular: '', cargo: '', segmento: '', tamanhoBase: '', mensagem: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="RDC Parcerias | Alianças Estratégicas em Viagens"
        description="Alianças estratégicas com bancos, empresas, entidades e plataformas. Crie novos canais de aquisição, novas fontes de receita e acelere o crescimento do seu negócio."
        keywords="parcerias estratégicas, alianças viagens, canal de aquisição, RDC parcerias, parceiro viagens, white label viagens"
        canonical="https://rdcviagens.com.br/solucoes-corporativas/parcerias"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/OPAJZzSDsUMxkZVwUha8Gs/sandbox/WRvIlNunEXhMeqmbWFNZpX-img-1_1771874609000_na1fn_cGFyY2VyaWFzLWhlcm8tYmctdjI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT1BBSlp6U0RzVU14a1pWd1VoYThHcy9zYW5kYm94L1dSdklsTnVuRVhoTWVxbWJXRk5acFgtaW1nLTFfMTc3MTg3NDYwOTAwMF9uYTFmbl9jR0Z5WTJWeWFXRnpMV2hsY204dFltY3RkakkuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Wwr0F7DoAlgimCSMGmG25SEPTNjTdKCOW5PRIld7MwIeFtvnAnT~EVumN711fAkmsx48mzOX1HKxq4Zb7k1rIaCXQ3VzZnEO3K5-wPSKP4na9iU~tZWY16bcAQ6WjI6RwtYTz14MRdkus0GXo3dn9ES8YT2tX2625y0FVTzOIkx0SPEZuXAP77xPNwsVaW7fFD1u1BasbGFqJzHfbCoIzi4t867EYIi7iSUOKOCGfK~NZrBlNDIQEby5Umju5JGe09xsErYISd1ShEX264k4dwdRaye7hHTEAgRW3BoukDCbBJuixhC9Xn96hj-K3YHlBrVn8CTXB8o~9q7CVCOlMw__" 
            alt="RDC Parcerias"
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
            <Badge className="mb-4 bg-[#9B6AE0] hover:bg-violet-700 text-white border-0">
              <Handshake className="w-4 h-4 mr-2" />
              RDC Parcerias
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Novas fronteiras de crescimento{" "}
              <span className="text-[#B78AFF]">para o seu negócio</span>
            </h1>
            <p className="text-xl text-[#F0E4FF] mb-4">
              A RDC conecta pessoas a experiências de viagem <strong className="text-white">há mais de 35 anos</strong>. 
              Agora, queremos conectar essa experiência ao seu negócio — criando uma oferta de viagens 
              que agrega valor à sua marca, engaja sua base e gera receita.
            </p>
            <p className="text-lg text-[#DFC8FF] mb-8">
              Para <strong>bancos, empresas, entidades e plataformas</strong> 
               que buscam <strong>diferenciação real</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#9B6AE0] hover:bg-violet-700 text-white px-8 rounded-full"
                onClick={() => document.getElementById('formulario-parcerias')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar parceria
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F0E4FF] text-[#8050C0] border-0">
              <Zap className="w-4 h-4 mr-2" />
              Por que ser parceiro RDC
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              O que você ganha com essa parceria
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              <strong>Viagens são o benefício mais desejado</strong> pelos brasileiros. 
              Oferecer isso aos seus clientes é um diferencial que gera <strong>resultado concreto</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {valueProps.map((prop, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9B6AE0] to-[#8050C0] flex items-center justify-center mb-4">
                    <prop.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Partner Profiles Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F0E4FF] text-[#8050C0] border-0">
              <Target className="w-4 h-4 mr-2" />
              Perfis de Parceiros
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Quem já pode se beneficiar
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Desenhamos <strong>modelos de parceria</strong> que se encaixam na realidade de cada segmento. 
              Veja como a RDC pode <strong>agregar valor ao seu negócio</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerProfiles.map((profile, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#F0E4FF] flex items-center justify-center mb-6">
                    <profile.icon className="w-7 h-7 text-[#8050C0]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                    {profile.title}
                  </h3>
                  <p className="text-[#555555] mb-6">
                    {profile.description}
                  </p>
                  <ul className="space-y-3">
                    {profile.opportunities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#B78AFF] flex-shrink-0 mt-0.5" />
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

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#F0E4FF] text-[#8050C0] border-0">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Como funciona
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Simples de começar, fácil de escalar
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Em <strong>poucas semanas</strong> sua empresa já pode oferecer viagens aos seus clientes. 
              Nós cuidamos de toda a complexidade.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9B6AE0] to-[#8050C0] flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Formulário de Contato */}
      <section id="formulario-parcerias" className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#F0E4FF] text-[#8050C0] border-0">
                <Handshake className="w-4 h-4 mr-2" />
                Vamos conversar
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
                Vamos explorar as possibilidades juntos
              </h2>
              <p className="text-lg text-[#555555]">
                Conte um pouco sobre o seu negócio. Nossa <strong>equipe vai analisar o cenário</strong> 
                e apresentar as melhores oportunidades de parceria para a sua realidade.
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Empresa */}
                    <div>
                      <label className="block text-sm font-medium text-[#404040] mb-2">
                        Empresa / Instituição <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                        <input
                          type="text"
                          required
                          value={formData.empresa}
                          onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                          placeholder="Nome da empresa ou instituição"
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors"
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors"
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors"
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
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors"
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
                        <input
                          type="text"
                          value={formData.cargo}
                          onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                          placeholder="Seu cargo na empresa"
                          className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors"
                        />
                      </div>
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
                        className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors appearance-none bg-white"
                      >
                        <option value="">Selecione o segmento</option>
                        <option value="Banco / Instituição Financeira">Banco / Instituição Financeira</option>
                        <option value="Empresa / Corporação">Empresa / Corporação</option>
                        <option value="Entidade / Associação / Sindicato">Entidade / Associação / Sindicato</option>
                        <option value="Plataforma / Marketplace">Plataforma / Marketplace</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  {/* Tamanho da base */}
                  <div>
                    <label className="block text-sm font-medium text-[#404040] mb-2">
                      Tamanho da base de clientes / associados
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                      <select
                        value={formData.tamanhoBase}
                        onChange={(e) => setFormData({ ...formData, tamanhoBase: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors appearance-none bg-white"
                      >
                        <option value="">Selecione</option>
                        <option value="Até 1.000">Até 1.000</option>
                        <option value="1.000 a 10.000">1.000 a 10.000</option>
                        <option value="10.000 a 50.000">10.000 a 50.000</option>
                        <option value="50.000 a 200.000">50.000 a 200.000</option>
                        <option value="Mais de 200.000">Mais de 200.000</option>
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
                      placeholder="Conte-nos mais sobre o tipo de parceria que tem em mente..."
                      rows={4}
                      className="w-full px-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#B78AFF] focus:border-violet-500 transition-colors resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-[#9B6AE0] hover:bg-violet-700 text-white py-4 rounded-2xl text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar solicitação de parceria
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-[#777777] text-center">
                    Ao enviar, você concorda com nossa política de privacidade. 
                    Seus dados são protegidos e não serão compartilhados.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#F0E4FF] text-[#8050C0] border-0">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Dúvidas sobre parcerias
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Respostas para as <strong>principais perguntas</strong> sobre o programa de parcerias da RDC
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] text-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Handshake className="w-16 h-16 text-[#B78AFF] mx-auto mb-6" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              Grandes parcerias começam com uma boa conversa
            </h2>
            <p className="text-lg text-[#DFC8FF] mb-8">
              Se você enxerga em viagens uma <strong>oportunidade estratégica</strong> para o seu negócio, 
              estamos prontos para explorar esse caminho juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#9B6AE0] hover:bg-violet-700 text-white px-8"
                onClick={() => document.getElementById('formulario-parcerias')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explorar parceria
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
