import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, Headset, MapPin, Mail } from "lucide-react";
import type { SiteSettings } from "@/lib/cms";

const cols = [
  { title: "Institucional", links: [
    { label: "Sobre a RDC", href: "/sobre" }, { label: "Dúvidas", href: "/duvidas" },
    { label: "Blog", href: "/blog" }, { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    { label: "Documentos", href: "/documentos" }, { label: "Seja Parceiro Hoteleiro", href: "/seja-parceiro" },
    { label: "Contato", href: "/contato" },
  ]},
  { title: "Viaje por Assinatura", links: [
    { label: "Planos de Assinatura", href: "/assinaturas" }, { label: "Agência de Viagens", href: "/agencia" },
    { label: "Programa de Indicação", href: "/programa-indicacao" }, { label: "Clube de Vantagens", href: "/clube-vantagens" },
    { label: "Nossos Destinos", href: "/destinos" }, { label: "Viaje Tranquilo", href: "/viaje-tranquilo" },
  ]},
  { title: "Soluções Corporativas", links: [
    { label: "Conheça nossas soluções", href: "/solucoes-corporativas" }, { label: "RDC Premiação", href: "/solucoes-corporativas/premiacao" },
    { label: "RDC Gestão de Viagens", href: "/solucoes-corporativas/gestao" }, { label: "RDC Parcerias", href: "/solucoes-corporativas/parcerias" },
    { label: "RDC Travel Cloud", href: "/solucoes-corporativas/travel-cloud" },
  ]},
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const social: [string, React.ComponentType<{ className?: string }>][] = [
    [settings.social.facebook ?? "#", Facebook],
    [settings.social.instagram ?? "#", Instagram],
    [settings.social.linkedin ?? "#", Linkedin],
    [settings.social.youtube ?? "#", Youtube],
  ];
  const copyright = settings.copyright.replace("{ano}", String(new Date().getFullYear()));

  return (
    <footer className="bg-[#082B41] text-white pt-14 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Image src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/Logo_RDC_oficial_4e0ebd10.png" alt="RDC Viagens" width={130} height={40} className="mb-4 brightness-0 invert" />
            <p className="text-sm text-[#C7D3E0] leading-relaxed">{settings.textoInstitucional}</p>
            <div className="flex gap-3 mt-5">
              {social.map(([href, Icon], i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (<li key={l.label}><Link href={l.href} className="text-sm text-[#C7D3E0] hover:text-white transition-colors">{l.label}</Link></li>))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <div className="space-y-4 text-sm text-[#C7D3E0]">
              <div className="rounded-xl bg-white/5 p-3">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#8ECAE6]"><Headset className="w-4 h-4 text-[#FF9100]" /> Televendas</div>
                <div className="font-bold text-white text-lg">{settings.telefone}</div>
                <div className="text-[11px]">{settings.horarioRodape}</div>
              </div>
              <div className="flex gap-2"><MapPin className="w-4 h-4 text-[#FF9100] flex-shrink-0 mt-0.5" /><span>{settings.endereco}</span></div>
              <div className="flex gap-2"><Mail className="w-4 h-4 text-[#FF9100] flex-shrink-0 mt-0.5" /><span>{settings.email}</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
          <span className="text-[#8ECAE6]">{copyright}</span>
        </div>
      </div>
    </footer>
  );
}
