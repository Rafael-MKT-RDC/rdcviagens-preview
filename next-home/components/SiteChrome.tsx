'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// Esconde o cabecalho/rodape do site nas rotas do Studio (/studio) para o CMS
// ocupar a tela inteira. Header e Footer sao renderizados no servidor e
// passados como props, entao continuam sendo Server Components.
export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()

  if (pathname?.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <>
      {header}
      <main className="min-h-screen flex flex-col bg-white">{children}</main>
      {footer}
    </>
  )
}
