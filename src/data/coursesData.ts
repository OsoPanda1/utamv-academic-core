// UTAMV Elite Masterclass — 7 Cursos Completos con contenido de última generación
// Based on the Documento Maestro UTAMV 2026 and OBE NextGen methodology

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
    priceMXN: 4242,
    priceUSD: 212,
    stripePriceId: 'price_marketing_360',
    instructorName: 'RENATA JAZMIN',
    instructorTitle: 'CEO Fundadora de ORBITA DIGITAL',
    instructorBio: 'Expertise como Community Manager en comunidades latinas a gran escala. Desarrolladora de Estrategias y Métodos comprobados para visionarios y emprendedores que no se conforman con una respuesta negativa. Liderazgo en expansión de mercados transatlánticos.',
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
    priceMXN: 7642,
    priceUSD: 382,
    stripePriceId: 'price_ia_marketing',
    instructorName: 'Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)',
    instructorTitle: 'CEO Fundador de TAMV ONLINE, TAMV ONLINE METAVERSO, THE SOF, UTAMV',
    instructorBio: 'Expertise Autodidacta de Alto Nivel. Un perfil forjado en la experimentación directa, la creación de ecosistemas digitales complejos y el liderazgo de proyectos tecnológicos a gran escala, superando las mallas curriculares tradicionales mediante la aplicación empírica y el desarrollo de arquitecturas web disruptivas.',
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
];
