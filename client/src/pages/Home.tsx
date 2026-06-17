import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { CtaLink } from "@/components/CtaLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Star, 
  MapPin, 
  Building2, 
  Headphones,
  Award,
  Users,
  Calendar,
  ArrowRight,
  Plane,
  Hotel,
  Globe,
  Mail,
  Send,
  User,
  Repeat,
  Anchor,
  Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import SEO from "@/components/SEO";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useHomeContent } from "@/hooks/useHomeContent";
import { getRedesHoteleiras } from "@/lib/contentService";
const heroSlides = [
  {
    id: 1,
    type: "institucional" as const,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-institucional-v2-6yHXJTBkcBCnQNZRsxDPn9.webp",
    badge: "O jeito inteligente de viajar o ano todo",
    title: "Transformamos inten\u00e7\u00e3o em",
    highlight: "jornada",
    subtitle: "h\u00e1 mais de 35 anos",
    description: "Somos guias de jornadas transformadoras. Facilitamos o acesso a viagens com planejamento inteligente, economia real e liberdade para explorar o ano todo.",
    link: null,
    cta: null,
  },
  {
    id: 2,
    type: "assinatura" as const,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-assinatura-v2-NAvxMgAH9q7Byv9moYEwre.webp",
    badge: "Assinatura de Viagens RDC",
    title: "O jeito inteligente de",
    highlight: "viajar",
    subtitle: "o ano todo",
    description: "Planejamento inteligente, economia real e mais momentos em fam\u00edlia. Com a Assinatura RDC, voc\u00ea transforma meses em mem\u00f3rias.",
    link: "/assinaturas",
    cta: "Quero come\u00e7ar minha jornada",
  },
  {
    id: 3,
    type: "agencia" as const,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-agencia-fxpZAPvpvCEkRaWfhaKcEe.webp",
    badge: "Ag\u00eancia de Viagens RDC",
    title: "Sua pr\u00f3xima",
    highlight: "descoberta",
    subtitle: "come\u00e7a com um bom plano",
    description: "Nossos consultores j\u00e1 trilharam esse caminho milhares de vezes. Roteiros sob medida, atendimento dedicado e a experi\u00eancia de quem entende de viagem.",
    link: "/agencia",
    cta: "Vamos planejar juntos?",
  },
  {
    id: 4,
    type: "corporativo" as const,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-corporativo-v2-h8fr5CHGub7t9PRDANetgf.webp",
    badge: "Solu\u00e7\u00f5es para Empresas",
    title: "Intelig\u00eancia em viagens",
    highlight: "corporativas",
    subtitle: "",
    description: "Premia\u00e7\u00e3o com viagens, gest\u00e3o inteligente e parcerias estrat\u00e9gicas. Mais de 35 anos de experi\u00eancia transformando a forma como empresas viajam.",
    link: "/solucoes-corporativas",
    cta: "Descubra nossas solu\u00e7\u00f5es",
  },
];

const stats = [
  { value: "+35", label: "Anos de experiência" },
  { value: "+200 mil", label: "Destinos disponíveis" },
  { value: "+1 milhão", label: "Diárias entregues" },
  { value: "NPS 75", label: "Satisfação dos assinantes" }
];

const features = [
  { icon: Calendar, title: "+35 anos de experiência", description: "Tradição e expertise no mercado de turismo brasileiro" },
  { icon: MapPin, title: "+200 mil destinos", description: "Hotéis e resorts no Brasil e no mundo" },
  { icon: Repeat, title: "Viaje o ano todo", description: "Planeje múltiplas viagens ao longo do ano com economia" },
  { icon: Headphones, title: "Atendimento humanizado", description: "Equipe dedicada para cuidar da sua viagem" }
];

const corporateSolutions = [
  { title: "RDC Premiação", description: "Benefício corporativo que transforma vidas. Ofereça viagens como reconhecimento para seus colaboradores.", href: "/solucoes-corporativas#premiacao", cta: "Descubra como premiar", logo: "/logos/b2b/logo-premiacao.svg", ctaBg: "bg-[#FFEA01] hover:bg-[#E6D300] text-[#2D2D2D]" },
  { title: "RDC Gestão de Viagens", description: "Gestão completa de viagens corporativas com eficiência, controle e economia.", href: "/solucoes-corporativas#gestao", cta: "Conheça a gestão inteligente", logo: "/logos/b2b/logo-gestao.svg", ctaBg: "bg-[#E8506A] hover:bg-[#D04058] text-white" },
  { title: "RDC Parcerias", description: "Alianças estratégicas para criar novos canais de aquisição e valor agregado.", href: "/solucoes-corporativas#parcerias", cta: "Vamos construir juntos?", logo: "/logos/b2b/logo-parcerias.svg", ctaBg: "bg-[#9B6AE0] hover:bg-[#8050C0] text-white" }
];

const redesHoteleirasHome = [
  { nome: "Accor", descricao: "Ibis, Novotel, Mercure, Pullman, Sofitel", logo: "https://www.google.com/s2/favicons?domain=accor.com&sz=64" },
  { nome: "Atlântica", descricao: "Comfort, Quality, Radisson, Four Points", logo: "https://www.google.com/s2/favicons?domain=atlanticahotels.com.br&sz=64" },
  { nome: "Hilton", descricao: "Hampton, DoubleTree, Conrad, Waldorf Astoria", logo: "https://www.google.com/s2/favicons?domain=hilton.com&sz=64" },
  { nome: "Hyatt", descricao: "Grand Hyatt, Hyatt Regency, Park Hyatt", logo: "https://www.google.com/s2/favicons?domain=hyatt.com&sz=64" },
  { nome: "IHG", descricao: "Holiday Inn, Crowne Plaza, InterContinental", logo: "https://www.google.com/s2/favicons?domain=ihg.com&sz=64" },
  { nome: "Laghetto", descricao: "Laghetto Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=laghettohoteis.com.br&sz=64" },
  { nome: "Marriott", descricao: "Courtyard, Sheraton, W Hotels, Ritz-Carlton", logo: "https://www.google.com/s2/favicons?domain=marriott.com&sz=64" },
  { nome: "Meliá", descricao: "Meliá, Tryp, Sol, Innside", logo: "https://www.google.com/s2/favicons?domain=melia.com&sz=64" },
  { nome: "Vila Galé", descricao: "Vila Galé Resorts, Vila Galé Collection", logo: "https://www.google.com/s2/favicons?domain=vilagale.com&sz=64" },
  { nome: "WAM", descricao: "WAM Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=wamhoteis.com.br&sz=64" },
  { nome: "Wyndham", descricao: "Ramada, Tryp, Howard Johnson, Days Inn", logo: "https://www.google.com/s2/favicons?domain=wyndhamhotels.com&sz=64" },
];

const destinationCategories = [
  {
    name: "Destinos Nacionais",
    description: "Praias paradisíacas, serras encantadoras e cidades históricas. O Brasil inteiro ao seu alcance.",
    highlights: ["Nordeste", "Serra Gaúcha", "Chapada Diamantina", "Pantanal"],
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
    link: "/destinos",
    icon: MapPin
  },
  {
    name: "Destinos Internacionais",
    description: "Europa, Caribe, América do Sul e muito mais. O mundo espera por você.",
    highlights: ["Europa", "Caribe", "América do Sul", "Ásia"],
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
    link: "/destinos",
    icon: Globe
  },
  {
    name: "Cruzeiros",
    description: "Navegue pelos mares mais bonitos do mundo com conforto e sofisticação.",
    highlights: ["Marítimos", "Fluviais", "Temáticos", "Expedições"],
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    link: "/destinos",
    icon: Anchor
  },
  {
    name: "Experiências Exclusivas",
    description: "Resorts all inclusive, lua de mel, ecoturismo e roteiros temáticos sob medida.",
    highlights: ["All Inclusive", "Lua de Mel", "Ecoturismo", "Roteiros Temáticos"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    link: "/destinos",
    icon: Sparkles
  }
];

export default function Home() {
  const [, navigate] = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [cmsRedes, setCmsRedes] = useState<any[]>([]);

  useEffect(() => {
    getRedesHoteleiras().then((r) => { if (r && r.length) setCmsRedes(r); }).catch(() => {});
  }, []);

  const c = useHomeContent();
  const redes = cmsRedes.length ? cmsRedes : redesHoteleirasHome;
  const slides = c.hero && c.hero.length ? c.hero : heroSlides;
  const statsData = c.stats && c.stats.length ? c.stats : stats;
  const featuresData = features.map((f, i) => ({ ...f, ...(c.features?.[i] ?? {}) }));
  const corpData = corporateSolutions.map((sol, i) => ({ ...sol, ...(c.corpSolucoes?.[i] ?? {}) }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterName.trim()) {
      toast.error("Por favor, insira seu nome.");
      return;
    }
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }
    setNewsletterLoading(true);
    setTimeout(() => {
      setNewsletterLoading(false);
      setNewsletterName("");
      setNewsletterEmail("");
      toast.success("Inscrição realizada! Você receberá inspirações e dicas de viagem no seu e-mail.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Assinatura de Viagens com até 60% de Economia"
        description="Assinatura de viagens com até 60% de economia em mais de 200 mil hotéis e resorts no Brasil e no mundo. 7 diárias por ano e tarifa exclusiva ilimitada. Conheça!"
        keywords="assinatura de viagens, RDC Viagens, clube de viagens, hospedagem com desconto, hotéis 4 e 5 estrelas, viagens planejadas, economia em viagens, turismo Brasil, Accor, Marriott, Hilton"
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "RDC Viagens",
          "url": "https://rdcviagens.com.br",
          "logo": "https://rdcviagens.com.br/logo.png",
          "description": "Pioneira em assinatura de viagens no Brasil há mais de 35 anos. Acesso a +200 mil hotéis e resorts com economia de até 60%.",
          "foundingDate": "1991",
          "telephone": "0800-055-2600",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR"
          },
          "sameAs": [
            "https://www.instagram.com/rdcviagens",
            "https://www.facebook.com/rdcviagens",
            "https://www.linkedin.com/company/rdcviagens"
          ]
        }}
      />
      <Header />
      
      {/* 1. Hero Carousel */}
      <section className="relative h-[85vh] min-h-[500px] md:h-screen md:min-h-[600px] max-h-[900px] overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}`}>
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
            <div className="relative h-full container flex items-center">
              <div className="max-w-2xl text-white pt-20 md:pt-28 px-4 sm:px-6 md:px-0">
                <Badge className="mb-3 md:mb-4 bg-[#FF9100] hover:bg-[#E68200] text-white border-0">{slide.badge}</Badge>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
                  {slide.title}{" "}<span className="text-[#FF9100] italic">{slide.highlight}</span>{" "}{slide.subtitle}
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#D6D6D6] mb-4 md:mb-8 line-clamp-3 md:line-clamp-none">{slide.description}</p>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {(!slide.cta || !slide.link) ? (
                    /* Slide institucional: sem link, apenas informações */
                    <div className="flex flex-wrap gap-3 mt-2">
                      {["+35 anos de experi\u00eancia", "+200 mil destinos", "+1 milh\u00e3o de di\u00e1rias entregues"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs md:text-sm text-[#D6D6D6]">
                          <Check className="w-4 h-4 text-[#FF9100]" />{item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Slides com link: CTA direciona para a respectiva p\u00e1gina */
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(slide.link!); }}
                      className="inline-flex items-center gap-1 md:gap-2 h-9 md:h-11 px-4 md:px-8 bg-[#FF9100] hover:bg-[#E68200] text-white rounded-full text-xs md:text-sm font-medium transition-colors cursor-pointer"
                    >
                      {slide.cta} <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-1 md:left-4 top-[65%] md:top-1/2 -translate-y-1/2 w-7 h-7 md:w-12 md:h-12 rounded-full bg-black/30 md:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20" aria-label="Slide anterior">
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-1 md:right-4 top-[65%] md:top-1/2 -translate-y-1/2 w-7 h-7 md:w-12 md:h-12 rounded-full bg-black/30 md:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-20" aria-label="Próximo slide">
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-[#FF9100]" : "w-2 bg-white/50"}`} aria-label={`Ir para slide ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* 2. Stats */}
      <section className="py-10 md:py-12 bg-[#00148A] text-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF9100] mb-1">{stat.value}</div>
                <div className="text-sm text-[#8ECAE6]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* 3. About */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-6">{c.sobreTitulo ?? "Transformamos o sonho de viajar em realidade"}</h2>
              <p className="text-[#555555] mb-4 leading-relaxed">A RDC Viagens nasceu com o propósito de <strong>democratizar o acesso a viagens de qualidade</strong>. Acreditamos que viajar não é luxo, é necessidade — e todos merecem <strong>experiências transformadoras</strong>.</p>
              <p className="text-[#555555] mb-8 leading-relaxed">Com mais de <strong>três décadas de experiência</strong>, desenvolvemos soluções inovadoras que permitem que famílias e empresas planejem suas viagens com <strong>economia, previsibilidade</strong> e o suporte de uma <strong>equipe dedicada</strong>.</p>
              <CtaLink href={c.sobreCtaLink ?? "/sobre"}><Button className="bg-[#001A9E] hover:bg-[#001070]">{c.sobreCta ?? "Conheça nossa história"} <ArrowRight className="ml-2 h-4 w-4" /></Button></CtaLink>
            </div>
            <div className="relative">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ImYicCgyeERQbRNm.jpg" alt="Destino turístico brasileiro" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-[#001A9E] text-white p-4 md:p-6 rounded-2xl shadow-lg">
                <div className="text-2xl md:text-4xl font-bold">{c.sobreBadge ?? "+35"}</div>
                <div className="text-xs md:text-sm text-[#8ECAE6]">anos de história</div>
              </div>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* 4. Features */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{c.porqueTitulo ?? "Por que escolher a RDC Viagens?"}</h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.porqueSubtitulo ?? "Combinamos experiência, tecnologia e atendimento humanizado para oferecer as melhores soluções de viagem."}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuresData.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-3 md:mb-4">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-[#001A9E]" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-lg text-[#2D2D2D] mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-[#555555] text-xs md:text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* 5. Redes Hoteleiras */}
      <section className="py-12 md:py-16 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E] border-0">{c.redesBadge ?? "+200 mil destinos"}</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3">{c.redesTitulo ?? "Redes hoteleiras parceiras"}</h2>
            <p className="text-[#555555] max-w-2xl mx-auto">{c.redesSubtitulo ?? "Hospede-se nas maiores e melhores redes do Brasil e do mundo. Todas disponíveis para nossos assinantes."}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {redes.map((rede) => (
              <div key={rede.nome} className="bg-[#F6F6F6] rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <img src={rede.logo} alt={rede.nome} className="w-10 h-10 mb-2 object-contain" />
                <span className="font-semibold text-sm text-[#2D2D2D]">{rede.nome}</span>
                <span className="text-[11px] text-[#777777] leading-tight mt-1">{rede.descricao}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-[#777777] mb-4">{c.redesNota ?? "E mais de 16 redes e milhares de hotéis independentes em todo o mundo."}</p>
            <CtaLink href={c.redesCtaLink ?? "/destinos"}>
              <Button variant="outline" className="border-[#001A9E] text-[#001A9E] hover:bg-[#F6F6F6]">{c.redesCta ?? "Ver todos os destinos"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </CtaLink>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* 6. Destinations */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{c.destinosTitulo ?? "Destinos que esperam por você"}</h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">{c.destinosSubtitulo ?? "Do litoral brasileiro aos destinos mais exclusivos do mundo, a RDC leva você para onde sua jornada pedir."}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {destinationCategories.map((cat, index) => {
              const IconComp = cat.icon;
              return (
                <Link key={index} href={cat.link}>
                  <div className="group relative h-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-full bg-[#FF9100] flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">{cat.name}</h3>
                      <p className="text-[#D6D6D6] text-xs md:text-sm mb-3 leading-relaxed">{cat.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.highlights.map((h) => (
                          <span key={h} className="text-[10px] md:text-xs bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* 7. B2C - RDC Assinaturas */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#FFF0D6] text-[#CC7400] border-0">{c.assinaturasBadge ?? "Para você e sua família"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{c.assinaturasTitulo ?? "RDC Assinaturas"}</h2>
              <p className="text-base md:text-xl text-[#555555] mb-4 md:mb-6"><strong>O jeito inteligente de viajar o ano todo.</strong> Com uma mensalidade acessível, você viaja <strong>mais vezes</strong>, para <strong>mais destinos</strong>, com quem você ama.</p>
              <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{c.assinaturasCardTitulo ?? "Assinatura de Viagens"}</h3>
                <p className="text-[#555555] text-sm mb-4">Hospedagem em hotéis e resorts com <strong>economia de até 60%</strong>. Planeje suas viagens ao longo do ano com <strong>previsibilidade</strong> e o suporte de uma <strong>agência dedicada</strong>.</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(c.assinaturasBullets ?? ["Planejamento facilitado", "Economia real", "Agência dedicada", "Não compromete o limite do cartão"]).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#404040]"><Check className="w-4 h-4 text-[#FF9100]" />{item}</li>
                  ))}
                </ul>
              </div>
              <CtaLink href={c.assinaturasCtaLink ?? "/assinaturas"}><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200]">{c.assinaturasCta ?? "Conhecer planos"} <ArrowRight className="ml-2 h-4 w-4" /></Button></CtaLink>
            </div>
            <div>
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ZRWneGwCmJVBYcRx.jpg" alt="Praia paradisíaca" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Agência de Viagens */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=800&fit=crop" alt="Destino paradisíaco" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#00148A]/70" />
        </div>
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#FF9100]/20 text-[#FFB040] border-0 backdrop-blur-sm">
              <Plane className="w-3 h-3 mr-1" />{c.agenciaBadge ?? "Agência de Viagens RDC"}
            </Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              {c.agenciaTitulo ?? "Sua jornada completa, com a nossa expertise"}
            </h2>
            <p className="text-lg text-[#C7E5F3] mb-8 leading-relaxed max-w-2xl mx-auto">
              Aéreo, hospedagem, transfers, cruzeiros e passeios em um só lugar. Nossa agência monta o <strong className="text-white">roteiro ideal para qualquer destino</strong>, com condições especiais para assinantes.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-10 max-w-lg mx-auto">
              {[
                { icon: "\u2708\uFE0F", label: "Aéreo" },
                { icon: "\uD83C\uDFE8", label: "Hospedagem" },
                { icon: "\uD83D\uDE90", label: "Transfers" },
                { icon: "\uD83D\uDEA2", label: "Cruzeiros" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            <CtaLink href={c.agenciaCtaLink ?? "/agencia"}>
              <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full">
                {c.agenciaCta ?? "Conhecer a agência"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 9. B2B - Soluções Corporativas */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">{c.corpBadge ?? "Soluções Corporativas"}</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{c.corpTitulo ?? "Viagens a serviço do seu negócio"}</h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">Conectamos viagens aos <strong>objetivos estratégicos</strong> da sua organização, oferecendo soluções que fortalecem <strong>engajamento, reconhecimento e experiência</strong>.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {corpData.map((solution, index) => (
              <Card key={index} className="border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-full flex justify-center mb-6">
                    <img src={solution.logo} alt={solution.title} className="h-14 object-contain" />
                  </div>
                  <p className="text-[#555555] text-sm mb-8 leading-relaxed flex-1">{solution.description}</p>
                  <Link href={solution.href} className="w-full">
                    <Button className={`w-full rounded-full font-semibold ${solution.ctaBg}`}>
                      {solution.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <CtaLink href={c.corpCtaLink ?? "/solucoes-corporativas"}><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full">{c.corpCta ?? "Explorar todas as soluções"} <ArrowRight className="ml-2 h-4 w-4" /></Button></CtaLink>
          </div>
        </div>
      </section>

      {/* 10. Trust Badges */}
      <TrustBadges />

      {/* 11. Newsletter */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#FF9100] to-[#E68200] text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              {c.newsTitulo ?? "Receba inspirações e oportunidades de viagem"}
            </h2>
            <p className="text-sm md:text-lg text-[#FFF0D6] mb-6 md:mb-8">
              Inscreva-se na nossa newsletter e receba <strong>dicas de destinos e novidades</strong> da RDC Viagens direto no seu e-mail.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    className="pl-10 h-12 bg-white text-[#2D2D2D] border-0 rounded-full placeholder:text-[#999999]"
                  />
                </div>
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <Input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="pl-10 h-12 bg-white text-[#2D2D2D] border-0 rounded-full placeholder:text-[#999999]"
                  />
                </div>
              </div>
              <Button type="submit" size="lg" disabled={newsletterLoading} className="bg-[#00148A] hover:bg-[#001070] text-white px-8 rounded-full h-12 w-full sm:w-auto sm:mx-auto">
                {newsletterLoading ? "Enviando..." : "Inscrever-se"}
                {!newsletterLoading && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            <p className="text-xs text-[#FFCC80] mt-4">
              Ao se inscrever, você concorda com nossa{" "}
              <Link href="/termos" className="underline hover:text-white">Política de Privacidade</Link>. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}