"use client";
import { useEffect, useRef } from "react";
import { RD_TOKEN } from "@/lib/rdstation";

const RD_SCRIPT = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

declare global {
  interface Window {
    RDStationForms?: new (id: string, token: string) => { createForm: () => void };
  }
}

/**
 * Embuta um formulário do RD Station pelo formId.
 * Mantém a mesma "ligação" que o site tinha (script oficial + createForm).
 */
export function RDStationForm({ formId, token = RD_TOKEN, className = "" }: { formId: string; token?: string; className?: string }) {
  const created = useRef(false);
  useEffect(() => {
    if (!formId || created.current) return;
    const build = () => {
      if (created.current) return;
      if (window.RDStationForms) {
        try {
          new window.RDStationForms(formId, token).createForm();
          created.current = true;
        } catch {
          /* noop */
        }
      }
    };
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RD_SCRIPT}"]`);
    if (existing && window.RDStationForms) {
      build();
    } else if (existing) {
      existing.addEventListener("load", build, { once: true });
    } else {
      const s = document.createElement("script");
      s.src = RD_SCRIPT;
      s.async = true;
      s.addEventListener("load", build, { once: true });
      document.body.appendChild(s);
    }
  }, [formId, token]);

  return <div role="main" id={formId} className={className} />;
}
