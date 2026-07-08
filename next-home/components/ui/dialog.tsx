"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onOpenChange]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  );
}

export function DialogContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl", className)}>
      {children}
    </div>
  );
}
export function DialogHeader({ children }: { children: React.ReactNode }) { return <div className="mb-4">{children}</div>; }
export function DialogTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn("text-xl font-bold text-[#2D2D2D]", className)}>{children}</h2>;
}
export function DialogDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-[#555555]", className)}>{children}</p>;
}
