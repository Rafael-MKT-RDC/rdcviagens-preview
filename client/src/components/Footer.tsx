import { Link } from "wouter";
import { MapPin, Mail, Facebook, Instagram, Linkedin, Youtube, Headset } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17V11.9a4.83 4.83 0 01-3.77-1.44V6.69h3.77z"/>
  </svg>
);

/*
 * Design Philosophy: Tropical Elegance
 * - Footer escuro com informações organizadas
 * - Conteúdo (texto, contato, redes) vem do CMS (Configurações Globais)
 */

const footerLinks = {
  institucional: [
    { label: "Sobre a RDC", href: "/sobre" },
    { label: "Dúvidas", href: "/duvidas" },
    { label: "Blog", href: "/blog" },
    { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    { label: "Documentos", href: "/documentos" },
    { label: "Seja Parceiro Hoteleiro", href: "/seja-parceiro" },
    { label: "Contato", href: "/contato" },
  ],
  assinantes: [
    { label: "Planos de Assinatura", href: "/assinaturas" },
    { label: "Agência de Viagens", href: "/agencia" },
    { label: "Programa de Indicação", href: "/programa-indicacao" },
    { label: "Clube de Vantagens", href: "/clube-vantagens" },
    { label: "Nossos Destinos", href: "/destinos" },
    { label: "Viaje Tranquilo", href: "/viaje-tranquilo" },
  ],
  empresas: [
    { label: "Conheça nossas soluções", href: "/solucoes-corporativas" },
    { label: "RDC Premiação", href: "/solucoes-corporativas/premiacao" },
    { label: "RDC Gestão de Viagens", href: "/solucoes-corporativas/gestao" },
    { label: "RDC Parcerias", href: "/solucoes-corporativas/parcerias" },
  ],
};

export default function Footer() {
  const settings = useSiteSettings();
  const telHref = `tel:${settings.telefone.replace(/\D/g, "")}`;
  const copyright = settings.copyright.replace("{ano}", String(new Date().getFullYear()));

  const socialLinks = [
    { icon: Facebook, href: settings.social.facebook, label: "Facebook" },
    { icon: Instagram, href: settings.social.instagram, label: "Instagram" },
    { icon: Linkedin, href: settings.social.linkedin, label: "LinkedIn" },
    { icon: Youtube, href: settings.social.youtube, label: "YouTube" },
    { icon: TikTokIcon, href: settings.social.tiktok, label: "TikTok" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="container py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Logo e descrição */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <img src="/logos/logo-rdc.svg" 
                alt="RDC Viagens" 
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-[#999999] text-sm leading-relaxed">
              {settings.textoInstitucional}
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#FF9100] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Institucionais */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Institucional</h4>
            <ul className="space-y-3 md:space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-[#999999] hover:text-white transition-colors text-sm py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Viaje por Assinatura */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Viaje por Assinatura</h4>
            <ul className="space-y-3 md:space-y-3">
              {footerLinks.assinantes.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-[#999999] hover:text-white transition-colors text-sm py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Soluções Corporativas */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Soluções Corporativas</h4>
            <ul className="space-y-3 md:space-y-3">
              {footerLinks.empresas.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-[#999999] hover:text-white transition-colors text-sm py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={telHref}
                  className="flex items-start gap-3 p-3 -mx-3 rounded-lg bg-[#00148A]/50 border border-[#001070]/50 hover:bg-[#001070]/50 transition-colors group"
                >
                  <Headset className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#8ECAE6]">Televendas</p>
                    <p className="font-bold text-lg text-white group-hover:text-[#FFB040] transition-colors">{settings.telefone}</p>
                    <p className="text-xs text-[#8ECAE6]">{settings.horarioRodape}</p>
                  </div>
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#999999]">Endereço</p>
                  <p>{settings.endereco}</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FF9100] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-[#999999]">E-mail</p>
                  <a href={`mailto:${settings.email}`} className="hover:text-[#FFB040] transition-colors break-all">{settings.email}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#333333]">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#777777] text-sm">
              {copyright}
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
