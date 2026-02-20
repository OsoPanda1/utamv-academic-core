// app/programas/modulosPage.tsx
// UTAMV Campus – Academic Programs Page 2026

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

        {/* Sección destacada: Maestría Community Management NextGen */}
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
            <Link
              to="/programas/utamv-maestria-cmn"
              className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-sky-300 hover:text-sky-100"
            >
              Ver detalle del Máster
              <ArrowRight className="w-3 h-3" />
            </Link>
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
                      <li>Horas totales: {program.horasTotales}</li>
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
                    <Link
                      to="/programas/utamv-maestria-cmn"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/70 bg-sky-500/10 px-5 py-3 text-[11px] font-semibold tracking-widest uppercase text-sky-100 hover:bg-sky-500/20 transition"
                    >
                      Ver plan de módulos del Máster
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </section>

        {/* Resto de maestrías y programas */}
        <section className="space-y-10">
          {/* Maestrías adicionales */}
          {masters.length > 1 && (
            <ProgramSection title="Otras Maestrías UTAMV" programs={masters.filter((m) => m.id !== "utamv-maestria-cmn")} />
          )}

          {/* Licenciaturas */}
          {licenciaturas.length > 0 && (
            <ProgramSection title="Licenciaturas" programs={licenciaturas} />
          )}

          {/* Diplomados */}
          {diplomados.length > 0 && (
            <ProgramSection title="Diplomados" programs={diplomados} />
          )}

          {/* Cursos */}
          {cursos.length > 0 && (
            <ProgramSection title="Cursos de Formación Continua" programs={cursos} />
          )}
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
