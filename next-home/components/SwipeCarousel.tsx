"use client";
import { useRef, useState, Children } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SwipeCarousel({ children, basis = "basis-[92%]", hint }: { children: React.ReactNode; basis?: string; hint?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);
  const count = items.length;

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, count - 1));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setIndex(clamped);
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    let nearest = 0, min = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < min) { min = d; nearest = i; }
    });
    setIndex(nearest);
  };

  return (
    <>
      <div ref={ref} onScroll={onScroll} className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2" style={{ scrollbarWidth: "none" }}>
        {items.map((c, i) => (<div key={i} className={`shrink-0 snap-start ${basis}`}>{c}</div>))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <button onClick={() => goTo(index - 1)} aria-label="Anterior" className="w-9 h-9 rounded-full border border-[#D6D6D6] flex items-center justify-center text-[#777777] hover:bg-[#F6F6F6] hover:text-[#404040] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (<button key={i} onClick={() => goTo(i)} aria-label={`Ir para ${i + 1}`} className={`rounded-full transition-all duration-300 ${i === index ? "w-7 h-2.5 bg-[#FF9100]" : "w-2.5 h-2.5 bg-[#D6D6D6] hover:bg-[#999999]"}`} />))}
        </div>
        <button onClick={() => goTo(index + 1)} aria-label="Próximo" className="w-9 h-9 rounded-full border border-[#D6D6D6] flex items-center justify-center text-[#777777] hover:bg-[#F6F6F6] hover:text-[#404040] transition-colors"><ChevronRight className="w-4 h-4" /></button>
      </div>
      {hint && <p className="text-center text-xs text-[#999999] mt-3">{hint}</p>}
    </>
  );
}
