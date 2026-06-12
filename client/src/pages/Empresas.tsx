import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Handshake,
  Check,
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const solutions = [
  {
    id: "gestao",
    icon: Plane,
    title: "RDC Viagens Corporativas",
    subtitle: "Sua empresa viaja. Nós cuidamos de tudo.",
    description: "Plataforma completa de reservas e produtos turísticos para viagens corporativas. Centralize reservas, controle gastos e economize — sem burocracia, sem complicação.",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OPAJZzSDsUMxkZVwUha8Gs/sandbox/UwjsP9SnZnOCoDdkW5bcgs-img-2_1771435420000_na1fn_Y29ycC1nZXN0YW8tdjI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT1BBSlp6U0RzVU14a1pWd1VoYThHcy9zYW5kYm94L1V3anNQOVNuWm5PQ29EZGtXNWJjZ3MtaW1nLTJfMTc3MTQzNTQyMDAwMF9uYTFmbl9ZMjl5Y0MxblpYTjBZVzh0ZGpJLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eHhSTf0ZwjqZUeoKv9TIZQ93E97hYTYwMwgltOQHks4mpCarGNSYA7FdFTfhpYodkwzLOOaMEWxl4bWCvtODZjECVQYhO88AM1N88qimTCz-i9B0n~~z-lq9lpLY3hAvGVSDPgkV0fS2QAUCPJD-8-nDuoFHM8mPOFdcKvOf5iKkBpV5GtgCVLBPFdRbgbsVihOrFMOyLt9Qpny9jhOb~PMm1tD4MeDaqBh6tbh6klcpXpWh9EnH04QqbHnP7WEO4A5Uw8GM~o~dF5AC05TJliB4wtMH66U8F48fx4OgGqAmyb8YXl7UgaUiXOhVWWF5tpArJkEjw6xgP68vnf-htQ__",
    href: "/solucoes-corporativas/gestao",
    audience: "Para Gestores, Marketing, Comercial e Facilities",
    features: [
      "Reservas de voos, hotéis e carros em um só lugar",
      "Controle de gastos em tempo real",
      "Plataforma de reservas e produtos turísticos",
      "Relatórios gerenciais para tomada de decisão"
    ]
  },
  {
    id: "premiacao",
    icon: Plane,
    title: "RDC Premiação",
    subtitle: "Viagens que transformam resultados e valorizam reconhecimento.",
    description: "Uma solução estratégica para áreas como RH, Marketing e Comercial que buscam engajar públicos e impulsionar resultados com colaboradores, clientes e parceiros.",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OPAJZzSDsUMxkZVwUha8Gs/sandbox/tm9dk8QPmoZueYHE2UjNYo-img-1_1771436278000_na1fn_Y29ycC1wcmVtaWFjYW8tdjM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT1BBSlp6U0RzVU14a1pWd1VoYThHcy9zYW5kYm94L3RtOWRrOFFQbW9adWVZSEUyVWpOWW8taW1nLTFfMTc3MTQzNjI3ODAwMF9uYTFmbl9ZMjl5Y0Mxd2NtVnRhV0ZqWVc4dGRqTS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PKipP2L1khjjl-tZQsGQ-BgQkTZJRHYHdh0Qw5P39PXPQDgKpvTgXaJewhHQ9rOVeeQai8RhLq8IfCOXqdNtlmKE4JrwDjGNnUlumb3DNWwrlmm1NGEM5Cq7xci11ku7WhJ1RhIoyUXpnsAqam7cKyiwAuRkdERzrGKyVlN14cn4Vr-L2qZ3KUZVaI5ISH7nsZ7f5nbWdLkuUDsSMb2WmFz7MDjGcB9wI1cxkZzpEauQ~C0UYZrWpr86MEwyXS7zU6kY2sNmMSbLSlucOucSsTIg9FanKQ2QtN76lic7Yt0C6HyxHIXJ7Xz9P-YhyghlkB~saecRUqDcy-xEY0DZHQ__",
    href: "/solucoes-corporativas/premiacao",
    audience: "Para Diretores, Gestores de RH, Comercial, Marketing e Facilities",
    features: [
      "Viagens como ferramenta de incentivo corporativo",
      "Impacto direto em engajamento e resultados",
      "Potencial de ROI baseado em dados de mercado",
      "Operação completa por conta da RDC"
    ]
  },
  {
    id: "parcerias",
    icon: Handshake,
    title: "RDC Parcerias",
    subtitle: "Novas frentes de crescimento para o seu negócio.",
    description: "Alianças estratégicas com bancos, empresas, entidades e plataformas que buscam se diferenciar, gerar novas receitas e ampliar sua proposta de valor.",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OPAJZzSDsUMxkZVwUha8Gs/sandbox/0SDltGM3oaPAChVZFfvxc2-img-1_1771436663000_na1fn_Y29ycC1wYXJjZXJpYXMtdjM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT1BBSlp6U0RzVU14a1pWd1VoYThHcy9zYW5kYm94LzBTRGx0R00zb2FQQUNoVlpGZnZ4YzItaW1nLTFfMTc3MTQzNjY2MzAwMF9uYTFmbl9ZMjl5Y0Mxd1lYSmpaWEpwWVhNdGRqTS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=t4pSBzk-qAok5wBLcK~6o3RDCgswGcFK1o35D4EEIH4LtTK~PGfhHkkr6CjdWr9PKrn6d-jJ-CMZaWLhPNNBFMsnUhIO5EsR4LbauWXQyBQccqkaf0OvKY1DZMnu41oF4sWsdLLqJ5mgpIMQt1SANM5CsDraKAmWYO1j9gJCKkoWN029aCfS9VJbNxXAeutuz2zaOI7Ntafq9xmmuTBYPdRA~iVGQIahOgM-hEbWR0Cpx3cnbNme7f0K0bEKpH8Il1SgOQTUDT1oN2zzlL7tmk6NaVeF9ZlORFxO9vV9TFtSAIqb1aXCD6QXYPBmQdLRKmeVwBA16iEw3g3tb4Fuag__",
    href: "/solucoes-corporativas/parcerias",
    audience: "Para Bancos, Empresas, Entidades e Plataformas",
    features: [
      "Modelos flexíveis de parceria e remuneração",
      "Integração via API, white-label ou co-branding",
      "Zero complexidade operacional para o parceiro",
      "Suporte dedicado de marketing e vendas"
    ]
  }
];

const differentials = [
  {
    icon: Clock,
    title: "+35 anos de experiência",
    description: "Mais de três décadas conectando pessoas a destinos pelo mundo, com a solidez de quem entende o mercado de viagens."
  },
  {
    icon: Globe,
    title: "Alcance global",
    description: "Rede ampla de hotéis, voos e experiências no Brasil e no mundo, com tarifas negociadas e condições exclusivas."
  },
  {
    icon: Building2,
    title: "Soluções sob medida",
    description: "Cada empresa tem uma realidade diferente. Desenhamos modelos que se adaptam ao seu porte, segmento e objetivos."
  },
  {
    icon: Shield,
    title: "Operação completa",
    description: "Da reserva ao pós-venda, cuidamos de toda a operação. Sua empresa foca no que faz de melhor."
  }
];

export default function Empresas() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Soluções Corporativas | RDC Viagens"
        description="Soluções corporativas da RDC Viagens: viagens corporativas, premiação e incentivo, e parcerias estratégicas para bancos, empresas e plataformas."
        keywords="soluções corporativas, viagens corporativas, incentivo corporativo, RDC empresas, premiação colaboradores, parcerias estratégicas"
        canonical="https://rdcviagens.com.br/solucoes-corporativas"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/OPAJZzSDsUMxkZVwUha8Gs/sandbox/UwjsP9SnZnOCoDdkW5bcgs-img-1_1771435428000_na1fn_Y29ycC1oZXJvLXYy.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT1BBSlp6U0RzVU14a1pWd1VoYThHcy9zYW5kYm94L1V3anNQOVNuWm5PQ29EZGtXNWJjZ3MtaW1nLTFfMTc3MTQzNTQyODAwMF9uYTFmbl9ZMjl5Y0Mxb1pYSnZMWFl5LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hTF~Y4M8sdSkkXwzVe-RQGxbqFgUr0tn7T83aUdmQWV5Y8A7-4wEsBDNFcMGPYcmNxkf3VaI9XekB8VAsRcUvc5UGoKAvfVLd~E7hXQr755m0138F~2U2MF8OeHLH47SXTiv3emZnP~aY63yhsgeU8ZL9kosIP70s4eDock3yxk3tU9RMHMgo-gwp5m495TuYiKfz1seR~swf2QLS1B2bBGapo3NUEv8P5mrFTF31XgrSVsqd7AaM0rOLvg-CeF3o8DFclewKzab3xN~m~fQHk9d8g8Vshpk5vaf3-MKwDFb1qKF9vqDPTdC8aY-uj8TJAOZxnz~B0L1ebnneGaf9Q__" 
            alt="Soluções Corporativas RDC Viagens"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00148A]/95 via-[#00148A]/80 to-[#00148A]/50"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#FF9100] hover:bg-[#E68200] text-white border-0">
              Soluções Corporativas
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Viagens a serviço do{" "}
              <span className="text-[#FF9100]">seu negócio</span>
            </h1>
            <p className="text-xl text-[#C7E5F3] mb-8">
              <strong>Viagens corporativas</strong>, <strong>programas de incentivo</strong> e a <strong>unidade de parcerias 
              estratégicas</strong> que impulsiona novos negócios e potencializa resultados para a sua empresa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8 rounded-full"
                onClick={() => document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conhecer soluções
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Soluções para cada necessidade da sua empresa
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Cada uma voltada para atender diferentes necessidades da sua empresa: <strong>eficiência, engajar pessoas e gerar oportunidades de negócio</strong>. 
              Escolha a solução ideal para o momento da sua empresa.
            </p>
          </div>

          <div className="space-y-20">
            {solutions.map((solution, index) => {
              // Cores por vertical
              const colorMap: Record<string, { iconBg: string; iconText: string; subtitle: string; check: string; btnBg: string; btnHover: string; badgeBg: string; badgeText: string }> = {
                gestao: { iconBg: "bg-[#FAD0D8]", iconText: "text-[#D04058]", subtitle: "text-[#D04058]", check: "text-[#E8506A]", btnBg: "bg-[#E8506A]", btnHover: "hover:bg-rose-700", badgeBg: "bg-[#E8506A]", badgeText: "text-white" },
                premiacao: { iconBg: "bg-[#FFF0D6]", iconText: "text-[#CC7400]", subtitle: "text-[#CC7400]", check: "text-[#E68200]", btnBg: "bg-[#FF9100]", btnHover: "hover:bg-[#E68200]", badgeBg: "bg-[#FF9100]", badgeText: "text-[#2D2D2D]" },
                parcerias: { iconBg: "bg-[#F0E4FF]", iconText: "text-[#9B6AE0]", subtitle: "text-[#9B6AE0]", check: "text-[#B78AFF]", btnBg: "bg-violet-600", btnHover: "hover:bg-violet-700", badgeBg: "bg-violet-600", badgeText: "text-white" },
              };
              const colors = colorMap[solution.id] || colorMap.gestao;
              return (
              <div 
                key={solution.id}
                id={solution.id}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6`}>
                    <solution.icon className={`w-8 h-8 ${colors.iconText}`} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-2">
                    {solution.title}
                  </h3>
                  <p className={`${colors.subtitle} font-medium mb-2`}>
                    {solution.subtitle}
                  </p>
                  <p className="text-sm text-[#777777] mb-4">
                    {solution.audience}
                  </p>
                  <p className="text-[#555555] mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${colors.check} flex-shrink-0`} />
                        <span className="text-[#404040]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={solution.href}>
                    <Button className={`${colors.btnBg} ${colors.btnHover} ${colors.badgeText}`}>
                      {solution.id === "gestao" ? "Conheça a gestão inteligente" : solution.id === "premiacao" ? "Descubra como premiar" : "Vamos construir juntos?"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00148A]/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge className={`${colors.badgeBg} ${colors.badgeText} border-0`}>
                        {solution.title}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* Differentials Section */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">
              Por que a RDC Viagens
            </h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              A experiência de quem está no mercado há <strong>mais de três décadas</strong>, 
              com a <strong>agilidade</strong> de quem entende as necessidades de hoje
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {differentials.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFF0D6] flex items-center justify-center mb-3 md:mb-4">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#E68200]" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-lg text-[#2D2D2D] mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#555555] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#00148A] text-white">
        <AnimateOnScroll variant="zoom-in">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              Não sabe qual solução é a ideal?
            </h2>
            <p className="text-lg text-[#8ECAE6] mb-8">
              Fale com nossa equipe. Vamos entender o cenário da sua empresa 
              e indicar o caminho que faz <strong>mais sentido para os seus objetivos</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato">
                <Button size="lg" className="bg-[#FF9100] hover:bg-[#E68200] text-white px-8">
                  Falar com a equipe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      <Footer />
    </div>
  );
}
