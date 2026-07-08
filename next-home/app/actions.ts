"use server";

// Validação de newsletter NO SERVIDOR (boa prática apontada pelos devs).
// Aqui é um stub: numa produção real, este action chamaria a API interna do time
// (que alimenta o RD Station), em vez de conectar o RD Station direto do front.
export type NewsletterState = { ok: boolean; message: string };

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!nome) return { ok: false, message: "Por favor, insira seu nome." };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return { ok: false, message: "Por favor, insira um e-mail válido." };

  // TODO(engenharia): POST para a API interna de leads do time → RD Station.
  // await fetch(process.env.LEADS_API_URL!, { method: "POST", body: JSON.stringify({ nome, email }) })

  return { ok: true, message: "Inscrição realizada! Você receberá inspirações e dicas de viagem no seu e-mail." };
}
