"use client";

import type { FleetVessel } from "@/types";
import { CII_COLORS } from "@/lib/constants";
import {
  calculateFleetGFI,
  calculateFleetCO2Tons,
  getFleetAvgCIIRating,
  getHFOVLSFOPercent,
} from "@/lib/calculations";

interface FleetStatusBarProps {
  vessels: FleetVessel[];
}

export default function FleetStatusBar({ vessels }: FleetStatusBarProps) {
  const count = vessels.length;
  const avgCII = getFleetAvgCIIRating(vessels);
  const fleetGFI = calculateFleetGFI(vessels).toFixed(1);
  const co2Tons = Math.round(calculateFleetCO2Tons(vessels) / 1000);
  const hfoVlsfo = Math.round(getHFOVLSFOPercent(vessels));
  const ciiColor = CII_COLORS[avgCII];

  const gfiNum = parseFloat(fleetGFI);
  const statusOk = gfiNum <= 72.93;

  return (
    <footer className="w-full bg-ocean-900/95 backdrop-blur-md border-t border-ocean-800/40 z-30 shrink-0">
      <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center gap-6 overflow-x-auto text-xs">
        <Chip icon="🚢" label="Fleet">
          <span className="font-semibold text-white tabular-nums">{count}</span>
          <span className="text-gray-500 ml-1">vessels</span>
        </Chip>

        <div className="w-px h-4 bg-ocean-700/60 shrink-0" />

        <Chip icon="📊" label="Avg CII">
          <span
            className="font-semibold tabular-nums px-1.5 py-0.5 rounded text-[11px]"
            style={{ background: ciiColor + "30", color: ciiColor }}
          >
            {avgCII}
          </span>
        </Chip>

        <div className="w-px h-4 bg-ocean-700/60 shrink-0" />

        <Chip icon="🌱" label="Fleet GFI">
          <span className="font-semibold text-white tabular-nums">{fleetGFI}</span>
          <span className="text-gray-500 ml-1">gCO₂eq/MJ</span>
        </Chip>

        <div className="w-px h-4 bg-ocean-700/60 shrink-0" />

        <Chip icon="☁️" label="CO₂/yr">
          <span className="font-semibold text-white tabular-nums">{co2Tons}k</span>
          <span className="text-gray-500 ml-1">tons</span>
        </Chip>

        <div className="w-px h-4 bg-ocean-700/60 shrink-0" />

        <Chip icon="⛽" label="HFO/VLSFO">
          <span className="font-semibold text-white tabular-nums">{hfoVlsfo}%</span>
        </Chip>

        <div className="flex-1" />

        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
          statusOk
            ? "bg-green-500/15 text-green-400"
            : "bg-amber-500/15 text-amber-400"
        }`}>
          <span>{statusOk ? "✓" : "⚠"}</span>
          <span>{statusOk ? "On Track" : "Action Required"}</span>
        </div>
      </div>
    </footer>
  );
}

function Chip({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span>{icon}</span>
      <span className="text-gray-500 hidden lg:inline">{label}:</span>
      <span className="flex items-center gap-0.5">{children}</span>
    </div>
  );
}
