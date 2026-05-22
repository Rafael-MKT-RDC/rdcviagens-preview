import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Send, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: {
    id: string;
    name?: string;
    slogan?: string;
    days: number;
    price: number;
  };
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  contactChannel: string;
  contactTime: string;
  plan: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  contactChannel: "whatsapp",
  contactTime: "",
  plan: "",
};

const contactTimes = [
  { value: "09-12", label: "09h às 12h" },
  { value: "12-14", label: "12h às 14h" },
  { value: "14-17", label: "14h às 17h" },
  { value: "17-21", label: "17h às 21h" },
];

const plans = [
  { id: "7-diarias", name: "7 Diárias", days: 7, price: 319.90 },
  { id: "14-diarias", name: "14 Diárias", days: 14, price: 639.80 },
  { id: "21-diarias", name: "21 Diárias", days: 21, price: 959.70 },
  { id: "28-diarias", name: "28 Diárias", days: 28, price: 1279.60 },
];

export default function SubscriptionModal({
  open,
  onOpenChange,
  selectedPlan,
}: SubscriptionModalProps) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    plan: selectedPlan?.id || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactTime) {
      toast.error("Selecione um horário de preferência para contato.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulação de delay de envio
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log dos dados para debug
      console.log("Dados do formulário:", formData);
      
      // Armazenar localmente (localStorage) como backup
      const submissions = JSON.parse(localStorage.getItem("rdc_submissions") || "[]");
      submissions.push({
        ...formData,
        submittedAt: new Date().toISOString(),
        planDetails: plans.find(p => p.id === formData.plan),
      });
      localStorage.setItem("rdc_submissions", JSON.stringify(submissions));
      
      setIsSubmitted(true);
      toast.success("Solicitação enviada com sucesso!");
      
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
      console.error("Erro no envio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setFormData({ ...initialFormData, plan: selectedPlan?.id || "" });
      setIsSubmitted(false);
    }, 300);
  };

  const selectedPlanDetails = plans.find((p) => p.id === formData.plan);

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#D4F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#06D6A0]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#2D2D2D] mb-2">
              Solicitação Enviada!
            </DialogTitle>
            <DialogDescription className="text-[#555555] mb-6">
              Recebemos seus dados e em breve um de nossos consultores entrará em contato 
              {formData.contactChannel === "whatsapp" ? " pelo WhatsApp" : " por ligação"} no horário de sua preferência.
            </DialogDescription>
            {selectedPlanDetails && (
              <div className="bg-[#F6F6F6] rounded-xl p-4 mb-6">
                <p className="text-sm text-[#777777] mb-1">Plano selecionado:</p>
                <p className="text-2xl font-bold text-[#E68200]">
                  {selectedPlanDetails.days} Diárias/ano
                </p>
                <p className="text-[#404040] font-semibold">
                  R$ {selectedPlanDetails.price.toFixed(2).replace(".", ",")}/mês
                </p>
              </div>
            )}
            <Button onClick={handleClose} className="w-full bg-[#FF9100] hover:bg-[#E68200]">
              Entendi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2D2D]">
            Quero Assinar
          </DialogTitle>
          <DialogDescription>
            Preencha seus dados e nossa equipe entrará em contato.
          </DialogDescription>
        </DialogHeader>

        {selectedPlanDetails && (
          <div className="bg-gradient-to-r from-[#F6F6F6] to-[#FFF8EB] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-[#FF9100] text-white border-0 mb-1">
                  Plano selecionado
                </Badge>
                <p className="text-3xl font-bold text-[#2D2D2D]">{selectedPlanDetails.days} Diárias</p>
                <p className="text-sm text-[#555555]">por ano</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#E68200]">
                  R$ {selectedPlanDetails.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-sm text-[#777777]">/mês</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Celular (WhatsApp) *</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Plano de interesse *</Label>
            <Select
              value={formData.plan}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, plan: value }))
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    <span className="font-semibold">{plan.days} Diárias/ano</span>
                    <span className="text-[#777777] ml-2">- R$ {plan.price.toFixed(2).replace(".", ",")}/mês</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Canal de preferência para contato *</Label>
            <RadioGroup
              value={formData.contactChannel}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, contactChannel: value }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer font-normal">
                  <MessageCircle className="w-4 h-4 text-[#06D6A0]" />
                  WhatsApp
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ligacao" id="ligacao" />
                <Label htmlFor="ligacao" className="flex items-center gap-2 cursor-pointer font-normal">
                  <Phone className="w-4 h-4 text-[#0020B8]" />
                  Ligação
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Horário de preferência para contato *</Label>
            <div className="grid grid-cols-2 gap-2">
              {contactTimes.map((time) => (
                <Button
                  key={time.value}
                  type="button"
                  variant={formData.contactTime === time.value ? "default" : "outline"}
                  className={`${
                    formData.contactTime === time.value
                      ? "bg-[#FF9100] hover:bg-[#E68200] text-white"
                      : "hover:border-[#FF9100] hover:text-[#E68200]"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, contactTime: time.value }))
                  }
                >
                  {time.label}
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF9100] hover:bg-[#E68200] text-white py-6 mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar solicitação
              </>
            )}
          </Button>

          <p className="text-xs text-center text-[#777777]">
            Seus dados estão seguros. Não compartilhamos suas informações.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
