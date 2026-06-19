import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RDStationForm } from "@/components/RDStationForm";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface NewsletterModalProps {
  trigger?: React.ReactNode;
}

export default function NewsletterModal({ trigger }: NewsletterModalProps) {
  const settings = useSiteSettings();
  const rdFormId = settings.formNewsletterRdId;
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    setIsSubmitting(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Salvar no localStorage
    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
    subscribers.push({
      ...formData,
      subscribedAt: new Date().toISOString(),
    });
    localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Inscrição realizada com sucesso!");

    // Reset após 3 segundos
    setTimeout(() => {
      setOpen(false);
      setIsSuccess(false);
      setFormData({ name: "", email: "" });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="gap-2 text-[#555555] hover:text-[#001A9E]">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Newsletter</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#D4F5E9] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#06D6A0]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
              Inscrição confirmada!
            </h3>
            <p className="text-[#555555]">
              Você receberá nossas novidades e ofertas exclusivas.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="w-14 h-14 rounded-full bg-[#FFF0D6] flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#E68200]" />
              </div>
              <DialogTitle className="text-center text-xl">
                Receba ofertas exclusivas
              </DialogTitle>
              <DialogDescription className="text-center">
                Cadastre-se em nossa newsletter e receba promoções, dicas de viagem 
                e novidades em primeira mão.
              </DialogDescription>
            </DialogHeader>
            {rdFormId ? (
              /* Formulário do RD Station (a mensagem de agradecimento é exibida
                 pelo próprio RD, dentro do box, conforme configurado no RD). */
              <div className="rdc-rd-form mt-4">
                <RDStationForm formId={rdFormId} token="UA-7667371-1" />
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="newsletter-name">Nome</Label>
                <Input
                  id="newsletter-name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newsletter-email">E-mail</Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF9100] hover:bg-[#E68200]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Quero receber novidades
                  </>
                )}
              </Button>
              <p className="text-xs text-[#777777] text-center">
                Ao se cadastrar, você concorda com nossa{" "}
                <a href="/politica-privacidade" className="text-[#E68200] hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
