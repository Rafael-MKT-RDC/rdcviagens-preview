import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
export default defineType({ name:'paginaDestinos', title:'Página Nossos Destinos', type:'document',
  groups:[{name:'hero',title:'Hero',default:true},{name:'nac',title:'Nacional'},{name:'int',title:'Internacional'},{name:'redes',title:'Redes'},{name:'dif',title:'Diferenciais'},{name:'cta',title:'CTA'}],
  fields:[
    t('heroBadge','Selo','hero'),t('heroTitulo','Título','hero'),t('heroDestaque','Destaque','hero'),t('heroSubtitulo','Subtítulo','hero',2),
    t('nacLabel','Rótulo','nac'),t('nacTitulo','Título','nac'),t('nacSubtitulo','Subtítulo','nac',2),
    t('intLabel','Rótulo','int'),t('intTitulo','Título','int'),t('intSubtitulo','Subtítulo','int',2),
    t('redesLabel','Rótulo','redes'),t('redesTitulo','Título','redes'),t('redesSubtitulo','Subtítulo','redes',2),
    t('difLabel','Rótulo','dif'),t('difTitulo','Título','dif'),
    t('ctaTitulo','Título','cta'),t('ctaTexto','Texto','cta',2),t('ctaBotao1','Botão 1','cta'),t('ctaBotao1Link','Link do botão 1','cta'),t('ctaBotao2','Botão 2','cta'),t('ctaBotao2Link','Link do botão 2','cta'),
  ], preview:{prepare:()=>({title:'Página Destinos'})} })
