import { useState } from "react";
import { Link } from "wouter";
import { 
  Hotel, Users, Calendar, MapPin, ChevronRight, 
  TrendingUp, Eye, Star, ArrowRight, CheckCircle2,
  Building2, BarChart3, Handshake, Send
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import SEO from "@/components/SEO";

/*
 * Design Philosophy: Tropical Elegance
 * Tom de voz: Explorador + Sábio
 * - Consultivo, estratégico, sem pressão
 * - Convite para expandir horizontes juntos
 * - Foco nos benefícios reais para o hoteleiro
 */

const stats = [
  { 
    number: "+800", 
    label: "hotéis parceiros", 
    detail: "em mais de 250 destinos",
    icon: Hotel 
  },
  { 
    number: "+100 mil", 
    label: "assinantes ativos", 
    detail: "viajando pelo Brasil",
    icon: Users 
  },
  { 
    number: "+250 mil", 
    label: "diárias por ano", 
    detail: "em todo o território nacional",
    icon: Calendar 
  },
  { 
    number: "250+", 
    label: "destinos cobertos", 
    detail: "de norte a sul do país",
    icon: MapPin 
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Ocupação estratégica",
    description: "Receba hóspedes em períodos de baixa temporada e otimize a ocupação do seu hotel com um fluxo constante de assinantes que viajam o ano todo.",
  },
  {
    icon: Eye,
    title: "Visibilidade para seu hotel",
    description: "Seu hotel é apresentado a uma base qualificada de mais de 100 mil assinantes que buscam experiências de viagem por todo o Brasil.",
  },
  {
    icon: BarChart3,
    title: "Previsibilidade de receita",
    description: "Com assinantes que planejam viagens ao longo do ano, seu hotel conta com uma demanda recorrente e previsível.",
  },
  {
    icon: Handshake,
    title: "Parceria sem burocracia",
    description: "Processo simples de cadastro, suporte dedicado da equipe comercial RDC e flexibilidade na gestão de disponibilidade.",
  },
  {
    icon: Star,
    title: "Hóspedes qualificados",
    description: "Nossos assinantes valorizam qualidade e bom atendimento. São viajantes frequentes que buscam experiências memoráveis.",
  },
  {
    icon: Building2,
    title: "Rede consolidada",
    description: "Faça parte de uma rede com mais de 35 anos de experiência no mercado de viagens e uma reputação construída com confiança.",
  },
];

const steps = [
  {
    step: "01",
    title: "Preencha o formulário",
    description: "Envie os dados do seu hotel e da sua empresa para nossa equipe comercial.",
  },
  {
    step: "02",
    title: "Análise e contato",
    description: "Nossa equipe avalia o perfil do hotel e entra em contato para alinhar os detalhes da parceria.",
  },
  {
    step: "03",
    title: "Acordo comercial",
    description: "Definimos juntos as condições, tarifas e disponibilidade que fazem sentido para ambos os lados.",
  },
  {
    step: "04",
    title: "Ativação na plataforma",
    description: "Seu hotel é cadastrado e disponibilizado para os assinantes RDC começarem a reservar.",
  },
];

export default function SejaParceiro() {

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nomeHotel: "",
    cidade: "",
    categoria: "",
    quartos: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Formulário enviado! Nossa equipe comercial entrará em contato em breve.");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        nomeHotel: "",
        cidade: "",
        categoria: "",
        quartos: "",
        mensagem: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <SEO
        title="Seja Parceiro Hoteleiro | Cadastre seu Hotel na RDC Viagens"
        description="Cadastre seu hotel ou pousada na RDC Viagens e alcance mais de 200 mil assinantes. Aumente sua ocupação com uma parceria de 35 anos de experiência no turismo brasileiro."
        keywords="parceiro hoteleiro, cadastrar hotel RDC, parceria hoteleira, aumentar ocupação hotel, RDC Viagens parceiro"
        canonical="https://rdcviagens.com.br/seja-parceiro"
      />
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative text-white pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/OPAJZzSDsUMxkZVwUha8Gs/sandbox/GArLQouH1mIazmtD8grsPB-img-1_1771611881000_na1fn_cGFyY2Vpcm8taGVybw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT1BBSlp6U0RzVU14a1pWd1VoYThHcy9zYW5kYm94L0dBckxRb3VIMW1JYXptdEQ4Z3JzUEItaW1nLTFfMTc3MTYxMTg4MTAwMF9uYTFmbl9jR0Z5WTJWcGNtOHRhR1Z5YncuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pQMU4rTldlvmXe57HgwZFmDwCXoySl0tn2CS8draf~HXageSjfNIHSujUiJNsBzl1KOop-VJRDEqSHm05yH0hdyLTfsW7jsY91YIZBcrLHDzq2p4hMsBiKLKUnMtxvrWfDYtvxfTFxRTBpXVlPyrUhbAkq2573rohBbZHrXuSvhpuP36qXaJAiV87JNXw8RVsGl-TahNgaiwcTY7FefiCgxD98-lNG~HXCJpfM81DnZMMODsrAEPc8KwL10POSi-OYvvZ3GtNTX6kLfGX~UGFZ88VeW50odqdwHGrDI-gsQzGiLXEoYYgPxwHwFEIVnKE73DOt-M4XrEaF-XBQMw0w__" 
            alt="Resort à beira-mar ao pôr do sol" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00148A]/85 via-[#00148A]/70 to-[#00148A]/50" />
        </div>
        <div className="container relative">
          <div className="flex items-center gap-2 text-[#8ECAE6] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Seja Parceiro Hoteleiro</span>
          </div>
          <div className="max-w-3xl">
            <span className="inline-block bg-orange-500/20 text-[#FFB040] text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-orange-500/30 backdrop-blur-sm">
              Para hotéis e pousadas
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Leve mais hóspedes para o seu hotel o{" "}
              <span className="text-[#FF9100]">ano todo</span>
            </h1>
            <p className="text-[#C7E5F3] text-lg md:text-xl leading-relaxed max-w-2xl">
              A RDC conecta mais de <strong>100 mil assinantes</strong> a experiências de viagem 
              por todo o Brasil. Faça parte da nossa rede e receba <strong>hóspedes qualificados</strong> 
              que viajam com frequência e valorizam qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-[#F6F6F6] border-b border-[#E8E8E8]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#E8F4FA] text-[#001A9E] mb-2 md:mb-3">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <p className="text-2xl md:text-4xl font-bold text-[#00148A]">{stat.number}</p>
                  <p className="text-sm font-semibold text-[#404040] mt-1">{stat.label}</p>
                  <p className="text-xs text-[#777777] mt-0.5">{stat.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Por que ser parceiro da RDC?
            </h2>
            <p className="text-[#555555] text-lg leading-relaxed">
              Uma parceria que traz <strong>resultados reais</strong> para o seu hotel, 
              com uma <strong>base ativa de viajantes</strong> que valorizam boas experiências.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl border border-[#E8E8E8] hover:border-[#8ECAE6] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F6F6] text-[#001A9E] flex items-center justify-center mb-4 group-hover:bg-[#001A9E] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">{benefit.title}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Como funciona
            </h2>
            <p className="text-[#555555] text-lg leading-relaxed">
              Um processo <strong>simples e transparente</strong> para começar a receber hóspedes RDC no seu hotel.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-[#E8E8E8] h-full">
                  <span className="text-4xl font-bold text-[#C7E5F3]">{step.step}</span>
                  <h3 className="text-lg font-bold text-[#2D2D2D] mt-3 mb-2">{step.title}</h3>
                  <p className="text-[#555555] text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-[#8ECAE6]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Cadastre seu hotel
            </h2>
            <p className="text-[#C7E5F3] text-lg leading-relaxed">
              Preencha o formulário abaixo e nossa <strong>equipe comercial</strong> entrará em contato 
              para conversarmos sobre essa parceria.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Nome completo"
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    Nome do hotel / pousada *
                  </label>
                  <input
                    type="text"
                    name="nomeHotel"
                    value={formData.nomeHotel}
                    onChange={handleChange}
                    required
                    placeholder="Nome do estabelecimento"
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    Cidade / Estado *
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Gramado - RS"
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm bg-white"
                  >
                    <option value="">Selecione</option>
                    <option value="3-estrelas">3 estrelas</option>
                    <option value="4-estrelas">4 estrelas</option>
                    <option value="5-estrelas">5 estrelas</option>
                    <option value="pousada">Pousada</option>
                    <option value="resort">Resort</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#404040] mb-1.5">
                    Número de quartos
                  </label>
                  <input
                    type="text"
                    name="quartos"
                    value={formData.quartos}
                    onChange={handleChange}
                    placeholder="Ex: 120"
                    className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#404040] mb-1.5">
                  Mensagem (opcional)
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Conte-nos mais sobre o seu hotel e o que espera dessa parceria"
                  className="w-full px-4 py-3 rounded-2xl border border-[#D6D6D6] focus:border-[#0028D0] focus:ring-2 focus:ring-blue-200 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                   <>
                    <Send className="w-5 h-5" />
                    Quero ser parceiro
                  </>
                )}
              </button>

              <p className="text-xs text-[#999999] text-center leading-relaxed">
                Ao enviar, você concorda com nossa{" "}
                <Link href="/documentos" className="text-[#0020B8] hover:underline">
                  Política de Privacidade
                </Link>. 
                Seus dados serão utilizados exclusivamente para contato comercial.
              </p>
            </form>
          </div>
        </div>
      </section>



      <Footer />
    </div>
    </>
  );
}
