"use client";

import dynamic from "next/dynamic";
import type { Port, Vessel, GreenCorridor, LayerVisibility, VesselType, CorridorStatus } from "@/types";
import { DEFAULT_LAYER_VISIBILITY, ROUTE_CORRIDOR_MATCHES } from "@/lib/constants";
import { useState } from "react";

const GlobeMap = dynamic(() => import("@/components/globe/GlobeMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-ocean-950">
      <div className="loading-spinner" />
    </div>
  ),
});

const STAGE_LABELS: Record<CorridorStatus, string> = {
  fully_operational: "Fully Operational",
  active: "Fully Operational",
  bunkering_available: "Bunkering Available",
  announced: "Announced",
  proposed: "Proposed",
};

const STAGE_COLORS: Record<string, { dot: string; text: string; bg: string }> = {
  fully_operational: { dot: "bg-green-500", text: "text-green-400", bg: "bg-green-500/10" },
  active:            { dot: "bg-green-500", text: "text-green-400", bg: "bg-green-500/10" },
  bunkering_available: { dot: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10" },
  announced:         { dot: "bg-yellow-400", text: "text-yellow-400", bg: "bg-yellow-500/10" },
  proposed:          { dot: "bg-gray-500", text: "text-gray-400", bg: "bg-gray-500/10" },
  none:              { dot: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10" },
};

const FUEL_GAP_COLORS: Record<string, string> = {
  Low: "text-green-400", Medium: "text-yellow-400", High: "text-red-400",
};

interface CorridorModuleProps {
  ports: Port[];
  vessels: Vessel[];
  corridors: GreenCorridor[];
}

export default function CorridorModule({ ports, vessels, corridors }: CorridorModuleProps) {
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    ...DEFAULT_LAYER_VISIBILITY,
    vessels: false,
    corridors: true,
  });
  const [vesselFilter, setVesselFilter] = useState<VesselType | "all">("all");

  const operationalCount = corridors.filter(
    (c) => c.status === "fully_operational" || c.status === "active"
  ).length;
  const matchCount = ROUTE_CORRIDOR_MATCHES.filter((m) => m.hasMatch).length;
  const totalRoutes = ROUTE_CORRIDOR_MATCHES.length;

  return (
    <div className="flex flex-col h-full">
      {/* Map — fixed height portion */}
      <div className="relative" style={{ height: "52vh", minHeight: 340 }}>
        {/* Legend overlay */}
        <div className="absolute top-3 left-3 z-10 bg-ocean-950/90 backdrop-blur-md border border-ocean-800/40 rounded-xl p-3.5 text-xs pointer-events-none">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-medium">Corridor Stage</p>
          {[
            { color: "bg-green-500", label: "Fully Operational" },
            { color: "bg-blue-500", label: "Bunkering Available" },
            { color: "bg-yellow-400", label: "Announced" },
            { color: "bg-gray-500", label: "Proposed" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-1.5 last:mb-0">
              <div className={`w-4 h-1.5 rounded-full ${item.color} shrink-0`} />
              <span className="text-gray-400">{item.label}</span>
            </div>
          ))}
          <div className="mt-2.5 pt-2 border-t border-ocean-800/40">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-medium">Stats</p>
            <div className="text-gray-400 space-y-0.5">
              <div><span className="text-white font-semibold">{operationalCount}</span> operational corridors</div>
              <div><span className="text-white font-semibold">{corridors.length}</span> total corridors</div>
            </div>
          </div>
        </div>

        <GlobeMap
          ports={ports}
          vessels={vessels}
          corridors={corridors}
          layerVisibility={layerVisibility}
          onToggleLayer={(layer) =>
            setLayerVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }))
          }
          vesselFilter={vesselFilter}
          onVesselFilterChange={setVesselFilter}
          onPortClick={() => {}}
        />
      </div>

      {/* Route Table — scrollable */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="text-gray-400">▶</span>
            Your Routes vs Corridor Coverage
          </h3>
          <span className="text-xs text-gray-500">{matchCount} of {totalRoutes} routes covered</span>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-ocean-800/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-ocean-800/40 bg-ocean-900/60">
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Your Route</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Corridor Match</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Stage</th>
                <th className="px-4 py-3 text-left text-gray-500 font-medium">Fuel Gap</th>
              </tr>
            </thead>
            <tbody>
              {ROUTE_CORRIDOR_MATCHES.map((match, i) => {
                const stageKey = match.hasMatch ? (match.stage ?? "proposed") : "none";
                const stageStyle = STAGE_COLORS[stageKey] ?? STAGE_COLORS.none;
                return (
                  <tr key={match.route} className={`border-b border-ocean-800/20 ${i % 2 === 0 ? "" : "bg-ocean-900/10"}`}>
                    <td className="px-4 py-3 font-medium text-white">{match.route}</td>
                    <td className="px-4 py-3">
                      {match.hasMatch ? (
                        <span className={`flex items-center gap-1.5 ${stageStyle.text}`}>
                          <span>✓</span>
                          <span className="font-medium">{match.corridorName}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-400">
                          <span>✗</span>
                          <span>No Match</span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {match.hasMatch && match.stage ? (
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${stageStyle.bg} ${stageStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${stageStyle.dot}`} />
                          {STAGE_LABELS[match.stage]}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] bg-red-500/10 text-red-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          No Corridor
                        </span>
                      )}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${FUEL_GAP_COLORS[match.fuelGap]}`}>
                      {match.fuelGap}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Insight box */}
        <div className="bg-ocean-900/40 border border-ocean-700/30 rounded-xl p-4">
          <p className="text-xs text-gray-300">
            <span className="font-semibold text-white">Insight: </span>
            {matchCount} of your {totalRoutes} primary routes overlap with declared green corridors.{" "}
            <span className="text-green-400">Singapore→Rotterdam</span> is fully operational for LNG &amp; biofuel.{" "}
            <span className="text-yellow-400">Shanghai→LA and Busan→Pilbara</span> corridors announced but bunkering not yet live.{" "}
            <span className="text-red-400">Hamburg→NY and Fujairah→Mumbai</span> have no corridor coverage — full fuel gap.
          </p>
        </div>
      </div>
    </div>
  );
}
