import { useEffect } from "react";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "RDC Viagens",
  "alternateName": "RDC Férias e Viagens",
  "url": "https://rdcviagens.com.br",
  "logo": "https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/Logo_RDC_oficial_4e0ebd10.png",
  "description": "Pioneira em assinatura de viagens no Brasil há 35 anos. Planos a partir de R$ 97,20/mês com acesso a mais de 200 mil destinos no Brasil e no mundo.",
  "foundingDate": "1992",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Manoel Coelho, 600, Centro",
    "addressLocality": "São Caetano do Sul",
    "addressRegion": "SP",
    "postalCode": "09510-101",
    "addressCountry": "BR"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+55-0800-055-2600",
      "contactType": "sales",
      "areaServed": "BR",
      "availableLanguage": "Portuguese",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    }
  ],
  "sameAs": [
    "https://www.instagram.com/rdcviagens",
    "https://www.facebook.com/rdcferiaseviagens",
    "https://www.youtube.com/c/rdcferiaseviagens",
    "https://www.linkedin.com/company/rdcviagens",
    "https://www.tiktok.com/@rdc.viagens"
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "400"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RDC Viagens",
  "url": "https://rdcviagens.com.br",
  "inLanguage": "pt-BR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://rdcviagens.com.br/destinos?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é a assinatura de viagens da RDC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A assinatura de viagens da RDC é um plano mensal que dá acesso a hospedagens nos melhores hotéis e resorts com economia. São 6 planos de 2 a 7 diárias por ano, a partir de R$ 97,20/mês, com acesso a mais de 200 mil destinos no Brasil e no mundo."
      }
    },
    {
      "@type": "Question",
      "name": "Quais hotéis estão disponíveis na RDC Viagens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A RDC Viagens possui parcerias com mais de 16 redes hoteleiras, incluindo Accor, Marriott, Hilton, IHG, Wyndham, Atlântica, Meliá, Hyatt, Vila Galé, WAM e Laghetto, totalizando mais de 200 mil destinos no Brasil e no mundo."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o programa de indicação da RDC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O programa Indique e Ganhe da RDC permite que assinantes indiquem amigos e ganhem pontos que podem ser usados como pagamento parcial ou integral de qualquer serviço turístico oferecido pela RDC. Os pontos valem por 24 meses."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Viaje Tranquilo da RDC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Viaje Tranquilo é um serviço exclusivo para assinantes por R$ 19,90 por reserva que oferece prioridade de atendimento, suporte emergencial 24h com atendimento humano, isenção da taxa RDC para alterações de reserva e solicitação imediata de early check-in e late check-out."
      }
    },
    {
      "@type": "Question",
      "name": "Quais são as formas de pagamento da RDC Viagens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Os pacotes podem ser pagos em até 10x sem juros no cartão de crédito. Para passagens aéreas avulsas, o parcelamento é em até 8x com parcela mínima de R$ 150,00. Também aceitamos PIX e boleto bancário."
      }
    }
  ]
};

const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

interface StructuredDataProps {
  type?: "organization" | "faq" | "website" | "breadcrumb";
  breadcrumbItems?: { name: string; url: string }[];
}

export default function StructuredData({ type = "organization", breadcrumbItems }: StructuredDataProps) {
  useEffect(() => {
    const schemas: Record<string, object> = {
      organization: organizationSchema,
      faq: faqSchema,
      website: websiteSchema,
    };

    let schema: object;
    if (type === "breadcrumb" && breadcrumbItems) {
      schema = breadcrumbSchema(breadcrumbItems);
    } else {
      schema = schemas[type];
    }
    if (!schema) return;

    const scriptId = `structured-data-${type}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [type, breadcrumbItems]);

  return null;
}
