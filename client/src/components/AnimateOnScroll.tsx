import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "zoom-in" | "scale-up";

interface AnimateOnScrollProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  className = "",
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getInitialStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      opacity: 0,
      transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    };

    switch (variant) {
      case "fade-up":
        return { ...base, transform: "translateY(30px)" };
      case "fade-down":
        return { ...base, transform: "translateY(-30px)" };
      case "fade-left":
        return { ...base, transform: "translateX(-30px)" };
      case "fade-right":
        return { ...base, transform: "translateX(30px)" };
      case "fade":
        return { ...base, transform: "none" };
      case "zoom-in":
        return { ...base, transform: "scale(0.95)" };
      case "scale-up":
        return { ...base, transform: "scale(0.9)" };
      default:
        return base;
    }
  };

  const getVisibleStyles = (): React.CSSProperties => ({
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1)",
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? getVisibleStyles() : getInitialStyles()}
    >
      {children}
    </div>
  );
}

/** Stagger wrapper: wraps multiple AnimateOnScroll children with incremental delays */
interface StaggerProps {
  children: ReactNode[];
  variant?: AnimationVariant;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  variant = "fade-up",
  staggerDelay = 100,
  baseDelay = 0,
  duration = 600,
  className = "",
}: StaggerProps) {
  return (
    <>
      {children.map((child, index) => (
        <AnimateOnScroll
          key={index}
          variant={variant}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          className={className}
        >
          {child}
        </AnimateOnScroll>
      ))}
    </>
  );
}
