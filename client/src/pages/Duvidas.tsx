import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { getFaqCategories, type FaqCategory } from "@/lib/contentService";

export default function Duvidas() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);

  useEffect(() => {
    getFaqCategories().then(setFaqCategories);
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const filteredCategories = faqCategories
    .filter(cat => !activeCategory || cat.name === activeCategory)
    .map(cat => ({
      ...cat,
      faqs: cat.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(cat => cat.faqs.length > 0);

  const totalQuestions = faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Dúvidas Frequentes | Assinatura de Viagens"
        description="Tire suas dúvidas sobre a assinatura RDC Viagens: como funciona, carência de 40 dias, tarifa exclusiva, reservas e pagamentos. Encontre todas as respostas!"
        keywords="dúvidas RDC Viagens, FAQ assinatura viagens, como funciona RDC, carência assinatura, tarifa exclusiva, reservas RDC"
        canonical="/duvidas"
      />
      <StructuredData type="faq" />
      <Header />
      
      {/* Hero */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#FF9100] text-white border-0">Central de Ajuda</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Como podemos <span className="text-[#FF9100]">ajudar</span>?
            </h1>
            <p className="text-xl text-[#C7E5F3] mb-8">
              Encontre respostas para as <strong>{totalQuestions} perguntas mais frequentes</strong> sobre a RDC Viagens.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <Input 
                placeholder="Buscar dúvidas..." 
                className="pl-12 py-6 text-lg bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-[#F6F6F6] border-b border-[#D6D6D6] sticky top-16 z-30">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-[#001A9E] text-white"
                  : "bg-white text-[#555555] hover:bg-[#F0F0F0] border border-[#D6D6D6]"
              }`}
            >
              Todos os assuntos
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.name
                    ? "bg-[#001A9E] text-white"
                    : "bg-white text-[#555555] hover:bg-[#F0F0F0] border border-[#D6D6D6]"
                }`}
              >
                {cat.name} ({cat.faqs.length})
              </button>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-[#D6D6D6] mx-auto mb-4" />
                <p className="text-[#777777] text-lg">Nenhuma pergunta encontrada para "{searchTerm}"</p>
                <button
                  onClick={() => { setSearchTerm(""); setActiveCategory(null); }}
                  className="mt-4 text-[#001A9E] hover:underline"
                >
                  Limpar busca
                </button>
              </div>
            )}
            {filteredCategories.map((category) => (
              <div key={category.name} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-[#2D2D2D]">
                    {category.name}
                  </h2>
                  <span className="text-sm text-[#999999] bg-[#F0F0F0] px-2 py-1 rounded-full">
                    {category.faqs.length} {category.faqs.length === 1 ? "pergunta" : "perguntas"}
                  </span>
                </div>
                <div className="space-y-3">
                  {category.faqs.map((faq, index) => {
                    const faqId = `${category.name}-${index}`;
                    return (
                      <div key={faqId} className="border border-[#D6D6D6] rounded-xl overflow-hidden">
                        <button
                          className="w-full p-5 flex items-center justify-between text-left hover:bg-[#F6F6F6] transition-colors"
                          onClick={() => toggleFaq(faqId)}
                        >
                          <span className="font-medium text-[#2D2D2D] pr-4">{faq.question}</span>
                          {openFaq === faqId ? (
                            <ChevronUp className="w-5 h-5 flex-shrink-0 text-[#FF9100]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#999999]" />
                          )}
                        </button>
                        {openFaq === faqId && (
                          <div className="px-5 pb-5 text-[#555555] border-t border-[#E8E8E8] pt-4 whitespace-pre-line leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#F6F6F6]">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="w-12 h-12 text-[#FF9100] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-[#555555] mb-6">
              Nossa <strong>equipe está pronta</strong> para ajudar você com qualquer dúvida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button className="bg-[#FF9100] hover:bg-[#E68200]">
                  Falar com atendente
                </Button>
              </Link>
              <a href="https://api.whatsapp.com/send?phone=5508007770808" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#001A9E] text-[#001A9E]">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      <Footer />
    </div>
  );
}
