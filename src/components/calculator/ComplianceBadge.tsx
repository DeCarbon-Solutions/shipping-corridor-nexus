"use client";

import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface ComplianceBadgeProps {
  label: string;
  compliant: boolean;
  targetPercent: number;
  currentPercent: number;
}

export default function ComplianceBadge({
  label,
  compliant,
  targetPercent,
  currentPercent,
}: ComplianceBadgeProps) {
  const gap = targetPercent - currentPercent;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
        compliant
          ? "bg-green-950/30 border-green-800/40"
          : "bg-red-950/20 border-red-900/30"
      }`}
    >
      {compliant ? (
        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
      )}
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
          {label}
        </span>
        <span
          className={`text-xs font-medium ${
            compliant ? "text-green-400" : "text-red-400"
          }`}
        >
          {compliant ? "Compliant" : `Gap: ${gap.toFixed(1)}%`}
        </span>
      </div>
    </div>
  );
}
