import { defineType, defineField } from "sanity"
const t = (name, title, group, rows) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaTravelCloud", title:"Página Travel Cloud", type:"document",
  groups:[{name:"hero",title:"Hero",default:true},{name:"cta",title:"CTA final"},{name:"form",title:"Formulário"}],
  fields:[
    t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Palavra destaque","hero"),t("heroCta","Botão","hero"),t("heroCtaLink","Link do botão","hero"),
    t("ctaTitulo","Título","cta"),t("ctaTexto","Texto","cta",2),t("ctaBotao","Botão","cta"),t("ctaBotaoLink","Link do botão","cta"),
    t("formRdId","ID do formulário RD Station","form"),
  ], preview:{prepare:()=>({title:"Página Travel Cloud"})} })
