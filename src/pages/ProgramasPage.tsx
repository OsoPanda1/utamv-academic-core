// app/programas/ProgramasPage.tsx
// UTAMV Campus Online – Catálogo + Productos + Máster CM NextGen 2.0

import React from 'react';
import { Link } from 'react-router-dom';
import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import EliteBackground from '@/components/EliteBackground';
import {
  Award,
  Clock,
  BookOpen,
  Check,
  Shield,
  Globe,
  Landmark,
  CreditCard,
  HeartHandshake,
  Medal,
  ArrowRight,
  CheckCircle2,
  Star,
  BookOpenCheck,
  Briefcase,
  TrendingUp,
  Building2,
  Users,
  Layers,
  Cpu,
  PlayCircle,
  Mic,
  Download,
  Grid3X3,
} from 'lucide-react';

// -----------------------------
// 1) Catálogo académico “duro”
// -----------------------------

type ProgramType = 'Curso' | 'Diplomado' | 'Licenciatura' | 'Maestría' | 'Doctorado' | 'Máster Profesional' | 'Certificado';

interface CatalogProgram {
  id: string;
  nombre: string;
  tipo: ProgramType;
  area: string;
  horasTotales: number | string;
  duracion: string;
  modalidad: string;
  nivel: string;
  descripcion: string;
  destacado?: boolean;
  modules?: number;
}

const CATALOG_PROGRAMS: CatalogProgram[] = [
  // Maestrías y posgrado formal UTAMV
  {
    id: 'utamv-maestria-cmn',
    nombre: 'Maestría en Community Management NextGen 2.0',
    tipo: 'Maestría',
    area: 'Comunidades Digitales',
    horasTotales: 240,
    duracion: '8–10 meses',
    modalidad: '100% online · Asincrónico · Campus UTAMV',
    nivel: 'Posgrado profesional',
    descripcion:
      'Programa insignia UTAMV orientado al diseño, gestión y escalamiento de comunidades digitales con enfoque ético, estratégico, de datos e IA.',
    destacado: true,
    modules: 8,
  },
  {
    id: 'utamv-maestria-ia-aplicada',
    nombre: 'Maestría en Inteligencia Artificial Aplicada a Medios',
    tipo: 'Maestría',
    area: 'IA Aplicada',
    horasTotales: 220,
    duracion: '8 meses',
    modalidad: 'Online · Proyectos aplicados',
    nivel: 'Posgrado profesional',
    descripcion:
      'Formación avanzada en uso estratégico de IA para análisis, automatización, creación y gobernanza de ecosistemas digitales.',
    modules: 8,
  },
  {
    id: 'utamv-maestria-marketing-digital',
    nombre: 'Maestría en Marketing Digital Estratégico',
    tipo: 'Maestría',
    area: 'Marketing Digital',
    horasTotales: '80+',
    duracion: '18 meses',
    modalidad: 'Online · Tesis y portafolio',
    nivel: 'Posgrado',
    descripcion:
      'Programa de posgrado con profundización en marketing digital, estrategia omnicanal e investigación aplicada. Incluye tesis final y portafolio de evidencias OBE.',
    modules: 12,
  },

  // Doctorado profesional
  {
    id: 'utamv-doctorado-inteligencia-estrategica',
    nombre: 'Doctorado Profesional en Inteligencia Estratégica Digital',
    tipo: 'Doctorado',
    area: 'Estrategia Digital',
    horasTotales: '120+',
    duracion: '12 meses',
    modalidad: 'Online · Investigación aplicada',
    nivel: 'Especialización máxima',
    descripcion:
      'Programa de especialización doctoral con investigación aplicada, análisis avanzado e inteligencia estratégica en ecosistemas digitales complejos.',
    modules: 15,
  },

  // Licenciatura
  {
    id: 'utamv-lic-estrategia-digital',
    nombre: 'Licenciatura en Estrategia Digital y Ecosistemas',
    tipo: 'Licenciatura',
    area: 'Estrategia Digital',
    horasTotales: 1800,
    duracion: '3 años',
    modalidad: 'Online · Modular',
    nivel: 'Grado',
    descripcion:
      'Carrera universitaria orientada al pensamiento estratégico, diseño de sistemas digitales y liderazgo en entornos complejos.',
    modules: 30,
  },

  // Máster profesional “producto”
  {
    id: 'utamv-master-marketing-digital-2026',
    nombre: 'Máster Profesional en Marketing Digital 2026',
    tipo: 'Máster Profesional',
    area: 'Marketing Digital',
    horasTotales: '50+',
    duracion: '6 meses',
    modalidad: 'Online · Híbrido teórico-práctico',
    nivel: 'Avanzado',
    descripcion:
      '10 módulos curriculares bajo metodología OBE: desde fundamentos hasta IA aplicada al marketing. Diseñado para profesionales que lideran entornos digitales.',
    destacado: true,
    modules: 10,
  },

  // Diplomados
  {
    id: 'utamv-dip-marketing-etico',
    nombre: 'Diplomado en Marketing Ético y Marca con Propósito',
    tipo: 'Diplomado',
    area: 'Marketing Ético',
    horasTotales: 120,
    duracion: '4 meses',
    modalidad: 'Online',
    nivel: 'Especialización',
    descripcion:
      'Diplomado enfocado en estrategias de marca responsables, sostenibles y alineadas a valores sociales y culturales.',
    modules: 4,
  },
  {
    id: 'utamv-dip-ecosistemas',
    nombre: 'Diplomado en Diseño de Ecosistemas Digitales',
    tipo: 'Diplomado',
    area: 'Ecosistemas Digitales',
    horasTotales: 140,
    duracion: '5 meses',
    modalidad: 'Online · Proyecto final',
    nivel: 'Especialización',
    descripcion:
      'Programa centrado en arquitectura de plataformas, comunidades, productos y sistemas interconectados.',
    modules: 5,
  },
  {
    id: 'utamv-dip-analitica-social',
    nombre: 'Diplomado en Analítica Social y Toma de Decisiones',
    tipo: 'Diplomado',
    area: 'Datos y Estrategia',
    horasTotales: 130,
    duracion: '4–5 meses',
    modalidad: 'Online',
    nivel: 'Especialización',
    descripcion:
      'Análisis de datos sociales, métricas de comunidad y modelos de decisión aplicados a entornos digitales.',
    modules: 4,
  },
  {
    id: 'utamv-diplomado-seo-aeo',
    nombre: 'Diplomado en SEO, AEO y Contenido Digital',
    tipo: 'Diplomado',
    area: 'Marketing Digital',
    horasTotales: 20,
    duracion: '4 meses',
    modalidad: 'Online',
    nivel: 'Intermedio',
    descripcion:
      'Actualización intensiva en posicionamiento orgánico, Answer Engine Optimization y estrategia de contenidos para buscadores e IA.',
    modules: 4,
  },
  {
    id: 'utamv-diplomado-paid-media',
    nombre: 'Diplomado en Paid Media y Performance',
    tipo: 'Diplomado',
    area: 'Marketing Digital',
    horasTotales: 15,
    duracion: '3 meses',
    modalidad: 'Online',
    nivel: 'Intermedio',
    descripcion:
      'Meta Ads, Google Ads, segmentación avanzada, test A/B y métricas de atribución para campañas de performance digital.',
    modules: 3,
  },

  // Cursos
  {
    id: 'utamv-curso-gobernanza',
    nombre: 'Curso en Gobernanza Digital y Moderación de Comunidades',
    tipo: 'Curso',
    area: 'Comunidades Digitales',
    horasTotales: 40,
    duracion: '6 semanas',
    modalidad: 'Online',
    nivel: 'Formación continua',
    descripcion:
      'Curso práctico sobre normas, ética, toma de decisiones y gestión de conflictos en comunidades digitales.',
    modules: 3,
  },
  {
    id: 'utamv-curso-ia-creativa',
    nombre: 'Curso en IA Creativa y Automatización de Contenidos',
    tipo: 'Curso',
    area: 'IA Aplicada',
    horasTotales: 45,
    duracion: '6 semanas',
    modalidad: 'Online',
    nivel: 'Formación continua',
    descripcion:
      'Introducción aplicada al uso de IA generativa para producción de contenidos con criterio profesional.',
    modules: 3,
  },
  {
    id: 'utamv-curso-etica-digital',
    nombre: 'Curso en Ética, Cultura y Tecnología',
    tipo: 'Curso',
    area: 'Humanidades Digitales',
    horasTotales: 35,
    duracion: '5 semanas',
    modalidad: 'Online',
    nivel: 'Formación continua',
    descripcion:
      'Curso transversal UTAMV que aborda ética, valores y responsabilidad en el desarrollo tecnológico.',
    modules: 2,
  },

  // Certificaciones
  {
    id: 'utamv-cert-fundamentos-md',
    nombre: 'Certificado Profesional en Fundamentos de Marketing Digital',
    tipo: 'Certificado',
    area: 'Marketing Digital',
    horasTotales: 5,
    duracion: '1 semana',
    modalidad: 'Online',
    nivel: 'Introductorio',
    descripcion:
      'Introducción estructurada al ecosistema digital. Ideal para profesionales que inician su transición al marketing digital.',
    modules: 1,
  },
  {
    id: 'utamv-cert-ia-marketing',
    nombre: 'Certificado en IA Aplicada al Marketing',
    tipo: 'Certificado',
    area: 'IA Aplicada',
    horasTotales: 8,
    duracion: '2 semanas',
    modalidad: 'Online',
    nivel: 'Intermedio',
    descripcion:
      'Certificado especializado en uso de IA generativa, prompting estratégico y automatización de procesos de marketing.',
    modules: 1,
  },
];

// -----------------------------
// 2) Productos/planes (UI “elite & accesibles”)
// -----------------------------

interface ProductProgram {
  id: string;
  type: 'MASTER' | 'DIPLOMADO' | 'CURSO' | 'DOCTORADO' | 'CERT';
  title: string;
  hours: number;
  modulesCount: number;
  lessonsCount: number;
  price: number;
  description: string;
  features: string[];
  paymentPlans: string[];
}

const PRODUCT_PROGRAMS: ProductProgram[] = [
  {
    id: 'pp-master-cm-nextgen',
    type: 'MASTER',
    title: 'Maestría en Community Management NextGen 2.0',
    hours: 240,
    modulesCount: 8,
    lessonsCount: 80,
    price: 2450,
    description:
      'Máster profesional completo para Community Managers que lideran comunidades de producto, con enfoque en datos, reputación, IA y ecosistemas 2.0/3.0.',
    features: [
      '8 módulos + proyecto final TAMV',
      'Activos descargables por módulo',
      'Mentorías grupales síncronas',
      'Portafolio OBE y certificación UTAMV',
    ],
    paymentPlans: ['Pago único con 20% de beca por pronto pago', '12 mensualidades sin interés social', 'Planes especiales según Índice de Equidad UTAMV'],
  },
  {
    id: 'pp-master-marketing-2026',
    type: 'MASTER',
    title: 'Máster Profesional en Marketing Digital 2026',
    hours: 200,
    modulesCount: 10,
    lessonsCount: 90,
    price: 2200,
    description:
      'Ruta completa en marketing digital con énfasis en estrategia, performance e IA aplicada a campañas omnicanal.',
    features: [
      '10 módulos secuenciales OBE',
      'Plan maestro de marketing como proyecto final',
      'Casos reales y simuladores',
      'Acceso a laboratorios de IA para marketing',
    ],
    paymentPlans: ['Pago único', '6 mensualidades', 'Plan empresa / equipos corporativos'],
  },
  {
    id: 'pp-diplomado-ecosistemas',
    type: 'DIPLOMADO',
    title: 'Diplomado en Diseño de Ecosistemas Digitales',
    hours: 140,
    modulesCount: 5,
    lessonsCount: 40,
    price: 680,
    description:
      'Diseño de plataformas, comunidades y productos interconectados con enfoque en arquitectura de ecosistemas.',
    features: [
      'Proyecto integrador de ecosistema',
      'Plantillas de mapas de sistemas',
      'Enfoque estratégico y técnico',
      'Feedback experto en cada módulo',
    ],
    paymentPlans: ['Pago único', '3 mensualidades sin interés social'],
  },
];

// -----------------------------
// 3) Plan de estudios Máster CM NextGen
// -----------------------------

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

const MASTER_CM_MODULES: MasterModule[] = [
  {
    id: 1,
    n: '01',
    title: 'Fundamentos del Community Manager',
    subtitle: 'Módulo 1 — Rol, funciones y día a día',
    tag: 'Introductorio',
    duration: '10 horas',
    format: 'Texto · Audio · Video · IA',
    description:
      'Qué es un Community Manager, sus funciones diarias y su encaje estratégico en equipos de marketing y producto.',
    objectives: [
      'Comprender el rol del Community Manager en organizaciones y proyectos digitales.',
      'Identificar tareas diarias operativas y estratégicas del CM.',
      'Conocer el glosario básico de social media y community management.',
    ],
    outline: [
      'Definición de Community Manager y diferencias con otros roles.',
      'Tipos de Community Manager según industria y modelo de negocio.',
      'Tareas diarias: publicación, moderación, escucha social y reporting básico.',
      'Glosario digital esencial para trabajar con equipos multidisciplinares.',
    ],
    assets: [
      'Guía rápida de rol y responsabilidades CM (PDF).',
      'Checklist de tareas diarias/semanales de un CM.',
      'Glosario digital UTAMV para social media y comunidad.',
    ],
  },
  {
    id: 2,
    n: '02',
    title: 'Marketing & Comunicación 2.0',
    subtitle: 'Módulo 2 — Ecosistema Digital y Reputación',
    tag: 'Ecosistema',
    duration: '20 horas',
    format: 'Texto · Video · Casos · IA',
    description:
      'Web 2.0, prosumidores, social media y reputación online como base para diseñar comunidades con propósito.',
    objectives: [
      'Comprender la Web 2.0, el papel del prosumidor y el impacto en las marcas.',
      'Analizar la reputación online y los riesgos en entornos sociales.',
      'Conectar eCRM, long tail, mobile y marketing viral con estrategias de comunidad.',
    ],
    outline: [
      'Web 2.0 y prosumidores 2.0: usuarios como creadores de contenido.',
      'Social Media y Comunicación 2.0: canales, formatos y dinámicas.',
      'Marca 2.0 y reputación online: casos positivos y de crisis.',
      'Blogosfera, long tail, ecommerce 2.0 y eCRM.',
      'Cloud computing, crowdsourcing y crowdfunding.',
      'Innovación: mundos virtuales, mundos espejo, lifelogging e IA.',
    ],
    assets: [
      'Mapa del ecosistema digital y social media 2026.',
      'Plantilla de análisis de reputación online.',
      'Casos prácticos comentados de crisis y oportunidades 2.0.',
    ],
  },
  {
    id: 3,
    n: '03',
    title: 'Uso Profesional de Redes Sociales',
    subtitle: 'Módulo 3 — Plataformas, herramientas y eventos 2.0',
    tag: 'Operativo',
    duration: '25 horas',
    format: 'Texto · Video · Plantillas',
    description:
      'Gestión profesional de redes sociales, social listening, eventos 2.0 y fidelización de comunidades.',
    objectives: [
      'Dominar el uso profesional de las principales redes sociales.',
      'Configurar workflows de publicación, respuesta y escucha social.',
      'Gestionar eventos 2.0 y estrategias de fidelización en redes.',
    ],
    outline: [
      'Plataformas clave: Facebook, Instagram, X, LinkedIn, TikTok, YouTube.',
      'Ecosistema de apps y entorno multidispositivo.',
      'Métricas y ROI en redes sociales (nivel intermedio).',
      'Herramientas de gestión y SMO: planificación y monitorización.',
      'Creación de contenidos para la comunidad: formatos y tono.',
      'Gestión de contenidos en un evento 2.0.',
      'Aspectos jurídicos básicos y casos prácticos en redes.',
      'Fidelización en redes sociales e internet.',
    ],
    assets: [
      'Calendario editorial UTAMV (Notion/Sheets).',
      'Template de guía de estilo por red social.',
      'Checklist legal básica para gestión de comunidades.',
    ],
  },
  {
    id: 4,
    n: '04',
    title: 'Plan de Marketing Digital y Social Media Plan',
    subtitle: 'Módulo 4 — Diseño Estratégico',
    tag: 'Estrategia',
    duration: '20 horas',
    format: 'Texto · Plantillas · IA',
    description:
      'Diseño de un Plan de Marketing Digital y un Social Media Plan completo centrado en comunidad y producto tech.',
    objectives: [
      'Diseñar un Plan de Marketing Digital alineado con objetivos de negocio.',
      'Construir un Social Media Plan integrando contenidos, medios y comunidad.',
      'Aterrizar propuestas tácticas en un roadmap accionable.',
    ],
    outline: [
      'Componentes de un Plan de Marketing Digital.',
      'Definición de objetivos SMART y KPIs clave.',
      'Segmentación y propuesta de valor para comunidades.',
      'Social Media Plan: canales, contenidos, roles y procesos.',
      'Resultados y seguimiento de un Plan de Marketing Digital.',
    ],
    assets: [
      'Plantilla de Plan de Marketing Digital UTAMV.',
      'Plantilla de Social Media Plan centrado en comunidad.',
      'Ejemplo de plan completo aplicado a un caso real.',
    ],
  },
  {
    id: 5,
    n: '05',
    title: 'Métricas, Reportes y ROI',
    subtitle: 'Módulo 5 — Data para Community Managers',
    tag: 'Data',
    duration: '15 horas',
    format: 'Texto · Video · Dashboards',
    description:
      'KPIs cualitativos y cuantitativos, cuadros de mando e informes ejecutivos para conectar comunidad con negocio.',
    objectives: [
      'Definir KPIs accionables para comunidad y social media.',
      'Construir dashboards operativos y ejecutivos.',
      'Realizar reportes que conecten comunidad con resultados de negocio.',
    ],
    outline: [
      'Métricas básicas y avanzadas en redes y comunidad.',
      'Reportes cualitativos vs. cuantitativos.',
      'Dashboards: estructura y buenas prácticas.',
      'Introducción al ROI aplicado a actividades de comunidad.',
    ],
    assets: [
      'Cuadro de mando UTAMV para Community Manager.',
      'Template de reporte mensual de comunidad.',
      'Guía de interpretación de métricas críticas.',
    ],
  },
  {
    id: 6,
    n: '06',
    title: 'IA y Automatización para Community Managers',
    subtitle: 'Módulo 6 — NextGen Operations',
    tag: 'IA Avanzada',
    duration: '25 horas',
    format: 'Texto · Talleres · IA',
    description:
      'IA generativa, automatización de tareas, prompts estratégicos y principios éticos UTAMV aplicados al trabajo diario del CM.',
    objectives: [
      'Aplicar IA generativa en contenido, investigación y soporte a la comunidad.',
      'Automatizar tareas repetitivas y flujos de trabajo clave.',
      'Operar bajo los Principios Inmutables UTAMV para uso ético de IA.',
    ],
    outline: [
      'Panorama IA en community management y marketing digital.',
      'Prompting estratégico para copy, creatividad y análisis.',
      'Automatización de flujos: publicaciones, respuestas y alertas.',
      'Principios éticos UTAMV: veracidad, no simulación, integridad.',
      'Riesgos, sesgos y límites del uso de IA en comunidades.',
    ],
    assets: [
      'Playbook de prompts UTAMV para Community Managers.',
      'Plantilla de flujos automatizados (diagramas).',
      'Checklist de riesgos y buenas prácticas con IA.',
    ],
  },
  {
    id: 7,
    n: '07',
    title: 'Comunidades en Web, App y Metaverso',
    subtitle: 'Módulo 7 — Ecosistemas 2.0/3.0',
    tag: 'Avanzado',
    duration: '20 horas',
    format: 'Texto · Casos · Mapas',
    description:
      'Diseño y gestión de comunidades en sitios web, aplicaciones móviles y entornos inmersivos vinculados a productos digitales como TAMV.',
    objectives: [
      'Diseñar comunidades que trascienden redes sociales tradicionales.',
      'Entender mundos virtuales, mundos espejo y experiencias inmersivas.',
      'Integrar comunidad, producto y datos en ecosistemas 2.0/3.0.',
    ],
    outline: [
      'Tipos de comunidades: abiertas, cerradas, híbridas.',
      'Mundos virtuales, mundos espejo y lifelogging.',
      'Casos de comunidades en apps, plataformas y metaverso.',
      'Seguridad, gobernanza y normas en comunidades complejas.',
    ],
    assets: [
      'Mapa de comunidad para productos digitales (canvas).',
      'Guía de diseño de espacios de comunidad en plataformas y metaversos.',
      'Ejemplos de políticas y normas de comunidad (playbook).',
    ],
  },
  {
    id: 8,
    n: 'PF',
    title: 'Plan Maestro de Comunidad y Proyecto Final TAMV',
    subtitle: 'Módulo Final — Capstone UTAMV',
    tag: 'Proyecto OBE',
    duration: '15 horas + proyecto',
    format: 'Portafolio · Rúbrica · Defensa',
    description:
      'Integración de todos los módulos en un Plan Maestro de Comunidad. Proyecto final aplicado a un producto o módulo real del ecosistema TAMV.',
    objectives: [
      'Estructurar un Plan Maestro de Comunidad completo.',
      'Diseñar un roadmap operativo con métricas y recursos.',
      'Defender el proyecto ante un comité evaluador UTAMV.',
    ],
    outline: [
      'Estructura del Plan Maestro de Comunidad.',
      'Integración de canales, procesos y métricas.',
      'Roadmap trimestral con hitos y OKRs de comunidad.',
      'Presentación ejecutiva y defensa del proyecto final.',
    ],
    assets: [
      'Plantilla del Plan Maestro de Comunidad UTAMV.',
      'Rúbrica de evaluación del proyecto final (OBE).',
      'Repositorio de recursos de apoyo para el capstone.',
    ],
  },
];

// -----------------------------
// 4) Estilos auxiliares
// -----------------------------

const typeColors: Record<ProgramType, string> = {
  Maestría:
    'border-[hsl(var(--platinum)/0.45)] bg-[hsl(var(--platinum)/0.12)] text-platinum',
  Licenciatura:
    'border-[hsl(215_40%_40%/0.5)] bg-[hsl(215_40%_40%/0.1)] text-[hsl(215_35%_80%)]',
  Diplomado:
    'border-[hsl(200_40%_40%/0.5)] bg-[hsl(200_40%_40%/0.1)] text-[hsl(200_35%_80%)]',
  Curso:
    'border-[hsl(150_40%_40%/0.5)] bg-[hsl(150_40%_40%/0.1)] text-[hsl(150_35%_80%)]',
  Doctorado:
    'border-[hsl(280_40%_40%/0.5)] bg-[hsl(280_40%_40%/0.1)] text-[hsl(280_35%_80%)]',
  'Máster Profesional':
    'border-[hsl(var(--gold)/0.55)] bg-[hsl(var(--gold)/0.12)] text-gold',
  Certificado:
    'border-[hsl(40_40%_50%/0.5)] bg-[hsl(40_40%_50%/0.08)] text-[hsl(40_40%_80%)]',
};

const tagColors: Record<string, string> = {
  Introductorio:
    'border-[hsl(215_35%_35%/0.5)] bg-[hsl(215_35%_35%/0.08)] text-[hsl(215_30%_65%)]',
  Ecosistema:
    'border-[hsl(220_35%_40%/0.5)] bg-[hsl(220_35%_40%/0.08)] text-[hsl(220_30%_70%)]',
  Operativo:
    'border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim',
  Estrategia:
    'border-[hsl(var(--platinum)/0.3)] bg-[hsl(var(--platinum)/0.06)] text-platinum-dim',
  Data:
    'border-[hsl(200_35%_40%/0.5)] bg-[hsl(200_35%_40%/0.08)] text-[hsl(200_30%_70%)]',
  'IA Avanzada':
    'border-[hsl(var(--platinum)/0.35)] bg-[hsl(var(--platinum)/0.08)] text-platinum',
  Avanzado:
    'border-[hsl(240_25%_40%/0.5)] bg-[hsl(240_25%_40%/0.08)] text-[hsl(240_25%_70%)]',
  'Proyecto OBE':
    'border-[hsl(var(--platinum)/0.4)] bg-[hsl(var(--platinum)/0.1)] text-platinum',
};

// -----------------------------
// 5) Página principal
// -----------------------------

const ProgramasPage: React.FC = () => {
  const posgrado = CATALOG_PROGRAMS.filter((p) =>
    ['Maestría', 'Doctorado'].includes(p.tipo)
  );
  const licenciaturas = CATALOG_PROGRAMS.filter((p) => p.tipo === 'Licenciatura');
  const diplomados = CATALOG_PROGRAMS.filter((p) => p.tipo === 'Diplomado');
  const cursos = CATALOG_PROGRAMS.filter((p) => p.tipo === 'Curso');
  const certificados = CATALOG_PROGRAMS.filter((p) => p.tipo === 'Certificado');
  const mastersProfesionales = CATALOG_PROGRAMS.filter(
    (p) => p.tipo === 'Máster Profesional'
  );

  return (
    <div className="min-h-screen bg-navy-deep text-white">
      <UTAMVHeader />

      <main className="pt-32 pb-24 relative">
        {/* Hero + discurso precios/elite */}
        <section className="relative container mx-auto px-8 max-w-7xl mb-24 overflow-hidden py-12">
          <EliteBackground variant="platinum" />
          <header className="max-w-4xl mb-20 text-left relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-platinum/5 border border-platinum/10 rounded-full mb-8">
              <Landmark className="w-4 h-4 text-platinum" />
              <span className="text-platinum font-black text-[10px] uppercase tracking-[0.5em] block">
                Syllabus Unificado UTAMV 2026
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none mb-10">
              Grados Académicos <br />
              <span className="text-gradient">Elite & Accesibles</span>
            </h1>
            <p className="text-platinum-dim text-2xl font-medium leading-relaxed max-w-3xl">
              Desde certificaciones de 5 horas hasta trayectorias de más de 700 horas combinando
              licenciatura, máster y doctorado profesional. Una estructura diseñada para la excelencia
              técnica con una política de precios inclusiva para toda Latinoamérica.
            </p>
          </header>

          {/* Cards de productos/planes comerciales */}
          <div className="grid lg:grid-cols-3 gap-12">
            {PRODUCT_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="glass-card p-12 rounded-[60px] border-platinum/10 flex flex-col justify-between group hover:border-platinum/40 transition-all relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent"
              >
                {prog.type === 'MASTER' && (
                  <div className="absolute top-8 right-8 px-5 py-2 bg-platinum text-navy rounded-full text-[10px] font-black uppercase tracking-widest shadow-platinum-glow">
                    Postgrado Elite
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-5 mb-12">
                    <div className="w-20 h-20 bg-platinum/5 rounded-3xl flex items-center justify-center border border-platinum/10 group-hover:bg-platinum group-hover:text-navy transition-all duration-700 shadow-xl">
                      {prog.type === 'MASTER' ? (
                        <Award className="w-10 h-10" />
                      ) : prog.type === 'DIPLOMADO' ? (
                        <Shield className="w-10 h-10" />
                      ) : (
                        <BookOpen className="w-10 h-10" />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-platinum/40 uppercase tracking-[0.3em] mb-1">
                        {prog.type}
                      </div>
                      <div className="text-3xl font-black text-white">
                        {prog.hours}{' '}
                        <span className="text-platinum/20 text-xl font-medium">Horas</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-4xl font-display font-black text-white mb-8 uppercase tracking-tighter leading-[1.1]">
                    {prog.title}
                  </h3>

                  {/* Equivalence Box */}
                  <div className="bg-white/5 border border-white/5 p-6 rounded-[30px] mb-10 flex justify-between items-center">
                    <div className="text-center flex-1">
                      <div className="text-2xl font-black text-white">{prog.modulesCount}</div>
                      <div className="text-[9px] font-black text-platinum/30 uppercase tracking-widest">
                        Módulos
                      </div>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="text-center flex-1">
                      <div className="text-2xl font-black text-white">{prog.lessonsCount}</div>
                      <div className="text-[9px] font-black text-platinum/30 uppercase tracking-widest">
                        Lecciones
                      </div>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10" />
                    <div className="text-center flex-1">
                      <div className="text-2xl font-black text-white">OBE</div>
                      <div className="text-[9px] font-black text-platinum/30 uppercase tracking-widest">
                        Acreditación
                      </div>
                    </div>
                  </div>

                  <p className="text-platinum-dim mb-12 text-lg leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {prog.description}
                  </p>

                  <div className="space-y-5 mb-16">
                    {prog.features.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 text-sm text-platinum-dim font-bold"
                      >
                        <div className="w-5 h-5 bg-platinum/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-platinum" />
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="pt-10 border-t border-platinum/5 mb-12">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-5xl font-display font-black text-white">
                        ${prog.price}
                      </span>
                      <span className="text-xl text-platinum/30 uppercase tracking-widest font-bold">
                        USD
                      </span>
                    </div>
                    <div className="space-y-3">
                      {prog.paymentPlans.map((p, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-[11px] font-black text-platinum/50 uppercase tracking-widest"
                        >
                          <CreditCard className="w-3.5 h-3.5 opacity-50" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/admisiones"
                    className="btn-platinum w-full py-6 rounded-[30px] font-black text-sm uppercase tracking-[0.3em] text-center block shadow-platinum-glow hover:scale-[1.02] transition-all"
                  >
                    Solicitar Admisión
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/*  Catálogo académico estructurado por niveles */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="badge-academic mb-4 inline-block">
              Oferta Académica Completa
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-platinum mb-3">
              Programas Académicos UTAMV
            </h2>
            <p className="font-body text-platinum-dim max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Oferta académica estructurada por niveles de formación, diseñada bajo metodología OBE y
              alineada al Modelo Educativo NextGen 2026. Desde certificaciones hasta posgrado y
              trayectorias integrales.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-16">
            {[
              { label: 'Posgrado', items: posgrado },
              { label: 'Másteres Profesionales', items: mastersProfesionales },
              { label: 'Licenciaturas', items: licenciaturas },
              { label: 'Diplomados', items: diplomados },
              { label: 'Cursos de Formación Continua', items: cursos },
              { label: 'Certificaciones', items: certificados },
            ]
              .filter((g) => g.items.length > 0)
              .map((group, gi) => (
                <div key={gi}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="divider-gold flex-1" />
                    <h3 className="font-ui text-xs font-bold tracking-[0.25em] uppercase text-gold px-4">
                      {group.label}
                    </h3>
                    <div className="divider-gold flex-1" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {group.items.map((prog) => (
                      <div
                        key={prog.id}
                        className={`group relative p-7 rounded-2xl transition-all duration-300 ${
                          prog.destacado
                            ? 'bg-gradient-to-br from-[hsl(var(--gold)/0.12)] to-[hsl(var(--gold)/0.04)] border border-[hsl(var(--gold)/0.3)] shadow-gold'
                            : 'bg-card-premium border border-[hsl(var(--gold)/0.08)] hover:border-[hsl(var(--gold)/0.2)]'
                        }`}
                      >
                        {prog.destacado && (
                          <div className="absolute -top-3 left-6 badge-academic bg-[hsl(var(--background))] text-[10px]">
                            ★ Programa Insignia UTAMV
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-3 mb-4">
                          <span className="font-ui text-xs font-medium text-gold/70 uppercase tracking-wide">
                            {prog.tipo}
                          </span>
                          <span className="font-ui text-[10px] font-semibold tracking-wider text-muted-foreground uppercase border border-muted rounded-full px-2.5 py-1">
                            {prog.nivel}
                          </span>
                        </div>

                        <h4 className="font-display text-xl md:text-2xl font-bold text-platinum mb-3 leading-tight group-hover:text-gold-light transition-colors">
                          {prog.nombre}
                        </h4>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                          {prog.descripcion}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-5">
                          <div className="flex items-center gap-1.5 text-platinum-dim">
                            <Clock size={13} className="text-gold/60" />
                            <span className="font-ui text-xs">{prog.horasTotales} horas</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-platinum-dim">
                            <TrendingUp size={13} className="text-gold/60" />
                            <span className="font-ui text-xs">{prog.duracion}</span>
                          </div>
                          {prog.modules && (
                            <div className="flex items-center gap-1.5 text-platinum-dim">
                              <BookOpenCheck size={13} className="text-gold/60" />
                              <span className="font-ui text-xs">
                                {prog.modules} módulos
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--gold)/0.1)]">
                          <Link
                            to="/admisiones"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-ui text-sm font-semibold transition-all ${
                              prog.destacado
                                ? 'text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold hover:opacity-90'
                                : 'text-gold border border-[hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--gold)/0.08)]'
                            }`}
                          >
                            Solicitar Admisión <ArrowRight size={14} />
                          </Link>
                          {prog.id === 'utamv-maestria-cmn' ? (
                            <a
                              href="#plan-master-cm"
                              className="font-ui text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 group/l"
                            >
                              Ver plan de módulos
                              <ArrowRight
                                size={12}
                                className="group-hover/l:translate-x-0.5 transition-transform"
                              />
                            </a>
                          ) : (
                            <Link
                              to={`/programas/${prog.id}`}
                              className="font-ui text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 group/l"
                            >
                              Ver ficha académica
                              <ArrowRight
                                size={12}
                                className="group-hover/l:translate-x-0.5 transition-transform"
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Plan de estudios Máster CM NextGen */}
        <section id="plan-master-cm" className="container mx-auto px-4 mt-10">
          <div className="max-w-5xl mx-auto mb-8 text-center md:text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-2">
              <Layers className="w-3 h-3" />
              Plan de Estudios · Maestría Community Management NextGen 2.0
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-black text-platinum mb-3">
              Módulos Académicos del Máster
            </h3>
            <p className="font-body text-sm md:text-base text-platinum-dim max-w-3xl leading-relaxed">
              Ocho módulos académicos más un proyecto final (capstone) bajo metodología OBE, integrando
              fundamentos, marketing 2.0, operación de redes, estrategia, data, IA aplicada y
              ecosistemas 2.0/3.0 vinculados al entorno TAMV.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-platinum/80 uppercase tracking-widest bg-platinum/10 px-3 py-1.5 rounded-full border border-platinum/20">
                <BookOpen className="w-3 h-3" /> Texto
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-platinum/80 uppercase tracking-widest bg-platinum/10 px-3 py-1.5 rounded-full border border-platinum/20">
                <Mic className="w-3 h-3" /> Audio
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-platinum/80 uppercase tracking-widest bg-platinum/10 px-3 py-1.5 rounded-full border border-platinum/20">
                <PlayCircle className="w-3 h-3" /> Video
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-platinum/80 uppercase tracking-widest bg-platinum/10 px-3 py-1.5 rounded-full border border-platinum/20">
                <Cpu className="w-3 h-3" /> IA Integrada
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-5">
            {MASTER_CM_MODULES.map((mod) => (
              <article
                key={mod.id}
                className="group p-6 md:p-8 rounded-2xl bg-slate-950/80 border border-slate-700/70 hover:border-slate-400/80 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="font-display text-5xl font-black text-slate-600/40 group-hover:text-slate-300/60 transition-colors leading-none w-14 text-center">
                      {mod.n}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`font-ui text-[9px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border ${
                          tagColors[mod.tag] ||
                          'border-slate-500/60 bg-slate-800/60 text-slate-200'
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
                    <h4 className="font-display text-xl md:text-2xl font-bold text-slate-50 mb-2 group-hover:text-slate-100 transition-colors leading-snug">
                      {mod.title}
                    </h4>
                    <p className="font-body text-sm text-slate-300 leading-relaxed mb-5">
                      {mod.description}
                    </p>

                    <div className="grid md:grid-cols-3 gap-5">
                      <div>
                        <div className="font-ui text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2.5">
                          Objetivos
                        </div>
                        <ul className="space-y-1.5">
                          {mod.objectives.map((obj, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <CheckCircle2
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

        {/* Sección de equidad social */}
        <section className="container mx-auto px-4 mt-24">
          <div className="mt-16 p-24 glass-card rounded-[100px] border-platinum/10 bg-[radial-gradient(circle_at_top_right,_rgba(229,228,226,0.1),_transparent)] relative overflow-hidden">
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-platinum/5 rounded-full blur-[120px]" />
            <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
              <div className="text-left space-y-10">
                <div className="w-20 h-20 bg-platinum/10 rounded-full flex items-center justify-center">
                  <HeartHandshake className="w-10 h-10 text-platinum" />
                </div>
                <h2 className="text-5xl font-display font-black text-white tracking-tighter leading-tight">
                  Misión de Equidad: UTAMV Para Todos
                </h2>
                <p className="text-platinum-dim text-xl leading-relaxed font-medium">
                  La excelencia no debe ser un privilegio de pocos. Nuestro fondo de becas y planes de pago
                  solidarios permiten que talentos de todos los estratos socioeconómicos accedan a la misma
                  infraestructura de élite que los directivos de las Big Tech.
                </p>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="space-y-2">
                    <div className="text-3xl font-black text-white">80%</div>
                    <div className="text-[10px] font-black text-platinum/40 uppercase tracking-widest">
                      Becas Otorgadas
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-black text-white">12+</div>
                    <div className="text-[10px] font-black text-platinum/40 uppercase tracking-widest">
                      Países Impactados
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-black text-white">0%</div>
                    <div className="text-[10px] font-black text-platinum/40 uppercase tracking-widest">
                      Interés Social
                    </div>
                  </div>
                </div>
                <Link
                  to="/admisiones"
                  className="inline-block text-platinum font-black text-sm uppercase tracking-[0.4em] underline decoration-platinum/30 hover:decoration-platinum transition-all"
                >
                  Postular al Fondo de Beca Social →
                </Link>
              </div>
              <div className="p-12 bg-white/5 rounded-[60px] border border-white/10">
                <h4 className="text-xl font-black text-white mb-8 uppercase tracking-widest text-center">
                  Simulador de Inversión Solidaria
                </h4>
                <div className="space-y-6">
                  {[
                    { label: 'Ingreso mensual bajo', beca: 'Beca Impacto (90%)', mensual: '$25 USD' },
                    { label: 'Ingreso mensual medio', beca: 'Beca Talento (50%)', mensual: '$120 USD' },
                    { label: 'Perfil Ejecutivo', beca: 'Pago Estándar', mensual: '$245 USD' },
                  ].map((tier, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-3xl bg-navy-deep/50 border border-white/5 flex justify-between items-center group hover:bg-white/5 transition-all"
                    >
                      <div>
                        <div className="text-[10px] font-black text-platinum/30 uppercase tracking-widest mb-1">
                          {tier.label}
                        </div>
                        <div className="text-lg font-bold text-white">{tier.beca}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-platinum">{tier.mensual}</div>
                        <div className="text-[9px] font-bold text-platinum/30 uppercase tracking-widest">
                          Mensualidad
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-platinum/20 text-center mt-8 uppercase font-bold tracking-widest">
                  Calculado según el Índice de Equidad UTAMV 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nota legal */}
        <section className="container mx-auto px-4 mt-16">
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[hsl(var(--gold)/0.04)] border border-[hsl(var(--gold)/0.1)]">
            <p className="font-ui text-xs text-muted-foreground leading-relaxed text-center">
              <span className="text-gold font-semibold">
                ⚠ Aviso Legal Institucional:
              </span>{' '}
              Los programas ofrecidos por UTAMV tienen carácter institucional privado. Los estudios
              no cuentan con reconocimiento de validez oficial ante la SEP u otra autoridad educativa
              competente, salvo resolución expresa y vigente para un programa específico. UTAMV se
              encuentra en proceso de preparación y solicitud de RVOE.
            </p>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default ProgramasPage;
