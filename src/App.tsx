import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModulosPage from "./pages/ModulosPage";
import ProgramasPage from "./pages/ProgramasPage";
import ModeloEducativoPage from "./pages/ModeloEducativoPage";
import InstitucionalPage from "./pages/InstitucionalPage";
import AdmisionesPage from "./pages/AdmisionesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programas" element={<ProgramasPage />} />
          <Route path="/modulos" element={<ModulosPage />} />
          <Route path="/modelo-educativo" element={<ModeloEducativoPage />} />
          <Route path="/institucional" element={<InstitucionalPage />} />
          <Route path="/admisiones" element={<AdmisionesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
