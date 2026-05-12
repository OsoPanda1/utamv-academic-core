import { useMemo } from "react";
import { calculateUtamvCampusPrice, type CampusPlan } from "./index";

interface UseCampusPricingOptions {
  campusPlan: CampusPlan;
  country: "MX" | "LATAM" | "GLOBAL";
  isLocalStudent: boolean;
}

export function useCampusPricing(opts: UseCampusPricingOptions) {
  return useMemo(
    () =>
      calculateUtamvCampusPrice({
        campusPlan: opts.campusPlan,
        country: opts.country,
        isLocalStudent: opts.isLocalStudent,
      }),
    [opts.campusPlan, opts.country, opts.isLocalStudent],
  );
}
