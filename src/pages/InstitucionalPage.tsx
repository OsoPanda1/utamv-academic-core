import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  Scale, ShieldCheck, FileText, GraduationCap, BookOpen,
  Users, Building2, AlertTriangle, CheckCircle2, ArrowRight
} from 'lucide-react';

const sections = [
  {
    id: 'estatuto',
    icon: Building2,
    label: 'Estatuto Orgánico',
    tag: 'Capítulos I-IV',
    title: 'Estatuto Orgánico de la UTAMV',
    subtitle: 'Naturaleza Jurídica, Fines y Gobierno',
    articles: [
      {
        num: 'Art. 1',
        title: 'Naturaleza Jurídica',
        text: 'La Universidad de Tecnología Avanzada, Marketing y Versatilidad (UTAMV) es una institución particular de educación superior de carácter privado, con personalidad jurídica y patrimonio propios, que se rige por la legislación educativa aplicable en los Estados Unidos Mexicanos, por el presente Estatuto Orgánico y por los reglamentos internos que de él emanen.',
      },
      {
        num: 'Art. 2',
        title: 'Autonomía Académica',
        text: 'UTAMV ejerce autonomía académica y de gestión interna para el diseño, implementación y evaluación de sus modelos educativos, planes y programas de estudio, sin perjuicio de la observancia estricta de los requisitos, procedimientos y autorizaciones que establezcan las autoridades educativas competentes para la obtención del RVOE.',
      },
      {
        num: 'Art. 3',
        title: 'Fines Institucionales',
        text: null,
        list: [
          'a) Impartir educación superior de calidad mediante modelos pedagógicos basados en competencias y resultados de aprendizaje medibles (Outcome-Based Education, OBE).',
          'b) Desarrollar conocimiento aplicado, innovación tecnológica y educación digital avanzada, con énfasis en tecnología, marketing estratégico y versatilidad profesional.',
          'c) Formar personas profesionales con pensamiento crítico, ética, responsabilidad social y capacidad de adaptación a entornos digitales, híbridos y emergentes.',
          'd) Contribuir al desarrollo social, económico y tecnológico mediante programas educativos, formación continua, investigación aplicada y vinculación con sectores productivos.',
        ],
      },
      {
        num: 'Art. 4-6',
        title: 'Estructura de Gobierno',
        text: null,
        list: [
          'Consejo de Fundadores: máxima autoridad estratégica y patrimonial de UTAMV.',
          'Consejo Académico: órgano colegiado responsable de la conducción y mejora continua de la calidad académica.',
          'Rectoría: representación legal, académica y administrativa de la institución.',
          'Direcciones Académicas y Administrativas: gestión operativa de las áreas funcionales.',
        ],
      },
      {
        num: 'Art. 7-8',
        title: 'Rectoría — Requisitos',
        text: null,
        list: [
          'a) Título profesional de licenciatura y grado preferente de maestría o superior.',
          'b) Experiencia comprobable en docencia, gestión académica o dirección educativa.',
          'c) Solvencia ética, profesional y legal.',
        ],
      },
    ],
  },
  {
    id: 'reglamento',
    icon: FileText,
    label: 'Reglamento Académico',
    tag: 'Capítulos I-IV',
    title: 'Reglamento Académico General UTAMV',
    subtitle: 'Procesos Académicos y Régimen Disciplinario',
    articles: [
      {
        num: 'Art. 12',
        title: 'Disposiciones Generales',
        text: 'El presente Reglamento regula los procesos académicos y las relaciones entre estudiantes, docentes y autoridades universitarias en el marco del Modelo Educativo UTAMV NextGen 2026.',
      },
      {
        num: 'Art. 13',
        title: 'Admisión e Inscripción',
        text: 'Los procesos de admisión serán transparentes, equitativos y documentados, sin discriminación por razón de origen, género, condición socioeconómica, creencia religiosa o cualquier otra condición.',
      },
      {
        num: 'Art. 14',
        title: 'Evaluación Académica',
        text: 'La evaluación será continua, formativa y basada en competencias y evidencias verificables, alineada a los Resultados de Aprendizaje (RA) definidos por módulo mediante rúbricas estandarizadas públicas.',
      },
      {
        num: 'Art. 15',
        title: 'Régimen Disciplinario',
        text: 'Las faltas académicas serán sancionadas conforme a su gravedad y al debido proceso, garantizando el derecho a audiencia y defensa del estudiante en todo momento.',
      },
    ],
  },
  {
    id: 'etica',
    icon: ShieldCheck,
    label: 'Código de Ética',
    tag: 'Arts. 16-17',
    title: 'Código de Ética e Integridad Académica',
    subtitle: 'Honestidad, Legalidad y Responsabilidad',
    articles: [
      {
        num: 'Art. 16',
        title: 'Valores Institucionales',
        text: 'UTAMV promueve como valores esenciales: honestidad, integridad, legalidad, respeto, responsabilidad social y compromiso con la excelencia académica en todas las actividades de la comunidad universitaria.',
      },
      {
        num: 'Art. 17',
        title: 'Faltas Graves',
        text: 'Se consideran faltas graves que pueden resultar en suspensión o baja definitiva:',
        list: [
          'Plagio en trabajos, proyectos o evaluaciones académicas.',
          'Fraude académico en cualquiera de sus modalidades.',
          'Falsificación de documentos académicos o institucionales.',
          'Suplantación de identidad en evaluaciones o plataformas.',
          'Uso indebido de obras protegidas por derechos de autor.',
        ],
      },
    ],
  },
  {
    id: 'online',
    icon: GraduationCap,
    label: 'Política Online',
    tag: 'Art. 18',
    title: 'Política de Educación Online y Tutorías',
    subtitle: 'Campus Digital y Acompañamiento Académico',
    articles: [
      {
        num: 'Art. 18',
        title: 'Garantías del Campus Online',
        text: 'UTAMV garantiza en sus programas en línea e híbridos:',
        list: [
          'Acceso permanente a plataformas digitales educativas con disponibilidad 24/7.',
          'Tutoría académica personalizada con respuesta en no más de 48 horas hábiles.',
          'Seguimiento individual del progreso académico mediante analítica de aprendizaje.',
          'Recursos multimedia en múltiples formatos para distintos estilos de aprendizaje.',
          'Comunidad de aprendizaje colaborativo entre estudiantes y docentes.',
        ],
      },
    ],
  },
  {
    id: 'obe',
    icon: BookOpen,
    label: 'Manual OBE',
    tag: 'Art. 19',
    title: 'Manual de Evaluación Académica (OBE)',
    subtitle: 'Resultados Verificables y Rúbricas Estandarizadas',
    articles: [
      {
        num: 'Art. 19',
        title: 'Sistema de Evaluación OBE',
        text: 'El sistema de evaluación de UTAMV se sustenta en:',
        list: [
          'Resultados de Aprendizaje (RA) específicos, medibles y verificables por módulo.',
          'Evidencias concretas que demuestran el dominio de competencias declaradas.',
          'Rúbricas estandarizadas con descriptores claros de desempeño por nivel.',
          'Retroalimentación continua, formativa y orientada a la mejora.',
          'Portafolio de evidencias como instrumento de evaluación terminal verificable.',
        ],
      },
    ],
  },
  {
    id: 'antiplagio',
    icon: ShieldCheck,
    label: 'Política Antiplagio',
    tag: 'Art. 20',
    title: 'Política de Propiedad Intelectual y Antiplagio',
    subtitle: 'Derechos de Autor y Uso Ético de Obras',
    articles: [
      {
        num: 'Art. 20',
        title: 'Protección y Sanciones',
        text: 'UTAMV protege activamente los derechos de autor institucionales y de terceros. El plagio, en cualquiera de sus formas —textual, paráfrasis no citada, auto-plagio o uso no autorizado de IA para suplantar la autoría del estudiante— constituye falta grave con las consecuencias disciplinarias establecidas en el Código de Ética.',
      },
    ],
  },
  {
    id: 'aviso-legal',
    icon: Scale,
    label: 'Aviso Legal Pre-RVOE',
    tag: 'Arts. 21-23',
    title: 'Aviso Legal Institucional Pre-RVOE',
    subtitle: 'Transparencia y Legalidad Educativa',
    articles: [
      {
        num: 'Art. 21',
        title: 'Naturaleza Institucional Pre-RVOE',
        text: 'UTAMV es una institución privada de educación superior en proceso de preparación y, en su caso, solicitud de Reconocimiento de Validez Oficial de Estudios (RVOE) ante las autoridades educativas competentes de los Estados Unidos Mexicanos.',
      },
      {
        num: 'Art. 22',
        title: 'Carácter de los Estudios',
        text: 'Salvo resolución oficial expresa y vigente emitida por la autoridad educativa correspondiente para un programa específico, los estudios impartidos por UTAMV no cuentan con reconocimiento de validez oficial y tienen carácter institucional privado.',
      },
      {
        num: 'Art. 23',
        title: 'Leyenda Obligatoria',
        text: 'Toda publicidad, comunicación y documentación institucional deberá incluir, cuando aplique, la siguiente leyenda:',
        quote: '"Estudios sin reconocimiento de validez oficial. La formación educativa ofrecida no cuenta con reconocimiento por parte de la autoridad educativa competente."',
      },
    ],
  },
];

const InstitucionalPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main className="pt-28 pb-24">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Bloque Normativo Unificado · Pre-RVOE</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">
              Marco Institucional
            </h1>
            <p className="font-display text-xl italic text-gold mb-6">Documentación Oficial UTAMV — Versión Blindada</p>
            <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed">
              Bloque normativo, académico y legal único de UTAMV, diseñado para publicación institucional,
              repositorio académico y expedientes Pre-RVOE. Estructura de gobierno, modelo académico,
              régimen disciplinario, ética y aviso legal en un documento unificado.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-ui text-xs font-medium text-platinum-dim border border-[hsl(var(--gold)/0.15)] hover:border-[hsl(var(--gold)/0.4)] hover:text-gold transition-all"
              >
                <s.icon size={12} />
                {s.label}
              </a>
            ))}
          </div>
        </section>

        {/* Sections */}
        <section className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {sections.map((section, si) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-28 p-7 md:p-8 rounded-2xl bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.18)] transition-all"
              >
                {/* Section Header */}
                <div className="flex items-start gap-4 mb-7 pb-5 border-b border-[hsl(var(--gold)/0.1)]">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(var(--gold)/0.1)] border border-[hsl(var(--gold)/0.2)] flex items-center justify-center flex-shrink-0">
                    <section.icon size={22} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="badge-academic">{section.tag}</span>
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-platinum leading-tight">{section.title}</h2>
                    <p className="font-ui text-sm text-muted-foreground mt-1">{section.subtitle}</p>
                  </div>
                </div>

                {/* Articles */}
                <div className="space-y-6">
                  {section.articles.map((article, ai) => (
                    <div key={ai} className={ai > 0 ? 'pt-5 border-t border-[hsl(var(--gold)/0.06)]' : ''}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-ui text-[10px] font-bold tracking-wider uppercase text-gold bg-[hsl(var(--gold)/0.1)] px-2.5 py-1 rounded-full">{article.num}</span>
                        <h4 className="font-ui text-sm font-bold text-platinum">{article.title}</h4>
                      </div>
                      {article.text && (
                        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3 ml-0">{article.text}</p>
                      )}
                      {article.list && (
                        <ul className="space-y-2 ml-2">
                          {article.list.map((item, li) => (
                            <li key={li} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-gold/40 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {(article as any).quote && (
                        <div className="mt-3 p-4 rounded-xl bg-[hsl(var(--gold)/0.06)] border-l-2 border-gold/50">
                          <p className="font-body text-sm text-platinum-dim italic leading-relaxed">{(article as any).quote}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Final Legal Alert */}
            <div className="p-6 rounded-2xl bg-[hsl(0_72%_51%/0.06)] border border-[hsl(0_72%_51%/0.2)]">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-ui text-sm font-bold text-destructive mb-2">Aviso Legal Obligatorio</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-platinum-dim">Estudios sin reconocimiento de validez oficial.</strong>{' '}
                    La formación educativa ofrecida por UTAMV no cuenta con reconocimiento por parte de la autoridad
                    educativa competente. UTAMV es una institución privada en proceso de solicitud de RVOE.
                    Los programas tienen carácter institucional privado únicamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default InstitucionalPage;
