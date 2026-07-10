import { defineType, defineField } from "sanity"
const t = (name: string, title: string, group: string, rows?: number) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaDocumentos", title:"Página Documentos (cabeçalho)", type:"document",
  groups:[{name:"hero",title:"Hero",default:true}],
  fields:[t("heroTitulo","Título","hero"),t("heroSubtitulo","Subtítulo","hero",2)],
  preview:{prepare:()=>({title:"Página Documentos"})} })
