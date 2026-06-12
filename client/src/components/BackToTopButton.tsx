import { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

    setIsVisible(scrollTop > 400);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle progress
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-6 left-4 md:left-6 z-50 group transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
        {/* Circular progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 48 48"
        >
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="rgba(0, 26, 158, 0.15)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="#FF9100"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Button body */}
        <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-[#001A9E] group-hover:bg-[#001070] rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
}
