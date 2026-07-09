"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Building2, Hash, Mail, Phone, Briefcase, Users, Target, ArrowRight } from "lucide-react";
import { RDStationForm } from "@/components/RDStationForm";

const maskPhone = (value: string) => {
  const d = value.replace(/\D/g, "");
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
};
const maskCNPJ = (value: string) => {
  const d = value.replace(/\D/g, "");
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12, 14)}`;
};

const inputCls = "w-full pl-11 pr-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition-colors";
const selectCls = inputCls + " appearance-none bg-white";

export function B2BLeadForm({
  cargoOptions,
  cargoLabel = "Cargo",
  objetivoLabel = "Principal objetivo",
  objetivoOptions,
  showColaboradores = true,
  colaboradoresLabel = "Número de colaboradores",
  submitLabel = "Solicitar proposta gratuita",
  rdFormId,
}: {
  cargoOptions: string[];
  cargoLabel?: string;
  objetivoLabel?: string;
  objetivoOptions: string[];
  showColaboradores?: boolean;
  colaboradoresLabel?: string;
  submitLabel?: string;
  rdFormId?: string;
}) {
  const [formData, setFormData] = useState({ nome: "", empresa: "", cnpj: "", email: "", celular: "", cargo: "", numColaboradores: "", objetivo: "", mensagem: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const set = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!formData.nome || !formData.empresa || !formData.email || !formData.celular) {
      setFeedback({ type: "err", text: "Por favor, preencha os campos obrigatórios." });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setFeedback({ type: "ok", text: "Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve." });
      setFormData({ nome: "", empresa: "", cnpj: "", email: "", celular: "", cargo: "", numColaboradores: "", objetivo: "", mensagem: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  if (rdFormId) return <RDStationForm formId={rdFormId} />;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Nome completo <span className="text-[#EF4444]">*</span></label>
          <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><input type="text" required value={formData.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Seu nome completo" className={inputCls} /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Empresa <span className="text-[#EF4444]">*</span></label>
          <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><input type="text" required value={formData.empresa} onChange={(e) => set("empresa", e.target.value)} placeholder="Nome da empresa" className={inputCls} /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">CNPJ</label>
          <div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><input type="text" value={formData.cnpj} onChange={(e) => set("cnpj", maskCNPJ(e.target.value))} placeholder="00.000.000/0000-00" maxLength={18} className={inputCls} /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">E-mail corporativo <span className="text-[#EF4444]">*</span></label>
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><input type="email" required value={formData.email} onChange={(e) => set("email", e.target.value)} placeholder="seu@empresa.com.br" className={inputCls} /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">Celular / WhatsApp <span className="text-[#EF4444]">*</span></label>
          <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><input type="tel" required value={formData.celular} onChange={(e) => set("celular", maskPhone(e.target.value))} placeholder="(11) 99999-9999" maxLength={15} className={inputCls} /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">{cargoLabel}</label>
          <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><select value={formData.cargo} onChange={(e) => set("cargo", e.target.value)} className={selectCls}><option value="">Selecione seu cargo</option>{cargoOptions.map((o) => (<option key={o} value={o}>{o}</option>))}</select></div>
        </div>
      </div>
      {showColaboradores && (
        <div>
          <label className="block text-sm font-medium text-[#404040] mb-2">{colaboradoresLabel}</label>
          <div className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><select value={formData.numColaboradores} onChange={(e) => set("numColaboradores", e.target.value)} className={selectCls}><option value="">Selecione</option><option value="1-10">1 a 10</option><option value="11-50">11 a 50</option><option value="51-100">51 a 100</option><option value="101-500">101 a 500</option><option value="500+">Mais de 500</option></select></div>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-[#404040] mb-2">{objetivoLabel}</label>
        <div className="relative"><Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" /><select value={formData.objetivo} onChange={(e) => set("objetivo", e.target.value)} className={selectCls}><option value="">Selecione</option>{objetivoOptions.map((o) => (<option key={o} value={o}>{o}</option>))}</select></div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#404040] mb-2">Mensagem (opcional)</label>
        <textarea value={formData.mensagem} onChange={(e) => set("mensagem", e.target.value)} placeholder="Conte-nos mais sobre as necessidades da sua empresa..." rows={4} className="w-full px-4 py-3 border border-[#D6D6D6] rounded-2xl text-[#2D2D2D] placeholder-[#999999] focus:ring-2 focus:ring-[#FF9100] focus:border-[#FF9100] transition-colors resize-none" />
      </div>
      {feedback && <p className={`text-sm text-center font-medium ${feedback.type === "ok" ? "text-[#06D6A0]" : "text-[#EF4444]"}`}>{feedback.text}</p>}
      <Button type="submit" size="lg" className="w-full bg-[#FF9100] hover:bg-[#E07F00] text-white py-4 rounded-2xl text-lg" disabled={isSubmitting}>
        {isSubmitting ? (<span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Enviando...</span>) : (<span className="flex items-center gap-2">{submitLabel}<ArrowRight className="w-5 h-5" /></span>)}
      </Button>
      <p className="text-xs text-[#777777] text-center">Ao enviar, você concorda com nossa política de privacidade. Seus dados são protegidos e não serão compartilhados.</p>
    </form>
  );
}
