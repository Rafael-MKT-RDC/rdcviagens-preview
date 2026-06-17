import { useEffect, useState } from 'react'
import { getPageDoc } from '@/lib/contentService'

const cache: Record<string, any> = {}
const inflight: Record<string, Promise<any> | undefined> = {}

/** Lê um documento singleton de página do CMS (uma vez por tipo, com cache). */
export function usePageDoc<T = any>(type: string): T {
  const [data, setData] = useState<T>((cache[type] ?? {}) as T)
  useEffect(() => {
    if (cache[type]) return
    if (!inflight[type]) inflight[type] = getPageDoc(type)
    let active = true
    inflight[type]!.then((d) => { if (d) cache[type] = d; if (active && d) setData(d) })
    return () => { active = false }
  }, [type])
  return data
}
