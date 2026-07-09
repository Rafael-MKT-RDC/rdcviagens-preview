"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { B2BLeadForm } from "@/components/B2BLeadForm";
import { RD_FORMS } from "@/lib/rdstation";
import { B2BFaq } from "@/components/B2BFaq";
import { Handshake, Check, ArrowLeft, ArrowRight, Users, Zap, Building2, Landmark, Globe, Rocket, DollarSign, Network } from "lucide-react";

const heroImg = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80";
const valueProps = [
  { icon: Network, title: "Diferencie sua oferta", description: "Agregue viagens ao portfólio da sua empresa e ofereça algo que seu público realmente valoriza — sem precisar criar nada do zero." },
  { icon: DollarSign, title: "Gere receita recorrente", description: "Cada pessoa da sua base que se torna assinante RDC gera comissão para você. Um modelo de receita adicional, sem investimento em infraestrutura." },
  { icon: Rocket, title: "Engaje e fidelize sua base", description: "Viagens criam conexão emocional. Oferecer esse benefício fortalece o vínculo com seu público e aumenta a retenção." },
  { icon: Zap, title: "Zero complexidade operacional", description: "A RDC cuida de toda a operação: plataforma, atendimento, reservas e pós-venda. Você foca no que faz de melhor." },
];
const partnerProfiles = [
  { icon: Landmark, title: "Bancos e Instituições Financeiras", description: "Imagine seus correntistas viajando com desconto exclusivo pelo seu relacionamento com o banco. Viagens vinculadas a cartões, contas e programas de pontos que aumentam retenção e engajamento.", opportunities: ["Benefício vinculado a cartões premium", "Programa de pontos com conversão em viagens", "Oferta exclusiva para correntistas", "Ações de cross-sell e up-sell"] },
  { icon: Building2, title: "Empresas e Corporações", description: "Ofereça viagens como benefício exclusivo para colaboradores ou como ferramenta de relacionamento com clientes. Um diferencial que ninguém mais oferece.", opportunities: ["Benefício corporativo diferenciado", "Campanhas de incentivo e premiação", "Programas de fidelização de clientes", "Ações de endomarketing"] },
  { icon: Users, title: "Entidades e Associações", description: "Dê aos seus associados um motivo a mais para valorizar a filiação. Viagens com condições exclusivas que só quem é associado tem acesso.", opportunities: ["Benefício exclusivo para associados", "Condições diferenciadas por convênio", "Fortalecimento do valor da associação", "Ações conjuntas de comunicação"] },
  { icon: Globe, title: "Plataformas e Marketplaces", description: "Adicione viagens ao seu ecossistema digital. Integração via API ou white-label para que seus usuários reservem viagens sem sair da sua plataforma.", opportunities: ["Integração via API ou white-label", "Viagens como serviço dentro da plataforma", "Aumento de recorrência e lifetime value", "Co-branding e ações conjuntas"] },
];
const howItWorks = [
  { step: "01", title: "Alinhamento estratégico", description: "Entendemos o seu negócio, sua base de clientes e seus objetivos para desenhar o modelo de parceria ideal." },
  { step: "02", title: "Proposta personalizada", description: "Apresentamos uma proposta comercial sob medida, com modelo de remuneração, escopo e cronograma definidos." },
  { step: "03", title: "Integração e ativação", description: "Implementamos a integração técnica e comercial, com treinamento, materiais e suporte dedicado." },
  { step: "04", title: "Gestão e crescimento", description: "Acompanhamos os resultados com relatórios periódicos e trabalhamos juntos para escalar a parceria." },
];
const faqs = [
  { question: "Qual o modelo de remuneração para parceiros?", answer: "Trabalhamos com modelos flexíveis de remuneração que podem incluir comissão por assinatura gerada, revenue share recorrente ou fee fixo por ativação, dependendo do perfil da parceria e do volume projetado. O modelo é definido na proposta comercial personalizada." },
  { question: "É necessário investimento inicial do parceiro?", answer: "Não. A RDC assume toda a operação de viagens, plataforma e suporte ao cliente final. O parceiro entra com o canal de distribuição e o relacionamento com sua base. Não há custo de implementação para o parceiro." },
  { question: "Como funciona a integração técnica?", answer: "Oferecemos diferentes níveis de integração: desde modelos simples com landing pages co-branded até integrações via API para plataformas que desejam oferecer viagens dentro do próprio ambiente digital. Nossa equipe técnica acompanha todo o processo." },
  { question: "Qual o prazo para ativação de uma parceria?", answer: "O prazo varia conforme a complexidade da integração. Modelos mais simples (landing page, cupom exclusivo) podem ser ativados em 2 a 4 semanas. Integrações via API ou white-label têm cronograma definido caso a caso." },
  { question: "A RDC oferece suporte de marketing para o parceiro?", answer: "Sim. Disponibilizamos materiais de comunicação, apoio na criação de campanhas, treinamento para equipes comerciais e suporte contínuo para maximizar os resultados da parceria." },
  { question: "Como é feito o acompanhamento dos resultados?", answer: "Fornecemos relatórios periódicos com métricas de performance: número de leads, conversões, assinaturas ativadas, receita gerada e indicadores de engajamento. Realizamos reuniões de acompanhamento para otimizar os resultados." },
];
const segmentoOptions = ["Banco / Instituição Financeira", "Empresa / Corporação", "Entidade / Associação / Sindicato", "Plataforma / Marketplace", "Outro"];
const baseOptions = ["Até 1.000", "1.000 a 10.000", "10.000 a 50.000", "50.000 a 200.000", "Mais de 200.000"];

export function EmpresasParceriasClient() {
  const scrollForm = () => document.getElementById("formulario-parcerias")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="RDC Parcerias" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082B41]/95 via-[#082B41]/80 to-[#082B41]/60" />
        </div>
        <div className="container relative z-10">
          <Link href="/solucoes-corporativas"><Button variant="ghost" className="text-white hover:bg-white/10 mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Voltar para Soluções Corporativas</Button></Link>
          <div className="max-w-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/b2b/logo-parcerias-cor.svg" alt="RDC Parcerias" className="h-14 md:h-18 w-auto mb-6 drop-shadow-lg" />
            <Badge className="mb-4 bg-[#E07F00] text-white border-0"><Handshake className="w-4 h-4 mr-2" />Alianças Estratégicas</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Novas fronteiras de crescimento <span className="text-[#FF9100]">para o seu negócio</span></h1>
            <p className="text-xl text-[#F6F6F6] mb-4">Alianças estratégicas com <strong className="text-white">bancos, empresas, entidades e plataformas</strong> que buscam se diferenciar, gerar novas receitas e ampliar sua proposta de valor.</p>
            <p className="text-lg text-[#F6F6F6] mb-8">Leve o universo de viagens da RDC para a sua base — <strong>sem complexidade operacional</strong>.</p>
            <div className="flex flex-wrap gap-4"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-white px-8 rounded-full" onClick={scrollForm}>Explorar parceria<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Por que ser parceiro RDC</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Uma parceria que gera valor para os dois lados</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Amplie sua proposta de valor e gere novas receitas com a solidez de quem entende de viagens há <strong>mais de 35 anos</strong>.</p></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {valueProps.map((v, index) => { const Icon = v.icon; return (<Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"><CardContent className="pt-6"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-white" /></div><h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{v.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{v.description}</p></CardContent></Card>); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Partner profiles */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Para quem é</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Parcerias sob medida para cada segmento</h2><p className="text-lg text-[#C7D3E0] max-w-2xl mx-auto">Desenhamos o modelo ideal de acordo com o perfil e os objetivos do seu negócio.</p></div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {partnerProfiles.map((p, index) => { const Icon = p.icon; return (
                <Card key={index} className="border-0 shadow-lg"><CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4"><div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9100] to-[#E07F00] flex items-center justify-center flex-shrink-0"><Icon className="w-7 h-7 text-white" /></div><h3 className="text-xl font-bold text-[#2D2D2D]">{p.title}</h3></div>
                  <p className="text-[#555555] mb-5">{p.description}</p>
                  <ul className="space-y-2.5">{p.opportunities.map((o, i) => (<li key={i} className="flex items-start gap-3"><Check className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" /><span className="text-[#404040] text-sm">{o}</span></li>))}</ul>
                </CardContent></Card>
              ); })}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="zoom-in">
          <div className="container">
            <div className="text-center mb-16"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0">Como funciona</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Do primeiro contato ao crescimento conjunto</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {howItWorks.map((s) => (<Card key={s.step} className="border-0 shadow-lg"><CardContent className="p-6"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9100] to-[#E07F00] text-white flex items-center justify-center font-bold text-lg mb-4">{s.step}</div><h3 className="font-bold text-[#2D2D2D] mb-2">{s.title}</h3><p className="text-[#555555] text-sm leading-relaxed">{s.description}</p></CardContent></Card>))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Form */}
      <section id="formulario-parcerias" className="py-16 md:py-20 bg-[#082B41]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12"><Badge className="mb-4 bg-white/10 text-[#FF9100] border-0"><Handshake className="w-4 h-4 mr-2" />Vamos conversar</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">Vamos construir uma parceria de sucesso?</h2><p className="text-lg text-[#C7D3E0]">Preencha o formulário e nossa <strong>equipe de parcerias</strong> entrará em contato para desenhar o modelo ideal para o seu negócio.</p></div>
              <Card className="border-0 shadow-xl"><CardContent className="p-8"><B2BLeadForm rdFormId={RD_FORMS.parcerias} cargoOptions={segmentoOptions} cargoLabel="Segmento" objetivoLabel="Tamanho da base de clientes" objetivoOptions={baseOptions} showColaboradores={false} submitLabel="Explorar parceria" /></CardContent></Card>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[#F6F6F6]">
        <AnimateOnScroll variant="fade-up">
          <div className="container">
            <div className="text-center mb-12"><Badge className="mb-4 bg-[#F6F6F6] text-[#E07F00] border-0">Perguntas Frequentes</Badge><h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2D2D2D] mb-4">Dúvidas frequentes</h2><p className="text-lg text-[#555555] max-w-2xl mx-auto">Respostas para as <strong>principais perguntas sobre parcerias estratégicas</strong> com a RDC</p></div>
            <B2BFaq items={faqs} />
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#082B41] via-[#04161F] to-[#082B41] text-white">
        <AnimateOnScroll variant="fade">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Handshake className="w-16 h-16 text-[#FF9100] mx-auto mb-6" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Grandes parcerias começam com uma boa conversa</h2>
              <p className="text-lg text-[#F6F6F6] mb-8">Fale com nossa equipe de parcerias e descubra como levar o universo de viagens da RDC para a sua base de clientes.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center"><Button size="lg" className="bg-[#FF9100] hover:bg-[#E07F00] text-white px-8" onClick={scrollForm}>Explorar parceria<ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
