import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'depoimento',
  title: 'Depoimento',
  type: 'document',
  fields: [
    defineField({ name: 'nome', title: 'Nome do Cliente', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'cargo', title: 'Cidade / Estado', type: 'string' }),
    defineField({ name: 'texto', title: 'Depoimento', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({ name: 'estrelas', title: 'Avaliação (1–5)', type: 'number', validation: (R) => R.required().min(1).max(5) }),
    defineField({ name: 'foto', title: 'Foto (opcional)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'destaque', title: 'Exibir em destaque?', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'nome', subtitle: 'texto' } },
})
