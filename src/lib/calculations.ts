import type {
  FuelMix,
  FuelEmissionFactor,
  FuelType,
  WhatIfResult,
  FleetVessel,
  CIIRating,
} from "@/types";
import {
  IMO_2030_REDUCTION_TARGET,
  IMO_2050_REDUCTION_TARGET,
  FUEL_ENERGY_DENSITY,
  FUEL_CO2_FACTOR,
} from "./constants";

// ── What-If Calculator ───────────────────────────────────────
export function calculateWhatIf(
  mix: FuelMix,
  factors: FuelEmissionFactor[]
): WhatIfResult {
  const factorMap = new Map<FuelType, FuelEmissionFactor>();
  for (const f of factors) factorMap.set(f.fuelType, f);

  const hfoFactor = factorMap.get("hfo");
  if (!hfoFactor) throw new Error("HFO fuel factor not found in data");

  const baselineCo2PerTon = hfoFactor.co2Factor;
  const baselineCostPerTon = hfoFactor.costPerTon;
  let totalCo2 = 0;
  let totalCost = 0;

  const entries: [FuelType, number][] = [
    ["hfo", mix.hfo], ["vlsfo", mix.vlsfo], ["lng", mix.lng],
    ["biofuel", mix.biofuel], ["methanol", mix.methanol], ["ammonia", mix.ammonia],
  ];

  for (const [fuelType, share] of entries) {
    const factor = factorMap.get(fuelType);
    if (!factor) continue;
    const fraction = share / 100;
    totalCo2 += fraction * factor.co2Factor;
    totalCost += fraction * factor.costPerTon;
  }

  const co2ReductionPercent = 1 - totalCo2 / baselineCo2PerTon;
  const costDeltaPercent = totalCost / baselineCostPerTon - 1;

  return {
    co2ReductionPercent,
    costDeltaPercent,
    imo2030Compliant: co2ReductionPercent >= IMO_2030_REDUCTION_TARGET,
    imo2050Compliant: co2ReductionPercent >= IMO_2050_REDUCTION_TARGET,
    totalCo2PerTon: totalCo2,
    totalCostPerTon: totalCost,
    baselineCo2PerTon,
    baselineCostPerTon,
  };
}

export function redistributeFuelMix(
  currentMix: FuelMix,
  changedFuel: FuelType,
  newValue: number,
  lockedFuels: Set<FuelType>
): FuelMix {
  const result = { ...currentMix };
  const oldValue = result[changedFuel];
  result[changedFuel] = newValue;

  const delta = newValue - oldValue;
  if (delta === 0) return result;

  const unlocked = (Object.keys(result) as FuelType[]).filter(
    (ft) => ft !== changedFuel && !lockedFuels.has(ft)
  );
  if (unlocked.length === 0) { result[changedFuel] = oldValue; return result; }

  const sumUnlocked = unlocked.reduce((sum, ft) => sum + result[ft], 0);
  if (sumUnlocked === 0) {
    const perSlider = -delta / unlocked.length;
    for (const ft of unlocked) result[ft] = Math.max(0, Math.round(perSlider));
  } else {
    for (const ft of unlocked) {
      const proportion = result[ft] / sumUnlocked;
      result[ft] = Math.max(0, Math.round(result[ft] - delta * proportion));
    }
  }

  const total = (Object.values(result) as number[]).reduce((a, b) => a + b, 0);
  const diff = 100 - total;
  if (diff !== 0 && unlocked.length > 0) {
    const largest = unlocked.reduce((a, b) => (result[a] >= result[b] ? a : b));
    result[largest] = Math.max(0, result[largest] + diff);
  }
  return result;
}

// ── Fleet GFI Calculation ────────────────────────────────────
export function calculateFleetGFI(vessels: FleetVessel[]): number {
  if (vessels.length === 0) return 0;

  let totalEnergy = 0;
  let weightedGfi = 0;

  for (const v of vessels) {
    const energyDensity = FUEL_ENERGY_DENSITY[v.fuelType] ?? 40500;
    const vesselEnergy = v.annualConsumptionTons * energyDensity;
    totalEnergy += vesselEnergy;
    weightedGfi += vesselEnergy * v.gfi;
  }

  return totalEnergy > 0 ? weightedGfi / totalEnergy : 0;
}

export function calculateFleetCO2Tons(vessels: FleetVessel[]): number {
  return vessels.reduce((sum, v) => {
    const factor = FUEL_CO2_FACTOR[v.fuelType] ?? 3.114;
    return sum + v.annualConsumptionTons * factor;
  }, 0);
}

export function getFleetCIIDistribution(vessels: FleetVessel[]): Record<CIIRating, number> {
  const dist: Record<CIIRating, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const v of vessels) dist[v.ciiRating]++;
  return dist;
}

export function getFleetAvgCIIRating(vessels: FleetVessel[]): CIIRating {
  const dist = getFleetCIIDistribution(vessels);
  const weights: Record<CIIRating, number> = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  const total = vessels.length;
  if (total === 0) return "C";
  const avg = (Object.entries(dist) as [CIIRating, number][]).reduce(
    (sum, [rating, count]) => sum + weights[rating] * count, 0
  ) / total;
  if (avg <= 1.5) return "A";
  if (avg <= 2.5) return "B";
  if (avg <= 3.5) return "C";
  if (avg <= 4.5) return "D";
  return "E";
}

export function getFuelMixByMass(vessels: FleetVessel[]): Partial<Record<FuelType, number>> {
  const totals: Partial<Record<FuelType, number>> = {};
  let total = 0;
  for (const v of vessels) {
    totals[v.fuelType] = (totals[v.fuelType] ?? 0) + v.annualConsumptionTons;
    total += v.annualConsumptionTons;
  }
  if (total === 0) return totals;
  const result: Partial<Record<FuelType, number>> = {};
  for (const [ft, tons] of Object.entries(totals) as [FuelType, number][]) {
    result[ft] = Math.round((tons / total) * 100);
  }
  return result;
}

export function getHFOVLSFOPercent(vessels: FleetVessel[]): number {
  const mix = getFuelMixByMass(vessels);
  return (mix.hfo ?? 0) + (mix.vlsfo ?? 0);
}

// ── Formatting ───────────────────────────────────────────────
export function formatPercent(value: number, showSign = true): string {
  const pct = (value * 100).toFixed(1);
  if (showSign && value > 0) return `+${pct}%`;
  return `${pct}%`;
}

export function formatUSD(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function formatMillions(value: number): string {
  return `$${value.toFixed(1)}M`;
}
