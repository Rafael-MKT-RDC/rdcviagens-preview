import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/cms";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

// Imagem padrão de compartilhamento (Open Graph / Twitter). Banner institucional da marca.
const OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/banner-institucional-v2-6yHXJTBkcBCnQNZRsxDPn9.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://rdcviagens.com.br"),
  title: { default: "RDC Viagens", template: "%s | RDC Viagens" },
  description: "Pioneira em assinatura de viagens no Brasil há mais de 35 anos.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "RDC Viagens",
    title: "RDC Viagens",
    description: "Pioneira em assinatura de viagens no Brasil há mais de 35 anos.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "RDC Viagens" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  robots: "index, follow, max-image-preview:large, max-snippet:-1",
};

// Revalida o conteúdo do CMS a cada 30s (ISR) — dá pra ver edições do Sanity refletidas.
export const revalidate = 30;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "RDC Viagens",
    url: "https://rdcviagens.com.br",
    description: "Pioneira em assinatura de viagens no Brasil há mais de 35 anos. Acesso a +200 mil hotéis e resorts com economia de até 60%.",
    foundingDate: "1991",
    telephone: settings.telefone,
    address: { "@type": "PostalAddress", addressCountry: "BR" },
    sameAs: Object.values(settings.social).filter(Boolean),
  };

  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Header settings={settings} />
        <main className="min-h-screen flex flex-col bg-white">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
