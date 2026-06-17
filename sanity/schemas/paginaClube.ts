import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
export default defineType({
  name:'paginaClube', title:'Página Clube de Vantagens', type:'document',
  groups:[{name:'hero',title:'Hero',default:true},{name:'como',title:'Como funciona'},{name:'parc',title:'Parceiros'},{name:'faq',title:'FAQ'},{name:'cta',title:'CTA final'}],
  fields:[
    t('heroBadge','Selo','hero'),t('heroTitulo','Título','hero'),t('heroDestaque','Palavra destaque','hero'),t('heroSubtitulo','Subtítulo','hero',2),
    t('heroStat1','Stat 1','hero'),t('heroStat2','Stat 2','hero'),t('heroStat3','Stat 3','hero'),
    t('comoLabel','Rótulo','como'),t('comoTitulo','Título','como'),
    t('parcLabel','Rótulo','parc'),t('parcTitulo','Título','parc'),t('parcSubtitulo','Subtítulo','parc',2),
    t('faqLabel','Rótulo','faq'),t('faqTitulo','Título','faq'),t('faqSubtitulo','Subtítulo','faq',2),
    t('ctaTitulo','Título','cta'),t('ctaTexto','Texto','cta',2),t('ctaBotao1','Botão 1','cta'),t('ctaBotao1Link','Link do botão 1','cta'),t('ctaBotao2','Botão 2','cta'),t('ctaBotao2Link','Link do botão 2','cta'),
  ],
  preview:{prepare:()=>({title:'Página Clube'})},
})
