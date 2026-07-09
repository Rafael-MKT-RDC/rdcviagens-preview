import type { Metadata } from "next";
import { EmpresasTravelCloudClient } from "@/components/EmpresasTravelCloudClient";
import { getPageDoc } from "@/lib/cms";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Travel Cloud | Plataforma White Label de Viagens",
  description: "Plataforma white label que permite oferecer viagens dentro do seu ecossistema digital, com operação turística completa da RDC. B2B e B2B2C. Agende uma conversa!",
  keywords: "travel cloud RDC, white label viagens, plataforma viagens API, viagens fintech, benefícios viagens, B2B2C turismo, infraestrutura de viagens",
  alternates: { canonical: "/solucoes-corporativas/travel-cloud" },
};
const schema = { "@context": "https://schema.org", "@type": "Service", name: "RDC Travel Cloud", provider: { "@type": "Organization", name: "RDC Viagens" }, description: "Plataforma white label de viagens para ecossistemas digitais (B2B e B2B2C).", serviceType: "Plataforma White Label de Viagens" };
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "O que é a RDC Travel Cloud?", acceptedAnswer: { "@type": "Answer", text: "É a infraestrutura de viagens da RDC que permite a parceiros oferecerem viagens com conveniência dentro dos próprios ecossistemas digitais, sem construir operação turística. O usuário reserva sem sair do app; a RDC opera inventário, tarifas, reservas, atendimento e pós-venda nos bastidores." } },
    { "@type": "Question", name: "Para quem é a RDC Travel Cloud?", acceptedAnswer: { "@type": "Answer", text: "Para parceiros com app ou plataforma própria (fintechs, HRtechs, superapps de benefícios, bancos, cartões, marketplaces) que querem criar a categoria de viagem no seu ecossistema, além de empresas que buscam gerir viagem corporativa ou oferecer viagem como benefício." } },
    { "@type": "Question", name: "O parceiro precisa ter experiência em turismo?", acceptedAnswer: { "@type": "Answer", text: "Não. A solução é operada integralmente pela RDC. O parceiro distribui e se relaciona com sua base; a RDC cuida de inventário, tarifas, reservas, vouchers, remarcações, atendimento, conciliação e pós-venda." } },
    { "@type": "Question", name: "Precisa ser white label?", acceptedAnswer: { "@type": "Answer", text: "Não necessariamente. A experiência pode ser white label (marca do parceiro em primeiro plano) ou um direcionamento mais simples (link, landing page ou cobranding). O parceiro escolhe o modelo." } },
    { "@type": "Question", name: "Como funciona o modelo comercial?", acceptedAnswer: { "@type": "Answer", text: "Duas frentes: acesso à plataforma (receita da RDC pela solução, tecnologia e operação) e monetização do parceiro (comissão sobre reservas e, na jornada de lazer, contratação do RDC Prime). Os percentuais variam conforme produto e acordo." } },
    { "@type": "Question", name: "Quais são os modelos de integração disponíveis?", acceptedAnswer: { "@type": "Answer", text: "Três: Embed (link, landing page ou SSO), White Label (experiência completa com a marca do parceiro) e Enterprise (integração profunda via Web API, com SLAs, segurança e governança de dados)." } },
    { "@type": "Question", name: "Qual a diferença entre a Travel Cloud e o RDC Prime?", acceptedAnswer: { "@type": "Answer", text: "A Travel Cloud é a infraestrutura de distribuição e operação de viagens. O RDC Prime é um produto de benefício de viagem de lazer para o colaborador e a família, no modelo de assinatura. O Prime pode ser distribuído via Travel Cloud, mas é um produto separado." } },
    { "@type": "Question", name: "O que significa conveniência na prática?", acceptedAnswer: { "@type": "Answer", text: "O usuário reserva viagens sem sair do app que já usa: sem cadastro novo, sem redirecionamento, sem fricção. O parceiro não gerencia outro fornecedor — a RDC concentra tudo —, o que gera mais engajamento e oportunidade de receita." } },
  ],
};
export default async function TravelCloudPage() {
  const cms = await getPageDoc<any>("paginaTravelCloud");
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><EmpresasTravelCloudClient cms={cms} /></>);
}
