import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { Link } from 'react-router-dom';
import {
  Scale, ShieldCheck, FileText, GraduationCap, BookOpen,
  Building2, AlertTriangle, CheckCircle2, ArrowRight, Brain, Globe
} from 'lucide-react';

const sections = [
  {
    id: 'estatuto', icon: Building2, label: 'Estatuto Orgánico', tag: 'Capítulos I-IV',
    title: 'Estatuto Orgánico de la UTAMV',
    subtitle: 'Naturaleza Jurídica, Fines y Gobierno',
    articles: [
      { num: 'Art. 1', title: 'Naturaleza Jurídica', text: 'La Universidad de Tecnología Avanzada, Marketing y Versatilidad (UTAMV) es una institución particular de educación superior de carácter privado, con personalidad jurídica y patrimonio propios, que se rige por la legislación educativa aplicable en los Estados Unidos Mexicanos, por el presente Estatuto Orgánico y por los reglamentos internos que de él emanen.' },
      { num: 'Art. 2', title: 'Autonomía Académica', text: 'UTAMV ejerce autonomía académica y de gestión interna para el diseño, implementación y evaluación de sus modelos educativos, planes y programas de estudio, sin perjuicio de la observancia estricta de los requisitos, procedimientos y autorizaciones que establezcan las autoridades educativas competentes para la obtención del RVOE.' },
      { num: 'Art. 3', title: 'Fines Institucionales', list: ['a) Impartir educación superior de calidad mediante modelos pedagógicos basados en competencias y resultados de aprendizaje medibles (Outcome-Based Education, OBE).', 'b) Desarrollar conocimiento aplicado, innovación tecnológica y educación digital avanzada, con énfasis en tecnología, marketing estratégico y versatilidad profesional.', 'c) Formar personas profesionales con pensamiento crítico, ética, responsabilidad social y capacidad de adaptación a entornos digitales, híbridos y emergentes.', 'd) Contribuir al desarrollo social, económico y tecnológico mediante programas educativos, formación continua, investigación aplicada y vinculación con sectores productivos.'] },
      { num: 'Art. 4-6', title: 'Estructura de Gobierno', list: ['Consejo de Fundadores: máxima autoridad estratégica y patrimonial de UTAMV.', 'Consejo Académico: órgano colegiado responsable de la conducción y mejora continua de la calidad académica.', 'Rectoría: representación legal, académica y administrativa de la institución.', 'Direcciones Académicas y Administrativas: gestión operativa de las áreas funcionales.'] },
      { num: 'Art. 7-8', title: 'Rectoría — Requisitos', list: ['a) Título profesional de licenciatura y grado preferente de maestría o superior.', 'b) Experiencia comprobable en docencia, gestión académica o dirección educativa.', 'c) Solvencia ética, profesional y legal.'] },
    ],
  },
  {
    id: 'reglamento', icon: FileText, label: 'Reglamento Académico', tag: 'Capítulos I-IV',
    title: 'Reglamento Académico General UTAMV',
    subtitle: 'Procesos Académicos y Régimen Disciplinario',
    articles: [
      { num: 'Art. 9-10', title: 'Modelo Educativo NextGen 2026', text: 'El Modelo Educativo UTAMV NextGen 2026 se fundamenta en educación basada en resultados (OBE), aprendizaje centrado en el estudiante, innovación tecnológica y evaluación continua verificable. Sus ejes: Tecnología Avanzada, Marketing Estratégico, Versatilidad Profesional y Ética y Responsabilidad Social.' },
      { num: 'Art. 11', title: 'Metodología Académica', text: 'La metodología privilegia aprendizaje basado en proyectos (PBL), estudios de caso, simulaciones, portafolios de evidencias y tutoría académica permanente, alineado a un esquema OBE con rúbricas y evidencias trazables.' },
      { num: 'Art. 12', title: 'Disposiciones Generales', text: 'El presente Reglamento regula los procesos académicos y las relaciones entre estudiantes, docentes y autoridades universitarias en el marco del Modelo Educativo UTAMV NextGen 2026.' },
      { num: 'Art. 13', title: 'Admisión e Inscripción', text: 'Los procesos de admisión serán transparentes, equitativos y documentados, sin discriminación por razón de origen, género, condición socioeconómica, creencia religiosa o cualquier otra condición.' },
      { num: 'Art. 14', title: 'Evaluación Académica', text: 'La evaluación será continua, formativa y basada en competencias y evidencias verificables, alineada a los Resultados de Aprendizaje (RA) definidos por módulo mediante rúbricas estandarizadas públicas.' },
      { num: 'Art. 15', title: 'Régimen Disciplinario', text: 'Las faltas académicas serán sancionadas conforme a su gravedad y al debido proceso, garantizando el derecho a audiencia y defensa del estudiante en todo momento.' },
    ],
  },
  {
    id: 'etica', icon: ShieldCheck, label: 'Código de Ética', tag: 'Arts. 16-17',
    title: 'Código de Ética e Integridad Académica',
    subtitle: 'Honestidad, Legalidad y Responsabilidad',
    articles: [
      { num: 'Art. 16', title: 'Valores Institucionales', text: 'UTAMV promueve como valores esenciales: honestidad, integridad, legalidad, respeto, responsabilidad social y compromiso con la excelencia académica en todas las actividades de la comunidad universitaria.' },
      { num: 'Art. 17', title: 'Faltas Graves', text: 'Se consideran faltas graves que pueden resultar en suspensión o baja definitiva:', list: ['Plagio en trabajos, proyectos o evaluaciones académicas.', 'Fraude académico en cualquiera de sus modalidades.', 'Falsificación de documentos académicos o institucionales.', 'Suplantación de identidad en evaluaciones o plataformas.', 'Uso indebido de obras protegidas por derechos de autor.', 'Uso de IA para suplantar la autoría intelectual del estudiante.'] },
    ],
  },
  {
    id: 'online', icon: GraduationCap, label: 'Política Online', tag: 'Art. 18',
    title: 'Política de Educación Online y Tutorías',
    subtitle: 'Campus Digital y Acompañamiento Académico',
    articles: [
      { num: 'Art. 18', title: 'Garantías del Campus Online', text: 'UTAMV garantiza en sus programas en línea e híbridos:', list: ['Acceso permanente a plataformas digitales educativas con disponibilidad 24/7.', 'Tutoría académica personalizada con respuesta en no más de 48 horas hábiles.', 'Seguimiento individual del progreso académico mediante analítica de aprendizaje.', 'Recursos multimedia en múltiples formatos para distintos estilos de aprendizaje.', 'Comunidad de aprendizaje colaborativo entre estudiantes y docentes.'] },
    ],
  },
  {
    id: 'obe', icon: BookOpen, label: 'Manual OBE', tag: 'Art. 19',
    title: 'Manual de Evaluación Académica (OBE)',
    subtitle: 'Resultados Verificables y Rúbricas Estandarizadas',
    articles: [
      { num: 'Art. 19', title: 'Sistema de Evaluación OBE', text: 'El sistema de evaluación de UTAMV se sustenta en:', list: ['Resultados de Aprendizaje (RA) específicos, medibles y verificables por módulo.', 'Evidencias concretas que demuestran el dominio de competencias declaradas.', 'Rúbricas estandarizadas con descriptores claros de desempeño por nivel.', 'Retroalimentación continua, formativa y orientada a la mejora.', 'Portafolio de evidencias como instrumento de evaluación terminal verificable.'] },
    ],
  },
  {
    id: 'antiplagio', icon: ShieldCheck, label: 'Política Antiplagio', tag: 'Art. 20',
    title: 'Política de Propiedad Intelectual y Antiplagio',
    subtitle: 'Derechos de Autor y Uso Ético de Obras',
    articles: [
      { num: 'Art. 20', title: 'Protección y Sanciones', text: 'UTAMV protege activamente los derechos de autor institucionales y de terceros. El plagio, en cualquiera de sus formas —textual, paráfrasis no citada, auto-plagio o uso no autorizado de IA para suplantar la autoría del estudiante— constituye falta grave con las consecuencias disciplinarias establecidas en el Código de Ética.' },
    ],
  },
  {
    id: 'ia-governance', icon: Brain, label: 'Gobernanza IA', tag: 'Documento Maestro 2026',
    title: 'Arquitectura de Gobernanza de Inteligencia Artificial',
    subtitle: 'Versión Notarial — Jurídico-Legal — Internacional — Reforzada',
    articles: [
      { num: 'Sec. I', title: 'Declaración de Identidad Institucional', text: 'Mineral del Monte, Hidalgo, México, a los dieciséis días del mes de febrero del año dos mil veintiséis. UTAMV manifiesta y declara, bajo protesta de decir verdad, que es una institución educativa privada que opera bajo un modelo académico institucional propio, en modalidad digital, en línea e híbrida, encontrándose en fase de preparación para la obtención del RVOE.' },
      { num: 'Sec. II', title: 'Objeto del Documento Maestro', list: ['a) Establecer el marco normativo, académico, ético, técnico y de gobernanza que rige el uso de IA institucional.', 'b) Definir principios inmutables que limitan y regulan el alcance de la IA, evitando simulación académica, fraude educativo o publicidad engañosa.', 'c) Proteger jurídicamente a la institución, comunidad académica y terceros.', 'd) Alinear la IA con buenas prácticas internacionales en educación superior sin simular certificaciones inexistentes.'] },
      { num: 'Sec. III', title: 'Naturaleza Jurídica y Alcance Internacional', list: ['a) Carácter institucional interno obligatorio.', 'b) Oponible a estudiantes, docentes, autoridades internas y proveedores tecnológicos vinculados al ecosistema UTAMV.', 'c) Compatible con marcos regulatorios UNESCO, OCDE y afines, sin implicar acreditación externa alguna.', 'd) No constituye tratado, convenio internacional ni instrumento de reconocimiento oficial externo.'] },
      { num: 'Sec. IV', title: 'Principios Inmutables de Operación de la IA UTAMV', list: ['P.1 Veracidad Académica: La IA no inventará ni falseará información sin respaldo académico verificable.', 'P.2 No Simulación: Prohibido emitir, prometer o insinuar títulos, grados o validez oficial inexistente.', 'P.3 No Sustitución Humana: La IA no sustituye docentes, evaluadores ni autoridades académicas.', 'P.4 Integridad Académica: La IA no elaborará trabajos evaluables destinados a presentarse como producción original del usuario.', 'P.5 Autonomía Intelectual: La IA fomenta pensamiento crítico, análisis y construcción activa del conocimiento.'] },
    ],
  },
  {
    id: 'aviso-legal', icon: Scale, label: 'Aviso Legal Pre-RVOE', tag: 'Arts. 21-23',
    title: 'Aviso Legal Institucional Pre-RVOE',
    subtitle: 'Transparencia y Legalidad Educativa',
    articles: [
      { num: 'Art. 21', title: 'Naturaleza Institucional Pre-RVOE', text: 'UTAMV es una institución privada de educación superior en proceso de preparación y, en su caso, solicitud de Reconocimiento de Validez Oficial de Estudios (RVOE) ante las autoridades educativas competentes de los Estados Unidos Mexicanos.' },
      { num: 'Art. 22', title: 'Carácter de los Estudios', text: 'Salvo resolución oficial expresa y vigente emitida por la autoridad educativa correspondiente para un programa específico, los estudios impartidos por UTAMV no cuentan con reconocimiento de validez oficial y tienen carácter institucional privado.' },
      { num: 'Art. 23', title: 'Leyenda Obligatoria', text: 'Toda publicidad, comunicación y documentación institucional deberá incluir, cuando aplique, la siguiente leyenda:', quote: '«Estudios sin reconocimiento de validez oficial. La formación educativa ofrecida no cuenta con reconocimiento por parte de la autoridad educativa competente.»' },
    ],
  },
];

const InstitucionalPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="pt-28 pb-24">
        <section className="container mx-auto px-4 mb-14">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-academic mb-4 inline-block">Bloque Normativo Unificado · Pre-RVOE · Versión Blindada</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">Marco Institucional</h1>
            <p className="font-display text-lg italic text-platinum-dim mb-5">Documentación Oficial UTAMV — Estatuto Orgánico · Reglamento · Ética · IA · Legal</p>
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Bloque normativo, académico y legal único de UTAMV, diseñado para publicación institucional,
              repositorio académico y expedientes Pre-RVOE. Incluye Documento Maestro de Gobernanza de IA 2026
              — Versión Notarial, Jurídico-Legal, Internacional y Reforzada.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-ui text-xs font-medium text-platinum-dim border border-[hsl(var(--platinum)/0.12)] hover:border-[hsl(var(--platinum)/0.35)] hover:text-platinum transition-all">
                <s.icon size={11} />{s.label}
              </a>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {sections.map((section) => (
              <div key={section.id} id={section.id}
                className="scroll-mt-28 p-7 md:p-8 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.07)] hover:border-[hsl(var(--platinum)/0.16)] transition-all">
                <div className="flex items-start gap-4 mb-6 pb-5 border-b border-[hsl(var(--platinum)/0.08)]">
                  <div className="w-11 h-11 rounded-xl bg-[hsl(var(--platinum)/0.07)] border border-[hsl(var(--platinum)/0.12)] flex items-center justify-center flex-shrink-0">
                    <section.icon size={20} className="text-platinum-dim" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="badge-academic text-[9px]">{section.tag}</span>
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-platinum leading-tight">{section.title}</h2>
                    <p className="font-ui text-xs text-muted-foreground mt-1">{section.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {section.articles.map((article, ai) => (
                    <div key={ai} className={ai > 0 ? 'pt-5 border-t border-[hsl(var(--platinum)/0.05)]' : ''}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-ui text-[9px] font-bold tracking-wider uppercase text-platinum-deep/70 bg-[hsl(var(--platinum)/0.07)] px-2.5 py-1 rounded-full border border-[hsl(var(--platinum)/0.1)]">{article.num}</span>
                        <h4 className="font-ui text-sm font-bold text-platinum">{article.title}</h4>
                      </div>
                      {article.text && <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{article.text}</p>}
                      {article.list && (
                        <ul className="space-y-1.5 ml-1">
                          {article.list.map((item, li) => (
                            <li key={li} className="flex items-start gap-2">
                              <CheckCircle2 size={12} className="text-platinum-dim/35 mt-0.5 flex-shrink-0" />
                              <span className="font-body text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {(article as any).quote && (
                        <div className="mt-3 p-4 rounded-xl bg-[hsl(var(--platinum)/0.04)] border-l-2 border-[hsl(var(--platinum)/0.3)]">
                          <p className="font-body text-sm text-platinum-dim italic leading-relaxed">{(article as any).quote}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-[hsl(0_72%_51%/0.05)] border border-[hsl(0_72%_51%/0.18)]">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className="text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-ui text-sm font-bold text-destructive mb-2">Aviso Legal Obligatorio — Art. 23 Estatuto UTAMV</h4>
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
