import { useEffect, useState } from 'react'
import { getSiteSettings, FALLBACK_SETTINGS, type SiteSettings } from '@/lib/contentService'

let cache: SiteSettings | null = null
let inflight: Promise<SiteSettings> | null = null

/**
 * Lê as Configurações Globais do CMS uma única vez e mantém em cache.
 * Enquanto carrega (ou se o CMS estiver desligado), usa os valores atuais (fallback).
 */
export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(cache ?? FALLBACK_SETTINGS)

  useEffect(() => {
    if (cache) return
    if (!inflight) inflight = getSiteSettings()
    let active = true
    inflight.then((s) => {
      cache = s
      if (active) setSettings(s)
    })
    return () => {
      active = false
    }
  }, [])

  return settings
}
