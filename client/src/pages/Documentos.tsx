import { Link } from "wouter";
import { FileText, Shield, ScrollText, ChevronRight, ExternalLink, Gift, CreditCard, Award, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

/*
 * Design Philosophy: Tropical Elegance
 * - Página limpa e organizada para repositório de documentos
 * - Cards com ícones e descrições claras
 * - Tom institucional e confiável
 */

const documents = [
  {
    title: "Termo de Adesão de Assinatura",
    description: "Documento que formaliza a adesão ao plano de assinatura RDC, com todas as condições, direitos e deveres do assinante.",
    icon: ScrollText,
    category: "Assinatura",
    href: "/termo-adesao.pdf",
    accent: "blue" as const,
  },
  {
    title: "Política de Privacidade",
    description: "Como coletamos, utilizamos, armazenamos e protegemos seus dados pessoais, em conformidade com a LGPD.",
    icon: Shield,
    category: "Privacidade",
    href: "/politica-privacidade.pdf",
    accent: "orange" as const,
  },
  {
    title: "Termos de Uso",
    description: "Regras e condições gerais para utilização dos serviços, plataformas e canais da RDC Viagens.",
    icon: FileText,
    category: "Geral",
    href: "/termos-uso.pdf",
    accent: "blue" as const,
  },
  {
    title: "Regulamento do Programa de Indicação",
    description: "Regras, condições e benefícios do programa de indicação RDC. Saiba como indicar amigos e acumular vantagens.",
    icon: Users,
    category: "Programa de Indicação",
    href: "/regulamento-programa-indicacao.pdf",
    accent: "orange" as const,
  },
  {
    title: "Termo de Uso - Clube de Vantagens",
    description: "Condições de uso, regras de participação e benefícios disponíveis no Clube de Vantagens RDC.",
    icon: Gift,
    category: "Clube de Vantagens",
    href: "/termo-uso-clube-vantagens.pdf",
    accent: "blue" as const,
  },
  {
    title: "Formulário Autorização Débito - Conta de Terceiros",
    description: "Formulário para autorização de débito em conta de terceiros, utilizado quando o pagamento é realizado por outra pessoa.",
    icon: CreditCard,
    category: "Financeiro",
    href: "/formulario-autorizacao-debito-terceiros.pdf",
    accent: "orange" as const,
  },
  {
    title: "Regulamento Gold 7 Diárias",
    description: "Regulamento completo do plano Gold 7 Diárias, com todas as condições, regras de utilização e benefícios inclusos.",
    icon: Award,
    category: "Assinatura",
    href: "/regulamento-gold-7-diarias.pdf",
    accent: "blue" as const,
  },
];

export default function Documentos() {
  return (
    <>
      <SEO
        title="Documentos Legais | Termos e Privacidade"
        description="Acesse os documentos legais da RDC Viagens: termos de uso, política de privacidade e contratos de assinatura. Transparência e segurança para nossos assinantes."
        keywords="documentos RDC Viagens, termos de uso, política privacidade, contrato assinatura, regulamento viagens"
        canonical="/documentos"
        noindex={true}
      />
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00148A] via-[#001070] to-[#00148A] text-white pt-32 pb-20">
        <div className="container">
          <div className="flex items-center gap-2 text-[#8ECAE6] text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Documentos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Central de Documentos
          </h1>
          <p className="text-[#C7E5F3] text-lg max-w-2xl leading-relaxed">
            Acesse os principais documentos da RDC Viagens. <strong>Transparência e clareza</strong> 
            para que você tenha todas as informações que precisa.
          </p>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="space-y-5">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              const isBlue = doc.accent === "blue";

              return (
                <a
                  key={index}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className={`flex items-start gap-5 p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                    isBlue
                      ? "border-[#E8F4FA] hover:border-[#8ECAE6] hover:bg-[#F6F6F6]/50"
                      : "border-orange-100 hover:border-[#FFCC80] hover:bg-[#FFF8EB]/50"
                  }`}>
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isBlue
                        ? "bg-[#E8F4FA] text-[#001A9E] group-hover:bg-[#001A9E] group-hover:text-white"
                        : "bg-[#FFF0D6] text-[#E68200] group-hover:bg-[#FF9100] group-hover:text-white"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          isBlue ? "bg-[#E8F4FA] text-[#001A9E]" : "bg-[#FFF0D6] text-[#E68200]"
                        }`}>
                          {doc.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#2D2D2D] mb-1.5 group-hover:text-[#001070] transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-[#777777] leading-relaxed">
                        {doc.description}
                      </p>
                    </div>

                    {/* Action */}
                    <div className={`flex items-center gap-1.5 flex-shrink-0 text-sm font-medium transition-all duration-300 mt-3 ${
                      isBlue
                        ? "text-[#0020B8] group-hover:text-[#001070]"
                        : "text-[#FF9100] group-hover:text-[#CC7400]"
                    }`}>
                      <span className="hidden sm:inline">Abrir PDF</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Info note */}
          <div className="mt-12 p-5 rounded-2xl bg-[#F6F6F6] border border-[#E8E8E8]">
            <p className="text-sm text-[#777777] leading-relaxed">
              <strong className="text-[#404040]">Dúvidas sobre algum documento?</strong>{" "}
              Entre em contato com nossa equipe pelo{" "}
              <a href="https://wa.me/551140034910" target="_blank" rel="noopener noreferrer" className="text-[#0020B8] hover:underline">
                WhatsApp
              </a>{" "}
              ou pelo e-mail{" "}
              <a href="mailto:contato@rdcviagens.com.br" className="text-[#0020B8] hover:underline">
                contato@rdcviagens.com.br
              </a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
