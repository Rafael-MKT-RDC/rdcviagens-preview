import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Users, 
  Plane, 
  Award, 
  Coffee, 
  GraduationCap,
  ExternalLink,
  Star,
  TrendingUp,
  Clock,
  Linkedin
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
/*
 * Design Philosophy: Tropical Elegance
 * - Página de carreiras com foco em cultura e benefícios
 * - Cores: Azul profundo + Laranja accent
 */

const benefits = [
  { 
    icon: Plane, 
    title: "Viagens com Desconto", 
    description: "Descontos exclusivos em hospedagens e pacotes de viagem para você e sua família" 
  },
  { 
    icon: GraduationCap, 
    title: "Desenvolvimento", 
    description: "Programas de capacitação, cursos e treinamentos para seu crescimento profissional" 
  },
  { 
    icon: Heart, 
    title: "Plano de Saúde", 
    description: "Cobertura médica completa para você e seus dependentes" 
  },
  { 
    icon: Coffee, 
    title: "Ambiente Descontraído", 
    description: "Escritório moderno com áreas de descompressão e café à vontade" 
  },
  { 
    icon: Clock, 
    title: "Flexibilidade", 
    description: "Horário flexível e possibilidade de trabalho híbrido" 
  },
  { 
    icon: Award, 
    title: "Reconhecimento", 
    description: "Programas de bonificação e premiação por desempenho" 
  },
];

const values = [
  { 
    icon: Heart, 
    title: "Paixão por Viajar", 
    description: "Acreditamos que viajar transforma vidas" 
  },
  { 
    icon: Users, 
    title: "Trabalho em Equipe", 
    description: "Juntos somos mais fortes e criativos" 
  },
  { 
    icon: Star, 
    title: "Excelência", 
    description: "Buscamos sempre superar expectativas" 
  },
  { 
    icon: TrendingUp, 
    title: "Inovação", 
    description: "Estamos sempre evoluindo e melhorando" 
  },
];

export default function TrabalheConosco() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Trabalhe Conosco | Vagas e Carreiras"
        description="Faça parte da equipe RDC Viagens, empresa certificada Great Place to Work com mais de 400 colaboradores apaixonados por viagens. Confira as vagas abertas!"
        keywords="trabalhe conosco RDC, vagas RDC Viagens, carreiras turismo, emprego viagens, GPTW, oportunidades RDC"
        canonical="/trabalhe-conosco"
        schema={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "hiringOrganization": { "@type": "Organization", "name": "RDC Viagens" },
          "description": "Oportunidades de carreira na RDC Viagens, empresa certificada Great Place to Work.",
          "employmentType": "FULL_TIME"
        }}
      />
      <Header />
      
      {/* Hero */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 bg-gradient-to-br from-[#00148A] to-[#001070] overflow-hidden">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF9100] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 md:w-96 h-64 md:h-96 bg-[#00B4D8] rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#FF9100] text-white border-0">Carreiras</Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trabalhe <span className="text-[#FF9100]">Conosco</span>
            </h1>
            <p className="text-xl text-[#C7E5F3] mb-8">
              Faça parte de uma equipe apaixonada por <strong>transformar sonhos em viagens inesquecíveis</strong>. 
              Na RDC, você cresce junto com a gente!
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.linkedin.com/company/rdcviagens/jobs/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-[#FF9100] hover:bg-[#E68200] text-white"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Ver vagas no LinkedIn
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-12 bg-white border-b">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#001A9E] mb-2">+400</div>
              <div className="text-[#555555]">RDCLovers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF9100] mb-2">35</div>
              <div className="text-[#555555]">Anos de história</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#001A9E] mb-2">GPTW</div>
              <div className="text-[#555555]">Great Place to Work</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF9100] mb-2">RA1000</div>
              <div className="text-[#555555]">Reclame Aqui</div>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Por que trabalhar na RDC */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#E8F4FA] text-[#001A9E] border-0">Nossa Cultura</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Por que trabalhar na RDC?
            </h2>
            <p className="text-[#555555] max-w-2xl mx-auto">
              Somos uma empresa certificada <strong>Great Place to Work</strong>, reconhecida por valorizar 
              nossos RDCLovers e proporcionar um <strong>ambiente de trabalho excepcional</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8F4FA] to-[#FFF0D6] flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#001A9E]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D2D2D] mb-2">{value.title}</h3>
                  <p className="text-[#555555] text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#FFF0D6] text-[#CC7400] border-0">Benefícios</Badge>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              O que oferecemos
            </h2>
            <p className="text-[#555555] max-w-2xl mx-auto">
              Além de um ambiente de trabalho incrível, oferecemos <strong>benefícios que fazem a diferença</strong> 
              na sua vida pessoal e profissional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border border-[#E8E8E8] hover:border-[#8ECAE6] hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F6F6F6] flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-[#001A9E]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D2D2D] mb-1">{benefit.title}</h3>
                      <p className="text-[#555555] text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA - Vagas */}
      <section id="vagas" className="py-16 md:py-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Venha fazer parte do nosso time!
            </h2>
            <p className="text-[#C7E5F3] mb-8 max-w-2xl mx-auto">
              Na RDC Viagens, você terá a oportunidade de <strong>crescer profissionalmente</strong> enquanto 
              ajuda milhares de pessoas a realizarem o sonho de viajar. Todas as nossas vagas são publicadas 
              diretamente no <strong>LinkedIn</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.linkedin.com/company/rdcviagens/jobs/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-[#FF9100] hover:bg-[#E68200] text-white"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Ver vagas no LinkedIn
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="/sobre">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Conhecer a RDC
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
