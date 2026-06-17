import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })
const num = (name: string, title: string, group: string) => defineField({ name, title, type: 'number', group })

export default defineType({
  name: 'paginaAssinaturas',
  title: 'Página Assinaturas (Planos)',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'perfil', title: 'Para quem é' },
    { name: 'antes', title: 'Antes vs Depois' },
    { name: 'como', title: 'Como funciona' },
    { name: 'recebe', title: 'O que recebe' },
    { name: 'plano', title: 'Plano (preço)' },
    { name: 'comp', title: 'Comparativo' },
    { name: 'dif', title: 'Diferenciais' },
    { name: 'depo', title: 'Depoimentos' },
    { name: 'agencia', title: 'Banner Agência' },
    { name: 'faq', title: 'FAQ' },
    { name: 'cta', title: 'CTA final' },
  ],
  fields: [
    t('heroBadge','Selo','hero'), t('heroTituloLinha1','Título (linha 1)','hero'), t('heroDestaque','Palavra destaque','hero'),
    t('heroSubtitulo','Subtítulo','hero',2), t('heroFrase','Frase emocional','hero'), t('heroCta','Botão','hero'),
    t('perfilBadge','Selo','perfil'), t('perfilTitulo','Título','perfil'), t('perfilSubtitulo','Subtítulo','perfil',2),
    t('antesBadge','Selo','antes'), t('antesTitulo','Título','antes'), t('antesSubtitulo','Subtítulo','antes',2),
    t('comoBadge','Selo','como'), t('comoTitulo','Título','como'), t('comoSubtitulo','Subtítulo','como',2),
    t('recebeBadge','Selo','recebe'), t('recebeTitulo','Título','recebe'), t('recebeSubtitulo','Subtítulo','recebe',2),
    t('planosTitulo','Título','plano'), t('planosSubtitulo','Subtítulo','plano',2),
    num('planoDias','Diárias/ano','plano'), num('planoPreco','Preço mensal (R$)','plano'), t('planoAdesao','Adesão','plano'), t('planoCta','Botão','plano'),
    t('comparativoBadge','Selo','comp'), t('comparativoTitulo','Título','comp'), t('comparativoSubtitulo','Subtítulo','comp',2),
    t('difTitulo','Título','dif'), t('difSubtitulo','Subtítulo','dif',2),
    t('depoBadge','Selo','depo'), t('depoTitulo','Título','depo'), t('depoSubtitulo','Subtítulo','depo',2),
    t('agenciaBadge','Selo','agencia'), t('agenciaTitulo','Título','agencia'), t('agenciaTexto','Texto','agencia',3), t('agenciaCta','Botão','agencia'),
    t('faqTitulo','Título','faq'), t('faqSubtitulo','Subtítulo','faq',2),
    t('ctaTitulo','Título','cta'), t('ctaTexto','Texto','cta',2), t('ctaBotao1','Botão 1','cta'), t('ctaBotao2','Botão 2','cta'),
  ],
  preview: { prepare: () => ({ title: 'Página Assinaturas' }) },
})
