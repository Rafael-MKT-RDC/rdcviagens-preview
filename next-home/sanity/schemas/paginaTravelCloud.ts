import { defineType, defineField } from "sanity"
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })

export default defineType({
  name: "paginaTravelCloud",
  title: "Página Travel Cloud",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "oque", title: "O que é" },
    { name: "receita", title: "Nova fonte de receita" },
    { name: "frentes", title: "Frentes de aplicação" },
    { name: "modelo", title: "Modelo operacional" },
    { name: "dif", title: "Diferenciais" },
    { name: "prime", title: "RDC Prime" },
    { name: "form", title: "Formulário" },
    { name: "faq", title: "FAQ" },
    { name: "cta", title: "CTA final" },
  ],
  fields: [
    // Hero
    t("heroBadge", "Selo", "hero"),
    t("heroTitulo", "Título", "hero"),
    t("heroDestaque", "Destaque (laranja)", "hero"),
    t("heroSub1", "Subtítulo 1", "hero", 3),
    t("heroSub2", "Subtítulo 2", "hero", 2),
    t("heroCta", "Botão", "hero"),
    // O que é
    t("oQueBadge", "Selo", "oque"),
    t("oQueTitulo", "Título", "oque"),
    t("oQueP1", "Parágrafo 1", "oque", 4),
    t("oQueP2", "Parágrafo 2", "oque", 4),
    t("oQueP3", "Parágrafo 3", "oque", 4),
    // Nova fonte de receita
    t("receitaTitulo", "Título", "receita"),
    t("receitaTexto", "Texto", "receita", 3),
    t("receitaC1T", "Card 1 — título", "receita"),
    t("receitaC1D", "Card 1 — descrição", "receita", 2),
    t("receitaC2T", "Card 2 — título", "receita"),
    t("receitaC2D", "Card 2 — descrição", "receita", 2),
    t("receitaC3T", "Card 3 — título", "receita"),
    t("receitaC3D", "Card 3 — descrição", "receita", 2),
    // Frentes de aplicação
    t("frentesBadge", "Selo", "frentes"),
    t("frentesTitulo", "Título", "frentes"),
    t("frentesSubtitulo", "Subtítulo", "frentes", 2),
    // Modelo operacional
    t("modeloBadge", "Selo", "modelo"),
    t("modeloTitulo", "Título", "modelo"),
    t("modeloSubtitulo", "Subtítulo", "modelo", 2),
    // Diferenciais
    t("difBadge", "Selo", "dif"),
    t("difTitulo", "Título", "dif"),
    t("difSubtitulo", "Subtítulo", "dif", 2),
    // RDC Prime
    t("primeBadge", "Selo", "prime"),
    t("primeTitulo", "Título", "prime"),
    t("primeSubtitulo", "Subtítulo", "prime", 3),
    t("primeComoTitulo", "Bloco 'Como funciona' — título", "prime"),
    t("primeRecebeTitulo", "Bloco 'O que recebe' — título", "prime"),
    t("primeNota", "Nota (importante)", "prime", 3),
    // Formulário
    t("formBadge", "Selo", "form"),
    t("formTitulo", "Título", "form"),
    t("formSubtitulo", "Subtítulo", "form", 2),
    t("formRdId", "ID do formulário RD Station", "form"),
    // FAQ
    t("faqBadge", "Selo", "faq"),
    t("faqTitulo", "Título", "faq"),
    // CTA final
    t("ctaTitulo", "Título", "cta"),
    t("ctaTexto", "Texto", "cta", 2),
    t("ctaBotao", "Botão", "cta"),
  ],
  preview: { prepare: () => ({ title: "Página Travel Cloud" }) },
})
