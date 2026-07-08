import type { Metadata } from "next";
import { DuvidasClient } from "@/components/DuvidasClient";
import { faqCategories } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Dúvidas Frequentes | Assinatura de Viagens",
  description:
    "Tire suas dúvidas sobre a assinatura RDC Viagens: como funciona, carência de 40 dias, tarifa exclusiva, reservas e pagamentos. Encontre todas as respostas!",
  keywords:
    "dúvidas RDC Viagens, FAQ assinatura viagens, como funciona RDC, carência assinatura, tarifa exclusiva, reservas RDC",
  alternates: { canonical: "/duvidas" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((cat) =>
    cat.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    }))
  ),
};

export default function DuvidasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DuvidasClient />
    </>
  );
}
