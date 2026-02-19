import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  Clock, ArrowRight, CheckCircle2, Star,
  BookOpenCheck, TrendingUp, Award, Layers,
  Target, Download, BookOpen
} from 'lucide-react';

const modules = [
  {
    id: 1, n: '01',
    title: 'Fundamentos del Marketing Digital',
    subtitle: 'Módulo 0 + 1 — Introducción y Ecosistema',
    tag: 'Introductorio',
    duration: '5 horas',
    format: 'Texto · Audio · Video · AI',
    description: 'Historia y evolución del marketing digital. Ecosistema latinoamericano. Rol del estratega digital. Embudo de conversión y customer journey.',
    objectives: [
      'Conocer la estructura del curso y metodología de aprendizaje basada en IA',
      'Comprender la importancia del marketing digital en Latinoamérica',
      'Entender el ecosistema digital: medios propios, pagados y ganados',
      'Identificar los principales canales y su rol en el funnel de conversión',
    ],
    outline: [
      'Historia y evolución del marketing digital (línea de tiempo LATAM)',
      'Mapa del ecosistema digital: canales propios, pagados y ganados',
      'Embudo de conversión (AIDA) y customer journey mapping',
      'Particularidades de los mercados latinoamericanos: estadísticas por país',
    ],
    assets: [
      'Mapa visual del ecosistema de canales (editable)',
      'Plantilla de customer journey en Notion y Figma',
      'Checklist de canales según mercado latinoamericano',
    ],
  },
  {
    id: 2, n: '02',
    title: 'Estrategia Digital y Herramientas AI',
    subtitle: 'Módulo 2 — Diseño Estratégico con IA',
    tag: 'Estrategia + IA',
    duration: '6 horas',
    format: 'Texto · Video · Ejercicios prácticos',
    description: 'Diseño de estrategias usando IA. Automatización, análisis y optimización de campañas. Copywriting, diseño y analítica con herramientas de IA.',
    objectives: [
      'Diseñar estrategias de marketing usando inteligencia artificial',
      'Automatizar, analizar y optimizar campañas con herramientas IA',
      'Dominar prompting estratégico para copy, diseño y análisis',
    ],
    outline: [
      'Introducción a IA en marketing digital (copywriting, diseño, automatización)',
      'Taller práctico: ChatGPT para copy y funnel de conversión',
      'Canva AI para diseño de posts y creatividades',
      'Analítica digital y métricas clave (GA4 + métricas LATAM)',
      'Principios Inmutables UTAMV para uso ético de IA',
    ],
    assets: [
      'Plantilla de plan de marketing digital con IA',
      'Ejemplo de calendario de contenidos automatizado',
      'Playbook de prompts UTAMV para marketers',
    ],
  },
  {
    id: 3, n: '03',
    title: 'SEO, AEO y Optimización Web',
    subtitle: 'Módulo 3 — Posicionamiento Orgánico',
    tag: 'Técnico',
    duration: '5 horas',
    format: 'Texto · Checklists · Herramientas',
    description: 'Posicionamiento orgánico para buscadores y motores de respuesta (AEO). Auditoría técnica, research de keywords e intención de búsqueda.',
    objectives: [
      'Dominar SEO técnico, on-page y off-page con enfoque LATAM',
      'Aplicar Answer Engine Optimization (AEO) y snippet thinking',
      'Ejecutar auditorías SEO y definir arquitecturas de información',
    ],
    outline: [
      'Fundamentos de SEO técnico, on-page y off-page',
      'Research de keywords e intención de búsqueda',
      'Answer Engine Optimization (AEO) y snippet thinking',
      'Core Web Vitals, indexación y sitemaps XML',
    ],
    assets: [
      'Checklist técnico SEO para sitios web',
      'Plantilla de arquitectura de información UTAMV',
      'Template de auditoría SEO completa',
    ],
  },
  {
    id: 4, n: '04',
    title: 'Publicidad Digital y Paid Media',
    subtitle: 'Módulo 4 — Performance y Conversión',
    tag: 'Performance',
    duration: '6 horas',
    format: 'Texto · Video · Dashboards',
    description: 'Google Ads y Meta Ads. Segmentación efectiva, creatividades y remarketing. Métricas de performance y optimización de campañas LATAM.',
    objectives: [
      'Diseñar campañas de paid media orientadas a performance',
      'Dominar Google y Meta Ads con segmentación efectiva',
      'Optimizar presupuestos y medir atribución correctamente',
    ],
    outline: [
      'Marco de campañas: awareness, consideración, conversión',
      'Meta Ads y Google Ads: estructura de campañas avanzada',
      'Segmentación, creatividades y test A/B',
      'Métricas clave de performance y atribución básica',
      'Remarketing y estrategias de retargeting en LATAM',
    ],
    assets: [
      'Plantilla de briefing para campañas paid',
      'Dashboard simple de métricas en Google Sheets',
      'Guía de segmentación por mercado latinoamericano',
    ],
  },
  {
    id: 5, n: '05',
    title: 'Social Media y Estrategia de Contenidos',
    subtitle: 'Módulo 5 — Redes y Contenido Editorial',
    tag: 'Editorial',
    duration: '5 horas',
    format: 'Texto · Plantillas · Casos LATAM',
    description: 'Instagram, TikTok, LinkedIn y YouTube. Calendarios editoriales, pilares de contenido, social listening y gestión de comunidades en LATAM.',
    objectives: [
      'Diseñar estrategias de social media con enfoque editorial',
      'Construir calendarios de contenido y pilares editoriales',
      'Gestionar comunidades y manejar crisis de reputación',
    ],
    outline: [
      'Rol de cada red: Instagram, TikTok, LinkedIn, YouTube en LATAM',
      'Calendarios de contenido y pilares editoriales',
      'Construcción de comunidad y social listening',
      'Gestión de crisis y reputación online',
    ],
    assets: [
      'Calendario editorial UTAMV (Google Sheets/Notion)',
      'Guía de formatos por red social 2026',
      'Plantilla de social listening y seguimiento de marca',
    ],
  },
  {
    id: 6, n: '06',
    title: 'Email Marketing, Automatización y CRM',
    subtitle: 'Módulo 6 — Relaciones a Largo Plazo',
    tag: 'Automatización',
    duration: '5 horas',
    format: 'Texto · Diagramas · Flujos',
    description: 'Flujos automatizados de email. Segmentación avanzada, personalización y CRM. Métricas clave: aperturas, clics, conversión y churn.',
    objectives: [
      'Diseñar flujos de automatización de email marketing efectivos',
      'Segmentar y personalizar comunicaciones para maximizar conversión',
      'Medir y optimizar KPIs de email: aperturas, clics, churn',
    ],
    outline: [
      'Tipos de envíos: campañas, newsletters y flujos automatizados',
      'Segmentación y personalización avanzada',
      'Automatizaciones clave: bienvenida, onboarding, win-back',
      'Métricas: aperturas, clics, conversión, churn',
    ],
    assets: [
      'Diagramas de flujos de automatización',
      'Plantillas de copy para emails clave',
      'Dashboard de métricas de email marketing',
    ],
  },
  {
    id: 7, n: '07',
    title: 'Analítica Digital, Data y Métricas',
    subtitle: 'Módulo 7 — Data-Driven Decision Making',
    tag: 'Data',
    duration: '6 horas',
    format: 'Texto · Video tutoriales · GA4',
    description: 'GA4, dashboards ejecutivos y operativos. KPIs accionables, análisis de cohortes y funnels de conversión data-driven.',
    objectives: [
      'Implementar sistemas de medición con GA4 y herramientas LATAM',
      'Definir KPIs accionables y diseñar dashboards ejecutivos',
      'Leer cohortes y analizar funnels de conversión',
    ],
    outline: [
      'Implementación básica de analítica (GA4 y herramientas alternativas)',
      'Definición de KPIs y métricas accionables por área',
      'Dashboards ejecutivos vs. dashboards operativos',
      'Lectura de cohortes y análisis de funnels',
    ],
    assets: [
      'Plantilla de cuadro de mando UTAMV',
      'Guía de interpretación de métricas críticas',
      'Template de reporte semanal de performance',
    ],
  },
  {
    id: 8, n: '08',
    title: 'UX, CRO y Experiencia de Usuario',
    subtitle: 'Módulo 8 — Optimización de Conversión',
    tag: 'Conversión',
    duration: '5 horas',
    format: 'Texto · Casos · Heurísticas',
    description: 'Principios UX aplicados a landing pages. Heurísticas de usabilidad, CRO y test A/B para maximizar conversiones.',
    objectives: [
      'Aplicar principios de UX al diseño de landing pages de alto rendimiento',
      'Implementar estrategias de CRO y tests A/B',
      'Optimizar microcopys, formularios y señales de confianza',
    ],
    outline: [
      'Principios de UX aplicados a landing pages',
      'Heurísticas de usabilidad y patrones de diseño',
      'Conversion Rate Optimization (CRO) y test A/B',
      'Microcopys, formularios y trust signals',
    ],
    assets: [
      'Checklist de UX para landing de captación',
      'Guía de microcopy para conversiones',
      'Template de hipótesis para test A/B',
    ],
  },
  {
    id: 9, n: '09',
    title: 'Estrategia de Marca y Contenido Avanzado',
    subtitle: 'Módulo 9 — Branding y Narrativa',
    tag: 'Branding',
    duration: '5 horas',
    format: 'Texto · Frameworks · Brand guides',
    description: 'Arquitectura de marca, storytelling y sistemas de contenido consistentes. Guías de estilo y documentación de marca para equipos.',
    objectives: [
      'Construir arquitecturas de marca con propuesta de valor clara',
      'Diseñar sistemas de contenido evergreen y campañas integradas',
      'Documentar guías de estilo y tono de voz de marca',
    ],
    outline: [
      'Arquitectura de marca y propuesta de valor diferencial',
      'Storytelling y frameworks narrativos (Hero, Before-After-Bridge)',
      'Sistemas de contenido evergreen vs. campañas',
      'Guías de estilo y documentación de marca',
    ],
    assets: [
      'Plantilla de brand narrative canvas',
      'Guía de tono y voz UTAMV',
      'Mapa de contenido evergreen + campañas',
    ],
  },
  {
    id: 10, n: '10',
    title: 'Inteligencia Artificial Aplicada al Marketing',
    subtitle: 'Módulo 10 — IA Estratégica',
    tag: 'IA Avanzada',
    duration: '6 horas',
    format: 'Texto · Talleres prácticos · IA',
    description: 'IA generativa para investigación, creatividad y automatización a escala. Ética, riesgos y Principios Inmutables UTAMV para uso responsable.',
    objectives: [
      'Aplicar IA generativa en investigación, copy y diseño de campañas',
      'Automatizar tareas repetitivas con prompting estratégico',
      'Operar bajo Principios Inmutables UTAMV para uso ético de IA',
    ],
    outline: [
      'IA generativa en marketing: ChatGPT, Gemini, MidJourney',
      'Prompting estratégico para investigación y copy',
      'Automatización de tareas repetitivas con IA',
      'Principios Inmutables UTAMV: veracidad, no simulación, integridad',
      'Riesgos, ética y límites del uso de IA en campañas',
    ],
    assets: [
      'Playbook avanzado de prompts UTAMV para marketers',
      'Checklist de riesgos y buenas prácticas con IA',
      'Framework de auditoría IA para campañas',
    ],
  },
  {
    id: 11, n: 'PF',
    title: 'Plan Maestro y Proyecto Final UTAMV',
    subtitle: 'Módulo Final — Evaluación OBE',
    tag: 'Proyecto OBE',
    duration: '5 horas + proyecto',
    format: 'Portafolio · Rúbrica · Defensa',
    description: 'Integración de todos los módulos en un plan maestro de marketing digital. Proyecto final: plan omnicanal para un producto o empresa real.',
    objectives: [
      'Estructurar un Plan Maestro de Marketing Digital completo e integrado',
      'Diseñar plan omnicanal con presupuesto, roadmap y OKRs',
      'Defender el proyecto ante el Comité Evaluador OBE UTAMV',
    ],
    outline: [
      'Estructura del plan maestro de marketing digital',
      'Integración de canales: plan omnicanal completo',
      'Presupuestos, roadmap y OKRs por trimestre',
      'Presentación ejecutiva y defensa del proyecto final',
    ],
    assets: [
      'Plantilla del Plan Maestro UTAMV (60+ slides)',
      'Rúbrica de evaluación del proyecto final OBE',
      'Repositorio de recursos libres de derechos para proyectos',
    ],
  },
];

const tagColors: Record<string, string> = {
  'Introductorio': 'border-[hsl(215_35%_35%/0.5)] bg-[hsl(215_35%_35%/0.08)] text-[hsl(215_30%_65%)]',
  'Estrategia + IA': 'border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim',
  'Técnico': 'border-[hsl(180_30%_35%/0.5)] bg-[hsl(180_30%_35%/0.08)] text-[hsl(180_30%_65%)]',
  'Performance': 'border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim',
  'Editorial': 'border-[hsl(220_35%_40%/0.5)] bg-[hsl(220_35%_40%/0.08)] text-[hsl(220_30%_70%)]',
  'Automatización': 'border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim',
  'Data': 'border-[hsl(200_35%_40%/0.5)] bg-[hsl(200_35%_40%/0.08)] text-[hsl(200_30%_70%)]',
  'Conversión': 'border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim',
  'Branding': 'border-[hsl(240_25%_40%/0.5)] bg-[hsl(240_25%_40%/0.08)] text-[hsl(240_25%_70%)]',
  'IA Avanzada': 'border-[hsl(var(--platinum)/0.35)] bg-[hsl(var(--platinum)/0.08)] text-platinum',
  'Proyecto OBE': 'border-[hsl(var(--platinum)/0.4)] bg-[hsl(var(--platinum)/0.1)] text-platinum',
};

const ModulosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main className="pt-28 pb-24">
        {/* ── Header ── */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Currículo Académico OBE</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4 leading-none">
              Módulos Académicos
            </h1>
            <p className="font-display text-xl italic text-platinum-dim mb-6">
              Máster Profesional · Marketing Digital 360° para Latinoamérica
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-3">
              Formato híbrido completo: texto, audio, imágenes interactivas, videos e integración de IA.
              Duración: 6 semanas (flexible). Diseñado para capacitar futuros estrategas digitales en el
              ecosistema latinoamericano con herramientas prácticas y recursos descargables.
            </p>
            <p className="font-body text-xs text-muted-foreground/60 max-w-xl mx-auto leading-relaxed mb-8">
              Todos los módulos operan bajo la metodología OBE (Outcome-Based Education) con Resultados
              de Aprendizaje definidos, rúbricas estandarizadas y portafolio de evidencias verificables.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              {[
                { icon: BookOpen, label: '11 Módulos Curriculares' },
                { icon: Clock, label: '60+ Horas de Contenido' },
                { icon: Award, label: 'Portafolio de Evidencias OBE' },
                { icon: Download, label: 'Activos Descargables Incluidos' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-platinum-dim">
                  <s.icon size={14} className="text-platinum-dim/70" />
                  <span className="font-ui text-xs">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Modules ── */}
        <section className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="group p-6 md:p-8 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.07)] hover:border-[hsl(var(--platinum)/0.2)] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="font-display text-5xl font-black text-platinum-deep/15 group-hover:text-platinum-deep/30 transition-colors leading-none w-14 text-center">
                      {mod.n}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`font-ui text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border ${tagColors[mod.tag] || 'badge-academic'}`}
                      >
                        {mod.tag}
                      </span>
                      <span className="font-ui text-[10px] text-muted-foreground/60 flex items-center gap-1">
                        <Clock size={10} /> {mod.duration}
                      </span>
                      <span className="font-ui text-[10px] text-muted-foreground/50 italic">{mod.format}</span>
                    </div>

                    <p className="font-ui text-[10px] text-platinum-deep/60 tracking-wide uppercase mb-1">{mod.subtitle}</p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-platinum mb-2 group-hover:text-platinum-bright transition-colors leading-snug">
                      {mod.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{mod.description}</p>

                    <div className="grid md:grid-cols-3 gap-5">
                      {/* Objetivos */}
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-widest uppercase text-platinum-deep/60 mb-2.5">
                          Objetivos
                        </div>
                        <ul className="space-y-1.5">
                          {mod.objectives.map((obj, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <Target size={11} className="text-platinum-dim/50 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-[11px] text-muted-foreground leading-relaxed">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contenidos */}
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-widest uppercase text-platinum-deep/60 mb-2.5">
                          Contenidos
                        </div>
                        <ul className="space-y-1.5">
                          {mod.outline.map((item, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <CheckCircle2 size={11} className="text-platinum-dim/40 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-[11px] text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activos Descargables */}
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-widest uppercase text-platinum-deep/60 mb-2.5">
                          Activos Descargables
                        </div>
                        <ul className="space-y-1.5">
                          {mod.assets.map((asset, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <Download size={11} className="text-platinum-dim/40 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-[11px] text-platinum-dim leading-relaxed">{asset}</span>
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

        {/* ── Methodology Note ── */}
        <section className="container mx-auto px-4 mt-12">
          <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-[hsl(var(--platinum)/0.03)] border border-[hsl(var(--platinum)/0.1)]">
            <h4 className="font-ui text-xs font-bold text-platinum-dim uppercase tracking-widest mb-3">
              Formatos Interactivos e Híbridos
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: 'Texto', desc: 'Módulos explicativos y PDF descargables' },
                { label: 'Audio', desc: 'Guías resumidas y podcasts breves de repaso' },
                { label: 'Imágenes', desc: 'Infografías, mapas interactivos y plantillas' },
                { label: 'Video', desc: 'Clips animados, entrevistas y tutoriales prácticos' },
                { label: 'IA', desc: 'Personalización del aprendizaje y ejercicios automáticos' },
              ].map((f, i) => (
                <div key={i} className="text-center p-3 rounded-xl border border-[hsl(var(--platinum)/0.08)]">
                  <div className="font-ui text-xs font-bold text-platinum-dim mb-1">{f.label}</div>
                  <p className="font-body text-[10px] text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container mx-auto px-4 mt-10">
          <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl bg-card-premium border border-[hsl(var(--platinum)/0.12)]">
            <h3 className="font-display text-3xl font-bold text-platinum mb-3">
              ¿Listo para el Máster?
            </h3>
            <p className="font-body text-sm text-platinum-dim mb-8 max-w-lg mx-auto">
              Accede a todos los módulos del Máster Profesional en Marketing Digital 360° para Latinoamérica
              bajo metodología OBE con activos descargables, IA integrada y evaluación por evidencias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admisiones"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold btn-platinum"
              >
                Solicitar Admisión <ArrowRight size={17} />
              </Link>
              <Link
                to="/programas"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-ui text-sm font-semibold text-platinum-dim border border-[hsl(var(--platinum)/0.22)] hover:border-[hsl(var(--platinum)/0.45)] hover:text-platinum transition-all"
              >
                Ver Todos los Programas
              </Link>
            </div>
            <p className="font-ui text-[10px] text-muted-foreground/50 mt-6">
              Estudios sin reconocimiento de validez oficial ante la SEP. Institución privada en proceso Pre-RVOE.
            </p>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default ModulosPage;
