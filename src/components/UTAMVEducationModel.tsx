import { GraduationCap, Brain, ShieldCheck, Layers, Target, Users } from 'lucide-react';

interface Pillar {
  title: string;
  description: string;
  tag: string;
}

const pillars: Pillar[] = [
  {
    title: 'Aprendizaje basado en resultados (OBE)',
    description:
      'Cada módulo y actividad está diseñado con resultados de aprendizaje claros, medibles y alineados con el perfil de egreso UTAMV. El estudiante sabe desde el inicio qué será capaz de hacer y cómo se evaluará.',
    tag: 'Diseño curricular',
  },
  {
    title: 'Acompañamiento inteligente con IA académica',
    description:
      'El Core de IA UTAMV analiza las interacciones, identifica el nivel cognitivo (Taxonomía de Bloom) y propone rutas de apoyo sin reemplazar la evaluación humana. La IA actúa como tutor y guardián de integridad, no como atajo.',
    tag: 'Core IA UTAMV',
  },
  {
    title: 'Ética, integridad y antifraude académico',
    description:
      'Un pipeline normativo detecta solicitudes de fraude, simulación de RVOE y dictámenes profesionales, y activa disclaimers y bloqueos cuando es necesario. El estudiante aprende en un entorno exigente, pero justo y transparente.',
    tag: 'Normatividad',
  },
  {
    title: 'Metodología METODO4L en la práctica',
    description:
      'Las experiencias de aprendizaje se estructuran con el marco METODO4L, integrando teoría, práctica, reflexión y aplicación al contexto real de negocios y territorio.',
    tag: 'Marco metodológico',
  },
  {
    title: 'Trayectorias personalizadas y progresión visible',
    description:
      'El campus muestra el avance por módulos, evidencias entregadas y badges obtenidos. Las trayectorias permiten que el estudiante avance a su ritmo, sin perder la trazabilidad institucional.',
    tag: 'Progreso y badges',
  },
  {
    title: 'Vinculación con territorio y ecosistema digital',
    description:
      'A través del módulo Territorial OS, los proyectos académicos se conectan con nodos reales de comercio, servicios y comunidad, para que cada entrega tenga impacto fuera del aula.',
    tag: 'RDM Digital Territorial OS',
  },
];

export function UTAMVEducationModel() {
  return (
    <section className="relative bg-slate-950 py-16 text-slate-50 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start">
          <div className="space-y-4 sm:space-y-6 lg:w-2/5">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
              <GraduationCap className="h-4 w-4" />
              <span>Modelo educativo UTAMV 2026</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Cómo cuidamos la educación y la experiencia del estudiante
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              UTAMV Campus no es solo una plataforma. Es un entorno académico diseñado para combinar exigencia,
              acompañamiento inteligente y aplicación real en empresas y territorio.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-emerald-300">
                <Brain className="h-4 w-4" />
                <span>IA académica supervisada</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Integridad y antifraude</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Layers className="h-4 w-4" />
                <span>METODO4L aplicado</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <Users className="h-4 w-4" />
                <span>Trayectorias guiadas</span>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:w-3/5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/30 sm:p-5"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 ring-1 ring-emerald-500/30">
                      {pillar.tag}
                    </span>
                    <Target className="h-4 w-4 text-slate-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50 sm:text-base">{pillar.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
