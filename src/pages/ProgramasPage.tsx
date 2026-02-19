import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  Clock, Medal, ArrowRight, CheckCircle2, Star,
  BookOpenCheck, Briefcase, TrendingUp, Building2, Users, Globe
} from 'lucide-react';

const programs = [
  {
    category: 'Posgrado',
    items: [
      {
        type: 'Maestría',
        title: 'Maestría en Marketing Digital Estratégico',
        description: 'Programa avanzado de posgrado con profundización en marketing digital, estrategia omnicanal e investigación aplicada. Incluye tesis final y portafolio de evidencias OBE.',
        hours: '80+ horas',
        duration: '18 meses',
        level: 'Posgrado',
        modules: 12,
        slug: 'maestria-marketing-digital',
        featured: false,
        highlights: ['Tesis de investigación aplicada', 'Portafolio OBE verificable', 'Tutoría académica permanente', 'Acceso vitalicio a materiales'],
      },
    ]
  },
  {
    category: 'Especialización',
    items: [
      {
        type: 'Máster Profesional',
        title: 'Marketing Digital 2026',
        description: 'El programa insignia de UTAMV. 10 módulos curriculares bajo metodología OBE: desde fundamentos hasta IA aplicada al marketing. Diseñado para profesionales que lideran entornos digitales.',
        hours: '50+ horas',
        duration: '6 meses',
        level: 'Avanzado',
        modules: 10,
        slug: 'master-marketing-digital-2026',
        featured: true,
        highlights: ['10 módulos secuenciales OBE', 'Activos descargables por módulo', 'Plan Maestro como proyecto final', 'Evaluación por rúbricas verificables'],
      },
      {
        type: 'Doctorado Profesional',
        title: 'Inteligencia Estratégica Digital',
        description: 'Programa de especialización máxima. Investigación aplicada, análisis avanzado e inteligencia estratégica en ecosistemas digitales complejos.',
        hours: '120+ horas',
        duration: '12 meses',
        level: 'Especialización',
        modules: 15,
        slug: 'doctorado-inteligencia-estrategica',
        featured: false,
        highlights: ['Investigación doctoral aplicada', 'Metodología cuantitativa y cualitativa', 'Análisis de ecosistemas digitales', 'Defensa de proyecto ante comité'],
      },
    ]
  },
  {
    category: 'Formación Continua',
    items: [
      {
        type: 'Diplomado',
        title: 'Diplomado en SEO, AEO y Contenido Digital',
        description: 'Actualización profesional intensiva en posicionamiento orgánico, Answer Engine Optimization y estrategia de contenidos para buscadores e IA.',
        hours: '20 horas',
        duration: '4 meses',
        level: 'Intermedio',
        modules: 4,
        slug: 'diplomado-seo-aeo',
        featured: false,
        highlights: ['SEO técnico y on-page', 'AEO y snippet thinking', 'Estrategia de contenidos', 'Auditoría SEO real'],
      },
      {
        type: 'Diplomado',
        title: 'Diplomado en Paid Media y Performance',
        description: 'Meta Ads, Google Ads, segmentación avanzada, test A/B y métricas de atribución para campañas de performance digital.',
        hours: '15 horas',
        duration: '3 meses',
        level: 'Intermedio',
        modules: 3,
        slug: 'diplomado-paid-media',
        featured: false,
        highlights: ['Meta Ads avanzado', 'Google Ads estructura', 'Atribución y métricas', 'Creatividades y A/B'],
      },
    ]
  },
  {
    category: 'Certificaciones',
    items: [
      {
        type: 'Certificado Profesional',
        title: 'Fundamentos de Marketing Digital',
        description: 'Introducción estructurada al ecosistema digital. Ideal para profesionales que inician su transición al marketing digital.',
        hours: '5 horas',
        duration: '1 semana',
        level: 'Introductorio',
        modules: 1,
        slug: 'fundamentos-marketing-digital',
        featured: false,
        highlights: ['Ecosistema digital completo', 'Customer journey map', 'Embudo de conversión', 'Proyecto inicial OBE'],
      },
      {
        type: 'Certificado',
        title: 'IA Aplicada al Marketing',
        description: 'Certificado especializado en uso de IA generativa, prompting estratégico y automatización de procesos de marketing.',
        hours: '8 horas',
        duration: '2 semanas',
        level: 'Intermedio',
        modules: 1,
        slug: 'certificado-ia-marketing',
        featured: false,
        highlights: ['IA generativa para marketing', 'Prompting avanzado', 'Automatizaciones con IA', 'Ética y límites del uso'],
      },
    ]
  },
];

const ProgramasPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main className="pt-28 pb-24">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Oferta Académica Completa</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">
              Programas UTAMV
            </h1>
            <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed">
              Oferta académica estructurada por niveles de formación, diseñada bajo metodología OBE y
              alineada al Modelo Educativo NextGen 2026. Desde certificaciones hasta posgrado.
            </p>
          </div>
        </section>

        {/* Programs by Category */}
        <section className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {programs.map((category, ci) => (
              <div key={ci}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="divider-gold flex-1" />
                  <h2 className="font-ui text-xs font-bold tracking-[0.25em] uppercase text-gold px-4">
                    {category.category}
                  </h2>
                  <div className="divider-gold flex-1" />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {category.items.map((prog, pi) => (
                    <div
                      key={pi}
                      className={`group relative p-7 rounded-2xl transition-all duration-300 ${
                        prog.featured
                          ? 'bg-gradient-to-br from-[hsl(var(--gold)/0.12)] to-[hsl(var(--gold)/0.04)] border border-[hsl(var(--gold)/0.3)] shadow-gold'
                          : 'bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.2)]'
                      }`}
                    >
                      {prog.featured && (
                        <div className="absolute -top-3 left-6 badge-academic bg-[hsl(var(--background))] text-[10px]">
                          ★ Programa Insignia UTAMV
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3 mb-4">
                        <span className="font-ui text-xs font-medium text-gold/70 uppercase tracking-wide">{prog.type}</span>
                        <span className="font-ui text-[10px] font-semibold tracking-wider text-muted-foreground uppercase border border-muted rounded-full px-2.5 py-1">{prog.level}</span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-bold text-platinum mb-3 leading-tight group-hover:text-gold-light transition-colors">
                        {prog.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{prog.description}</p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mb-5">
                        <div className="flex items-center gap-1.5 text-platinum-dim">
                          <Clock size={13} className="text-gold/60" />
                          <span className="font-ui text-xs">{prog.hours}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-platinum-dim">
                          <TrendingUp size={13} className="text-gold/60" />
                          <span className="font-ui text-xs">{prog.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-platinum-dim">
                          <BookOpenCheck size={13} className="text-gold/60" />
                          <span className="font-ui text-xs">{prog.modules} módulos</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6">
                        {prog.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-gold/50 flex-shrink-0" />
                            <span className="font-body text-xs text-muted-foreground">{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--gold)/0.1)]">
                        <Link
                          to="/admisiones"
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-ui text-sm font-semibold transition-all ${
                            prog.featured
                              ? 'text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold hover:opacity-90'
                              : 'text-gold border border-[hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold)/0.08)]'
                          }`}
                        >
                          Solicitar Admisión <ArrowRight size={14} />
                        </Link>
                        <Link
                          to="/modulos"
                          className="font-ui text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 group/l"
                        >
                          Ver módulos <ArrowRight size={12} className="group-hover/l:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Note */}
        <section className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[hsl(var(--gold)/0.04)] border border-[hsl(var(--gold)/0.1)]">
            <p className="font-ui text-xs text-muted-foreground leading-relaxed text-center">
              <strong className="text-gold">⚠ Aviso Legal Institucional:</strong> Los programas ofrecidos por UTAMV tienen carácter institucional privado.
              Los estudios <strong className="text-platinum-dim">no cuentan con reconocimiento de validez oficial</strong> ante la SEP u otra autoridad educativa competente,
              salvo resolución expresa y vigente para un programa específico. UTAMV se encuentra en proceso de preparación y solicitud de RVOE.
            </p>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default ProgramasPage;
