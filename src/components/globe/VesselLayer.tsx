import { ScatterplotLayer } from "@deck.gl/layers";
import type { Vessel, VesselType } from "@/types";
import { CII_COLORS_RGB, VESSEL_MARKER_RADIUS } from "@/lib/constants";

interface VesselLayerProps {
  vessels: Vessel[];
  visible: boolean;
  filterType: VesselType | "all";
  onVesselHover: (info: { object: Vessel | null; x: number; y: number }) => void;
}

export function createVesselLayer({ vessels, visible, filterType, onVesselHover }: VesselLayerProps) {
  if (!visible) return null;

  const filtered = filterType === "all" ? vessels : vessels.filter((v) => v.type === filterType);

  return new ScatterplotLayer<Vessel>({
    id: "vessel-layer",
    data: filtered,
    pickable: true,
    filled: true,
    stroked: false,
    radiusMinPixels: 3,
    radiusMaxPixels: 10,
    getPosition: (d) => [d.lng, d.lat],
    getRadius: VESSEL_MARKER_RADIUS,
    getFillColor: (d) => [...CII_COLORS_RGB[d.ciiRating], 220] as [number, number, number, number],
    onHover: (info) => {
      onVesselHover({
        object: info.object as Vessel | null,
        x: info.x ?? 0,
        y: info.y ?? 0,
      });
    },
    updateTriggers: {
      data: [filterType],
    },
  });
}
