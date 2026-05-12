export type CampusPlan = "basic" | "pro" | "scholarship";

export interface PricingContext {
  country: "MX" | "LATAM" | "GLOBAL";
  isLocalStudent: boolean;
  campusPlan: CampusPlan;
}

export interface PriceBreakdown {
  base: number;
  discount: number;
  total: number;
  currency: "MXN" | "USD";
  notes?: string;
}

export function calculateUtamvCampusPrice(ctx: PricingContext): PriceBreakdown {
  let base = ctx.campusPlan === "basic" ? 600 : ctx.campusPlan === "pro" ? 1200 : 0;
  let currency: PriceBreakdown["currency"] = "MXN";

  if (ctx.country !== "MX") {
    currency = "USD";
    base /= 18;
  }

  let discount = 0;
  let notes = "Tarifa estándar UTAMV Campus Online";

  if (ctx.campusPlan === "scholarship") {
    discount = base;
    notes = "Beca completa UTAMV (100%)";
  } else if (ctx.isLocalStudent) {
    discount = base * 0.3;
    notes = "Beca parcial Real del Monte (30%)";
  }

  return {
    base: Math.round(base),
    discount: Math.round(discount),
    total: Math.max(0, Math.round(base - discount)),
    currency,
    notes,
  };
}
