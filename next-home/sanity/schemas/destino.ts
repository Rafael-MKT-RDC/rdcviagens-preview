import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'destino',
  title: 'Destino',
  type: 'document',
  fields: [
    defineField({ name: 'nome', title: 'Nome do Destino', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'nome' }, validation: (R) => R.required() }),
    defineField({
      name: 'regiao', title: 'Região', type: 'string',
      options: { list: ['Nordeste','Sudeste','Sul','Norte','Centro-Oeste','Internacional'].map(v=>({title:v,value:v})) },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'imagem', title: 'Imagem', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'qtdOpcoes', title: 'Qtd. de opções (ex: "+90.980")', type: 'string' }),
    defineField({ name: 'destaquesLista', title: 'Destinos em destaque (lista)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'destaque', title: 'Exibir em destaque?', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'nome', subtitle: 'regiao', media: 'imagem' } },
})
