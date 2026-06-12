import { Card, CardContent } from "@/components/ui/card";

/*
 * Componente de selos de confiança
 * Exibe os selos Great Place to Work, RA1000, IATA, EMBRATUR e ABAV
 */

const badges = [
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ejXstYbSJKxZgqWi.jpg",
    alt: "Great Place to Work - Certificado",
    label: "Great Place to Work"
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/AzkxLniObtydfLhb.png",
    alt: "RA1000 - Reclame Aqui",
    label: "Selo RA1000 - Reclame Aqui"
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/etvXTcTjHQaWTsWp.png",
    alt: "IATA - International Air Transport Association",
    label: "IATA"
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/NnDoqxNFhRRTLgly.png",
    alt: "EMBRATUR - Instituto Brasileiro de Turismo",
    label: "EMBRATUR"
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/arwwDaupAmaeZfUV.png",
    alt: "ABAV - Associação Brasileira de Agências de Viagens",
    label: "ABAV"
  }
];

interface TrustBadgesProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

export default function TrustBadges({ variant = "default", className = "" }: TrustBadgesProps) {
  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-6 ${className}`}>
        {badges.map((badge) => (
          <div key={badge.label} className="flex items-center gap-2">
            <img src={badge.src} 
              alt={badge.alt} 
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-center gap-8 ${className}`}>
        {badges.map((badge) => (
          <img key={badge.label}
            src={badge.src} 
            alt={badge.alt} 
            className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
          />
        ))}
      </div>
    );
  }

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">
            Reconhecimento e Confiança
          </h3>
          <p className="text-[#555555] text-sm">
            Certificações e associações que comprovam nosso compromisso com excelência
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
          {badges.map((badge) => (
            <Card key={badge.label} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-3 md:p-6 flex flex-col items-center">
                <img src={badge.src} 
                  alt={badge.alt} 
                  className="h-12 md:h-20 w-auto object-contain mb-2 md:mb-3"
                />
                <span className="text-[10px] md:text-xs text-[#777777] text-center">
                  {badge.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
