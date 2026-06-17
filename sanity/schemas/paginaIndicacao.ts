import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
export default defineType({
  name:'paginaIndicacao', title:'Página Programa de Indicação', type:'document',
  groups:[{name:'hero',title:'Hero',default:true},{name:'como',title:'Como funciona'},{name:'form',title:'Formulário'},{name:'recomp',title:'Recompensas'},{name:'faq',title:'FAQ'},{name:'cta',title:'CTA final'}],
  fields:[
    t('heroBadge','Selo','hero'),t('heroTitulo','Título','hero'),t('heroDestaque','Palavra destaque','hero'),t('heroSubtitulo','Subtítulo','hero',2),t('heroCta','Botão','hero'),t('heroCtaLink','Link do botão','hero'),
    t('comoBadge','Selo','como'),t('comoTitulo','Título','como'),t('comoSubtitulo','Subtítulo','como',2),
    t('formBadge','Selo','form'),t('formTitulo','Título','form'),t('formSubtitulo','Subtítulo','form',2),t('formRdId','ID do formulário RD Station','form'),
    t('recompBadge','Selo','recomp'),t('recompTitulo','Título','recomp'),t('recompSubtitulo','Subtítulo','recomp',2),
    t('faqTitulo','Título','faq'),t('faqSubtitulo','Subtítulo','faq',2),
    t('ctaTitulo','Título','cta'),t('ctaTexto','Texto','cta',2),t('ctaBotao','Botão','cta'),t('ctaBotaoLink','Link do botão','cta'),
  ],
  preview:{prepare:()=>({title:'Página Indicação'})},
})
