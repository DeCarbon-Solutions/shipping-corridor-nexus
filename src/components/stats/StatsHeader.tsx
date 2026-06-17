"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Sparkline from "./Sparkline";
import {
  SPARKLINE_PORTS,
  SPARKLINE_VESSELS,
  SPARKLINE_CII,
  SPARKLINE_CO2,
} from "@/lib/constants";

function useCountUp(end: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return { value, ref };
}

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  sparkData: number[];
  sparkColor: string;
  delay?: number;
}

function StatCard({
  icon,
  label,
  value: targetValue,
  suffix = "",
  prefix = "",
  sparkData,
  sparkColor,
  delay = 0,
}: StatCardProps) {
  const { value } = useCountUp(targetValue, 1500);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="flex items-center gap-3 px-4 py-2"
    >
      <span className="text-lg">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="text-lg font-semibold text-white tabular-nums">
          {prefix}{value}{suffix}
        </span>
      </div>
      <Sparkline data={sparkData} color={sparkColor} />
    </motion.div>
  );
}

interface StatsHeaderProps {
  portCount: number;
  vesselCount: number;
  co2Reduction: number;
}

export default function StatsHeader({ portCount, vesselCount, co2Reduction }: StatsHeaderProps) {
  return (
    <header className="w-full bg-ocean-950/90 backdrop-blur-md border-b border-ocean-800/50 z-30">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 py-1.5 overflow-x-auto">
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <div className="w-2 h-2 rounded-full bg-fuel-biofuel animate-pulse" />
          <h1 className="text-sm font-semibold text-white tracking-tight whitespace-nowrap">
            Green Shipping Corridor Dashboard
          </h1>
        </div>
        <div className="flex items-center divide-x divide-ocean-800/50">
          <StatCard
            icon="🌍"
            label="Green Ports"
            value={portCount}
            sparkData={SPARKLINE_PORTS}
            sparkColor="#22C55E"
            delay={0}
          />
          <StatCard
            icon="🚢"
            label="Vessels Tracked"
            value={vesselCount}
            sparkData={SPARKLINE_VESSELS}
            sparkColor="#3B82F6"
            delay={1}
          />
          <StatCard
            icon="📊"
            label="Avg CII"
            value={27}
            prefix=""
            suffix=""
            sparkData={SPARKLINE_CII}
            sparkColor="#FACC15"
            delay={2}
          />
          <StatCard
            icon="🌱"
            label="CO₂ Reduction"
            value={Math.abs(Math.round(co2Reduction))}
            prefix="-"
            suffix="%"
            sparkData={SPARKLINE_CO2}
            sparkColor="#22C55E"
            delay={3}
          />
        </div>
      </div>
    </header>
  );
}
