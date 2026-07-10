"use client";

import { useState, useEffect, useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Check, MapPin, Headphones, Calendar,
  ArrowRight, Globe, Mail, Send, User, Repeat, Anchor, Sparkles, Plane, Hotel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import TrustBadges from "@/components/TrustBadges";
import { CountUp } from "@/components/CountUp";
import { heroSlides, stats as fallbackStats, corporateSolutions, redesHoteleiras, destinationCategories } from "@/lib/content";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions";
import { RDStationForm } from "@/components/RDStationForm";
import { RD_FORMS } from "@/lib/rdstation";
import type { HomeContent } from "@/lib/cms";

const features = [
  { icon: Calendar, title: "+35 anos de experiência", description: "Tradição e expertise no mercado de turismo brasileiro" },
  { icon: MapPin, title: "+200 mil destinos", description: "Hotéis e resorts no Brasil e no mundo" },
  { icon: Repeat, title: "Viaje o ano todo", description: "Planeje múltiplas viagens ao longo do ano com economia" },
  { icon: Headphones, title: "Atendimento humanizado", description: "Equipe dedicada para cuidar da sua viagem" },
];

const iconMap = { MapPin, Globe, Anchor, Sparkles } as const;
const initialState: NewsletterState = { ok: false, message: "" };

type Rede = { nome: string; descricao?: string; logo?: string };

export default function HomeClient({ cms, redesCms = [] , newsletterFormId }: { cms: HomeContent; redesCms?: Rede[] ; newsletterFormId?: string }) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  const slides = cms.hero?.length
    ? cms.hero.map((h, i) => ({
        id: i,
        image: h.image ?? heroSlides[i % heroSlides.length].image,
        badge: h.badge ?? "", title: h.title ?? "", highlight: h.highlight ?? "",
        subtitle: h.subtitle ?? "", description: h.description ?? "",
        link: h.link ?? null, cta: h.cta ?? null,
      }))
    : heroSlides;
  const stats = cms.stats?.length ? cms.stats : fallbackStats;
  const corpData = corporateSolutions.map((s) => { const o = (cms.corpSolucoes ?? []).find((x) => x?.title === s.title); return o ? { ...s, ...o } : s; });
  const bullets = cms.assinaturasBullets?.length ? cms.assinaturasBullets : ["Planejamento facilitado", "Economia real", "Agência dedicada", "Não compromete o limite do cartão"];
  const redes: Rede[] = redesCms.length ? redesCms : redesHoteleiras;

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 10000);
    return () => clearInterval(t);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero */}
      <section className="relative h-[85vh] min-h-[500px] md:h-screen md:min-h-[600px] max-h-[900px] overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id ?? index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}>
            <div className="absolute inset-0">
              <Image src={slide.image} alt={slide.title || "RDC Viagens"} fill priority={index === 0} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
            <div className="relative h-full container flex items-center">
              <div className="max-w-2xl text-white pt-24 md:pt-28">
                {slide.badge && <Badge className="mb-3 md:mb-4 bg-[#FF9100] text-white">{slide.badge}</Badge>}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
                  {slide.title}{" "}<span className="text-[#FF9100] italic">{slide.highlight}</span>{" "}{slide.subtitle}
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-[#D6D6D6] mb-4 md:mb-8">{slide.description}</p>
                {(!slide.cta || !slide.link) ? (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["+35 anos de experiência", "+200 mil destinos", "+1 milhão de diárias entregues"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs md:text-sm text-[#D6D6D6]"><Check className="w-4 h-4 text-[#FF9100]" />{item}</div>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => router.push(slide.link!)} className="inline-flex items-center gap-2 h-9 md:h-11 px-4 md:px-8 bg-[#FF9100] hover:bg-[#E68200] text-white rounded-full text-xs md:text-sm font-medium transition-colors">
                    {slide.cta} <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} aria-label="Slide anterior" className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 z-20"><ChevronLeft className="w-4 h-4 md:w-6 md:h-6" /></button>
        <button onClick={nextSlide} aria-label="Próximo slide" className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 z-20"><ChevronRight className="w-4 h-4 md:w-6 md:h-6" /></button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} aria-label={`Ir para slide ${index + 1}`} className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-[#FF9100]" : "w-2 bg-white/50"}`} />
          ))}
        </div>
      </section>

      {/* 2. Stats (contador animado) */}
      <section className="py-10 md:py-12 bg-[#00148A] text-white">
        <AnimateOnScroll>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#FF9100] mb-1"><CountUp value={String(stat.value ?? "")} /></div>
                  <div className="text-sm text-[#8ECAE6]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 3. About */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-6">{cms.sobreTitulo ?? "Transformamos o sonho de viajar em realidade"}</h2>
                <p className="text-[#555555] mb-4 leading-relaxed">A RDC Viagens nasceu com o propósito de <strong>democratizar o acesso a viagens de qualidade</strong>. Acreditamos que viajar não é luxo, é necessidade — e todos merecem <strong>experiências transformadoras</strong>.</p>
                <p className="text-[#555555] mb-8 leading-relaxed">Com mais de <strong>três décadas de experiência</strong>, desenvolvemos soluções inovadoras que permitem que famílias e empresas planejem suas viagens com <strong>economia, previsibilidade</strong> e o suporte de uma <strong>equipe dedicada</strong>.</p>
                <Link href="/sobre"><Button className="bg-[#001A9E] hover:bg-[#001070]">{cms.sobreCta ?? "Conheça nossa história"} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
              <div className="relative">
                <Image src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ImYicCgyeERQbRNm.jpg" alt="Destino turístico brasileiro" width={800} height={600} className="rounded-2xl shadow-2xl w-full h-auto" />
                <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-[#001A9E] text-white p-4 md:p-6 rounded-2xl shadow-lg">
                  <div className="text-2xl md:text-4xl font-bold">{cms.sobreBadge ?? "+35"}</div>
                  <div className="text-xs md:text-sm text-[#8ECAE6]">anos de história</div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 4. Features */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll>
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{cms.porqueTitulo ?? "Por que escolher a RDC Viagens?"}</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">{cms.porqueSubtitulo ?? "Combinamos experiência, tecnologia e atendimento humanizado para oferecer as melhores soluções de viagem."}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {features.map((f, i) => (
                <Card key={i} className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8F4FA] flex items-center justify-center mb-3 md:mb-4"><f.icon className="w-5 h-5 md:w-6 md:h-6 text-[#001A9E]" /></div>
                    <h3 className="font-semibold text-sm md:text-lg text-[#2D2D2D] mb-1 md:mb-2">{cms.features?.[i]?.title ?? f.title}</h3>
                    <p className="text-[#555555] text-xs md:text-sm">{cms.features?.[i]?.description ?? f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 5. Redes Hoteleiras (faixa contínua) */}
      <section className="py-12 md:py-16 bg-white">
        <AnimateOnScroll>
          <div className="container">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-[#E8F4FA] text-[#001A9E]">{cms.redesBadge ?? "+200 mil destinos"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3">{cms.redesTitulo ?? "Redes hoteleiras parceiras"}</h2>
              <p className="text-[#555555] max-w-2xl mx-auto">{cms.redesSubtitulo ?? "Hospede-se nas maiores e melhores redes do Brasil e do mundo. Todas disponíveis para nossos assinantes."}</p>
            </div>
          </div>
          <div className="marquee py-2">
            <div className="marquee-track gap-4">
              {[...redes, ...redes].map((rede, i) => (
                <div key={rede.nome + i} className="shrink-0 w-56 bg-[#F6F6F6] rounded-2xl p-4 flex items-center gap-3">
                  {rede.logo ? (
                    <span className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={rede.logo} alt={rede.nome} width={44} height={44} className="w-8 h-8 object-contain" />
                    </span>
                  ) : (
                    <span className="w-11 h-11 rounded-xl bg-[#001A9E]/10 flex items-center justify-center shrink-0"><Hotel className="w-5 h-5 text-[#001A9E]" /></span>
                  )}
                  <span className="min-w-0 text-left">
                    <span className="block font-semibold text-sm text-[#2D2D2D] truncate">{rede.nome}</span>
                    <span className="block text-[11px] text-[#777777] leading-tight truncate">{rede.descricao}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <div className="text-center mt-8">
              <p className="text-sm text-[#777777] mb-4">{cms.redesNota ?? "E mais de 16 redes e milhares de hotéis independentes em todo o mundo."}</p>
              <Link href="/destinos"><Button variant="outline">{cms.redesCta ?? "Ver todos os destinos"} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 6. Destinations */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll>
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{cms.destinosTitulo ?? "Destinos que esperam por você"}</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">{cms.destinosSubtitulo ?? "Do litoral brasileiro aos destinos mais exclusivos do mundo, a RDC leva você para onde sua jornada pedir."}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {destinationCategories.map((cat, index) => {
                const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? MapPin;
                return (
                  <Link key={index} href={cat.link}>
                    <div className="group relative h-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
                      <Image src={cat.image} alt={cat.name} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                      <div className="absolute top-4 left-4"><div className="w-10 h-10 rounded-full bg-[#FF9100] flex items-center justify-center"><Icon className="w-5 h-5 text-white" /></div></div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{cat.name}</h3>
                        <p className="text-[#D6D6D6] text-xs md:text-sm mb-3 leading-relaxed">{cat.description}</p>
                        <div className="flex flex-wrap gap-1.5">{cat.highlights.map((h) => (<span key={h} className="text-[10px] md:text-xs bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">{h}</span>))}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 7. RDC Assinaturas */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-[#FFF0D6] text-[#CC7400]">{cms.assinaturasBadge ?? "Para você e sua família"}</Badge>
                <h2 className="mb-4">
                  <Image src="/logos/b2c/RDC_assinaturas.png" alt={cms.assinaturasTitulo ?? "RDC Assinaturas"} width={264} height={99} className="h-11 md:h-14 w-auto" />
                </h2>
                <p className="text-base md:text-xl text-[#555555] mb-4 md:mb-6"><strong>O jeito inteligente de viajar o ano todo.</strong> Com uma mensalidade acessível, você viaja <strong>mais vezes</strong>, para <strong>mais destinos</strong>, com quem você ama.</p>
                <div className="bg-[#F6F6F6] rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{cms.assinaturasCardTitulo ?? "Assinatura de Viagens"}</h3>
                  <p className="text-[#555555] text-sm mb-4">Hospedagem em hotéis e resorts com <strong>economia de até 60%</strong>. Planeje suas viagens ao longo do ano com <strong>previsibilidade</strong> e o suporte de uma <strong>agência dedicada</strong>.</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {bullets.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-[#404040]"><Check className="w-4 h-4 text-[#FF9100]" />{item}</li>))}
                  </ul>
                </div>
                <Link href="/assinaturas"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white">{cms.assinaturasCta ?? "Conhecer planos"} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
              <div><Image src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ZRWneGwCmJVBYcRx.jpg" alt="Praia paradisíaca" width={800} height={600} className="rounded-2xl shadow-2xl w-full h-auto" /></div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 8. Agência */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=800&fit=crop" alt="Destino paradisíaco" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#00148A]/70" />
        </div>
        <AnimateOnScroll>
          <div className="relative container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-[#FF9100]/20 text-[#FFB040] backdrop-blur-sm"><Plane className="w-3 h-3 mr-1" />{cms.agenciaBadge ?? "Agência de Viagens RDC"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">{cms.agenciaTitulo ?? "Sua jornada completa, com a nossa expertise"}</h2>
              <p className="text-lg text-[#C7E5F3] mb-8 leading-relaxed max-w-2xl mx-auto">Aéreo, hospedagem, transfers, cruzeiros e passeios em um só lugar. Nossa agência monta o <strong className="text-white">roteiro ideal para qualquer destino</strong>, com condições especiais para assinantes.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-10 max-w-lg mx-auto">
                {[{ e: "✈️", l: "Aéreo" }, { e: "🏨", l: "Hospedagem" }, { e: "🚐", l: "Transfers" }, { e: "🚢", l: "Cruzeiros" }].map((it) => (
                  <div key={it.l} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"><span className="text-2xl mb-2 block">{it.e}</span><span className="text-white text-sm font-medium">{it.l}</span></div>
                ))}
              </div>
              <Link href="/agencia"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full">{cms.agenciaCta ?? "Conhecer a agência"} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 9. B2B */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll>
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E]">{cms.corpBadge ?? "Soluções Corporativas"}</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">{cms.corpTitulo ?? "Viagens a serviço do seu negócio"}</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">Conectamos viagens aos <strong>objetivos estratégicos</strong> da sua organização, oferecendo soluções que fortalecem <strong>engajamento, reconhecimento e experiência</strong>.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {corpData.map((sol, i) => (
                <Card key={i} className="border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-full flex justify-center mb-6 relative h-14"><Image src={sol.logo} alt={sol.title} width={150} height={56} className="h-14 w-auto object-contain" /></div>
                    <p className="text-[#555555] text-sm mb-8 leading-relaxed flex-1">{sol.description}</p>
                    <Link href={sol.href} className="w-full"><Button className={`w-full rounded-full font-semibold whitespace-normal h-auto min-h-[44px] py-2.5 text-sm leading-tight ${sol.ctaBg}`}>{sol.cta} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/solucoes-corporativas"><Button size="lg" className="bg-[#082B41] hover:bg-[#04161F] text-white px-8 rounded-full">{cms.corpCta ?? "Explorar todas as soluções"} <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* 10. Trust Badges */}
      <TrustBadges />

      {/* 11. Newsletter — texto à esquerda, formulário à direita */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#FF9100] to-[#E68200] text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Mail className="w-6 h-6 text-white" /></div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{cms.newsTitulo ?? "Receba inspirações e oportunidades de viagem"}</h2>
              </div>
              <p className="text-sm md:text-lg text-[#FFF0D6]">Inscreva-se na nossa newsletter e receba <strong>dicas de destinos e novidades</strong> da RDC Viagens direto no seu e-mail.</p>
            </div>
            <div>
              <RDStationForm formId={newsletterFormId || RD_FORMS.newsletter} />
              {state.message && <p className={`mt-3 text-sm font-medium ${state.ok ? "text-white" : "text-[#7A1F00]"}`}>{state.message}</p>}
              <p className="text-xs text-[#FFCC80] mt-3">Ao se inscrever, você concorda com nossa <Link href="/termos" className="underline hover:text-white">Política de Privacidade</Link>. Cancele quando quiser.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
