import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Post do Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'excerpt', title: 'Resumo', type: 'text', rows: 3, validation: (R) => R.required().max(200) }),
    defineField({
      name: 'category', title: 'Categoria', type: 'string',
      options: { list: ['Destinos','Roteiros','Dicas','Aventura','Natureza','Família','Internacional','Cruzeiros'].map(v=>({title:v,value:v})) },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'publishedAt', title: 'Data de Publicação', type: 'date', options: { dateFormat: 'DD MMM YYYY' }, validation: (R) => R.required() }),
    defineField({ name: 'image', title: 'Imagem de Capa', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({
      name: 'body', title: 'Conteúdo', type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Texto alternativo' }] }],
    }),
    defineField({ name: 'metaDescription', title: 'Meta Description (SEO)', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Mais recente', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
})
