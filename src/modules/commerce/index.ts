export interface PricingPlan {
  id: string;
  name: string;
  amountCents: number;
  currency: "MXN" | "USD";
}

export function formatAmount(amountCents: number, currency: "MXN" | "USD"): string {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(amountCents / 100);
}
