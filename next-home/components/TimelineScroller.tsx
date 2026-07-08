"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Rocket, TrendingUp, Handshake, Plane, Users, Building2, Star, Trophy, Globe, ChevronLeft, ChevronRight } from "lucide-react";

const timeline = [
  { year: "1991", title: "Fundação", description: "Início das atividades e criação da RDC.", icon: Rocket, accent: "blue" as const },
  { year: "1993–1994", title: "Primeira grande virada", description: "Lançamento da primeira Assinatura de Viagens RDC e lançamento do Projeto Caixatur. Escala inicial: +4.000 assinantes, +150 hotéis, +30 mil diárias atendidas.", icon: TrendingUp, accent: "orange" as const },
  { year: "1997", title: "Parcerias de peso", description: "Convênio RDC–FENAG e parceria com o Banco da Amazônia (Plano Amazônia Férias).", icon: Handshake, accent: "blue" as const },
  { year: "2001–2002", title: "Inovação + reconhecimento", description: "Criação do Viaje Bem pelo Brasil (plano + passagem aérea) e parceria RDC + Vasp. Prêmio Top de Turismo (ADVB).", icon: Plane, accent: "orange" as const },
  { year: "2008", title: "Consolidação de escala", description: "RDC chega a +40 mil assinantes.", icon: Users, accent: "blue" as const },
  { year: "2009", title: "Agência do assinante", description: "RDC Viagens se firma como agência do assinante.", icon: Building2, accent: "orange" as const },
  { year: "2017", title: "Novo patamar", description: "RDC ultrapassa +70 mil assinantes e +100 mil diárias entregues.", icon: TrendingUp, accent: "blue" as const },
  { year: "2019", title: "Reposicionamento", description: "Evolução para Assinatura de Viagens RDC (“A Assinatura do Viajante”).", icon: Star, accent: "orange" as const },
  { year: "2019", title: "Excelência reconhecida", description: "Conquista do selo RA 1000 (Reclame Aqui).", icon: Trophy, accent: "blue" as const },
  { year: "2022", title: "Marco histórico", description: "RDC atinge: +100 mil assinantes, +70 mil reservas, +250 mil diárias utilizadas, +2 mil hotéis parceiros, +400 cidades atendidas, +400 RDCLovers.", icon: Globe, accent: "orange" as const },
];

export function TimelineScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => { el.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, [checkScroll]);

  const scrollToItem = (index: number) => {
    setActiveIndex(index);
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (child) {
      const pos = child.offsetLeft - el.offsetLeft - el.clientWidth / 2 + child.clientWidth / 2;
      el.scrollTo({ left: pos, behavior: "smooth" });
    }
  };
  const move = (dir: "left" | "right") =>
    scrollToItem(dir === "right" ? Math.min(activeIndex + 1, timeline.length - 1) : Math.max(activeIndex - 1, 0));

  return (
    <div className="relative">
      {canScrollLeft && (
        <button onClick={() => move("left")} aria-label="Anterior" className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-[#D6D6D6] items-center justify-center hover:bg-[#F6F6F6] transition-all"><ChevronLeft className="w-6 h-6 text-[#001A9E]" /></button>
      )}
      {canScrollRight && (
        <button onClick={() => move("right")} aria-label="Próximo" className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-[#D6D6D6] items-center justify-center hover:bg-[#F6F6F6] transition-all"><ChevronRight className="w-6 h-6 text-[#001A9E]" /></button>
      )}
      {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F6F6F6] to-transparent z-10 pointer-events-none" />}
      {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F6F6F6] to-transparent z-10 pointer-events-none" />}

      <div ref={scrollRef} className="flex gap-0 overflow-x-auto pb-6 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {timeline.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          const isBlue = item.accent === "blue";
          return (
            <div key={index} className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group" onClick={() => scrollToItem(index)}>
              <div className="relative flex flex-col items-center">
                <div className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${isActive ? (isBlue ? "bg-[#001A9E] text-white shadow-lg" : "bg-[#FF9100] text-white shadow-lg") : "bg-[#F0F0F0] text-[#777777] group-hover:bg-[#D6D6D6]"}`}>{item.year}</div>
                <div className="flex flex-col items-center my-3">
                  <div className={`w-0.5 h-5 ${isActive ? (isBlue ? "bg-[#00B4D8]" : "bg-[#FF9100]") : "bg-[#D6D6D6]"}`} />
                  <div className={`w-4 h-4 rounded-full border-[3px] transition-all ${isActive ? (isBlue ? "border-[#001A9E] bg-[#E8F4FA] scale-125" : "border-[#FF9100] bg-[#FFF0D6] scale-125") : "border-[#D6D6D6] bg-white"}`} />
                  <div className={`w-0.5 h-5 ${isActive ? (isBlue ? "bg-[#00B4D8]" : "bg-[#FF9100]") : "bg-[#D6D6D6]"}`} />
                </div>
              </div>
              <div className={`mx-2 rounded-2xl px-5 py-4 transition-all border min-h-[150px] flex flex-col ${isActive ? (isBlue ? "bg-[#F6F6F6] border-[#8ECAE6] shadow-lg" : "bg-[#FFF8EB] border-[#FFCC80] shadow-lg") : "bg-[#F6F6F6]/80 border-[#E8E8E8] group-hover:bg-white group-hover:shadow-md"}`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? (isBlue ? "bg-[#001A9E] text-white" : "bg-[#FF9100] text-white") : "bg-[#D6D6D6]/80 text-[#999999]"}`}><Icon className="w-4 h-4" /></div>
                  <h3 className={`font-bold text-[15px] leading-snug ${isActive ? (isBlue ? "text-[#001070]" : "text-[#CC7400]") : "text-[#2D2D2D]"}`}>{item.title}</h3>
                </div>
                <div className={`w-8 h-[2px] rounded-full mb-3 ${isActive ? (isBlue ? "bg-[#00B4D8]" : "bg-[#FF9100]") : "bg-[#D6D6D6]"}`} />
                <p className={`text-[13px] leading-[1.7] flex-1 ${isActive ? "text-[#404040]" : "text-[#777777]"}`}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {timeline.map((item, index) => (
          <button key={index} onClick={() => scrollToItem(index)} aria-label={`Ir para ${item.year}`} className={`rounded-full transition-all ${index === activeIndex ? (item.accent === "blue" ? "w-8 h-2.5 bg-[#001A9E]" : "w-8 h-2.5 bg-[#FF9100]") : "w-2.5 h-2.5 bg-[#D6D6D6] hover:bg-[#999999]"}`} />
        ))}
      </div>
      <p className="text-center text-sm text-[#999999] mt-3 flex items-center justify-center gap-2"><ChevronLeft className="w-3.5 h-3.5" />Deslize para explorar<ChevronRight className="w-3.5 h-3.5" /></p>
    </div>
  );
}
