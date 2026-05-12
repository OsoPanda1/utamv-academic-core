export interface AiRecommendation {
  id: string;
  title: string;
  reason: string;
}

export function toRecommendationTitle(recommendation: AiRecommendation): string {
  return `${recommendation.title}: ${recommendation.reason}`;
}
