"use client";

import { useState, useCallback } from "react";
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import type { Port, Vessel, GreenCorridor, LayerVisibility, VesselType, MapViewState } from "@/types";
import { DEFAULT_VIEW_STATE, CARTO_DARK_BASEMAP } from "@/lib/constants";
import { createPortLayer } from "./PortLayer";
import { createVesselLayer } from "./VesselLayer";
import { createCorridorLayer } from "./CorridorLayer";
import MapControls from "./MapControls";
import VesselTooltip from "../panels/VesselTooltip";

interface GlobeMapProps {
  ports: Port[];
  vessels: Vessel[];
  corridors: GreenCorridor[];
  layerVisibility: LayerVisibility;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
  vesselFilter: VesselType | "all";
  onVesselFilterChange: (type: VesselType | "all") => void;
  onPortClick: (port: Port) => void;
}

export default function GlobeMap({
  ports,
  vessels,
  corridors,
  layerVisibility,
  onToggleLayer,
  vesselFilter,
  onVesselFilterChange,
  onPortClick,
}: GlobeMapProps) {
  const [viewState, setViewState] = useState<MapViewState>(DEFAULT_VIEW_STATE);
  const [hoveredVessel, setHoveredVessel] = useState<{
    object: Vessel | null;
    x: number;
    y: number;
  }>({ object: null, x: 0, y: 0 });

  const handleVesselHover = useCallback(
    (info: { object: Vessel | null; x: number; y: number }) => {
      setHoveredVessel(info);
    },
    []
  );

  const layers = [
    createCorridorLayer({ corridors, visible: layerVisibility.corridors }),
    createPortLayer({ ports, layerVisibility, onPortClick }),
    createVesselLayer({
      vessels,
      visible: layerVisibility.vessels,
      filterType: vesselFilter,
      onVesselHover: handleVesselHover,
    }),
  ].filter(Boolean);

  return (
    <div className="relative w-full h-full">
      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => setViewState(vs as MapViewState)}
        controller={{ dragRotate: true, touchRotate: true }}
        layers={layers}
        getCursor={({ isHovering }) => (isHovering ? "pointer" : "grab")}
        style={{ position: "absolute", inset: "0" }}
      >
        <Map mapStyle={CARTO_DARK_BASEMAP} />
      </DeckGL>

      <MapControls
        layerVisibility={layerVisibility}
        onToggleLayer={onToggleLayer}
        vesselFilter={vesselFilter}
        onVesselFilterChange={onVesselFilterChange}
      />

      {hoveredVessel.object && (
        <VesselTooltip
          vessel={hoveredVessel.object}
          x={hoveredVessel.x}
          y={hoveredVessel.y}
        />
      )}
    </div>
  );
}
