"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip,
} from "recharts";
import type { ScenarioType, FuelType } from "@/types";
import { SCENARIOS, FUEL_COLORS, FUEL_LABELS } from "@/lib/constants";
import { formatMillions } from "@/lib/calculations";

const SCENARIO_COLORS: Record<ScenarioType, string> = {
  base: "#0D9488",
  delayed: "#6B7280",
  aggressive: "#16A34A",
};

const FUEL_ORDER: FuelType[] = ["hfo", "vlsfo", "lng", "biofuel", "methanol", "ammonia"];
const EVOLUTION_YEARS = [2024, 2028, 2030, 2035];

export default function ScenarioComparison() {
  const [active, setActive] = useState<Set<ScenarioType>>(
    new Set(["base", "delayed", "aggressive"])
  );

  function toggleScenario(type: ScenarioType) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(type)) { if (next.size > 1) next.delete(type); }
      else next.add(type);
      return next;
    });
  }

  const visibleScenarios = SCENARIOS.filter((s) => active.has(s.type));

  return (
    <div className="flex flex-col gap-8 p-5">
      {/* Header + toggle pills */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold text-white mr-2">Scenario Comparison</h2>
        {SCENARIOS.map((s) => (
          <button
            key={s.type}
            onClick={() => toggleScenario(s.type)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              active.has(s.type)
                ? "border-transparent text-white"
                : "border-ocean-700/50 text-gray-500 bg-transparent"
            }`}
            style={active.has(s.type) ? { background: s.headerColor + "40", borderColor: s.headerColor + "80", color: s.headerColor } : {}}
          >
            {active.has(s.type) && <span>✓</span>}
            {s.name}
          </button>
        ))}
      </div>

      {/* Cost Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visibleScenarios.map((scenario) => (
          <div
            key={scenario.type}
            className="rounded-xl border border-ocean-800/40 overflow-hidden"
          >
            {/* Card Header */}
            <div
              className="px-4 py-3 text-center font-semibold text-sm text-white"
              style={{ background: scenario.headerColor }}
            >
              {scenario.name}
            </div>

            {/* Cost rows */}
            <div className="divide-y divide-ocean-800/20 bg-ocean-900/30">
              {scenario.costs.slice(0, 4).map((cost) => (
                <div key={cost.year} className="px-4 py-3 flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{cost.year}:</span>
                      <span className="text-sm font-bold text-white">{formatMillions(cost.total)}</span>
                      {cost.total > 0 && (
                        <span
                          className="text-xs font-semibold ml-auto"
                          style={{ color: scenario.headerColor }}
                        >
                          {formatMillions(cost.euEts)}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500 space-y-0.5">
                      <div className="flex justify-between">
                        <span>EU ETS:</span><span className="text-gray-400">{formatMillions(cost.euEts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FuelEU:</span><span className="text-gray-400">{formatMillions(cost.fuelEu)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IMO Levy:</span><span className="text-gray-400">{formatMillions(cost.imoLevy)}</span>
                      </div>
                    </div>
                  </div>
                  {/* Mini bar */}
                  <div className="flex flex-col gap-0.5 justify-end shrink-0 w-16 h-10 mt-1">
                    {[
                      { val: cost.euEts, color: "#3B82F6" },
                      { val: cost.fuelEu, color: "#22C55E" },
                      { val: cost.imoLevy, color: "#F97316" },
                    ].map((bar, bi) => (
                      <div
                        key={bi}
                        className="rounded-sm"
                        style={{
                          height: `${Math.max(3, (bar.val / cost.total) * 32)}px`,
                          background: bar.color,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total 2030 */}
            <div
              className="px-4 py-3 text-center"
              style={{ background: scenario.headerColor + "20" }}
            >
              <span className="text-xs text-gray-400">Total 2030 Cost: </span>
              <span className="text-sm font-bold text-white">{formatMillions(scenario.totalCost2030)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fleet Fuel Mix Evolution */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Fleet Fuel Mix Evolution</h3>
        <div className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl p-4">
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            {FUEL_ORDER.map((ft) => (
              <div key={ft} className="flex items-center gap-1.5">
                <div className="w-3 h-2 rounded-sm" style={{ background: FUEL_COLORS[ft] }} />
                <span className="text-[10px] text-gray-400">{FUEL_LABELS[ft]}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {visibleScenarios.map((scenario) => (
              <div key={scenario.type}>
                <p className="text-[11px] text-gray-400 mb-2" style={{ color: scenario.headerColor }}>
                  {scenario.name}
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {EVOLUTION_YEARS.map((year) => {
                    const mix = scenario.fuelMixEvolution[year];
                    if (!mix) return null;
                    const data = FUEL_ORDER
                      .filter((ft) => (mix[ft as keyof typeof mix] ?? 0) > 0)
                      .map((ft) => ({ name: FUEL_LABELS[ft], value: mix[ft as keyof typeof mix] ?? 0, color: FUEL_COLORS[ft] }));
                    return (
                      <div key={year}>
                        <p className="text-[10px] text-gray-500 text-center mb-1">{year}</p>
                        <div className="h-5 rounded-md overflow-hidden flex">
                          {data.map((d) => (
                            <div
                              key={d.name}
                              style={{ width: `${d.value}%`, background: d.color }}
                              title={`${d.name}: ${d.value}%`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleScenarios.map((scenario) => (
            <div
              key={scenario.type}
              className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl overflow-hidden"
            >
              <div
                className="px-4 py-2 text-xs font-semibold text-white"
                style={{ background: scenario.headerColor + "30", borderBottom: `1px solid ${scenario.headerColor}40` }}
              >
                {scenario.name}
              </div>
              <ul className="px-4 py-3 space-y-2">
                {scenario.recommendations.map((rec) => (
                  <li key={rec} className="flex items-start gap-2 text-xs text-gray-300">
                    <span style={{ color: scenario.headerColor }} className="shrink-0 mt-0.5">→</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Export row */}
      <div className="flex items-center gap-3 pt-2 border-t border-ocean-800/30">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors">
          📄 Export Scenario PDF
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-ocean-800/30 hover:bg-ocean-700/30 rounded-lg text-xs text-gray-400 transition-colors">
          💾 Save Scenarios
        </button>
      </div>
    </div>
  );
}
