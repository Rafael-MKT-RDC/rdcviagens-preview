import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'parceiroClube',
  title: 'Parceiro – Clube de Vantagens',
  type: 'document',
  fields: [
    defineField({ name: 'nome', title: 'Nome da Marca', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({
      name: 'categoria', title: 'Categoria', type: 'string',
      options: { list: ['Moda e Esportes','Beleza e Saúde','Produtos e Serviços','Educação','Pets','Alimentação'].map(v=>({title:v,value:v})) },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'desconto', title: 'Desconto (ex: "Até 30%")', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'url', title: 'URL do parceiro', type: 'url' }),
    defineField({ name: 'ativo', title: 'Ativo?', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Nome A→Z', name: 'nomeAsc', by: [{ field: 'nome', direction: 'asc' }] }],
  preview: { select: { title: 'nome', subtitle: 'desconto', media: 'logo' } },
})
