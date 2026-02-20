// UTAMV Elite Masterclass — 7 Cursos Completos con contenido de última generación
// Basado en el Documento Maestro UTAMV 2026 y metodología OBE NextGen

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text' | 'quiz' | 'exercise' | 'live';
  duration: number; // minutes
  isFreePreview?: boolean;
  content?: string;
  resources?: { name: string; url: string; type: 'pdf' | 'template' | 'tool' | 'guide' }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  learningObjectives: string[];
  isFreePreview?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
  passingScore: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'Certificación' | 'Diplomado' | 'Máster' | 'Licenciatura' | 'Maestría';
  category: string;
  hours: number;
  priceMXN: number;
  priceUSD: number;
  stripePriceId: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  thumbnail: string;
  isFeatured: boolean;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: Module[];
  quizzes: Quiz[];
  obeFramework: {
    competencies: string[];
    evidences: string[];
    rubrics: string[];
  };
}

export const COURSES: Course[] = [
  // ──────────────────────────────────────────────────────
  // CURSO 1 — Marketing Digital 360° (30 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c1',
    slug: 'marketing-digital-360',
    title: 'Marketing Digital 360°',
    subtitle: 'Fundamentos y Estrategia para el Ecosistema LATAM',
    description: 'Domina los fundamentos del marketing digital con metodología OBE. Aprende SEO, SEM, Social Media, Email Marketing y analítica desde cero con casos reales de LATAM.',
    level: 'Certificación',
    category: 'Marketing Digital',
    hours: 30,
    priceMXN: 4990,
    priceUSD: 249,
    stripePriceId: 'price_marketing_360',
    instructorName: 'Renata Jazmín Flores',
    instructorTitle: 'Directora de Marketing Digital — UTAMV',
    instructorBio: 'Especialista en estrategia digital con 12 años de experiencia en LATAM. Certificada en Google, Meta y HubSpot.',
    thumbnail: '/src/assets/module-1.jpg',
    isFeatured: true,
    learningOutcomes: [
      'Diseñar estrategias de marketing digital integrales para mercados latinoamericanos',
      'Gestionar campañas en Google Ads, Meta Ads y LinkedIn con ROI medible',
      'Implementar SEO técnico y de contenidos con herramientas avanzadas',
      'Analizar métricas con GA4 y construir dashboards ejecutivos',
      'Crear embudos de conversión optimizados para e-commerce LATAM',
    ],
    prerequisites: ['Conocimientos básicos de internet y redes sociales', 'Acceso a una computadora con internet'],
    obeFramework: {
      competencies: ['Estrategia digital', 'Gestión de campañas', 'Analítica web', 'Contenido digital'],
      evidences: ['Plan de marketing digital para empresa real', 'Campaña activa en Google/Meta Ads', 'Dashboard GA4 con KPIs accionables'],
      rubrics: ['Rúbrica OBE Nivel 1-4 por competencia', 'Portafolio digital verificable', 'Evaluación entre pares certificada'],
    },
    modules: [
      {
        id: 'm1-1',
        title: 'Ecosistema Digital y Comportamiento del Consumidor',
        description: 'Comprende el entorno digital latinoamericano y la psicología del comprador online.',
        isFreePreview: true,
        learningObjectives: [
          'Mapear el ecosistema digital LATAM 2026',
          'Aplicar el Customer Journey en entornos digitales',
          'Identificar oportunidades de mercado digital en México, Colombia y Argentina',
        ],
        lessons: [
          { id: 'l1-1-1', title: 'Bienvenida: La Revolución Digital en LATAM 2026', type: 'video', duration: 18, isFreePreview: true, resources: [{ name: 'Mapa Mental Ecosistema Digital', url: '#', type: 'pdf' }] },
          { id: 'l1-1-2', title: 'Comportamiento del Consumidor Digital: Neurociencia aplicada', type: 'video', duration: 25, isFreePreview: true },
          { id: 'l1-1-3', title: 'Customer Journey Mapping: Metodología y herramientas', type: 'text', duration: 20 },
          { id: 'l1-1-4', title: 'Podcast: Tendencias de Marketing 2026 con expertos LATAM', type: 'audio', duration: 35, resources: [{ name: 'Transcripción completa', url: '#', type: 'guide' }] },
          { id: 'l1-1-5', title: 'Ejercicio: Mapea el Customer Journey de tu negocio', type: 'exercise', duration: 45 },
          { id: 'l1-1-6', title: 'Quiz Módulo 1', type: 'quiz', duration: 15 },
        ],
      },
      {
        id: 'm1-2',
        title: 'SEO y Posicionamiento Orgánico Avanzado',
        description: 'Domina el SEO técnico, de contenidos y local para mercados hispanohablantes.',
        learningObjectives: [
          'Realizar auditorías SEO técnicas completas',
          'Desarrollar estrategias de contenido con intención de búsqueda',
          'Optimizar para búsquedas locales y de voz en LATAM',
        ],
        lessons: [
          { id: 'l1-2-1', title: 'SEO Técnico: Auditoría completa con Screaming Frog y Ahrefs', type: 'video', duration: 40 },
          { id: 'l1-2-2', title: 'Keyword Research Avanzado: Intención de búsqueda y LATAM', type: 'video', duration: 35 },
          { id: 'l1-2-3', title: 'Core Web Vitals y Page Experience: Guía técnica 2026', type: 'text', duration: 25, resources: [{ name: 'Checklist CWV', url: '#', type: 'template' }] },
          { id: 'l1-2-4', title: 'SEO Local y Google Business: Estrategia México', type: 'video', duration: 30 },
          { id: 'l1-2-5', title: 'Taller: Auditoría SEO de tu sitio web en vivo', type: 'exercise', duration: 60 },
        ],
      },
      {
        id: 'm1-3',
        title: 'Publicidad Digital: Google y Meta Ads',
        description: 'Domina las plataformas de publicidad de pago más importantes del mundo.',
        learningObjectives: ['Crear campañas rentables en Google Ads', 'Optimizar Meta Ads con segmentación avanzada', 'Medir ROAS y optimizar en tiempo real'],
        lessons: [
          { id: 'l1-3-1', title: 'Google Ads: Estructura de campañas de alta conversión', type: 'video', duration: 45 },
          { id: 'l1-3-2', title: 'Meta Ads 2026: Targeting, Creative y Algoritmo', type: 'video', duration: 40 },
          { id: 'l1-3-3', title: 'Remarketing y Lookalike Audiences: Estrategias avanzadas', type: 'video', duration: 30 },
          { id: 'l1-3-4', title: 'Proyecto: Campaña real con presupuesto de $500 MXN', type: 'exercise', duration: 90 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q1-1',
        title: 'Evaluación Final — Marketing Digital 360°',
        passingScore: 70,
        questions: [
          { id: 'qq1', question: '¿Cuál es el principal indicador de ROI en campañas de Google Ads?', options: ['CTR', 'ROAS', 'CPC', 'CPM'], correct: 1, explanation: 'El ROAS (Return on Ad Spend) mide directamente el retorno sobre la inversión publicitaria.' },
          { id: 'qq2', question: 'En el Customer Journey, ¿qué etapa ocurre después de la Consideración?', options: ['Awareness', 'Decisión', 'Retención', 'Advocacy'], correct: 1, explanation: 'La etapa de Decisión sigue a la Consideración en el funnel de conversión clásico.' },
          { id: 'qq3', question: '¿Qué herramienta de Google permite medir el comportamiento completo del usuario en sitios web?', options: ['Google Search Console', 'Google Analytics 4', 'Google Tag Manager', 'Google Optimize'], correct: 1, explanation: 'GA4 ofrece seguimiento del comportamiento del usuario con modelo de datos basado en eventos.' },
          { id: 'qq4', question: '¿Cuál es el porcentaje mínimo recomendado de Quality Score en Google Ads para optimizar costos?', options: ['5/10', '6/10', '7/10', '8/10'], correct: 2, explanation: 'Un Quality Score de 7/10 o superior indica relevancia alta y reduce el CPC.' },
          { id: 'qq5', question: '¿Qué significa el término "Core Web Vitals" en SEO técnico?', options: ['Palabras clave principales', 'Métricas de experiencia de página de Google', 'Velocidad de carga del servidor', 'Número de backlinks de calidad'], correct: 1, explanation: 'Core Web Vitals son métricas que Google utiliza para evaluar la experiencia de usuario: LCP, FID y CLS.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 2 — IA Aplicada al Marketing (50 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c2',
    slug: 'ia-aplicada-marketing',
    title: 'Inteligencia Artificial Aplicada al Marketing',
    subtitle: 'Automatización, Generative AI y Estrategia Data-Driven 2026',
    description: 'Domina las herramientas de IA más avanzadas del mercado: ChatGPT, Claude, Midjourney, HeyGen, ElevenLabs y más. Aprende a automatizar procesos de marketing y tomar decisiones basadas en datos con IA.',
    level: 'Diplomado',
    category: 'Inteligencia Artificial',
    hours: 50,
    priceMXN: 8990,
    priceUSD: 449,
    stripePriceId: 'price_ia_marketing',
    instructorName: 'Edwin Castillo Rueda',
    instructorTitle: 'Director de Tecnología e IA — UTAMV',
    instructorBio: 'PhD en Ciencias Computacionales. Especialista en IA aplicada a negocios con implementaciones en +50 empresas Fortune 500 LATAM.',
    thumbnail: '/src/assets/module-9.jpg',
    isFeatured: true,
    learningOutcomes: [
      'Implementar flujos de trabajo con IA generativa en marketing digital',
      'Crear estrategias de contenido asistidas por IA a escala',
      'Automatizar campañas con herramientas de IA para reducir costos 60%+',
      'Analizar datos masivos con IA para toma de decisiones estratégicas',
      'Construir agentes de IA personalizados para marketing y ventas',
    ],
    prerequisites: ['Marketing Digital 360° o conocimientos equivalentes', 'Acceso a ChatGPT Plus o API de OpenAI'],
    obeFramework: {
      competencies: ['Prompting estratégico', 'Automatización con IA', 'Analítica predictiva', 'Ética en IA aplicada'],
      evidences: ['Sistema de contenido con IA implementado', 'Dashboard predictivo con ML', 'Agente de IA para marketing funcional'],
      rubrics: ['Rúbrica Prompting Avanzado', 'Rúbrica Automatización de Procesos', 'Evaluación Ética IA (Principios UTAMV 2026)'],
    },
    modules: [
      {
        id: 'm2-1',
        title: 'Fundamentos de IA Generativa para Marketing',
        description: 'Comprende cómo funciona la IA generativa y cómo aplicarla al marketing.',
        isFreePreview: true,
        learningObjectives: ['Diferenciar LLMs y sus aplicaciones en marketing', 'Escribir prompts de nivel profesional', 'Implementar flujos de trabajo con IA'],
        lessons: [
          { id: 'l2-1-1', title: 'La Revolución de los LLMs: ChatGPT, Claude, Gemini y Llama', type: 'video', duration: 30, isFreePreview: true },
          { id: 'l2-1-2', title: 'Prompting Avanzado: De básico a estratégico', type: 'video', duration: 45, isFreePreview: true, resources: [{ name: '500 Prompts de Marketing', url: '#', type: 'template' }] },
          { id: 'l2-1-3', title: 'Audio: Principios Éticos de IA según UTAMV 2026', type: 'audio', duration: 20 },
          { id: 'l2-1-4', title: 'Taller: Tu primer flujo de trabajo con IA', type: 'exercise', duration: 60 },
        ],
      },
      {
        id: 'm2-2',
        title: 'Generación de Contenido con IA a Escala',
        description: 'Crea contenido profesional de alta calidad con herramientas de IA.',
        learningObjectives: ['Usar Midjourney v7 para creatividades de marca', 'Crear videos con HeyGen y Runway ML', 'Generar audio/voz con ElevenLabs'],
        lessons: [
          { id: 'l2-2-1', title: 'Midjourney v7: Creatividades para Social Media y Ads', type: 'video', duration: 50 },
          { id: 'l2-2-2', title: 'HeyGen: Avatares de IA para video marketing', type: 'video', duration: 40 },
          { id: 'l2-2-3', title: 'ElevenLabs: Voz sintética para podcasts y ads', type: 'video', duration: 35, resources: [{ name: 'Guía de voz para marca', url: '#', type: 'guide' }] },
          { id: 'l2-2-4', title: 'Suno AI: Música original para tus campañas', type: 'audio', duration: 25 },
          { id: 'l2-2-5', title: 'Proyecto: Campaña completa con 100% contenido IA', type: 'exercise', duration: 120 },
        ],
      },
      {
        id: 'm2-3',
        title: 'Automatización y Agentes de IA en Marketing',
        description: 'Construye sistemas de marketing automatizados con IA.',
        learningObjectives: ['Crear agentes de IA con Make.com y Zapier', 'Implementar chatbots inteligentes para ventas', 'Automatizar reportes con IA'],
        lessons: [
          { id: 'l2-3-1', title: 'Make.com Avanzado: Flujos de marketing automatizados', type: 'video', duration: 55 },
          { id: 'l2-3-2', title: 'Agentes de IA con LangChain para marketing', type: 'video', duration: 60 },
          { id: 'l2-3-3', title: 'Chatbots para ventas: WhatsApp Business + IA', type: 'video', duration: 45 },
          { id: 'l2-3-4', title: 'Proyecto Final: Agente de marketing autónomo', type: 'exercise', duration: 180 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q2-1',
        title: 'Evaluación: IA Aplicada al Marketing',
        passingScore: 75,
        questions: [
          { id: 'qq2-1', question: '¿Cuál es el Principio de Veracidad Académica en el uso de IA según UTAMV 2026?', options: ['La IA puede inventar información si es útil', 'La IA no inventará ni falseará información sin respaldo académico verificable', 'La IA debe ser siempre honesta con el cliente', 'La IA sustituye al criterio del marketing manager'], correct: 1, explanation: 'El Principio de Veracidad Académica (Art. IV-1 Documento Maestro UTAMV 2026) establece que la IA institucional no inventará información sin respaldo verificable.' },
          { id: 'qq2-2', question: '¿Qué herramienta de IA es más recomendada para crear avatares de video para marketing?', options: ['Midjourney', 'ElevenLabs', 'HeyGen', 'Runway ML'], correct: 2, explanation: 'HeyGen es la herramienta líder para crear avatares de IA que pueden presentar videos de marketing en múltiples idiomas.' },
          { id: 'qq2-3', question: '¿Cuál es la diferencia entre un LLM y un agente de IA?', options: ['Un LLM puede tomar acciones en el mundo real', 'Un agente de IA puede tomar acciones y usar herramientas de forma autónoma', 'No hay diferencia significativa', 'Un agente es más barato que un LLM'], correct: 1, explanation: 'Un agente de IA puede usar herramientas, acceder a bases de datos y ejecutar acciones de forma autónoma, a diferencia de un LLM que solo genera texto.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 3 — Analítica Digital y Business Intelligence (80 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c3',
    slug: 'analitica-digital-bi',
    title: 'Analítica Digital y Business Intelligence',
    subtitle: 'GA4, Power BI, Looker Studio y Decisiones Data-Driven',
    description: 'Conviértete en un analista digital elite. Domina GA4, Power BI, Looker Studio, SQL para marketing y analítica predictiva. Toma decisiones basadas en datos reales con metodología OBE.',
    level: 'Diplomado',
    category: 'Analítica y Datos',
    hours: 80,
    priceMXN: 12990,
    priceUSD: 649,
    stripePriceId: 'price_analitica_bi',
    instructorName: 'Dra. Sofía Mendoza Torres',
    instructorTitle: 'Head of Data Analytics — UTAMV',
    instructorBio: 'Doctora en Ciencia de Datos por el ITESM. Analista senior con certificaciones en Google Analytics, Power BI y AWS.',
    thumbnail: '/src/assets/analytics-dashboard.jpg',
    isFeatured: false,
    learningOutcomes: [
      'Implementar GA4 de forma avanzada con eventos personalizados y conversiones',
      'Construir dashboards ejecutivos en Power BI y Looker Studio',
      'Aplicar SQL para extracción y análisis de datos de marketing',
      'Desarrollar modelos de atribución multi-touch para ecommerce',
      'Crear reportes automatizados con Python y herramientas de BI',
    ],
    prerequisites: ['Conocimientos básicos de marketing digital', 'Acceso a Google Analytics 4'],
    obeFramework: {
      competencies: ['Implementación GA4', 'Visualización de datos', 'SQL para marketing', 'Analítica predictiva'],
      evidences: ['Dashboard GA4 con 20+ KPIs', 'Reporte de atribución multi-touch', 'Modelo predictivo de churn'],
      rubrics: ['Rúbrica Analítica Descriptiva', 'Rúbrica BI y Visualización', 'Evaluación Modelo Predictivo'],
    },
    modules: [
      {
        id: 'm3-1',
        title: 'Google Analytics 4: Implementación y Configuración Avanzada',
        description: 'Implementa GA4 correctamente con eventos personalizados, conversiones y audiencias.',
        isFreePreview: true,
        learningObjectives: ['Migrar de UA a GA4 sin pérdida de datos', 'Configurar eventos y conversiones personalizadas', 'Crear audiencias para remarketing'],
        lessons: [
          { id: 'l3-1-1', title: 'GA4: Diferencias fundamentales con Universal Analytics', type: 'video', duration: 35, isFreePreview: true },
          { id: 'l3-1-2', title: 'Implementación de GA4 con Google Tag Manager', type: 'video', duration: 50 },
          { id: 'l3-1-3', title: 'Eventos personalizados y conversiones en e-commerce', type: 'video', duration: 45, resources: [{ name: 'Schema de eventos GA4', url: '#', type: 'template' }] },
          { id: 'l3-1-4', title: 'Explorations: Análisis de embudos y cohortes', type: 'video', duration: 40 },
          { id: 'l3-1-5', title: 'Ejercicio: Auditoría GA4 completa', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm3-2',
        title: 'Power BI y Looker Studio: Dashboards Ejecutivos',
        description: 'Crea dashboards profesionales que permiten tomar decisiones en tiempo real.',
        learningObjectives: ['Construir modelos de datos en Power BI', 'Diseñar dashboards de marketing en Looker Studio', 'Automatizar reportes con conectores de datos'],
        lessons: [
          { id: 'l3-2-1', title: 'Power BI: Modelado de datos para marketing', type: 'video', duration: 60 },
          { id: 'l3-2-2', title: 'DAX avanzado: Métricas calculadas para marketing', type: 'video', duration: 55 },
          { id: 'l3-2-3', title: 'Looker Studio: Dashboard conectado a GA4 y Meta Ads', type: 'video', duration: 45, resources: [{ name: 'Template Dashboard Marketing', url: '#', type: 'template' }] },
          { id: 'l3-2-4', title: 'Automatización de reportes con Supermetrics', type: 'video', duration: 35 },
        ],
      },
      {
        id: 'm3-3',
        title: 'SQL para Marketing y Analítica Avanzada',
        description: 'Aprende SQL aplicado a extracción y análisis de datos de marketing.',
        learningObjectives: ['Escribir consultas SQL para análisis de campañas', 'Conectar BigQuery con GA4 y Meta', 'Crear modelos de atribución con SQL'],
        lessons: [
          { id: 'l3-3-1', title: 'SQL para marketers: De cero a consultas avanzadas', type: 'video', duration: 70 },
          { id: 'l3-3-2', title: 'BigQuery + GA4: Análisis masivo de datos de usuario', type: 'video', duration: 65 },
          { id: 'l3-3-3', title: 'Modelos de atribución multi-touch con SQL', type: 'video', duration: 50 },
          { id: 'l3-3-4', title: 'Proyecto: Dashboard de atribución completo', type: 'exercise', duration: 180 },
        ],
      },
    ],
    quizzes: [],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 4 — Máster en Marketing Digital LATAM (100 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c4',
    slug: 'master-marketing-digital-latam',
    title: 'Máster en Marketing Digital para LATAM',
    subtitle: 'Programa Insignia UTAMV 2026 — 10 Módulos OBE Completos',
    description: 'El programa más completo de marketing digital en LATAM. 10 módulos OBE con metodología NextGen 2026. SEO, Paid Media, Content, Email, Social Media, Analytics, IA, Branding y más. Incluye proyecto final y certificación.',
    level: 'Máster',
    category: 'Marketing Digital',
    hours: 100,
    priceMXN: 24990,
    priceUSD: 1249,
    stripePriceId: 'price_master_marketing',
    instructorName: 'Cuerpo Docente UTAMV',
    instructorTitle: 'Faculty Completo UTAMV — 8 Especialistas',
    instructorBio: 'Programa impartido por el cuerpo docente completo de UTAMV con especialistas en cada área del marketing digital.',
    thumbnail: '/src/assets/module-10.jpg',
    isFeatured: true,
    learningOutcomes: [
      'Diseñar e implementar estrategias de marketing digital 360° para cualquier industria',
      'Liderar equipos de marketing digital con metodología OBE verificable',
      'Dominar el ecosistema completo: SEO, SEM, Social, Email, Content, Analytics, IA',
      'Crear y gestionar presupuestos de marketing digital de $10K a $1M+',
      'Desarrollar portafolio profesional completo con 10 proyectos reales',
    ],
    prerequisites: ['Ninguno — programa desde cero hasta nivel avanzado'],
    obeFramework: {
      competencies: ['Estrategia digital integral', 'Liderazgo de equipos', 'Innovación con IA', 'Ética profesional'],
      evidences: ['10 proyectos reales completados', 'Plan maestro de marketing digital', 'Portfolio OBE verificable'],
      rubrics: ['Rúbrica Master OBE Nivel 1-5', 'Evaluación 360° entre pares', 'Defensa de proyecto final'],
    },
    modules: [
      {
        id: 'm4-1',
        title: 'Módulo 1: Ecosistema y Estrategia Digital',
        description: 'Fundamentos estratégicos del marketing digital moderno.',
        isFreePreview: true,
        learningObjectives: ['Mapear el ecosistema digital completo', 'Definir estrategia digital competitiva', 'Desarrollar buyer personas avanzados'],
        lessons: [
          { id: 'l4-1-1', title: 'Orientación al Máster: Metodología OBE y Ruta de Aprendizaje', type: 'video', duration: 20, isFreePreview: true },
          { id: 'l4-1-2', title: 'Estrategia Digital Competitiva: Frameworks 2026', type: 'video', duration: 45, isFreePreview: true },
          { id: 'l4-1-3', title: 'Buyer Personas Avanzados con Datos y IA', type: 'video', duration: 35 },
          { id: 'l4-1-4', title: 'Podcast: CMOs de LATAM comparten sus estrategias', type: 'audio', duration: 50 },
          { id: 'l4-1-5', title: 'Ejercicio 1: Plan Estratégico Digital de tu empresa', type: 'exercise', duration: 90 },
        ],
      },
      {
        id: 'm4-2',
        title: 'Módulo 2: SEO y AEO Avanzado',
        description: 'SEO técnico, de contenidos, local e IA-Optimization para 2026.',
        learningObjectives: ['Implementar SEO técnico de nivel enterprise', 'Dominar AEO (Answer Engine Optimization)', 'Construir estrategia de contenidos para Google y ChatGPT'],
        lessons: [
          { id: 'l4-2-1', title: 'SEO Enterprise: Técnico, On-Page y E-E-A-T', type: 'video', duration: 55 },
          { id: 'l4-2-2', title: 'AEO: Cómo aparecer en ChatGPT, Perplexity y Bing AI', type: 'video', duration: 40 },
          { id: 'l4-2-3', title: 'Link Building Avanzado: Digital PR y Authority Building', type: 'video', duration: 35 },
          { id: 'l4-2-4', title: 'Herramientas Pro: Ahrefs, Semrush y SurferSEO', type: 'video', duration: 45, resources: [{ name: 'Checklist SEO Enterprise', url: '#', type: 'template' }] },
        ],
      },
      {
        id: 'm4-3',
        title: 'Módulo 3: Paid Media y Performance Marketing',
        description: 'Google Ads, Meta Ads, TikTok Ads y Programática de alto rendimiento.',
        learningObjectives: ['Crear estructuras de campañas de alta conversión', 'Dominar Performance Max y Smart Bidding', 'Implementar estrategias omnicanal de paid media'],
        lessons: [
          { id: 'l4-3-1', title: 'Google Ads 2026: PMax, Demand Gen y Search Avanzado', type: 'video', duration: 60 },
          { id: 'l4-3-2', title: 'Meta Ads: Advantage+ y Creative Testing a Escala', type: 'video', duration: 55 },
          { id: 'l4-3-3', title: 'TikTok Ads: Estrategias para mercados hispanos', type: 'video', duration: 40 },
          { id: 'l4-3-4', title: 'Programática y DSP: Compra de medios avanzada', type: 'video', duration: 45 },
          { id: 'l4-3-5', title: 'Proyecto 3: Campaña omnicanal con $5,000 MXN', type: 'exercise', duration: 120 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q4-1',
        title: 'Evaluación Módulo 1 — Estrategia Digital',
        passingScore: 70,
        questions: [
          { id: 'qq4-1', question: '¿Qué es AEO (Answer Engine Optimization)?', options: ['Optimización para motores de respuesta como ChatGPT y Perplexity', 'Una variante de SEO para dispositivos móviles', 'Publicidad en motores de búsqueda alternativos', 'Optimización de anuncios de texto en Google'], correct: 0, explanation: 'AEO es la práctica de optimizar contenido para aparecer en respuestas de AI como ChatGPT, Perplexity y Bing AI Chat.' },
          { id: 'qq4-2', question: '¿Cuál es la principal diferencia entre Performance Max y las campañas tradicionales de Google Ads?', options: ['PMax es más barato', 'PMax utiliza IA para optimizar automáticamente en todos los inventarios de Google', 'PMax solo funciona para e-commerce', 'No hay diferencia significativa'], correct: 1, explanation: 'Performance Max usa machine learning para optimizar automáticamente bids y creatividades en Search, Display, YouTube, Gmail, Maps y Discovery.' },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 5 — E-commerce y Ventas Digitales (120 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c5',
    slug: 'ecommerce-ventas-digitales',
    title: 'E-commerce y Ventas Digitales Avanzadas',
    subtitle: 'Shopify, WooCommerce, Amazon y Estrategia D2C para LATAM',
    description: 'Domina el ecosistema completo de comercio electrónico en LATAM. Shopify, WooCommerce, Amazon FBA, Mercado Libre, TikTok Shop y estrategias D2C. Desde configuración hasta escalar a millones de pesos.',
    level: 'Diplomado',
    category: 'E-commerce',
    hours: 120,
    priceMXN: 18990,
    priceUSD: 949,
    stripePriceId: 'price_ecommerce',
    instructorName: 'Carlos Alejandro Vega',
    instructorTitle: 'Director de E-commerce — UTAMV',
    instructorBio: 'Fundador de 3 e-commerce exitosos en LATAM con +$50M en ventas. Consultor de Shopify Plus y Amazon Seller Expert.',
    thumbnail: '/src/assets/ecommerce-sales-funnel.jpg',
    isFeatured: false,
    learningOutcomes: [
      'Crear y escalar tiendas Shopify y WooCommerce de alto rendimiento',
      'Implementar estrategias Amazon FBA para el mercado latinoamericano',
      'Dominar TikTok Shop y social commerce para generaciones Z y Millennial',
      'Desarrollar estrategias D2C (Direct to Consumer) con márgenes superiores al 40%',
      'Construir sistemas de CRM y retención de clientes para e-commerce',
    ],
    prerequisites: ['Conocimientos básicos de marketing digital', 'Disposición de capital inicial $5,000-$20,000 MXN para práctica'],
    obeFramework: {
      competencies: ['Gestión de tienda online', 'Estrategia D2C', 'Optimización de conversión', 'Gestión de marketplace'],
      evidences: ['Tienda Shopify funcional con ventas reales', 'Estrategia Amazon FBA implementada', 'Dashboard de métricas e-commerce'],
      rubrics: ['Rúbrica Gestión E-commerce', 'Evaluación CRO y UX', 'Proyecto D2C con resultados reales'],
    },
    modules: [
      {
        id: 'm5-1',
        title: 'Shopify Avanzado: De Cero a Escala',
        description: 'Construye y escala tu tienda Shopify con estrategias de alta conversión.',
        isFreePreview: true,
        learningObjectives: ['Configurar Shopify con todas las optimizaciones de conversión', 'Integrar apps clave de Shopify Plus', 'Implementar estrategias de retención y upsell'],
        lessons: [
          { id: 'l5-1-1', title: 'Arquitectura de tienda Shopify de alta conversión', type: 'video', duration: 50, isFreePreview: true },
          { id: 'l5-1-2', title: 'Product Page Optimization: CRO para e-commerce', type: 'video', duration: 45 },
          { id: 'l5-1-3', title: 'Checkout optimizado: Reducir abandono al mínimo', type: 'video', duration: 40 },
          { id: 'l5-1-4', title: 'Apps imprescindibles de Shopify 2026', type: 'video', duration: 35, resources: [{ name: 'Lista de Apps Shopify Pro', url: '#', type: 'guide' }] },
          { id: 'l5-1-5', title: 'Email + SMS Marketing para e-commerce con Klaviyo', type: 'video', duration: 55 },
        ],
      },
      {
        id: 'm5-2',
        title: 'Amazon FBA y Marketplaces LATAM',
        description: 'Vende en Amazon y los principales marketplaces latinoamericanos.',
        learningObjectives: ['Registrar producto en Amazon con PPC rentable', 'Optimizar listings con A+ Content', 'Escalar en Mercado Libre y Amazon México'],
        lessons: [
          { id: 'l5-2-1', title: 'Amazon FBA México: Guía completa 2026', type: 'video', duration: 65 },
          { id: 'l5-2-2', title: 'Keyword Research para Amazon: Helium 10 y Jungle Scout', type: 'video', duration: 50 },
          { id: 'l5-2-3', title: 'Mercado Libre: Estrategia para vendedor Premium', type: 'video', duration: 55 },
          { id: 'l5-2-4', title: 'TikTok Shop LATAM: La nueva frontera del social commerce', type: 'video', duration: 45 },
        ],
      },
    ],
    quizzes: [],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 6 — Branding Digital y Comunicación Estratégica (150 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c6',
    slug: 'branding-comunicacion-estrategica',
    title: 'Branding Digital y Comunicación Estratégica',
    subtitle: 'Identidad de Marca, Storytelling y Posicionamiento Global',
    description: 'Construye marcas icónicas en el mundo digital. Aprende estrategia de branding, identidad visual, storytelling, relaciones públicas digitales y posicionamiento de marca para mercados globales.',
    level: 'Licenciatura',
    category: 'Branding y Comunicación',
    hours: 150,
    priceMXN: 29990,
    priceUSD: 1499,
    stripePriceId: 'price_branding',
    instructorName: 'Valentina Cruz Bermúdez',
    instructorTitle: 'Directora de Brand Strategy — UTAMV',
    instructorBio: 'Estratega de marca con +15 años construyendo marcas icónicas en LATAM. Ex-directora de branding en BBDO y McCann.',
    thumbnail: '/src/assets/branding-identity-framework.jpg',
    isFeatured: false,
    learningOutcomes: [
      'Desarrollar arquitectura de marca completa con identidad visual y verbal',
      'Crear estrategias de storytelling que conecten emocionalmente con audiencias',
      'Implementar estrategias de PR digital y gestión de reputación online',
      'Construir comunidades de marca leales en plataformas digitales',
      'Posicionar marcas en mercados globales con presupuestos limitados',
    ],
    prerequisites: ['Conocimientos básicos de marketing', 'Comprensión básica de diseño gráfico (no se requiere experiencia técnica)'],
    obeFramework: {
      competencies: ['Brand Architecture', 'Storytelling estratégico', 'PR Digital', 'Community Building'],
      evidences: ['Manual de marca completo', 'Estrategia de contenidos 90 días', 'Plan de PR Digital con resultados'],
      rubrics: ['Rúbrica Brand Identity', 'Evaluación Storytelling', 'Proyecto Posicionamiento de Marca'],
    },
    modules: [
      {
        id: 'm6-1',
        title: 'Fundamentos de Brand Strategy',
        description: 'Los principios fundamentales de la estrategia de marca en el entorno digital.',
        isFreePreview: true,
        learningObjectives: ['Definir propósito, visión y valores de marca', 'Crear arquetipos de marca', 'Desarrollar propuesta de valor única'],
        lessons: [
          { id: 'l6-1-1', title: 'Brand Strategy: Del propósito al posicionamiento', type: 'video', duration: 45, isFreePreview: true },
          { id: 'l6-1-2', title: 'Arquetipos de marca: Los 12 arquetipos de Jung aplicados', type: 'video', duration: 40 },
          { id: 'l6-1-3', title: 'Brand Audit: Diagnóstico profundo de tu marca', type: 'exercise', duration: 90 },
          { id: 'l6-1-4', title: 'Casos: Nike, Apple, Patagonia — ¿Qué los hace icónicos?', type: 'video', duration: 50 },
        ],
      },
    ],
    quizzes: [],
  },

  // ──────────────────────────────────────────────────────
  // CURSO 7 — Maestría en Marketing Digital (150 horas)
  // ──────────────────────────────────────────────────────
  {
    id: 'c7',
    slug: 'maestria-marketing-digital',
    title: 'Maestría en Marketing Digital y Tecnología',
    subtitle: 'Programa de Posgrado UTAMV NextGen 2026 — Máximo Nivel Académico',
    description: 'El programa de posgrado más completo de UTAMV. Investigación aplicada, liderazgo estratégico, innovación tecnológica y proyecto de tesis. Formación del máximo nivel académico con metodología OBE integral y certificación institucional.',
    level: 'Maestría',
    category: 'Posgrado',
    hours: 150,
    priceMXN: 44990,
    priceUSD: 2249,
    stripePriceId: 'price_maestria',
    instructorName: 'Dr. Rodrigo Montoya Herrera',
    instructorTitle: 'Rector Académico — UTAMV',
    instructorBio: 'PhD en Marketing Digital por la Universidad de Barcelona. 20 años de investigación aplicada en tecnología y marketing para mercados emergentes.',
    thumbnail: '/src/assets/students-celebrating.jpg',
    isFeatured: true,
    learningOutcomes: [
      'Liderar transformaciones digitales en organizaciones de cualquier tamaño',
      'Desarrollar investigación aplicada en marketing digital con metodología académica',
      'Crear marcos de innovación estratégica para entornos VUCA',
      'Dominar IA estratégica, blockchain en marketing y tecnologías emergentes',
      'Producir tesis de investigación aplicada con impacto en el ecosistema LATAM',
    ],
    prerequisites: ['Licenciatura concluida en cualquier área', 'Experiencia mínima de 2 años en marketing o negocios digitales'],
    obeFramework: {
      competencies: ['Investigación académica aplicada', 'Liderazgo estratégico', 'Innovación tecnológica', 'Ética e impacto social'],
      evidences: ['Tesis de investigación aplicada (50+ páginas)', 'Artículo académico publicable', 'Plan estratégico de transformación digital completo'],
      rubrics: ['Rúbrica de Investigación Académica', 'Rúbrica de Liderazgo y Gestión', 'Evaluación de Tesis por Comité', 'Defensa Pública de Proyecto Final'],
    },
    modules: [
      {
        id: 'm7-1',
        title: 'Investigación Aplicada en Marketing Digital',
        description: 'Metodología de investigación académica aplicada al marketing digital.',
        isFreePreview: true,
        learningObjectives: ['Diseñar proyectos de investigación aplicada', 'Aplicar métodos cuantitativos y cualitativos', 'Analizar datos con SPSS y R'],
        lessons: [
          { id: 'l7-1-1', title: 'Metodología de Investigación en Marketing Digital', type: 'video', duration: 60, isFreePreview: true },
          { id: 'l7-1-2', title: 'Diseño de Investigación: Cuantitativa vs Cualitativa', type: 'video', duration: 55 },
          { id: 'l7-1-3', title: 'Análisis estadístico con SPSS para marketing', type: 'video', duration: 70 },
          { id: 'l7-1-4', title: 'Revisión literaria y estado del arte en marketing digital', type: 'text', duration: 45, resources: [{ name: 'Guía de citación APA 7 para marketing', url: '#', type: 'guide' }] },
          { id: 'l7-1-5', title: 'Taller: Diseño de tu protocolo de tesis', type: 'exercise', duration: 180 },
        ],
      },
      {
        id: 'm7-2',
        title: 'Tecnologías Emergentes: IA, Blockchain y Metaverso en Marketing',
        description: 'Las tecnologías del futuro aplicadas al marketing estratégico.',
        learningObjectives: ['Implementar estrategias de marketing en Web3', 'Aplicar blockchain para lealtad y certificación', 'Explorar el metaverso como canal de marketing'],
        lessons: [
          { id: 'l7-2-1', title: 'Web3 y NFTs: Aplicaciones reales en marketing de marca', type: 'video', duration: 50 },
          { id: 'l7-2-2', title: 'Blockchain para lealtad y certificación de clientes', type: 'video', duration: 45 },
          { id: 'l7-2-3', title: 'Metaverso y Marketing Inmersivo: Casos reales 2026', type: 'video', duration: 55 },
          { id: 'l7-2-4', title: 'IA Cuántica: El futuro del marketing predictivo', type: 'audio', duration: 40 },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q7-1',
        title: 'Evaluación Académica — Investigación Aplicada',
        passingScore: 80,
        questions: [
          { id: 'qq7-1', question: '¿Cuál es la diferencia fundamental entre investigación básica y aplicada en marketing?', options: ['La investigación básica usa más tecnología', 'La investigación aplicada busca resolver problemas prácticos del entorno real', 'No hay diferencia real', 'La investigación básica es más cara'], correct: 1, explanation: 'La investigación aplicada en marketing se orienta a resolver problemas concretos del entorno empresarial, generando conocimiento práctico y accionable.' },
          { id: 'qq7-2', question: '¿Qué es el blockchain en el contexto del marketing de lealtad?', options: ['Un sistema de puntos tradicional', 'Una tecnología de registro distribuido e inmutable para verificar transacciones de lealtad', 'Un software de CRM avanzado', 'Una red social descentralizada'], correct: 1, explanation: 'El blockchain permite crear programas de lealtad con tokens verificables, inmutables y portables que no dependen de un intermediario central.' },
        ],
      },
    ],
  },
];

export const getPricingLabel = (level: string): string => {
  const labels: Record<string, string> = {
    'Certificación': 'Certificación Profesional',
    'Diplomado': 'Diplomado Especializado',
    'Máster': 'Máster Profesional',
    'Licenciatura': 'Licenciatura en Línea',
    'Maestría': 'Maestría (Posgrado)',
  };
  return labels[level] || level;
};

export const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    'Certificación': 'hsl(210 25% 55%)',
    'Diplomado': 'hsl(210 30% 65%)',
    'Máster': 'hsl(210 35% 75%)',
    'Licenciatura': 'hsl(210 28% 70%)',
    'Maestría': 'hsl(210 22% 82%)',
  };
  return colors[level] || 'hsl(var(--platinum))';
};
