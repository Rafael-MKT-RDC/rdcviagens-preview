"use client";
import { useState } from "react";
import Link from "next/link";
import { RDStationForm } from "@/components/RDStationForm";
import { RD_FORMS } from "@/lib/rdstation";
import { Hotel, Users, Calendar, MapPin, ChevronRight, TrendingUp, Eye, Star, ArrowRight, Building2, BarChart3, Handshake, Send } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80";
const stats = [
  { number: "+800", label: "hotéis parceiros", detail: "em mais de 250 destinos", icon: Hotel },
  { number: "+100 mil", label: "assinantes ativos", detail: "viajando pelo Brasil", icon: Users },
  { number: "+250 mil", label: "diárias por ano", detail: "em todo o território nacional", icon: Calendar },
  { number: "250+", label: "destinos cobertos", detail: "de norte a sul do país", icon: MapPin },
];
const benefits = [
  { icon: TrendingUp, title: "Ocupação estratégica", description: "Receba hóspedes em períodos de baixa temporada e otimize a ocupação do seu hotel com um fluxo constante de assinantes que viajam o ano todo." },
  { icon: Eye, title: "Visibilidade para seu hotel", description: "Seu hotel é apresentado a uma base qualificada de mais de 100 mil assinantes que buscam experiências de viagem por todo o Brasil." },
  { icon: BarChart3, title: "Previsibilidade de receita", description: "Com assinantes que planejam viagens ao longo do ano, seu hotel conta com uma demanda recorrente e previsível." },
  { icon: Handshake, title: "Parceria sem burocracia", description: "Processo simples de cadastro, suporte dedicado da equipe comercial RDC e flexibilidade na gestão de disponibilidade." },
  { icon: Star, title: "Hóspedes qualificados", description: "Nossos assinantes valorizam qualidade e bom atendimento. São viajantes frequentes que buscam experiências memoráveis." },
  { icon: Building2, title: "Rede consolidada", description: "Faça parte de uma rede com mais de 35 anos de experiência no mercado de viagens e uma reputação construída com confiança." },
];
const steps = [
  { step: "01", title: "Preencha o formulário", description: "Envie os dados do seu hotel e da sua empresa para nossa equipe comercial." },
  { step: "02", title: "Análise e contato", description: "Nossa equipe avalia o perfil do hotel e entra em contato para alinhar os detalhes da parceria." },
  { step: "03", title: "Acordo comercial", description: "Definimos juntos as condições, tarifas e disponibilidade que fazem sentido para ambos os lados." },
  { step: "04", title: "Ativação na plataforma", description: "Seu hotel é cadastrado e disponibilizado para os assinantes RDC começarem a reservar." },
];
const initial = { nome: "", email: "", telefone: "", nomeHotel: "", cidade: "", categoria: "", quartos: "", mensagem: "" };
const inputCls = "w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm";

export function SejaParceiroClient({ cms = {} }: { cms?: any }) {
  const [formData, setFormData] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setSent(true); setFormData(initial); setIsSubmitting(false); }, 1500);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative text-white pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="Resort à beira-mar ao pôr do sol" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00148A]/85 via-[#00148A]/70 to-[#00148A]/50" />
        </div>
        <div className="container relative">
          <div className="flex items-center gap-2 text-[#8ECAE6] text-sm mb-6"><Link href="/" className="hover:text-white transition-colors">Início</Link><ChevronRight className="w-4 h-4" /><span className="text-white">Seja Parceiro Hoteleiro</span></div>
          <div className="max-w-3xl">
            <span className="inline-block bg-orange-500/20 text-[#FFB040] text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-orange-500/30 backdrop-blur-sm">Para hotéis e pousadas</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{cms.heroTitulo ?? "Leve mais hóspedes para o seu hotel o"} <span className="text-[#FF9100]">{cms.heroDestaque ?? "ano todo"}</span></h1>
            <p className="text-[#C7E5F3] text-lg md:text-xl leading-relaxed max-w-2xl">A RDC conecta mais de <strong>100 mil assinantes</strong> a experiências de viagem por todo o Brasil. Faça parte da nossa rede e receba <strong>hóspedes qualificados</strong> que viajam com frequência e valorizam qualidade.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-[#F6F6F6] border-b border-[#E8E8E8]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => { const Icon = stat.icon; return (<div key={index} className="text-center"><div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#E8F4FA] text-[#001A9E] mb-2 md:mb-3"><Icon className="w-5 h-5 md:w-6 md:h-6" /></div><p className="text-2xl md:text-4xl font-bold text-[#00148A]">{stat.number}</p><p className="text-sm font-semibold text-[#404040] mt-1">{stat.label}</p><p className="text-xs text-[#777777] mt-0.5">{stat.detail}</p></div>); })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14"><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Por que ser parceiro da RDC?</h2><p className="text-[#555555] text-lg leading-relaxed">Uma parceria que traz <strong>resultados reais</strong> para o seu hotel, com uma <strong>base ativa de viajantes</strong> que valorizam boas experiências.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => { const Icon = benefit.icon; return (<div key={index} className="p-6 rounded-2xl border border-[#E8E8E8] hover:border-[#8ECAE6] hover:shadow-lg transition-all duration-300 group"><div className="w-12 h-12 rounded-2xl bg-[#F6F6F6] text-[#001A9E] flex items-center justify-center mb-4 group-hover:bg-[#001A9E] group-hover:text-white transition-all duration-300"><Icon className="w-6 h-6" /></div><h3 className="text-lg font-bold text-[#2D2D2D] mb-2">{benefit.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{benefit.description}</p></div>); })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14"><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Como funciona</h2><p className="text-[#555555] text-lg leading-relaxed">Um processo <strong>simples e transparente</strong> para começar a receber hóspedes RDC no seu hotel.</p></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, index) => (<div key={index} className="relative"><div className="bg-white rounded-2xl p-6 border border-[#E8E8E8] h-full"><span className="text-4xl font-bold text-[#C7E5F3]">{step.step}</span><h3 className="text-lg font-bold text-[#2D2D2D] mt-3 mb-2">{step.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{step.description}</p></div>{index < steps.length - 1 && (<div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10"><ArrowRight className="w-5 h-5 text-[#8ECAE6]" /></div>)}</div>))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10"><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Cadastre seu hotel</h2><p className="text-[#C7E5F3] text-lg leading-relaxed">Preencha o formulário abaixo e nossa <strong>equipe comercial</strong> entrará em contato para conversarmos sobre essa parceria.</p></div>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
            {sent ? (
              <div className="text-center py-8"><div className="w-16 h-16 bg-[#D4F5E9] rounded-full flex items-center justify-center mx-auto mb-4"><Handshake className="w-8 h-8 text-[#06D6A0]" /></div><h3 className="text-2xl font-bold text-[#2D2D2D] mb-2">Formulário enviado!</h3><p className="text-[#555555]">Nossa equipe comercial entrará em contato em breve para conversar sobre a parceria.</p></div>
            ) : (
            <RDStationForm formId={RD_FORMS.sejaParceiro} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
