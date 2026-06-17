"use client";

import type { FuelType, LayerVisibility, VesselType } from "@/types";
import { FUEL_COLORS, FUEL_LABELS, FUEL_ICONS } from "@/lib/constants";
import { Ship, Eye, EyeOff } from "lucide-react";

interface MapControlsProps {
  layerVisibility: LayerVisibility;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
  vesselFilter: VesselType | "all";
  onVesselFilterChange: (type: VesselType | "all") => void;
}

const FUEL_TOGGLES: (keyof LayerVisibility)[] = ["biofuel", "methanol", "ammonia", "lng"];

const VESSEL_TYPES: { value: VesselType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "container", label: "Container" },
  { value: "bulk", label: "Bulk Carrier" },
  { value: "tanker", label: "Tanker" },
  { value: "roro", label: "RoRo" },
];

export default function MapControls({
  layerVisibility,
  onToggleLayer,
  vesselFilter,
  onVesselFilterChange,
}: MapControlsProps) {
  return (
    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
      {/* Fuel type toggles */}
      <div className="bg-ocean-950/90 backdrop-blur-md rounded-lg border border-ocean-800/50 p-3">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-medium">
          Fuel Layers
        </p>
        <div className="flex flex-col gap-1.5">
          {FUEL_TOGGLES.map((fuel) => (
            <button
              key={fuel}
              onClick={() => onToggleLayer(fuel)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                layerVisibility[fuel]
                  ? "bg-ocean-800/60 text-white"
                  : "bg-transparent text-gray-500 hover:text-gray-400"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: layerVisibility[fuel] ? FUEL_COLORS[fuel as FuelType] : "#374151",
                }}
              />
              <span>{FUEL_LABELS[fuel as FuelType]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vessel overlay toggle */}
      <div className="bg-ocean-950/90 backdrop-blur-md rounded-lg border border-ocean-800/50 p-3">
        <button
          onClick={() => onToggleLayer("vessels")}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium w-full transition-all ${
            layerVisibility.vessels
              ? "bg-ocean-800/60 text-white"
              : "bg-transparent text-gray-500 hover:text-gray-400"
          }`}
        >
          <Ship className="w-3.5 h-3.5" />
          <span>Vessels</span>
          {layerVisibility.vessels ? (
            <Eye className="w-3 h-3 ml-auto text-fuel-biofuel" />
          ) : (
            <EyeOff className="w-3 h-3 ml-auto" />
          )}
        </button>

        {layerVisibility.vessels && (
          <div className="mt-2 pt-2 border-t border-ocean-800/50">
            <select
              value={vesselFilter}
              onChange={(e) => onVesselFilterChange(e.target.value as VesselType | "all")}
              className="w-full bg-ocean-900 border border-ocean-800 rounded text-xs text-gray-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-ocean-500"
            >
              {VESSEL_TYPES.map((vt) => (
                <option key={vt.value} value={vt.value}>
                  {vt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Corridor toggle */}
      <div className="bg-ocean-950/90 backdrop-blur-md rounded-lg border border-ocean-800/50 p-3">
        <button
          onClick={() => onToggleLayer("corridors")}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium w-full transition-all ${
            layerVisibility.corridors
              ? "bg-ocean-800/60 text-white"
              : "bg-transparent text-gray-500 hover:text-gray-400"
          }`}
        >
          <span className="text-sm">〰️</span>
          <span>Green Corridors</span>
          {layerVisibility.corridors ? (
            <Eye className="w-3 h-3 ml-auto text-fuel-biofuel" />
          ) : (
            <EyeOff className="w-3 h-3 ml-auto" />
          )}
        </button>
      </div>
    </div>
  );
}
