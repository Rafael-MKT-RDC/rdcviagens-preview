"use client";
import { useEffect, useRef, useState } from "react";

/** Anima o número de 0 até o valor real ao entrar em cena. Mantém prefixo/sufixo (ex.: "+200 mil", "NPS 75"). */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const m = value.match(/^(\D*)([\d.,]+)(.*)$/);
    const el = ref.current;
    if (!m || !el) { setDisplay(value); return; }
    const prefix = m[1];
    const numStr = m[2];
    const suffix = m[3];
    const target = parseInt(numStr.replace(/\D/g, ""), 10) || 0;
    setDisplay(prefix + "0" + suffix);
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = Math.round(target * eased);
          if (p < 1) { setDisplay(prefix + cur.toLocaleString("pt-BR") + suffix); requestAnimationFrame(step); }
          else setDisplay(prefix + numStr + suffix);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
