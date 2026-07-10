import Studio from './Studio'

// Studio embutido em /studio. Renderizado SOMENTE no cliente: o Sanity Studio v3
// usa React.createContext no topo de seus modulos, o que quebra o build quando
// avaliado no grafo do servidor (RSC). Por isso nao importamos o Studio aqui.
export const dynamic = 'force-static'

export const metadata = {
  title: 'RDC Viagens – CMS',
  robots: { index: false, follow: false },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StudioPage() {
  return <Studio />
}
