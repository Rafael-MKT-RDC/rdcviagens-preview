import { defineType, defineField } from "sanity"
const t = (name: string, title: string, group: string, rows?: number) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaContato", title:"Página Contato", type:"document",
  groups:[{name:"hero",title:"Hero",default:true},{name:"canais",title:"Canais"},{name:"duv",title:"CTA Dúvidas"}],
  fields:[
    t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSubtitulo","Subtítulo","hero",2),
    t("canaisTitulo","Título","canais"),t("canaisSubtitulo","Subtítulo","canais",2),t("horario","Horário","canais"),
    t("duvidasTitulo","Título","duv"),t("duvidasTexto","Texto","duv",2),t("duvidasBotao","Botão","duv"),t("duvidasBotaoLink","Link do botão","duv"),
  ], preview:{prepare:()=>({title:"Página Contato"})} })
