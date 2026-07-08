import { sanityClient } from "./sanity";

// ---- Tipos (espelham o contentService do site atual) ----
export interface HomeContent {
  hero?: Array<{ badge?: string; title?: string; highlight?: string; subtitle?: string; description?: string; cta?: string; link?: string; image?: string }>;
  stats?: Array<{ value?: string; label?: string }>;
  sobreTitulo?: string; sobreParagrafo1?: string; sobreParagrafo2?: string; sobreCta?: string; sobreBadge?: string; sobreImagem?: string;
  porqueTitulo?: string; porqueSubtitulo?: string; features?: Array<{ title?: string; description?: string }>;
  redesBadge?: string; redesTitulo?: string; redesSubtitulo?: string; redesNota?: string; redesCta?: string;
  destinosTitulo?: string; destinosSubtitulo?: string;
  assinaturasBadge?: string; assinaturasTitulo?: string; assinaturasCardTitulo?: string; assinaturasBullets?: string[]; assinaturasCta?: string; assinaturasImagem?: string;
  agenciaBadge?: string; agenciaTitulo?: string; agenciaCta?: string;
  corpBadge?: string; corpTitulo?: string; corpSubtitulo?: string; corpSolucoes?: Array<{ title?: string; description?: string; cta?: string }>; corpCta?: string;
  newsTitulo?: string; newsSubtitulo?: string;
}

export interface SiteSettings {
  telefone: string; diasAtendimento: string; horario: string; tipoLigacao: string;
  textoInstitucional: string; email: string; horarioRodape: string; endereco: string; copyright: string;
  social: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string; tiktok?: string };
}

export const FALLBACK_SETTINGS: SiteSettings = {
  telefone: "0800-055-2600",
  diasAtendimento: "Seg a Sex",
  horario: "9h às 19h",
  tipoLigacao: "Ligação gratuita",
  textoInstitucional: "Pioneira em assinatura de viagens no Brasil. Transformamos o sonho de viajar em um hábito possível, leve e constante na vida das pessoas.",
  email: "contato@rdcviagens.com.br",
  horarioRodape: "Seg a Sex, 9h às 19h · Ligação gratuita",
  endereco: "Rua Manoel Coelho, 600, Centro, São Caetano do Sul - SP, 09510-101",
  copyright: "© {ano} RDC Viagens. Todos os direitos reservados.",
  social: {
    facebook: "https://www.facebook.com/rdcferiaseviagens",
    instagram: "https://www.instagram.com/rdcviagens",
    linkedin: "https://www.linkedin.com/company/rdcviagens",
    youtube: "https://www.youtube.com/c/rdcferiaseviagens",
    tiktok: "https://www.tiktok.com/@rdc.viagens",
  },
};

// Busca server-side (SSR). Se o CMS estiver vazio/fora do ar → fallback, nunca quebra.
export async function getHomePage(): Promise<HomeContent> {
  try {
    const doc = await sanityClient.fetch<HomeContent | null>('*[_type == "paginaHome"][0]');
    return doc ?? {};
  } catch {
    return {};
  }
}

const QUERY_SETTINGS = `*[_type == "configuracoesGlobais"][0]{
  telefone, diasAtendimento, horario, tipoLigacao,
  textoInstitucional, email, horarioRodape, endereco, copyright,
  "social": redesSociais
}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await sanityClient.fetch<Partial<SiteSettings> | null>(QUERY_SETTINGS);
    if (!data) return FALLBACK_SETTINGS;
    return { ...FALLBACK_SETTINGS, ...data, social: { ...FALLBACK_SETTINGS.social, ...(data.social ?? {}) } };
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export interface RedeHoteleiraCMS { nome: string; descricao?: string; logo?: string }
export async function getRedesHoteleiras(): Promise<RedeHoteleiraCMS[]> {
  try {
    const data = await sanityClient.fetch<RedeHoteleiraCMS[]>(
      `*[_type == "redeHoteleira" && ativo == true] | order(ordem asc, nome asc){ nome, descricao, "logo": logo.asset->url }`
    );
    return data ?? [];
  } catch {
    return [];
  }
}
