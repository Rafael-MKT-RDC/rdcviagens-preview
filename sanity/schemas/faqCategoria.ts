import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqCategoria',
  title: 'FAQ – Categoria',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome da Categoria', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'order', title: 'Ordem de exibição', type: 'number' }),
    defineField({
      name: 'faqs', title: 'Perguntas e Respostas', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Pergunta', type: 'string', validation: (R: any) => R.required() },
          { name: 'answer', title: 'Resposta', type: 'text', rows: 6, validation: (R: any) => R.required() },
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
  ],
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name' } },
})
