const COVER_BY_SLUG: Record<string, string> = {
  'marketing-digital-360': '/covers/cover-marketing.svg',
  'ia-aplicada-marketing': '/covers/cover-ia.svg',
  'seo-aeo-avanzado': '/covers/cover-seo.svg',
  'ecommerce-growth': '/covers/cover-ecommerce.svg',
  'branding-estrategico': '/covers/cover-branding.svg',
  'data-analytics-marketing': '/covers/cover-analytics.svg',
  'frontend-nextgen': '/covers/cover-frontend.svg',
  'backend-resiliente': '/covers/cover-backend.svg',
  'liderazgo-digital': '/covers/cover-leadership.svg',
};

const FALLBACKS = Object.values(COVER_BY_SLUG);

export function resolveCourseCover(slug: string, thumbnail?: string | null): string {
  if (thumbnail && !thumbnail.startsWith('/src/assets/')) return thumbnail;
  return COVER_BY_SLUG[slug] ?? FALLBACKS[Math.abs(hashCode(slug)) % FALLBACKS.length];
}

function hashCode(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash << 5) - hash + value.charCodeAt(i);
  return hash;
}
