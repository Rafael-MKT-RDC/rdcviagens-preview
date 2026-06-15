import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mail, User, ChevronDown, Headset, Clock } from "lucide-react";
import NewsletterModal from "./NewsletterModal";

/*
 * Design Philosophy: Tropical Elegance
 * - Header fixo com blur backdrop
 * - Navegação limpa e organizada
 * - Cores: Azul profundo + Laranja accent
 */

const navItems = [
  {
    label: "Sobre a RDC",
    href: "/sobre",
    children: [
      { label: "Nossa História", href: "/sobre" },
      { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    ]
  },
  {
    label: "Viaje por Assinatura",
    href: "/assinaturas",
    children: [
      { label: "Planos de Assinatura", href: "/assinaturas" },
      { label: "Agência de Viagens", href: "/agencia" },
      { label: "Programa de Indicação", href: "/programa-indicacao" },
      { label: "Clube de Vantagens", href: "/clube-vantagens" },
      { label: "Nossos Destinos", href: "/destinos" },
      { label: "Viaje Tranquilo", href: "/viaje-tranquilo" },
    ]
  },
  {
    label: "Soluções Corporativas",
    href: "/solucoes-corporativas",
    children: [
      { label: "Conheça nossas soluções", href: "/solucoes-corporativas" },
      { label: "RDC Premiação", href: "/solucoes-corporativas/premiacao" },
      { label: "RDC Gestão de Viagens", href: "/solucoes-corporativas/gestao" },
      { label: "RDC Parcerias", href: "/solucoes-corporativas/parcerias" },
    ]
  },
  { label: "Blog", href: "/blog" },
  { label: "Dúvidas", href: "/duvidas" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
    {/* Top Bar - Televendas */}
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#00148A] text-white">
      <div className="container">
        {/* Desktop: uma linha */}
        <div className="hidden md:flex items-center justify-center h-9 text-sm gap-2">
          <a 
            href="tel:08000552600" 
            className="flex items-center gap-1.5 hover:text-[#FFB040] transition-colors"
          >
            <Headset className="w-3.5 h-3.5 text-[#FF9100]" />
            <span className="font-bold">Televendas: 0800-055-2600</span>
          </a>
          <span className="text-[#4060E0]">|</span>
          <span className="text-[#8ECAE6]">Seg a Sex, 9h às 19h</span>
          <span className="text-[#4060E0]">|</span>
          <span className="text-[#8ECAE6]">Ligação gratuita</span>
        </div>
        {/* Mobile: duas linhas */}
        <a 
          href="tel:08000552600" 
          className="flex md:hidden flex-col items-center justify-center py-1.5 hover:text-[#FFB040] transition-colors"
        >
          <div className="flex items-center gap-1 text-[10px] text-[#8ECAE6] uppercase tracking-wider">
            <Headset className="w-3 h-3 text-[#FF9100]" />
            <span>Televendas</span>
            <span className="text-[#0028D0]">|</span>
            <span>Seg-Sex 9h-19h</span>
          </div>
          <span className="font-bold text-xs tracking-wide">0800-055-2600 <span className="font-normal text-[#8ECAE6] text-[10px]">Ligação gratuita</span></span>
        </a>
      </div>
    </div>

    <header className="fixed top-[46px] md:top-9 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img src="/logos/logo-rdc.svg" 
              alt="RDC Viagens" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="text-[#404040] hover:text-[#001A9E] bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-48 gap-1 p-2">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="block px-3 py-2 text-sm text-[#404040] hover:bg-[#F6F6F6] hover:text-[#001A9E] rounded-xl transition-colors"
                                  >
                                    {child.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          location === item.href
                            ? "text-[#001A9E]"
                            : "text-[#404040] hover:text-[#001A9E]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Newsletter Button */}
            <NewsletterModal
              trigger={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex items-center gap-2 text-[#555555] hover:text-[#001A9E]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Newsletter</span>
                </Button>
              }
            />
            
            <Button 
              variant="outline" 
              className="hidden md:flex border-[#001A9E] text-[#001A9E] hover:bg-[#F6F6F6]"
            >
              <User className="h-4 w-4 mr-2" />
              Portal do Assinante
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <div className="space-y-2">
                          <span className="font-medium text-[#2D2D2D] flex items-center gap-1">
                            {item.label}
                            <ChevronDown className="h-4 w-4" />
                          </span>
                          <div className="pl-4 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block text-[#555555] hover:text-[#001A9E]"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block font-medium ${
                            location === item.href
                              ? "text-[#001A9E]"
                              : "text-[#2D2D2D] hover:text-[#001A9E]"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                  <hr className="my-4" />
                  {/* Newsletter no mobile */}
                  <NewsletterModal
                    trigger={
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Newsletter
                      </Button>
                    }
                  />
                  <Button className="w-full bg-[#001A9E] hover:bg-[#001070]">
                    <User className="h-4 w-4 mr-2" />
                    Portal do Assinante
                  </Button>
                  <hr className="my-4" />
                  {/* Televendas no mobile */}
                  <a
                    href="tel:08000552600"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#00148A] text-white hover:bg-[#001070] transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF9100]/20">
                      <Headset className="w-5 h-5 text-[#FF9100]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-[#8ECAE6]">Televendas</span>
                      <span className="font-bold text-sm">0800-055-2600</span>
                      <span className="text-[10px] text-[#8ECAE6]">Seg a Sex, 9h às 19h · Ligação gratuita</span>
                    </div>
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
