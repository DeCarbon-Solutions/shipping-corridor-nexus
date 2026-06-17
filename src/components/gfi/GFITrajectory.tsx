"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ReferenceLine, ResponsiveContainer, LabelList,
} from "recharts";
import type { FleetVessel } from "@/types";
import {
  GFI_TRAJECTORY, VESSEL_GROUPS, IMO_GFI_TARGETS, IMO_GFI_BASELINE,
} from "@/lib/constants";
import { calculateFleetGFI } from "@/lib/calculations";

interface GFITrajectoryProps {
  vessels: FleetVessel[];
}

const SCENARIO_LINES = [
  { key: "base",       label: "Base Case",     color: "#22D3EE", dash: ""        },
  { key: "delayed",    label: "Delayed Case",   color: "#94A3B8", dash: "5 5"     },
  { key: "aggressive", label: "Aggressive NZF", color: "#4ADE80", dash: ""        },
];

const IMO_LINES = [
  { year: 2030, value: IMO_GFI_TARGETS[2030], label: `IMO 2030 Target ${IMO_GFI_TARGETS[2030]}` },
  { year: 2035, value: IMO_GFI_TARGETS[2035], label: `IMO 2035 Target ${IMO_GFI_TARGETS[2035]}` },
  { year: 2040, value: IMO_GFI_TARGETS[2040], label: `IMO 2040 Target ${IMO_GFI_TARGETS[2040]}` },
  { year: 2050, value: 0,                     label: "IMO 2050 Near Zero" },
];

function CustomDot(props: { cx?: number; cy?: number; payload?: { year: number } }) {
  const { cx = 0, cy = 0 } = props;
  return <circle cx={cx} cy={cy} r={3} fill="#22D3EE" stroke="#030B15" strokeWidth={1.5} />;
}

export default function GFITrajectory({ vessels }: GFITrajectoryProps) {
  const currentGFI = calculateFleetGFI(vessels);
  const gap2030 = currentGFI - IMO_GFI_TARGETS[2030];
  const gapPct = ((gap2030 / currentGFI) * 100).toFixed(1);

  const hasNonCompliant = VESSEL_GROUPS.some((g) => !g.compliant2030);

  return (
    <div className="flex flex-col gap-6 p-5">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Fleet GHG Fuel Intensity Trajectory &amp; Compliance
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          gCO₂eq/MJ Well-to-Wake · IMO 2008 baseline: {IMO_GFI_BASELINE} gCO₂eq/MJ
        </p>
      </div>

      {/* Main Chart */}
      <div className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={GFI_TRAJECTORY} margin={{ top: 24, right: 70, bottom: 8, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis
              dataKey="year" type="number" domain={[2024, 2050]}
              ticks={[2024, 2028, 2030, 2035, 2040, 2045, 2050]}
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={{ stroke: "#1e3a5f" }} tickLine={false}
            />
            <YAxis
              domain={[0, 100]} ticks={[0, 20, 40, 60, 72.93, 80, 91.16]}
              tick={{ fill: "#6B7280", fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={(v) => v.toFixed(0)}
            />

            {/* IMO target lines */}
            {IMO_LINES.map((line) => (
              <ReferenceLine
                key={line.year} y={line.value}
                stroke="#EF4444" strokeDasharray="4 4" strokeOpacity={0.6}
                label={{ value: line.label, position: "right", fill: "#EF4444", fontSize: 9 }}
              />
            ))}

            {/* IMO baseline */}
            <ReferenceLine
              y={IMO_GFI_BASELINE} stroke="#6B7280"
              strokeDasharray="6 3" strokeOpacity={0.4}
              label={{ value: `Baseline ${IMO_GFI_BASELINE}`, position: "right", fill: "#6B7280", fontSize: 9 }}
            />

            <Tooltip
              contentStyle={{ background: "#0A2240", border: "1px solid #1e3a5f", borderRadius: "8px", fontSize: "11px" }}
              formatter={(v: number, name: string) => [`${v.toFixed(1)} gCO₂eq/MJ`, name]}
              labelFormatter={(yr) => `Year ${yr}`}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              formatter={(val) => <span style={{ color: "#9CA3AF" }}>{val}</span>}
            />

            {SCENARIO_LINES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={s.key === "aggressive" ? 2.5 : 2}
                strokeDasharray={s.dash}
                dot={s.key === "base" ? <CustomDot /> : false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* GFI Breakdown by Vessel Group */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">GFI Breakdown by Vessel Group</h3>
        <div className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl p-4 space-y-4">
          {VESSEL_GROUPS.map((group) => {
            const barMax = Math.max(IMO_GFI_BASELINE, group.currentGfi, 100);
            const currentPct = (group.currentGfi / barMax) * 100;
            const proj2030Pct = (group.gfi2030 / barMax) * 100;
            const barColor = group.currentGfi > 85 ? "#EF4444" : group.currentGfi > 72.93 ? "#F97316" : "#22C55E";
            return (
              <div key={group.name} className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-gray-400">
                      {group.name}
                      <span className="text-gray-600 ml-1">({group.count} vessel{group.count !== 1 ? "s" : ""})</span>
                    </span>
                    {!group.compliant2030 && (
                      <span className="text-[10px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded-full font-medium">
                        ⚠ Non-Compliant
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 rounded-md transition-all"
                      style={{ width: `${currentPct}%`, background: barColor, minWidth: 4, maxWidth: "60%" }}
                    />
                    <span className="text-xs font-semibold text-white tabular-nums">
                      {group.currentGfi.toFixed(1)}
                    </span>
                  </div>
                  {group.gfi2030 > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className="h-2.5 rounded-md opacity-50"
                        style={{ width: `${proj2030Pct * 0.8}%`, background: barColor, minWidth: 4, maxWidth: "48%" }}
                      />
                      <span className="text-[10px] text-gray-500 tabular-nums">
                        2030: {group.gfi2030.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance Alert */}
      {hasNonCompliant && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-red-400 mb-0.5">Compliance Alert</p>
            {VESSEL_GROUPS.filter((g) => !g.compliant2030).map((g) => (
              <p key={g.name} className="text-xs text-gray-300">
                <strong>{g.name}</strong> are exceeding the 2030 GFI target ({IMO_GFI_TARGETS[2030]} gCO₂eq/MJ).
                Current: {g.currentGfi.toFixed(1)} · Gap: {(g.currentGfi - IMO_GFI_TARGETS[2030]).toFixed(1)} gCO₂eq/MJ.
                Recommended: bio-VLSFO blending or LNG dual-fuel retrofit.
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Donut Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Current Fleet GFI",
            value: currentGFI.toFixed(1),
            sub: `Gap to 2030: ${gap2030.toFixed(1)} (${gapPct}%)`,
            color: "#F97316",
          },
          {
            label: "2030 Target",
            value: IMO_GFI_TARGETS[2030].toFixed(2),
            sub: "✓ On Target if trends hold",
            color: "#22C55E",
          },
          {
            label: "2050 Target",
            value: "Near Zero",
            sub: `Gap: ${currentGFI.toFixed(1)} (${(currentGFI / IMO_GFI_BASELINE * 100).toFixed(0)}% to go)`,
            color: "#6B7280",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl p-4 text-center"
          >
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">{card.label}</p>
            <div
              className="w-20 h-20 rounded-full border-4 flex items-center justify-center mx-auto mb-3"
              style={{ borderColor: card.color + "60", background: card.color + "10" }}
            >
              <span className="text-lg font-bold text-white leading-tight text-center px-1">
                {card.value}
              </span>
            </div>
            <p className="text-[10px] text-gray-500">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Export row */}
      <div className="flex items-center gap-3 pt-2 border-t border-ocean-800/30">
        <button className="px-4 py-2 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors">
          📊 Export Data
        </button>
        <button className="px-4 py-2 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors">
          🖼️ Export Chart
        </button>
        <button className="px-4 py-2 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors">
          📄 Export Full Report
        </button>
      </div>
    </div>
  );
}
