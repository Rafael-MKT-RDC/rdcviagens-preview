import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Assinaturas from "./pages/Assinaturas";
import Empresas from "./pages/Empresas";
import EmpresasPremiacao from "./pages/EmpresasPremiacao";
import EmpresasGestao from "./pages/EmpresasGestao";
import EmpresasParcerias from "./pages/EmpresasParcerias";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import Duvidas from "./pages/Duvidas";
import TrabalheConosco from "./pages/TrabalheConosco";
import ProgramaIndicacao from "./pages/ProgramaIndicacao";
import AgenciaViagens from "./pages/AgenciaViagens";
import ClubeVantagens from "./pages/ClubeVantagens";
import NossosDestinos from "./pages/NossosDestinos";
import Documentos from "./pages/Documentos";
import SejaParceiro from "./pages/SejaParceiro";
import ViajeTranquilo from "./pages/ViajeTranquilo";
import StructuredData from "./components/StructuredData";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTopButton from "./components/BackToTopButton";
import ScrollToTop from "./components/ScrollToTop";

const StudioPage = lazy(() => import("./pages/Studio"));

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/assinaturas"} component={Assinaturas} />
      <Route path={"/solucoes-corporativas"} component={Empresas} />
      <Route path={"/solucoes-corporativas/premiacao"} component={EmpresasPremiacao} />
      <Route path={"/solucoes-corporativas/gestao"} component={EmpresasGestao} />
      <Route path={"/solucoes-corporativas/parcerias"} component={EmpresasParcerias} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/duvidas"} component={Duvidas} />
      <Route path={"/trabalhe-conosco"} component={TrabalheConosco} />
      <Route path={"/programa-indicacao"} component={ProgramaIndicacao} />
      <Route path={"/agencia"} component={AgenciaViagens} />
      <Route path={"/clube-vantagens"} component={ClubeVantagens} />
      <Route path={"/destinos"} component={NossosDestinos} />
      <Route path={"/documentos"} component={Documentos} />
      <Route path={"/seja-parceiro"} component={SejaParceiro} />
      <Route path={"/viaje-tranquilo"} component={ViajeTranquilo} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  if (location.startsWith("/studio")) {
    return (
      <Suspense fallback={<div style={{ padding: 40, fontFamily: "sans-serif" }}>Carregando estúdio…</div>}>
        <StudioPage />
      </Suspense>
    );
  }
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <StructuredData type="organization" />
          <StructuredData type="website" />
          <ScrollToTop />
          <Router />
          <WhatsAppButton />
          <BackToTopButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
