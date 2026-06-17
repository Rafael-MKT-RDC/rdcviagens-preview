import { defineType, defineField } from "sanity"
const t = (name, title, group, rows) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaParcerias", title:"Página RDC Parcerias", type:"document",
  groups:[{name:"hero",title:"Hero",default:true},{name:"value",title:"Benefícios"},{name:"perfil",title:"Perfis"},{name:"como",title:"Como funciona"},{name:"form",title:"Formulário"},{name:"faq",title:"FAQ"},{name:"cta",title:"CTA"}],
  fields:[
    t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSub1","Subtítulo 1","hero",2),t("heroSub2","Subtítulo 2","hero",2),t("heroCta","Botão","hero"),t("heroCtaLink","Link do botão","hero"),
    t("valueBadge","Selo","value"),t("valueTitulo","Título","value"),t("valueSubtitulo","Subtítulo","value",2),
    t("perfilBadge","Selo","perfil"),t("perfilTitulo","Título","perfil"),t("perfilSubtitulo","Subtítulo","perfil",2),
    t("comoBadge","Selo","como"),t("comoTitulo","Título","como"),t("comoSubtitulo","Subtítulo","como",2),
    t("formBadge","Selo","form"),t("formTitulo","Título","form"),t("formSubtitulo","Subtítulo","form",2),t("formRdId","ID do formulário RD Station","form"),
    t("faqBadge","Selo","faq"),t("faqTitulo","Título","faq"),t("faqSubtitulo","Subtítulo","faq",2),
    t("ctaTitulo","Título","cta"),t("ctaTexto","Texto","cta",2),t("ctaBotao","Botão","cta"),t("ctaBotaoLink","Link do botão","cta"),
  ], preview:{prepare:()=>({title:"Página Parcerias"})} })
