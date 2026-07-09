// Conteúdo de fallback — igual ao que o site renderiza hoje quando o CMS está vazio.
// (Na produção Next, isto viria de fetch server-side ao CMS; aqui usamos o fallback fiel.)

export const siteSettings = {
  telefone: "0800-055-2600",
  diasAtendimento: "Seg a Sex",
  horario: "9h às 19h",
  tipoLigacao: "Ligação Gratuita",
};

export type HeroSlide = {
  id: number;
  image: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  link: string | null;
  cta: string | null;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-institucional-v2-6yHXJTBkcBCnQNZRsxDPn9.webp",
    badge: "O jeito inteligente de viajar o ano todo",
    title: "Transformamos intenção em",
    highlight: "jornada",
    subtitle: "há mais de 35 anos",
    description: "Somos guias de jornadas transformadoras. Facilitamos o acesso a viagens com planejamento inteligente, economia real e liberdade para explorar o ano todo.",
    link: null,
    cta: null,
  },
  {
    id: 2,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-assinatura-v2-NAvxMgAH9q7Byv9moYEwre.webp",
    badge: "Assinatura de Viagens RDC",
    title: "O jeito inteligente de",
    highlight: "viajar",
    subtitle: "o ano todo",
    description: "Planejamento inteligente, economia real e mais momentos em família. Com a Assinatura RDC, você transforma meses em memórias.",
    link: "/assinaturas",
    cta: "Quero começar minha jornada",
  },
  {
    id: 3,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-agencia-fxpZAPvpvCEkRaWfhaKcEe.webp",
    badge: "Agência de Viagens RDC",
    title: "Sua próxima",
    highlight: "descoberta",
    subtitle: "começa com um bom plano",
    description: "Nossos consultores já trilharam esse caminho milhares de vezes. Roteiros sob medida, atendimento dedicado e a experiência de quem entende de viagem.",
    link: "/agencia",
    cta: "Vamos planejar juntos?",
  },
  {
    id: 4,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-corporativo-v2-h8fr5CHGub7t9PRDANetgf.webp",
    badge: "Soluções para Empresas",
    title: "Inteligência em viagens",
    highlight: "corporativas",
    subtitle: "",
    description: "Premiação com viagens, gestão inteligente e parcerias estratégicas. Mais de 35 anos de experiência transformando a forma como empresas viajam.",
    link: "/solucoes-corporativas",
    cta: "Descubra nossas soluções",
  },
];

export const stats = [
  { value: "+35", label: "Anos de experiência" },
  { value: "+200 mil", label: "Destinos disponíveis" },
  { value: "+1 milhão", label: "Diárias entregues" },
  { value: "NPS 75", label: "Satisfação dos assinantes" },
];

export const corporateSolutions = [
  { title: "RDC Premiação", description: "Benefício corporativo que transforma vidas. Ofereça viagens como reconhecimento para seus colaboradores.", href: "/solucoes-corporativas#premiacao", cta: "Descubra como premiar", logo: "/logos/b2b/premiacao_logo.svg", ctaBg: "bg-[#FF9100] hover:bg-[#E68200] text-white" },
  { title: "RDC Gestão de Viagens", description: "Gestão completa de viagens corporativas com eficiência, controle e economia.", href: "/solucoes-corporativas#gestao", cta: "Conheça a gestão inteligente", logo: "/logos/b2b/gestao_de_viagens_logo.svg", ctaBg: "bg-[#FF9100] hover:bg-[#E68200] text-white" },
  { title: "RDC Parcerias", description: "Alianças estratégicas para criar novos canais de aquisição e valor agregado.", href: "/solucoes-corporativas#parcerias", cta: "Vamos construir juntos?", logo: "/logos/b2b/parcerias_logo.svg", ctaBg: "bg-[#FF9100] hover:bg-[#E68200] text-white" },
  { title: "RDC Travel Cloud", description: "Viagens dentro do seu ecossistema. Plataforma white label para parceiros oferecerem viagens.", href: "/solucoes-corporativas#travelcloud", cta: "Vamos construir juntos?", logo: "/logos/b2b/travel_cloude_logo.svg", ctaBg: "bg-[#FF9100] hover:bg-[#E68200] text-white" },
];

export type Rede = { nome: string; descricao?: string; logo?: string };
export const redesHoteleiras: Rede[] = [
  { nome: "Accor", descricao: "Ibis, Novotel, Mercure, Pullman, Sofitel", logo: "https://www.google.com/s2/favicons?domain=accor.com&sz=128" },
  { nome: "Atlântica", descricao: "Comfort, Quality, Radisson, Four Points", logo: "https://www.google.com/s2/favicons?domain=atlanticahotels.com.br&sz=128" },
  { nome: "Best Western", descricao: "Best Western, Best Western Plus, Premier", logo: "https://www.google.com/s2/favicons?domain=bestwestern.com&sz=128" },
  { nome: "Blue Tree", descricao: "Blue Tree Premium, Blue Tree Towers", logo: "https://www.google.com/s2/favicons?domain=bluetree.com.br&sz=128" },
  { nome: "Bourbon", descricao: "Bourbon Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=bourbon.com.br&sz=128" },
  { nome: "Hilton", descricao: "Hampton, DoubleTree, Conrad, Waldorf Astoria", logo: "https://www.google.com/s2/favicons?domain=hilton.com&sz=128" },
  { nome: "Hyatt", descricao: "Grand Hyatt, Hyatt Regency, Park Hyatt", logo: "https://www.google.com/s2/favicons?domain=hyatt.com&sz=128" },
  { nome: "IHG", descricao: "Holiday Inn, Crowne Plaza, InterContinental", logo: "https://www.google.com/s2/favicons?domain=ihg.com&sz=128" },
  { nome: "Intercity", descricao: "Intercity Hotels", logo: "https://www.google.com/s2/favicons?domain=intercityhoteis.com.br&sz=128" },
  { nome: "Laghetto", descricao: "Laghetto Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=laghettohoteis.com.br&sz=128" },
  { nome: "Louvre Hotels", descricao: "Golden Tulip, Royal Tulip, Tulip Inn", logo: "https://www.google.com/s2/favicons?domain=louvrehotels.com&sz=128" },
  { nome: "Marriott", descricao: "Courtyard, Sheraton, W Hotels, Ritz-Carlton", logo: "https://www.google.com/s2/favicons?domain=marriott.com&sz=128" },
  { nome: "Meliá", descricao: "Meliá, Tryp, Sol, Innside", logo: "https://www.google.com/s2/favicons?domain=melia.com&sz=128" },
  { nome: "Nacional Inn", descricao: "Nacional Inn, Dan Inn, Golden Park", logo: "https://www.google.com/s2/favicons?domain=nacionalinn.com.br&sz=128" },
  { nome: "Vila Galé", descricao: "Vila Galé Resorts, Vila Galé Collection", logo: "https://www.google.com/s2/favicons?domain=vilagale.com&sz=128" },
  { nome: "WAM", descricao: "WAM Hotéis & Resorts", logo: "https://www.google.com/s2/favicons?domain=wamhoteis.com.br&sz=128" },
  { nome: "Windsor", descricao: "Windsor Hotéis", logo: "https://www.google.com/s2/favicons?domain=windsorhoteis.com&sz=128" },
  { nome: "Wyndham", descricao: "Ramada, Tryp, Howard Johnson, Days Inn", logo: "https://www.google.com/s2/favicons?domain=wyndhamhotels.com&sz=128" },
];

export const destinationCategories = [
  { name: "Destinos Nacionais", description: "Praias paradisíacas, serras encantadoras e cidades históricas. O Brasil inteiro ao seu alcance.", highlights: ["Nordeste", "Serra Gaúcha", "Chapada Diamantina", "Pantanal"], image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80", link: "/destinos", icon: "MapPin" },
  { name: "Destinos Internacionais", description: "Europa, Caribe, América do Sul e muito mais. O mundo espera por você.", highlights: ["Europa", "Caribe", "América do Sul", "Ásia"], image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80", link: "/destinos", icon: "Globe" },
  { name: "Cruzeiros", description: "Navegue pelos mares mais bonitos do mundo com conforto e sofisticação.", highlights: ["Marítimos", "Fluviais", "Temáticos", "Expedições"], image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", link: "/destinos", icon: "Anchor" },
  { name: "Experiências Exclusivas", description: "Resorts all inclusive, lua de mel, ecoturismo e roteiros temáticos sob medida.", highlights: ["All Inclusive", "Lua de Mel", "Ecoturismo", "Roteiros Temáticos"], image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80", link: "/destinos", icon: "Sparkles" },
];
