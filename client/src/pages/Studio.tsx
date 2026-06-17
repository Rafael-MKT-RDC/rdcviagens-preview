import { Studio, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from '../../../sanity/schemas'

/**
 * Estúdio Sanity embutido no próprio site (rota /studio).
 * Assim o Vercel publica site + painel de edição num único deploy,
 * sem precisar rodar comandos no terminal.
 */
const config = defineConfig({
  name: 'rdc-wp-embed',
  title: 'RDC Viagens – CMS',
  projectId: 'zb2hrfwb',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Configurações Globais')
              .id('configuracoesGlobais')
              .child(
                S.document()
                  .schemaType('configuracoesGlobais')
                  .documentId('configuracoesGlobais')
                  .title('Configurações Globais'),
              ),
            S.divider(),
            S.listItem().title('Posts do Blog').schemaType('blogPost').child(S.documentTypeList('blogPost')),
            S.listItem().title('FAQ – Perguntas Frequentes').schemaType('faqCategoria').child(S.documentTypeList('faqCategoria')),
            S.listItem().title('Depoimentos').schemaType('depoimento').child(S.documentTypeList('depoimento')),
            S.listItem().title('Parceiros – Clube de Vantagens').schemaType('parceiroClube').child(S.documentTypeList('parceiroClube')),
            S.listItem().title('Destinos').schemaType('destino').child(S.documentTypeList('destino')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})

export default function StudioPage() {
  return <Studio config={config} />
}
