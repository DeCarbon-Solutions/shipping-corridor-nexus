// ── Fuel Types ──────────────────────────────────────────────
export type FuelType = "hfo" | "vlsfo" | "lng" | "biofuel" | "methanol" | "ammonia";

export type FuelStatus = "available" | "planned" | "pilot";

export type CIIRating = "A" | "B" | "C" | "D" | "E";

export type VesselType = "container" | "bulk" | "tanker" | "roro" | "other";

export type CorridorStatus = "active" | "fully_operational" | "bunkering_available" | "announced" | "proposed";

export type ScenarioType = "base" | "delayed" | "aggressive";

// ── Data Entities ───────────────────────────────────────────
export interface FuelAvailability {
  fuelType: FuelType;
  status: FuelStatus;
  plannedYear: number | null;
  estimatedPrice: number | null;
}

export interface Port {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  fuels: FuelAvailability[];
  suppliers: string[];
  isGreenCorridor: boolean;
  corridorName: string | null;
}

export interface Vessel {
  id: string;
  name: string;
  type: VesselType;
  dwt: number;
  lat: number;
  lng: number;
  heading: number;
  fuelType: FuelType;
  eexiRating: CIIRating;
  ciiRating: CIIRating;
  ecaZone: string | null;
}

export interface GreenCorridor {
  id: string;
  name: string;
  startPortId: string;
  endPortId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  status: CorridorStatus;
  launchYear: number;
}

export interface FuelEmissionFactor {
  fuelType: FuelType;
  co2Factor: number;
  costPerTon: number;
  displayName: string;
  color: string;
}

// ── Fleet Vessel (client's own fleet) ───────────────────────
export interface FleetVessel {
  id: string;
  name: string;
  imoNumber: string;
  type: VesselType;
  dwt: number;
  builtYear: number;
  mainEnginePowerKw: number;
  fuelType: FuelType;
  annualConsumptionTons: number;
  annualDistanceNm: number;
  primaryRoute: string;
  ciiRating: CIIRating;
  gfi: number; // gCO2eq/MJ WtW (may reflect actual blend, e.g. B30)
}

// ── Route–Corridor Matching ──────────────────────────────────
export interface RouteCorridorMatch {
  route: string;
  corridorName: string | null;
  corridorId: string | null;
  stage: CorridorStatus | null;
  fuelGap: "Low" | "Medium" | "High";
  hasMatch: boolean;
}

// ── Scenario Data ────────────────────────────────────────────
export interface ScenarioCostYear {
  year: number;
  total: number;
  euEts: number;
  fuelEu: number;
  imoLevy: number;
}

export interface FuelMixSnapshot {
  hfo: number;
  vlsfo: number;
  lng: number;
  biofuel: number;
  methanol: number;
  ammonia: number;
}

export interface ScenarioData {
  type: ScenarioType;
  name: string;
  shortName: string;
  headerColor: string;
  costs: ScenarioCostYear[];
  totalCost2030: number;
  recommendations: string[];
  fuelMixEvolution: Record<number, FuelMixSnapshot>;
}

// ── GFI Trajectory ───────────────────────────────────────────
export interface GFIDataPoint {
  year: number;
  base: number | null;
  delayed: number | null;
  aggressive: number | null;
}

export interface VesselGroup {
  name: string;
  count: number;
  currentGfi: number;
  gfi2030: number;
  compliant2030: boolean;
}

// ── UI State ────────────────────────────────────────────────
export interface FuelMix {
  hfo: number;
  vlsfo: number;
  lng: number;
  biofuel: number;
  methanol: number;
  ammonia: number;
}

export interface WhatIfResult {
  co2ReductionPercent: number;
  costDeltaPercent: number;
  imo2030Compliant: boolean;
  imo2050Compliant: boolean;
  totalCo2PerTon: number;
  totalCostPerTon: number;
  baselineCo2PerTon: number;
  baselineCostPerTon: number;
}

export interface MapViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface LayerVisibility {
  biofuel: boolean;
  methanol: boolean;
  ammonia: boolean;
  lng: boolean;
  vessels: boolean;
  corridors: boolean;
}

export interface VesselFilter {
  type: VesselType | "all";
}

export type ActiveModule = "fleet" | "corridors" | "scenarios" | "gfi";
