# RDC Viagens — Migração para Next.js (Home + CMS Sanity)

Primeiro passo da migração **React/Vite (CSR) → Next.js (SSR/SSG)** recomendada pelo time de tecnologia.
Escopo: **Home**, fiel ao visual atual, já com as boas práticas apontadas na análise **e com o CMS (Sanity) ligado**.

## O que resolve (pontos da análise dos devs)
- **CSR → SSR**: o HTML já vem preenchido do servidor (não mais `<div id="root">` vazio).
- **SEO por página**: title/description/canonical/OG + **JSON-LD** via Metadata API, no HTML de origem.
- **CMS server-side**: `app/page.tsx` e `app/layout.tsx` buscam do **Sanity** (`paginaHome` e `configuracoesGlobais`) no servidor, com **fallback** embutido (nunca quebra). Editou no Sanity → reflete aqui (ISR 30s).
- **Formulário com validação no servidor** (Server Action em `app/actions.ts`) — TODO para plugar a API interna de leads do time.
- **`next/image`** e **componentização** (fim da página monolítica).

## CMS / Sanity
- Projeto `zb2hrfwb`, dataset `production` (mesmo do preview atual), **leitura pública** — não precisa de token/env para funcionar.
- Editores continuam usando o Studio atual (`/studio` do site atual ou `rdc-wp.sanity.studio`); esta Home apenas **lê**.
- Opcional: sobrescrever via env `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.

## Rodar local
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build SSR/SSG
```

## Deploy (Vercel)
Como um projeto Vercel tem **um único framework**, este Next deve ir em um **projeto Vercel novo**
(o preview atual é Vite). Import do repositório → framework **Next.js** é detectado automaticamente →
**Deploy** (sem variáveis de ambiente, pois o Sanity é leitura pública).

## Observações
- UI primitivos (button/card/badge/input) e Header/Footer reimplementados de forma **leve** (Tailwind) para a PoC buildar sem a árvore Radix/shadcn. Em produção dá pra reusar os componentes exatos.
- Próximas páginas seguem o mesmo padrão (`app/<rota>/page.tsx` + Metadata API + fetch server-side), com redirects preservando URLs.
