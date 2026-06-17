import { defineType, defineField } from "sanity"
const t = (name, title, group, rows) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaSejaParceiro", title:"Página Seja Parceiro", type:"document",
  groups:[{name:"hero",title:"Hero",default:true},{name:"benef",title:"Benefícios"},{name:"como",title:"Como funciona"},{name:"form",title:"Formulário"}],
  fields:[
    t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSubtitulo","Subtítulo","hero",2),
    t("benefTitulo","Título","benef"),t("benefSubtitulo","Subtítulo","benef",2),
    t("comoTitulo","Título","como"),t("comoSubtitulo","Subtítulo","como",2),
    t("formTitulo","Título","form"),t("formSubtitulo","Subtítulo","form",2),t("formRdId","ID do formulário RD Station","form"),
  ], preview:{prepare:()=>({title:"Página Seja Parceiro"})} })
