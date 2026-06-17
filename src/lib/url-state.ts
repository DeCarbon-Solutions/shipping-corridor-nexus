import type { FuelMix, FuelType } from "@/types";
import { DEFAULT_FUEL_MIX } from "./constants";

const PARAM_MAP: Record<string, FuelType> = {
  hfo: "hfo",
  vlsfo: "vlsfo",
  lng: "lng",
  bio: "biofuel",
  meth: "methanol",
  nh3: "ammonia",
};

const REVERSE_MAP: Record<FuelType, string> = {
  hfo: "hfo",
  vlsfo: "vlsfo",
  lng: "lng",
  biofuel: "bio",
  methanol: "meth",
  ammonia: "nh3",
};

/**
 * Parse fuel mix from URL search params.
 * Falls back to defaults for missing/invalid values.
 */
export function parseFuelMixFromURL(searchParams: URLSearchParams): FuelMix {
  const mix = { ...DEFAULT_FUEL_MIX };

  for (const [param, fuelType] of Object.entries(PARAM_MAP)) {
    const raw = searchParams.get(param);
    if (raw !== null) {
      const val = parseInt(raw, 10);
      if (!isNaN(val) && val >= 0 && val <= 100) {
        mix[fuelType] = val;
      }
    }
  }

  return mix;
}

/**
 * Encode fuel mix into URL search params string.
 */
export function encodeFuelMixToURL(mix: FuelMix): string {
  const params = new URLSearchParams();

  for (const [fuelType, paramKey] of Object.entries(REVERSE_MAP)) {
    params.set(paramKey, String(mix[fuelType as FuelType]));
  }

  return params.toString();
}

/**
 * Build a shareable URL with the current fuel mix encoded.
 */
export function buildShareURL(mix: FuelMix): string {
  const base = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  return `${base}?${encodeFuelMixToURL(mix)}`;
}
