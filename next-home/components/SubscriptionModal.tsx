"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Send, Phone, MessageCircle } from "lucide-react";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: { id: string; days: number; price: number };
}
interface FormData { name: string; email: string; phone: string; contactChannel: string; contactTime: string; plan: string; }
const initialFormData: FormData = { name: "", email: "", phone: "", contactChannel: "whatsapp", contactTime: "", plan: "" };
const contactTimes = [
  { value: "09-12", label: "09h às 12h" }, { value: "12-14", label: "12h às 14h" },
  { value: "14-17", label: "14h às 17h" }, { value: "17-21", label: "17h às 21h" },
];
const plans = [
  { id: "7-diarias", name: "7 Diárias", days: 7, price: 319.9 },
  { id: "14-diarias", name: "14 Diárias", days: 14, price: 639.8 },
  { id: "21-diarias", name: "21 Diárias", days: 21, price: 959.7 },
  { id: "28-diarias", name: "28 Diárias", days: 28, price: 1279.6 },
];

export default function SubscriptionModal({ open, onOpenChange, selectedPlan }: SubscriptionModalProps) {
  const [formData, setFormData] = useState<FormData>({ ...initialFormData, plan: selectedPlan?.id || "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formData.contactTime) { setFormError("Selecione um horário de preferência para contato."); return; }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (typeof window !== "undefined") {
        const submissions = JSON.parse(localStorage.getItem("rdc_submissions") || "[]");
        submissions.push({ ...formData, submittedAt: new Date().toISOString(), planDetails: plans.find((p) => p.id === formData.plan) });
        localStorage.setItem("rdc_submissions", JSON.stringify(submissions));
      }
      setIsSubmitted(true);
    } catch { setFormError("Erro ao enviar. Tente novamente."); }
    finally { setIsSubmitting(false); }
  };
  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => { setFormData({ ...initialFormData, plan: selectedPlan?.id || "" }); setIsSubmitted(false); setFormError(""); }, 300);
  };
  const selectedPlanDetails = plans.find((p) => p.id === formData.plan);

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#D4F5E9] rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-[#06D6A0]" /></div>
            <DialogTitle className="text-2xl font-bold text-[#2D2D2D] mb-2">Solicitação Enviada!</DialogTitle>
            <DialogDescription className="text-[#555555] mb-6">Recebemos seus dados e em breve um de nossos consultores entrará em contato{formData.contactChannel === "whatsapp" ? " pelo WhatsApp" : " por ligação"} no horário de sua preferência.</DialogDescription>
            {selectedPlanDetails && (
              <div className="bg-[#F6F6F6] rounded-xl p-4 mb-6">
                <p className="text-sm text-[#777777] mb-1">Plano selecionado:</p>
                <p className="text-2xl font-bold text-[#E68200]">{selectedPlanDetails.days} Diárias/ano</p>
                <p className="text-[#404040] font-semibold">R$ {selectedPlanDetails.price.toFixed(2).replace(".", ",")}/mês</p>
              </div>
            )}
            <Button onClick={handleClose} className="w-full bg-[#FF9100] hover:bg-[#E68200]">Entendi</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2D2D]">Quero Assinar</DialogTitle>
          <DialogDescription>Preencha seus dados e nossa equipe entrará em contato.</DialogDescription>
        </DialogHeader>
        {selectedPlanDetails && (
          <div className="bg-gradient-to-r from-[#F6F6F6] to-[#FFF8EB] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-[#FF9100] text-white border-0 mb-1">Plano selecionado</Badge>
                <p className="text-3xl font-bold text-[#2D2D2D]">{selectedPlanDetails.days} Diárias</p>
                <p className="text-sm text-[#555555]">por ano</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#E68200]">R$ {selectedPlanDetails.price.toFixed(2).replace(".", ",")}</p>
                <p className="text-sm text-[#777777]">/mês</p>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><Label htmlFor="sm-name">Nome completo *</Label><Input id="sm-name" name="name" placeholder="Seu nome completo" value={formData.name} onChange={handleInputChange} required /></div>
          <div className="space-y-2"><Label htmlFor="sm-email">E-mail *</Label><Input id="sm-email" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleInputChange} required /></div>
          <div className="space-y-2"><Label htmlFor="sm-phone">Celular (WhatsApp) *</Label><Input id="sm-phone" name="phone" placeholder="(00) 00000-0000" value={formData.phone} onChange={handlePhoneChange} required /></div>
          <div className="space-y-2">
            <Label htmlFor="sm-plan">Plano de interesse *</Label>
            <select id="sm-plan" value={formData.plan} onChange={(e) => setFormData((prev) => ({ ...prev, plan: e.target.value }))} required className="flex h-10 w-full rounded-md border border-[#D6D6D6] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9100]">
              <option value="" disabled>Selecione um plano</option>
              {plans.map((plan) => (<option key={plan.id} value={plan.id}>{plan.days} Diárias/ano - R$ {plan.price.toFixed(2).replace(".", ",")}/mês</option>))}
            </select>
          </div>
          <div className="space-y-3">
            <Label>Canal de preferência para contato *</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-normal text-[#2D2D2D]"><input type="radio" name="sm-channel" value="whatsapp" checked={formData.contactChannel === "whatsapp"} onChange={(e) => setFormData((prev) => ({ ...prev, contactChannel: e.target.value }))} className="accent-[#FF9100]" /><MessageCircle className="w-4 h-4 text-[#06D6A0]" />WhatsApp</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-normal text-[#2D2D2D]"><input type="radio" name="sm-channel" value="ligacao" checked={formData.contactChannel === "ligacao"} onChange={(e) => setFormData((prev) => ({ ...prev, contactChannel: e.target.value }))} className="accent-[#FF9100]" /><Phone className="w-4 h-4 text-[#0020B8]" />Ligação</label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Horário de preferência para contato *</Label>
            <div className="grid grid-cols-2 gap-2">
              {contactTimes.map((time) => (<Button key={time.value} type="button" variant={formData.contactTime === time.value ? "default" : "outline"} className={formData.contactTime === time.value ? "bg-[#FF9100] hover:bg-[#E68200] text-white" : "hover:border-[#FF9100] hover:text-[#E68200]"} onClick={() => setFormData((prev) => ({ ...prev, contactTime: time.value }))}>{time.label}</Button>))}
            </div>
          </div>
          {formError && <p className="text-sm text-red-600 text-center">{formError}</p>}
          <Button type="submit" className="w-full bg-[#FF9100] hover:bg-[#E68200] text-white py-6 mt-6" disabled={isSubmitting}>
            {isSubmitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enviando...</>) : (<><Send className="w-4 h-4 mr-2" />Enviar solicitação</>)}
          </Button>
          <p className="text-xs text-center text-[#777777]">Seus dados estão seguros. Não compartilhamos suas informações.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
