"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { RDStationForm } from "@/components/RDStationForm";
import { RD_FORMS } from "@/lib/rdstation";
import { Gift, Users, Plane, Car, Building2, Ship, ArrowRight, CheckCircle2, Sparkles, Share2, UserPlus, Coins, Send, Bus, MapPin, ArrowLeftRight, Ticket, FileText } from "lucide-react";

const maskCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})/, "$1-$2").replace(/(-\d{2})\d+?$/, "$1");
const maskPhone = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{4})\d+?$/, "$1");

const howItWorks = [
  { step: 1, icon: Share2, title: "Indique um amigo", description: "Preencha o formulário abaixo com os dados do seu indicado. É rápido e fácil." },
  { step: 2, icon: UserPlus, title: "Entramos em contato", description: "Nossa equipe entra em contato com seu indicado para apresentar os planos RDC." },
  { step: 3, icon: Coins, title: "Seu indicado assina", description: "Quando seu indicado se tornar assinante, você ganha pontos automaticamente." },
  { step: 4, icon: Gift, title: "Troque por benefícios", description: "Use seus pontos para descontos em hospedagem, voos, carros e muito mais." },
];
const rewards = [
  { icon: Building2, title: "Hotéis", description: "Os melhores hotéis e resorts em todo o mundo" },
  { icon: Plane, title: "Voos", description: "Passagens aéreas para destinos nacionais e internacionais" },
  { icon: Bus, title: "Ônibus", description: "Passagens rodoviárias para viagens pelo Brasil" },
  { icon: MapPin, title: "Passeios", description: "Tours e experiências nos melhores destinos" },
  { icon: Car, title: "Carros", description: "Locação de veículos para explorar com liberdade" },
  { icon: ArrowLeftRight, title: "Transfers", description: "Traslados com conforto e pontualidade" },
  { icon: Ship, title: "Cruzeiros", description: "Embarque em cruzeiros incríveis" },
  { icon: Ticket, title: "Ingressos", description: "Acesso a atrações, shows e eventos" },
];
const faqs = [
  { question: "Como faço para participar do Programa de Indicação?", answer: "Basta ser assinante RDC! Preencha o formulário nesta página com os dados do seu indicado e nossa equipe entrará em contato." },
  { question: "Quando os pontos são creditados?", answer: "Os pontos são creditados na sua conta assim que seu indicado efetua o primeiro pagamento da assinatura. Você recebe uma notificação por e-mail e pode acompanhar seu saldo no Portal do Assinante." },
  { question: "Os pontos expiram?", answer: "Os pontos têm validade de 24 meses a partir da data de crédito. Recomendamos usar seus pontos regularmente para aproveitar ao máximo os benefícios." },
  { question: "Posso acumular pontos de indicações e usar junto com meu plano?", answer: "Sim! Os pontos do Programa de Indicação são um benefício adicional ao seu plano. Você pode usá-los para complementar suas diárias ou obter descontos extras em outros serviços." },
  { question: "Existe limite de indicações?", answer: "Não! Você pode indicar quantas pessoas quiser. Quanto mais você indica, mais pontos acumula para trocar por benefícios." },
];

export function ProgramaIndicacaoClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ indicadorNome: "", indicadorCpf: "", indicadorEmail: "", indicadorTelefone: "", indicadoNome: "", indicadoEmail: "", indicadoTelefone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));
  const scrollToForm = () => document.getElementById("formulario-indicacao")?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!formData.indicadorNome || !formData.indicadorCpf || !formData.indicadorEmail || !formData.indicadorTelefone || !formData.indicadoNome || !formData.indicadoTelefone) {
      setFeedback({ type: "err", text: "Por favor, preencha todos os campos obrigatórios." });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setFeedback({ type: "ok", text: "Indicação enviada com sucesso! Entraremos em contato com seu indicado em breve." });
      setFormData({ indicadorNome: "", indicadorCpf: "", indicadorEmail: "", indicadorTelefone: "", indicadoNome: "", indicadoEmail: "", indicadoTelefone: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const fieldClass = "bg-white/10 border-white/20 text-white placeholder:text-[#8ECAE6] focus-visible:ring-[#FFB040]";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF9100] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-[#FF9100] text-black border-0"><Gift className="w-4 h-4 mr-1" />Programa de Indicação</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Indique amigos e <span className="text-[#FF9100]">ganhe pontos</span></h1>
            <p className="text-xl text-[#C7E5F3] mb-8">Compartilhe a experiência RDC com quem você ama e <strong>acumule pontos</strong> para trocar por descontos em hospedagem, voos, carros e muito mais!</p>
            <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-black px-8 py-6 text-lg rounded-full font-semibold" onClick={scrollToForm}>Indicar agora<ArrowRight className="w-5 h-5 ml-2" /></Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full"><path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" /></svg></div>
      </section>

      {/* Como funciona */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">Como funciona</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Simples assim</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">Em <strong>4 passos</strong> você já está acumulando pontos para suas próximas viagens</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {howItWorks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative">
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                      <CardContent className="pt-8 pb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0020B8] to-[#E68200] flex items-center justify-center mx-auto mb-4"><Icon className="w-8 h-8 text-white" /></div>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FF9100] flex items-center justify-center text-black font-bold">{item.step}</div>
                        <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{item.title}</h3>
                        <p className="text-[#555555] text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                    {index < howItWorks.length - 1 && <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-[#D6D6D6] -translate-y-1/2" />}
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Formulário */}
      <section id="formulario-indicacao" className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070] text-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#FF9100] text-black border-0"><Send className="w-4 h-4 mr-1" />Formulário de Indicação</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Indique agora mesmo</h2>
              <p className="text-lg text-[#8ECAE6] max-w-2xl mx-auto">Preencha os dados abaixo e nossa equipe entrará em contato com seu indicado para apresentar os <strong>planos RDC</strong></p>
            </div>
            <RDStationForm formId={RD_FORMS.indicacao} />
          </div>
        </AnimateOnScroll>
      </section>

      {/* Recompensas */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-[#FFF0D6] text-[#CC7400] border-0"><Sparkles className="w-4 h-4 mr-1" />Recompensas</Badge>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Troque seus pontos por</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">Troque seus pontos por <strong>todos os produtos turísticos</strong> do ecossistema RDC</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {rewards.map((reward, index) => {
                const Icon = reward.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8F4FA] to-[#FFF0D6] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-[#001A9E]" /></div>
                      <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{reward.title}</h3>
                      <p className="text-[#555555] text-sm">{reward.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Perguntas frequentes</h2>
              <p className="text-lg text-[#555555] max-w-2xl mx-auto">Tire suas dúvidas sobre o Programa de Indicação</p>
            </div>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#D6D6D6] bg-white first:rounded-t-xl last:rounded-b-xl">
                  <button className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-[#F6F6F6] transition-colors" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <span className="font-medium text-lg pr-4">{faq.question}</span>
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 transition-colors ${openFaq === index ? "text-[#FF9100]" : "text-[#D6D6D6]"}`} />
                  </button>
                  {openFaq === index && <div className="px-6 pb-5 text-[#555555]">{faq.answer}</div>}
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
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4FA] flex items-center justify-center flex-shrink-0"><FileText className="w-6 h-6 text-[#001A9E]" /></div>
              <div><h3 className="font-semibold text-lg text-[#2D2D2D]">Regulamento do Programa</h3><p className="text-[#555555] text-sm">Consulte todas as regras e condições do Programa de Indicação.</p></div>
            </div>
            <a href="/regulamento-indicacao.pdf" target="_blank" rel="noopener noreferrer"><Button variant="outline" className="border-[#0020B8] text-[#0020B8] hover:bg-[#F6F6F6] rounded-full flex-shrink-0"><FileText className="w-4 h-4 mr-2" />Abrir regulamento</Button></a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#F5B800] to-[#D4A000]">
        <AnimateOnScroll variant="fade">
          <div className="container text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Comece a indicar hoje mesmo!</h2>
            <p className="text-lg text-[#2D2D2D] mb-8 max-w-2xl mx-auto"><strong>Quanto mais você compartilha, mais você viaja!</strong> Indique amigos e familiares e acumule pontos para trocar por <strong>benefícios incríveis</strong>.</p>
            <Button size="lg" className="bg-[#001A9E] hover:bg-[#001070] text-white px-8 py-6 text-lg rounded-full" onClick={scrollToForm}>Indicar agora<ArrowRight className="w-5 h-5 ml-2" /></Button>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
