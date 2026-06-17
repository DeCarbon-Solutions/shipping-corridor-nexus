"use client";

import type { Vessel } from "@/types";
import { CII_COLORS, FUEL_LABELS } from "@/lib/constants";

interface VesselTooltipProps {
  vessel: Vessel;
  x: number;
  y: number;
}

export default function VesselTooltip({ vessel, x, y }: VesselTooltipProps) {
  return (
    <div
      className="fixed pointer-events-none z-50 bg-ocean-950/95 backdrop-blur-md border border-ocean-700/50 rounded-lg px-3 py-2.5 shadow-xl"
      style={{
        left: x + 12,
        top: y - 12,
        maxWidth: 240,
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: CII_COLORS[vessel.ciiRating] }}
        />
        <span className="text-xs font-semibold text-white truncate">{vessel.name}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
        <span className="text-gray-500">Type</span>
        <span className="text-gray-300 capitalize">{vessel.type}</span>

        <span className="text-gray-500">DWT</span>
        <span className="text-gray-300">{vessel.dwt.toLocaleString()}</span>

        <span className="text-gray-500">Fuel</span>
        <span className="text-gray-300">{FUEL_LABELS[vessel.fuelType]}</span>

        <span className="text-gray-500">CII Rating</span>
        <span className="font-semibold" style={{ color: CII_COLORS[vessel.ciiRating] }}>
          {vessel.ciiRating}
        </span>

        <span className="text-gray-500">EEXI</span>
        <span className="text-gray-300">{vessel.eexiRating}</span>

        {vessel.ecaZone && (
          <>
            <span className="text-gray-500">ECA Zone</span>
            <span className="text-gray-300">{vessel.ecaZone}</span>
          </>
        )}
      </div>
    </div>
  );
}
