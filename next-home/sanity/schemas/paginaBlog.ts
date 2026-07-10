import { defineType, defineField } from "sanity"
const t = (name: string, title: string, group: string, rows?: number) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaBlog", title:"Página Blog (cabeçalho)", type:"document",
  groups:[{name:"hero",title:"Hero",default:true}],
  fields:[t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSubtitulo","Subtítulo","hero",2)],
  preview:{prepare:()=>({title:"Página Blog"})} })
