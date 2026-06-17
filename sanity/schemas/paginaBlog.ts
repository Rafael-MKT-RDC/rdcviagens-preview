import { defineType, defineField } from "sanity"
const t = (name, title, group, rows) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaBlog", title:"Página Blog (cabeçalho)", type:"document",
  groups:[{name:"hero",title:"Hero",default:true}],
  fields:[t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSubtitulo","Subtítulo","hero",2)],
  preview:{prepare:()=>({title:"Página Blog"})} })
