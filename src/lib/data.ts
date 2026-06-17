import type { Port, Vessel, GreenCorridor, FuelEmissionFactor, FuelType } from "@/types";
import { FUEL_COLORS_RGB } from "./constants";

let portsCache: Port[] | null = null;
let vesselsCache: Vessel[] | null = null;
let corridorsCache: GreenCorridor[] | null = null;
let fuelFactorsCache: FuelEmissionFactor[] | null = null;

export async function loadPorts(): Promise<Port[]> {
  if (portsCache) return portsCache;
  const res = await fetch("/data/ports.json");
  portsCache = (await res.json()) as Port[];
  return portsCache;
}

export async function loadVessels(): Promise<Vessel[]> {
  if (vesselsCache) return vesselsCache;
  const res = await fetch("/data/vessels.json");
  vesselsCache = (await res.json()) as Vessel[];
  return vesselsCache;
}

export async function loadCorridors(): Promise<GreenCorridor[]> {
  if (corridorsCache) return corridorsCache;
  const res = await fetch("/data/corridors.json");
  corridorsCache = (await res.json()) as GreenCorridor[];
  return corridorsCache;
}

export async function loadFuelFactors(): Promise<FuelEmissionFactor[]> {
  if (fuelFactorsCache) return fuelFactorsCache;
  const res = await fetch("/data/fuel-factors.json");
  fuelFactorsCache = (await res.json()) as FuelEmissionFactor[];
  return fuelFactorsCache;
}

export function getPortById(ports: Port[], id: string): Port | undefined {
  return ports.find((p) => p.id === id);
}

/** Returns the "primary" fuel color for a port — the most advanced alt fuel available */
export function getPrimaryFuelColor(port: Port): [number, number, number] {
  const priority: FuelType[] = ["ammonia", "methanol", "biofuel", "lng"];
  for (const ft of priority) {
    const fuel = port.fuels.find((f) => f.fuelType === ft && f.status === "available");
    if (fuel) {
      return FUEL_COLORS_RGB[ft];
    }
  }
  return [156, 163, 175]; // fallback gray
}
