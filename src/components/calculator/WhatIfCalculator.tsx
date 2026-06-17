"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FuelMix, FuelType, FuelEmissionFactor } from "@/types";
import { FUEL_LABELS, DEFAULT_FUEL_MIX } from "@/lib/constants";
import { calculateWhatIf, redistributeFuelMix, formatPercent } from "@/lib/calculations";
import { buildShareURL } from "@/lib/url-state";
import FuelSlider from "./FuelSlider";
import ResultsChart from "./ResultsChart";
import ComplianceBadge from "./ComplianceBadge";
import { ChevronUp, ChevronDown, Share2, RotateCcw, Leaf, DollarSign } from "lucide-react";

const FUEL_ORDER: FuelType[] = ["hfo", "vlsfo", "lng", "biofuel", "methanol", "ammonia"];

interface WhatIfCalculatorProps {
  fuelMix: FuelMix;
  onFuelMixChange: (mix: FuelMix) => void;
  fuelFactors: FuelEmissionFactor[];
  initialExpanded?: boolean;
}

export default function WhatIfCalculator({
  fuelMix,
  onFuelMixChange,
  fuelFactors,
  initialExpanded = false,
}: WhatIfCalculatorProps) {
  const [expanded, setExpanded] = useState(initialExpanded);
  const [lockedFuels, setLockedFuels] = useState<Set<FuelType>>(new Set());
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => calculateWhatIf(fuelMix, fuelFactors),
    [fuelMix, fuelFactors]
  );

  const handleSliderChange = useCallback(
    (fuelType: FuelType, newValue: number) => {
      const newMix = redistributeFuelMix(fuelMix, fuelType, newValue, lockedFuels);
      onFuelMixChange(newMix);
    },
    [fuelMix, lockedFuels, onFuelMixChange]
  );

  const handleToggleLock = useCallback((fuelType: FuelType) => {
    setLockedFuels((prev) => {
      const next = new Set(prev);
      if (next.has(fuelType)) {
        next.delete(fuelType);
      } else {
        next.add(fuelType);
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    onFuelMixChange({ ...DEFAULT_FUEL_MIX });
    setLockedFuels(new Set());
  }, [onFuelMixChange]);

  const handleShare = useCallback(async () => {
    const url = buildShareURL(fuelMix);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fuelMix]);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      {/* Collapsed bar */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-ocean-950/95 backdrop-blur-xl border-t border-ocean-800/50 px-4 py-2 flex items-center justify-between hover:bg-ocean-900/90 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-white tracking-tight">
            What-If Fuel Mix
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Leaf className="w-3 h-3 text-green-400" />
              CO₂ {formatPercent(-result.co2ReductionPercent)}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-yellow-400" />
              Cost {formatPercent(result.costDeltaPercent)}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Expanded drawer */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="overflow-hidden bg-ocean-950/95 backdrop-blur-xl border-t border-ocean-800/30"
          >
            <div className="p-4 max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sliders */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-medium">
                    Fuel Mix Scenario
                  </h3>
                  <div className="flex flex-col gap-2">
                    {FUEL_ORDER.map((ft) => (
                      <FuelSlider
                        key={ft}
                        fuelType={ft}
                        value={fuelMix[ft]}
                        locked={lockedFuels.has(ft)}
                        onChange={(v) => handleSliderChange(ft, v)}
                        onToggleLock={() => handleToggleLock(ft)}
                      />
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean-800/60 hover:bg-ocean-700/60 rounded-md text-xs text-gray-300 transition-colors"
                    >
                      <Share2 className="w-3 h-3" />
                      {copied ? "Copied!" : "Share Scenario"}
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean-800/40 hover:bg-ocean-700/40 rounded-md text-xs text-gray-400 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-medium">
                    Results
                  </h3>

                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-ocean-900/50 border border-ocean-800/30 rounded-lg p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                        CO₂ Reduction
                      </p>
                      <p className="text-xl font-bold text-green-400 tabular-nums">
                        {formatPercent(result.co2ReductionPercent, false)}
                      </p>
                    </div>
                    <div className="bg-ocean-900/50 border border-ocean-800/30 rounded-lg p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                        Cost Delta
                      </p>
                      <p
                        className={`text-xl font-bold tabular-nums ${
                          result.costDeltaPercent > 0 ? "text-yellow-400" : "text-green-400"
                        }`}
                      >
                        {formatPercent(result.costDeltaPercent)}
                      </p>
                    </div>
                  </div>

                  {/* Charts */}
                  <ResultsChart fuelMix={fuelMix} />

                  {/* IMO compliance badges */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <ComplianceBadge
                      label="IMO 2030"
                      compliant={result.imo2030Compliant}
                      targetPercent={20}
                      currentPercent={result.co2ReductionPercent * 100}
                    />
                    <ComplianceBadge
                      label="IMO 2050"
                      compliant={result.imo2050Compliant}
                      targetPercent={70}
                      currentPercent={result.co2ReductionPercent * 100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
