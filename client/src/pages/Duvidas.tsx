import { useState } from "react";
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
const faqCategories = [
  {
    name: "Sobre a Assinatura",
    faqs: [
      {
        question: "O que é e como funciona a assinatura de viagens?",
        answer: "A assinatura da RDC Viagens funciona da seguinte forma: você efetua a assinatura por um preço mensal de acordo com o plano escolhido. O plano te concede diárias, que podem ser revertidas em hospedagens no Brasil e no Exterior, compra de passagens aéreas e vários outros serviços turísticos. A assinatura da RDC Viagens ainda oferece:\n\n– Tarifas Exclusivas para diárias extras;\n– Clube de Vantagens, uma rede de descontos em lojas parceiras;\n– Indique e Ganhe, um programa de indicação;\n– Pointback em reservas;\n– Assessoria completa para sua viagem."
      },
      {
        question: "Quais as vantagens de possuir uma assinatura com a RDC Viagens?",
        answer: "Confiança: A RDC Viagens é a primeira empresa de assinatura de viagem no país, e está no mercado há mais de 35 anos levando mais de 100 mil assinantes a destinos no Brasil e no mundo.\n\nEstilo de vida: Com a recorrência, você pode usar a assinatura de forma flexível: para onde, quando e quantas vezes desejar.\n\nPlanejamento: A assinatura permite que você organize suas finanças e seu tempo, para que você desenvolva o hábito de viajar.\n\nAtendimento humanizado: A RDC oferece assessoria completa de viagem, prestando consultoria especializada e personalizada aos assinantes."
      },
      {
        question: "Quais são os serviços turísticos que posso utilizar com a assinatura?",
        answer: "A assinatura da RDC Viagens contempla utilização em hospedagens nacionais e internacionais, passagens aéreas, pacotes de viagem, cruzeiros, aluguel de carros, ingressos e passeios, traslados e seguro viagem."
      },
      {
        question: "Como assinar um plano da RDC Viagens?",
        answer: "A RDC disponibiliza três formas para que você possa realizar a assinatura:\n\nOnline: Acesse o site www.rdcviagens.com.br > Assine agora\n\nTelevendas: No 0800-0552600 ou no chat acessando o site www.rdcviagens.com.br > Olá, posso ajudar? > Não sou assinante, de segunda a sexta-feira, das 9h às 19h\n\nRepresentantes Comerciais: Localize o escritório próximo a sua região através do www.rdcviagens.com.br/contato e fale com um de nossos representantes."
      },
      {
        question: "Quais são os planos disponíveis para adesão e o que eles oferecem?",
        answer: "Os planos disponíveis para assinatura são:\n\nPlano Gold: oferece 7 diárias que podem ser usadas em qualquer serviço turístico oferecido pela RDC num prazo de 12 meses, sendo possível a prorrogação; uso imediato de tarifas exclusivas e de alguns serviços turísticos; pagamentos sem comprometer o limite do cartão de crédito; assessoria e consultoria completa para sua viagem.\n\nÉ possível assinar até 04 planos por CPF e ter até 28 diárias à sua disposição."
      },
      {
        question: "Quanto tempo após a assinatura posso começar utilizar meu plano?",
        answer: "O prazo de carência é de 40 dias a partir do pagamento da primeira mensalidade. Se você adquiriu um plano que há valor de adesão, também é preciso que este esteja quitado.\n\nImportante: uma vez cumprida a carência, ela não será aplicada novamente para novos planos adquiridos em um mesmo CPF."
      },
      {
        question: "Como sei qual é o período de utilização da minha assinatura?",
        answer: "O período de utilização da sua assinatura sempre tem início no 1º dia do mês do primeiro pagamento, independente da data escolhida para o pagamento da mensalidade.\n\nPara consultar o seu período de utilização acesse www.rdcviagens.com.br > Já sou Assinante > Faça o login. No menu superior, no canto direito, clique em \"Meus Planos\". Nesta página você poderá consultar o período de utilização vigente e o seu saldo de diárias."
      },
      {
        question: "Onde consulto meu saldo disponível de diárias?",
        answer: "Você pode consultar o saldo de suas diárias disponíveis no Portal do Assinante, através do www.rdcviagens.com.br > Já sou Assinante > Faça o login. O saldo das diárias é demonstrado na página principal ou em Menu > Meus planos.\n\nVocê também pode consultar suas diárias no Chat, através do www.rdcviagens.com.br > Olá, posso ajudar? > Sim, sou assinante, realize o login e selecione a opção 2 do menu principal."
      },
      {
        question: "Qual o prazo para utilizar as diárias do meu plano?",
        answer: "As diárias do período vigente equivalem a um período de 12 meses. E caso elas não sejam utilizadas durante este período vigente, elas serão prorrogadas para uso por mais meses, de acordo com o plano contratado.\n\nImportante: Para que as diárias vigentes sejam prorrogadas é necessário que o pagamento das mensalidades estejam regulares. E, diárias prorrogadas não podem ser prorrogadas novamente."
      },
      {
        question: "O que acontece se eu não utilizar as diárias durante o período vigente e prorrogado?",
        answer: "Neste caso, as diárias vencem e não poderão ser prorrogadas novamente ou utilizadas."
      },
      {
        question: "Quando ocorrerá a renovação do meu plano?",
        answer: "A assinatura da RDC é recorrente, ou seja, os planos são renovados automaticamente após o término do período vigente.\n\nExemplo: Se a contratação do plano foi no dia 01/02/2024 as diárias serão válidas até 31/01/2025 e a renovação ocorrerá exatamente no dia 01/02/2025."
      },
      {
        question: "Como atualizar os meus dados cadastrais?",
        answer: "Atualizações de estado civil, endereço residencial e comercial, podem ser realizadas através do www.rdcviagens.com.br > Já sou assinante > Menu > Meus dados.\n\nCaso necessite atualizar outros dados como e-mail, telefone, nome, data de nascimento ou número de documento, é necessário entrar em contato com a Central de Atendimento, que está disponível de segunda a sexta-feira, das 8h às 19h e aos sábados, das 8h às 14h – exceto feriados nos telefones:\n\n+55 (11) 4003-4910 – Capitais e Regiões Metropolitanas (Telefone fixo ou celular – Ligação tarifada como local)\n0800-878-0800 – Demais localidades (Somente telefone fixo – Ligação gratuita)"
      },
      {
        question: "Posso transferir a titularidade da minha assinatura?",
        answer: "Sim. Para isso, é necessário entrar em contato com nossa Central de Atendimento, que dará instruções sobre os documentos necessários para a transferência. Após o envio, nosso time analisará as informações e dará uma devolutiva ao atual titular da assinatura."
      },
      {
        question: "Quero cancelar minha assinatura. Como faço?",
        answer: "A solicitação de cancelamento deve ser feita através da Central de Atendimento, disponível de segunda a sexta-feira, das 8h às 19h – exceto feriados nos telefones:\n\n+55 (11) 4003-4910 – Capitais e Regiões Metropolitanas (Telefone fixo ou celular – Ligação tarifada como local)\n0800-878-0800 – Demais localidades (Somente telefone fixo – Ligação gratuita)"
      }
    ]
  },
  {
    name: "Reservas",
    faqs: [
      {
        question: "Como eu faço uma reserva?",
        answer: "Existem 2 formas para você pesquisar ou reservar algum de nossos serviços utilizando sua assinatura.\n\nReserva On-line: Basta acessar o www.rdcviagens.com.br, e clicar em \"Portal do Assinante\" no canto superior direito. Após realizar o login, será mostrado na barra superior os serviços disponíveis para reserva. Escolha o serviço, e utilize o Buscador, inserindo as informações necessárias para a pesquisa ou o ícone \"Falar com o especialista\" de acordo com o serviço escolhido.\n\nCentral de Atendimento: Você pode falar com nosso time de atendimento através do Chat no www.rdcviagens.com.br ou no Telefone através do 4003-4910, para ligações de capitais e regiões metropolitanas (custo de ligação local) ou 0800-8780800, para localidades fora das capitais e regiões metropolitanas e originadas de telefone fixo (ligação gratuita). O atendimento está disponível de segunda a sexta-feira das 08 às 19h, e aos sábados das 08 às 14h."
      },
      {
        question: "Quais informações preciso para fazer uma reserva?",
        answer: "Para fazer sua pesquisa basta ter o destino, uma previsão de data e a quantidade de adultos e crianças que realizarão a viagem. E para finalizar a reserva, é necessário nome completo e data de nascimento de todos os viajantes."
      },
      {
        question: "Há limite de quantidade de apartamentos por reserva de hospedagem?",
        answer: "Sim. As reservas estão limitadas ao máximo de 04 apartamentos por assinante/CPF e sujeitas à disponibilidade junto aos hotéis e pousadas."
      },
      {
        question: "Onde posso acompanhar, alterar ou cancelar minha reserva?",
        answer: "Você pode realizar acompanhamentos e solicitar alteração ou cancelamento da reserva através do Portal do Assinante. Acesse o www.rdcviagens.com.br > Já sou assinante. Após realizar seu login, clique no menu localizado no canto superior direito e escolha a opção \"Minhas Reservas\". Será apresentado o histórico de reservas. Selecione a reserva que você deseja modificar e preencha os campos indicados."
      },
      {
        question: "Qual o prazo para alterações e cancelamentos?",
        answer: "É necessário comunicar a alteração ou o cancelamento da reserva com o máximo de antecedência da data de entrada no hotel à RDC. Pois, os prazos de alteração ou cancelamento variam de acordo com as regras do serviço contratado (é reembolsável ou não reembolsável). Sempre confirme essas informações no ato da reserva, e no caso de solicitação de alteração e cancelamento, aguarde a análise do nosso time."
      },
      {
        question: "Quando receberei o voucher da minha viagem?",
        answer: "O voucher será encaminhado para o e-mail de cadastro do assinante de 3 a 10 dias antes da data da entrada na hospedagem. Neste mesmo prazo, o voucher também estará disponível para impressão ou consulta no Portal do Assinante. Acesse www.rdcviagens.com.br > Já sou Assinante. Após realizar seu login, clique no menu localizado no canto superior direito e escolha a opção \"Minhas Reservas\", escolha a viagem e acesse o voucher."
      },
      {
        question: "Com quanto tempo de antecedência posso reservar minha viagem?",
        answer: "O calendário fica disponível para reservas com 12 meses de antecedência. O quanto antes a reserva for realizada, será possível encontrar mais disponibilidade e valores menores."
      },
      {
        question: "Posso fazer reserva durante o período de carência do meu plano?",
        answer: "Para que você possa utilizar suas diárias como forma de pagamento, é necessário que data da viagem seja após o término do período da carência. Entretanto, você pode reservar durante o período da carência utilizando o benefício da nossa tarifa exclusiva para assinantes RDC, e o pagamento da reserva será através de recursos próprios."
      },
      {
        question: "Se minhas diárias não forem suficientes para pagar minha reserva. O que eu faço?",
        answer: "Você pode utilizar suas diárias e pontos para pagamento parcial da reserva, e o restante você pode utilizar recursos próprios através das opções de pagamento disponibilizadas no ato da reserva, independente se ela está sendo realizada através da plataforma de reserva online ou pelo time de atendimento.\n\nAgora, se você não possui mais diárias disponíveis para o pagamento da reserva, você pode adquirir diárias extras ou utilizar a tarifa exclusiva para fazer sua viagem."
      },
      {
        question: "Posso fazer uma reserva com minha assinatura para outra pessoa viajar?",
        answer: "Pode sim, mas é necessário indicar quem é esta pessoa na hora da reserva, para que a viagem seja agendada e o voucher seja emitido corretamente."
      },
      {
        question: "Qual a diferença entre baixa e alta temporada?",
        answer: "A baixa temporada é o período em que há uma menor procura pelos serviços turísticos e também uma menor ocupação hoteleira. O período de alta temporada é quando há uma maior procura pelos serviços turísticos e maior ocupação hoteleira.\n\nNo Brasil, a alta temporada acontece nos meses de janeiro, fevereiro, julho e dezembro. Também é considerada alta temporada feriados prolongados, datas comemorativas ou eventos regionais."
      },
      {
        question: "O que é \"no show\"?",
        answer: "\"No show\" é o não comparecimento do hóspede no dia de sua entrada na hospedagem. Também pode ser considerado \"no show\" a saída antecipada do hotel, ou o cancelamento e alteração fora do prazo informado pelo hotel, que implica na cobrança de multa, de acordo com a política da hospedagem."
      },
      {
        question: "Se acontecer um \"no show\", como ele é cobrado?",
        answer: "As diárias referentes ao \"no show\" serão debitadas da assinatura, e os valores adicionais cobrados pelo hotel não serão ressarcidos. No caso de saída do hotel antes do término da hospedagem, implicará na perda das diárias e de eventuais valores que estiverem inclusos como refeições, cama extra ou outros serviços.\n\nEm caso de \"no show\", a cobrança é aplicada tanto na utilização das diárias da assinatura como da tarifa exclusiva."
      },
      {
        question: "O que é Point Back?",
        answer: "Pointback são os pontos devolvidos em forma de troco, quando uma reserva utiliza mais diárias da assinatura do que quantidade necessária para o pagamento da hospedagem, gerando desta forma uma fração de diária a ser devolvida. Estes pontos podem ser utilizados em reservas futuras, em qualquer produto ou serviço disponível na assinatura."
      }
    ]
  },
  {
    name: "Portal do Assinante",
    faqs: [
      {
        question: "Como faço para acessar o Portal do Assinante?",
        answer: "O Portal do Assinante pode ser acessado através do site www.rdcviagens.com.br > Já sou assinante. Para realizar o login insira o e-mail cadastrado na RDC viagens e a senha enviada por e-mail logo após a assinatura. Se você não recebeu a senha, entre em contato com nossa Central de Atendimento para o suporte."
      },
      {
        question: "Estou acessando o Portal do Assinante pela primeira vez. Como devo proceder?",
        answer: "Ao se tornar um assinante da RDC viagens, você recebe uma senha provisória para seu primeiro acesso no e-mail informado no cadastro. Então, acesse www.rdcviagens.com.br > Já sou assinante, inclua no campo \"login\" seu e-mail e no campo \"senha\", a senha recebida. E pronto!\n\nCaso não tenha recebido sua senha, acesse www.rdcviagens.com.br > Já sou assinante > Cadastre-se. Insira o número do CPF do titular da assinatura e o número do plano que consta em seu contrato e clique em \"Enviar\". Você receberá um novo e-mail para redefinir sua senha. Clique no link, e crie uma nova senha respeitando as instruções fornecidas.\n\nImportante: caso você não possua o número do seu plano, entre em contato com seu Representante Comercial ou com nossa Central de Atendimento."
      },
      {
        question: "Como faço para alterar a senha?",
        answer: "Se você já possui uma senha, mas deseja realizar a alteração, acesse www.rdcviagens.com.br > Já sou assinante > Faça o login > Menu > Alterar senha.\n\nSe você esqueceu sua senha, acesse www.rdcviagens.com.br > Já sou assinante > Insira seu e-mail e clique no campo indicado em \"Esqueceu sua senha\". Você receberá um novo e-mail para redefinir sua senha. Clique no link, e crie uma nova senha respeitando as instruções fornecidas."
      }
    ]
  },
  {
    name: "Pagamentos",
    faqs: [
      {
        question: "Quais são as formas disponíveis para pagamento da mensalidade?",
        answer: "Você pode realizar o pagamento da mensalidade através de cartão de crédito ou débito em conta."
      },
      {
        question: "Como faço para alterar a forma de pagamento da assinatura?",
        answer: "Para alterar a forma de pagamento de sua assinatura, acesse o Portal do Assinante através do www.rdcviagens.com.br > Já sou assinante > Menu > Formas de Pagamento. Selecione o plano, e escolha a opção que deseja alterar – pode ser a forma de pagamento ou a atualização dos dados bancários."
      },
      {
        question: "Como faço para acompanhar os pagamentos da minha assinatura?",
        answer: "Você pode acessar o Portal do Assinante através do www.rdcviagens.com.br > Já sou assinante > Menu > Meus Pagamentos. Lá você encontrará todas as informações sobre o histórico de pagamentos e também realizar regularização de mensalidades."
      },
      {
        question: "O pagamento da mensalidade é por débito em conta, mas o débito não está ocorrendo. Como resolver?",
        answer: "Primeiro, confira se seus dados bancários estão corretos no Portal do Assinante, através do www.rdcviagens.com.br > Já sou assinante > Menu > Meus Pagamentos.\n\nCaso seus dados estejam corretos, mas seu banco seja Itaú, Caixa Econômica Federal e Banco do Brasil, é necessária a autorização do débito junto ao banco."
      },
      {
        question: "O pagamento da mensalidade está atrasado. Como faço para regularizar?",
        answer: "Você pode regularizar seus pagamentos no Portal do Assinante através do www.rdcviagens.com.br > Já sou assinante > Menu > Meus Pagamentos. Ao acessar seu histórico de pagamentos, selecione a mensalidade que você deseja regularizar. Em seguida, escolha pagar com boleto ou cartão de crédito e conclua a transação. Pronto! Agora é só aguardar o processamento do seu banco."
      }
    ]
  },
  {
    name: "Programa Indique e Ganhe",
    faqs: [
      {
        question: "O que é o programa Indique e Ganhe?",
        answer: "O Indique e Ganhe é um programa de indicação e recompensa aos assinantes RDC. Então, você indica quantas pessoas quiser – pode ser amigos, familiares, colegas do trabalho; e a cada indicação convertida em um novo assinante, você ganha pontos que podem ser acumulados e utilizados nos serviços turísticos oferecidos pela RDC.\n\nVocê também pode saber mais sobre o programa no http://rdcindiqueganhe.com.br"
      },
      {
        question: "Como fazer uma indicação?",
        answer: "Basta acessar o Portal do Assinante no www.rdcviagens.com.br > Já sou assinante > Menu > Convide Amigos. Você será redirecionado ao hotsite do Indique e Ganhe. Em seguida, preencha o formulário com os dados da pessoa indicada e clique em enviar.\n\nVocê também pode fazer suas indicações diretamente no hotsite do Indique e Ganhe no http://rdcindiqueganhe.com.br, na Central de Atendimento ou com seu Representante Comercial."
      },
      {
        question: "Como saber se ganhei recompensa por alguma indicação realizada?",
        answer: "Assim que o sistema registrar que a pessoa indicada efetuou o pagamento da primeira mensalidade, os pontos são automaticamente creditados em seu cadastro. Então, no Portal do Assinante no www.rdcviagens.com.br > Já sou assinante > Menu > Pontos, você encontra o status das suas indicações, os pontos acumulados e suas validades.\n\nCabe mencionar que os pontos são gerados por número de CPF e não por quantidade de planos adquiridos pela pessoa indicada."
      },
      {
        question: "Como posso usar os pontos?",
        answer: "Os pontos do Indique e Ganhe podem ser utilizados como pagamento parcial ou integral de qualquer serviço turístico oferecido pela RDC.\n\nFique atento: eles valem por 24 meses, contados a partir da data em que foram creditados."
      }
    ]
  },
  {
    name: "Clube de Vantagens",
    faqs: [
      {
        question: "O que é o Clube de Vantagens?",
        answer: "O Clube de Vantagens é um benefício disponível aos assinantes da RDC Viagens, que oferece descontos exclusivos em produtos e serviços de empresas parceiras.\n\nPara resgatar os cupons de desconto, acesse www.rdcviagens.com.br > Já sou Assinante > Faça o login > Clube de Vantagens, localize o produto ou serviço desejado e clique em Aproveite. Abrirá uma nova janela com o cupom de desconto ou hotsite da empresa parceira para a utilização."
      }
    ]
  }
];

export default function Duvidas() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
        title="Dúvidas Frequentes (FAQ) | RDC Viagens"
        description="Tire suas dúvidas sobre a assinatura RDC Viagens. Perguntas frequentes sobre planos, reservas, pagamentos, portal do assinante e programa de indicação."
        keywords="dúvidas RDC, FAQ viagens, perguntas frequentes, como funciona assinatura, reservas RDC"
        canonical="https://rdcviagens.com.br/duvidas"
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
