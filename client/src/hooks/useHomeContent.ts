import { useEffect, useState } from 'react'
import { getHomePage, type HomeContent } from '@/lib/contentService'

let cache: HomeContent | null = null
let inflight: Promise<HomeContent | null> | null = null

/** Lê o conteúdo da Home do CMS (uma vez, com cache). Retorna {} se não houver. */
export function useHomeContent(): HomeContent {
  const [data, setData] = useState<HomeContent>(cache ?? {})
  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = getHomePage()
    let active = true
    inflight.then((d) => { if (d) cache = d; if (active && d) setData(d) })
    return () => { active = false }
  }, [])
  return data
}
