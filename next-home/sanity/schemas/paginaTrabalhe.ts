import { defineType, defineField } from "sanity"
const t = (name: string, title: string, group: string, rows?: number) => defineField(rows ? { name, title, type: "text", rows, group } : { name, title, type: "string", group })
export default defineType({ name:"paginaTrabalhe", title:"Página Trabalhe Conosco", type:"document",
  groups:[{name:"hero",title:"Hero",default:true},{name:"cultura",title:"Cultura"},{name:"benef",title:"Benefícios"},{name:"vagas",title:"Vagas"}],
  fields:[
    t("heroBadge","Selo","hero"),t("heroTitulo","Título","hero"),t("heroDestaque","Destaque","hero"),t("heroSubtitulo","Subtítulo","hero",2),
    t("culturaBadge","Selo","cultura"),t("culturaTitulo","Título","cultura"),t("culturaSubtitulo","Subtítulo","cultura",2),
    t("benefBadge","Selo","benef"),t("benefTitulo","Título","benef"),t("benefSubtitulo","Subtítulo","benef",2),
    t("vagasTitulo","Título","vagas"),t("vagasTexto","Texto","vagas",2),t("vagasBotao","Botão","vagas"),t("vagasBotaoLink","Link do botão (LinkedIn)","vagas"),
  ], preview:{prepare:()=>({title:"Página Trabalhe Conosco"})} })
