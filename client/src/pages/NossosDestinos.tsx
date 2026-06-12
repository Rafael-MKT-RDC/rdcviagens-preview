import SEO from "@/components/SEO";
/**
 * Página: Nossos Destinos
 * Design: Mapa interativo com regiões do Brasil e destinos internacionais
 * Paleta: Azul RDC (#1a3a6b) + Rosa (#e91e8c) + Branco
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MapPin,
  Hotel,
  Globe,
  Search,
  Star,
  ChevronRight,
  Building2,
  Palmtree,
  Mountain,
  Waves,
  Plane,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
// Regiões do Brasil com destinos e hotéis
const regioesBrasil = [
  {
    id: "nordeste",
    nome: "Nordeste",
    icon: Palmtree,
    cor: "from-[#FF9100] to-[#E68200]",
    corBg: "bg-[#FFF8EB]",
    corText: "text-[#E68200]",
    corBorder: "border-[#FFCC80]",
    destinos: ["Porto de Galinhas", "Maceió", "Salvador", "Natal", "Fortaleza", "Recife", "João Pessoa", "São Luís", "Jericoacoara", "Praia do Forte", "Fernando de Noronha", "Porto Seguro", "Lençóis Maranhenses"],
    totalHoteis: "+8.500 opções",
    descricao: "Praias paradisíacas, cultura vibrante e gastronomia única",
    imagem: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=400&fit=crop",
  },
  {
    id: "sudeste",
    nome: "Sudeste",
    icon: Building2,
    cor: "from-[#F6F6F6]0 to-[#001A9E]",
    corBg: "bg-[#F6F6F6]",
    corText: "text-[#0020B8]",
    corBorder: "border-[#8ECAE6]",
    destinos: ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Vitória", "Campos do Jordão", "Búzios", "Angra dos Reis", "Paraty", "Ilhabela", "Guarujá", "Monte Verde", "Ouro Preto"],
    totalHoteis: "+12.000 opções",
    descricao: "Metrópoles, serras encantadoras e litoral deslumbrante",
    imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop",
  },
  {
    id: "sul",
    nome: "Sul",
    icon: Mountain,
    cor: "from-[#06D6A0] to-[#04A078]",
    corBg: "bg-[#E8FAF4]",
    corText: "text-[#059E78]",
    corBorder: "border-[#A0E8D0]",
    destinos: ["Gramado", "Canela", "Florianópolis", "Curitiba", "Foz do Iguaçu", "Balneário Camboriú", "Bento Gonçalves", "Garopaba", "Bombinhas", "Torres", "Lages", "São Joaquim"],
    totalHoteis: "+6.200 opções",
    descricao: "Serras, vinícolas, praias e a majestosa Foz do Iguaçu",
    imagem: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&h=400&fit=crop",
  },
  {
    id: "norte",
    nome: "Norte",
    icon: Waves,
    cor: "from-[#06D6A0] to-[#04A078]",
    corBg: "bg-[#E8FAF4]",
    corText: "text-[#059E78]",
    corBorder: "border-[#A0E8D0]",
    destinos: ["Manaus", "Belém", "Alter do Chão", "Jalapão", "Palmas", "Porto Velho", "Rio Branco", "Macapá"],
    totalHoteis: "+2.800 opções",
    descricao: "Amazônia, rios majestosos e ecoturismo que desperta seus sentidos",
    imagem: "https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=600&h=400&fit=crop",
  },
  {
    id: "centro-oeste",
    nome: "Centro-Oeste",
    icon: Globe,
    cor: "from-[#E68200] to-amber-700",
    corBg: "bg-[#FFF8EB]",
    corText: "text-[#CC7400]",
    corBorder: "border-[#FFCC80]",
    destinos: ["Brasília", "Goiânia", "Bonito", "Pantanal", "Caldas Novas", "Chapada dos Veadeiros", "Campo Grande", "Cuiabá", "Pirenópolis"],
    totalHoteis: "+3.500 opções",
    descricao: "Natureza exuberante, águas cristalinas e aventura",
    imagem: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
  },
];

// Destinos internacionais
const destinosInternacionais = [
  {
    id: "america-sul",
    nome: "América do Sul",
    cor: "from-[#06D6A0] to-[#04A078]",
    destinos: ["Buenos Aires", "Santiago", "Lima", "Cartagena", "Bariloche", "Montevidéu", "Cusco", "Mendoza"],
    totalHoteis: "+25.000 opções",
    imagem: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&h=300&fit=crop",
  },
  {
    id: "america-norte",
    nome: "América do Norte",
    cor: "from-[#F6F6F6]0 to-[#001A9E]",
    destinos: ["Orlando", "Miami", "Nova York", "Cancún", "Los Angeles", "Las Vegas", "Toronto", "Cidade do México"],
    totalHoteis: "+45.000 opções",
    imagem: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop",
  },
  {
    id: "europa",
    nome: "Europa",
    cor: "from-[#00148A] to-[#000D5C]",
    destinos: ["Paris", "Roma", "Barcelona", "Lisboa", "Londres", "Amsterdã", "Praga", "Santorini"],
    totalHoteis: "+55.000 opções",
    imagem: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
  },
  {
    id: "caribe",
    nome: "Caribe",
    cor: "from-[#00B4D8] to-[#008BA8]",
    destinos: ["Punta Cana", "Aruba", "Curaçao", "Jamaica", "Bahamas", "San Andrés", "Barbados", "Ilhas Cayman"],
    totalHoteis: "+18.000 opções",
    imagem: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400&h=300&fit=crop",
  },
  {
    id: "asia-oceania",
    nome: "Ásia e Oceania",
    cor: "from-[#E8506A] to-[#B83048]",
    destinos: ["Tóquio", "Bali", "Bangkok", "Maldivas", "Dubai", "Sydney", "Singapura", "Phuket"],
    totalHoteis: "+35.000 opções",
    imagem: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
  },
  {
    id: "africa",
    nome: "África",
    cor: "from-[#CC9900] to-[#996600]",
    destinos: ["Cidade do Cabo", "Marrakech", "Cairo", "Zanzibar", "Nairóbi", "Seychelles", "Maurício"],
    totalHoteis: "+12.000 opções",
    imagem: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&h=300&fit=crop",
  },
];

// Redes hoteleiras parceiras
const redesHoteleiras = [
  { nome: "Accor", descricao: "Ibis, Novotel, Mercure, Pullman, Sofitel", logo: "https://www.google.com/s2/favicons?domain=accor.com&sz=64" },
  { nome: "Atlântica", descricao: "Comfort, Quality, Radisson, Four Points", logo: "https://www.google.com/s2/favicons?domain=atlanticahotels.com.br&sz=64" },
  { nome: "Best Western", descricao: "Best Western, Best Western Plus, Premier", logo: "https://www.google.com/s2/favicons?domain=bestwestern.com&sz=64" },
  { nome: "Blue Tree", descricao: "Blue Tree Premium, Blue Tree Towers", logo: "https://www.google.com/s2/favicons?domain=bluetree.com.br&sz=64" },
  { nome: "Bourbon", descricao: "Bourbon Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=bourbon.com.br&sz=64" },
  { nome: "Hilton", descricao: "Hampton, DoubleTree, Conrad, Waldorf Astoria", logo: "https://www.google.com/s2/favicons?domain=hilton.com&sz=64" },
  { nome: "Hyatt", descricao: "Grand Hyatt, Hyatt Regency, Park Hyatt", logo: "https://www.google.com/s2/favicons?domain=hyatt.com&sz=64" },
  { nome: "IHG", descricao: "Holiday Inn, Crowne Plaza, InterContinental", logo: "https://www.google.com/s2/favicons?domain=ihg.com&sz=64" },
  { nome: "Intercity", descricao: "Intercity Hotels", logo: "https://www.google.com/s2/favicons?domain=intercityhoteis.com.br&sz=64" },
  { nome: "Laghetto", descricao: "Laghetto Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=laghettohoteis.com.br&sz=64" },
  { nome: "Louvre Hotels", descricao: "Golden Tulip, Royal Tulip, Tulip Inn", logo: "https://www.google.com/s2/favicons?domain=louvrehotels.com&sz=64" },
  { nome: "Marriott", descricao: "Courtyard, Sheraton, W Hotels, Ritz-Carlton", logo: "https://www.google.com/s2/favicons?domain=marriott.com&sz=64" },
  { nome: "Meliá", descricao: "Meliá, Tryp, Sol, Innside", logo: "https://www.google.com/s2/favicons?domain=melia.com&sz=64" },
  { nome: "Nacional Inn", descricao: "Nacional Inn, Dan Inn, Golden Park", logo: "https://www.google.com/s2/favicons?domain=nacionalinn.com.br&sz=64" },
  { nome: "Vila Galé", descricao: "Vila Galé Resorts, Vila Galé Collection", logo: "https://www.google.com/s2/favicons?domain=vilagale.com&sz=64" },
  { nome: "WAM", descricao: "WAM Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=wamhoteis.com.br&sz=64" },
  { nome: "Windsor", descricao: "Windsor Hotéis", logo: "https://www.google.com/s2/favicons?domain=windsorhoteis.com&sz=64" },
  { nome: "Wyndham", descricao: "Ramada, Tryp, Howard Johnson, Days Inn", logo: "https://www.google.com/s2/favicons?domain=wyndhamhotels.com&sz=64" },
];

export default function NossosDestinos() {
  const [busca, setBusca] = useState("");
  const [regiaoAtiva, setRegiaoAtiva] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<"brasil" | "internacional">("brasil");

  // Filtrar destinos pela busca
  const todosDestinosBrasil = regioesBrasil.flatMap((r) =>
    r.destinos.map((d) => ({ destino: d, regiao: r.nome, cor: r.corText }))
  );
  const todosDestinosInternacionais = destinosInternacionais.flatMap((r) =>
    r.destinos.map((d) => ({ destino: d, regiao: r.nome }))
  );
  const todosDestinos = [...todosDestinosBrasil, ...todosDestinosInternacionais];

  const resultadosBusca = busca.length >= 2
    ? todosDestinos.filter((d) =>
        d.destino.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Destinos | +200 Mil Hotéis e Resorts"
        description="Explore mais de 200 mil hotéis e resorts no Brasil e no mundo: Nordeste, Europa, Caribe e muito mais. Redes Accor, Marriott e Hilton. Descubra os destinos!"
        keywords="destinos RDC Viagens, hotéis Brasil, resorts nordeste, viagens internacionais, Accor, Marriott, Hilton, hotéis 4 estrelas, hotéis 5 estrelas"
        canonical="/destinos"
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a6b] via-[#0f2847] to-[#0a1c33]" />
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF9100] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-20 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Globe className="w-4 h-4" />
              +200 mil destinos no Brasil e no mundo
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Nossos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9100] to-[#E68200]">
                Destinos
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
              Explore mais de <strong className="text-white">200 mil opções de hospedagem</strong> nos melhores hotéis
              do Brasil e do mundo. Das praias do Nordeste às montanhas da Europa,
              seu próximo destino está aqui.
            </p>

            {/* Buscador */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="text"
                  placeholder="Busque seu destino... (ex: Gramado, Cancún, Paris)"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white text-[#2D2D2D] text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-[#FF9100]/30 placeholder:text-[#999999]"
                />
              </div>

              {/* Resultados da busca */}
              <AnimatePresence>
                {resultadosBusca.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#E8E8E8] max-h-72 overflow-y-auto z-50"
                  >
                    {resultadosBusca.slice(0, 10).map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-[#F6F6F6] transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                      >
                        <MapPin className="w-4 h-4 text-[#FF9100] shrink-0" />
                        <div>
                          <span className="font-medium text-[#2D2D2D]">{r.destino}</span>
                          <span className="text-sm text-[#999999] ml-2">{r.regiao}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#D6D6D6] ml-auto" />
                      </div>
                    ))}
                    {resultadosBusca.length > 10 && (
                      <div className="px-5 py-3 text-sm text-[#999999] text-center">
                        +{resultadosBusca.length - 10} destinos encontrados
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Estatísticas */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[
                { valor: "+200 mil", label: "destinos disponíveis" },
                { valor: "+33 mil", label: "hotéis no Brasil" },
                { valor: "6 continentes", label: "ao redor do mundo" },
                { valor: "Qualidade", label: "garantida sempre" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.valor}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Abas Brasil / Internacional */}
      <section className="py-12 md:py-16 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setAbaAtiva("brasil")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                abaAtiva === "brasil"
                  ? "bg-gradient-to-r from-[#1a3a6b] to-[#0f2847] text-white shadow-lg shadow-blue-900/20"
                  : "bg-white text-[#555555] hover:bg-[#F0F0F0] border border-[#D6D6D6]"
              }`}
            >
              <MapPin className="w-5 h-5" />
              Brasil
            </button>
            <button
              onClick={() => setAbaAtiva("internacional")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                abaAtiva === "internacional"
                  ? "bg-gradient-to-r from-[#1a3a6b] to-[#0f2847] text-white shadow-lg shadow-blue-900/20"
                  : "bg-white text-[#555555] hover:bg-[#F0F0F0] border border-[#D6D6D6]"
              }`}
            >
              <Plane className="w-5 h-5" />
              Internacional
            </button>
          </div>

          <AnimatePresence mode="wait">
            {abaAtiva === "brasil" ? (
              <motion.div
                key="brasil"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <span className="text-sm font-semibold text-[#FF9100] uppercase tracking-wider">Destinos Nacionais</span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
                    Explore o Brasil de Norte a Sul
                  </h2>
                  <p className="text-[#777777] mt-3 max-w-2xl mx-auto">
                    Mais de 33 mil hotéis parceiros em todas as regiões do Brasil. Clique em uma região para ver os principais destinos.
                  </p>
                </div>

                {/* Grid de regiões */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regioesBrasil.map((regiao, i) => {
                    const Icon = regiao.icon;
                    const isActive = regiaoAtiva === regiao.id;

                    return (
                      <motion.div
                        key={regiao.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setRegiaoAtiva(isActive ? null : regiao.id)}
                        className={`relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                          isActive
                            ? `${regiao.corBorder} shadow-xl`
                            : "border-transparent shadow-md hover:shadow-lg"
                        }`}
                      >
                        {/* Imagem */}
                        <div className="relative h-48 overflow-hidden">
                          <img src={regiao.imagem}
                            alt={regiao.nome}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${regiao.cor} flex items-center justify-center`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-white">{regiao.nome}</h3>
                                  <span className="text-sm text-white/80">{regiao.totalHoteis}</span>
                                </div>
                              </div>
                              <div className={`w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}>
                                <ChevronRight className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Descrição */}
                        <div className="p-5">
                          <p className="text-[#777777] text-sm mb-3">{regiao.descricao}</p>

                          {/* Destinos expandidos */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="pt-3 border-t border-[#E8E8E8]">
                                  <p className="text-xs font-semibold text-[#999999] uppercase tracking-wider mb-3">Principais destinos</p>
                                  <div className="flex flex-wrap gap-2">
                                    {regiao.destinos.map((destino, j) => (
                                      <span
                                        key={j}
                                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${regiao.corBg} ${regiao.corText} font-medium`}
                                      >
                                        <MapPin className="w-3 h-3" />
                                        {destino}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {!isActive && (
                            <div className="flex flex-wrap gap-1.5">
                              {regiao.destinos.slice(0, 4).map((destino, j) => (
                                <span
                                  key={j}
                                  className="text-xs px-2.5 py-1 rounded-full bg-[#F0F0F0] text-[#777777]"
                                >
                                  {destino}
                                </span>
                              ))}
                              {regiao.destinos.length > 4 && (
                                <span className={`text-xs px-2.5 py-1 rounded-full ${regiao.corBg} ${regiao.corText} font-medium`}>
                                  +{regiao.destinos.length - 4} destinos
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="internacional"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <span className="text-sm font-semibold text-[#FF9100] uppercase tracking-wider">Destinos Internacionais</span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
                    O mundo inteiro ao seu alcance
                  </h2>
                  <p className="text-[#777777] mt-3 max-w-2xl mx-auto">
                    Mais de 170 mil opções de hospedagem em 6 continentes. De praias caribenhas a cidades europeias, seu destino dos sonhos está aqui.
                  </p>
                </div>

                {/* Grid de continentes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinosInternacionais.map((continente, i) => (
                    <motion.div
                      key={continente.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img src={continente.imagem}
                          alt={continente.nome}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${continente.cor} text-white text-xs font-semibold`}>
                            {continente.totalHoteis}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-2xl font-bold text-white">{continente.nome}</h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex flex-wrap gap-2">
                          {continente.destinos.map((destino, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-[#F0F0F0] text-[#555555] hover:bg-[#D6D6D6] transition-colors"
                            >
                              <MapPin className="w-3 h-3 text-[#FF9100]" />
                              {destino}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Redes Hoteleiras */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#FF9100] uppercase tracking-wider">Nossas Redes Parceiras</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
              As principais redes hoteleiras do mundo
            </h2>
            <p className="text-[#777777] mt-3 max-w-2xl mx-auto">
              Trabalhamos com as <strong>principais redes hoteleiras nacionais e internacionais</strong> para oferecer uma excelente experiência de hospedagem para nossos assinantes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {redesHoteleiras.map((rede, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl border border-[#E8E8E8] p-5 hover:shadow-lg hover:border-[#FFCC80] transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#F6F6F6] flex items-center justify-center overflow-hidden group-hover:bg-[#FFF8EB] transition-colors">
                  <img src={rede.logo}
                    alt={rede.nome}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement("span");
                        span.className = "text-xl font-bold text-[#1a3a6b]";
                        span.textContent = rede.nome.charAt(0);
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
                <h3 className="font-bold text-[#2D2D2D] text-sm">{rede.nome}</h3>
                <p className="text-xs text-[#999999] mt-1 leading-relaxed">{rede.descricao}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#999999]">
              E muitas outras redes e hotéis independentes em todo o mundo.
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#FF9100] uppercase tracking-wider">Por que escolher a RDC</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mt-2">
              Muito mais que hospedagem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                titulo: "Hotéis selecionados",
                descricao: "Nossas opções de hospedagem são em hotéis de alta qualidade, proporcionando conforto e excelência em cada estadia.",
              },
              {
                icon: Shield,
                titulo: "Ampla disponibilidade",
                descricao: "Com mais de 200 mil destinos, você encontra uma ampla variedade de opções para suas datas e preferências de viagem.",
              },
              {
                icon: Hotel,
                titulo: "Agência dedicada",
                descricao: "Nossa equipe auxilia no planejamento da sua viagem, desde a hospedagem até passagens e transfers.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#1a3a6b] to-[#0f2847] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">{item.titulo}</h3>
                  <p className="text-[#777777] leading-relaxed">{item.descricao}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1a3a6b] via-[#0f2847] to-[#0a1c33] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-10 right-20 w-72 h-72 bg-[#FF9100] rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe className="w-12 h-12 text-[#FF9100] mx-auto mb-6" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Mais de 200 mil destinos esperando por você
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Assine a RDC e tenha acesso a hotéis no Brasil e no mundo inteiro,
              com <strong>economia e planejamento</strong>. Sua próxima viagem começa aqui.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assinaturas">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF9100] to-[#E68200] text-white rounded-2xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-[#FF9100]/30">
                  Ver planos de assinatura
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/agencia">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">
                  Conhecer a agência
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
