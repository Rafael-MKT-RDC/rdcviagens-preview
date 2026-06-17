import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'configuracoesGlobais',
  title: 'Configurações Globais',
  type: 'document',
  groups: [
    { name: 'topo', title: 'Barra de telefone (topo)', default: true },
    { name: 'rodape', title: 'Rodapé' },
    { name: 'social', title: 'Redes sociais' },
  ],
  fields: [
    defineField({ name: 'telefone', title: 'Telefone (Televendas)', type: 'string', group: 'topo' }),
    defineField({ name: 'diasAtendimento', title: 'Dias de atendimento', type: 'string', group: 'topo' }),
    defineField({ name: 'horario', title: 'Horário', type: 'string', group: 'topo' }),
    defineField({ name: 'tipoLigacao', title: 'Tipo de ligação', type: 'string', group: 'topo' }),
    defineField({ name: 'textoInstitucional', title: 'Texto institucional', type: 'text', rows: 3, group: 'rodape' }),
    defineField({ name: 'email', title: 'E-mail de contato', type: 'string', group: 'rodape' }),
    defineField({ name: 'horarioRodape', title: 'Horário (rodapé)', type: 'string', group: 'rodape' }),
    defineField({ name: 'endereco', title: 'Endereço', type: 'text', rows: 2, group: 'rodape' }),
    defineField({
      name: 'copyright',
      title: 'Texto de copyright',
      type: 'string',
      group: 'rodape',
      description: 'Use {ano} para inserir o ano atual automaticamente.',
    }),
    defineField({
      name: 'redesSociais',
      title: 'Redes sociais',
      type: 'object',
      group: 'social',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok', type: 'url' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Configurações Globais' }) },
})
