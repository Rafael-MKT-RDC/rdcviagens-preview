import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

import { AnimateOnScroll } from "@/components/AnimateOnScroll";
const posts = [
  {
    id: 1,
    title: "10 destinos para explorar no Nordeste brasileiro",
    excerpt: "Descubra as praias mais bonitas e os melhores roteiros para suas férias no Nordeste.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ZRWneGwCmJVBYcRx.jpg",
    category: "Destinos",
    date: "15 Jan 2026"
  },
  {
    id: 2,
    title: "Serra Gaúcha: vinícolas e experiências únicas",
    excerpt: "Um guia completo para aproveitar o melhor da região serrana do Rio Grande do Sul.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ImYicCgyeERQbRNm.jpg",
    category: "Roteiros",
    date: "10 Jan 2026"
  },
  {
    id: 3,
    title: "Como economizar até 60% em hospedagem",
    excerpt: "Dicas práticas para viajar mais gastando menos com a assinatura RDC.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/dtVwkyALqxKTftZh.jpg",
    category: "Dicas",
    date: "05 Jan 2026"
  },
  {
    id: 4,
    title: "Chapada Diamantina: aventura e natureza",
    excerpt: "Trilhas, cachoeiras e paisagens espetaculares no coração da Bahia.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/tVQGjOywLFbspfyI.jpg",
    category: "Aventura",
    date: "01 Jan 2026"
  },
  {
    id: 5,
    title: "Pantanal: o santuário da vida selvagem",
    excerpt: "Conheça o maior ecossistema alagado do mundo e sua fauna incrível.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/kLTGHUyyAHMCuMQP.jpg",
    category: "Natureza",
    date: "28 Dez 2025"
  },
  {
    id: 6,
    title: "Viagem em família: como planejar férias perfeitas",
    excerpt: "Guia completo para organizar viagens inesquecíveis com crianças.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/dtVwkyALqxKTftZh.jpg",
    category: "Família",
    date: "20 Dez 2025"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Blog de Viagens | Dicas, Destinos e Roteiros"
        description="Dicas de viagem, roteiros exclusivos e destinos imperdíveis no Brasil e no mundo. Inspire-se para planejar sua próxima jornada com o blog da RDC Viagens!"
        keywords="blog viagens, dicas de viagem, destinos turísticos, roteiros viagem, economia hospedagem, turismo Brasil, RDC blog"
        canonical="/blog"
      />
      <Header />
      
      {/* Hero */}
      <section className="relative pt-29 pb-16 md:pt-34 md:pb-20 bg-gradient-to-br from-[#00148A] to-[#001070]">
        <div className="container">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#FF9100] text-white border-0">Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Inspire-se para sua próxima <span className="text-[#FF9100]">viagem</span>
            </h1>
            <p className="text-xl text-[#C7E5F3]">
              Dicas, roteiros e histórias para ajudar você a planejar <strong>experiências inesquecíveis</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-20 bg-white">
        <AnimateOnScroll variant="fade">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="border-0 shadow-lg overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#FF9100] text-white border-0">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#777777] mb-3">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 group-hover:text-[#001A9E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#555555] mb-4">{post.excerpt}</p>
                  <span className="text-[#FF9100] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Descobrir mais <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </AnimateOnScroll>
      </section>

      <Footer />
    </div>
  );
}
