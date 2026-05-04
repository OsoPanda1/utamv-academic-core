// Portadas reales de cursos UTAMV (src/assets) — mapeo central por slug.
// Cualquier slug nuevo cae a un fallback determinístico.
import diplomadoEcosistemas from '@/assets/diplomado_disenoecosistemas.png';
import diplomadoMarketing from '@/assets/diplomado_marketingetico.png';
import diplomadoAnalitica from '@/assets/diplomado_analitica.png';
import licStrategia from '@/assets/licenciatura_estrategiadigital.png';
import maestriaIA from '@/assets/maestria_aiaplicadamedios.png';
import maestriaCM from '@/assets/maestria_communitymanagement.png';
import cursoAI from '@/assets/curso_aicreativaautomatizaciones.png';
import cursoEtica from '@/assets/curso_eticacultiraeconomia.png';
import cursoGobernanza from '@/assets/curso_gobernanzadigital.png';

const COVER_BY_SLUG: Record<string, string> = {
  // Diplomados
  'diplomado-ecosistemas-digitales': diplomadoEcosistemas,
  'diplomado-ecommerce': diplomadoMarketing,
  // Maestrías
  'maestria-ia-negocios': maestriaIA,
  'maestria-cm-nextgen': maestriaCM,
  'master-community-management': maestriaCM,
  // Licenciatura
  'licenciatura-marketing-digital': licStrategia,
  // Cursos / programas
  'marketing-digital-360': diplomadoMarketing,
  'ia-aplicada-marketing': cursoAI,
  'seo-aeo-avanzado': diplomadoAnalitica,
  'arquitectura-avanzada-mercados-digitales': diplomadoAnalitica,
  // Especialidades adicionales
  'gobernanza-digital': cursoGobernanza,
  'etica-cultura-economia': cursoEtica,
};

const FALLBACKS = [
  diplomadoEcosistemas, maestriaIA, licStrategia, cursoAI, diplomadoAnalitica,
];

export function resolveCourseCover(slug?: string | null, thumbnail?: string | null): string {
  // URLs reales (CDN, Storage) tienen prioridad.
  if (thumbnail && /^https?:\/\//.test(thumbnail)) return thumbnail;
  // Marcador `asset:<slug>` o slug directo → mapeo local.
  const key = thumbnail?.startsWith('asset:') ? thumbnail.slice(6) : slug;
  if (!key) return FALLBACKS[0];
  return COVER_BY_SLUG[key] ?? FALLBACKS[Math.abs(hashCode(key)) % FALLBACKS.length];
}

function hashCode(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash << 5) - hash + value.charCodeAt(i);
  return hash;
}
