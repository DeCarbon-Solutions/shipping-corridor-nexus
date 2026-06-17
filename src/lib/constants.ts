import type {
  FuelType,
  CIIRating,
  FuelMix,
  MapViewState,
  LayerVisibility,
  FleetVessel,
  ScenarioData,
  GFIDataPoint,
  VesselGroup,
  RouteCorridorMatch,
} from "@/types";

// ── Fuel Colors ─────────────────────────────────────────────
export const FUEL_COLORS: Record<FuelType, string> = {
  hfo: "#6B7280",
  vlsfo: "#9CA3AF",
  lng: "#FACC15",
  biofuel: "#22C55E",
  methanol: "#3B82F6",
  ammonia: "#F97316",
};

export const FUEL_COLORS_RGB: Record<FuelType, [number, number, number]> = {
  hfo: [107, 114, 128],
  vlsfo: [156, 163, 175],
  lng: [250, 204, 21],
  biofuel: [34, 197, 94],
  methanol: [59, 130, 246],
  ammonia: [249, 115, 22],
};

export const FUEL_LABELS: Record<FuelType, string> = {
  hfo: "HFO",
  vlsfo: "VLSFO",
  lng: "LNG",
  biofuel: "Biofuel",
  methanol: "Methanol",
  ammonia: "Ammonia",
};

export const FUEL_ICONS: Record<FuelType, string> = {
  hfo: "⚫",
  vlsfo: "⚪",
  lng: "🟡",
  biofuel: "🟢",
  methanol: "🔵",
  ammonia: "🟠",
};

// ── CII Colors ──────────────────────────────────────────────
export const CII_COLORS: Record<CIIRating, string> = {
  A: "#22C55E",
  B: "#84CC16",
  C: "#FACC15",
  D: "#F97316",
  E: "#EF4444",
};

export const CII_COLORS_RGB: Record<CIIRating, [number, number, number]> = {
  A: [34, 197, 94],
  B: [132, 204, 22],
  C: [250, 204, 21],
  D: [249, 115, 22],
  E: [239, 68, 68],
};

// ── IMO / GFI Constants ──────────────────────────────────────
export const IMO_GFI_BASELINE = 91.16; // gCO2eq/MJ, 2008 reference

export const IMO_GFI_TARGETS: Record<number, number> = {
  2030: 72.93,  // -20%
  2035: 50.14,  // -45%
  2040: 27.35,  // -70%
  2050: 0,
};

// Well-to-Wake GFI values per fuel (gCO2eq/MJ)
export const FUEL_GFI_WTW: Record<FuelType, number> = {
  hfo: 91.16,
  vlsfo: 90.80,
  lng: 72.60,
  biofuel: 26.00,   // FAME 100%
  methanol: 38.20,  // grey/fossil methanol (green = 11.4)
  ammonia: 3.10,    // e-ammonia
};

// Energy density MJ/ton (for GFI weighting)
export const FUEL_ENERGY_DENSITY: Record<FuelType, number> = {
  hfo: 40500,
  vlsfo: 40500,
  lng: 50000,
  biofuel: 37000,
  methanol: 19900,
  ammonia: 18600,
};

// CO2 factor tCO2/ton fuel (tank-to-wake)
export const FUEL_CO2_FACTOR: Record<FuelType, number> = {
  hfo: 3.114,
  vlsfo: 3.114,
  lng: 2.750,
  biofuel: 0.280,
  methanol: 1.375,
  ammonia: 0.000,
};

export const IMO_2030_REDUCTION_TARGET = 0.20;
export const IMO_2050_REDUCTION_TARGET = 0.70;

// ── Sample Fleet (12 vessels) ────────────────────────────────
export const SAMPLE_FLEET: FleetVessel[] = [
  {
    id: "v01", name: "Cape Honor", imoNumber: "9412345",
    type: "bulk", dwt: 180000, builtYear: 2014, mainEnginePowerKw: 15000,
    fuelType: "hfo", annualConsumptionTons: 28000, annualDistanceNm: 130000,
    primaryRoute: "Singapore to Rotterdam", ciiRating: "D", gfi: 91.2,
  },
  {
    id: "v02", name: "Cape Destiny", imoNumber: "9465788",
    type: "bulk", dwt: 182000, builtYear: 2015, mainEnginePowerKw: 16200,
    fuelType: "hfo", annualConsumptionTons: 30500, annualDistanceNm: 140000,
    primaryRoute: "Singapore to Rotterdam", ciiRating: "D", gfi: 91.2,
  },
  {
    id: "v03", name: "Cape Frontier", imoNumber: "9498123",
    type: "bulk", dwt: 178000, builtYear: 2018, mainEnginePowerKw: 14800,
    fuelType: "vlsfo", annualConsumptionTons: 26500, annualDistanceNm: 125000,
    primaryRoute: "Busan to Pilbara", ciiRating: "C", gfi: 85.4,
  },
  {
    id: "v04", name: "Pacific Mariner", imoNumber: "9523456",
    type: "bulk", dwt: 176000, builtYear: 2019, mainEnginePowerKw: 14500,
    fuelType: "vlsfo", annualConsumptionTons: 25000, annualDistanceNm: 120000,
    primaryRoute: "Busan to Pilbara", ciiRating: "C", gfi: 85.4,
  },
  {
    id: "v05", name: "Global Carrier", imoNumber: "9534567",
    type: "bulk", dwt: 170000, builtYear: 2013, mainEnginePowerKw: 14200,
    fuelType: "hfo", annualConsumptionTons: 24000, annualDistanceNm: 115000,
    primaryRoute: "Singapore to Rotterdam", ciiRating: "E", gfi: 91.2,
  },
  {
    id: "v06", name: "Pacific Star", imoNumber: "9654321",
    type: "container", dwt: 65000, builtYear: 2021, mainEnginePowerKw: 36000,
    fuelType: "lng", annualConsumptionTons: 12000, annualDistanceNm: 160000,
    primaryRoute: "Shanghai to LA", ciiRating: "A", gfi: 72.1,
  },
  {
    id: "v07", name: "Pacific Wave", imoNumber: "9665432",
    type: "container", dwt: 62000, builtYear: 2022, mainEnginePowerKw: 34000,
    fuelType: "lng", annualConsumptionTons: 10000, annualDistanceNm: 155000,
    primaryRoute: "Shanghai to LA", ciiRating: "A", gfi: 72.1,
  },
  {
    id: "v08", name: "Nordic Methanol", imoNumber: "9801234",
    type: "container", dwt: 16000, builtYear: 2023, mainEnginePowerKw: 8000,
    fuelType: "methanol", annualConsumptionTons: 12000, annualDistanceNm: 90000,
    primaryRoute: "Hamburg to New York", ciiRating: "A", gfi: 38.2,
  },
  {
    id: "v09", name: "Pacific Breeze", imoNumber: "9676543",
    type: "container", dwt: 58000, builtYear: 2020, mainEnginePowerKw: 34500,
    fuelType: "lng", annualConsumptionTons: 6000, annualDistanceNm: 150000,
    primaryRoute: "Shanghai to LA", ciiRating: "B", gfi: 72.1,
  },
  {
    id: "v10", name: "Pacific Arrow", imoNumber: "9687654",
    type: "container", dwt: 52000, builtYear: 2019, mainEnginePowerKw: 33000,
    fuelType: "lng", annualConsumptionTons: 2000, annualDistanceNm: 148000,
    primaryRoute: "Singapore to Rotterdam", ciiRating: "B", gfi: 72.1,
  },
  {
    id: "v11", name: "Nordic Trader", imoNumber: "9712345",
    type: "tanker", dwt: 50000, builtYear: 2013, mainEnginePowerKw: 9000,
    fuelType: "hfo", annualConsumptionTons: 11000, annualDistanceNm: 100000,
    primaryRoute: "Fujairah to Mumbai", ciiRating: "D", gfi: 91.2,
  },
  {
    id: "v12", name: "Baltic Pioneer", imoNumber: "9723456",
    type: "tanker", dwt: 52000, builtYear: 2014, mainEnginePowerKw: 9500,
    fuelType: "hfo", annualConsumptionTons: 11500, annualDistanceNm: 105000,
    primaryRoute: "Fujairah to Mumbai", ciiRating: "D", gfi: 91.2,
  },
];

// ── Route–Corridor Matches ───────────────────────────────────
export const ROUTE_CORRIDOR_MATCHES: RouteCorridorMatch[] = [
  {
    route: "Singapore to Rotterdam",
    corridorName: "Singapore – Rotterdam",
    corridorId: "SGP-RTM",
    stage: "fully_operational",
    fuelGap: "Low",
    hasMatch: true,
  },
  {
    route: "Shanghai to LA",
    corridorName: "Shanghai – Los Angeles",
    corridorId: "SHA-LAX",
    stage: "announced",
    fuelGap: "Medium",
    hasMatch: true,
  },
  {
    route: "Busan to Pilbara",
    corridorName: "Korea – Australia",
    corridorId: "KOR-AUS",
    stage: "announced",
    fuelGap: "Medium",
    hasMatch: true,
  },
  {
    route: "Fujairah to Mumbai",
    corridorName: null,
    corridorId: null,
    stage: null,
    fuelGap: "High",
    hasMatch: false,
  },
  {
    route: "Hamburg to New York",
    corridorName: null,
    corridorId: null,
    stage: null,
    fuelGap: "High",
    hasMatch: false,
  },
];

// ── Scenario Data ────────────────────────────────────────────
export const SCENARIOS: ScenarioData[] = [
  {
    type: "base",
    name: "Base Case NZF 2031",
    shortName: "NZF 2031",
    headerColor: "#0D9488",
    costs: [
      { year: 2026, total: 3.5, euEts: 2.1, fuelEu: 0.8, imoLevy: 0.6 },
      { year: 2028, total: 6.8, euEts: 3.2, fuelEu: 2.1, imoLevy: 1.5 },
      { year: 2030, total: 10.7, euEts: 4.5, fuelEu: 3.2, imoLevy: 3.0 },
      { year: 2035, total: 15.4, euEts: 5.8, fuelEu: 5.1, imoLevy: 4.5 },
    ],
    totalCost2030: 10.7,
    recommendations: [
      "Invest in LNG and Biofuels",
      "Moderate IMO compliance strategy",
      "Gradual transition plan",
    ],
    fuelMixEvolution: {
      2024: { hfo: 52, vlsfo: 28, lng: 14, biofuel: 2, methanol: 4, ammonia: 0 },
      2028: { hfo: 38, vlsfo: 22, lng: 22, biofuel: 8, methanol: 10, ammonia: 0 },
      2030: { hfo: 28, vlsfo: 18, lng: 28, biofuel: 12, methanol: 12, ammonia: 2 },
      2035: { hfo: 12, vlsfo: 10, lng: 30, biofuel: 18, methanol: 22, ammonia: 8 },
    },
  },
  {
    type: "delayed",
    name: "Delayed FuelEU Only",
    shortName: "FuelEU Only",
    headerColor: "#374151",
    costs: [
      { year: 2026, total: 1.8, euEts: 0.6, fuelEu: 0.0, imoLevy: 1.2 },
      { year: 2028, total: 3.2, euEts: 1.2, fuelEu: 0.0, imoLevy: 2.0 },
      { year: 2030, total: 4.5, euEts: 1.5, fuelEu: 0.0, imoLevy: 3.0 },
      { year: 2035, total: 9.1, euEts: 2.8, fuelEu: 1.5, imoLevy: 4.8 },
    ],
    totalCost2030: 4.5,
    recommendations: [
      "Minimize early capital investments",
      "Focus on IMO Levy cost management",
      "Postpone FuelEU adoption",
    ],
    fuelMixEvolution: {
      2024: { hfo: 52, vlsfo: 28, lng: 14, biofuel: 2, methanol: 4, ammonia: 0 },
      2028: { hfo: 48, vlsfo: 26, lng: 16, biofuel: 4, methanol: 6, ammonia: 0 },
      2030: { hfo: 42, vlsfo: 24, lng: 18, biofuel: 8, methanol: 8, ammonia: 0 },
      2035: { hfo: 28, vlsfo: 20, lng: 24, biofuel: 12, methanol: 14, ammonia: 2 },
    },
  },
  {
    type: "aggressive",
    name: "Aggressive NZF 2028",
    shortName: "NZF 2028",
    headerColor: "#166534",
    costs: [
      { year: 2026, total: 5.2, euEts: 2.8, fuelEu: 1.5, imoLevy: 0.9 },
      { year: 2028, total: 10.1, euEts: 4.8, fuelEu: 3.5, imoLevy: 1.8 },
      { year: 2030, total: 15.5, euEts: 6.2, fuelEu: 5.0, imoLevy: 4.3 },
      { year: 2035, total: 18.0, euEts: 6.5, fuelEu: 6.2, imoLevy: 5.3 },
    ],
    totalCost2030: 15.5,
    recommendations: [
      "Accelerate green fuel adoption now",
      "Maximize EU ETS compliance upfront",
      "First-mover advantage strategy",
    ],
    fuelMixEvolution: {
      2024: { hfo: 52, vlsfo: 28, lng: 14, biofuel: 2, methanol: 4, ammonia: 0 },
      2028: { hfo: 20, vlsfo: 14, lng: 30, biofuel: 14, methanol: 18, ammonia: 4 },
      2030: { hfo: 10, vlsfo: 8, lng: 28, biofuel: 20, methanol: 26, ammonia: 8 },
      2035: { hfo: 2, vlsfo: 2, lng: 18, biofuel: 22, methanol: 36, ammonia: 20 },
    },
  },
];

// ── GFI Trajectory (2024–2050) ───────────────────────────────
export const GFI_TRAJECTORY: GFIDataPoint[] = [
  { year: 2024, base: 83.6, delayed: 83.6, aggressive: 83.6 },
  { year: 2026, base: 80.5, delayed: 82.8, aggressive: 75.2 },
  { year: 2028, base: 76.2, delayed: 81.0, aggressive: 62.1 },
  { year: 2030, base: 70.8, delayed: 78.5, aggressive: 50.4 },
  { year: 2032, base: 64.0, delayed: 73.2, aggressive: 40.8 },
  { year: 2035, base: 48.5, delayed: 65.0, aggressive: 28.2 },
  { year: 2040, base: 26.0, delayed: 44.8, aggressive: 12.0 },
  { year: 2045, base: 12.0, delayed: 26.0, aggressive: 5.0 },
  { year: 2050, base: 2.5, delayed: 12.0, aggressive: 1.2 },
];

// ── Vessel Groups for GFI Breakdown ─────────────────────────
export const VESSEL_GROUPS: VesselGroup[] = [
  { name: "Capesize Bulkers", count: 5, currentGfi: 89.6, gfi2030: 71.5, compliant2030: true },
  { name: "Panamax Containers", count: 4, currentGfi: 72.4, gfi2030: 58.1, compliant2030: true },
  { name: "MR Tankers", count: 2, currentGfi: 91.2, gfi2030: 80.2, compliant2030: false },
  { name: "Methanol Feeder", count: 1, currentGfi: 38.2, gfi2030: 22.4, compliant2030: true },
];

// ── Default States ──────────────────────────────────────────
export const DEFAULT_FUEL_MIX: FuelMix = {
  hfo: 55,
  vlsfo: 15,
  lng: 12,
  biofuel: 10,
  methanol: 5,
  ammonia: 3,
};

export const DEFAULT_VIEW_STATE: MapViewState = {
  latitude: 15,
  longitude: 70,
  zoom: 1.5,
  bearing: 0,
  pitch: 0,
};

export const DEFAULT_LAYER_VISIBILITY: LayerVisibility = {
  biofuel: true,
  methanol: true,
  ammonia: true,
  lng: true,
  vessels: false,
  corridors: true,
};

// ── Map Style ───────────────────────────────────────────────
export const CARTO_DARK_BASEMAP =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// ── Sparkline Mock Data ──────────────────────────────────────
export const SPARKLINE_PORTS = [18, 22, 25, 30, 34, 38, 42, 45, 48, 50, 52, 52];
export const SPARKLINE_VESSELS = [120, 180, 220, 280, 310, 350, 380, 400, 430, 460, 480, 487];
export const SPARKLINE_CII = [3.8, 3.6, 3.5, 3.3, 3.2, 3.1, 3.0, 2.9, 2.9, 2.8, 2.8, 2.7];
export const SPARKLINE_CO2 = [-5, -7, -9, -11, -13, -15, -16, -18, -19, -21, -22, -23];

// ── Port / Corridor Sizing ───────────────────────────────────
export const PORT_MARKER_RADIUS = 18000;
export const VESSEL_MARKER_RADIUS = 10000;
export const ARC_WIDTH = 2;

export const CORRIDOR_COLORS: Record<string, [number, number, number]> = {
  fully_operational: [34, 197, 94],   // green
  active: [34, 197, 94],              // legacy alias
  bunkering_available: [59, 130, 246], // blue
  announced: [250, 204, 21],          // yellow
  proposed: [156, 163, 175],          // gray
};
