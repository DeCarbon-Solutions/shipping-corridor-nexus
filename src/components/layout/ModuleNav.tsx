"use client";

import type { ActiveModule } from "@/types";

interface Tab {
  id: ActiveModule;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: "fleet",     icon: "📋", label: "My Fleet"       },
  { id: "corridors", icon: "🗺️",  label: "Corridors"      },
  { id: "scenarios", icon: "⚡",  label: "Scenarios"      },
  { id: "gfi",       icon: "📊",  label: "GFI Tracker"   },
];

interface ModuleNavProps {
  active: ActiveModule;
  onChange: (m: ActiveModule) => void;
}

export default function ModuleNav({ active, onChange }: ModuleNavProps) {
  return (
    <header className="w-full bg-ocean-950/95 backdrop-blur-md border-b border-ocean-800/50 z-30 shrink-0">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-12">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🌊</span>
          <span className="text-sm font-semibold text-white tracking-tight hidden sm:block">
            Fleet Decarbonization Planner
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${active === tab.id
                  ? "bg-ocean-700/80 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-ocean-800/40"}
              `}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 border border-ocean-700/50 hover:border-ocean-600 rounded-md transition-colors hidden md:block">
            Export PDF
          </button>
        </div>
      </div>
    </header>
  );
}
