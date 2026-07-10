import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
export default defineType({ name:'paginaViajeTranquilo', title:'Página Viaje Tranquilo', type:'document',
  groups:[{name:'hero',title:'Hero',default:true},{name:'oque',title:'O que é'},{name:'benef',title:'Benefícios'},{name:'como',title:'Como contratar'},{name:'form',title:'Formulário'},{name:'faq',title:'FAQ'},{name:'cta',title:'CTA'}],
  fields:[
    t('heroBadge','Selo','hero'),t('heroTitulo','Título','hero'),t('heroDestaque','Destaque','hero'),t('heroFinal','Final do título','hero'),t('heroSubtitulo','Subtítulo','hero',2),t('heroPreco','Preço','hero'),
    t('oQueTitulo','Título','oque'),t('oQueP1','Parágrafo 1','oque',3),t('oQueP2','Parágrafo 2','oque',3),
    t('benefBadge','Selo','benef'),t('benefTitulo','Título','benef'),t('benefSubtitulo','Subtítulo','benef',2),
    t('comoTitulo','Título','como'),t('comoSubtitulo','Subtítulo','como',2),
    t('formTitulo','Título','form'),t('formSubtitulo','Subtítulo','form',2),t('formRdId','ID do formulário RD Station','form'),
    t('faqTitulo','Título','faq'),
    t('ctaTitulo','Título','cta'),t('ctaTexto','Texto','cta',2),t('ctaBotao','Botão','cta'),t('ctaBotaoLink','Link do botão','cta'),
  ], preview:{prepare:()=>({title:'Página Viaje Tranquilo'})} })
