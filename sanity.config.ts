import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'rdc-wp',
  title: 'RDC Viagens – CMS',
  projectId: 'zb2hrfwb',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem().title('Posts do Blog').schemaType('blogPost').child(S.documentTypeList('blogPost')),
            S.listItem().title('FAQ – Perguntas Frequentes').schemaType('faqCategoria').child(S.documentTypeList('faqCategoria')),
            S.listItem().title('Depoimentos').schemaType('depoimento').child(S.documentTypeList('depoimento')),
            S.listItem().title('Parceiros – Clube de Vantagens').schemaType('parceiroClube').child(S.documentTypeList('parceiroClube')),
            S.listItem().title('Destinos').schemaType('destino').child(S.documentTypeList('destino')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
