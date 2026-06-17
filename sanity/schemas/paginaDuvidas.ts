import { defineType, defineField } from "sanity"
const t = (name, title, group, rows) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaDuvidas", title:"Página Dúvidas (cabeçalho)", type:"document",
  groups:[{name:"hero",title:"Hero",default:true}],
  fields:[t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero")],
  preview:{prepare:()=>({title:"Página Dúvidas"})} })
