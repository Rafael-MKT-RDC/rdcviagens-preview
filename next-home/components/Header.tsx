"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Mail, User, ChevronDown, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/cms";

const navItems = [
  { label: "Sobre a RDC", href: "/sobre", children: [
    { label: "Nossa História", href: "/sobre" },
    { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
  ]},
  { label: "Viaje por Assinatura", href: "/assinaturas", children: [
    { label: "Planos de Assinatura", href: "/assinaturas" },
    { label: "Agência de Viagens", href: "/agencia" },
    { label: "Programa de Indicação", href: "/programa-indicacao" },
    { label: "Clube de Vantagens", href: "/clube-vantagens" },
    { label: "Nossos Destinos", href: "/destinos" },
    { label: "Viaje Tranquilo", href: "/viaje-tranquilo" },
  ]},
  { label: "Soluções Corporativas", href: "/solucoes-corporativas", children: [
    { label: "Conheça nossas soluções", href: "/solucoes-corporativas" },
    { label: "RDC Premiação", href: "/solucoes-corporativas/premiacao" },
    { label: "RDC Gestão de Viagens", href: "/solucoes-corporativas/gestao" },
    { label: "RDC Parcerias", href: "/solucoes-corporativas/parcerias" },
    { label: "RDC Travel Cloud", href: "/solucoes-corporativas/travel-cloud" },
  ]},
  { label: "Blog", href: "/blog" },
  { label: "Dúvidas", href: "/duvidas" },
  { label: "Contato", href: "/contato" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const telHref = `tel:${settings.telefone.replace(/\D/g, "")}`;

  return (
    <>
      {/* Top bar televendas */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#00148A] text-white">
        <div className="container">
          <div className="hidden md:flex items-center justify-center h-9 text-sm gap-2">
            <a href={telHref} className="flex items-center gap-1.5 hover:text-[#FFB040] transition-colors">
              <Headset className="w-3.5 h-3.5 text-[#FF9100]" />
              <span className="font-bold">Televendas: {settings.telefone}</span>
            </a>
            <span className="text-[#4060E0]">|</span>
            <span className="text-[#8ECAE6]">{settings.diasAtendimento}, {settings.horario}</span>
            <span className="text-[#4060E0]">|</span>
            <span className="text-[#8ECAE6]">{settings.tipoLigacao}</span>
          </div>
          <a href={telHref} className="flex md:hidden flex-col items-center justify-center py-1.5">
            <span className="font-bold text-xs">{settings.telefone} <span className="font-normal text-[#8ECAE6] text-[10px]">{settings.tipoLigacao}</span></span>
          </a>
        </div>
      </div>

      <header className="fixed top-[38px] md:top-9 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex-shrink-0 relative block h-10 md:h-12 w-[130px]">
              <Image src="https://d2xsxph8kpxj0f.cloudfront.net/310519663280013040/b2DbK5LckLkoJ8WoeWdfV2/Logo_RDC_oficial_4e0ebd10.png" alt="RDC Viagens" fill sizes="130px" className="object-contain object-left" priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button className="flex items-center gap-1 px-3 py-2 text-sm text-[#404040] hover:text-[#001A9E] transition-colors">
                        {item.label} <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                        <ul className="w-56 rounded-2xl border border-[#E8E8E8] bg-white p-2 shadow-lg">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link href={c.href} className="block px-3 py-2 text-sm text-[#404040] hover:bg-[#F6F6F6] hover:text-[#001A9E] rounded-xl transition-colors">{c.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="px-3 py-2 text-sm font-medium text-[#404040] hover:text-[#001A9E] transition-colors">{item.label}</Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2"><Mail className="h-4 w-4" /><span>Newsletter</span></Button>
              <Button variant="outline" className="hidden md:flex"><User className="h-4 w-4 mr-2" />Portal do Assinante</Button>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu" onClick={() => setOpen(true)}><Menu className="h-6 w-6" /></Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white p-6 overflow-y-auto">
            <div className="flex justify-end"><button aria-label="Fechar" onClick={() => setOpen(false)}><X className="h-6 w-6 text-[#2D2D2D]" /></button></div>
            <nav className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-2">
                      <span className="font-medium text-[#2D2D2D]">{item.label}</span>
                      <div className="pl-4 space-y-2">
                        {item.children.map((c) => (
                          <Link key={c.label} href={c.href} className="block text-[#555555] hover:text-[#001A9E]" onClick={() => setOpen(false)}>{c.label}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link href={item.href} className="block font-medium text-[#2D2D2D] hover:text-[#001A9E]" onClick={() => setOpen(false)}>{item.label}</Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
