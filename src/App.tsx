import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Campus from "./pages/Campus";
import CourseViewer from "./pages/CourseViewer";
import Pricing from "./pages/Pricing";
import ProgramasPage from "./pages/ProgramasPage";
import ModulosPage from "./pages/ModulosPage";
import ModeloEducativoPage from "./pages/ModeloEducativoPage";
import InstitucionalPage from "./pages/InstitucionalPage";
import AdmisionesPage from "./pages/AdmisionesPage";
import DocentesPage from "./pages/DocentesPage";
import ForoPage from "./pages/ForoPage";
import CertificadosPage from "./pages/CertificadosPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-ui text-sm text-muted-foreground">Cargando UTAMV Campus Online...</p>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
};

// Global error handler
const AppErrorHandler = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      toast.error("Ocurrió un error. Intenta de nuevo.");
      event.preventDefault();
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppErrorHandler>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/programas" element={<ProgramasPage />} />
              <Route path="/programas/:id" element={<ProgramasPage />} />
              <Route path="/modulos" element={<ModulosPage />} />
              <Route path="/modelo-educativo" element={<ModeloEducativoPage />} />
              <Route path="/institucional" element={<InstitucionalPage />} />
              <Route path="/admisiones" element={<AdmisionesPage />} />
              <Route path="/docentes" element={<DocentesPage />} />
              <Route path="/foro" element={<ForoPage />} />
              <Route path="/certificados" element={<CertificadosPage />} />
              <Route path="/precios" element={<Pricing />} />

              {/* Auth */}
              <Route path="/auth/login" element={<Auth />} />
              <Route path="/auth/register" element={<Auth />} />

              {/* Protected */}
              <Route path="/campus" element={<ProtectedRoute><Campus /></ProtectedRoute>} />
              <Route path="/campus/curso/:slug" element={<ProtectedRoute><CourseViewer /></ProtectedRoute>} />
              <Route path="/campus/:slug" element={<ProtectedRoute><Campus /></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppErrorHandler>
        </AuthProvider>
      </BrowserRouter>
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
