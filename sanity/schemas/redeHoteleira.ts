import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redeHoteleira',
  title: 'Rede Hoteleira',
  type: 'document',
  fields: [
    defineField({ name: 'nome', title: 'Nome da Rede', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'descricao', title: 'Marcas / Descrição (ex: "Ibis, Novotel, Mercure")', type: 'string' }),
    defineField({ name: 'ordem', title: 'Ordem (opcional)', type: 'number' }),
    defineField({ name: 'ativo', title: 'Ativo?', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Ordem', name: 'ordemAsc', by: [{ field: 'ordem', direction: 'asc' }, { field: 'nome', direction: 'asc' }] }],
  preview: { select: { title: 'nome', subtitle: 'descricao', media: 'logo' } },
})
