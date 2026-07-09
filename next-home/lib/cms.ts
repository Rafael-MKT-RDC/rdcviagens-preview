import { sanityClient } from "./sanity";
import { wpPage, wpCollection } from "./wpClient";
import { RD_FORMS } from "./rdstation";

// Backend de conteúdo: "sanity" (padrão) ou "wordpress" (quando NEXT_PUBLIC_CMS=wordpress).
const CMS = process.env.NEXT_PUBLIC_CMS === "wordpress" ? "wordpress" : "sanity";

async function sfetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  try {
    const data = await sanityClient.fetch<T | null>(query, params);
    return (data ?? fallback) as T;
  } catch {
    return fallback;
  }
}

// ───────────────────────── Página (singleton) ─────────────────────────
export interface HomeContent {
  hero?: Array<{ badge?: string; title?: string; highlight?: string; subtitle?: string; description?: string; cta?: string; link?: string; image?: string }>;
  stats?: Array<{ value?: string; label?: string }>;
  sobreTitulo?: string; sobreParagrafo1?: string; sobreParagrafo2?: string; sobreCta?: string; sobreCtaLink?: string; sobreBadge?: string; sobreImagem?: string;
  porqueTitulo?: string; porqueSubtitulo?: string; features?: Array<{ title?: string; description?: string }>;
  redesBadge?: string; redesTitulo?: string; redesSubtitulo?: string; redesNota?: string; redesCta?: string; redesCtaLink?: string;
  destinosTitulo?: string; destinosSubtitulo?: string;
  assinaturasBadge?: string; assinaturasTitulo?: string; assinaturasCardTitulo?: string; assinaturasBullets?: string[]; assinaturasCta?: string; assinaturasCtaLink?: string; assinaturasImagem?: string;
  agenciaBadge?: string; agenciaTitulo?: string; agenciaCta?: string; agenciaCtaLink?: string;
  corpBadge?: string; corpTitulo?: string; corpSubtitulo?: string; corpSolucoes?: Array<{ title?: string; description?: string; cta?: string }>; corpCta?: string; corpCtaLink?: string;
  newsTitulo?: string; newsSubtitulo?: string;
}

export async function getHomePage(): Promise<HomeContent> {
  if (CMS === "wordpress") return wpPage<HomeContent>("paginaHome", {});
  return sfetch<HomeContent>('*[_type == "paginaHome"][0]', {}, {});
}

/** Singleton genérico por _type (ex.: "paginaSobre", "paginaPremiacao"). Fallback = {}. */
export async function getPageDoc<T = Record<string, unknown>>(type: string): Promise<T> {
  if (CMS === "wordpress") return wpPage<T>(type, {} as T);
  return sfetch<T>('*[_type == $type][0]', { type }, {} as T);
}

// ───────────────────────── Configurações globais ─────────────────────────
export interface SiteSettings {
  telefone: string; diasAtendimento: string; horario: string; tipoLigacao: string;
  textoInstitucional: string; email: string; horarioRodape: string; endereco: string; copyright: string;
  formNewsletterRdId: string;
  social: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string; tiktok?: string };
}

export const FALLBACK_SETTINGS: SiteSettings = {
  telefone: "0800-055-2600",
  diasAtendimento: "Seg a Sex",
  horario: "9h às 19h",
  tipoLigacao: "Ligação Gratuita",
  textoInstitucional: "Pioneira em assinatura de viagens no Brasil. Transformamos o sonho de viajar em um hábito possível, leve e constante na vida das pessoas.",
  email: "contato@rdcviagens.com.br",
  horarioRodape: "Seg a Sex, 9h às 19h · Ligação gratuita",
  endereco: "Rua Manoel Coelho, 600, Centro, São Caetano do Sul - SP, 09510-101",
  copyright: "© {ano} RDC Viagens. Todos os direitos reservados.",
  formNewsletterRdId: RD_FORMS.newsletter,
  social: {
    facebook: "https://www.facebook.com/rdcferiaseviagens",
    instagram: "https://www.instagram.com/rdcviagens",
    linkedin: "https://www.linkedin.com/company/rdcviagens",
    youtube: "https://www.youtube.com/c/rdcferiaseviagens",
    tiktok: "https://www.tiktok.com/@rdc.viagens",
  },
};

const QUERY_SETTINGS = `*[_type == "configuracoesGlobais"][0]{
  telefone, diasAtendimento, horario, tipoLigacao,
  textoInstitucional, email, horarioRodape, endereco, copyright, formNewsletterRdId,
  "social": redesSociais
}`;

export async function getSiteSettings(): Promise<SiteSettings> {
  const data =
    CMS === "wordpress"
      ? await wpPage<Partial<SiteSettings> | null>("configuracoesGlobais", null)
      : await sfetch<Partial<SiteSettings> | null>(QUERY_SETTINGS, {}, null);
  if (!data) return FALLBACK_SETTINGS;
  return { ...FALLBACK_SETTINGS, ...data, social: { ...FALLBACK_SETTINGS.social, ...(data.social ?? {}) } };
}

// ───────────────────────── Coleções ─────────────────────────
export interface BlogPost { id: string | number; title: string; excerpt: string; image: string; category: string; date: string }
export interface FaqItem { question: string; answer: string }
export interface FaqCategoryCMS { name: string; faqs: FaqItem[] }
export interface Depoimento { id: string | number; nome: string; cargo?: string; texto: string; estrelas: number; foto?: string; destaque?: boolean }
export interface ParceiroClube { id: string | number; nome: string; logo?: string; categoria: string; desconto: string; url?: string }
export interface Destino { id: string | number; nome: string; slug: string; regiao: string; imagem: string; qtdOpcoes: number; destaquesLista?: string[]; destaque?: boolean }
export interface RedeHoteleiraCMS { nome: string; descricao?: string; logo?: string }

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (CMS === "wordpress") return wpCollection<BlogPost>("blogPost");
  return sfetch<BlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc){ "id": _id, title, excerpt, "image": image.asset->url, category, "date": publishedAt }`,
    {}, [],
  );
}

export async function getFaqCategories(): Promise<FaqCategoryCMS[]> {
  if (CMS === "wordpress") return wpCollection<FaqCategoryCMS>("faqCategoria");
  return sfetch<FaqCategoryCMS[]>(
    `*[_type == "faqCategoria"] | order(ordem asc){ name, faqs[]{ question, answer } }`,
    {}, [],
  );
}

export async function getDepoimentos(): Promise<Depoimento[]> {
  if (CMS === "wordpress") return wpCollection<Depoimento>("depoimento");
  return sfetch<Depoimento[]>(
    `*[_type == "depoimento"] | order(destaque desc){ "id": _id, nome, cargo, texto, estrelas, "foto": foto.asset->url, destaque }`,
    {}, [],
  );
}

export async function getParceirosClube(): Promise<ParceiroClube[]> {
  if (CMS === "wordpress") return wpCollection<ParceiroClube>("parceiroClube");
  return sfetch<ParceiroClube[]>(
    `*[_type == "parceiroClube" && ativo == true] | order(nome asc){ "id": _id, nome, "logo": logo.asset->url, categoria, desconto, url }`,
    {}, [],
  );
}

export async function getDestinos(): Promise<Destino[]> {
  if (CMS === "wordpress") return wpCollection<Destino>("destino");
  return sfetch<Destino[]>(
    `*[_type == "destino"] | order(destaque desc, nome asc){ "id": _id, nome, "slug": slug.current, regiao, "imagem": imagem.asset->url, qtdOpcoes, destaquesLista, destaque }`,
    {}, [],
  );
}

export async function getRedesHoteleiras(): Promise<RedeHoteleiraCMS[]> {
  if (CMS === "wordpress") return wpCollection<RedeHoteleiraCMS>("redeHoteleira");
  return sfetch<RedeHoteleiraCMS[]>(
    `*[_type == "redeHoteleira" && ativo == true] | order(ordem asc, nome asc){ nome, descricao, "logo": logo.asset->url }`,
    {}, [],
  );
}
