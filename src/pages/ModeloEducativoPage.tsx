import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  BookOpenCheck, Users, Zap, ShieldCheck, Target, BarChart3,
  CheckCircle2, ArrowRight, Brain, Layers, FileText, Globe
} from 'lucide-react';

const pillars = [
  {
    icon: BookOpenCheck, code: 'OBE', title: 'Educación Basada en Resultados',
    subtitle: 'Outcome-Based Education',
    description: 'El Modelo NextGen 2026 organiza toda la actividad académica alrededor de Resultados de Aprendizaje (RA) medibles, verificables y trazables. Cada módulo define sus RA al inicio y el estudiante construye evidencias que demuestran su dominio. Base: Art. 9-10 Estatuto UTAMV.',
    principles: ['Resultados de Aprendizaje (RA) definidos por módulo', 'Evaluación por evidencias y no por horas de clase', 'Rúbricas estandarizadas y públicas (Art. 19 Reglamento)', 'Retroalimentación formativa continua', 'Portafolio de evidencias como instrumento terminal verificable'],
  },
  {
    icon: Users, code: 'SCL', title: 'Aprendizaje Centrado en el Estudiante',
    subtitle: 'Student-Centered Learning',
    description: 'El alumno es el protagonista activo de su proceso formativo. El docente adopta un rol de facilitador, tutor y diseñador de experiencias. El estudiante aprende haciendo, resolviendo casos reales del ecosistema latinoamericano y construyendo proyectos aplicables.',
    principles: ['Aprendizaje Basado en Proyectos (PBL)', 'Estudios de caso reales del ecosistema LATAM', 'Simulaciones y entornos de práctica profesional', 'Tutoría académica permanente — 48 horas hábiles', 'Autoevaluación y coevaluación estructuradas'],
  },
  {
    icon: Zap, code: 'EDTECH', title: 'Innovación Tecnológica y Digital',
    subtitle: 'Digital-First Education',
    description: 'La plataforma digital es el aula principal. UTAMV integra IA pedagógica, analítica de aprendizaje, plataformas colaborativas y herramientas de producción de contenido bajo los Principios Inmutables de Gobernanza de IA UTAMV 2026.',
    principles: ['Campus 100% online con disponibilidad 24/7', 'IA pedagógica bajo Principios Inmutables UTAMV', 'Analítica de aprendizaje individual y grupal', 'Recursos multimedia: video, podcasts, infografías', 'Integración con herramientas profesionales del sector'],
  },
  {
    icon: ShieldCheck, code: 'ETHICS', title: 'Ética y Responsabilidad Social',
    subtitle: 'Academic Integrity & Social Impact',
    description: 'La dimensión ética es transversal a todo el modelo educativo. UTAMV promueve la integridad académica con un Código de Ética robusto, política antiplagio y un Documento Maestro de Gobernanza de IA — Versión Notarial 2026.',
    principles: ['Código de Ética e Integridad Académica vigente', 'Política antiplagio con detección automatizada', 'Gobernanza de IA: 5 Principios Inmutables UTAMV', 'Responsabilidad social en proyectos aplicados', 'Régimen disciplinario graduado y transparente (Art. 15)'],
  },
];

const methodology = [
  { icon: Target, title: 'Aprendizaje Basado en Proyectos', desc: 'Cada módulo culmina con un entregable concreto y evaluable que puede integrarse al portafolio profesional del estudiante.' },
  { icon: BarChart3, title: 'Estudios de Caso LATAM', desc: 'Análisis de casos reales del mercado latinoamericano y global, con metodología de discusión estructurada y feedback formativo.' },
  { icon: Brain, title: 'IA Pedagógica Ética', desc: 'Integración de IA bajo Principios Inmutables UTAMV: veracidad, no simulación, no sustitución humana e integridad académica.' },
  { icon: Layers, title: 'Portafolios de Evidencias', desc: 'Sistema acumulativo donde el estudiante documenta y evidencia cada competencia desarrollada a lo largo del programa (Art. 19).' },
  { icon: Users, title: 'Tutoría Académica Permanente', desc: 'Acompañamiento individualizado con respuesta en 48 horas hábiles, garantizado por política institucional (Art. 18).' },
  { icon: FileText, title: 'Evaluación por Rúbricas', desc: 'Instrumentos de evaluación públicos, estandarizados y calibrados que garantizan transparencia, equidad y trazabilidad.' },
];

const obeProcess = [
  { step: '01', title: 'Definición de RA', desc: 'Resultados de Aprendizaje específicos, medibles y alcanzables por módulo.' },
  { step: '02', title: 'Diseño de Evidencias', desc: 'Entregables y proyectos que demuestran el dominio de cada RA.' },
  { step: '03', title: 'Proceso Formativo', desc: 'Contenidos, actividades y recursos alineados a los RA definidos.' },
  { step: '04', title: 'Evaluación Continua', desc: 'Retroalimentación formativa en cada etapa del proceso de aprendizaje.' },
  { step: '05', title: 'Portafolio Final', desc: 'Compilación verificable de todas las evidencias del programa completo.' },
];

const ModeloEducativoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Fundamentación Pedagógica · Art. 9-11 Estatuto UTAMV</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4 leading-none">Modelo Educativo</h1>
            <h2 className="font-display text-3xl md:text-4xl italic text-platinum-dim font-light mb-6">UTAMV NextGen 2026</h2>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Un modelo pedagógico de vanguardia que integra Outcome-Based Education, aprendizaje centrado
              en el estudiante, innovación tecnológica con gobernanza de IA y ética como pilares
              indisolubles de la formación superior digital en el ecosistema latinoamericano.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-platinum mb-3">Ciclo OBE</h2>
              <p className="font-body text-sm text-muted-foreground">El proceso completo de Outcome-Based Education en UTAMV (Art. 19 Reglamento Académico)</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--platinum)/0.2)] to-transparent" />
              <div className="grid md:grid-cols-5 gap-4">
                {obeProcess.map((step, i) => (
                  <div key={i} className="relative group text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--platinum)/0.07)] border border-[hsl(var(--platinum)/0.14)] flex items-center justify-center mx-auto mb-4 group-hover:border-[hsl(var(--platinum)/0.35)] group-hover:bg-[hsl(var(--platinum)/0.12)] transition-all">
                      <span className="font-display text-xl font-black text-platinum-gradient">{step.step}</span>
                    </div>
                    <h4 className="font-ui text-sm font-bold text-platinum mb-2">{step.title}</h4>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-academic mb-3 inline-block">Art. 9-10 — Estatuto UTAMV</span>
              <h2 className="font-display text-3xl font-bold text-platinum mb-3">Los Cuatro Pilares</h2>
              <p className="font-body text-sm text-muted-foreground">Ejes fundamentales del Modelo Educativo NextGen 2026</p>
            </div>
            <div className="space-y-5">
              {pillars.map((pillar, i) => (
                <div key={i} className="group p-7 md:p-8 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.07)] hover:border-[hsl(var(--platinum)/0.18)] transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--platinum)/0.08)] border border-[hsl(var(--platinum)/0.15)] flex items-center justify-center group-hover:bg-[hsl(var(--platinum)/0.13)] transition-all">
                        <pillar.icon size={22} className="text-platinum-dim" />
                      </div>
                      <span className="badge-academic text-center text-[9px]">{pillar.code}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-ui text-[9px] text-platinum-deep/60 tracking-widest uppercase mb-1">{pillar.subtitle}</div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-platinum mb-3">{pillar.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{pillar.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {pillar.principles.map((p, pi) => (
                          <div key={pi} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-platinum-dim/40 flex-shrink-0" />
                            <span className="font-body text-xs text-platinum-dim">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-academic mb-3 inline-block">Art. 11 — Reglamento Académico</span>
              <h2 className="font-display text-3xl font-bold text-platinum mb-3">Metodología Académica</h2>
              <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">Estrategias didácticas integradas que garantizan aprendizaje profundo y transferible al contexto profesional latinoamericano.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {methodology.map((m, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.2)] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--platinum)/0.07)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--platinum)/0.13)] transition-all">
                    <m.icon size={18} className="text-platinum-dim" />
                  </div>
                  <h4 className="font-display text-base font-bold text-platinum mb-2">{m.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-card-premium border border-[hsl(var(--platinum)/0.12)]">
            <Globe size={28} className="text-platinum-dim mx-auto mb-4" />
            <h3 className="font-display text-3xl font-bold text-platinum mb-4">Conoce el Marco Normativo Completo</h3>
            <p className="font-body text-sm text-platinum-dim mb-8 max-w-lg mx-auto">
              El Modelo Educativo se sostiene en un Estatuto Orgánico, Reglamento Académico, Código de Ética
              y Documento Maestro de Gobernanza de IA — todos disponibles en el Marco Institucional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/institucional" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold btn-platinum">
                Marco Institucional <ArrowRight size={17} />
              </Link>
              <Link to="/admisiones" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold text-platinum-dim border border-[hsl(var(--platinum)/0.22)] hover:border-[hsl(var(--platinum)/0.45)] hover:text-platinum transition-all">
                Solicitar Admisión
              </Link>
            </div>
          </div>
        </section>
      </main>
      <UTAMVFooter />
    </div>
  );
};

export default ModeloEducativoPage;
