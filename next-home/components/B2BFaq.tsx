"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function B2BFaq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((faq, i) => <FaqItem key={i} {...faq} />)}
    </div>
  );
}
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#D6D6D6] rounded-2xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F6F6F6] transition-colors">
        <span className="font-medium text-[#2D2D2D] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#777777] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-5 pb-5 text-[#555555] leading-relaxed">{answer}</div>}
    </div>
  );
}
