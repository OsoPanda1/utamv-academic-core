import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock, BookOpen, AlertTriangle, Mail, Globe } from 'lucide-react';

const AdmisionesPage = () => {
  const steps = [
    { n: '01', title: 'Revisión de Oferta Académica', desc: 'Explora los programas disponibles y selecciona el nivel de formación adecuado para tu perfil profesional.' },
    { n: '02', title: 'Solicitud de Admisión', desc: 'Completa el formulario de solicitud con tu información personal, académica y profesional.' },
    { n: '03', title: 'Evaluación de Perfil', desc: 'El Comité de Admisiones revisa tu expediente y determina la idoneidad del programa seleccionado.' },
    { n: '04', title: 'Notificación y Acceso', desc: 'Recibes confirmación de admisión y acceso a la plataforma del Campus Online UTAMV.' },
  ];

  const requirements = [
    'Título o constancia de estudios previos (nivel bachillerato como mínimo para certificaciones)',
    'Identificación oficial vigente',
    'Carta de motivos o declaración de objetivos profesionales',
    'Currículum vitae actualizado (para programas de posgrado)',
    'Para maestrías: título de licenciatura y comprobante de experiencia profesional',
  ];

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Proceso de Ingreso 2026</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">Admisiones UTAMV</h1>
            <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed">
              Proceso de admisión transparente, equitativo y documentado, conforme al Artículo 13 del Reglamento Académico General UTAMV.
              Sin discriminación de ningún tipo.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-platinum mb-2">Proceso de Admisión</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <div key={i} className="group p-5 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.25)] transition-all text-center">
                  <div className="font-display text-4xl font-black text-gold-gradient mb-3">{s.n}</div>
                  <h4 className="font-ui text-sm font-bold text-platinum mb-2">{s.title}</h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-7 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.1)]">
              <h3 className="font-display text-xl font-bold text-platinum mb-5">Requisitos de Ingreso</h3>
              <ul className="space-y-3">
                {requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-gold/50 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-7 rounded-2xl bg-gradient-to-br from-[hsl(var(--gold)/0.1)] to-[hsl(var(--gold)/0.03)] border border-[hsl(var(--gold)/0.25)]">
              <h3 className="font-display text-xl font-bold text-platinum mb-5">Contacto Académico</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gold" />
                  <span className="font-ui text-sm text-platinum-dim">admisiones@utamv.edu.mx</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-gold" />
                  <span className="font-ui text-sm text-platinum-dim">Campus 100% Online · Modalidad Digital</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-gold" />
                  <span className="font-ui text-sm text-platinum-dim">Respuesta en 48-72 horas hábiles</span>
                </div>
              </div>
              <Link to="/programas" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui text-sm font-semibold text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold transition-all hover:opacity-90">
                Ver Programas <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-[hsl(0_72%_51%/0.05)] border border-[hsl(0_72%_51%/0.15)]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-destructive mt-0.5 flex-shrink-0" />
              <p className="font-ui text-xs text-muted-foreground leading-relaxed">
                <strong className="text-gold">Aviso Legal Pre-RVOE:</strong> Los estudios ofrecidos por UTAMV tienen carácter institucional privado y no cuentan con reconocimiento de validez oficial ante la SEP, salvo resolución expresa vigente.
              </p>
            </div>
          </div>
        </section>
      </main>
      <UTAMVFooter />
    </div>
  );
};

export default AdmisionesPage;
