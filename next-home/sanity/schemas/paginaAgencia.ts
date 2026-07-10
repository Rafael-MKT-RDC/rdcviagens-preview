import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
export default defineType({
  name: 'paginaAgencia', title: 'Página Agência', type: 'document',
  groups: [
    { name:'hero',title:'Hero',default:true},{name:'servicos',title:'Serviços'},{name:'como',title:'Como Funciona'},
    {name:'vant',title:'Vantagem Assinante'},{name:'pacotes',title:'Pacotes'},{name:'form',title:'Formulário'},
    {name:'faq',title:'FAQ'},{name:'cta',title:'CTA final'},
  ],
  fields: [
    t('heroBadge','Selo','hero'),t('heroTitulo','Título','hero'),t('heroDestaque','Palavra destaque','hero'),t('heroSubtitulo','Subtítulo','hero',2),t('heroCta','Botão','hero'),t('heroCtaLink','Link do botão','hero'),
    t('servicosBadge','Selo','servicos'),t('servicosTitulo','Título','servicos'),t('servicosSubtitulo','Subtítulo','servicos',2),
    t('comoBadge','Selo','como'),t('comoTitulo','Título','como'),t('comoSubtitulo','Subtítulo','como',2),
    t('vantTitulo','Título','vant'),t('vantDestaque','Destaque','vant'),t('vantTexto','Texto','vant',2),
    t('pacotesBadge','Selo','pacotes'),t('pacotesTitulo','Título','pacotes'),t('pacotesSubtitulo','Subtítulo','pacotes',2),
    t('formBadge','Selo','form'),t('formTitulo','Título','form'),t('formSubtitulo','Subtítulo','form',2),t('formRdId','ID do formulário RD Station','form'),
    t('faqBadge','Selo','faq'),t('faqTitulo','Título','faq'),t('faqSubtitulo','Subtítulo','faq',2),
    t('ctaTitulo','Título','cta'),t('ctaTexto','Texto','cta',2),t('ctaBotao1','Botão 1','cta'),t('ctaBotao1Link','Link do botão 1','cta'),t('ctaBotao2','Botão 2','cta'),t('ctaBotao2Link','Link do botão 2','cta'),
  ],
  preview:{prepare:()=>({title:'Página Agência'})},
})
