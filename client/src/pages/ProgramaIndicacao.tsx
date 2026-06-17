import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Gift,
  Users,
  Plane,
  Car,
  Building2,
  Ship,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Share2,
  UserPlus,
  Coins,
  Send,
  Bus,
  MapPin,
  ArrowLeftRight,
  Ticket,
  FileText
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePageDoc } from "@/hooks/usePageDoc";
/*
 * Design Philosophy: Tropical Elegance
 * - Página dedicada ao Programa de Indicação
 * - Foco em benefícios claros e formulário de indicação
 * - Cores: Azul profundo + Laranja accent + Amarelo
 */

// Máscaras de formatação
const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const maskPhone = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const howItWorks = [
  {
    step: 1,
    icon: Share2,
    title: "Indique um amigo",
    description: "Preencha o formulário abaixo com os dados do seu indicado. É rápido e fácil."
  },
  {
    step: 2,
    icon: UserPlus,
    title: "Entramos em contato",
    description: "Nossa equipe entra em contato com seu indicado para apresentar os planos RDC."
  },
  {
    step: 3,
    icon: Coins,
    title: "Seu indicado assina",
    description: "Quando seu indicado se tornar assinante, você ganha pontos automaticamente."
  },
  {
    step: 4,
    icon: Gift,
    title: "Troque por benefícios",
    description: "Use seus pontos para descontos em hospedagem, voos, carros e muito mais."
  }
];

const rewards = [
  {
    icon: Building2,
    title: "Hotéis",
    description: "Os melhores hotéis e resorts em todo o mundo"
  },
  {
    icon: Plane,
    title: "Voos",
    description: "Passagens aéreas para destinos nacionais e internacionais"
  },
  {
    icon: Bus,
    title: "Ônibus",
    description: "Passagens rodoviárias para viagens pelo Brasil"
  },
  {
    icon: MapPin,
    title: "Passeios",
    description: "Tours e experiências nos melhores destinos"
  },
  {
    icon: Car,
    title: "Carros",
    description: "Locação de veículos para explorar com liberdade"
  },
  {
    icon: ArrowLeftRight,
    title: "Transfers",
    description: "Traslados com conforto e pontualidade"
  },
  {
    icon: Ship,
    title: "Cruzeiros",
    description: "Embarque em cruzeiros incríveis"
  },
  {
    icon: Ticket,
    title: "Ingressos",
    description: "Acesso a atrações, shows e eventos"
  }
];

const faqs = [
  {
    question: "Como faço para participar do Programa de Indicação?",
    answer: "Basta ser assinante RDC! Preencha o formulário nesta página com os dados do seu indicado e nossa equipe entrará em contato."
  },
  {
    question: "Quando os pontos são creditados?",
    answer: "Os pontos são creditados na sua conta assim que seu indicado efetua o primeiro pagamento da assinatura. Você recebe uma notificação por e-mail e pode acompanhar seu saldo no Portal do Assinante."
  },
  {
    question: "Os pontos expiram?",
    answer: "Os pontos têm validade de 24 meses a partir da data de crédito. Recomendamos usar seus pontos regularmente para aproveitar ao máximo os benefícios."
  },
  {
    question: "Posso acumular pontos de indicações e usar junto com meu plano?",
    answer: "Sim! Os pontos do Programa de Indicação são um benefício adicional ao seu plano. Você pode usá-los para complementar suas diárias ou obter descontos extras em outros serviços."
  },
  {
    question: "Existe limite de indicações?",
    answer: "Não! Você pode indicar quantas pessoas quiser. Quanto mais você indica, mais pontos acumula para trocar por benefícios."
  }
];

export default function ProgramaIndicacao() {
  const c = usePageDoc<any>('paginaIndicacao');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    indicadorNome: "",
    indicadorCpf: "",
    indicadorEmail: "",
    indicadorTelefone: "",
    indicadoNome: "",
    indicadoEmail: "",
    indicadoTelefone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.indicadorNome || !formData.indicadorCpf || !formData.indicadorEmail || !formData.indicadorTelefone || 
        !formData.indicadoNome || !formData.indicadoTelefone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio
    setTimeout(() => {
      toast.success("Indicação enviada com sucesso! Entraremos em contato com seu indicado em breve.");
      setFormData({
        indicadorNome: "",
        indicadorCpf: "",
        indicadorEmail: "",
        indicadorTelefone: "",
        indicadoNome: "",
        indicadoEmail: "",
        indicadoTelefone: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Programa Indique e Ganhe | Recompensas"
        description="Indique amigos para a RDC Viagens e ganhe recompensas exclusivas a cada indicação confirmada. Quanto mais você indica, mais ganha. Comece a indicar agora!"
        keywords="programa indicação RDC, indique e ganhe, recompensas viagens, indicar amigos, desconto assinatura viagens"
        canonical="/programa-indicacao"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#FF9100] hover:bg-yellow-600 text-black border-0">
              <Gift className="w-4 h-4 mr-1" />
              {c.heroBadge ?? "Programa de Indicação"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {c.heroTitulo ?? "Indique amigos e"}{" "}
              <span className="text-[#FF9100]">{c.heroDestaque ?? "ganhe pontos"}</span>
            </h1>
            <p className="text-xl text-[#C7E5F3] mb-8">{c.heroSubtitulo ?? "Compartilhe a experiência RDC com quem você ama e acumule pontos para trocar por descontos em hospedagem, voos, carros e muito mais!"}</p>
            <Button 
              size="lg" 
              className="bg-[#FF9100] hover:bg-yellow-600 text-black px-8 py-6 text-lg rounded-full font-semibold"
              onClick={() => {
                document.getElementById("formulario-indicacao")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {c.heroCta ?? "Indicar agora"}
              <ArrowRight className="w-5 h-5 ml-2" />
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

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">
              {c.comoBadge ?? "Como funciona"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.comoTitulo ?? "Simples assim"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.comoSubtitulo ?? "Em 4 passos você já está acumulando pontos para suas próximas viagens"}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0020B8] to-[#E68200] flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FF9100] flex items-center justify-center text-black font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{item.title}</h3>
                    <p className="text-[#555555] text-sm">{item.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-[#D6D6D6] -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Formulário de Indicação */}
      <section id="formulario-indicacao" className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070] text-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#FF9100] text-black border-0">
              <Send className="w-4 h-4 mr-1" />
              {c.formBadge ?? "Formulário de Indicação"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              {c.formTitulo ?? "Indique agora mesmo"}
            </h2>
            <p className="text-lg text-[#8ECAE6] max-w-2xl mx-auto">{c.formSubtitulo ?? "Preencha os dados abaixo e nossa equipe entrará em contato com seu indicado para apresentar os planos RDC"}</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dados do Indicador */}
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#FF9100] flex items-center justify-center">
                      <Users className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-xl font-bold">Seus dados (indicador)</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="indicadorNome" className="text-[#C7E5F3] mb-1.5 block">
                        Nome completo *
                      </Label>
                      <Input
                        id="indicadorNome"
                        placeholder="Seu nome completo"
                        value={formData.indicadorNome}
                        onChange={(e) => handleChange("indicadorNome", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="indicadorCpf" className="text-[#C7E5F3] mb-1.5 block">
                        CPF *
                      </Label>
                      <Input
                        id="indicadorCpf"
                        placeholder="000.000.000-00"
                        value={formData.indicadorCpf}
                        onChange={(e) => handleChange("indicadorCpf", maskCPF(e.target.value))}
                        maxLength={14}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="indicadorEmail" className="text-[#C7E5F3] mb-1.5 block">
                        E-mail *
                      </Label>
                      <Input
                        id="indicadorEmail"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.indicadorEmail}
                        onChange={(e) => handleChange("indicadorEmail", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="indicadorTelefone" className="text-[#C7E5F3] mb-1.5 block">
                        Telefone / WhatsApp *
                      </Label>
                      <Input
                        id="indicadorTelefone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.indicadorTelefone}
                        onChange={(e) => handleChange("indicadorTelefone", maskPhone(e.target.value))}
                        maxLength={15}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Indicado */}
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#FF9100] flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Dados do indicado</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="indicadoNome" className="text-[#C7E5F3] mb-1.5 block">
                        Nome completo *
                      </Label>
                      <Input
                        id="indicadoNome"
                        placeholder="Nome do seu indicado"
                        value={formData.indicadoNome}
                        onChange={(e) => handleChange("indicadoNome", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="indicadoEmail" className="text-[#C7E5F3] mb-1.5 block">
                        E-mail
                      </Label>
                      <Input
                        id="indicadoEmail"
                        type="email"
                        placeholder="email@indicado.com"
                        value={formData.indicadoEmail}
                        onChange={(e) => handleChange("indicadoEmail", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="indicadoTelefone" className="text-[#C7E5F3] mb-1.5 block">
                        Telefone / WhatsApp *
                      </Label>
                      <Input
                        id="indicadoTelefone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.indicadoTelefone}
                        onChange={(e) => handleChange("indicadoTelefone", maskPhone(e.target.value))}
                        maxLength={15}
                        className="bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus:border-yellow-400"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button 
                type="submit"
                size="lg" 
                className="bg-[#FF9100] hover:bg-yellow-600 text-black px-12 py-6 text-lg rounded-full font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar indicação
                  </>
                )}
              </Button>
              <p className="text-[#8ECAE6] text-sm mt-4">
                Ao enviar, você autoriza a RDC Viagens a entrar em contato com o indicado.
              </p>
            </div>
          </form>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Rewards Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#FFF0D6] text-[#CC7400] border-0">
              <Sparkles className="w-4 h-4 mr-1" />
              {c.recompBadge ?? "Recompensas"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.recompTitulo ?? "Troque seus pontos por"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.recompSubtitulo ?? "Troque seus pontos por todos os produtos turísticos do ecossistema RDC"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {rewards.map((reward, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8F4FA] to-[#FFF0D6] flex items-center justify-center mb-4">
                    <reward.icon className="w-7 h-7 text-[#001A9E]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{reward.title}</h3>
                  <p className="text-[#555555] text-sm">{reward.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.faqTitulo ?? "Perguntas frequentes"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.faqSubtitulo ?? "Tire suas dúvidas sobre o Programa de Indicação"}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#D6D6D6] bg-white first:rounded-t-xl last:rounded-b-xl">
                <button
                  className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-[#F6F6F6] transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-lg pr-4">{faq.question}</span>
                  <CheckCircle2 className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    openFaq === index ? "text-[#FF9100]" : "text-[#D6D6D6]"
                  }`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-[#555555] animate-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Regulamento */}
      <section className="py-10 md:py-12 bg-[#F6F6F6]">
        <div className="container">
          <div className="max-w-3xl mx-auto flex items-center justify-between bg-white rounded-2xl shadow-md p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4FA] flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#001A9E]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#2D2D2D]">Regulamento do Programa</h3>
                <p className="text-[#555555] text-sm">Consulte todas as regras e condições do Programa de Indicação.</p>
              </div>
            </div>
            <a
              href="/regulamento-indicacao.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-[#0020B8] text-[#0020B8] hover:bg-[#F6F6F6] rounded-full flex-shrink-0">
                <FileText className="w-4 h-4 mr-2" />
                Abrir regulamento
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#F5B800] to-[#D4A000]">
        <AnimateOnScroll variant="fade">
        <div className="container text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
            {c.ctaTitulo ?? "Comece a indicar hoje mesmo!"}
          </h2>
          <p className="text-lg text-[#2D2D2D] mb-8 max-w-2xl mx-auto">{c.ctaTexto ?? "Quanto mais você compartilha, mais você viaja! Indique amigos e familiares e acumule pontos para trocar por benefícios incríveis."}</p>
          <Button 
            size="lg" 
            className="bg-[#001A9E] hover:bg-[#001070] text-white px-8 py-6 text-lg rounded-full"
            onClick={() => {
              document.getElementById("formulario-indicacao")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {c.ctaBotao ?? "Indicar agora"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        </AnimateOnScroll>
      </section>

      <Footer />
    </div>
  );
}
