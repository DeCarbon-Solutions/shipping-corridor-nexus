"use client";

import { useState } from "react";
import { Edit3, Download, PlusCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
  PieChart, Pie, Tooltip,
} from "recharts";
import type { FleetVessel, CIIRating, FuelType } from "@/types";
import { CII_COLORS, FUEL_COLORS, FUEL_LABELS } from "@/lib/constants";
import {
  calculateFleetGFI,
  calculateFleetCO2Tons,
  getFleetCIIDistribution,
  getFuelMixByMass,
} from "@/lib/calculations";

const CII_ORDER: CIIRating[] = ["A", "B", "C", "D", "E"];

interface FleetOverviewProps {
  vessels: FleetVessel[];
  onEdit: () => void;
  onAdd: () => void;
}

export default function FleetOverview({ vessels, onEdit, onAdd }: FleetOverviewProps) {
  const [sortBy, setSortBy] = useState<"ciiRating" | "gfi" | "name">("ciiRating");

  const sorted = [...vessels].sort((a, b) => {
    if (sortBy === "ciiRating") return a.ciiRating.localeCompare(b.ciiRating);
    if (sortBy === "gfi") return a.gfi - b.gfi;
    return a.name.localeCompare(b.name);
  });

  const ciiDist = getFleetCIIDistribution(vessels);
  const fuelMix = getFuelMixByMass(vessels);
  const fleetGFI = calculateFleetGFI(vessels).toFixed(1);
  const co2Tons = Math.round(calculateFleetCO2Tons(vessels) / 1000);

  const ciiBarData = CII_ORDER.map((r) => ({
    rating: r, count: ciiDist[r], color: CII_COLORS[r],
  }));

  const fuelPieData = (Object.entries(fuelMix) as [FuelType, number][])
    .filter(([, pct]) => pct > 0)
    .map(([ft, pct]) => ({ name: FUEL_LABELS[ft], value: pct, color: FUEL_COLORS[ft] }));

  const dominantFuel = fuelPieData.sort((a, b) => b.value - a.value)[0];

  function exportCSV() {
    const headers = "Vessel,IMO,Type,DWT,Fuel,CII,GFI";
    const rows = vessels.map((v) =>
      `${v.name},${v.imoNumber},${v.type},${v.dwt},${v.fuelType},${v.ciiRating},${v.gfi}`
    );
    const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "fleet.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          My Fleet <span className="text-gray-500 font-normal text-sm">({vessels.length} vessels)</span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-700/80 hover:bg-green-600/80 rounded-lg text-xs text-white font-medium transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-ocean-800/40 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-ocean-800/40 bg-ocean-900/60">
              {[
                ["name", "Vessel"],
                ["imoNumber", "IMO"],
                ["type", "Type"],
                ["dwt", "DWT"],
                ["fuelType", "Fuel"],
                ["ciiRating", "CII Rating ▼"],
                ["gfi", "GFI"],
              ].map(([field, label]) => (
                <th
                  key={field}
                  onClick={() => field !== "imoNumber" && field !== "dwt" && field !== "fuelType" && setSortBy(field as typeof sortBy)}
                  className="px-4 py-3 text-left text-gray-500 font-medium cursor-pointer hover:text-gray-300 transition-colors"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((v, i) => (
              <tr
                key={v.id}
                className={`border-b border-ocean-800/20 hover:bg-ocean-900/30 transition-colors ${
                  i % 2 === 0 ? "" : "bg-ocean-900/10"
                }`}
              >
                <td className="px-4 py-3 font-medium text-white">{v.name}</td>
                <td className="px-4 py-3 text-gray-400 font-mono">{v.imoNumber}</td>
                <td className="px-4 py-3 text-gray-300 capitalize">{v.type}</td>
                <td className="px-4 py-3 text-gray-300 tabular-nums">{v.dwt.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-semibold"
                    style={{
                      background: (FUEL_COLORS[v.fuelType] || "#6B7280") + "25",
                      color: FUEL_COLORS[v.fuelType] || "#9CA3AF",
                    }}
                  >
                    {FUEL_LABELS[v.fuelType]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2.5 py-0.5 rounded font-bold text-sm"
                    style={{
                      background: CII_COLORS[v.ciiRating] + "25",
                      color: CII_COLORS[v.ciiRating],
                    }}
                  >
                    {v.ciiRating}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums text-gray-300">{v.gfi.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fleet Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Vessels", value: vessels.length.toString(), icon: "🚢" },
          { label: "Avg CII", value: getAvgCIILabel(ciiDist, vessels.length), icon: "📊" },
          { label: "Fleet GFI", value: `${fleetGFI}`, sub: "gCO₂eq/MJ", icon: "🌱" },
          { label: "CO₂/yr", value: `${co2Tons}k`, sub: "tons", icon: "☁️" },
          { label: "HFO/VLSFO", value: `${Math.round((((fuelMix.hfo ?? 0) + (fuelMix.vlsfo ?? 0))))}%`, icon: "⛽" },
        ].map((card) => (
          <div key={card.label} className="bg-ocean-900/50 border border-ocean-800/30 rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">{card.icon}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{card.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-white tabular-nums">{card.value}</span>
              {card.sub && <span className="text-[10px] text-gray-500">{card.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CII Distribution */}
        <div className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl p-4">
          <h3 className="text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-medium">
            CII Distribution
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={ciiBarData} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
              <XAxis type="number" hide domain={[0, Math.max(...ciiBarData.map((d) => d.count)) + 1]} />
              <YAxis
                type="category" dataKey="rating" width={20}
                tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 600 }}
                axisLine={false} tickLine={false}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
                {ciiBarData.map((entry) => (
                  <Cell key={entry.rating} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Mix Donut */}
        <div className="bg-ocean-900/40 border border-ocean-800/30 rounded-xl p-4">
          <h3 className="text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-medium">
            Fuel Mix (by consumption)
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fuelPieData} cx="50%" cy="50%"
                    innerRadius={44} outerRadius={65}
                    dataKey="value" strokeWidth={1} stroke="#061528"
                  >
                    {fuelPieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0A2240", border: "1px solid #1e3a5f", borderRadius: "6px", fontSize: "11px" }}
                    formatter={(v: number) => [`${v}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {dominantFuel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-white tabular-nums">{dominantFuel.value}%</span>
                  <span className="text-[10px] text-gray-400">{dominantFuel.name}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {fuelPieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-xs text-gray-400">{d.value}%</span>
                  <span className="text-xs text-gray-500">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getAvgCIILabel(dist: Record<CIIRating, number>, total: number): string {
  if (total === 0) return "—";
  const weights: Record<CIIRating, number> = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  const avg = (Object.entries(dist) as [CIIRating, number][]).reduce(
    (s, [r, c]) => s + weights[r] * c, 0
  ) / total;
  if (avg <= 1.5) return "A";
  if (avg <= 2.5) return "B";
  if (avg <= 3.5) return "C";
  if (avg <= 4.5) return "D";
  return "E";
}
