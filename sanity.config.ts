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
            S.listItem()
              .title('Configurações Globais')
              .id('configuracoesGlobais')
              .child(
                S.document()
                  .schemaType('configuracoesGlobais')
                  .documentId('configuracoesGlobais')
                  .title('Configurações Globais'),
              ),
            S.listItem()
              .title('Página Home')
              .id('paginaHome')
              .child(
                S.document()
                  .schemaType('paginaHome')
                  .documentId('paginaHome')
                  .title('Página Home'),
              ),
            S.listItem()
              .title('Página Sobre')
              .id('paginaSobre')
              .child(
                S.document()
                  .schemaType('paginaSobre')
                  .documentId('paginaSobre')
                  .title('Página Sobre'),
              ),
            S.listItem()
              .title('Página Assinaturas')
              .id('paginaAssinaturas')
              .child(
                S.document()
                  .schemaType('paginaAssinaturas')
                  .documentId('paginaAssinaturas')
                  .title('Página Assinaturas'),
              ),
            S.listItem()
              .title('Página Agência')
              .id('paginaAgencia')
              .child(
                S.document()
                  .schemaType('paginaAgencia')
                  .documentId('paginaAgencia')
                  .title('Página Agência'),
              ),
            S.listItem()
              .title('Página Indicação')
              .id('paginaIndicacao')
              .child(
                S.document()
                  .schemaType('paginaIndicacao')
                  .documentId('paginaIndicacao')
                  .title('Página Indicação'),
              ),
            S.listItem()
              .title('Página Clube')
              .id('paginaClube')
              .child(
                S.document()
                  .schemaType('paginaClube')
                  .documentId('paginaClube')
                  .title('Página Clube'),
              ),
            S.listItem()
              .title('Página Destinos')
              .id('paginaDestinos')
              .child(
                S.document()
                  .schemaType('paginaDestinos')
                  .documentId('paginaDestinos')
                  .title('Página Destinos'),
              ),
            S.divider(),
            S.listItem()
              .title('Página Viaje Tranquilo')
              .id('paginaViajeTranquilo')
              .child(
                S.document()
                  .schemaType('paginaViajeTranquilo')
                  .documentId('paginaViajeTranquilo')
                  .title('Página Viaje Tranquilo'),
              ),
            S.divider(),
            S.listItem()
              .title('Página Empresas')
              .id('paginaEmpresas')
              .child(
                S.document()
                  .schemaType('paginaEmpresas')
                  .documentId('paginaEmpresas')
                  .title('Página Empresas'),
              ),
            S.divider(),
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
