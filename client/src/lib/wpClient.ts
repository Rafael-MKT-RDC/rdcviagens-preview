/**
 * wpClient.ts
 * Cliente do WordPress headless (usado quando VITE_CMS=wordpress).
 *
 * Consome a API REST custom `rdc/v1` do WordPress, que devolve o JSON já no
 * formato esperado pelo site (mesmas chaves das interfaces de contentService).
 * Ver especificação: Integracao-WordPress-Headless-RDC.md
 *
 * Variáveis de ambiente:
 *   VITE_CMS=wordpress
 *   VITE_WP_API_URL=https://SEU-WORDPRESS/wp-json
 *
 * Qualquer falha (sem URL, rede, status != 2xx) retorna null — o contentService
 * cai no conteúdo de fallback embutido, então a página nunca quebra.
 */

const WP_BASE = import.meta.env.VITE_WP_API_URL as string | undefined

async function wpFetch<T>(path: string): Promise<T | null> {
  if (!WP_BASE) {
    console.warn('[wpClient] VITE_WP_API_URL não definida — usando fallback.')
    return null
  }
  try {
    const url = `${WP_BASE.replace(/\/+$/, '')}/rdc/v1${path}`
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) {
      console.warn(`[wpClient] ${path} retornou ${res.status} — usando fallback.`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.warn('[wpClient] fetch falhou, usando fallback:', err)
    return null
  }
}

/** Busca um documento singleton de página (ex.: "paginaHome", "configuracoesGlobais"). */
export function wpPage<T>(slug: string): Promise<T | null> {
  return wpFetch<T>(`/page/${slug}`)
}

/** Busca uma coleção (ex.: "parceiroClube", "redeHoteleira", "blogPost"). */
export function wpCollection<T>(type: string): Promise<T[] | null> {
  return wpFetch<T[]>(`/collection/${type}`)
}
