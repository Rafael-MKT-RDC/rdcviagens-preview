"use client";
import { useEffect, useRef, useState } from "react";

export function AnimateOnScroll({
  children,
  className = "",
  variant = "fade-up",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "fade-up" | "zoom-in";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const vClass = variant === "zoom-in" ? "aos-zoom" : "";
  return (
    <div ref={ref} className={`aos ${vClass} ${inView ? "aos-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
