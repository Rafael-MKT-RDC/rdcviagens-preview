import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Plane,
  Hotel,
  Car,
  Ship,
  Shield,
  MapPin,
  Globe,
  Users,
  Compass,
  HeadphonesIcon,
  CalendarDays,
  ArrowRight,
  Star,
  Check,
  Send,
  Loader2,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  Heart,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import SEO from "@/components/SEO";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePageDoc } from "@/hooks/usePageDoc";
/*
 * Design Philosophy: Tropical Elegance
 * - Página da Agência de Viagens exclusiva para assinantes RDC
 * - Serviços completos de agência, pacotes de exemplo e formulário de contato
 * - Cores: Azul profundo (#0540D4) + Laranja institucional (#FF8A1F)
 */

const services = [
  {
    icon: Plane,
    title: "Passagens Aéreas",
    description: "Nacionais e internacionais com as melhores tarifas. Encontramos as melhores conexões e horários para sua viagem.",
    color: "bg-[#E8F4FA] text-[#001A9E]",
  },
  {
    icon: Hotel,
    title: "Hospedagem",
    description: "Hotéis, resorts e pousadas nos melhores destinos nacionais e internacionais com tarifas exclusivas.",
    color: "bg-[#FFF0D6] text-[#CC7400]",
  },
  {
    icon: Car,
    title: "Locação de Veículos",
    description: "Aluguel de carros nas principais locadoras do Brasil e do mundo com condições diferenciadas.",
    color: "bg-[#FFF0D6] text-[#CC7400]",
  },
  {
    icon: Ship,
    title: "Cruzeiros",
    description: "Cruzeiros marítimos e fluviais com roteiros exclusivos. Do litoral brasileiro ao Caribe e Europa.",
    color: "bg-[#D0F0F8] text-[#00B4D8]",
  },
  {
    icon: Shield,
    title: "Seguro Viagem",
    description: "Proteção completa para você e sua família. Cobertura médica, bagagem e assistência 24h em qualquer destino.",
    color: "bg-[#D4F5E9] text-[#06D6A0]",
  },
  {
    icon: Compass,
    title: "Roteiros Personalizados",
    description: "Montamos o roteiro ideal para o seu perfil. Da lua de mel à viagem em família, tudo sob medida.",
    color: "bg-[#F0E4FF] text-[#8050C0]",
  },
  {
    icon: Globe,
    title: "Pacotes Completos",
    description: "Aéreo + hospedagem + traslados + passeios. Tudo organizado para você só aproveitar.",
    color: "bg-[#E0E8FF] text-[#00148A]",
  },
  {
    icon: CalendarDays,
    title: "Traslados, Passeios e Ingressos",
    description: "Traslados aeroporto-hotel, passeios guiados e ingressos para os principais parques e atrações, incluindo Disney, Universal e muito mais.",
    color: "bg-[#FFF0D6] text-[#CC7400]",
  },
];

const packages = [
  {
    id: 1,
    destination: "Porto de Galinhas",
    location: "Pernambuco, Brasil",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=400&fit=crop",
    duration: "5 noites",
    includes: ["Hospedagem 5★", "Café da manhã", "Traslado"],
    tag: "Praia",
    highlight: false,
    savings: "até 30%",
  },
  {
    id: 2,
    destination: "Gramado e Canela",
    location: "Rio Grande do Sul, Brasil",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    duration: "4 noites",
    includes: ["Hospedagem 4★", "Café da manhã", "Passeios"],
    tag: "Serra",
    highlight: false,
    savings: "até 25%",
  },
  {
    id: 3,
    destination: "Cancún",
    location: "México",
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop",
    duration: "7 noites",
    includes: ["Aéreo + Hotel", "All Inclusive", "Traslado"],
    tag: "Internacional",
    highlight: true,
    savings: "até 35%",
  },
  {
    id: 4,
    destination: "Maldivas",
    location: "Oceano Índico",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop",
    duration: "6 noites",
    includes: ["Aéreo + Resort", "All Inclusive", "Bangalô sobre água"],
    tag: "Luxo",
    highlight: false,
    savings: "até 30%",
  },
  {
    id: 5,
    destination: "Fernando de Noronha",
    location: "Pernambuco, Brasil",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    duration: "5 noites",
    includes: ["Hospedagem", "Passeios de barco", "Mergulho"],
    tag: "Exclusivo",
    highlight: false,
    savings: "até 25%",
  },
  {
    id: 6,
    destination: "Lisboa e Porto",
    location: "Portugal",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop",
    duration: "8 noites",
    includes: ["Aéreo + Hotel", "City tour", "Trem entre cidades"],
    tag: "Europa",
    highlight: false,
    savings: "até 30%",
  },
];

const contactTimes = [
  { value: "09-12", label: "09h às 12h" },
  { value: "12-14", label: "12h às 14h" },
  { value: "14-17", label: "14h às 17h" },
  { value: "17-21", label: "17h às 21h" },
];

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  travelers: string;
  message: string;
  contactChannel: string;
  contactTime: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  travelDate: "",
  travelers: "",
  message: "",
  contactChannel: "whatsapp",
  contactTime: "",
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-[#D6D6D6] overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-[#2D2D2D] pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#777777] shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 text-[#555555] leading-relaxed border-t border-[#E8E8E8] pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function AgenciaViagens() {
  const c = usePageDoc<any>('paginaAgencia');
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contactTime) {
      toast.error("Selecione um horário de preferência para contato.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const submissions = JSON.parse(localStorage.getItem("rdc_agencia_submissions") || "[]");
      submissions.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("rdc_agencia_submissions", JSON.stringify(submissions));

      setIsSubmitted(true);
      toast.success("Solicitação enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
      console.error("Erro no envio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("formulario-cotacao");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Agência de Viagens | Pacotes Exclusivos"
        description="Pacotes de viagens completos com aéreo, hotel, traslados e passeios. Condições especiais para assinantes RDC com consultores dedicados. Solicite sua cotação!"
        keywords="agência viagens RDC, pacotes viagem completos, viagens com desconto, aéreo hotel, pacotes turísticos, consultores viagem"
        canonical="/agencia"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-29 pb-32 md:pt-34 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#001A9E]" />
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=800&fit=crop"
            alt="Viagem"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container py-12 md:py-28">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-[#FF9100] text-white border-0 px-4 py-1.5 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              {c.heroBadge ?? "Assinantes têm condições especiais"}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {c.heroTitulo ?? "Sua agência de viagens"}{" "}
              <span className="text-[#FF9100]">{c.heroDestaque ?? "completa"}</span>
            </h1>
            <p className="text-base md:text-xl text-[#C7E5F3] mb-6 md:mb-8 max-w-2xl leading-relaxed">{c.heroSubtitulo ?? "A agência RDC cuida de cada detalhe da sua viagem, do planejamento à volta para casa. Atendemos todos os viajantes — e quem é assinante aproveita tarifas ainda melhores."}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8"
                onClick={scrollToForm}
              >
                {c.heroCta ?? "Solicitar cotação"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/assinaturas">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8"
                >
                  Conheça as vantagens de ser assinante
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
            <path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Differentials Strip */}
      <section className="relative z-10 py-10 md:py-12 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E8F4FA] flex items-center justify-center mx-auto mb-2 md:mb-3">
                <HeadphonesIcon className="w-6 h-6 md:w-7 md:h-7 text-[#001A9E]" />
              </div>
              <h3 className="font-semibold text-sm md:text-base text-[#2D2D2D]">Atendimento dedicado</h3>
              <p className="text-xs md:text-sm text-[#777777] mt-1">Telefone, chat e WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#FFF0D6] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7 text-[#E68200]" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D]">Planejamento sob medida</h3>
              <p className="text-sm text-[#777777] mt-1">Roteiros personalizados</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#D4F5E9] flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-[#06D6A0]" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D]">+35 anos de mercado</h3>
              <p className="text-sm text-[#777777] mt-1">Experiência e confiança</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#FFF0D6] flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7 text-[#CC7400]" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D]">Tarifas diferenciadas</h3>
              <p className="text-sm text-[#777777] mt-1">Assinantes economizam até 60%</p>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">
              {c.servicosBadge ?? "Nossos Serviços"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.servicosTitulo ?? "Tudo que você precisa em um só lugar"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.servicosSubtitulo ?? "Nossa agência oferece todos os serviços para tornar sua viagem perfeita, do início ao fim. Atendemos todos os viajantes, com condições especiais para assinantes."}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <CardContent className="pt-6 pb-6">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-[#2D2D2D] text-lg mb-2">{service.title}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-[#FFF0D6] text-[#CC7400] border-0">
              {c.comoBadge ?? "Como Funciona"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.comoTitulo ?? "Simples, rápido e sem estresse"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.comoSubtitulo ?? "Você sonha, a gente planeja. Veja como é fácil viajar com a agência RDC."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Conte seu sonho", desc: "Fale com nosso consultor sobre o destino, datas e preferências." },
              { step: "02", title: "Receba a proposta", desc: "Montamos um roteiro personalizado com as melhores opções e tarifas." },
              { step: "03", title: "Confirme e relaxe", desc: "Aprovando a proposta, cuidamos de todas as reservas e detalhes." },
              { step: "04", title: "Aproveite a viagem", desc: "É só fazer as malas! Estaremos disponíveis durante toda a viagem." },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#001A9E] to-blue-600 flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#8ECAE6] to-[#FFCC80]" />
                )}
                <h3 className="font-bold text-[#2D2D2D] text-lg mb-2">{item.title}</h3>
                <p className="text-[#555555] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Subscriber Advantage Banner */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-[#001A9E] to-[#001070]">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {c.vantTitulo ?? "Atendemos todos os viajantes."}
                  <span className="text-[#FF9100]">{c.vantDestaque ?? " Assinantes têm mais vantagens."}</span>
                </h2>
                <p className="text-[#C7E5F3] leading-relaxed">{c.vantTexto ?? "Qualquer pessoa pode solicitar uma cotação e viajar com a agência RDC. Mas quem é assinante conta com tarifas ainda mais competitivas, prioridade no atendimento e condições exclusivas de pagamento."}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF9100] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white"><strong>Tarifas até 60% menores</strong> em hospedagens</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF9100] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white"><strong>Prioridade no atendimento</strong> com consultor dedicado</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF9100] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white"><strong>Condições especiais</strong> de pagamento e parcelamento</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF9100] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white"><strong>Programa de pontos</strong> para trocar por descontos</p>
                  </div>
                </div>
                <Link href="/assinaturas">
                  <Button className="w-full mt-6 bg-[#FF9100] hover:bg-[#E68200] text-white">
                    Quero ser assinante
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">
              {c.pacotesBadge ?? "Inspiração"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.pacotesTitulo ?? "Pacotes em destaque"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.pacotesSubtitulo ?? "Confira algumas sugestões de pacotes. Nossos consultores podem montar o roteiro ideal para você."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  pkg.highlight ? "ring-2 ring-[#FF9100]" : ""
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={pkg.image}
                    alt={pkg.destination}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className={`absolute top-3 left-3 ${
                    pkg.highlight ? "bg-[#FF9100]" : "bg-[#001A9E]"
                  } text-white border-0`}>
                    {pkg.tag}
                  </Badge>
                  {pkg.highlight && (
                    <Badge className="absolute top-3 right-3 bg-[#E68200] text-white border-0">
                      <Star className="w-3 h-3 mr-1" /> Destaque
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-[#2D2D2D] text-lg">{pkg.destination}</h3>
                      <p className="text-sm text-[#777777] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {pkg.location}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[#001A9E] border-[#8ECAE6]">
                      <Clock className="w-3 h-3 mr-1" />
                      {pkg.duration}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {pkg.includes.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs bg-[#F0F0F0] text-[#404040] px-2.5 py-1 rounded-full"
                      >
                        <Check className="w-3 h-3 text-[#06D6A0]" />
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Badge de economia para assinantes */}
                  <div className="border-t border-[#E8E8E8] pt-4 mb-4">
                    <div className="flex items-center gap-2 bg-[#E8FAF4] border border-[#A0E8D0] rounded-xl p-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4F5E9] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-[#06D6A0]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#047A5E]">Assinante economiza {pkg.savings}</p>
                        <p className="text-[11px] text-[#06D6A0]">Condições exclusivas para assinantes RDC</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#FF9100] to-[#E68200] hover:from-orange-600 hover:to-orange-700 text-white text-base py-5 rounded-2xl font-semibold shadow-md"
                    onClick={scrollToForm}
                  >
                    Consultar valores
                  </Button>
                  <Link href="/assinaturas">
                    <p className="text-xs text-[#0020B8] hover:text-[#001070] text-center mt-3 cursor-pointer transition-colors">
                      Ainda não é assinante? <span className="font-semibold underline">Conheça os planos</span>
                    </p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-[#777777] text-sm mb-2">
              Estes são apenas algumas sugestões. Podemos montar o <strong>pacote ideal</strong> para qualquer destino.
            </p>
            <p className="text-[#999999] text-xs mb-4">
              * Pacotes sujeitos a disponibilidade e temporada. Consulte condições com nossos consultores.
            </p>
            <Button
              size="lg"
              className="bg-[#FF9100] hover:bg-[#E68200] text-white"
              onClick={scrollToForm}
            >
              Quero um roteiro personalizado
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="formulario-cotacao" className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#001A9E]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-white/20 text-white border-0">
                {c.formBadge ?? "Fale Conosco"}
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
                {c.formTitulo ?? "Solicite sua cotação"}
              </h2>
              <p className="text-[#C7E5F3] max-w-2xl mx-auto leading-relaxed">{c.formSubtitulo ?? "Preencha o formulário e nossa equipe entrará em contato para montar o roteiro perfeito para você."}</p>
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-white">
                  <HeadphonesIcon className="w-5 h-5 text-[#FFB040]" />
                  <span className="text-sm">Consultor dedicado</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-[#FFB040]" />
                  <span className="text-sm">Resposta em até 24h</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-[#FFB040]" />
                  <span className="text-sm">Cotação sem compromisso</span>
                </div>
              </div>
            </div>

            <div>
                {isSubmitted ? (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-10 pb-10">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#D4F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
                          <Check className="w-10 h-10 text-[#06D6A0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#2D2D2D] mb-3">
                          Solicitação enviada!
                        </h3>
                        <p className="text-[#555555] mb-6 max-w-md mx-auto">
                          Recebemos seus dados e em breve um de nossos consultores entrará em contato
                          {formData.contactChannel === "whatsapp" ? " pelo WhatsApp" : " por ligação"} no horário de sua preferência.
                        </p>
                        <Button
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData(initialFormData);
                          }}
                          className="bg-[#FF9100] hover:bg-[#E68200] text-white"
                        >
                          Enviar nova solicitação
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-8 pb-8">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome completo *</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Seu nome completo"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">E-mail *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Celular (WhatsApp) *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="(00) 00000-0000"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="destination">Destino desejado</Label>
                            <Input
                              id="destination"
                              name="destination"
                              placeholder="Ex: Porto de Galinhas"
                              value={formData.destination}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="travelDate">Data prevista da viagem</Label>
                            <Input
                              id="travelDate"
                              name="travelDate"
                              type="month"
                              value={formData.travelDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="travelers">Número de viajantes</Label>
                            <Select
                              value={formData.travelers}
                              onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, travelers: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 pessoa</SelectItem>
                                <SelectItem value="2">2 pessoas</SelectItem>
                                <SelectItem value="3">3 pessoas</SelectItem>
                                <SelectItem value="4">4 pessoas</SelectItem>
                                <SelectItem value="5+">5 ou mais</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Conte mais sobre sua viagem</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Descreva o que você imagina para essa viagem: tipo de hospedagem, atividades, orçamento estimado..."
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label>Canal de preferência para contato *</Label>
                          <RadioGroup
                            value={formData.contactChannel}
                            onValueChange={(value) =>
                              setFormData((prev) => ({ ...prev, contactChannel: value }))
                            }
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="whatsapp" id="agencia-whatsapp" />
                              <Label htmlFor="agencia-whatsapp" className="flex items-center gap-2 cursor-pointer font-normal">
                                <MessageCircle className="w-4 h-4 text-[#06D6A0]" />
                                WhatsApp
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ligacao" id="agencia-ligacao" />
                              <Label htmlFor="agencia-ligacao" className="flex items-center gap-2 cursor-pointer font-normal">
                                <Phone className="w-4 h-4 text-[#0020B8]" />
                                Ligação
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>Horário de preferência para contato *</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {contactTimes.map((time) => (
                              <Button
                                key={time.value}
                                type="button"
                                variant={formData.contactTime === time.value ? "default" : "outline"}
                                className={`${
                                  formData.contactTime === time.value
                                    ? "bg-[#FF9100] hover:bg-[#E68200] text-white"
                                    : "hover:border-[#FF9100] hover:text-[#E68200]"
                                }`}
                                onClick={() =>
                                  setFormData((prev) => ({ ...prev, contactTime: time.value }))
                                }
                              >
                                {time.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#FF9100] hover:bg-[#E68200] text-white py-6 mt-4"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Solicitar cotação
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-[#777777]">
                          Seus dados estão seguros. Não compartilhamos suas informações.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">
              <HelpCircle className="w-4 h-4 mr-1" />
              {c.faqBadge ?? "Perguntas Frequentes"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              {c.faqTitulo ?? "Dúvidas sobre a agência"}
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.faqSubtitulo ?? "Respondemos as perguntas mais comuns sobre nossos serviços de agência."}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Preciso ser assinante para usar a agência de viagens?",
                a: "Não! A agência RDC atende todos os viajantes. Porém, assinantes contam com tarifas diferenciadas, atendimento prioritário e condições exclusivas que podem gerar uma economia significativa."
              },
              {
                q: "Como funciona a cotação de pacotes?",
                a: "Basta preencher o formulário de cotação nesta página ou entrar em contato pelo WhatsApp. Nosso consultor irá entender suas preferências (destino, datas, número de viajantes) e montar uma proposta personalizada em até 24 horas úteis."
              },
              {
                q: "A agência monta roteiros personalizados?",
                a: "Sim! Montamos roteiros 100% personalizados de acordo com seu perfil, orçamento e preferências. Desde viagens românticas e lua de mel até viagens em família ou com amigos, cuidamos de cada detalhe."
              },
              {
                q: "Quais formas de pagamento são aceitas?",
                a: "Aceitamos cartão de crédito, PIX e transferência bancária. Para pacotes em geral, parcelamento em até 10x sem juros (dependendo do pacote). Para somente aéreo, parcelamento em até 8x com parcela mínima de R$ 150,00."
              },
              {
                q: "A agência oferece suporte durante a viagem?",
                a: "Sim! Nossos consultores ficam disponíveis durante toda a sua viagem para auxiliar com qualquer necessidade, alteração de roteiro ou imprevisto. Você viaja com a tranquilidade de ter suporte dedicado."
              },
              {
                q: "Qual a diferença de preço para assinantes?",
                a: "Assinantes RDC têm acesso a tarifas negociadas com desconto e atendimento prioritário. A economia pode chegar a 20% em relação aos preços de mercado, dependendo do destino e período."
              },
              {
                q: "Posso usar minhas diárias da assinatura junto com pacotes da agência?",
                a: "Sim! Você pode combinar suas diárias da assinatura com os serviços da agência (aéreo, traslados, passeios, ingressos) para montar uma viagem completa com o melhor custo-benefício."
              },
              {
                q: "Em quanto tempo recebo a cotação?",
                a: "Após o envio da solicitação, nosso time retorna com a proposta personalizada em até 24 horas úteis. Para solicitações urgentes, entre em contato pelo WhatsApp para atendimento imediato."
              },
            ].map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-[#777777] mb-4">Ainda tem dúvidas?</p>
            <Link href="/duvidas">
              <Button variant="outline" className="border-[#001A9E] text-[#001A9E] hover:bg-[#F6F6F6]">
                Ver todas as perguntas frequentes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA - Become a subscriber */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              {c.ctaTitulo ?? "Viaje com mais economia sendo assinante"}
            </h2>
            <p className="text-xl text-[#8ECAE6] mb-8 leading-relaxed">{c.ctaTexto ?? "Qualquer pessoa pode viajar com a agência RDC, mas assinantes contam com tarifas diferenciadas, atendimento prioritário e condições especiais. Descubra como economizar ainda mais."}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assinaturas">
                <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8">
                  {c.ctaBotao1 ?? "Conhecer planos de assinatura"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contato">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                  {c.ctaBotao2 ?? "Falar com a equipe"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
