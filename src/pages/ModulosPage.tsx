// app/programas/modulosPage.tsx
// UTAMV Campus – Programas + Plan de Estudios Máster CM NextGen 2.0 (2026)

import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Award,
  Grid3X3,
  ArrowRight,
  Layers,
  Target,
  CheckCircle2,
  Download,
  Cpu,
  PlayCircle,
  Mic,
} from "lucide-react";

type ProgramType = "Curso" | "Diplomado" | "Licenciatura" | "Maestría";

interface Program {
  id: string;
  nombre: string;
  tipo: ProgramType;
  area: string;
  horasTotales: number;
  duracion: string;
  modalidad: string;
  nivel: string;
  descripcion: string;
  destacado?: boolean;
}

interface MasterModule {
  id: number | string;
  n: string;
  title: string;
  subtitle: string;
  tag: string;
  duration: string;
  format: string;
  description: string;
  objectives: string[];
  outline: string[];
  assets: string[];
}

const programs: Program[] = [
  {
    id: "utamv-maestria-cmn",
    nombre: "Maestría en Community Management NextGen 2.0",
    tipo: "Maestría",
    area: "Comunidades Digitales",
    horasTotales: 240,
    duracion: "8–10 meses",
    modalidad: "100% online · Asincrónico · Campus UTAMV",
    nivel: "Posgrado profesional",
    descripcion:
      "Programa insignia UTAMV orientado al diseño, gestión y escalamiento de comunidades digitales con enfoque ético, estratégico, de datos e IA.",
    destacado: true,
  },
  {
    id: "utamv-maestria-ia-aplicada",
    nombre: "Maestría en Inteligencia Artificial Aplicada a Medios",
    tipo: "Maestría",
    area: "IA Aplicada",
    horasTotales: 220,
    duracion: "8 meses",
    modalidad: "Online · Proyectos aplicados",
    nivel: "Posgrado profesional",
    descripcion:
      "Formación avanzada en uso estratégico de IA para análisis, automatización, creación y gobernanza de ecosistemas digitales.",
  },
  {
    id: "utamv-lic-estrategia-digital",
    nombre: "Licenciatura en Estrategia Digital y Ecosistemas",
    tipo: "Licenciatura",
    area: "Estrategia Digital",
    horasTotales: 1800,
    duracion: "3 años",
    modalidad: "Online · Modular",
    nivel: "Grado",
    descripcion:
      "Carrera universitaria orientada al pensamiento estratégico, diseño de sistemas digitales y liderazgo en entornos complejos.",
  },
  {
    id: "utamv-dip-marketing-etico",
    nombre: "Diplomado en Marketing Ético y Marca con Propósito",
    tipo: "Diplomado",
    area: "Marketing Ético",
    horasTotales: 120,
    duracion: "4 meses",
    modalidad: "Online",
    nivel: "Especialización",
    descripcion:
      "Diplomado enfocado en estrategias de marca responsables, sostenibles y alineadas a valores sociales y culturales.",
  },
  {
    id: "utamv-dip-ecosistemas",
    nombre: "Diplomado en Diseño de Ecosistemas Digitales",
    tipo: "Diplomado",
    area: "Ecosistemas Digitales",
    horasTotales: 140,
    duracion: "5 meses",
    modalidad: "Online · Proyecto final",
    nivel: "Especialización",
    descripcion:
      "Programa centrado en arquitectura de plataformas, comunidades, productos y sistemas interconectados.",
  },
  {
    id: "utamv-dip-analitica-social",
    nombre: "Diplomado en Analítica Social y Toma de Decisiones",
    tipo: "Diplomado",
    area: "Datos y Estrategia",
    horasTotales: 130,
    duracion: "4–5 meses",
    modalidad: "Online",
    nivel: "Especialización",
    descripcion:
      "Análisis de datos sociales, métricas de comunidad y modelos de decisión aplicados a entornos digitales.",
  },
  {
    id: "utamv-curso-gobernanza",
    nombre: "Curso en Gobernanza Digital y Moderación de Comunidades",
    tipo: "Curso",
    area: "Comunidades Digitales",
    horasTotales: 40,
    duracion: "6 semanas",
    modalidad: "Online",
    nivel: "Formación continua",
    descripcion:
      "Curso práctico sobre normas, ética, toma de decisiones y gestión de conflictos en comunidades digitales.",
  },
  {
    id: "utamv-curso-ia-creativa",
    nombre: "Curso en IA Creativa y Automatización de Contenidos",
    tipo: "Curso",
    area: "IA Aplicada",
    horasTotales: 45,
    duracion: "6 semanas",
    modalidad: "Online",
    nivel: "Formación continua",
    descripcion:
      "Introducción aplicada al uso de IA generativa para producción de contenidos con criterio profesional.",
  },
  {
    id: "utamv-curso-etica-digital",
    nombre: "Curso en Ética, Cultura y Tecnología",
    tipo: "Curso",
    area: "Humanidades Digitales",
    horasTotales: 35,
    duracion: "5 semanas",
    modalidad: "Online",
    nivel: "Formación continua",
    descripcion:
      "Curso transversal UTAMV que aborda ética, valores y responsabilidad en el desarrollo tecnológico.",
  },
];

// Plan de estudios del Máster en Community Management NextGen 2.0
const masterModules: MasterModule[] = [
  {
    id: 1,
    n: "01",
    title: "Fundamentos del Community Manager",
    subtitle: "Módulo 1 — Rol, funciones y día a día",
    tag: "Introductorio",
    duration: "10 horas",
    format: "Texto · Audio · Video · IA",
    description:
      "Qué es un Community Manager, sus funciones diarias y su encaje estratégico en equipos de marketing y producto.",
    objectives: [
      "Comprender el rol del Community Manager en organizaciones y proyectos digitales.",
      "Identificar tareas diarias operativas y estratégicas del CM.",
      "Conocer el glosario básico de social media y community management.",
    ],
    outline: [
      "Definición de Community Manager y diferencias con otros roles.",
      "Tipos de Community Manager según industria y modelo de negocio.",
      "Tareas diarias: publicación, moderación, escucha social y reporting básico.",
      "Glosario digital esencial para trabajar con equipos multidisciplinares.",
    ],
    assets: [
      "Guía rápida de rol y responsabilidades CM (PDF).",
      "Checklist de tareas diarias/semanales de un CM.",
      "Glosario digital UTAMV para social media y comunidad.",
    ],
  },
  {
    id: 2,
    n: "02",
    title: "Marketing & Comunicación 2.0",
    subtitle: "Módulo 2 — Ecosistema Digital y Reputación",
    tag: "Ecosistema",
    duration: "20 horas",
    format: "Texto · Video · Casos · IA",
    description:
      "Web 2.0, prosumidores, social media y reputación online como base para diseñar comunidades con propósito.",
    objectives: [
      "Comprender la Web 2.0, el papel del prosumidor y el impacto en las marcas.",
      "Analizar la reputación online y los riesgos en entornos sociales.",
      "Conectar eCRM, long tail, mobile y marketing viral con estrategias de comunidad.",
    ],
    outline: [
      "Web 2.0 y prosumidores 2.0: usuarios como creadores de contenido.",
      "Social Media y Comunicación 2.0: canales, formatos y dinámicas.",
      "Marca 2.0 y reputación online: casos positivos y de crisis.",
      "Blogosfera, long tail, ecommerce 2.0 y eCRM.",
      "Cloud computing, crowdsourcing y crowdfunding.",
      "Innovación: mundos virtuales, mundos espejo, lifelogging e IA.",
    ],
    assets: [
      "Mapa del ecosistema digital y social media 2026.",
      "Plantilla de análisis de reputación online.",
      "Casos prácticos comentados de crisis y oportunidades 2.0.",
    ],
  },
  {
    id: 3,
    n: "03",
    title: "Uso Profesional de Redes Sociales",
    subtitle: "Módulo 3 — Plataformas, herramientas y eventos 2.0",
    tag: "Operativo",
    duration: "25 horas",
    format: "Texto · Video · Plantillas",
    description:
      "Gestión profesional de redes sociales, social listening, eventos 2.0 y fidelización de comunidades.",
    objectives: [
      "Dominar el uso profesional de las principales redes sociales.",
      "Configurar workflows de publicación, respuesta y escucha social.",
      "Gestionar eventos 2.0 y estrategias de fidelización en redes.",
    ],
    outline: [
      "Plataformas clave: Facebook, Instagram, X, LinkedIn, TikTok, YouTube.",
      "Ecosistema de apps y entorno multidispositivo.",
      "Métricas y ROI en redes sociales (nivel intermedio).",
      "Herramientas de gestión y SMO: planificación y monitorización.",
      "Creación de contenidos para la comunidad: formatos y tono.",
      "Gestión de contenidos en un evento 2.0.",
      "Aspectos jurídicos básicos y casos prácticos en redes.",
      "Fidelización en redes sociales e internet.",
    ],
    assets: [
      "Calendario editorial UTAMV (Notion/Sheets).",
      "Template de guía de estilo por red social.",
      "Checklist legal básica para gestión de comunidades.",
    ],
  },
  {
    id: 4,
    n: "04",
    title: "Plan de Marketing Digital y Social Media Plan",
    subtitle: "Módulo 4 — Diseño Estratégico",
    tag: "Estrategia",
    duration: "20 horas",
    format: "Texto · Plantillas · IA",
    description:
      "Diseño de un Plan de Marketing Digital y un Social Media Plan completo centrado en comunidad y producto tech.",
    objectives: [
      "Diseñar un Plan de Marketing Digital alineado con objetivos de negocio.",
      "Construir un Social Media Plan integrando contenidos, medios y comunidad.",
      "Aterrizar propuestas tácticas en un roadmap accionable.",
    ],
    outline: [
      "Componentes de un Plan de Marketing Digital.",
      "Definición de objetivos SMART y KPIs clave.",
      "Segmentación y propuesta de valor para comunidades.",
      "Social Media Plan: canales, contenidos, roles y procesos.",
      "Resultados y seguimiento de un Plan de Marketing Digital.",
    ],
    assets: [
      "Plantilla de Plan de Marketing Digital UTAMV.",
      "Plantilla de Social Media Plan centrado en comunidad.",
      "Ejemplo de plan completo aplicado a un caso real.",
    ],
  },
  {
    id: 5,
    n: "05",
    title: "Métricas, Reportes y ROI",
    subtitle: "Módulo 5 — Data para Community Managers",
    tag: "Data",
    duration: "15 horas",
    format: "Texto · Video · Dashboards",
    description:
      "KPIs cualitativos y cuantitativos, cuadros de mando e informes ejecutivos para conectar comunidad con negocio.",
    objectives: [
      "Definir KPIs accionables para comunidad y social media.",
      "Construir dashboards operativos y ejecutivos.",
      "Realizar reportes que conecten comunidad con resultados de negocio.",
    ],
    outline: [
      "Métricas básicas y avanzadas en redes y comunidad.",
      "Reportes cualitativos vs. cuantitativos.",
      "Dashboards: estructura y buenas prácticas.",
      "Introducción al ROI aplicado a actividades de comunidad.",
    ],
    assets: [
      "Cuadro de mando UTAMV para Community Manager.",
      "Template de reporte mensual de comunidad.",
      "Guía de interpretación de métricas críticas.",
    ],
  },
  {
    id: 6,
    n: "06",
    title: "IA y Automatización para Community Managers",
    subtitle: "Módulo 6 — NextGen Operations",
    tag: "IA Avanzada",
    duration: "25 horas",
    format: "Texto · Talleres · IA",
    description:
      "IA generativa, automatización de tareas, prompts estratégicos y principios éticos UTAMV aplicados al trabajo diario del CM.",
    objectives: [
      "Aplicar IA generativa en contenido, investigación y soporte a la comunidad.",
      "Automatizar tareas repetitivas y flujos de trabajo clave.",
      "Operar bajo los Principios Inmutables UTAMV para uso ético de IA.",
    ],
    outline: [
      "Panorama IA en community management y marketing digital.",
      "Prompting estratégico para copy, creatividad y análisis.",
      "Automatización de flujos: publicaciones, respuestas y alertas.",
      "Principios éticos UTAMV: veracidad, no simulación, integridad.",
      "Riesgos, sesgos y límites del uso de IA en comunidades.",
    ],
    assets: [
      "Playbook de prompts UTAMV para Community Managers.",
      "Plantilla de flujos automatizados (diagramas).",
      "Checklist de riesgos y buenas prácticas con IA.",
    ],
  },
  {
    id: 7,
    n: "07",
    title: "Comunidades en Web, App y Metaverso",
    subtitle: "Módulo 7 — Ecosistemas 2.0/3.0",
    tag: "Avanzado",
    duration: "20 horas",
    format: "Texto · Casos · Mapas",
    description:
      "Diseño y gestión de comunidades en sitios web, aplicaciones móviles y entornos inmersivos vinculados a productos digitales como TAMV.",
    objectives: [
      "Diseñar comunidades que trascienden redes sociales tradicionales.",
      "Entender mundos virtuales, mundos espejo y experiencias inmersivas.",
      "Integrar comunidad, producto y datos en ecosistemas 2.0/3.0.",
    ],
    outline: [
      "Tipos de comunidades: abiertas, cerradas, híbridas.",
      "Mundos virtuales, mundos espejo y lifelogging.",
      "Casos de comunidades en apps, plataformas y metaverso.",
      "Seguridad, gobernanza y normas en comunidades complejas.",
    ],
    assets: [
      "Mapa de comunidad para productos digitales (canvas).",
      "Guía de diseño de espacios de comunidad en plataformas y metaversos.",
      "Ejemplos de políticas y normas de comunidad (playbook).",
    ],
  },
  {
    id: 8,
    n: "PF",
    title: "Plan Maestro de Comunidad y Proyecto Final TAMV",
    subtitle: "Módulo Final — Capstone UTAMV",
    tag: "Proyecto OBE",
    duration: "15 horas + proyecto",
    format: "Portafolio · Rúbrica · Defensa",
    description:
      "Integración de todos los módulos en un Plan Maestro de Comunidad. Proyecto final aplicado a un producto o módulo real del ecosistema TAMV.",
    objectives: [
      "Estructurar un Plan Maestro de Comunidad completo.",
      "Diseñar un roadmap operativo con métricas y recursos.",
      "Defender el proyecto ante un comité evaluador UTAMV.",
    ],
    outline: [
      "Estructura del Plan Maestro de Comunidad.",
      "Integración de canales, procesos y métricas.",
      "Roadmap trimestral con hitos y OKRs de comunidad.",
      "Presentación ejecutiva y defensa del proyecto final.",
    ],
    assets: [
      "Plantilla del Plan Maestro de Comunidad UTAMV.",
      "Rúbrica de evaluación del proyecto final (OBE).",
      "Repositorio de recursos de apoyo para el capstone.",
    ],
  },
];

const typeColors: Record<ProgramType, string> = {
  Maestría:
    "border-[hsl(var(--platinum)/0.45)] bg-[hsl(var(--platinum)/0.12)] text-platinum",
  Licenciatura:
    "border-[hsl(215_40%_40%/0.5)] bg-[hsl(215_40%_40%/0.1)] text-[hsl(215_35%_80%)]",
  Diplomado:
    "border-[hsl(200_40%_40%/0.5)] bg-[hsl(200_40%_40%/0.1)] text-[hsl(200_35%_80%)]",
  Curso:
    "border-[hsl(150_40%_40%/0.5)] bg-[hsl(150_40%_40%/0.1)] text-[hsl(150_35%_80%)]",
};

const tagColors: Record<string, string> = {
  Introductorio:
    "border-[hsl(215_35%_35%/0.5)] bg-[hsl(215_35%_35%/0.08)] text-[hsl(215_30%_65%)]",
  Ecosistema:
    "border-[hsl(220_35%_40%/0.5)] bg-[hsl(220_35%_40%/0.08)] text-[hsl(220_30%_70%)]",
  Operativo:
    "border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim",
  Estrategia:
    "border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim",
  Data:
    "border-[hsl(200_35%_40%/0.5)] bg-[hsl(200_35%_40%/0.08)] text-[hsl(200_30%_70%)]",
  "IA Avanzada":
    "border-[hsl(var(--platinum)/0.35)] bg-[hsl(var(--platinum)/0.08)] text-platinum",
  Avanzado:
    "border-[hsl(240_25%_40%/0.5)] bg-[hsl(240_25%_40%/0.08)] text-[hsl(240_25%_70%)]",
  "Proyecto OBE":
    "border-[hsl(var(--platinum)/0.4)] bg-[hsl(var(--platinum)/0.1)] text-platinum",
};

export default function ModulosPage() {
  const masters = programs.filter((p) => p.tipo === "Maestría");
  const licenciaturas = programs.filter((p) => p.tipo === "Licenciatura");
  const diplomados = programs.filter((p) => p.tipo === "Diplomado");
  const cursos = programs.filter((p) => p.tipo === "Curso");

  return (
    <main className="min-h-screen bg-[#050915] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header institucional */}
        <header className="mb-14 text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
            <Grid3X3 className="w-3 h-3" />
            UTAMV · Catálogo Académico 2026
          </span>

          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-slate-50">
                Programas Académicos UTAMV
              </h1>
              <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-300 leading-relaxed">
                Universidad Tecnológica Avanzada Mexicana Versátil (UTAMV). Ecosistema académico
                modular basado en OBE: cursos, diplomados, licenciaturas y maestrías diseñados para
                profesionales de Latinoamérica que lideran tecnología, comunidades e innovación.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>9 programas activos · Catálogo en expansión</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Formación 100% online · Campus UTAMV</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Certificación profesional UTAMV</span>
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-[11px] text-slate-400 leading-relaxed">
            Todos los programas se imparten en modalidad online, con acceso al campus 24/7,
            materiales descargables y evaluación basada en evidencias. Estudios sin reconocimiento de
            validez oficial ante la SEP. Institución privada en proceso Pre-RVOE.
          </p>
        </header>

        {/* Bloque destacado: Maestría CM NextGen */}
        <section className="mb-14">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-400">
                Programa Insignia · Comunidades Digitales
              </h2>
              <p className="text-xs text-slate-500">
                Máster 2.0 Community Managers NextGen 2026 como ruta avanzada dentro del ecosistema UTAMV.
              </p>
            </div>
          </div>

          {masters
            .filter((m) => m.id === "utamv-maestria-cmn")
            .map((program) => (
              <article
                key={program.id}
                className="relative overflow-hidden rounded-2xl border border-sky-500/40 bg-gradient-to-br from-sky-950/70 via-slate-950/90 to-slate-950 p-6 md:p-8"
              >
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top,_#38bdf8_0,_transparent_55%)]" />
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span
                        className={`text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1 rounded-full border ${typeColors[program.tipo]}`}
                      >
                        {program.tipo} · {program.area}
                      </span>
                      <span className="text-[10px] text-slate-300/70">
                        {program.nivel}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-50 leading-snug mb-2">
                      {program.nombre}
                    </h3>
                    <p className="text-sm text-slate-200/90 leading-relaxed mb-4">
                      {program.descripcion}
                    </p>
                    <p className="text-[11px] text-slate-300/80 mb-4">
                      Visión: empoderar y crear una nueva generación de Community Managers latinos capaces
                      de diseñar, operar y escalar comunidades de producto en redes sociales, plataformas y
                      entornos inmersivos. Misión: otorgar formación rigurosa, aplicada y alineada con las
                      tendencias tecnológicas actuales.
                    </p>
                    <ul className="text-xs text-slate-300/90 space-y-1">
                      <li>Horas totales estimadas: {program.horasTotales}</li>
                      <li>Duración sugerida: {program.duracion}</li>
                      <li>Modalidad: {program.modalidad}</li>
                    </ul>
                  </div>

                  <div className="w-full md:w-72 flex flex-col justify-between gap-4">
                    <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-200">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-sky-300" />
                        <span>Enfoque estratégico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-sky-300" />
                        <span>8 módulos + capstone</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky-300" />
                        <span>Ritmo flexible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-sky-300" />
                        <span>Certificación UTAMV</span>
                      </div>
                    </div>
                    <a
                      href="#plan-master-cm"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/70 bg-sky-500/10 px-5 py-3 text-[11px] font-semibold tracking-widest uppercase text-sky-100 hover:bg-sky-500/20 transition"
                    >
                      Ver plan de módulos del Máster
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
        </section>

        {/* Resto de programas UTAMV */}
        <section className="space-y-10 mb-16">
          {masters.length > 1 && (
            <ProgramSection
              title="Otras Maestrías UTAMV"
              programs={masters.filter((m) => m.id !== "utamv-maestria-cmn")}
            />
          )}
          {licenciaturas.length > 0 && (
            <ProgramSection title="Licenciaturas" programs={licenciaturas} />
          )}
          {diplomados.length > 0 && (
            <ProgramSection title="Diplomados" programs={diplomados} />
          )}
          {cursos.length > 0 && (
            <ProgramSection title="Cursos de Formación Continua" programs={cursos} />
          )}
        </section>

        {/* Plan de estudios del Máster CM NextGen 2.0 */}
        <section id="plan-master-cm" className="mt-4">
          <div className="mb-8 text-center md:text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">
              <Layers className="w-3 h-3" />
              Plan de Estudios · Maestría en Community Management NextGen 2.0
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-display font-bold text-slate-50">
              Módulos Académicos del Máster
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-slate-300 leading-relaxed">
              El máster se estructura en ocho módulos académicos más un proyecto final (capstone)
              bajo metodología OBE, integrando fundamentos, marketing 2.0, operación de redes,
              estrategia, datos, IA aplicada y ecosistemas 2.0/3.0 vinculados al entorno TAMV.
            </p>

            <div className="mt-4 flex flex-wrap justify-start gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300/80 uppercase tracking-widest bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-600/70">
                <BookOpen className="w-3 h-3" /> Texto
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300/80 uppercase tracking-widest bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-600/70">
                <Mic className="w-3 h-3" /> Audio
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300/80 uppercase tracking-widest bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-600/70">
                <PlayCircle className="w-3 h-3" /> Video
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300/80 uppercase tracking-widest bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-600/70">
                <Cpu className="w-3 h-3" /> IA Integrada
              </div>
            </div>
          </div>

          <div className="space-y-5 max-w-6xl mx-auto">
            {masterModules.map((mod) => (
              <article
                key={mod.id}
                className="group p-6 md:p-8 rounded-2xl bg-slate-950/80 border border-slate-700/70 hover:border-slate-400/80 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Número / lateral */}
                  <div className="flex-shrink-0">
                    <div className="font-display text-5xl font-black text-slate-600/40 group-hover:text-slate-300/60 transition-colors leading-none w-14 text-center">
                      {mod.n}
                    </div>
                  </div>

                  {/* Contenido módulo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`font-ui text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border ${
                          tagColors[mod.tag] || "border-slate-500/60 bg-slate-800/60 text-slate-200"
                        }`}
                      >
                        {mod.tag}
                      </span>
                      <span className="font-ui text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {mod.duration}
                      </span>
                      <span className="font-ui text-[10px] text-slate-500 italic">
                        {mod.format}
                      </span>
                    </div>

                    <p className="font-ui text-[10px] text-slate-400 tracking-wide uppercase mb-1">
                      {mod.subtitle}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-slate-50 mb-2 group-hover:text-slate-100 transition-colors leading-snug">
                      {mod.title}
                    </h3>
                    <p className="font-body text-sm text-slate-300 leading-relaxed mb-5">
                      {mod.description}
                    </p>

                    <div className="grid md:grid-cols-3 gap-5">
                      {/* Objetivos */}
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2.5">
                          Objetivos
                        </div>
                        <ul className="space-y-1.5">
                          {mod.objectives.map((obj, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <Target
                                size={11}
                                className="text-slate-400/70 mt-0.5 flex-shrink-0"
                              />
                              <span className="font-body text-[11px] text-slate-300 leading-relaxed">
                                {obj}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contenidos */}
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2.5">
                          Contenidos
                        </div>
                        <ul className="space-y-1.5">
                          {mod.outline.map((item, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <CheckCircle2
                                size={11}
                                className="text-slate-400/60 mt-0.5 flex-shrink-0"
                              />
                              <span className="font-body text-[11px] text-slate-300 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Activos descargables */}
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2.5">
                          Activos Descargables
                        </div>
                        <ul className="space-y-1.5">
                          {mod.assets.map((asset, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <Download
                                size={11}
                                className="text-slate-400/60 mt-0.5 flex-shrink-0"
                              />
                              <span className="font-body text-[11px] text-slate-200 leading-relaxed">
                                {asset}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

interface ProgramSectionProps {
  title: string;
  programs: Program[];
}

function ProgramSection({ title, programs }: ProgramSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-400">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <article
            key={program.id}
            className="rounded-xl border border-slate-700/70 bg-slate-900/60 p-5 hover:border-slate-400/80 hover:bg-slate-900 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span
                className={`text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1 rounded-full border ${typeColors[program.tipo]}`}
              >
                {program.tipo} · {program.area}
              </span>
              <span className="text-[10px] text-slate-400">{program.nivel}</span>
            </div>
            <h4 className="text-lg font-semibold text-slate-50 leading-snug">
              {program.nombre}
            </h4>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {program.descripcion}
            </p>
            <ul className="mt-4 text-[11px] text-slate-400 space-y-1.5">
              <li>Horas totales: {program.horasTotales}</li>
              <li>Duración: {program.duracion}</li>
              <li>Modalidad: {program.modalidad}</li>
            </ul>
            <div className="mt-5">
              <Link
                to={`/programas/${program.id}`}
                className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-slate-200 border-b border-slate-500 hover:border-slate-200"
              >
                Ver ficha académica
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
