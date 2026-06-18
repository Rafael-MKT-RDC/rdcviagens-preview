# Integração WordPress (Headless CMS) — Site RDC Viagens

**Para:** time de desenvolvimento (Guilherme / Lucas) + Marketing
**Objetivo:** usar o **WordPress apenas como CMS** (fonte de conteúdo) do site React/Vite, no repositório oficial — sem reescrever o site.
**Data:** junho/2026

---

## Status atual (o que falta para ligar o WordPress)

| Item | Status | Responsável |
|---|---|---|
| Frontend adaptado (`wpClient.ts` + seleção por `VITE_CMS` + `/studio` desativado no WP) | ✅ **Feito** (no repo, validado no preview) | Claude/Marketing |
| Montar o WordPress (plugins, tipos de conteúdo/campos, API REST `rdc/v1`) | ⬜ **Pendente** | **Time dev** |
| Definir no deploy do oficial: `VITE_CMS=wordpress` + `VITE_WP_API_URL=https://SEU-WP/wp-json` | ⬜ **Pendente** | **Time dev** |

> Enquanto os dois itens pendentes não forem feitos, o site oficial roda com o **conteúdo
> de fallback** embutido (o mesmo de hoje) — nada quebra.

---

## 1. Visão geral

O site hoje é **React + Vite** (frontend) com **Sanity** como CMS headless. O conteúdo
editável passa por **um único arquivo**: `client/src/lib/contentService.ts`. Os
componentes React não sabem de onde vem o conteúdo — eles só consomem funções como
`getHomePage()`, `getParceirosClube()`, `getSiteSettings()`, etc.

Trocar o CMS = trocar **só a implementação desse arquivo**. Nada do design, das páginas,
do prerender de SEO ou da estrutura muda.

```
ANTES:  React  ──>  contentService  ──>  Sanity (API)
DEPOIS: React  ──>  contentService  ──>  WordPress (REST API)
```

### O que NÃO muda
- Todo o design, páginas e componentes React.
- O prerender SEO/GEO (gera HTML por rota no build) — é independente do CMS.
- `robots.txt`, `sitemap.xml`, `llms.txt`, structured data.
- Os formulários RD Station.

### O que muda (somente no repositório oficial)
- A fonte do conteúdo: WordPress em vez de Sanity.
- O painel de edição: passa a ser o **wp-admin** (a rota `/studio`, que é o Studio do
  Sanity, deixa de ser usada no oficial).

---

## 2. Estratégia dos dois repositórios (recomendada)

Em vez de manter dois sites diferentes, o mesmo código roda nos dois — o que muda é
**uma variável de ambiente** que escolhe o CMS:

| Repositório | `VITE_CMS` | CMS usado | Edição de conteúdo |
|---|---|---|---|
| **preview** (`rdcviagens-preview`) | `sanity` | Sanity | `/studio` (atual) |
| **oficial** (`rdcviagens-site`) | `wordpress` | WordPress | wp-admin |

Vantagens: o código fica praticamente idêntico (fácil de manter e sincronizar), e o
build pode ser validado no preview. O frontend já tem **fallback** com o conteúdo atual
embutido — então, mesmo antes do WordPress ficar pronto, o site oficial continua
renderizando normalmente.

> Alternativa (se preferirem): divergir de verdade os repositórios. Não recomendado —
> dobra o esforço de manutenção sem ganho real.

---

## 3. Setup do WordPress (responsabilidade do time dev)

### 3.1. Plugins
- **Advanced Custom Fields (ACF)** — para criar os campos de cada página/coleção.
- (Opcional) **Custom Post Type UI** — para criar os tipos de conteúdo via interface.

### 3.2. Tipos de conteúdo

**Singletons (uma entrada cada)** — páginas e configurações globais:
`configuracoesGlobais`, `paginaHome`, `paginaSobre`, `paginaAssinaturas`,
`paginaAgencia`, `paginaIndicacao`, `paginaClube`, `paginaDestinos`,
`paginaViajeTranquilo`, `paginaEmpresas`, `paginaTravelCloud`, `paginaPremiacao`,
`paginaGestao`, `paginaParcerias`, `paginaBlog`, `paginaDuvidas`, `paginaContato`,
`paginaDocumentos`, `paginaTrabalhe`, `paginaSejaParceiro`.

→ Sugestão: um CPT `rdc_page` (ou ACF Options Pages), uma entrada por singleton, com
**slug = o nome acima**. Os campos ACF de cada página espelham os campos já definidos em
`sanity/schemas/paginaX.ts` (use esses arquivos como lista de campos).

**Coleções (várias entradas)** — cada uma vira um CPT:
`blogPost`, `faqCategoria`, `depoimento`, `parceiroClube`, `redeHoteleira`, `destino`.

### 3.3. API REST que o frontend espera

O frontend consome uma API REST custom no namespace **`rdc/v1`**. O endpoint devolve o
JSON **já no formato que o site espera** (mapeado a partir do ACF no servidor). Assim o
frontend não precisa conhecer a estrutura interna do ACF.

```
GET  {WP}/wp-json/rdc/v1/page/{slug}          → objeto da página (campos ACF)
GET  {WP}/wp-json/rdc/v1/collection/{tipo}    → array de itens
```

Exemplos:
```
GET /wp-json/rdc/v1/page/paginaHome
GET /wp-json/rdc/v1/page/configuracoesGlobais
GET /wp-json/rdc/v1/collection/parceiroClube
GET /wp-json/rdc/v1/collection/redeHoteleira
GET /wp-json/rdc/v1/collection/blogPost
```

> **CORS:** a API precisa permitir o domínio do site (header
> `Access-Control-Allow-Origin`). É leitura pública (sem dados sensíveis), apenas GET.

---

## 4. Contrato de dados (o JSON que cada endpoint deve devolver)

Estes são os formatos **exatos** que o frontend consome (das interfaces TypeScript em
`contentService.ts`). O endpoint do WordPress deve devolver **essas chaves**.

### Coleções

**`parceiroClube`** — `GET /collection/parceiroClube`
```json
[
  { "id": "1", "nome": "Nike", "logo": "https://.../nike.png",
    "categoria": "Moda e Esportes", "desconto": "Até 30%", "url": "https://nike.com.br" }
]
```
(somente `ativo == true`, ordenado por `nome`; categorias: *Moda e Esportes, Beleza e
Saúde, Produtos e Serviços, Educação, Pets, Alimentação*)

**`redeHoteleira`** — `GET /collection/redeHoteleira`
```json
[ { "id": "1", "nome": "Accor", "logo": "https://.../accor.png", "descricao": "..." } ]
```
(somente `ativo == true`, ordenado por `ordem`)

**`blogPost`** — `GET /collection/blogPost`
```json
[ { "id": "1", "title": "...", "excerpt": "...", "image": "https://...",
    "category": "Destinos", "date": "15 Jan 2026" } ]
```

**`depoimento`** — `GET /collection/depoimento`
```json
[ { "id": "1", "nome": "...", "cargo": "...", "texto": "...",
    "estrelas": 5, "foto": "https://...", "destaque": true } ]
```

**`faqCategoria`** — `GET /collection/faqCategoria`
```json
[ { "name": "Sobre a assinatura",
    "faqs": [ { "question": "...", "answer": "..." } ] } ]
```

**`destino`** — `GET /collection/destino`
```json
[ { "id": "1", "nome": "Nordeste", "slug": "nordeste", "regiao": "Brasil",
    "imagem": "https://...", "qtdOpcoes": 120,
    "destaquesLista": ["Praias", "Resorts"], "destaque": true } ]
```

### Configurações globais — `GET /page/configuracoesGlobais`
```json
{
  "telefone": "0800-055-2600", "diasAtendimento": "Seg a Sex",
  "horario": "9h às 19h", "tipoLigacao": "Ligação gratuita",
  "textoInstitucional": "...", "email": "contato@rdcviagens.com.br",
  "horarioRodape": "Seg a Sex, 9h às 19h · Ligação gratuita",
  "endereco": "Rua Manoel Coelho, 600, ...", "copyright": "© {ano} RDC Viagens...",
  "social": { "facebook": "...", "instagram": "...", "linkedin": "...",
              "youtube": "...", "tiktok": "..." }
}
```
> Atenção: no ACF o grupo de redes sociais chama-se `redesSociais`; o endpoint deve
> devolvê-lo como `social` (ver exemplo de PHP na seção 5).

### Página Home — `GET /page/paginaHome`
Objeto com os campos do hero (array), stats, blocos "sobre", "porquê", "redes",
"destinos", "assinaturas", "agência", "corporativo" e "newsletter". A lista completa de
campos está na interface `HomeContent` em `contentService.ts` e no schema
`sanity/schemas/paginaHome.ts`. Exemplo parcial:
```json
{
  "hero": [ { "badge": "...", "title": "...", "highlight": "...",
              "subtitle": "...", "cta": "...", "link": "/assinaturas",
              "image": "https://..." } ],
  "stats": [ { "value": "+35", "label": "anos" } ],
  "sobreTitulo": "...", "features": [ { "title": "...", "description": "..." } ]
}
```

### Demais páginas — `GET /page/{slug}`
Cada página devolve os campos definidos no schema Sanity correspondente
(`sanity/schemas/paginaSobre.ts`, `paginaAssinaturas.ts`, etc.). Campos comuns adicionados
recentemente e que **devem existir** no WP:
- `heroCtaLink` e `ctaBotaoLink` — links dos botões (CTAs).
- `formRdId` — ID do formulário RD Station da página.

> Campos ausentes podem voltar vazios — o frontend tem defaults e não quebra.

---

## 5. Exemplo de mu-plugin (PHP) para a API REST

Arquivo sugerido: `wp-content/mu-plugins/rdc-headless-api.php`. Esqueleto pronto para o
time dev adaptar (lê os campos ACF e devolve no formato acima):

```php
<?php
/* Plugin Name: RDC Headless API */

add_action('rest_api_init', function () {
  register_rest_route('rdc/v1', '/page/(?P<slug>[a-zA-Z0-9_-]+)', [
    'methods'  => 'GET',
    'permission_callback' => '__return_true',
    'callback' => function ($req) {
      $slug = sanitize_title($req['slug']);
      $posts = get_posts(['name' => $slug, 'post_type' => 'rdc_page', 'numberposts' => 1]);
      if (empty($posts)) return new WP_REST_Response(null, 200);
      $fields = get_fields($posts[0]->ID) ?: [];
      // configuracoesGlobais: renomear "redesSociais" -> "social"
      if ($slug === 'configuracoesGlobais' && isset($fields['redesSociais'])) {
        $fields['social'] = $fields['redesSociais'];
        unset($fields['redesSociais']);
      }
      return new WP_REST_Response($fields, 200);
    },
  ]);

  register_rest_route('rdc/v1', '/collection/(?P<type>[a-zA-Z0-9_]+)', [
    'methods'  => 'GET',
    'permission_callback' => '__return_true',
    'callback' => function ($req) {
      $type  = sanitize_key($req['type']); // ex.: parceiroClube
      $posts = get_posts(['post_type' => $type, 'numberposts' => -1, 'orderby' => 'title', 'order' => 'ASC']);
      $out = [];
      foreach ($posts as $p) {
        $f = get_fields($p->ID) ?: [];
        $f['id'] = (string) $p->ID;
        // (filtrar ativo==true, mapear imagem->url etc. conforme o tipo)
        $out[] = $f;
      }
      return new WP_REST_Response($out, 200);
    },
  ]);
});

// CORS para o domínio do site
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    header('Access-Control-Allow-Origin: https://rdcviagens.com.br');
    header('Access-Control-Allow-Methods: GET');
    return $value;
  });
});
```

> Imagens no ACF: configurar o campo de imagem como "Return Format: Image URL" para já
> vir a URL pronta (ou mapear `$f['logo']['url']` no PHP).

---

## 6. Mudanças no frontend — ✅ JÁ IMPLEMENTADAS (no repo)

Já estão commitadas e validadas no preview (mantendo interfaces e fallbacks):
1. `client/src/lib/wpClient.ts` — busca no `VITE_WP_API_URL` (API `rdc/v1`).
2. `client/src/lib/contentService.ts` — escolhe o backend por `VITE_CMS` (`sanity` | `wordpress`).
3. `client/src/App.tsx` — `/studio` (Sanity) é desativado quando `VITE_CMS=wordpress`.

Para o oficial passar a usar o WordPress, basta o time dev **definir no deploy**:
```
VITE_CMS=wordpress
VITE_WP_API_URL=https://SEU-WORDPRESS/wp-json
```
Enquanto o WordPress não estiver no ar (ou as variáveis não estiverem setadas), o site usa
o conteúdo de fallback (o mesmo de hoje) — sem quebrar.

---

## 7. Divisão de responsabilidades

| Tarefa | Responsável | Status |
|---|---|---|
| Adaptar o frontend (wpClient + env flag) | Claude/Marketing | ✅ Feito |
| Validar build e SEO no preview | Claude | ✅ Feito |
| Instalar WordPress + ACF, criar CPTs e campos | **Time dev** | ⬜ Pendente |
| Implementar a API REST `rdc/v1` (mu-plugin) | **Time dev** | ⬜ Pendente |
| Configurar `VITE_CMS` / `VITE_WP_API_URL` no deploy | **Time dev** | ⬜ Pendente |
| Migrar/inserir o conteúdo no WordPress | Marketing + dev | ⬜ Pendente |

---

## 8. Pontos de atenção

- **Segurança:** a API REST é só leitura (GET público). Nenhum token/credencial vai pro
  frontend.
- **CORS:** liberar o domínio do site.
- **Cache:** considerar cache nos endpoints (o conteúdo muda pouco).
- **Imagens:** usar URLs absolutas (ACF "Image URL").
- **Prerender de SEO:** continua funcionando igual — ele lê a lista de rotas, não o CMS.
