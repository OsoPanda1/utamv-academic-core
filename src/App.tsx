import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModulosPage from "./pages/ModulosPage";
import ProgramasPage from "./pages/ProgramasPage";
import ModeloEducativoPage from "./pages/ModeloEducativoPage";
import InstitucionalPage from "./pages/InstitucionalPage";
import AdmisionesPage from "./pages/AdmisionesPage";
import Auth from "./pages/Auth";
import Campus from "./pages/Campus";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[hsl(var(--platinum)/0.3)] border-t-platinum animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/programas" element={<ProgramasPage />} />
    <Route path="/modulos" element={<ModulosPage />} />
    <Route path="/modelo-educativo" element={<ModeloEducativoPage />} />
    <Route path="/institucional" element={<InstitucionalPage />} />
    <Route path="/admisiones" element={<AdmisionesPage />} />
    <Route path="/precios" element={<Pricing />} />
    <Route path="/auth/login" element={<Auth />} />
    <Route path="/auth/register" element={<Auth />} />
    <Route path="/campus" element={<ProtectedRoute><Campus /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
