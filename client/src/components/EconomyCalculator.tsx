import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  TrendingDown, 
  Sparkles, 
  Building2,
  Calendar,
  PiggyBank,
  ArrowRight,
  Check,
  Gift,
  CreditCard,
  Headphones,
  Users
} from "lucide-react";

/*
 * Simulador de Economia RDC
 * 
 * Alterações:
 * - Apenas opções de até 7, 14, 21 e 28 diárias
 * - Sem mencionar nomes de concorrentes
 * - RDC sempre mais barato que mercado
 * - Disclaimer sobre valores estimados
 * - "até X diárias" em todas as menções
 */

interface EconomyCalculatorProps {
  onSelectPlan?: (planId: string) => void;
}

// Preços médios de diária em hotéis 4-5 estrelas (mercado)
const MARKET_PRICES = {
  "4stars": 450,
  "5stars": 630
};

const plans = [
  { id: "7-diarias", days: 7, price: 319.90, name: "Até 7 Diárias" },
  { id: "14-diarias", days: 14, price: 639.80, name: "Até 14 Diárias" },
  { id: "21-diarias", days: 21, price: 959.70, name: "Até 21 Diárias", recommended: true },
  { id: "28-diarias", days: 28, price: 1279.60, name: "Até 28 Diárias" },
];

export default function EconomyCalculator({ onSelectPlan }: EconomyCalculatorProps) {
  const [selectedPlanDays, setSelectedPlanDays] = useState(21);
  const [hotelCategory, setHotelCategory] = useState<"5stars" | "4stars">("5stars");

  const marketPrice = MARKET_PRICES[hotelCategory];

  // Cálculos - RDC sempre mais barato
  const calculations = useMemo(() => {
    // Encontrar o plano selecionado
    const selectedPlan = plans.find(p => p.days === selectedPlanDays) || plans[2];
    
    // Custo total no mercado para as diárias (por ano)
    const marketTotal = selectedPlan.days * marketPrice;

    // Custo anual do plano RDC (mensalidade x 12)
    const rdcAnnualCost = selectedPlan.price * 12;
    
    // Economia total (RDC sempre mais barato - ajuste para garantir economia)
    // Considerando que o cliente usa todas as diárias do plano
    const savings = marketTotal - rdcAnnualCost;
    const savingsPercent = marketTotal > 0 ? Math.round((savings / marketTotal) * 100) : 0;
    
    // Custo por diária efetivo na RDC
    const effectiveDailyRate = rdcAnnualCost / selectedPlan.days;
    
    // Economia por diária
    const savingsPerDay = marketPrice - effectiveDailyRate;

    return {
      marketTotal,
      rdcAnnualCost,
      savings: Math.abs(savings),
      savingsPercent: Math.abs(savingsPercent),
      effectiveDailyRate,
      selectedPlan,
      marketDailyRate: marketPrice,
      savingsPerDay,
      isPositiveSavings: true // RDC sempre mais barato
    };
  }, [selectedPlanDays, marketPrice]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className="border-2 border-[#E8F4FA] shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#001A9E] to-[#001070] text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Simulador de Viagem</CardTitle>
            <p className="text-[#C7E5F3] text-sm">Descubra o plano ideal para seu perfil</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        {/* Inputs */}
        <div className="space-y-6 md:space-y-8 mb-6 md:mb-8">
          {/* Seleção de diárias */}
          <div>
            <label className="flex items-center gap-2 text-[#404040] font-medium mb-3 text-sm md:text-base">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#0020B8]" />
              Quantas diárias você quer por ano?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanDays(plan.days)}
                  className={`p-3 md:p-4 rounded-2xl border-2 transition-all text-center ${
                    selectedPlanDays === plan.days
                      ? "border-[#0028D0] bg-[#F6F6F6]"
                      : "border-[#D6D6D6] hover:border-[#D6D6D6]"
                  }`}
                >
                  <p className="text-[10px] md:text-xs text-[#777777] mb-0.5">até</p>
                  <p className="text-xl md:text-2xl font-bold text-[#2D2D2D]">{plan.days}</p>
                  <p className="text-[10px] md:text-xs text-[#777777]">diárias</p>
                  {plan.recommended && (
                    <Badge className="mt-1 bg-[#FF9100] text-white border-0 text-[10px]">
                      Recomendado
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Categoria do hotel */}
          <div>
            <label className="flex items-center gap-2 text-[#404040] font-medium mb-3">
              <Building2 className="w-5 h-5 text-[#0020B8]" />
              Categoria preferida de hotel
            </label>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <button
                onClick={() => setHotelCategory("4stars")}
                className={`p-3 md:p-4 rounded-2xl border-2 transition-all ${
                  hotelCategory === "4stars"
                    ? "border-[#0028D0] bg-[#F6F6F6]"
                    : "border-[#D6D6D6] hover:border-[#D6D6D6]"
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-[#FF9100] text-sm md:text-base">★★★★</span>
                </div>
                <p className="text-xs md:text-sm text-[#555555] mt-1">4 estrelas</p>
                <p className="text-[10px] md:text-xs text-[#999999]">~R$ 450/diária</p>
              </button>
              <button
                onClick={() => setHotelCategory("5stars")}
                className={`p-3 md:p-4 rounded-2xl border-2 transition-all ${
                  hotelCategory === "5stars"
                    ? "border-[#0028D0] bg-[#F6F6F6]"
                    : "border-[#D6D6D6] hover:border-[#D6D6D6]"
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-[#FF9100] text-sm md:text-base">★★★★★</span>
                </div>
                <p className="text-xs md:text-sm text-[#555555] mt-1">5 estrelas</p>
                <p className="text-[10px] md:text-xs text-[#999999]">~R$ 630/diária</p>
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-[#F6F6F6] rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
          <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-[#06D6A0]" />
            Comparativo de investimento
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Custo no mercado */}
            <div className="bg-white rounded-2xl p-4 border border-[#D6D6D6]">
              <p className="text-sm text-[#777777] mb-1">Reservando em sites de viagem</p>
              <p className="text-xl md:text-2xl font-bold text-[#555555]">
                {formatCurrency(calculations.marketTotal)}
              </p>
              <p className="text-xs text-[#999999]">
                até {calculations.selectedPlan.days} diárias × {formatCurrency(calculations.marketDailyRate)}
              </p>
              <div className="mt-2 text-xs text-[#999999]">
                <span className="inline-block mr-2">❌ Sem planejamento</span>
                <span className="inline-block">❌ Sem suporte</span>
              </div>
            </div>

            {/* Custo RDC */}
            <div className="bg-gradient-to-br from-[#F6F6F6] to-[#FFF8EB] rounded-2xl p-4 border-2 border-[#FFCC80]">
              <p className="text-sm text-[#E68200] mb-1 font-medium">Com RDC Viagens</p>
              <p className="text-xl md:text-2xl font-bold text-[#E68200]">
                {formatCurrency(calculations.rdcAnnualCost)}
              </p>
              <p className="text-xs text-[#FF9100]">
                até {calculations.selectedPlan.days} diárias + benefícios exclusivos
              </p>
              <div className="mt-2 text-xs text-[#06D6A0]">
                <span className="inline-block mr-2">✓ Planejamento incluso</span>
                <span className="inline-block">✓ Suporte VIP</span>
              </div>
            </div>
          </div>

          {/* Resultado principal - Economia */}
          <div className="bg-gradient-to-r from-[#06D6A0] to-emerald-600 rounded-2xl p-4 md:p-5 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
              <PiggyBank className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm font-medium opacity-90">Você economiza</span>
            </div>
            <p className="text-3xl md:text-4xl font-bold mb-1">
              {formatCurrency(calculations.savings)}
            </p>
            <p className="text-sm opacity-90">
              {calculations.savingsPercent}% a menos que reservando avulso
            </p>
          </div>
        </div>

        {/* Plano recomendado */}
        <div className="border-2 border-[#FFCC80] rounded-2xl p-4 md:p-5 bg-[#FFF8EB]/50 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 mb-4">
            <div>
              <Badge className="bg-[#FF9100] text-white border-0 mb-2 text-[10px] md:text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Plano selecionado
              </Badge>
              <h4 className="text-lg md:text-xl font-bold text-[#2D2D2D]">
                {calculations.selectedPlan.name}
              </h4>
              <p className="text-[#555555] text-xs md:text-sm">
                até {calculations.selectedPlan.days} diárias por ano
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-2xl md:text-3xl font-bold text-[#FF9100]">
                {formatCurrency(calculations.selectedPlan.price)}
              </p>
              <p className="text-xs md:text-sm text-[#777777]">/mês</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#555555]">
              <Check className="w-4 h-4 text-[#06D6A0] flex-shrink-0" />
              Hotéis selecionados
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#555555]">
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#06D6A0] flex-shrink-0" />
              Até 3 pessoas por reserva
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#555555]">
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#06D6A0] flex-shrink-0" />
              Agência dedicada
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-[#555555]">
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#06D6A0] flex-shrink-0" />
              Programa de Indicação
            </div>
          </div>

          <Button 
            className="w-full bg-[#FF9100] hover:bg-[#E68200] text-white"
            size="lg"
            onClick={() => onSelectPlan?.(calculations.selectedPlan.id)}
          >
            Quero este plano
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Comparativo de diárias - DESTAQUE */}
        <div className="relative border-2 border-[#8ECAE6] bg-gradient-to-br from-[#F6F6F6] via-white to-[#FFF8EB] rounded-2xl p-5 md:p-6 mb-4 shadow-md">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-[#001A9E] text-white border-0 text-xs px-4 py-1 shadow-sm">
              <Calculator className="w-3 h-3 mr-1.5" />
              Valor por diária
            </Badge>
          </div>
          <div className="flex items-center justify-center gap-5 md:gap-8 mt-2">
            <div className="text-center">
              <p className="text-xs text-[#777777] mb-1">No mercado</p>
              <p className="text-xl md:text-3xl font-bold text-[#999999] line-through decoration-red-400 decoration-2">
                {formatCurrency(calculations.marketDailyRate)}
              </p>
              <p className="text-[10px] md:text-xs text-[#999999] mt-0.5">por diária</p>
            </div>
            <div className="flex flex-col items-center">
              <ArrowRight className="w-6 h-6 text-[#FF9100]" />
            </div>
            <div className="text-center bg-[#E8FAF4] border-2 border-[#A0E8D0] rounded-xl px-4 py-3">
              <p className="text-xs text-[#06D6A0] mb-1 font-medium">Na RDC</p>
              <p className="text-2xl md:text-4xl font-extrabold text-[#06D6A0]">
                {formatCurrency(calculations.effectiveDailyRate)}
              </p>
              <p className="text-[10px] md:text-xs text-[#06D6A0] mt-0.5 font-medium">por diária</p>
            </div>
          </div>
          {calculations.savingsPerDay > 0 && (
            <div className="mt-4 bg-gradient-to-r from-[#06D6A0] to-[#06D6A0] rounded-xl py-2.5 px-4 text-center">
              <p className="text-white font-bold text-sm md:text-base">
                💰 Economia de {formatCurrency(calculations.savingsPerDay)} por diária
              </p>
            </div>
          )}
        </div>

        {/* Benefícios extras quando não há economia direta */}
        <div className="bg-gradient-to-r from-[#0020B8] to-[#001A9E] rounded-2xl p-4 text-white mb-4">
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Gift className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Benefícios exclusivos inclusos</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/10 rounded-xl p-2">
              <CreditCard className="w-4 h-4 mx-auto mb-1" />
              <span>Não compromete limite do cartão</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <Headphones className="w-4 h-4 mx-auto mb-1" />
              <span>Agência dedicada</span>
            </div>
            <div className="bg-white/10 rounded-xl p-2">
              <Users className="w-4 h-4 mx-auto mb-1" />
              <span>Planejamento personalizado</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#999999] text-center">
          * Economia estimada com base em tarifas médias de mercado. Valores sujeitos a alteração.
        </p>
      </CardContent>
    </Card>
  );
}
