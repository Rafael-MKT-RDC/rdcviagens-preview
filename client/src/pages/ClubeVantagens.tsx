import SEO from "@/components/SEO";
/**
 * Clube de Vantagens - Redesign: Carrossel de marcas + Filtro por categorias
 * Paleta: Azul RDC (#1a3a6b) + Rosa (#e91e8c) + Branco
 */

import { useState, useRef, useEffect, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideProps } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ShoppingBag,
  Heart,
  GraduationCap,
  PawPrint,
  Package,
  UtensilsCrossed,
  Star,
  Lock,
  Gift,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  BadgePercent,
  ChevronDown,
  HelpCircle,
  UserCheck,
  Smartphone,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { Link } from "wouter";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { usePageDoc } from "@/hooks/usePageDoc";
/* ─── FAQ Item ─── */
function FaqItem({ icon: FaqIcon, question, answer, index }: {
  icon: ComponentType<LucideProps>;
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
          isOpen ? 'bg-gradient-to-br from-[#FF9100] to-[#E68200] text-white' : 'bg-[#F0F0F0] text-[#777777]'
        }`}>
          <FaqIcon className="w-5 h-5" />
        </div>
        <span className="flex-1 font-semibold text-[#2D2D2D]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#999999] transition-transform duration-300 shrink-0 ${
          isOpen ? 'rotate-180 text-[#FF9100]' : ''
        }`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 pl-[4.5rem]">
              <p className="text-[#555555] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Categorias ─── */
const categories = [
  { id: "TODOS", label: "Todos", icon: Sparkles, color: "from-[#0020B8] to-[#001070]" },
  { id: "VESTUARIO", label: "Moda e Esportes", icon: ShoppingBag, color: "from-[#B78AFF] to-[#8050C0]" },
  { id: "BELEZA / SAUDE", label: "Beleza e Saúde", icon: Heart, color: "from-[#FF9100] to-orange-700" },
  { id: "PRODUTOS / SERVIÇOS", label: "Produtos e Serviços", icon: Package, color: "from-[#06D6A0] to-[#04A078]" },
  { id: "EDUCAÇÃO", label: "Educação", icon: GraduationCap, color: "from-[#E68200] to-amber-700" },
  { id: "PETS", label: "Pets", icon: PawPrint, color: "from-[#FF9100] to-orange-700" },
  { id: "ALIMENTOS E BEBIDAS", label: "Alimentação", icon: UtensilsCrossed, color: "from-[#FF9100] to-red-700" },
];

/* ─── Domínios para favicon ─── */
const partnerDomains: Record<string, string> = {
  "Nike": "nike.com.br",
  "Centauro": "centauro.com.br",
  "Renner": "lojasrenner.com.br",
  "Hering": "hering.com.br",
  "Netshoes": "netshoes.com.br",
  "Fila": "fila.com.br",
  "The North Face": "thenorthface.com.br",
  "Dafiti": "dafiti.com.br",
  "Zattini": "zattini.com.br",
  "Le Postiche": "lepostiche.com.br",
  "Puket": "puket.com.br",
  "Umbro": "umbro.com",
  "Olympikus": "olympikus.com.br",
  "Riachuelo": "riachuelo.com.br",
  "O Boticário": "boticario.com.br",
  "Sephora": "sephora.com.br",
  "Océane": "oceane.com.br",
  "Ikesaki": "ikesaki.com.br",
  "Jequiti": "jequiti.com.br",
  "SalonLine": "salonline.com.br",
  "Dr Shape": "drshape.com.br",
  "Probiótica": "probiotica.com.br",
  "Drogarias Pacheco": "drogariaspacheco.com.br",
  "Drogarias São Paulo": "drogariasaopaulo.com.br",
  "Extra Farma": "extrafarma.com.br",
  "Pague Menos": "paguemenos.com.br",
  "Odonto Special": "odontospecial.com.br",
  "Samsung": "samsung.com",
  "LG": "lg.com",
  "Canon": "canon.com.br",
  "Tok&Stok": "tokstok.com.br",
  "Imaginarium": "imaginarium.com.br",
  "Stanley": "stanley1913.com.br",
  "Kaspersky": "kaspersky.com.br",
  "Sem Parar": "semparar.com.br",
  "Sam's Club": "samsclub.com.br",
  "Compra Certa": "compracerta.com.br",
  "Go Case": "gocase.com.br",
  "Giuliana Flores": "giulianaflores.com.br",
  "Schultz": "schultz.com.br",
  "Open English": "openenglish.com",
  "English Fluency": "englishfluency.com.br",
  "Hablas Online": "hablasonline.com.br",
  "Impacta Educacional": "impacta.com.br",
  "Escola Ana Hickmann": "escolaanahickmann.com.br",
  "Petz": "petz.com.br",
  "Pet Love": "petlove.com.br",
  "Dog Hero": "doghero.com.br",
  "Clube04 Pet Store": "clube04.com.br",
  "Carrefour": "carrefour.com.br",
  "Domino's Pizza": "dominos.com.br",
  "Luckau": "luckau.com.br",
};

/* ─── Cores de marca para fallback ─── */
const brandColors: Record<string, { bg: string; text: string }> = {
  "Nike": { bg: "#111", text: "#fff" },
  "Centauro": { bg: "#00843D", text: "#fff" },
  "Renner": { bg: "#E31837", text: "#fff" },
  "Hering": { bg: "#1a1a1a", text: "#fff" },
  "Netshoes": { bg: "#6C2D8E", text: "#fff" },
  "Fila": { bg: "#C8102E", text: "#fff" },
  "The North Face": { bg: "#000", text: "#fff" },
  "Dafiti": { bg: "#FF6900", text: "#fff" },
  "Zattini": { bg: "#E91E63", text: "#fff" },
  "Le Postiche": { bg: "#8B4513", text: "#fff" },
  "Puket": { bg: "#FF69B4", text: "#fff" },
  "Umbro": { bg: "#1a1a1a", text: "#fff" },
  "Olympikus": { bg: "#003DA5", text: "#fff" },
  "Riachuelo": { bg: "#000", text: "#fff" },
  "O Boticário": { bg: "#00573F", text: "#fff" },
  "Sephora": { bg: "#000", text: "#fff" },
  "Océane": { bg: "#E8A0BF", text: "#333" },
  "Ikesaki": { bg: "#E31837", text: "#fff" },
  "Jequiti": { bg: "#7B2D8E", text: "#fff" },
  "SalonLine": { bg: "#FF1493", text: "#fff" },
  "Dr Shape": { bg: "#FF4500", text: "#fff" },
  "Probiótica": { bg: "#1E90FF", text: "#fff" },
  "Drogarias Pacheco": { bg: "#00529B", text: "#fff" },
  "Drogarias São Paulo": { bg: "#E31837", text: "#fff" },
  "Extra Farma": { bg: "#0066CC", text: "#fff" },
  "Pague Menos": { bg: "#00A651", text: "#fff" },
  "Odonto Special": { bg: "#00BCD4", text: "#fff" },
  "Samsung": { bg: "#1428A0", text: "#fff" },
  "LG": { bg: "#A50034", text: "#fff" },
  "Canon": { bg: "#BC0024", text: "#fff" },
  "Tok&Stok": { bg: "#FFD700", text: "#333" },
  "Imaginarium": { bg: "#E91E63", text: "#fff" },
  "Stanley": { bg: "#00573F", text: "#fff" },
  "Kaspersky": { bg: "#006D5C", text: "#fff" },
  "Sem Parar": { bg: "#FFD100", text: "#333" },
  "Sam's Club": { bg: "#0060A9", text: "#fff" },
  "Compra Certa": { bg: "#FF6600", text: "#fff" },
  "Go Case": { bg: "#000", text: "#fff" },
  "Giuliana Flores": { bg: "#D4145A", text: "#fff" },
  "Schultz": { bg: "#1a3a6b", text: "#fff" },
  "Open English": { bg: "#FF6B00", text: "#fff" },
  "English Fluency": { bg: "#2196F3", text: "#fff" },
  "Hablas Online": { bg: "#FF9800", text: "#fff" },
  "Impacta Educacional": { bg: "#1a1a1a", text: "#fff" },
  "Escola Ana Hickmann": { bg: "#C9A96E", text: "#fff" },
  "Petz": { bg: "#00A651", text: "#fff" },
  "Pet Love": { bg: "#FF4081", text: "#fff" },
  "Dog Hero": { bg: "#FF7043", text: "#fff" },
  "Clube04 Pet Store": { bg: "#8BC34A", text: "#fff" },
  "Carrefour": { bg: "#004E9A", text: "#fff" },
  "Domino's Pizza": { bg: "#006491", text: "#fff" },
  "Luckau": { bg: "#4A2C2A", text: "#fff" },
};

/* ─── Parceiros ─── */
const partners = [
  { name: "Nike", category: "VESTUARIO", discount: 25 },
  { name: "Centauro", category: "VESTUARIO", discount: 20 },
  { name: "Renner", category: "VESTUARIO", discount: 15 },
  { name: "Hering", category: "VESTUARIO", discount: 20 },
  { name: "Netshoes", category: "VESTUARIO", discount: 30 },
  { name: "Fila", category: "VESTUARIO", discount: 20 },
  { name: "The North Face", category: "VESTUARIO", discount: 15 },
  { name: "Dafiti", category: "VESTUARIO", discount: 25 },
  { name: "Zattini", category: "VESTUARIO", discount: 25 },
  { name: "Le Postiche", category: "VESTUARIO", discount: 15 },
  { name: "Puket", category: "VESTUARIO", discount: 20 },
  { name: "Umbro", category: "VESTUARIO", discount: 20 },
  { name: "Olympikus", category: "VESTUARIO", discount: 25 },
  { name: "Riachuelo", category: "VESTUARIO", discount: 15 },
  { name: "O Boticário", category: "BELEZA / SAUDE", discount: 20 },
  { name: "Sephora", category: "BELEZA / SAUDE", discount: 15 },
  { name: "Océane", category: "BELEZA / SAUDE", discount: 25 },
  { name: "Ikesaki", category: "BELEZA / SAUDE", discount: 20 },
  { name: "Jequiti", category: "BELEZA / SAUDE", discount: 30 },
  { name: "SalonLine", category: "BELEZA / SAUDE", discount: 20 },
  { name: "Dr Shape", category: "BELEZA / SAUDE", discount: 15 },
  { name: "Probiótica", category: "BELEZA / SAUDE", discount: 15 },
  { name: "Drogarias Pacheco", category: "BELEZA / SAUDE", discount: 10 },
  { name: "Drogarias São Paulo", category: "BELEZA / SAUDE", discount: 10 },
  { name: "Extra Farma", category: "BELEZA / SAUDE", discount: 10 },
  { name: "Pague Menos", category: "BELEZA / SAUDE", discount: 15 },
  { name: "Odonto Special", category: "BELEZA / SAUDE", discount: 30 },
  { name: "Samsung", category: "PRODUTOS / SERVIÇOS", discount: 20 },
  { name: "LG", category: "PRODUTOS / SERVIÇOS", discount: 20 },
  { name: "Canon", category: "PRODUTOS / SERVIÇOS", discount: 15 },
  { name: "Tok&Stok", category: "PRODUTOS / SERVIÇOS", discount: 15 },
  { name: "Imaginarium", category: "PRODUTOS / SERVIÇOS", discount: 20 },
  { name: "Stanley", category: "PRODUTOS / SERVIÇOS", discount: 10 },
  { name: "Kaspersky", category: "PRODUTOS / SERVIÇOS", discount: 30 },
  { name: "Sem Parar", category: "PRODUTOS / SERVIÇOS", discount: 15 },
  { name: "Sam's Club", category: "PRODUTOS / SERVIÇOS", discount: 50 },
  { name: "Compra Certa", category: "PRODUTOS / SERVIÇOS", discount: 25 },
  { name: "Go Case", category: "PRODUTOS / SERVIÇOS", discount: 20 },
  { name: "Giuliana Flores", category: "PRODUTOS / SERVIÇOS", discount: 15 },
  { name: "Schultz", category: "PRODUTOS / SERVIÇOS", discount: 10 },
  { name: "Open English", category: "EDUCAÇÃO", discount: 35 },
  { name: "English Fluency", category: "EDUCAÇÃO", discount: 25 },
  { name: "Hablas Online", category: "EDUCAÇÃO", discount: 20 },
  { name: "Impacta Educacional", category: "EDUCAÇÃO", discount: 30 },
  { name: "Escola Ana Hickmann", category: "EDUCAÇÃO", discount: 20 },
  { name: "Petz", category: "PETS", discount: 15 },
  { name: "Pet Love", category: "PETS", discount: 20 },
  { name: "Dog Hero", category: "PETS", discount: 15 },
  { name: "Clube04 Pet Store", category: "PETS", discount: 10 },
  { name: "Carrefour", category: "ALIMENTOS E BEBIDAS", discount: 15 },
  { name: "Domino's Pizza", category: "ALIMENTOS E BEBIDAS", discount: 20 },
  { name: "Luckau", category: "ALIMENTOS E BEBIDAS", discount: 15 },
];

/* ─── Helpers ─── */
function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2 || name.split(" ").length <= 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function PartnerLogo({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const [imgError, setImgError] = useState(false);
  const domain = partnerDomains[name];
  const colors = brandColors[name] || { bg: "#1a3a6b", text: "#fff" };

  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const imgSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const faviconUrl = domain
    ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`
    : null;

  if (!faviconUrl || imgError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center font-bold shadow-sm`}
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center bg-white border border-[#E8E8E8] shadow-sm overflow-hidden`}>
      <img src={faviconUrl}
        alt={`Logo ${name}`}
        className={`${imgSizes[size]} object-contain`}
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  );
}

/* ─── Carrossel infinito de marcas ─── */
function BrandMarquee({ direction = "left" }: { direction?: "left" | "right" }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dividir parceiros em duas metades para as duas linhas
  const half = Math.ceil(partners.length / 2);
  const items = direction === "left" ? partners.slice(0, half) : partners.slice(half);
  // Duplicar para efeito infinito
  const doubled = [...items, ...items];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = 0;
    const speed = direction === "left" ? 0.5 : -0.5;
    const totalWidth = el.scrollWidth / 2;

    function animate() {
      pos += speed;
      if (direction === "left" && pos >= totalWidth) pos = 0;
      if (direction === "right" && pos <= -totalWidth) pos = 0;
      el!.style.transform = `translateX(${direction === "left" ? -pos : totalWidth + pos}px)`;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [direction]);

  return (
    <div className="overflow-hidden">
      <div ref={scrollRef} className="flex gap-6 will-change-transform" style={{ width: "max-content" }}>
        {doubled.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 shrink-0 hover:bg-white/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center overflow-hidden shrink-0">
              {partnerDomains[partner.name] ? (
                <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${partnerDomains[partner.name]}&size=128`}
                  alt={partner.name}
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `<span class="text-xs font-bold" style="color:${brandColors[partner.name]?.bg || '#1a3a6b'}">${getInitials(partner.name)}</span>`;
                  }}
                />
              ) : (
                <span className="text-xs font-bold" style={{ color: brandColors[partner.name]?.bg || "#1a3a6b" }}>
                  {getInitials(partner.name)}
                </span>
              )}
            </div>
            <span className="text-white font-medium text-sm whitespace-nowrap">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCategoryLabel(category: string) {
  const cat = categories.find((c) => c.id === category);
  return cat ? cat.label : category;
}

/* ─── Página principal ─── */
export default function ClubeVantagens() {
  const c = usePageDoc<any>('paginaClube');
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPartners = partners.filter((p) => {
    const matchCategory = activeCategory === "TODOS" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Clube de Vantagens | Descontos Exclusivos"
        description="Descontos de até 50% em restaurantes, entretenimento, saúde, educação e beleza em todo o Brasil. Benefício exclusivo para assinantes RDC. Aproveite agora!"
        keywords="clube vantagens RDC, descontos exclusivos, benefícios assinantes, economia dia a dia, descontos restaurantes, RDC vantagens"
        canonical="/clube-vantagens"
      />
      <Header />

      {/* Hero + Carrossel de marcas */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b] via-[#0f2847] to-[#0a1c33]" />
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF9100] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-20 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#FFB040] text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                  <Gift className="w-4 h-4" />
                  {c.heroBadge ?? "Exclusivo para assinantes RDC"}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {c.heroTitulo ?? "Clube de"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9100] to-orange-300">
                    {c.heroDestaque ?? "Vantagens"}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-[#C7E5F3]/80 mb-8 max-w-2xl mx-auto leading-relaxed">{c.heroSubtitulo ?? "Economize na viagem e durante o ano todo. Acesse descontos exclusivos nos maiores varejistas do Brasil — são mais de 50 marcas parceiras com ofertas especiais para você."}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <BadgePercent className="w-5 h-5 text-[#FF9100]" />
                    <span className="text-white font-medium">{c.heroStat1 ?? "Até 50% de desconto"}</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Star className="w-5 h-5 text-[#FF9100]" />
                    <span className="text-white font-medium">{c.heroStat2 ?? "+50 marcas parceiras"}</span>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Lock className="w-5 h-5 text-[#06D6A0]" />
                    <span className="text-white font-medium">{c.heroStat3 ?? "Acesso pela área logada"}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Carrossel infinito de marcas - linha 1 */}
          <div className="mb-4 overflow-hidden">
            <BrandMarquee direction="left" />
          </div>
          {/* Carrossel infinito de marcas - linha 2 */}
          <div className="pb-12 overflow-hidden">
            <BrandMarquee direction="right" />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-12 md:py-16 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#E68200] font-semibold text-sm tracking-wider uppercase">{c.comoLabel ?? "Como funciona"}</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
              {c.comoTitulo ?? "Simples, rápido e econômico"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Seja assinante",
                desc: "Escolha seu plano de assinatura RDC e ative seu acesso ao Clube de Vantagens.",
              },
              {
                step: "02",
                title: "Acesse a área logada",
                desc: "Entre no Portal do Assinante e navegue pelas ofertas exclusivas dos nossos parceiros.",
              },
              {
                step: "03",
                title: "Economize o ano todo",
                desc: "Aproveite descontos em moda, beleza, eletrônicos, educação, pets e muito mais.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a3a6b] to-[#0f2847] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">{item.title}</h3>
                <p className="text-[#555555]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Filtro por categorias + Grid de parceiros */}
      <section className="py-16">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-[#E68200] font-semibold text-sm tracking-wider uppercase">{c.parcLabel ?? "Nossos parceiros"}</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
              {c.parcTitulo ?? "Explore por categoria"}
            </h2>
            <p className="text-[#555555] mt-3 max-w-2xl mx-auto">{c.parcSubtitulo ?? "Filtre por categoria ou busque sua marca favorita. Todos os descontos são acessíveis pela área logada do assinante."}</p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="text"
                placeholder="Buscar marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#D6D6D6] bg-white focus:outline-none focus:ring-2 focus:ring-[#0028D0]/20 focus:border-[#4060E0] text-[#2D2D2D] placeholder:text-[#999999] transition-all"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = cat.id === "TODOS"
                ? partners.length
                : partners.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#1a3a6b] text-white shadow-lg shadow-blue-900/20"
                      : "bg-white text-[#555555] border border-[#D6D6D6] hover:border-[#8ECAE6] hover:text-[#001A9E]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-xl ${isActive ? "bg-white/20" : "bg-[#F0F0F0]"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Partners grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchTerm}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
            >
              {filteredPartners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="group relative overflow-visible bg-white rounded-2xl border border-[#E8E8E8] p-5 flex flex-col items-center text-center hover:shadow-xl hover:border-[#FFCC80] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF9100] to-rose-500 text-white text-xs font-bold shadow-lg z-10">
                    até {partner.discount}%
                  </div>
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                    <PartnerLogo name={partner.name} size="lg" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#2D2D2D] mb-1">{partner.name}</h3>
                  <span className="text-xs text-[#777777]">{getCategoryLabel(partner.category)}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPartners.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-[#D6D6D6] mx-auto mb-4" />
              <p className="text-[#777777] text-lg">Nenhuma marca encontrada.</p>
              <p className="text-[#999999] text-sm mt-1">Tente buscar por outro nome ou selecione outra categoria.</p>
            </div>
          )}
        </div>
        </AnimateOnScroll>
      </section>

      {/* Perguntas Frequentes */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#E68200] font-semibold text-sm tracking-wider uppercase">{c.faqLabel ?? "Tire suas dúvidas"}</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
              {c.faqTitulo ?? "Perguntas Frequentes"}
            </h2>
            <p className="text-[#777777] mt-3 max-w-2xl mx-auto">{c.faqSubtitulo ?? "Tudo o que você precisa saber sobre o Clube de Vantagens e como aproveitar os descontos exclusivos."}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                icon: UserCheck,
                question: "Quem pode acessar o Clube de Vantagens?",
                answer: "O Clube de Vantagens é exclusivo para assinantes RDC. Ao contratar qualquer plano de assinatura (7, 14, 21 ou 28 diárias), você recebe acesso automático à plataforma com todos os descontos disponíveis."
              },
              {
                icon: Smartphone,
                question: "Como acesso os descontos dos parceiros?",
                answer: "Basta entrar no Portal do Assinante com seu login e senha. Na área logada, você encontrará a seção do Clube de Vantagens com todas as ofertas organizadas por categoria. Clique na marca desejada para ser redirecionado à loja parceira com o desconto aplicado automaticamente."
              },
              {
                icon: BadgePercent,
                question: "Os descontos são cumulativos com outras promoções?",
                answer: "Os descontos do Clube de Vantagens são exclusivos para assinantes RDC e podem variar conforme a política de cada parceiro. Em alguns casos, é possível acumular com promoções vigentes na loja. Recomendamos verificar as condições diretamente na página da oferta."
              },
              {
                icon: RefreshCw,
                question: "As ofertas e parceiros mudam com frequência?",
                answer: "Sim! Estamos constantemente ampliando nossa rede de parceiros e negociando novas ofertas. Atualmente contamos com mais de 50 marcas parceiras e novos parceiros são adicionados regularmente. Fique atento às novidades no Portal do Assinante."
              },
              {
                icon: CreditCard,
                question: "Preciso pagar algo a mais para usar o Clube de Vantagens?",
                answer: "Não! O acesso ao Clube de Vantagens já está incluso na sua assinatura RDC, sem nenhum custo adicional. É mais um benefício para você economizar não apenas nas viagens, mas também no dia a dia."
              },
              {
                icon: HelpCircle,
                question: "Como funciona o desconto na prática?",
                answer: "Ao acessar a oferta pelo Portal do Assinante, você será redirecionado para a loja parceira com um link exclusivo que aplica o desconto automaticamente. Em alguns casos, pode ser necessário utilizar um cupom que será exibido na plataforma. O processo é simples e rápido."
              },
              {
                icon: ShoppingBag,
                question: "Posso usar os descontos quantas vezes quiser?",
                answer: "Na maioria dos parceiros, sim! Você pode utilizar os descontos quantas vezes desejar durante a vigência da sua assinatura. Alguns parceiros podem ter limitações específicas, que serão informadas na página da oferta."
              },
            ].map((faq, i) => (
              <FaqItem
                key={i}
                icon={faq.icon}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b] via-[#0f2847] to-[#0a1c33]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-80 h-80 bg-[#FF9100] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#00B4D8] rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Gift className="w-14 h-14 text-[#FF9100] mx-auto mb-6" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              {c.ctaTitulo ?? "Economize na viagem e no dia a dia"}
            </h2>
            <p className="text-lg text-[#C7E5F3]/80 mb-8 max-w-2xl mx-auto">{c.ctaTexto ?? "Ao se tornar assinante RDC, você não ganha apenas diárias nos melhores hotéis e resorts. Você tem acesso ao Clube de Vantagens com descontos exclusivos em mais de 50 marcas parceiras durante o ano todo."}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/assinaturas">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF9100] to-[#E68200] text-white font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-[#FF9100]/30 text-lg">
                  {c.ctaBotao1 ?? "Quero ser assinante"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/agencia">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
                  {c.ctaBotao2 ?? "Conhecer a agência"}
                </button>
              </Link>
            </div>

            <p className="text-[#8ECAE6]/60 text-sm mt-8">
              * O acesso às ofertas do Clube de Vantagens é realizado pela área logada do Portal do Assinante.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
