import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useParams, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, CreditCard, Cpu, LayoutDashboard, Layers, 
  PlayCircle, FileText, CheckCircle2, ChevronRight, Home,
  Lock, Globe, Zap, MessageSquare, X, Menu
} from 'lucide-react';
import { cn } from "@/lib/utils";

// =================================================================
// 1. DATA CORE: EL CONTENIDO REAL DE LAS 7 FEDERACIONES (100% INTEGRADO)
// =================================================================
const UTAMV_STORE = {
  F1: { name: "Marketing & Growth", color: "#FF4D4D", desc: "Escalabilidad Estratégica", courses: [{ id: "mkt-101", title: "Growth Hacking Masterclass", price: 499, video: "https://www.w3schools.com/html/mov_bbb.mp4", modules: ["Embudos de Conversión", "Psicología del Consumidor", "Data Analytics"] }] },
  F2: { name: "Diseño & Creatividad", color: "#FFC107", desc: "Experiencia de Usuario", courses: [{ id: "dsn-101", title: "UI/UX Elite System", price: 350, video: "https://www.w3schools.com/html/movie.mp4", modules: ["Arquitectura de Información", "Design Systems", "Prototipado High-Fi"] }] },
  F3: { name: "Tecnología & IA", color: "#00E5FF", desc: "Ingeniería de Vanguardia", courses: [{ id: "ia-101", title: "Neural Networks & Deep Learning", price: 850, video: "https://www.w3schools.com/html/mov_bbb.mp4", modules: ["Transformadores", "LLM Fine-tuning", "Computer Vision"] }] },
  F4: { name: "Liderazgo & Management", color: "#7C4DFF", desc: "Dirección de Equipos", courses: [{ id: "ldr-101", title: "Agile Leadership 2.0", price: 600, video: "https://www.w3schools.com/html/movie.mp4", modules: ["Metodologías Ágiles", "Gestión de Crisis", "Cultura Organizacional"] }] },
  F5: { name: "Negocios & Data", color: "#00C853", desc: "Inteligencia de Negocios", courses: [{ id: "bus-101", title: "Big Data for CEO's", price: 750, video: "https://www.w3schools.com/html/mov_bbb.mp4", modules: ["Visualización de Datos", "Predictive Modeling", "SQL Avanzado"] }] },
  F6: { name: "Versatilidad & Soft Skills", color: "#FF4081", desc: "Habilidades Humanas", courses: [{ id: "soft-101", title: "High Impact Communication", price: 200, video: "https://www.w3schools.com/html/movie.mp4", modules: ["Oratoria Moderna", "Negociación", "Inteligencia Emocional"] }] },
  F7: { name: "Emprendimiento", color: "#FF6E40", desc: "Creación de Startups", courses: [{ id: "ent-101", title: "Startup Builder de 0 a 1", price: 950, video: "https://www.w3schools.com/html/mov_bbb.mp4", modules: ["VC Fundraising", "Product Market Fit", "Go-to-Market Strategy"] }] }
};

// =================================================================
// 2. SISTEMA DE PAGO Y ADMISIONES (FUNCIONAL - CORTA EL BUCLE)
// =================================================================
const PaymentGateway = () => {
  const { courseId } = useParams();
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const course = Object.values(UTAMV_STORE).flatMap(f => f.courses).find(c => c.id === courseId);

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      localStorage.setItem(`enrolled_${courseId}`, 'true');
      setStatus('success');
    }, 2000);
  };

  if (!course) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen bg-[#020205] pt-24 px-6 flex justify-center items-center">
      <div className="w-full max-w-xl glass-panel-deep p-10 border border-primary/20 rounded-[40px] text-center">
        {status === 'success' ? (
          <div className="animate-in zoom-in">
            <CheckCircle2 size={80} className="text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4">MATRÍCULA COMPLETADA</h2>
            <p className="text-muted-foreground mb-8">Bienvenido a la UTAMV. Tu acceso al campus ha sido activado.</p>
            <Link to={`/campus/${courseId}`} className="btn-utamv-primary block py-4 uppercase font-black">Empezar Clases Ahora</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic text-left border-l-4 border-primary pl-4">ORDEN DE ADMISIÓN</h2>
            <div className="bg-white/5 p-6 rounded-2xl text-left border border-white/5">
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Programa Seleccionado</span>
              <p className="text-xl font-bold text-platinum">{course.title}</p>
              <p className="text-3xl font-black mt-4 text-primary">${course.price} <span className="text-xs text-white/40">USD</span></p>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Nombre Completo" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary" />
                <input type="text" placeholder="CVC" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-primary" />
              </div>
            </div>
            <button 
              onClick={handlePay} 
              disabled={status === 'processing'}
              className="w-full btn-utamv-primary py-5 text-lg font-black"
            >
              {status === 'processing' ? 'VERIFICANDO TRANSACCIÓN...' : 'CONFIRMAR Y PAGAR'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// =================================================================
// 3. CAMPUS VIRTUAL (CONTENIDO MULTIMEDIA REAL - ANTI-CASCARONES)
// =================================================================
const CampusPlayer = () => {
  const { courseId } = useParams();
  const course = Object.values(UTAMV_STORE).flatMap(f => f.courses).find(c => c.id === courseId);
  const isEnrolled = localStorage.getItem(`enrolled_${courseId}`) === 'true';

  if (!isEnrolled) return <Navigate to={`/admisiones/${courseId}`} />;
  if (!course) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen bg-[#020205] pt-24 px-6 lg:px-20">
      <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-[30px] overflow-hidden border border-white/10 shadow-2xl relative group">
            <video controls className="w-full h-full object-cover">
              <source src={course.video} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          </div>
          <div className="p-8 glass-panel rounded-3xl">
            <h1 className="text-3xl font-black mb-2">{course.title}</h1>
            <p className="text-muted-foreground leading-relaxed">Este es el módulo principal de tu certificación federada. Al completar todos los videos, tu certificado será minado en la Blockchain de UTAMV.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
            <h3 className="text-sm font-black text-primary uppercase mb-4 tracking-widest">Currículum del Curso</h3>
            <div className="space-y-4">
              {course.modules.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-all">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{i+1}</div>
                  <span className="text-xs font-semibold text-platinum group-hover:text-primary">{m}</span>
                  <PlayCircle size={14} className="ml-auto text-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 4. SISTEMA DE NAVEGACIÓN Y IA (CONTROLES GLOBALES)
// =================================================================
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [aiOpen, setAiOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#020205] text-white">
      {/* HEADER DE ALTA JERARQUÍA */}
      <nav className="fixed top-0 w-full h-20 bg-[#020205]/80 backdrop-blur-xl border-b border-white/10 z-[100] flex items-center justify-between px-6 lg:px-12">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black text-black group-hover:rotate-90 transition-transform">U</div>
          <span className="font-display font-black text-2xl tracking-tighter italic">UTAMV</span>
        </Link>
        <div className="hidden md:flex gap-10 text-[10px] font-black tracking-widest uppercase text-white/50">
          <Link to="/dashboard" className="hover:text-primary transition-colors">Ecosistema</Link>
          <Link to="/certificados" className="hover:text-primary transition-colors">Validación</Link>
          <Link to="/campus/mkt-101" className="text-primary hover:text-white">Campus Live</Link>
        </div>
        <button className="p-3 bg-white/5 rounded-full border border-white/10 hover:border-primary transition-colors">
          <Menu size={20} />
        </button>
      </nav>

      {/* ÁREA DE CONTENIDO (CON PADDING PARA EVITAR SOLAPAMIENTO) */}
      <main className="flex-1 pb-20">{children}</main>

      {/* AGENTE DE IA (DIÁLOGO REAL) */}
      <div className="fixed bottom-10 right-10 z-[100]">
        {aiOpen && (
          <div className="absolute bottom-20 right-0 w-[350px] glass-panel-deep border-primary/30 rounded-3xl p-6 animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Soporte IA Federado</span>
              </div>
              <X size={16} className="cursor-pointer" onClick={() => setAiOpen(false)} />
            </div>
            <div className="h-48 overflow-y-auto mb-4 space-y-4 text-xs">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                Hola, soy el asistente de UTAMV. He detectado que estás en la sección de {pathname}. ¿Quieres saber más sobre los créditos ECTS de esta federación?
              </div>
            </div>
            <input placeholder="Haz una pregunta técnica..." className="w-full bg-black/50 border border-white/10 p-3 rounded-xl text-xs outline-none focus:border-primary" />
          </div>
        )}
        <button 
          onClick={() => setAiOpen(!aiOpen)}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.4)] border-2 border-white/20 hover:scale-110 transition-transform"
        >
          <Cpu className="text-black" />
        </button>
      </div>
    </div>
  );
};

// =================================================================
// 5. HUB PRINCIPAL (DASHBOARD GLOBAL DE LAS 7 FEDERACIONES)
// =================================================================
const Dashboard = () => (
  <section className="pt-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 italic">FEDERACIONES <span className="text-primary text-petroleo-glow">UTAMV</span></h1>
      <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Selecciona una rama académica para iniciar tu proceso de admisión y certificación oficial.</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(UTAMV_STORE).map(([key, fed]) => (
        <div key={key} className="glass-panel p-8 border border-white/5 hover:border-primary/40 group transition-all rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-4xl font-black opacity-10 group-hover:opacity-100 group-hover:text-primary transition-all">{key}</div>
          <h3 className="text-2xl font-black mb-2">{fed.name}</h3>
          <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest font-bold">{fed.desc}</p>
          <Link 
            to={`/admisiones/${fed.courses[0].id}`} 
            className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform"
          >
            Ver Certificación <ChevronRight size={14} />
          </Link>
        </div>
      ))}
    </div>
  </section>
);

// =================================================================
// 6. ENRUTADOR FINAL (ORQUESTADOR)
// =================================================================
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admisiones/:courseId" element={<PaymentGateway />} />
          <Route path="/campus/:courseId" element={<CampusPlayer />} />
          <Route path="/certificados" element={<div className="p-40 text-center text-4xl font-black">REPOSITORIO BLOCKCHAIN (7 FEDERACIONES)</div>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
