/**
 * Viaje Tranquilo - Serviço exclusivo para assinantes RDC
 * Preço: R$ 19,90 por reserva
 * Padrão visual: mesmo das demais páginas do site
 * Hero: gradiente azul escuro + blobs + wave divider
 * Seções: alternância branco / cinza claro
 */

import { useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Headphones,
  Clock,
  ShieldCheck,
  Hotel,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Phone,
  Globe,
  Shield,
  Send,
  User,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/* ─── Data ─── */
const benefits = [
  {
    icon: Headphones,
    title: "Prioridade de atendimento",
    description: "em nossa Central, via telefone ou chat.",
  },
  {
    icon: Clock,
    title: "Suporte emergencial 24 horas",
    description: "com atendimento humano.",
  },
  {
    icon: ShieldCheck,
    title: "Isenção da taxa RDC para alterações de reserva",
    description: "com repasse apenas das taxas dos fornecedores.",
  },
  {
    icon: Hotel,
    title: "Solicitação imediata de early check-in e late check-out",
    description: "sujeito à disponibilidade dos hotéis.",
  },
];

const faqs = [
  {
    question: "O que é o Viaje Tranquilo?",
    answer: "O Viaje Tranquilo é um serviço exclusivo para assinantes RDC que oferece atendimento personalizado e prioritário desde a reserva até o retorno da sua viagem, com suporte dedicado em todas as etapas.",
  },
  {
    question: "Como contratar o Viaje Tranquilo?",
    answer: "Você pode contratar o Viaje Tranquilo ao reservar sua hospedagem ou ao adquirir qualquer produto turístico com a RDC. A contratação pode ser feita on-line pelo Portal do Assinante, por chat ou por telefone com nosso Atendimento.",
  },
  {
    question: "O Viaje Tranquilo vale para todas as reservas?",
    answer: "Sim! O Viaje Tranquilo pode ser contratado para qualquer reserva de hospedagem ou produto turístico adquirido através da RDC Viagens.",
  },
  {
    question: "O suporte 24h funciona em viagens internacionais?",
    answer: "Sim! O suporte emergencial 24 horas funciona tanto para viagens nacionais quanto internacionais, com atendimento humano em português.",
  },
];

/* ─── Component ─── */
export default function ViajeTranquilo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSent(true);
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Viaje Tranquilo | Atendimento Personalizado | RDC Viagens"
        description="Viaje Tranquilo: serviço exclusivo por R$ 19,90 para assinantes RDC com prioridade de atendimento, suporte 24h, isenção de taxas e early check-in/late check-out."
        keywords="viaje tranquilo, atendimento personalizado viagem, suporte 24h viagem, RDC viagens assinante"
        canonical="https://rdcviagens.com.br/viaje-tranquilo"
      />
      <Header />

      {/* ════════════════════════════════════════════════════════════════
          HERO — Mesmo padrão do site (gradiente azul + blobs + wave)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-29 pb-12 md:pt-34 md:pb-16 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E68200] text-white border-0">
              Exclusivo para Assinantes
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Atendimento personalizado{" "}
              <span className="text-[#FF9100]">do início ao fim</span> da sua viagem
            </h1>
            <p className="text-base md:text-xl text-[#C7E5F3] mb-4 md:mb-6">
              Com o <strong className="text-white">Viaje Tranquilo</strong>, você conta com{" "}
              <strong className="text-white">suporte 24 horas</strong>, prioridade no atendimento e benefícios exclusivos para curtir cada momento sem preocupação.
            </p>
            <p className="text-sm md:text-lg text-[#FFB040] italic mb-6 md:mb-8">
              A partir de apenas R$ 19,90 por reserva.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#FF9100] hover:bg-[#E68200] text-white px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-full"
                onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Quero viajar tranquilo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-4 md:px-8 md:py-6 text-base md:text-lg rounded-full"
                onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver benefícios
              </Button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PREÇO + RESUMO — Fundo branco
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Card de preço */}
              <AnimateOnScroll variant="fade-up">
                <div className="bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] rounded-2xl p-8 text-center text-white">
                  <Shield className="w-10 h-10 text-[#FF9100] mx-auto mb-3" />
                  <p className="text-[#8ECAE6] text-xs uppercase tracking-wider font-medium mb-2">A partir de</p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-lg font-bold">R$</span>
                    <span className="text-5xl font-extrabold leading-none">19</span>
                    <span className="text-2xl font-bold">,90</span>
                  </div>
                  <p className="text-[#8ECAE6] text-sm">por reserva</p>
                </div>
              </AnimateOnScroll>

              {/* Descrição */}
              <div className="md:col-span-2">
                <AnimateOnScroll variant="fade-up">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
                    O que é o Viaje Tranquilo?
                  </h2>
                  <p className="text-[#555555] text-base leading-relaxed mb-4">
                    O <strong className="text-[#2D2D2D]">Viaje Tranquilo</strong> é um serviço exclusivo para assinantes RDC. Ao contratá-lo, você garante <strong className="text-[#2D2D2D]">suporte personalizado</strong> em todas as etapas da sua viagem — da reserva até o retorno.
                  </p>
                  <p className="text-[#555555] text-base leading-relaxed">
                    Contrate ao reservar sua hospedagem ou ao adquirir qualquer produto turístico com a RDC, seja <strong className="text-[#2D2D2D]">on-line, por chat ou por telefone</strong>, com o nosso Atendimento.
                  </p>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          BENEFÍCIOS — Fundo cinza claro, cards brancos
      ════════════════════════════════════════════════════════════════ */}
      <section id="beneficios" className="py-14 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <Badge className="mb-3 bg-[#FF9100] hover:bg-[#E68200] text-white border-0">
                Benefícios Exclusivos
              </Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3">
                Desde a reserva até a volta da sua viagem
              </h2>
              <p className="text-[#555555] text-base max-w-xl mx-auto">
                Confira as vantagens de contratar o Viaje Tranquilo na sua próxima reserva.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <AnimateOnScroll key={i} variant="fade-up">
                  <div className="bg-white rounded-2xl border border-[#E8E8E8] p-6 md:p-7 h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9100] to-[#E68200] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-[#2D2D2D] text-base leading-snug mb-2">
                      {b.title}
                    </h3>
                    <p className="text-[#777777] text-sm leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          COMO CONTRATAR — Fundo branco, 3 canais
      ════════════════════════════════════════════════════════════════ */}
      <section id="como-contratar" className="py-14 md:py-20 bg-white">
        <div className="container">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3">
                Como contratar
              </h2>
              <p className="text-[#555555] text-base max-w-xl mx-auto">
                Adicione o <strong>Viaje Tranquilo</strong> ao reservar sua hospedagem ou adquirir qualquer produto turístico com a RDC.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { icon: Globe, label: "On-line", desc: "Pelo Portal do Assinante, ao fazer sua reserva." },
              { icon: MessageCircle, label: "Chat", desc: "Fale com nosso atendimento pelo chat do site." },
              { icon: Phone, label: "Telefone", desc: "Ligue para a Central de Atendimento." },
            ].map((ch, i) => {
              const Icon = ch.icon;
              return (
                <AnimateOnScroll key={i} variant="fade-up">
                  <div className="bg-white rounded-2xl border border-[#E8E8E8] p-6 text-center hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 rounded-full bg-[#F6F6F6] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#001A9E]" />
                    </div>
                    <h3 className="font-bold text-[#2D2D2D] text-base mb-2">{ch.label}</h3>
                    <p className="text-[#777777] text-sm">{ch.desc}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* CTA box — mesmo padrão de CTA do site */}
          <AnimateOnScroll variant="fade-up">
            <div className="mt-10 md:mt-14 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] rounded-2xl p-7 md:p-10 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="md:max-w-md">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    Contrate agora por apenas R$ 19,90
                  </h3>
                  <p className="text-[#8ECAE6] text-sm leading-relaxed">
                    Contrate o <strong className="text-white">Viaje Tranquilo</strong> ao reservar a sua hospedagem ou ao adquirir qualquer produto turístico com a RDC,
                    seja on-line, por chat ou por telefone, com o nosso Atendimento.
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <a href="https://wa.me/5511940034910" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white font-semibold w-full rounded-full">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                  <a href="tel:08000552600">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full rounded-full">
                      <Phone className="w-5 h-5 mr-2" />
                      0800-055-2600
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FORMULÁRIO — Fundo cinza claro
      ════════════════════════════════════════════════════════════════ */}
      <section id="formulario" className="py-14 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll variant="fade-up">
              <div className="text-center mb-10">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3">
                  Tenho interesse
                </h2>
                <p className="text-[#555555] text-base max-w-xl mx-auto">
                  Preencha o formulário e nossa equipe entrará em contato para ajudar você a contratar o <strong>Viaje Tranquilo</strong>.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left — Info */}
              <div className="lg:col-span-2">
                <AnimateOnScroll variant="fade-up">
                  <div className="space-y-4">
                    {[
                      "Sem compromisso",
                      "Retorno em até 24h úteis",
                      "Apenas R$ 19,90 por reserva",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F6F6F6] flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-[#001A9E]" />
                        </div>
                        <p className="text-[#404040] text-sm font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-3">
                <AnimateOnScroll variant="fade-up">
                  {formSent ? (
                    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 md:p-10 text-center shadow-sm">
                      <CheckCircle2 className="w-14 h-14 text-[#06D6A0] mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">Solicitação enviada!</h3>
                      <p className="text-[#555555] text-sm">Nossa equipe entrará em contato em breve para ajudar você a contratar o Viaje Tranquilo.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E8] rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome" className="text-sm font-medium text-[#404040] flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#999999]" />
                            Nome completo
                          </Label>
                          <Input id="nome" placeholder="Seu nome" required className="bg-white" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-[#404040] flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#999999]" />
                            E-mail
                          </Label>
                          <Input id="email" type="email" placeholder="seu@email.com" required className="bg-white" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone" className="text-sm font-medium text-[#404040] flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#999999]" />
                            Telefone / WhatsApp
                          </Label>
                          <Input id="telefone" type="tel" placeholder="(11) 99999-9999" required className="bg-white" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assinante" className="text-sm font-medium text-[#404040]">Já é assinante RDC?</Label>
                          <select id="assinante" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <option value="">Selecione</option>
                            <option value="sim">Sim, sou assinante</option>
                            <option value="nao">Não, ainda não sou</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensagem" className="text-sm font-medium text-[#404040]">Mensagem (opcional)</Label>
                        <Textarea id="mensagem" placeholder="Conte-nos mais sobre sua viagem ou dúvidas..." rows={3} className="bg-white resize-none" />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#FF9100] hover:bg-[#E68200] text-white font-semibold rounded-full"
                        disabled={formLoading}
                      >
                        {formLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            Enviar solicitação
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FAQ — Fundo branco, mesmo padrão do site
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-3">
                Dúvidas frequentes
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <AnimateOnScroll key={i} variant="fade-up">
                  <div className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-md transition-shadow">
                    <button
                      className="w-full flex items-center justify-between p-5 text-left"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      <span className="font-semibold text-[#2D2D2D] text-sm md:text-base pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-[#999999] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FF9100]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-[#E8E8E8]">
                        <p className="text-[#555555] text-sm leading-relaxed pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CTA FINAL — Para não-assinantes
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container relative z-10 text-center">
          <AnimateOnScroll variant="fade-up">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ainda não é assinante RDC?
            </h2>
            <p className="text-[#8ECAE6] text-sm md:text-base mb-6 max-w-lg mx-auto">
              Conheça nossos planos de assinatura e tenha acesso ao <strong className="text-white">Viaje Tranquilo</strong> e muito mais.
            </p>
            <Link href="/assinaturas">
              <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white font-semibold px-8 rounded-full">
                Conhecer planos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
}
