import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  BookOpen, Users, Award, Brain, Target, Globe, ShieldCheck,
  BarChart3, GraduationCap, ChevronRight, Layers, Zap, Clock,
  TrendingUp, Briefcase, BookOpenCheck, Building2, FileText,
  ArrowRight, Star, CheckCircle2, Medal, Microscope, Scale
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import utamvLogo from '@/assets/utamv-logo.png';

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: '10', unit: 'Módulos', label: 'Curriculares OBE' },
  { value: '4', unit: 'Ejes', label: 'Formativos NextGen' },
  { value: '50+', unit: 'Horas', label: 'de contenido avanzado' },
  { value: '100%', unit: 'Online', label: 'Campus Digital' },
];

const academicAreas = [
  {
    icon: BarChart3,
    title: 'Marketing Digital Avanzado',
    description: 'SEO, AEO, Paid Media, Social Media y estrategia de contenidos con metodología OBE verificable.',
    tag: 'Eje Estratégico',
  },
  {
    icon: Brain,
    title: 'Inteligencia Artificial Aplicada',
    description: 'Automatización, análisis predictivo, prompting estratégico y ética en IA para entornos empresariales.',
    tag: 'Tecnología Avanzada',
  },
  {
    icon: Target,
    title: 'Analítica y Toma de Decisiones',
    description: 'GA4, dashboards ejecutivos, KPIs accionables, cohortes y funnels de conversión data-driven.',
    tag: 'Data & Métricas',
  },
  {
    icon: Globe,
    title: 'Comunicación y Marca Digital',
    description: 'Storytelling, sistemas de contenido, gestión de comunidades y arquitectura de marca omnicanal.',
    tag: 'Versatilidad Profesional',
  },
];

const programs = [
  {
    type: 'Certificado Profesional',
    title: 'Fundamentos de Marketing Digital',
    hours: '5 horas',
    duration: '1 semana',
    level: 'Introductorio',
    slug: 'fundamentos-marketing-digital',
    color: 'from-blue-900/40 to-blue-800/20',
    border: 'border-blue-700/20',
  },
  {
    type: 'Máster Profesional',
    title: 'Marketing Digital 2026',
    hours: '50+ horas',
    duration: '6 meses',
    level: 'Avanzado',
    slug: 'master-marketing-digital-2026',
    featured: true,
    color: 'from-[hsl(var(--gold)/0.2)] to-[hsl(var(--gold)/0.05)]',
    border: 'border-[hsl(var(--gold)/0.35)]',
  },
  {
    type: 'Doctorado Profesional',
    title: 'Inteligencia Estratégica Digital',
    hours: '120+ horas',
    duration: '12 meses',
    level: 'Especialización',
    slug: 'doctorado-inteligencia-estrategica',
    color: 'from-emerald-900/40 to-emerald-800/20',
    border: 'border-emerald-700/20',
  },
];

const model4Pillars = [
  { icon: BookOpenCheck, title: 'OBE', subtitle: 'Outcome-Based Education', desc: 'Evaluación mediante resultados medibles, evidencias y rúbricas estandarizadas.' },
  { icon: Users, title: 'Centrado en el Estudiante', subtitle: 'Student-Centered Learning', desc: 'El alumno es protagonista activo con portafolios de evidencias y tutoría permanente.' },
  { icon: Zap, title: 'Innovación Digital', subtitle: 'EdTech & Digital Learning', desc: 'Plataformas, simulaciones, casos reales y proyectos aplicados al entorno actual.' },
  { icon: ShieldCheck, title: 'Ética Verificable', subtitle: 'Academic Integrity', desc: 'Código de integridad académica, política antiplagio y responsabilidad social.' },
];

const academicLevels = [
  { icon: BookOpenCheck, title: 'Maestrías', description: 'Posgrado avanzado con profundización especializada y tesis aplicada.', duration: '12-18 meses', level: 'Posgrado' },
  { icon: Briefcase, title: 'Máster Profesional', description: 'Formación estratégica para líderes digitales con portafolio de proyectos.', duration: '6-12 meses', level: 'Especialización' },
  { icon: TrendingUp, title: 'Diplomados', description: 'Actualización profesional intensiva en marketing digital y tecnología.', duration: '3-6 meses', level: 'Formación' },
  { icon: Building2, title: 'Certificaciones', description: 'Desarrollo de competencias específicas y verificación por evidencias.', duration: '1-3 meses', level: 'Certificación' },
];

// ── Component ─────────────────────────────────────────────────────────────────

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main>
        {/* ══ HERO ════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_30%_6%/0.7)] via-[hsl(220_30%_6%/0.5)] to-[hsl(220_30%_6%)]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          {/* Decorative glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">

              {/* Logo Badge */}
              <div className="w-24 h-24 mx-auto mb-8 rounded-2xl overflow-hidden bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.3)] flex items-center justify-center animate-float shadow-gold">
                <img src={utamvLogo} alt="UTAMV" className="w-20 h-20 object-contain" />
              </div>

              {/* Legal Notice Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.2)] mb-6 animate-fade-in-up">
                <ShieldCheck size={13} className="text-gold" />
                <span className="font-ui text-[11px] text-gold tracking-[0.12em] uppercase font-medium">
                  Institución Privada · Proceso Pre-RVOE · Campus 100% Digital
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-platinum mb-4 leading-none animate-fade-in-up delay-100">
                UTAMV
              </h1>
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-normal italic text-gold-light mb-3 animate-fade-in-up delay-200">
                Elite Masterclass
              </h2>
              <p className="font-ui text-sm tracking-[0.2em] uppercase text-platinum-dim mb-8 animate-fade-in-up delay-300">
                Universidad de Tecnología Avanzada, Marketing y Versatilidad
              </p>

              <p className="font-body text-lg md:text-xl text-platinum/75 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-300">
                Campus online de formación superior bajo el <strong className="text-platinum">Modelo NextGen 2026</strong> —
                educación basada en competencias, evidencias verificables y resultados de aprendizaje medibles (OBE)
                para profesionales del ecosistema digital latinoamericano.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-400">
                <Link
                  to="/programas"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-base font-semibold tracking-wide text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold transition-all hover:opacity-90"
                >
                  Explorar Programas <ArrowRight size={18} />
                </Link>
                <Link
                  to="/modelo-educativo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-base font-semibold tracking-wide text-platinum border border-[hsl(var(--gold)/0.3)] hover:border-[hsl(var(--gold)/0.6)] hover:bg-[hsl(var(--gold)/0.06)] transition-all"
                >
                  Modelo NextGen 2026
                </Link>
              </div>

              {/* Scroll indicator */}
              <div className="animate-fade-in-up delay-500">
                <div className="scroll-line" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ════════════════════════════════════════════════════════════ */}
        <section className="py-16 border-b border-[hsl(var(--gold)/0.08)] bg-[hsl(220_28%_7%)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="stat-number">
                    {s.value}<span className="text-3xl font-display italic text-gold/60 ml-1">{s.unit}</span>
                  </div>
                  <p className="font-ui text-sm text-muted-foreground mt-2 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ACADEMIC AREAS ═══════════════════════════════════════════════════ */}
        <section className="py-24 relative bg-dot-pattern">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge-academic mb-4 inline-block">Áreas de Conocimiento</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                Ejes de Formación
                <span className="block text-gold-gradient italic font-normal text-3xl md:text-4xl mt-1">NextGen 2026</span>
              </h2>
              <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed">
                Cuatro dominios de especialización alineados con las demandas del mercado digital contemporáneo,
                diseñados con metodología OBE y evaluación continua por evidencias.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {academicAreas.map((area, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.3)] transition-all duration-300 hover:shadow-gold cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--gold)/0.15)] transition-all">
                    <area.icon size={22} className="text-gold" />
                  </div>
                  <span className="badge-academic mb-3 inline-block text-[10px]">{area.tag}</span>
                  <h3 className="font-display text-lg font-bold text-platinum mb-2 leading-tight">{area.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MODEL EDUCATIVO ══════════════════════════════════════════════════ */}
        <section className="py-24 bg-[hsl(220_28%_7%)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="badge-academic mb-4 inline-block">Pedagogía</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-6 leading-tight">
                    Modelo Educativo
                    <span className="block text-gold-gradient italic">NextGen 2026</span>
                  </h2>
                  <p className="font-body text-platinum-dim leading-relaxed mb-8">
                    Un modelo pedagógico de vanguardia basado en <strong className="text-platinum">Outcome-Based Education (OBE)</strong>,
                    donde el aprendizaje se mide por resultados verificables, no por horas de clase.
                    Diseñado para entornos digitales e híbridos del siglo XXI.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      'Resultados de aprendizaje medibles y trazables',
                      'Portafolio de evidencias como sistema evaluativo',
                      'Aprendizaje basado en proyectos reales',
                      'Tutoría académica permanente y seguimiento personalizado',
                      'Rúbricas estandarizadas y retroalimentación continua',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                        <span className="font-body text-sm text-platinum-dim">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/modelo-educativo"
                    className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-gold hover:text-gold-light transition-colors group"
                  >
                    Conocer el Modelo Completo
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {model4Pillars.map((p, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.1)] hover:border-[hsl(var(--gold)/0.25)] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[hsl(var(--gold)/0.1)] flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--gold)/0.18)] transition-all">
                        <p.icon size={18} className="text-gold" />
                      </div>
                      <div className="font-ui text-xs text-gold/60 tracking-wide uppercase mb-0.5">{p.subtitle}</div>
                      <h4 className="font-display text-base font-bold text-platinum mb-2">{p.title}</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PROGRAMS ═════════════════════════════════════════════════════════ */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge-academic mb-4 inline-block">Oferta Académica</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                Programas Destacados
              </h2>
              <p className="font-body text-platinum-dim max-w-xl mx-auto">
                Formación estructurada por niveles académicos, desde introducción hasta especialización avanzada.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {programs.map((prog, i) => (
                <div
                  key={i}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${prog.color} border ${prog.border} transition-all duration-300 hover:scale-[1.02] hover:shadow-gold group ${prog.featured ? 'ring-1 ring-gold/30' : ''}`}
                >
                  {prog.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-academic text-[10px] bg-[hsl(var(--background))]">
                      ★ Programa Insignia
                    </div>
                  )}
                  <div className="font-ui text-xs font-medium tracking-wide text-gold/70 uppercase mb-2">{prog.type}</div>
                  <h3 className="font-display text-xl font-bold text-platinum mb-4 leading-tight">{prog.title}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-platinum-dim">
                      <Clock size={14} className="text-gold/60" />
                      <span className="font-ui text-sm">{prog.hours} · {prog.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-platinum-dim">
                      <Medal size={14} className="text-gold/60" />
                      <span className="font-ui text-sm">{prog.level}</span>
                    </div>
                  </div>
                  <Link
                    to={`/programas/${prog.slug}`}
                    className={`inline-flex items-center gap-1.5 font-ui text-sm font-semibold transition-all group/btn ${
                      prog.featured
                        ? 'text-gold hover:text-gold-light'
                        : 'text-platinum-dim hover:text-gold'
                    }`}
                  >
                    Ver programa <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/programas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui text-sm font-semibold text-platinum border border-[hsl(var(--gold)/0.25)] hover:border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.05)] transition-all"
              >
                Ver Todos los Programas <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ ACADEMIC LEVELS ══════════════════════════════════════════════════ */}
        <section className="py-24 bg-[hsl(220_28%_7%)] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge-academic mb-4 inline-block">Niveles de Formación</span>
              <h2 className="font-display text-4xl font-bold text-platinum mb-4">
                Estructura Académica
              </h2>
              <p className="font-body text-platinum-dim max-w-xl mx-auto">
                Cuatro niveles de formación diseñados para diferentes etapas del desarrollo profesional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {academicLevels.map((level, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.25)] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[hsl(var(--gold)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--gold)/0.18)] transition-all">
                      <level.icon size={20} className="text-gold" />
                    </div>
                    <span className="font-ui text-[10px] font-semibold tracking-wider text-muted-foreground uppercase border border-muted rounded-full px-2 py-1">{level.level}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-platinum mb-2">{level.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{level.description}</p>
                  <div className="flex items-center gap-2 text-gold/70">
                    <Clock size={13} />
                    <span className="font-ui text-xs font-medium">{level.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MODULES PREVIEW ══════════════════════════════════════════════════ */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="badge-academic mb-3 inline-block">Currículo Académico</span>
                  <h2 className="font-display text-4xl font-bold text-platinum">
                    10 Módulos del Máster
                  </h2>
                  <p className="font-body text-platinum-dim mt-2">Programa completo de Marketing Digital 2026</p>
                </div>
                <Link to="/modulos" className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-gold hover:text-gold-light transition-colors group flex-shrink-0">
                  Ver Currículo Completo <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { n: '01', title: 'Fundamentos del Marketing Digital', tag: 'Introductorio' },
                  { n: '02', title: 'SEO, AEO y Optimización Web', tag: 'Técnico' },
                  { n: '03', title: 'Publicidad Digital y Paid Media', tag: 'Performance' },
                  { n: '04', title: 'Social Media y Estrategia de Contenidos', tag: 'Editorial' },
                  { n: '05', title: 'Email Marketing, Automatización y CRM', tag: 'Automatización' },
                  { n: '06', title: 'Analítica Digital, Data y Métricas', tag: 'Data' },
                  { n: '07', title: 'UX, CRO y Experiencia de Usuario', tag: 'Conversión' },
                  { n: '08', title: 'Estrategia de Marca y Contenido Avanzado', tag: 'Branding' },
                  { n: '09', title: 'Inteligencia Artificial aplicada al Marketing', tag: 'IA Avanzada' },
                  { n: '10', title: 'Plan Maestro y Proyecto Final UTAMV', tag: 'Proyecto OBE' },
                ].map((mod, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-[hsl(var(--gold)/0.07)] hover:border-[hsl(var(--gold)/0.2)] transition-all group cursor-default"
                  >
                    <div className="font-display text-2xl font-black text-gold/20 group-hover:text-gold/40 transition-colors w-10 flex-shrink-0 text-center leading-none">
                      {mod.n}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body text-sm font-medium text-platinum group-hover:text-gold-light transition-colors leading-tight">{mod.title}</div>
                    </div>
                    <span className="badge-academic text-[10px] flex-shrink-0 hidden sm:block">{mod.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ INSTITUTIONAL FRAMEWORK ══════════════════════════════════════════ */}
        <section className="py-24 bg-[hsl(220_28%_7%)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="badge-academic mb-4 inline-block">Marco Normativo</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-6">
                Bloque Institucional
                <span className="block text-gold-gradient italic text-3xl md:text-4xl mt-1">Normativo · Legal · Académico</span>
              </h2>
              <p className="font-body text-platinum-dim max-w-2xl mx-auto mb-12 leading-relaxed">
                UTAMV opera bajo un Estatuto Orgánico, Reglamento Académico, Código de Ética y bloque normativo
                unificado diseñado para transparencia institucional y preparación de expedientes Pre-RVOE.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { icon: FileText, title: 'Estatuto Orgánico', desc: 'Estructura de gobierno, Consejo de Fundadores, Rectoría y órganos académicos.' },
                  { icon: GraduationCap, title: 'Reglamento Académico', desc: 'Procesos de admisión, evaluación OBE, régimen disciplinario y tutorías.' },
                  { icon: ShieldCheck, title: 'Código de Ética', desc: 'Integridad académica, antiplagio, responsabilidad social y honestidad institucional.' },
                  { icon: Scale, title: 'Aviso Pre-RVOE', desc: 'Transparencia legal: estudios con carácter institucional privado, proceso de solicitud RVOE.' },
                ].map((item, i) => (
                  <Link key={i} to="/institucional" className="group p-5 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.3)] transition-all text-left">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(var(--gold)/0.1)] flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--gold)/0.18)] transition-all">
                      <item.icon size={18} className="text-gold" />
                    </div>
                    <h4 className="font-display text-base font-bold text-platinum mb-1.5">{item.title}</h4>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </Link>
                ))}
              </div>

              <Link
                to="/institucional"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui text-sm font-semibold text-platinum border border-[hsl(var(--gold)/0.25)] hover:border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.05)] transition-all"
              >
                Marco Institucional Completo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ════════════════════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220_35%_7%)] via-[hsl(220_30%_9%)] to-[hsl(220_35%_7%)]" />
          <div className="absolute inset-0 bg-dot-pattern opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.2)] mb-8">
                <Star size={13} className="text-gold" />
                <span className="font-ui text-xs text-gold tracking-wide uppercase font-medium">Proceso de Admisión Abierto 2026</span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl font-black text-platinum mb-6 leading-tight">
                Eleva Tu Perfil
                <span className="block text-gold-gradient italic font-normal text-3xl md:text-5xl">Profesional Digital</span>
              </h2>
              <p className="font-body text-platinum-dim mb-10 max-w-xl mx-auto leading-relaxed">
                Únete a la comunidad UTAMV. Formación basada en competencias reales,
                metodología NextGen 2026 y acompañamiento académico continuo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/admisiones"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-base font-semibold tracking-wide text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold transition-all hover:opacity-90"
                >
                  Solicitar Admisión <ArrowRight size={18} />
                </Link>
                <Link
                  to="/modulos"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-base font-semibold text-platinum border border-[hsl(var(--gold)/0.25)] hover:border-[hsl(var(--gold)/0.5)] hover:bg-[hsl(var(--gold)/0.05)] transition-all"
                >
                  Ver Currículo
                </Link>
              </div>

              <div className="mt-12 p-5 rounded-2xl bg-[hsl(var(--gold)/0.04)] border border-[hsl(var(--gold)/0.12)] max-w-2xl mx-auto">
                <p className="font-ui text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-gold">⚠ Aviso Legal:</strong> Los estudios ofrecidos por UTAMV tienen carácter institucional privado.
                  No cuentan con reconocimiento de validez oficial ante la SEP salvo resolución expresa vigente.
                  UTAMV está en proceso de preparación y solicitud de RVOE.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};


export default Index;

