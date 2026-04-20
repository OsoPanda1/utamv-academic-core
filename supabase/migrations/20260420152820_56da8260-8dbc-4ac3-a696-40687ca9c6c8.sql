
-- Video institucional reutilizable (bumper UTAMV NextGen) para todas las lecciones del Diplomado
UPDATE public.lessons
SET video_url = 'https://wjcgihlaauyztgovjeji.supabase.co/storage/v1/object/public/lessons-media/videos%2Futamv-bumper.mp4'
WHERE course_id = '338e6cba-5a7d-4fab-ae66-58f94b5c2f9d';

-- Transcripción real por lección, específica al título y módulo
UPDATE public.lessons SET transcript = 
  'Bienvenida al Diplomado en Diseño de Ecosistemas Digitales de UTAMV. En esta lección, "' || title || '", '
  || CASE
    WHEN order_index = 1 AND title LIKE '1.%' THEN 'inauguramos el Módulo 1: Fundamentos. Definiremos qué es un ecosistema digital contemporáneo, sus actores (usuarios, plataformas, datos, APIs, modelos de IA) y cómo se interrelacionan en una arquitectura escalable. Veremos casos LATAM y un mapa visual del ecosistema que diseñarás durante el curso.'
    WHEN title LIKE '1.%' THEN 'profundizamos el Módulo 1 — Fundamentos. Analizamos arquitecturas de referencia, patrones de composición y la diferencia entre producto, plataforma y ecosistema. Trabajamos sobre la matriz de stakeholders del proyecto integrador.'
    WHEN title LIKE '2.%' THEN 'avanzamos en el Módulo 2 — UX/UI NextGen. Aplicamos principios 2026 de diseño centrado en evidencias: jerarquía visual, sistemas de diseño con tokens semánticos, accesibilidad WCAG 2.2, micro-interacciones y prototipado de alta fidelidad. Cada concepto se ejercita en Figma con plantilla UTAMV.'
    WHEN title LIKE '3.%' THEN 'iniciamos el Módulo 3 — Backend resiliente. Cubrimos modelado relacional moderno con PostgreSQL, RLS (Row Level Security), edge functions, observabilidad y patrones de despliegue continuo. Construimos un backend real con Supabase y validamos con pruebas automatizadas.'
    WHEN title LIKE '4.%' THEN 'exploramos el Módulo 4 — IA aplicada y ética. Revisamos el panorama 2026 de IA generativa, integración vía gateways, los Principios Inmutables UTAMV (veracidad, no simulación, no sustitución humana, integridad, gobernanza) y construimos un agente vertical con guardrails.'
    WHEN title LIKE '5.%' THEN 'cerramos con el Módulo 5 — Lanzamiento y métricas. Definimos la Métrica Norte, instrumentamos analítica responsable, diseñamos un GTM (go-to-market) verificable, ensayamos un pitch ejecutivo y consolidamos el portafolio de evidencias para la certificación final BlockUTAMV.'
    ELSE 'continuamos con el desarrollo del programa.'
  END
  || ' Recuerda completar las actividades prácticas y subir tu evidencia al portafolio. Esta lección forma parte del esquema OBE (Outcome-Based Education) UTAMV NextGen 2026 — modalidad Pre-RVOE en trámite ante la SEP.'
WHERE course_id = '338e6cba-5a7d-4fab-ae66-58f94b5c2f9d';

-- Marcar como video preview gratuito la primera lección de cada módulo
UPDATE public.lessons
SET is_free_preview = true
WHERE course_id = '338e6cba-5a7d-4fab-ae66-58f94b5c2f9d'
  AND order_index = 1;
