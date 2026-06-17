"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Port, FuelAvailability } from "@/types";
import { FUEL_COLORS, FUEL_LABELS, FUEL_ICONS } from "@/lib/constants";
import { formatUSD } from "@/lib/calculations";
import { X, MapPin, Ship, Leaf } from "lucide-react";

interface PortDetailPanelProps {
  port: Port | null;
  onClose: () => void;
}

function FuelStatusBadge({ fuel }: { fuel: FuelAvailability }) {
  const statusConfig = {
    available: { label: "Available", bg: "bg-green-900/40", text: "text-green-400", dot: "bg-green-400" },
    pilot: { label: `Pilot ${fuel.plannedYear || ""}`, bg: "bg-yellow-900/40", text: "text-yellow-400", dot: "bg-yellow-400" },
    planned: { label: `Planned ${fuel.plannedYear || ""}`, bg: "bg-gray-800/40", text: "text-gray-400", dot: "bg-gray-500" },
  };

  const config = statusConfig[fuel.status];

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-ocean-900/50 border border-ocean-800/30">
      <div className="flex items-center gap-2.5">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: FUEL_COLORS[fuel.fuelType] }}
        />
        <div>
          <p className="text-xs font-medium text-white">{FUEL_LABELS[fuel.fuelType]}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            <span className={`text-[10px] ${config.text}`}>{config.label}</span>
          </div>
        </div>
      </div>
      {fuel.estimatedPrice ? (
        <span className="text-xs text-gray-300 font-mono">{formatUSD(fuel.estimatedPrice)}/t</span>
      ) : (
        <span className="text-[10px] text-gray-600">N/A</span>
      )}
    </div>
  );
}

export default function PortDetailPanel({ port, onClose }: PortDetailPanelProps) {
  return (
    <AnimatePresence>
      {port && (
        <motion.div
          key={port.id}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute right-0 top-0 h-full w-80 bg-ocean-950/95 backdrop-blur-xl border-l border-ocean-800/50 z-30 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-ocean-800/30">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">{port.name}</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-400">{port.country}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-ocean-800/50 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {port.isGreenCorridor && (
              <div className="flex items-center gap-1.5 mt-2.5 px-2 py-1 bg-green-900/20 border border-green-800/30 rounded-md">
                <Leaf className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-green-400 font-medium">
                  Green Corridor: {port.corridorName}
                </span>
              </div>
            )}
          </div>

          {/* Fuel Availability */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-medium">
              Available Fuels
            </h3>
            <div className="flex flex-col gap-1.5">
              {port.fuels.map((fuel) => (
                <FuelStatusBadge key={fuel.fuelType} fuel={fuel} />
              ))}
            </div>

            {/* Suppliers */}
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mt-5 mb-2 font-medium">
              Suppliers
            </h3>
            <div className="flex flex-col gap-1">
              {port.suppliers.map((supplier) => (
                <div
                  key={supplier}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ocean-900/30 border border-ocean-800/20"
                >
                  <Ship className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-300">{supplier}</span>
                </div>
              ))}
            </div>

            {/* Coordinates */}
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mt-5 mb-2 font-medium">
              Location
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              {port.lat.toFixed(4)}°, {port.lng.toFixed(4)}°
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
