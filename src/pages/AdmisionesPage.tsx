import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import EliteBackground from '@/components/EliteBackground';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock, Mail, Globe, AlertTriangle, BookOpen, Award, Users } from 'lucide-react';

const AdmisionesPage = () => {
  const steps = [
    { n: '01', title: 'Revisión de Oferta Académica', desc: 'Explora los programas disponibles y selecciona el nivel de formación adecuado para tu perfil profesional y objetivos de carrera.' },
    { n: '02', title: 'Solicitud de Admisión', desc: 'Completa el formulario de solicitud con tu información personal, académica y profesional. Incluye carta de motivos y CV actualizado.' },
    { n: '03', title: 'Evaluación de Perfil', desc: 'El Comité de Admisiones revisa tu expediente con criterios transparentes, equitativos y no discriminatorios (Art. 13 Reglamento UTAMV).' },
    { n: '04', title: 'Notificación y Acceso', desc: 'Recibes confirmación de admisión y acceso a la plataforma del Campus Online UTAMV con disponibilidad 24/7.' },
  ];

  const requirements = [
    { level: 'Certificaciones', reqs: ['Título o constancia de bachillerato', 'Identificación oficial vigente', 'Carta de motivos o declaración de objetivos profesionales'] },
    { level: 'Diplomados', reqs: ['Título o constancia de bachillerato', 'Identificación oficial vigente', 'Currículum vitae actualizado', 'Carta de motivos'] },
    { level: 'Máster Profesional', reqs: ['Título de licenciatura o constancia de estudios superiores', 'Identificación oficial vigente', 'Currículum vitae profesional actualizado', 'Carta de motivos con objetivos académicos y profesionales', 'Comprobante de experiencia profesional (deseable)'] },
    { level: 'Maestrías y Posgrado', reqs: ['Título de licenciatura y acta de examen profesional', 'Identificación oficial vigente', 'Currículum vitae con experiencia profesional', 'Carta de motivos e intención de investigación', 'Comprobante de experiencia profesional mínima de 2 años'] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="pt-28 pb-24 relative">
        <section className="relative container mx-auto px-4 mb-16 py-12 overflow-hidden">
          <EliteBackground variant="petrol" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="badge-academic mb-4 inline-block">Proceso de Ingreso 2026 · Art. 13 Reglamento UTAMV</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">Admisiones UTAMV</h1>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Proceso de admisión transparente, equitativo y documentado, conforme al Artículo 13 del Reglamento
              Académico General UTAMV. Sin discriminación por razón de origen, género, condición socioeconómica,
              creencia religiosa o cualquier otra condición.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-platinum mb-2">Proceso de Admisión — 4 Pasos</h2>
              <p className="font-body text-sm text-muted-foreground">Proceso claro, documentado y sin burocracia innecesaria</p>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <div key={i} className="group p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.07)] hover:border-[hsl(var(--platinum)/0.22)] transition-all text-center">
                  <div className="font-display text-4xl font-black text-platinum-gradient mb-3">{s.n}</div>
                  <h4 className="font-ui text-sm font-bold text-platinum mb-2">{s.title}</h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements by level */}
        <section className="container mx-auto px-4 mb-16" id="requisitos">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-platinum mb-2">Requisitos por Nivel Académico</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {requirements.map((r, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.08)]">
                  <h3 className="font-display text-lg font-bold text-platinum mb-4">{r.level}</h3>
                  <ul className="space-y-2.5">
                    {r.reqs.map((req, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-platinum-dim/45 mt-0.5 flex-shrink-0" />
                        <span className="font-body text-sm text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact + Programs CTA */}
        <section className="container mx-auto px-4 mb-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.1)]">
              <h3 className="font-display text-xl font-bold text-platinum mb-5">Contacto Académico</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-platinum-dim" />
                  <span className="font-ui text-sm text-muted-foreground">admisiones@utamv.edu.mx</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-platinum-dim" />
                  <span className="font-ui text-sm text-muted-foreground">contacto@utamv.edu.mx</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={15} className="text-platinum-dim" />
                  <span className="font-ui text-sm text-muted-foreground">Campus 100% Online · Mineral del Monte, Hgo.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-platinum-dim" />
                  <span className="font-ui text-sm text-muted-foreground">Respuesta en 48-72 horas hábiles (garantizado Art. 18)</span>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[hsl(var(--platinum)/0.04)] border border-[hsl(var(--platinum)/0.18)]">
              <h3 className="font-display text-xl font-bold text-platinum mb-4">Programas Disponibles</h3>
              <div className="space-y-3 mb-6">
                {[
                  { icon: Award, label: 'Maestría en Marketing Digital Estratégico', sub: '18 meses · Posgrado' },
                  { icon: BookOpen, label: 'Máster Profesional — Marketing Digital 2026', sub: '6 meses · 10 módulos OBE' },
                  { icon: Users, label: 'Diplomados y Certificaciones', sub: '1 semana a 4 meses' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[hsl(var(--platinum)/0.1)]">
                    <p.icon size={16} className="text-platinum-dim flex-shrink-0" />
                    <div>
                      <div className="font-ui text-xs font-semibold text-platinum">{p.label}</div>
                      <div className="font-ui text-[10px] text-muted-foreground">{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/programas" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui text-sm font-semibold btn-platinum">
                Ver Todos los Programas <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto p-5 rounded-2xl bg-[hsl(0_72%_51%/0.04)] border border-[hsl(0_72%_51%/0.12)]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={15} className="text-destructive mt-0.5 flex-shrink-0" />
              <p className="font-ui text-xs text-muted-foreground leading-relaxed">
                <strong className="text-platinum-dim">Aviso Legal Pre-RVOE (Art. 21-23 Estatuto UTAMV):</strong>{' '}
                Los estudios ofrecidos por UTAMV tienen carácter institucional privado y no cuentan con reconocimiento
                de validez oficial ante la SEP u otra autoridad educativa competente, salvo resolución expresa y vigente.
                UTAMV se encuentra en proceso de preparación y solicitud de RVOE.
                «Estudios sin reconocimiento de validez oficial.»
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
