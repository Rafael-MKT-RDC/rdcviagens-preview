/**
 * Prerender SEO/GEO — pós-build
 * --------------------------------
 * Gera um index.html ESTÁTICO por rota dentro de dist/public, com
 * <title>, meta description, canonical, Open Graph/Twitter e o JSON-LD
 * global (Organization + WebSite) já embutidos no HTML inicial.
 *
 * Por quê: o site é uma SPA (Vite + React). Sem isto, crawlers/IA que NÃO
 * executam JavaScript veem apenas o index.html padrão em todas as rotas.
 * Com os arquivos pré-renderizados, cada rota entrega seus próprios metadados
 * já no HTML — ganho direto de SEO e GEO. O React continua hidratando por cima
 * normalmente (o conteúdo visual não muda).
 *
 * Seguro por padrão: qualquer erro é apenas avisado (warn) e o script termina
 * com código 0, para NUNCA quebrar o build/deploy.
 *
 * IMPORTANTE (manutenção): os títulos/descrições abaixo devem espelhar os
 * <SEO> de cada página em client/src/pages. Ao criar/editar uma página,
 * atualize também esta lista.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist", "public");
const BASE_URL = "https://rdcviagens.com.br";
const SITE_NAME = "RDC Viagens";
const SUFFIX = ` | ${SITE_NAME}`;

// --- JSON-LD global (igual ao client/src/components/StructuredData.tsx) ---
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "RDC Viagens",
  alternateName: "RDC Férias e Viagens",
  url: "https://rdcviagens.com.br",
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/Logo_RDC_oficial_4e0ebd10.png",
  description:
    "Pioneira em assinatura de viagens no Brasil há mais de 35 anos. Plano de 7 diárias por ano com tarifa exclusiva de até 60% OFF em +200 mil hotéis e resorts no Brasil e no mundo.",
  foundingDate: "1991",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Manoel Coelho, 600, Centro",
    addressLocality: "São Caetano do Sul",
    addressRegion: "SP",
    postalCode: "09510-101",
    addressCountry: "BR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+55-0800-055-2600",
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: "Portuguese",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
  ],
  sameAs: [
    "https://www.instagram.com/rdcviagens",
    "https://www.facebook.com/rdcferiaseviagens",
    "https://www.youtube.com/c/rdcferiaseviagens",
    "https://www.linkedin.com/company/rdcviagens",
    "https://www.tiktok.com/@rdc.viagens",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "1000",
    bestRating: "5",
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: "400" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RDC Viagens",
  url: "https://rdcviagens.com.br",
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://rdcviagens.com.br/destinos?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// --- Rotas: precisa espelhar os <SEO> das páginas ---
const routes = [
  { p: "/", t: "Assinatura de Viagens com até 60% de Economia", d: "Assinatura de viagens com até 60% de economia em mais de 200 mil hotéis e resorts no Brasil e no mundo. 7 diárias por ano e tarifa exclusiva ilimitada. Conheça!" },
  { p: "/assinaturas", t: "Assinatura de Viagens | 7 Diárias por Ano", d: "Plano de 7 diárias por ano em hotéis e resorts 4 e 5 estrelas com até 60% de economia. Tarifa exclusiva ilimitada e agência de viagens dedicada. Assine agora!" },
  { p: "/agencia", t: "Agência de Viagens | Pacotes Exclusivos", d: "Pacotes de viagens completos com aéreo, hotel, traslados e passeios. Condições especiais para assinantes RDC com consultores dedicados. Solicite sua cotação!" },
  { p: "/destinos", t: "Destinos | +200 Mil Hotéis e Resorts", d: "Explore mais de 200 mil hotéis e resorts no Brasil e no mundo: Nordeste, Europa, Caribe e muito mais. Redes Accor, Marriott e Hilton. Descubra os destinos!" },
  { p: "/clube-vantagens", t: "Clube de Vantagens | Descontos Exclusivos", d: "Descontos de até 50% em restaurantes, entretenimento, saúde, educação e beleza em todo o Brasil. Benefício exclusivo para assinantes RDC. Aproveite agora!" },
  { p: "/programa-indicacao", t: "Programa Indique e Ganhe | Recompensas", d: "Indique amigos para a RDC Viagens e ganhe recompensas exclusivas a cada indicação confirmada. Quanto mais você indica, mais ganha. Comece a indicar agora!" },
  { p: "/viaje-tranquilo", t: "Viaje Tranquilo | Suporte 24h e Atendimento", d: "Prioridade no atendimento, suporte 24h, early check-in e late check-out por apenas R$ 29,90/mês. Serviço exclusivo para assinantes RDC. Contrate agora!" },
  { p: "/solucoes-corporativas", t: "Soluções Corporativas | Premiação e Gestão", d: "Soluções corporativas de viagens para empresas: premiação e incentivo, gestão de viagens para PMEs e parcerias estratégicas. Descubra como podemos ajudar!" },
  { p: "/solucoes-corporativas/premiacao", t: "Premiação | Incentivo com Viagens", d: "Viagens como ferramenta de incentivo corporativo para engajar colaboradores, clientes e parceiros. Solução completa para RH e Marketing. Conheça os benefícios!" },
  { p: "/solucoes-corporativas/gestao", t: "Gestão de Viagens Corporativas para PMEs", d: "Gestão completa de viagens corporativas para pequenas e médias empresas. Economize até 30%, centralize reservas e controle gastos. Solicite uma demonstração!" },
  { p: "/solucoes-corporativas/parcerias", t: "Parcerias e Alianças Estratégicas em Viagens", d: "Parcerias estratégicas com bancos, fintechs, empresas e plataformas digitais. Crie novos canais de receita com soluções de viagens. Torne-se parceiro agora!" },
  { p: "/solucoes-corporativas/travel-cloud", t: "Travel Cloud | Plataforma White Label de Viagens", d: "RDC Travel Cloud: plataforma white label para empresas, fintechs e plataformas de benefícios oferecerem viagens em seus ambientes digitais. Agende uma conversa!" },
  { p: "/sobre", t: "Sobre Nós | +35 Anos de Experiência em Viagens", d: "Há mais de 35 anos democratizando o acesso a viagens de qualidade no Brasil. Pioneira em assinatura de viagens, com mais de 1 milhão de diárias entregues." },
  { p: "/contato", t: "Contato | Fale Conosco | Atendimento 0800", d: "Fale com a RDC Viagens pelo chat, WhatsApp ou televendas gratuito 0800-055-2600. Atendimento de segunda a sexta, das 9h às 19h. Tire suas dúvidas agora!" },
  { p: "/blog", t: "Blog de Viagens | Dicas, Destinos e Roteiros", d: "Dicas de viagem, roteiros exclusivos e destinos imperdíveis no Brasil e no mundo. Inspire-se para planejar sua próxima jornada com o blog da RDC Viagens!" },
  { p: "/duvidas", t: "Dúvidas Frequentes | Assinatura de Viagens", d: "Tire suas dúvidas sobre a assinatura RDC Viagens: como funciona, carência de 40 dias, tarifa exclusiva, reservas e pagamentos. Encontre todas as respostas!" },
  { p: "/trabalhe-conosco", t: "Trabalhe Conosco | Vagas e Carreiras", d: "Faça parte da equipe RDC Viagens, empresa certificada Great Place to Work com mais de 400 colaboradores apaixonados por viagens. Confira as vagas abertas!" },
  { p: "/seja-parceiro", t: "Seja Parceiro Hoteleiro | Cadastre seu Hotel", d: "Cadastre seu hotel ou pousada na RDC Viagens e alcance mais de 200 mil assinantes ativos. Aumente sua ocupação com 35 anos de experiência. Seja parceiro!" },
  { p: "/documentos", t: "Documentos Legais | Termos e Privacidade", d: "Acesse os documentos legais da RDC Viagens: termos de uso, política de privacidade e contratos de assinatura. Transparência e segurança para nossos assinantes.", noindex: true },
];

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Substitui o content/href de uma tag identificada por um atributo, tolerando
// aspas simples/duplas e tag auto-fechável. Se não casar, avisa e segue.
function replaceAttr(html, tag, idAttr, idVal, valAttr, newVal) {
  const re = new RegExp(
    `(<${tag}\\s+${idAttr}=["']${idVal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*?${valAttr}=["'])[^"']*(["'])`,
    "i"
  );
  if (!re.test(html)) {
    console.warn(`[prerender] aviso: não encontrei ${tag}[${idAttr}=${idVal}]`);
    return html;
  }
  return html.replace(re, `$1${esc(newVal)}$2`);
}

function buildHtml(template, route) {
  const fullTitle = route.t + SUFFIX;
  const canonical = BASE_URL + (route.p === "/" ? "/" : route.p);
  const robots = route.noindex ? "noindex, nofollow" : "index, follow";

  let html = template;
  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(fullTitle)}</title>`);
  // metas / canonical
  html = replaceAttr(html, "meta", "name", "description", "content", route.d);
  html = replaceAttr(html, "meta", "name", "robots", "content", robots);
  html = replaceAttr(html, "link", "rel", "canonical", "href", canonical);
  html = replaceAttr(html, "meta", "property", "og:title", "content", fullTitle);
  html = replaceAttr(html, "meta", "property", "og:description", "content", route.d);
  html = replaceAttr(html, "meta", "property", "og:url", "content", canonical);
  html = replaceAttr(html, "meta", "name", "twitter:title", "content", fullTitle);
  html = replaceAttr(html, "meta", "name", "twitter:description", "content", route.d);

  // JSON-LD global (Organization + WebSite) — injetado antes de </head>
  const ld =
    `<script type="application/ld+json" id="structured-data-organization">${JSON.stringify(organizationSchema)}</script>` +
    `<script type="application/ld+json" id="structured-data-website">${JSON.stringify(websiteSchema)}</script>`;
  html = html.replace(/<\/head>/i, `${ld}</head>`);
  return html;
}

try {
  const templatePath = join(DIST, "index.html");
  if (!existsSync(templatePath)) {
    console.warn(`[prerender] ${templatePath} não existe — pulando prerender.`);
    process.exit(0);
  }
  const template = readFileSync(templatePath, "utf8");
  let count = 0;
  for (const route of routes) {
    try {
      const html = buildHtml(template, route);
      if (route.p === "/") {
        writeFileSync(templatePath, html, "utf8");
      } else {
        const dir = join(DIST, route.p);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, "index.html"), html, "utf8");
      }
      count++;
    } catch (e) {
      console.warn(`[prerender] falha na rota ${route.p}: ${e?.message || e}`);
    }
  }
  console.log(`[prerender] ${count}/${routes.length} rotas pré-renderizadas em dist/public.`);
} catch (e) {
  console.warn(`[prerender] erro geral (ignorado): ${e?.message || e}`);
}
process.exit(0);
