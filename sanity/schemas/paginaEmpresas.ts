import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
export default defineType({ name:'paginaEmpresas', title:'Página Soluções Corporativas', type:'document',
  groups:[{name:'hero',title:'Hero',default:true},{name:'sol',title:'Soluções'},{name:'dif',title:'Diferenciais'},{name:'cta',title:'CTA'}],
  fields:[
    t('heroBadge','Selo','hero'),t('heroTitulo','Título','hero'),t('heroDestaque','Destaque','hero'),t('heroSubtitulo','Subtítulo','hero',2),t('heroCta','Botão','hero'),
    t('solTitulo','Título','sol'),t('solSubtitulo','Subtítulo','sol',2),
    t('difTitulo','Título','dif'),t('difSubtitulo','Subtítulo','dif',2),
    t('ctaTitulo','Título','cta'),t('ctaTexto','Texto','cta',2),t('ctaBotao','Botão','cta'),
  ], preview:{prepare:()=>({title:'Página Empresas'})} })
