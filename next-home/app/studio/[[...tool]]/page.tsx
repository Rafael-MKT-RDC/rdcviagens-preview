import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

// O Studio precisa da rota catch-all [[...tool]] para navegar internamente.
export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
