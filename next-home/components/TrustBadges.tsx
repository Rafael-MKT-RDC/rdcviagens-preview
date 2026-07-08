import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const badges = [
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/ejXstYbSJKxZgqWi.jpg", alt: "Great Place to Work - Certificado", label: "Great Place to Work" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/AzkxLniObtydfLhb.png", alt: "RA1000 - Reclame Aqui", label: "Selo RA1000 - Reclame Aqui" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/etvXTcTjHQaWTsWp.png", alt: "IATA - International Air Transport Association", label: "IATA" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/NnDoqxNFhRRTLgly.png", alt: "EMBRATUR - Instituto Brasileiro de Turismo", label: "EMBRATUR" },
  { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663280013040/arwwDaupAmaeZfUV.png", alt: "ABAV - Associação Brasileira de Agências de Viagens", label: "ABAV" },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-[#2D2D2D] mb-2">Reconhecimento e Confiança</h3>
          <p className="text-[#555555] text-sm">Certificações e associações que comprovam nosso compromisso com excelência</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12">
          {badges.map((badge) => (
            <Card key={badge.label} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-3 md:p-6 flex flex-col items-center">
                <Image src={badge.src} alt={badge.alt} width={120} height={80} className="h-12 md:h-20 w-auto object-contain mb-2 md:mb-3" />
                <span className="text-[10px] md:text-xs text-[#777777] text-center">{badge.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
