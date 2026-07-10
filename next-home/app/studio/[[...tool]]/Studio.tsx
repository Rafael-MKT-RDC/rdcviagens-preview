'use client'

import dynamic from 'next/dynamic'

// ssr:false garante que o Studio (e todo o pacote sanity) nunca seja avaliado
// no servidor, evitando o erro "createContext is not a function" no build.
const StudioInner = dynamic(() => import('./StudioInner'), { ssr: false })

export default function Studio() {
  return <StudioInner />
}
