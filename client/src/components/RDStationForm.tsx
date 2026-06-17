import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

declare global {
  interface Window {
    RDStationForms?: new (id: string, token: string) => { createForm: () => void };
  }
}

function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.RDStationForms) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      // caso já tenha carregado antes de anexarmos o listener
      if (window.RDStationForms) resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

/**
 * Incorpora um formulário do RD Station de forma compatível com SPA.
 * O RD renderiza o HTML dentro do <div id={formId}>; o CSS do site
 * (escopo .rdc-rd-form) força o layout no padrão visual da RDC.
 */
export function RDStationForm({
  formId,
  token,
  className,
}: {
  formId: string;
  token: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !window.RDStationForms) return;
      // limpa render anterior (remontagem na SPA)
      const el = document.getElementById(formId);
      if (el) el.innerHTML = "";
      try {
        new window.RDStationForms(formId, token).createForm();
      } catch (err) {
        console.warn("[RDStationForm] falha ao criar o formulário:", err);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [formId, token]);

  return (
    <div ref={containerRef} className={className}>
      <div role="main" id={formId} />
    </div>
  );
}
