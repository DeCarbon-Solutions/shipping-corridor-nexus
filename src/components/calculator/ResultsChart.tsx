"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";
import type { FuelMix, FuelType } from "@/types";
import { FUEL_COLORS, FUEL_LABELS } from "@/lib/constants";

interface ResultsChartProps {
  fuelMix: FuelMix;
}

const FUEL_ORDER: FuelType[] = ["hfo", "vlsfo", "lng", "biofuel", "methanol", "ammonia"];

export default function ResultsChart({ fuelMix }: ResultsChartProps) {
  const barData = FUEL_ORDER.map((ft) => ({
    fuelType: ft,
    label: FUEL_LABELS[ft],
    value: fuelMix[ft],
    color: FUEL_COLORS[ft],
  }));

  const pieData = FUEL_ORDER.filter((ft) => fuelMix[ft] > 0).map((ft) => ({
    name: FUEL_LABELS[ft],
    value: fuelMix[ft],
    fuelType: ft,
  }));

  return (
    <div className="flex gap-4">
      {/* Bar chart */}
      <div className="flex-1 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 8, top: 4, bottom: 4 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="label"
              width={70}
              tick={{ fill: "#9CA3AF", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14} isAnimationActive animationDuration={500}>
              {barData.map((entry) => (
                <Cell key={entry.fuelType} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut chart */}
      <div className="w-32 h-40 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={55}
              dataKey="value"
              strokeWidth={1}
              stroke="#0A2240"
              isAnimationActive
              animationDuration={500}
            >
              {pieData.map((entry) => (
                <Cell key={entry.fuelType} fill={FUEL_COLORS[entry.fuelType]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A2240",
                border: "1px solid #1e3a5f",
                borderRadius: "6px",
                fontSize: "11px",
                color: "#e5e7eb",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
