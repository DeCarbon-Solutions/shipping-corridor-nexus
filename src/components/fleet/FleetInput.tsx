"use client";

import { useState, useRef } from "react";
import { Upload, PlusCircle, Trash2, Save, Download } from "lucide-react";
import type { FleetVessel, VesselType, FuelType } from "@/types";
import { FUEL_LABELS, CII_COLORS } from "@/lib/constants";

const VESSEL_TYPES: VesselType[] = ["bulk", "container", "tanker", "roro", "other"];
const FUEL_TYPES: FuelType[] = ["hfo", "vlsfo", "lng", "biofuel", "methanol", "ammonia"];
const ROUTES = [
  "Singapore to Rotterdam",
  "Shanghai to LA",
  "Busan to Pilbara",
  "Fujairah to Mumbai",
  "Hamburg to New York",
  "Rotterdam to Houston",
  "Tokyo Bay to Pacific Northwest",
];

const EMPTY_ROW: Omit<FleetVessel, "id" | "ciiRating" | "gfi"> = {
  name: "", imoNumber: "", type: "bulk", dwt: 0, builtYear: 2020,
  mainEnginePowerKw: 0, fuelType: "hfo", annualConsumptionTons: 0,
  annualDistanceNm: 0, primaryRoute: ROUTES[0],
};

interface FleetInputProps {
  initialVessels: FleetVessel[];
  onSave: (vessels: FleetVessel[]) => void;
}

export default function FleetInput({ initialVessels, onSave }: FleetInputProps) {
  const [rows, setRows] = useState(initialVessels);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function addRow() {
    const id = `v${Date.now()}`;
    setRows((prev) => [...prev, { ...EMPTY_ROW, id, ciiRating: "C", gfi: 91.2 }]);
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((v) => v.id !== id));
  }

  function updateRow(id: string, field: string, value: string | number) {
    setRows((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  }

  function handleCSV(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n").filter(Boolean);
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const parsed: FleetVessel[] = lines.slice(1).map((line, i) => {
        const vals = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        const get = (key: string) => vals[headers.indexOf(key)] ?? "";
        return {
          id: `csv_${i}`,
          name: get("vessel_name") || `Vessel ${i + 1}`,
          imoNumber: get("imo_number"),
          type: (get("type") as VesselType) || "bulk",
          dwt: parseInt(get("dwt")) || 0,
          builtYear: parseInt(get("built_year")) || 2020,
          mainEnginePowerKw: parseInt(get("main_engine_power_kw")) || 0,
          fuelType: (get("fuel_type") as FuelType) || "hfo",
          annualConsumptionTons: parseInt(get("annual_consumption_tons")) || 0,
          annualDistanceNm: parseInt(get("annual_distance_nm")) || 0,
          primaryRoute: get("primary_route") || ROUTES[0],
          ciiRating: "C",
          gfi: 91.2,
        };
      });
      setRows(parsed);
    };
    reader.readAsText(file);
  }

  function downloadTemplate() {
    const headers = "vessel_name,imo_number,type,dwt,built_year,main_engine_power_kw,fuel_type,annual_consumption_tons,annual_distance_nm,primary_route";
    const example = "My Vessel,9123456,bulk,180000,2018,15000,hfo,28000,130000,Singapore to Rotterdam";
    const blob = new Blob([headers + "\n" + example], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "fleet_template.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* CSV Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleCSV(file);
        }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-green-500/60 bg-green-500/5"
            : "border-ocean-700/60 hover:border-ocean-600/80 hover:bg-ocean-800/20"
        }`}
      >
        <input
          ref={fileRef} type="file" accept=".csv" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCSV(f); }}
        />
        <Upload className="w-8 h-8 mx-auto mb-3 text-gray-500" />
        <p className="text-sm text-gray-300 font-medium">
          Upload Fleet CSV — drag &amp; drop or click to browse
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); downloadTemplate(); }}
          className="mt-2 text-xs text-ocean-400 hover:text-ocean-300 underline"
        >
          Download Template CSV
        </button>
        <p className="mt-3 text-xs text-gray-600">
          Required columns: vessel_name · imo_number · type · dwt · built_year ·
          main_engine_power_kw · fuel_type · annual_consumption_tons · annual_distance_nm · primary_route
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-ocean-800/50" />
        <span className="text-xs text-gray-500">or enter manually</span>
        <div className="flex-1 h-px bg-ocean-800/50" />
      </div>

      {/* Manual Entry Table */}
      <div className="overflow-x-auto rounded-xl border border-ocean-800/40">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-ocean-800/40 bg-ocean-900/50">
              {["Vessel Name","IMO Number","Type","DWT","Built","Engine kW","Fuel","Annual Fuel (t)","Distance (nm)","Primary Route",""].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left text-gray-500 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.id} className="border-b border-ocean-800/20 hover:bg-ocean-900/30">
                <td className="px-2 py-1.5">
                  <input
                    value={v.name}
                    onChange={(e) => updateRow(v.id, "name", e.target.value)}
                    className="w-32 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none focus:ring-1 focus:ring-ocean-500"
                    placeholder="Vessel name"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    value={v.imoNumber}
                    onChange={(e) => updateRow(v.id, "imoNumber", e.target.value)}
                    className="w-24 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none focus:ring-1 focus:ring-ocean-500"
                    placeholder="9XXXXXX"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={v.type}
                    onChange={(e) => updateRow(v.id, "type", e.target.value)}
                    className="bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  >
                    {VESSEL_TYPES.map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number" value={v.dwt || ""}
                    onChange={(e) => updateRow(v.id, "dwt", parseInt(e.target.value) || 0)}
                    className="w-20 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number" value={v.builtYear}
                    onChange={(e) => updateRow(v.id, "builtYear", parseInt(e.target.value) || 2020)}
                    className="w-16 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number" value={v.mainEnginePowerKw || ""}
                    onChange={(e) => updateRow(v.id, "mainEnginePowerKw", parseInt(e.target.value) || 0)}
                    className="w-20 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={v.fuelType}
                    onChange={(e) => updateRow(v.id, "fuelType", e.target.value)}
                    className="bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  >
                    {FUEL_TYPES.map((f) => (
                      <option key={f} value={f}>{FUEL_LABELS[f]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number" value={v.annualConsumptionTons || ""}
                    onChange={(e) => updateRow(v.id, "annualConsumptionTons", parseInt(e.target.value) || 0)}
                    className="w-20 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="number" value={v.annualDistanceNm || ""}
                    onChange={(e) => updateRow(v.id, "annualDistanceNm", parseInt(e.target.value) || 0)}
                    className="w-20 bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={v.primaryRoute}
                    onChange={(e) => updateRow(v.id, "primaryRoute", e.target.value)}
                    className="bg-ocean-800/40 rounded px-2 py-1 text-gray-200 outline-none min-w-[180px]"
                  >
                    {ROUTES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-2 py-1.5">
                  <button onClick={() => removeRow(v.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="py-10 text-center text-gray-600 text-sm">
            No vessels yet — upload a CSV or add manually.
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={addRow}
          className="flex items-center gap-1.5 px-3 py-2 bg-ocean-800/50 hover:bg-ocean-700/60 rounded-lg text-xs text-gray-300 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Row
        </button>
        <button
          onClick={() => onSave(rows)}
          disabled={rows.length === 0}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-700/80 hover:bg-green-600/80 rounded-lg text-xs text-white font-medium transition-colors disabled:opacity-40"
        >
          <Save className="w-3.5 h-3.5" />
          Save Fleet
        </button>
        <button
          onClick={() => setRows([])}
          className="flex items-center gap-1.5 px-3 py-2 bg-ocean-800/30 hover:bg-ocean-700/30 rounded-lg text-xs text-gray-500 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
