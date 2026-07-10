import { defineType, defineField } from 'sanity'
const t = (name: string, title: string, group: string, rows?: number) =>
  defineField(rows ? { name, title, type: 'text', rows, group } : { name, title, type: 'string', group })

export default defineType({
  name: 'paginaSobre',
  title: 'Página Sobre (Nossa História)',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'quem', title: 'Quem Somos' },
    { name: 'timeline', title: 'Linha do Tempo' },
    { name: 'proposito', title: 'Propósito' },
    { name: 'mv', title: 'Missão e Visão' },
    { name: 'valores', title: 'Valores' },
  ],
  fields: [
    t('heroBadge', 'Selo', 'hero'), t('heroTitulo', 'Título', 'hero'), t('heroSubtitulo', 'Subtítulo', 'hero', 2),
    t('quemBadge', 'Selo', 'quem'), t('quemTitulo', 'Título', 'quem'),
    t('quemParagrafo1', 'Parágrafo 1', 'quem', 4), t('quemParagrafo2', 'Parágrafo 2', 'quem', 4), t('quemParagrafo3', 'Parágrafo 3', 'quem', 4),
    defineField({ name: 'quemStats', title: 'Números (4)', type: 'array', group: 'quem',
      of: [{ type: 'object', fields: [ {name:'value',title:'Número',type:'string'}, {name:'label',title:'Texto',type:'string'} ], preview:{select:{title:'value',subtitle:'label'}} }] }),
    t('timelineBadge', 'Selo', 'timeline'), t('timelineTitulo', 'Título', 'timeline'), t('timelineSubtitulo', 'Subtítulo', 'timeline', 2),
    defineField({ name: 'timeline', title: 'Fatos marcantes', type: 'array', group: 'timeline',
      of: [{ type: 'object', fields: [ {name:'year',title:'Ano',type:'string'}, {name:'title',title:'Título',type:'string'}, {name:'description',title:'Descrição',type:'text',rows:3} ], preview:{select:{title:'year',subtitle:'title'}} }] }),
    t('propositoBadge', 'Selo', 'proposito'), t('propositoTitulo', 'Título', 'proposito'), t('propositoTexto', 'Texto', 'proposito', 3),
    t('missaoTitulo', 'Título Missão', 'mv'), t('missaoTexto', 'Texto Missão', 'mv', 4),
    t('visaoTitulo', 'Título Visão', 'mv'), t('visaoTexto', 'Texto Visão', 'mv', 4),
    t('valoresBadge', 'Selo', 'valores'), t('valoresTitulo', 'Título', 'valores'),
    defineField({ name: 'valores', title: 'Valores (4)', type: 'array', group: 'valores',
      of: [{ type: 'object', fields: [ {name:'title',title:'Título',type:'string'}, {name:'description',title:'Descrição',type:'text',rows:3} ], preview:{select:{title:'title'}} }] }),
  ],
  preview: { prepare: () => ({ title: 'Página Sobre' }) },
})
