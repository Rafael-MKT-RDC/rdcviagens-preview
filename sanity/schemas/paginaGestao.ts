import { defineType, defineField } from "sanity"
const t = (name, title, group, rows) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaGestao", title:"Página RDC Gestão", type:"document",
  groups:[{name:"hero",title:"Hero",default:true},{name:"desafios",title:"Desafios"},{name:"como",title:"Como resolvemos"},{name:"quem",title:"Para quem"},{name:"form",title:"Formulário"},{name:"faq",title:"FAQ"},{name:"cta",title:"CTA"}],
  fields:[
    t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSub1","Subtítulo 1","hero",2),t("heroSub2","Subtítulo 2","hero",2),t("heroCta","Botão","hero"),t("heroCtaLink","Link do botão","hero"),
    t("desafiosBadge","Selo","desafios"),t("desafiosTitulo","Título","desafios"),t("desafiosSubtitulo","Subtítulo","desafios",2),
    t("comoBadge","Selo","como"),t("comoTitulo","Título","como"),t("comoSubtitulo","Subtítulo","como",2),
    t("quemBadge","Selo","quem"),t("quemTitulo","Título","quem"),t("quemSubtitulo","Subtítulo","quem",2),
    t("formBadge","Selo","form"),t("formTitulo","Título","form"),t("formSubtitulo","Subtítulo","form",2),t("formRdId","ID do formulário RD Station","form"),
    t("faqBadge","Selo","faq"),t("faqTitulo","Título","faq"),
    t("ctaTitulo","Título","cta"),t("ctaTexto","Texto","cta",2),t("ctaBotao","Botão","cta"),t("ctaBotaoLink","Link do botão","cta"),
  ], preview:{prepare:()=>({title:"Página Gestão"})} })
