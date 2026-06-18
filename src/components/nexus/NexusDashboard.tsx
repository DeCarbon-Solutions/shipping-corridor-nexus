"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import type { Port, Vessel, GreenCorridor, FleetVessel, LayerVisibility, VesselType } from "@/types";
import {
  SAMPLE_FLEET, ROUTE_CORRIDOR_MATCHES, GFI_TRAJECTORY,
  IMO_GFI_TARGETS, DEFAULT_LAYER_VISIBILITY,
  CII_COLORS, FUEL_COLORS, FUEL_LABELS,
} from "@/lib/constants";
import {
  calculateFleetGFI,
  calculateFleetCO2Tons,
  getFleetCIIDistribution,
  getFleetAvgCIIRating,
  getHFOVLSFOPercent,
} from "@/lib/calculations";

const GlobeMap = dynamic(() => import("@/components/globe/GlobeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-ocean-950">
      <div className="loading-spinner" />
    </div>
  ),
});

// CSV template column headers
const CSV_HEADERS = [
  "Vessel Name",
  "IMO Number",
  "Vessel Type",
  "DWT",
  "Built Year",
  "Engine Power kW",
  "Primary Fuel",
  "Annual Consumption Tons",
  "Annual Distance Nm",
  "Primary Route",
  "CII Rating",
  "GFI gCO2eq/MJ",
];

const FUEL_MAP: Record<string, FleetVessel["fuelType"]> = {
  hfo: "hfo", "heavy fuel oil": "hfo",
  vlsfo: "vlsfo", "very low sulphur fuel oil": "vlsfo",
  mgo: "vlsfo",
  lng: "lng", "liquefied natural gas": "lng",
  biofuel: "biofuel", "bio-vlsfo": "biofuel", biodiesel: "biofuel",
  methanol: "methanol",
  ammonia: "ammonia",
};

const TYPE_MAP: Record<string, FleetVessel["type"]> = {
  bulk: "bulk", "bulk carrier": "bulk",
  container: "container", "container ship": "container",
  tanker: "tanker",
  roro: "roro", "ro-ro": "roro",
};

interface NexusDashboardProps {
  ports: Port[];
  vessels: Vessel[];
  corridors: GreenCorridor[];
}

export default function NexusDashboard({ ports, vessels, corridors }: NexusDashboardProps) {
  const [fleet, setFleet] = useState<FleetVessel[]>(SAMPLE_FLEET);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    ...DEFAULT_LAYER_VISIBILITY,
    corridors: true,
    vessels: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fleet metrics
  const fleetGFI = calculateFleetGFI(fleet);
  const co2k = Math.round(calculateFleetCO2Tons(fleet) / 1000);
  const avgCII = getFleetAvgCIIRating(fleet);
  const hfoVlsfo = Math.round(getHFOVLSFOPercent(fleet));
  const gap2030 = Math.max(0, fleetGFI - IMO_GFI_TARGETS[2030]);
  const ciiDist = getFleetCIIDistribution(fleet);
  const onTrack = gap2030 === 0;

  const matchCount = ROUTE_CORRIDOR_MATCHES.filter((m) => m.hasMatch).length;
  const operationalCount = corridors.filter(
    (c) => c.status === "fully_operational" || c.status === "active"
  ).length;

  function downloadTemplate() {
    const sampleRows = SAMPLE_FLEET.slice(0, 3).map((v) =>
      [
        v.name, v.imoNumber, v.type, v.dwt, v.builtYear,
        v.mainEnginePowerKw, v.fuelType, v.annualConsumptionTons,
        v.annualDistanceNm, v.primaryRoute, v.ciiRating, v.gfi,
      ].join(",")
    );
    const csv = [CSV_HEADERS.join(","), ...sampleRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shipping_corridor_nexus_fleet_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function parseCSV(text: string) {
    const lines = text.trim().split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) {
      setImportMsg("CSV must have a header row and at least one data row.");
      return;
    }
    const parsed: FleetVessel[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      if (cols.length < 10) continue;
      const fuelKey = cols[6]?.toLowerCase() ?? "";
      const typeKey = cols[2]?.toLowerCase() ?? "";
      const ciiRaw = cols[10]?.toUpperCase();
      parsed.push({
        id: `csv_${i}_${Date.now()}`,
        name: cols[0] || `Vessel ${i}`,
        imoNumber: cols[1] || "0000000",
        type: TYPE_MAP[typeKey] ?? "bulk",
        dwt: parseInt(cols[3]) || 0,
        builtYear: parseInt(cols[4]) || 2010,
        mainEnginePowerKw: parseInt(cols[5]) || 10000,
        fuelType: FUEL_MAP[fuelKey] ?? "hfo",
        annualConsumptionTons: parseFloat(cols[7]) || 5000,
        annualDistanceNm: parseFloat(cols[8]) || 60000,
        primaryRoute: cols[9] || "Unknown",
        ciiRating: (["A", "B", "C", "D", "E"].includes(ciiRaw) ? ciiRaw : "C") as FleetVessel["ciiRating"],
        gfi: parseFloat(cols[11]) || 91.16,
      });
    }
    if (parsed.length === 0) {
      setImportMsg("No valid vessel rows found. Check the template format.");
      return;
    }
    setFleet(parsed);
    setImportMsg(`✓ Imported ${parsed.length} vessels`);
    setTimeout(() => setImportMsg(null), 4000);
  }

  function handleFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      setImportMsg("Please upload a .csv file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => parseCSV(e.target?.result as string);
    reader.readAsText(file);
  }

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-ocean-950 text-gray-200">
      {/* ── Header ── */}
      <header className="shrink-0 bg-ocean-900/95 backdrop-blur-md border-b border-ocean-800/40 px-5 py-2.5 flex items-center gap-5 z-20">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-lg">🌊</span>
          <div className="leading-tight">
            <div className="text-sm font-bold text-white tracking-tight">Shipping Corridor Nexus</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest">Fleet GFI · Corridor Coverage · Compliance</div>
          </div>
        </div>

        <div className="w-px h-8 bg-ocean-700/40 shrink-0" />

        {/* KPI strip */}
        <div className="flex items-center gap-4 flex-1 overflow-x-auto">
          <KpiChip label="Vessels" value={`${fleet.length}`} />
          <Sep />
          <KpiChip
            label="Fleet GFI"
            value={`${fleetGFI.toFixed(1)}`}
            sub="gCO₂eq/MJ"
            color={fleetGFI > 85 ? "#EF4444" : fleetGFI > 72.93 ? "#F97316" : "#22C55E"}
          />
          <Sep />
          <KpiChip label="Avg CII" value={avgCII} color={CII_COLORS[avgCII]} />
          <Sep />
          <KpiChip label="CO₂/yr" value={`${co2k}k`} sub="t" />
          <Sep />
          <KpiChip
            label="2030 Gap"
            value={gap2030 > 0 ? `${gap2030.toFixed(1)}` : "✓"}
            sub={gap2030 > 0 ? "gCO₂eq/MJ" : "On Track"}
            color={gap2030 > 0 ? "#EF4444" : "#22C55E"}
          />
          <Sep />
          <KpiChip
            label="HFO+VLSFO"
            value={`${hfoVlsfo}%`}
            color={hfoVlsfo > 60 ? "#F97316" : "#9CA3AF"}
          />
          <Sep />
          <KpiChip
            label="Corridors"
            value={`${matchCount}/${ROUTE_CORRIDOR_MATCHES.length}`}
            sub="routes covered"
            color={matchCount >= 3 ? "#22C55E" : "#FACC15"}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {importMsg && (
            <span
              className={`text-[11px] px-2.5 py-1 rounded-lg ${
                importMsg.startsWith("✓")
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {importMsg}
            </span>
          )}
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-gray-400 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg border border-ocean-700/30 transition-colors"
          >
            📥 Template CSV
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-white font-medium bg-ocean-600/80 hover:bg-ocean-500/80 rounded-lg border border-ocean-500/50 transition-colors"
          >
            📂 Import Fleet CSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
        </div>
      </header>

      {/* ── Main ── */}
      <div className="flex-1 overflow-hidden flex min-h-0">
        {/* Left: Globe map */}
        <div className="relative flex-1 h-full min-w-0">
          <GlobeMap
            ports={ports}
            vessels={vessels}
            corridors={corridors}
            layerVisibility={layerVisibility}
            onToggleLayer={(layer) =>
              setLayerVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }))
            }
            vesselFilter="all"
            onVesselFilterChange={() => {}}
            onPortClick={() => {}}
          />

          {/* Corridor legend overlay — bottom-left */}
          <div className="absolute bottom-4 left-4 z-10 bg-ocean-950/92 backdrop-blur-md border border-ocean-800/40 rounded-xl p-3.5 pointer-events-none">
            <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-semibold">
              Corridor Stage
            </p>
            {[
              { color: "bg-green-500", label: "Fully Operational" },
              { color: "bg-blue-500", label: "Bunkering Available" },
              { color: "bg-yellow-400", label: "Announced" },
              { color: "bg-gray-500", label: "Proposed" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <div className={`w-5 h-1.5 rounded-full ${item.color}`} />
                <span className="text-[11px] text-gray-400">{item.label}</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-ocean-800/40 space-y-0.5">
              <div className="text-[10px] text-gray-500">
                <span className="text-white font-semibold">{operationalCount}</span> operational ·{" "}
                <span className="text-white font-semibold">{corridors.length}</span> total
              </div>
            </div>
          </div>
        </div>

        {/* Right: Data panel */}
        <div className="w-[390px] shrink-0 flex flex-col border-l border-ocean-800/40 overflow-y-auto bg-ocean-950/60 backdrop-blur-sm">

          {/* Route Coverage */}
          <section className="p-4 border-b border-ocean-800/25">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Route vs Corridor Coverage</SectionTitle>
              <span className="text-[10px] text-gray-500 tabular-nums">
                {matchCount}/{ROUTE_CORRIDOR_MATCHES.length} matched
              </span>
            </div>
            <div className="space-y-2">
              {ROUTE_CORRIDOR_MATCHES.map((m) => {
                const stageColor =
                  m.stage === "fully_operational" ? "text-green-400" :
                  m.stage === "bunkering_available" ? "text-blue-400" :
                  m.stage === "announced" ? "text-yellow-400" : "text-gray-400";
                const gapColor =
                  m.fuelGap === "Low" ? "text-green-400" :
                  m.fuelGap === "Medium" ? "text-yellow-400" : "text-red-400";
                return (
                  <div key={m.route} className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 w-[148px] shrink-0 truncate">{m.route}</span>
                    {m.hasMatch ? (
                      <span className={`flex items-center gap-1 flex-1 min-w-0 ${stageColor}`}>
                        <span className="shrink-0">✓</span>
                        <span className="truncate text-[11px]">{m.corridorName}</span>
                      </span>
                    ) : (
                      <span className="flex-1 text-red-400 text-[11px]">✗ No corridor</span>
                    )}
                    <span className={`text-[10px] font-semibold shrink-0 w-14 text-right ${gapColor}`}>
                      {m.fuelGap} gap
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* GFI Trajectory */}
          <section className="p-4 border-b border-ocean-800/25">
            <div className="flex items-center justify-between mb-2">
              <SectionTitle>Fleet GFI Trajectory</SectionTitle>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  onTrack ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {onTrack ? "On Track 2030" : `Gap: ${gap2030.toFixed(1)} gCO₂eq/MJ`}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={175}>
              <LineChart
                data={GFI_TRAJECTORY}
                margin={{ top: 8, right: 6, bottom: 0, left: -22 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f30" />
                <XAxis
                  dataKey="year" type="number"
                  domain={[2024, 2050]}
                  ticks={[2024, 2030, 2035, 2040, 2050]}
                  tick={{ fill: "#6B7280", fontSize: 9 }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  domain={[0, 95]}
                  ticks={[0, 50, 72.93, 91.16]}
                  tick={{ fill: "#6B7280", fontSize: 9 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => v.toFixed(0)}
                />
                <ReferenceLine
                  y={IMO_GFI_TARGETS[2030]}
                  stroke="#EF444470" strokeDasharray="3 3"
                  label={{ value: "2030", position: "right", fill: "#EF4444", fontSize: 8 }}
                />
                <ReferenceLine
                  y={IMO_GFI_TARGETS[2035]}
                  stroke="#EF444440" strokeDasharray="3 3"
                  label={{ value: "2035", position: "right", fill: "#EF4444", fontSize: 8 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0A2240", border: "1px solid #1e3a5f",
                    borderRadius: "6px", fontSize: "10px",
                  }}
                  formatter={(v: any) => [`${(+v).toFixed(1)} gCO₂eq/MJ`]}
                  labelFormatter={(yr) => `Year ${yr}`}
                />
                <Line type="monotone" dataKey="base" stroke="#22D3EE" strokeWidth={2} dot={false} name="Base Case" />
                <Line type="monotone" dataKey="aggressive" stroke="#4ADE80" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Aggressive" />
                <Line type="monotone" dataKey="delayed" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Delayed" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-1">
              {[
                { color: "#22D3EE", label: "Base Case" },
                { color: "#4ADE80", label: "Aggressive NZF" },
                { color: "#94A3B8", label: "Delayed" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded" style={{ background: l.color }} />
                  <span className="text-[9px] text-gray-500">{l.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CII Distribution */}
          <section className="p-4 border-b border-ocean-800/25">
            <SectionTitle>CII Distribution</SectionTitle>
            <div className="mt-3 space-y-2">
              {(["A", "B", "C", "D", "E"] as const).map((r) => {
                const count = ciiDist[r];
                const maxCount = Math.max(...Object.values(ciiDist), 1);
                return (
                  <div key={r} className="flex items-center gap-2.5">
                    <span
                      className="w-5 text-xs font-bold tabular-nums"
                      style={{ color: CII_COLORS[r] }}
                    >
                      {r}
                    </span>
                    <div className="flex-1 h-2 bg-ocean-800/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(count / maxCount) * 100}%`,
                          background: CII_COLORS[r],
                        }}
                      />
                    </div>
                    <span className="w-5 text-right text-xs text-gray-400 tabular-nums">{count}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Fleet Vessel List */}
          <section className="p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Fleet — {fleet.length} Vessels</SectionTitle>
              <span className="text-[9px] text-gray-600 uppercase tracking-wider">CII · GFI</span>
            </div>
            <div className="space-y-1">
              {fleet.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-ocean-900/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white truncate">{v.name}</div>
                    <div className="text-[10px] text-gray-500 capitalize">
                      {v.type} · {v.dwt.toLocaleString()} DWT
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{
                      background: CII_COLORS[v.ciiRating] + "28",
                      color: CII_COLORS[v.ciiRating],
                    }}
                  >
                    {v.ciiRating}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded shrink-0 tabular-nums"
                    style={{
                      background: FUEL_COLORS[v.fuelType] + "20",
                      color: FUEL_COLORS[v.fuelType],
                    }}
                  >
                    {FUEL_LABELS[v.fuelType]}
                  </span>
                  <span className="text-[10px] text-gray-500 tabular-nums w-9 text-right shrink-0">
                    {v.gfi.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function KpiChip({
  label, value, sub, color,
}: {
  label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="flex flex-col gap-0 shrink-0">
      <span className="text-[9px] uppercase tracking-widest text-gray-500 leading-none mb-0.5">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span
          className="text-sm font-bold leading-none tabular-nums"
          style={{ color: color ?? "#F9FAFB" }}
        >
          {value}
        </span>
        {sub && <span className="text-[9px] text-gray-500 leading-none">{sub}</span>}
      </div>
    </div>
  );
}

function Sep() {
  return <div className="w-px h-6 bg-ocean-700/40 shrink-0" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
      {children}
    </h3>
  );
}
