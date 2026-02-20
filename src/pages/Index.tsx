import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  BookOpen, Users, Award, Brain, Target, Globe, ShieldCheck,
  BarChart3, GraduationCap, ChevronRight, Zap, Clock,
  TrendingUp, Briefcase, BookOpenCheck, Building2,
  ArrowRight, CheckCircle2, Medal, Scale, FileText,
  Star, Microscope, Layers
} from 'lucide-react';
import utamvLogoOfficial from '@/assets/utamv-logo-official.png';

const stats = [
  { value: '10', unit: 'Módulos', label: 'Curriculares OBE' },
  { value: '4', unit: 'Ejes', label: 'Formativos NextGen' },
  { value: '50+', unit: 'Horas', label: 'de contenido avanzado' },
  { value: '100%', unit: 'Online', label: 'Campus Digital 24/7' },
];

const academicAreas = [
  {
    icon: BarChart3,
    title: 'Marketing Digital Avanzado',
    description: 'SEO, AEO, Paid Media, Social Media y estrategia de contenidos con metodología OBE verificable y activos descargables.',
    tag: 'Eje Estratégico',
  },
  {
    icon: Brain,
    title: 'Inteligencia Artificial Aplicada',
    description: 'Automatización, análisis predictivo, prompting estratégico y ética en IA bajo los Principios Inmutables UTAMV 2026.',
    tag: 'Tecnología Avanzada',
  },
  {
    icon: Target,
    title: 'Analítica y Toma de Decisiones',
    description: 'GA4, dashboards ejecutivos, KPIs accionables, cohortes y funnels de conversión data-driven para mercados LATAM.',
    tag: 'Data & Métricas',
  },
  {
    icon: Globe,
    title: 'Comunicación y Marca Digital',
    description: 'Storytelling, sistemas de contenido, gestión de comunidades y arquitectura de marca omnicanal para el ecosistema latinoamericano.',
    tag: 'Versatilidad Profesional',
  },
];

const model4Pillars = [
  {
    icon: BookOpenCheck,
    title: 'OBE',
    subtitle: 'Outcome-Based Education',
    desc: 'Evaluación mediante resultados medibles, evidencias y rúbricas estandarizadas públicas. Art. 19 Reglamento UTAMV.',
  },
  {
    icon: Users,
    title: 'Centrado en el Estudiante',
    subtitle: 'Student-Centered Learning',
    desc: 'El alumno es protagonista activo con portafolios de evidencias, tutoría permanente y autoevaluación estructurada.',
  },
  {
    icon: Zap,
    title: 'Innovación Digital',
    subtitle: 'EdTech & Digital Learning',
    desc: 'Plataformas, simulaciones, casos reales, IA pedagógica y proyectos aplicados al entorno digital contemporáneo.',
  },
  {
    icon: ShieldCheck,
    title: 'Ética Verificable',
    subtitle: 'Academic Integrity',
    desc: 'Código de ética, política antiplagio, gobernanza de IA y responsabilidad social como valores institucionales.',
  },
];

const academicLevels = [
  {
    icon: Microscope,
    title: 'Maestrías',
    description: 'Posgrado avanzado con profundización especializada, investigación aplicada y tesis final verificable.',
    duration: '12-18 meses',
    level: 'Posgrado',
  },
  {
    icon: Briefcase,
    title: 'Máster Profesional',
    description: 'Formación estratégica para líderes digitales con 10 módulos OBE y portafolio de proyectos aplicados.',
    duration: '6 meses',
    level: 'Especialización',
  },
  {
    icon: TrendingUp,
    title: 'Diplomados',
    description: 'Actualización profesional intensiva en marketing digital, SEO/AEO, Paid Media y tecnología aplicada.',
    duration: '3-4 meses',
    level: 'Formación Continua',
  },
  {
    icon: Award,
    title: 'Certificaciones',
    description: 'Desarrollo de competencias específicas con evidencias verificables y certificado institucional OBE.',
    duration: '1-2 semanas',
    level: 'Certificación',
  },
];

const courseModules = [
  { n: '01', title: 'Fundamentos del Marketing Digital', tag: 'Introductorio' },
  { n: '02', title: 'SEO, AEO y Optimización Web', tag: 'Técnico' },
  { n: '03', title: 'Publicidad Digital y Paid Media', tag: 'Performance' },
  { n: '04', title: 'Social Media y Contenidos', tag: 'Editorial' },
  { n: '05', title: 'Email Marketing y Automatización', tag: 'CRM' },
  { n: '06', title: 'Analítica Digital y Métricas', tag: 'Data' },
  { n: '07', title: 'UX, CRO y Experiencia de Usuario', tag: 'Conversión' },
  { n: '08', title: 'Estrategia de Marca Avanzada', tag: 'Branding' },
  { n: '09', title: 'Inteligencia Artificial al Marketing', tag: 'IA Avanzada' },
  { n: '10', title: 'Plan Maestro y Proyecto Final', tag: 'Proyecto OBE' },
];

const iaPrinciples = [
  { n: '1', title: 'Veracidad Académica', desc: 'La IA no inventará ni falseará información sin respaldo académico verificable.' },
  { n: '2', title: 'No Simulación', desc: 'Prohibido emitir, prometer o insinuar títulos, grados o validez oficial inexistente.' },
  { n: '3', title: 'No Sustitución Humana', desc: 'La IA no sustituye docentes, evaluadores ni autoridades académicas o administrativas.' },
  { n: '4', title: 'Integridad Académica', desc: 'La IA no elaborará trabajos evaluables destinados a presentarse como producción original del usuario.' },
  { n: '5', title: 'Autonomía Intelectual', desc: 'La IA fomenta pensamiento crítico, análisis y construcción activa del conocimiento.' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main>
        {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_35%_5%/0.3)] via-transparent to-[hsl(222_35%_5%)]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          {/* Atmospheric platinum orbs */}
          <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-[hsl(var(--platinum)/0.03)] blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/5 w-60 h-60 rounded-full bg-[hsl(var(--platinum)/0.025)] blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Official Logo — platinum shield */}
              <div className="w-28 h-28 mx-auto mb-8 rounded-2xl overflow-hidden bg-[hsl(var(--platinum)/0.05)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center animate-float shadow-platinum">
                <img src={utamvLogoOfficial} alt="UTAMV" className="w-24 h-24 object-contain" />
              </div>

              {/* Legal Notice */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.18)] mb-6 animate-fade-in-up">
                <ShieldCheck size={12} className="text-platinum-dim" />
                <span className="font-ui text-[10px] text-platinum-dim tracking-[0.14em] uppercase font-medium">
                  Institución Privada · Proceso Pre-RVOE · Campus 100% Digital · Mineral del Monte, Hgo.
                </span>
              </div>

              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-platinum mb-3 leading-none animate-fade-in-up delay-100">
                UTAMV
              </h1>
              <h2 className="font-display text-xl md:text-3xl font-light italic text-platinum-dim mb-3 animate-fade-in-up delay-200 tracking-wide">
                Elite Masterclass
              </h2>
              <p className="font-ui text-[10px] tracking-[0.28em] uppercase text-platinum-deep mb-8 animate-fade-in-up delay-300">
                Universidad de Tecnología Avanzada, Marketing y Versatilidad
              </p>

              <p className="font-body text-lg md:text-xl text-platinum/65 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300">
                Campus online de formación superior bajo el{' '}
                <strong className="text-platinum/85">Modelo NextGen 2026</strong> — educación basada
                en competencias, evidencias verificables y resultados de aprendizaje medibles (OBE)
                para profesionales del ecosistema digital latinoamericano.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in-up delay-400">
                <Link
                  to="/programas"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold tracking-wide btn-platinum"
                >
                  Explorar Programas <ArrowRight size={17} />
                </Link>
                <Link
                  to="/modelo-educativo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold tracking-wide text-platinum-dim border border-[hsl(var(--platinum)/0.2)] hover:border-[hsl(var(--platinum)/0.4)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all"
                >
                  Modelo NextGen 2026
                </Link>
              </div>

              <div className="animate-fade-in-up delay-500">
                <div className="scroll-line" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 border-b border-[hsl(var(--platinum)/0.06)] bg-[hsl(222_32%_7%)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {stats.map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="stat-number">
                    {s.value}
                    <span className="text-2xl font-display italic text-platinum-deep/70 ml-1">{s.unit}</span>
                  </div>
                  <p className="font-ui text-xs text-muted-foreground mt-2 tracking-widest uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ACADEMIC AREAS ══════════════════════════════════════════════════════ */}
        <section className="py-28 relative bg-dot-pattern">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="badge-academic mb-4 inline-block">Áreas de Conocimiento</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                Ejes de Formación
                <span className="block text-platinum-gradient italic font-light text-3xl md:text-4xl mt-1">
                  NextGen 2026
                </span>
              </h2>
              <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed text-sm">
                Cuatro dominios de especialización alineados con las demandas del mercado digital contemporáneo,
                diseñados con metodología OBE y evaluación continua por evidencias verificables.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {academicAreas.map((area, i) => (
                <div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.2)] transition-all duration-300 hover:shadow-platinum cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--platinum)/0.07)] border border-[hsl(var(--platinum)/0.12)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--platinum)/0.12)] transition-all">
                    <area.icon size={20} className="text-platinum-dim" />
                  </div>
                  <span className="badge-academic mb-3 inline-block text-[9px]">{area.tag}</span>
                  <h3 className="font-display text-base font-bold text-platinum mb-2 leading-snug">{area.title}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 10 MODULES PREVIEW ══════════════════════════════════════════════════ */}
        <section className="py-28 bg-[hsl(222_32%_7%)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="badge-academic mb-4 inline-block">Currículo Académico OBE</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                10 Módulos del Máster
              </h2>
              <p className="font-body text-platinum-dim max-w-xl mx-auto text-sm leading-relaxed">
                Marketing Digital 360° para Latinoamérica — Formato híbrido: texto, audio, video, interactivos y IA.
                Duración: 6 semanas flexible. Activos descargables en cada módulo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto">
              {courseModules.map((mod, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.22)] transition-all duration-300 hover:shadow-platinum"
                >
                  <div className="font-display text-3xl font-black text-platinum-deep/25 group-hover:text-platinum-deep/45 transition-colors leading-none mb-2">
                    {mod.n}
                  </div>
                  <span className="badge-academic text-[8px] mb-2 inline-block">{mod.tag}</span>
                  <h4 className="font-ui text-xs font-semibold text-platinum leading-snug">{mod.title}</h4>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/modulos"
                className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-platinum-dim hover:text-platinum transition-colors group"
              >
                Ver todos los módulos en detalle
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ MODELO EDUCATIVO ════════════════════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="badge-academic mb-4 inline-block">Fundamentación Pedagógica</span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-5 leading-tight">
                    Modelo Educativo
                    <span className="block text-platinum-gradient italic font-light">NextGen 2026</span>
                  </h2>
                  <p className="font-body text-platinum-dim leading-relaxed mb-8 text-sm">
                    Un modelo pedagógico de vanguardia basado en{' '}
                    <strong className="text-platinum/85">Outcome-Based Education (OBE)</strong>,
                    donde el aprendizaje se mide por resultados verificables, no por horas de clase.
                    Diseñado para entornos digitales e híbridos bajo Art. 9-10 del Estatuto UTAMV.
                  </p>
                  <div className="space-y-3.5 mb-8">
                    {[
                      'Resultados de Aprendizaje (RA) medibles y trazables por módulo',
                      'Portafolio de evidencias como sistema evaluativo terminal',
                      'Aprendizaje Basado en Proyectos (PBL) — casos reales LATAM',
                      'Tutoría académica permanente — respuesta en 48 horas hábiles',
                      'Rúbricas estandarizadas públicas y retroalimentación formativa continua',
                      'IA pedagógica bajo Principios Inmutables UTAMV 2026',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 size={14} className="text-platinum-dim/60 flex-shrink-0" />
                        <span className="font-body text-xs text-platinum-dim">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/modelo-educativo"
                    className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-platinum-dim hover:text-platinum transition-colors group"
                  >
                    Conocer el Modelo Completo
                    <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {model4Pillars.map((p, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.08)] hover:border-[hsl(var(--platinum)/0.2)] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[hsl(var(--platinum)/0.07)] border border-[hsl(var(--platinum)/0.12)] flex items-center justify-center mb-3 group-hover:bg-[hsl(var(--platinum)/0.12)] transition-all">
                        <p.icon size={17} className="text-platinum-dim" />
                      </div>
                      <div className="font-ui text-[9px] text-platinum-deep/70 tracking-widest uppercase mb-0.5">{p.subtitle}</div>
                      <h4 className="font-display text-sm font-bold text-platinum mb-2">{p.title}</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ OFERTA ACADÉMICA ════════════════════════════════════════════════════ */}
        <section className="py-28 bg-[hsl(222_32%_7%)] relative">
          <div className="absolute inset-0 bg-dot-pattern opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="badge-academic mb-4 inline-block">Oferta Académica</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                Niveles de Formación
              </h2>
              <p className="font-body text-platinum-dim max-w-xl mx-auto text-sm leading-relaxed">
                Desde certificaciones de iniciación hasta posgrado especializado, estructurados
                por niveles académicos con metodología OBE y evaluación continua.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {academicLevels.map((level, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.07)] hover:border-[hsl(var(--platinum)/0.22)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--platinum)/0.07)] border border-[hsl(var(--platinum)/0.12)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--platinum)/0.12)] transition-all">
                    <level.icon size={20} className="text-platinum-dim" />
                  </div>
                  <div className="font-ui text-[9px] tracking-widest uppercase text-platinum-deep/70 mb-2">{level.level}</div>
                  <h3 className="font-display text-lg font-bold text-platinum mb-2">{level.title}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">{level.description}</p>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-platinum-deep/60" />
                    <span className="font-ui text-xs text-muted-foreground">{level.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/programas"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold tracking-wide btn-platinum"
              >
                Ver Todos los Programas <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ IA GOVERNANCE ═══════════════════════════════════════════════════════ */}
        <section className="py-28 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <span className="badge-academic mb-4 inline-block">Documento Maestro UTAMV 2026</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                  Gobernanza de IA Institucional
                </h2>
                <p className="font-body text-platinum-dim max-w-2xl mx-auto text-sm leading-relaxed">
                  UTAMV opera bajo un{' '}
                  <em>Documento Maestro de Arquitectura Académica, Cognitiva, Ética y de Gobernanza de IA</em> —
                  versión notarial, jurídico-legal, internacional y reforzada. Año Institucional 2026.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {iaPrinciples.map((p, i) => (
                  <div
                    key={i}
                    className="group p-5 rounded-xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.18)] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-ui text-[9px] font-bold tracking-widest uppercase text-platinum-deep/70 bg-[hsl(var(--platinum)/0.07)] px-2 py-0.5 rounded-full border border-[hsl(var(--platinum)/0.12)]">
                        P.{p.n}
                      </span>
                      <h4 className="font-ui text-xs font-bold text-platinum">{p.title}</h4>
                    </div>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}

                {/* Alcance Internacional */}
                <div className="group p-5 rounded-xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.18)] transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={13} className="text-platinum-dim" />
                    <h4 className="font-ui text-xs font-bold text-platinum">Alcance Internacional</h4>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Compatible con marcos regulatorios UNESCO, OCDE y afines, sin implicar acreditación
                    externa. Carácter institucional interno obligatorio.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[hsl(var(--platinum)/0.03)] border border-[hsl(var(--platinum)/0.1)]">
                <p className="font-ui text-xs text-muted-foreground leading-relaxed text-center italic">
                  «El presente documento tiene carácter institucional interno obligatorio y es oponible a estudiantes,
                  docentes, autoridades internas, proveedores tecnológicos y sistemas automatizados vinculados al
                  ecosistema UTAMV.» — Documento Maestro UTAMV 2026, Sección III.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MARCO LEGAL PRE-RVOE ════════════════════════════════════════════════ */}
        <section className="py-20 bg-[hsl(222_32%_7%)] relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="p-8 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.1)]">
                <div className="flex items-start gap-4">
                  <Scale size={22} className="text-platinum-dim flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-platinum mb-3">
                      Aviso Legal Institucional — Pre-RVOE
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                      UTAMV es una institución educativa privada que opera bajo un modelo académico institucional
                      propio, en modalidad digital, en línea e híbrida, encontrándose en fase de preparación y,
                      en su caso, gestión administrativa para la obtención del Reconocimiento de Validez Oficial
                      de Estudios (RVOE) ante las autoridades educativas competentes.
                    </p>
                    <div className="p-4 rounded-xl bg-[hsl(var(--platinum)/0.04)] border-l-2 border-[hsl(var(--platinum)/0.3)]">
                      <p className="font-body text-xs text-platinum-dim italic leading-relaxed">
                        «<strong className="not-italic text-platinum/80">Estudios sin reconocimiento de validez oficial.</strong>{' '}
                        La formación educativa ofrecida no cuenta con reconocimiento por parte de la autoridad educativa
                        competente.» — Art. 23 Estatuto Orgánico UTAMV.
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        to="/institucional#aviso-legal"
                        className="inline-flex items-center gap-1.5 font-ui text-xs font-semibold text-platinum-dim hover:text-platinum transition-colors"
                      >
                        Ver Marco Institucional Completo <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ═══════════════════════════════════════════════════════════ */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl overflow-hidden bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center">
                <img src={utamvLogoOfficial} alt="UTAMV" className="w-16 h-16 object-contain" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-4">
                Inicia Tu Trayectoria Académica
              </h2>
              <p className="font-body text-platinum-dim mb-10 max-w-xl mx-auto leading-relaxed text-sm">
                Accede al Máster Profesional en Marketing Digital 2026 bajo metodología OBE.
                10 módulos, 50+ horas de contenido, activos descargables y evaluación por evidencias verificables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/admisiones"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold btn-platinum"
                >
                  Solicitar Admisión <ArrowRight size={17} />
                </Link>
                <Link
                  to="/modulos"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold text-platinum-dim border border-[hsl(var(--platinum)/0.2)] hover:border-[hsl(var(--platinum)/0.4)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all"
                >
                  Explorar Módulos
                </Link>
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
