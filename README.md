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
