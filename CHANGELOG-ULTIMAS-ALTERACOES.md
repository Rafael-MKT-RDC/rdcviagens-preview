# Changelog — Últimas Alterações no Site RDC Viagens

**Data:** 17 de junho de 2025  
**Versão:** 4ebbda50

---

## Resumo Geral

Este documento descreve todas as alterações realizadas nas últimas sessões de desenvolvimento do site RDC Viagens.

---

## 1. Página de Assinaturas (`/assinaturas`)

### Planos
- Removidos os planos de 2, 3, 4, 5 e 6 diárias — **mantido apenas o plano de 7 diárias** (R$ 319,90/mês)
- Layout centralizado para destacar o plano único
- Removido badge "Mais popular" (desnecessário com plano único)
- Removida seção "Todos os planos incluem" (benefícios integrados ao card)
- Removida informação "com validade de 12 meses"

### Tarifa Exclusiva
- Descrição atualizada com informações relevantes: uso **ilimitado e sem carência**, até 60% abaixo do mercado, +200 mil hotéis e resorts, disponível desde o primeiro dia, o ano todo, sem consumir diárias

### CTAs (Chamadas para Ação)
- Removida seção CTA intermediária laranja ("Pronto para viajar mais e melhor?")
- CTAs reformulados com tom emocional seguindo manual da marca:
  - "Quero começar minha jornada"
  - "Transformar minhas viagens"
  - "Sua próxima jornada começa aqui"
  - "Iniciar minha jornada" (botão flutuante)

### FAQ
- Adicionada pergunta sobre **carência**: após a assinatura o assinante já pode reservar, porém após 40 dias após o pagamento
- Adicionada pergunta sobre **Tarifa Exclusiva**: ilimitada, sem carência, +200 mil hotéis, até 60% OFF, sem consumir diárias

### Valor removido
- Removida referência ao valor "R$ 97,20/mês" do passo "Escolha seu plano"

---

## 2. CTAs e Logos na Home e Páginas Corporativas

### Home — Cards Corporativos
- CTA Premiação: cor dourada (#FFEA01)
- CTA Gestão: cor coral (#E8506A)
- CTA Parcerias: cor lilás (#9B6AE0)
- Botão "Explorar todas as soluções": trocado de azul para laranja (#FF9100)

### Páginas Internas (Premiação, Gestão, Parcerias)
- Logos oficiais adicionados nos hero sections de cada página interna
- Badges renomeados para evitar redundância com os logos

### Página "Conheça nossas Soluções" (`/solucoes-corporativas`)
- Logos oficiais substituíram ícones genéricos nos cards de cada solução

---

## 3. Nova Página: RDC Travel Cloud (`/solucoes-corporativas/travel-cloud`)

### Sobre o produto
Plataforma white label que permite que empresas, fintechs, plataformas de benefícios e apps corporativos ofereçam viagens dentro de seus próprios ambientes digitais, com toda a operação turística feita pela RDC nos bastidores.

### Seções criadas
- **Hero** com badge, headline e CTA
- **Números** (+200 mil hotéis, +35 anos, 100% white label, B2B + B2B2C)
- **Casos de Uso** (Benefícios/RH, Fintechs/Cartões, Gestão de Despesas, Programas de Fidelidade)
- **Como Funciona** (Distribuição → Conversão → Operação)
- **Diferenciais** (6 cards: infraestrutura pronta, white label, monetização, go-to-market, operação especializada, responsabilidades claras)
- **RDC Prime** (camada B2B2C com benefícios para usuário final)
- **Formulário de contato**
- **FAQ** (6 perguntas)

### Ajustes posteriores
- Removida referência "(V1 com hotéis)"
- Negritados pontos importantes em todas as seções (useCases, howItWorks, differentials, FAQs)
- Cor temática: azul sky (#00B4D8)

### Integração
- Rota adicionada no App.tsx
- Link adicionado no Header (menu Soluções Corporativas)
- Link adicionado no Footer
- Card adicionado na página "Conheça nossas Soluções"

---

## 4. Correção Visual — Página Agência (`/agencia`)

- Corrigido wave divider quebrado entre hero e seção de diferenciais
- SVG reposicionado com `position: absolute` no bottom da section hero
- Padding-bottom ajustado para acomodar a curva sem gap visual

---

## 5. Revisão Completa de SEO (Todas as 19 páginas)

### Meta Titles
- Padronizados com "| RDC Viagens" no final (adicionado automaticamente pelo componente SEO)
- Todos entre 35-60 caracteres (sem duplicação de marca)
- Termos em inglês removidos ("Travel Management" → "Gestão Corporativa", "White Label" removido, "OFF" removido, "VIP" removido)

### Meta Descriptions
- Todas revisadas para ficar entre 150-160 caracteres
- Incluem chamadas para ação atrativas no final ("Conheça!", "Assine agora!", "Solicite sua cotação!", etc.)

### Schema.org (JSON-LD)
- TravelAgency (Home)
- Product (Assinaturas)
- Service (páginas corporativas)
- FAQPage (Dúvidas, Assinaturas)
- AboutPage (Sobre)
- ContactPage (Contato)

### Outros
- Open Graph e Twitter Cards em todas as páginas
- robots.txt com permissão para AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- sitemap.xml completo com todas as páginas
- Alt text em 100% das imagens
- Hierarquia H1 correta (1 por página)
- URLs canônicas configuradas
- react-helmet-async instalado para gerenciar meta tags por página

---

## 6. Tecnologias e Dependências

| Tecnologia | Versão |
|-----------|--------|
| React | 19 |
| Tailwind CSS | 4 |
| Vite | latest |
| react-helmet-async | latest |
| shadcn/ui | latest |
| Wouter (routing) | latest |
| Lucide React (ícones) | latest |

---

## 7. Estrutura de Páginas do Site

| Rota | Página |
|------|--------|
| `/` | Home |
| `/sobre` | Sobre a RDC |
| `/assinaturas` | Planos de Assinatura |
| `/agencia` | Agência de Viagens |
| `/destinos` | Destinos |
| `/viaje-tranquilo` | Viaje Tranquilo |
| `/solucoes-corporativas` | Soluções Corporativas |
| `/solucoes-corporativas/premiacao` | RDC Premiação |
| `/solucoes-corporativas/gestao` | RDC Gestão de Viagens |
| `/solucoes-corporativas/parcerias` | RDC Parcerias |
| `/solucoes-corporativas/travel-cloud` | RDC Travel Cloud |
| `/blog` | Blog |
| `/duvidas` | Dúvidas Frequentes |
| `/contato` | Contato |
| `/trabalhe-conosco` | Trabalhe Conosco |
| `/programa-indicacao` | Programa de Indicação |
| `/documentos` | Documentos Legais |
| `/newsletter` | Newsletter |

---

## Observações

- O site está publicado em: https://rdcviagem-b2dbk5lc.manus.space
- Todas as alterações foram testadas sem erros TypeScript
- O projeto é uma SPA (Single Page Application) React com roteamento client-side
