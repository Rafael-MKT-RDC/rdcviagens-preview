/**
 * Camada de envio de leads (seam para a API dos devs).
 *
 * HOJE: os formulários usam o embed oficial do RD Station (components/RDStationForm.tsx).
 * FUTURO (pedido dos devs por segurança): o formulário deve postar num back-end DELES,
 * que valida e repassa o lead ao RD Station — em vez de o front falar direto com o RD.
 *
 * Este arquivo prepara essa troca sem quebrar nada: quando os devs fornecerem o endpoint,
 * basta definir NEXT_PUBLIC_LEADS_API e trocar o <RDStationForm/> de uma página por um
 * formulário nativo que chame submitLead(). Enquanto NEXT_PUBLIC_LEADS_API não existir,
 * o modo continua "rdstation" (embed atual).
 */
export type LeadPayload = Record<string, string | number | boolean | undefined>;

export const LEADS_MODE: "rdstation" | "devapi" =
  process.env.NEXT_PUBLIC_LEADS_API ? "devapi" : "rdstation";

/** Envia um lead para a API do time dev (quando configurada). Retorna ok/erro. */
export async function submitLead(
  formKey: string,
  payload: LeadPayload
): Promise<{ ok: boolean; status?: number; error?: string }> {
  const api = process.env.NEXT_PUBLIC_LEADS_API;
  if (!api) return { ok: false, error: "NEXT_PUBLIC_LEADS_API não configurada (spec dos devs pendente)." };
  try {
    const r = await fetch(api.replace(/\/$/, "") + "/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: formKey, ...payload }),
    });
    return { ok: r.ok, status: r.status };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
