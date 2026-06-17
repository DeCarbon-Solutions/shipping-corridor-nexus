"use client";

import type { FuelType } from "@/types";
import { FUEL_COLORS, FUEL_LABELS } from "@/lib/constants";
import { Lock, Unlock } from "lucide-react";

interface FuelSliderProps {
  fuelType: FuelType;
  value: number;
  locked: boolean;
  onChange: (value: number) => void;
  onToggleLock: () => void;
}

export default function FuelSlider({
  fuelType,
  value,
  locked,
  onChange,
  onToggleLock,
}: FuelSliderProps) {
  const color = FUEL_COLORS[fuelType];

  return (
    <div className="flex items-center gap-3 group">
      <button
        onClick={onToggleLock}
        className="p-1 rounded hover:bg-ocean-800/50 transition-colors shrink-0"
        title={locked ? "Unlock slider" : "Lock slider"}
      >
        {locked ? (
          <Lock className="w-3 h-3 text-yellow-500" />
        ) : (
          <Unlock className="w-3 h-3 text-gray-600 group-hover:text-gray-400" />
        )}
      </button>

      <div className="w-24 shrink-0">
        <span className="text-xs text-gray-300 font-medium">{FUEL_LABELS[fuelType]}</span>
      </div>

      <div className="flex-1 relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          disabled={locked}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${value}%, #1e293b ${value}%, #1e293b 100%)`,
          }}
        />
      </div>

      <span
        className="w-10 text-right text-xs font-mono tabular-nums"
        style={{ color }}
      >
        {value}%
      </span>
    </div>
  );
}
