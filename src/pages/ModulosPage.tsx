import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  Clock, Medal, ArrowRight, ChevronRight, BookOpen, Layers,
  Users, Award, Target, CheckCircle2, Star
} from 'lucide-react';

const modules = [
  {
    id: 1, n: '01',
    title: 'Fundamentos del Marketing Digital',
    description: 'Introducción al ecosistema digital, el rol del estratega y los principales canales en Latinoamérica.',
    tag: 'Introductorio',
    outline: [
      'Historia y evolución del marketing digital',
      'Mapa del ecosistema: medios propios, pagados y ganados',
      'Embudo de conversión y customer journey',
      'Particularidades de los mercados latinoamericanos',
    ],
    assets: ['Mapa visual del ecosistema de canales', 'Plantilla de customer journey en Notion/Figma'],
  },
  {
    id: 2, n: '02',
    title: 'SEO, AEO y Optimización Web',
    description: 'Posicionamiento orgánico para buscadores y motores de respuesta, con foco en intención de búsqueda.',
    tag: 'Técnico',
    outline: [
      'Fundamentos de SEO técnico, on-page y off-page',
      'Research de keywords e intención de búsqueda',
      'Answer Engine Optimization (AEO) y snippet thinking',
      'Core Web Vitals, indexación y sitemaps',
    ],
    assets: ['Checklist técnico SEO para Vite/React', 'Plantilla de arquitectura de información UTAMV'],
  },
  {
    id: 3, n: '03',
    title: 'Publicidad Digital y Paid Media',
    description: 'Diseño de campañas de pago orientadas a performance y construcción de marca.',
    tag: 'Performance',
    outline: [
      'Marco de campañas: awareness, consideración, conversión',
      'Meta Ads y Google Ads: estructura de campañas',
      'Segmentación, creatividades y test A/B',
      'Métricas clave de performance y atribución básica',
    ],
    assets: ['Plantilla de briefing para campañas', 'Dashboard simple de métricas en Sheets'],
  },
  {
    id: 4, n: '04',
    title: 'Social Media y Estrategia de Contenidos',
    description: 'Diseño de estrategias para redes sociales con enfoque editorial y de comunidad.',
    tag: 'Editorial',
    outline: [
      'Rol de cada red: Instagram, TikTok, LinkedIn, YouTube',
      'Calendarios de contenido y pilares editoriales',
      'Construcción de comunidad y social listening',
      'Gestión de crisis y reputación online',
    ],
    assets: ['Calendario editorial UTAMV (Google Sheets/Notion)', 'Guía de formatos por red social'],
  },
  {
    id: 5, n: '05',
    title: 'Email Marketing, Automatización y CRM',
    description: 'Diseño de flujos automatizados y estrategias de relación a largo plazo.',
    tag: 'Automatización',
    outline: [
      'Tipos de envíos: campañas, newsletters, flujos',
      'Segmentación y personalización avanzada',
      'Automatizaciones clave: bienvenida, onboarding, win-back',
      'Métricas: aperturas, clics, conversión, churn',
    ],
    assets: ['Diagramas de flujos de automatización', 'Plantillas de copy para emails clave'],
  },
  {
    id: 6, n: '06',
    title: 'Analítica Digital, Data y Métricas',
    description: 'Diseño de sistemas de medición y lectura de datos para la toma de decisiones.',
    tag: 'Data',
    outline: [
      'Implementación básica de analítica (GA4 u otras)',
      'Definición de KPIs y métricas accionables',
      'Dashboards ejecutivos vs. dashboards operativos',
      'Lectura de cohortes y análisis de funnels',
    ],
    assets: ['Plantilla de cuadro de mando UTAMV', 'Guía de interpretación de métricas críticas'],
  },
  {
    id: 7, n: '07',
    title: 'UX, CRO y Experiencia de Usuario',
    description: 'Optimización de la experiencia en sitios y funnels para maximizar la conversión.',
    tag: 'Conversión',
    outline: [
      'Principios de UX aplicados a landing pages',
      'Heurísticas de usabilidad y patrones de diseño',
      'Conversion Rate Optimization (CRO) y test A/B',
      'Microcopys, formularios y confianza (trust signals)',
    ],
    assets: ['Checklist de UX para landing de captación', 'Guía de microcopy para conversiones'],
  },
  {
    id: 8, n: '08',
    title: 'Estrategia de Marca y Contenido Avanzado',
    description: 'Construcción de narrativa, tono y sistemas de contenido consistentes.',
    tag: 'Branding',
    outline: [
      'Arquitectura de marca y propuesta de valor',
      'Storytelling y frameworks narrativos',
      'Sistemas de contenido evergreen vs. campañas',
      'Guías de estilo y documentación de marca',
    ],
    assets: ['Plantilla de brand narrative', 'Guía de tono y voz UTAMV'],
  },
  {
    id: 9, n: '09',
    title: 'Inteligencia Artificial aplicada al Marketing',
    description: 'Uso de IA para investigación, creatividad, automatización y personalización a escala.',
    tag: 'IA Avanzada',
    outline: [
      'Introducción a IA generativa para marketing',
      'Prompting estratégico para investigación y copy',
      'Automatización de tareas repetitivas con IA',
      'Riesgos, ética y límites del uso de IA en campañas',
    ],
    assets: ['Playbook de prompts UTAMV para marketers', 'Checklist de riesgos y buenas prácticas con IA'],
  },
  {
    id: 10, n: '10',
    title: 'Plan Maestro y Proyecto Final UTAMV',
    description: 'Construcción del plan maestro, armado del caso UTAMV y defensa del proyecto final.',
    tag: 'Proyecto OBE',
    outline: [
      'Estructura de un plan maestro de marketing digital',
      'Integración de canales: plan omnicanal',
      'Presupuestos, roadmap y OKRs',
      'Presentación ejecutiva y defensa del proyecto',
    ],
    assets: ['Plantilla del Plan Maestro UTAMV', 'Rúbrica de evaluación del proyecto final'],
  },
];

const ModulosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main className="pt-28 pb-24">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Currículo Académico OBE</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">
              Módulos Académicos
            </h1>
            <p className="font-display text-xl italic text-gold mb-6">Máster Profesional · Marketing Digital 2026</p>
            <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed mb-8">
              10 módulos curriculares diseñados bajo metodología OBE (Outcome-Based Education), con resultados
              de aprendizaje medibles, evidencias verificables y portafolio de activos descargables.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: BookOpen, label: '10 Módulos Curriculares' },
                { icon: Clock, label: '50+ Horas de Contenido' },
                { icon: Award, label: 'Portafolio de Evidencias OBE' },
                { icon: Target, label: 'Activos Descargables Incluidos' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-platinum-dim">
                  <s.icon size={15} className="text-gold" />
                  <span className="font-ui text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-5">
            {modules.map((mod, i) => (
              <div
                key={mod.id}
                className="group p-6 md:p-8 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.25)] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="font-display text-5xl font-black text-gold/15 group-hover:text-gold/30 transition-colors leading-none w-16 text-center">
                      {mod.n}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="badge-academic">{mod.tag}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-platinum mb-2 group-hover:text-gold-light transition-colors">
                      {mod.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{mod.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Contenidos */}
                      <div>
                        <div className="font-ui text-xs font-semibold tracking-widest uppercase text-gold/60 mb-3">Contenidos</div>
                        <ul className="space-y-2">
                          {mod.outline.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-gold/50 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-xs text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activos */}
                      <div>
                        <div className="font-ui text-xs font-semibold tracking-widest uppercase text-gold/60 mb-3">Activos Descargables</div>
                        <ul className="space-y-2">
                          {mod.assets.map((asset, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <Star size={12} className="text-gold/50 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-xs text-platinum-dim">{asset}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 mt-16">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-card-premium border border-[hsl(var(--gold)/0.15)]">
            <h3 className="font-display text-3xl font-bold text-platinum mb-4">
              ¿Listo para el Máster?
            </h3>
            <p className="font-body text-platinum-dim mb-8 max-w-lg mx-auto">
              Accede a los 10 módulos completos del Máster Profesional en Marketing Digital 2026 bajo metodología OBE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admisiones"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-base font-semibold text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold transition-all hover:opacity-90"
              >
                Solicitar Admisión <ArrowRight size={18} />
              </Link>
              <Link
                to="/programas"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-base font-semibold text-platinum border border-[hsl(var(--gold)/0.25)] hover:border-[hsl(var(--gold)/0.5)] transition-all"
              >
                Ver Todos los Programas
              </Link>
            </div>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default ModulosPage;
