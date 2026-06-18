# RDC Viagens — Site Institucional

Site institucional da **RDC Viagens** (RDC Férias e Viagens LTDA), construído como SPA em React + Vite com **CMS headless (Sanity)** para edição de conteúdo sem mexer no código.

## Tecnologias

- **Frontend:** React 19 + Vite 7 + TypeScript
- **Estilização:** Tailwind CSS 4 + shadcn/ui
- **Roteamento:** Wouter (client-side)
- **CMS:** Sanity (projeto `zb2hrfwb`, dataset `production`)
- **Ícones:** Lucide React
- **Formulários:** RD Station Forms (embed por contexto, ID configurável no CMS)

## Estrutura

```
rdcviagens-site/
├── client/
│   ├── index.html              # Meta SEO padrão, OG/Twitter, fontes
│   ├── public/                 # robots.txt, sitemap.xml, llms.txt, og-image.jpg, favicon
│   └── src/
│       ├── App.tsx             # Rotas (19 páginas públicas + /studio)
│       ├── pages/              # Uma página por rota
│       ├── components/         # Header, Footer, SEO, StructuredData, CtaLink, RDStationForm, etc.
│       ├── lib/
│       │   ├── sanityClient.ts     # Cliente Sanity (somente leitura, useCdn)
│       │   └── contentService.ts   # Queries GROQ + dados de fallback
│       └── pages/Studio.tsx    # Estúdio Sanity embutido em /studio
├── sanity/
│   └── schemas/                # Schemas do CMS (páginas singleton + coleções)
└── sanity.config.ts            # Config do estúdio standalone
```

## CMS — como funciona

Cada página tem um documento *singleton* no Sanity (ex.: `paginaHome`, `paginaTravelCloud`). Coleções: `blogPost`, `faqCategoria`, `depoimento`, `parceiroClube` (logos + % de desconto), `redeHoteleira`, `destino`.

O conteúdo é lido por `contentService.ts`. **Se o CMS estiver vazio, a página usa dados de fallback embutidos** — nunca renderiza em branco. Editores acessam o painel em **`/studio`** (ou no estúdio standalone `rdc-wp.sanity.studio`).

Pontos editáveis incluem textos, **links dos botões (CTAs)** e o **ID do formulário RD Station** de cada página.

### Backend de CMS (`VITE_CMS`)

O site busca conteúdo por `contentService.ts`, que escolhe a fonte por variável de ambiente:

- `VITE_CMS=sanity` (ou `VITE_SANITY_ENABLED=true`) — usa o **Sanity** (`/studio`). Usado no preview.
- `VITE_CMS=wordpress` + `VITE_WP_API_URL=https://SEU-WP/wp-json` — usa o **WordPress** como CMS headless (REST `rdc/v1`); a edição é no wp-admin e `/studio` fica desativado. Usado no oficial.
- sem variável — usa o conteúdo de fallback embutido.

Em todos os casos há fallback embutido, então a página nunca quebra mesmo com o CMS vazio/fora do ar. A estrutura que o WordPress precisa ter está em `Integracao-WordPress-Headless-RDC.md`.

## Desenvolvimento

```bash
pnpm install
pnpm dev        # ambiente local
pnpm build      # build de produção (Vite/esbuild)
```

## Deploy

O projeto é publicado no **domínio da RDC**. As alterações seguem o fluxo de **Pull Request** do time de desenvolvimento (não se faz commit direto na branch protegida). Há um repositório de **preview** (`rdcviagens-preview`, deploy automático na Vercel) mantido idêntico ao oficial para validação visual antes do merge.

## SEO / GEO

- Componente `SEO` define title, description, canonical, Open Graph, Twitter Card e JSON-LD por página
- `StructuredData` injeta Organization (TravelAgency) + WebSite globalmente
- `sitemap.xml`, `robots.txt` (libera crawlers de IA: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot e outros) e `llms.txt` para GEO
- 1 `<h1>` por página, alt text em 100% das imagens, mobile-first

### Prerender (HTML estático por rota)

Por ser uma SPA, sem prerender os metadados (title/description/JSON-LD) só
existem após o JavaScript rodar — invisíveis para crawlers/IA sem JS. Para
resolver, o build executa `scripts/prerender-seo.mjs` (passo automático no
`pnpm build`), que gera um `index.html` por rota dentro de `dist/public` já com
`<title>`, description, canonical, OG/Twitter e o JSON-LD global embutidos no
HTML inicial. O React continua hidratando por cima normalmente.

O servidor (`server/index.ts`) serve o arquivo pré-renderizado da rota quando
existe, senão cai no `index.html` raiz (SPA). Em hospedagem estática
(Vercel/Netlify/CDN) os arquivos por rota são servidos automaticamente.

Manutenção: ao criar/editar uma página, atualize a lista de rotas em
`scripts/prerender-seo.mjs` (títulos/descrições devem espelhar os `<SEO>`).
