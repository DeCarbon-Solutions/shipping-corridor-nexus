import { ArcLayer } from "@deck.gl/layers";
import type { GreenCorridor } from "@/types";
import { ARC_WIDTH, CORRIDOR_COLORS } from "@/lib/constants";

interface CorridorLayerProps {
  corridors: GreenCorridor[];
  visible: boolean;
}

export function createCorridorLayer({ corridors, visible }: CorridorLayerProps) {
  if (!visible) return null;

  return new ArcLayer<GreenCorridor>({
    id: "corridor-layer",
    data: corridors,
    pickable: true,
    getSourcePosition: (d) => [d.startLng, d.startLat],
    getTargetPosition: (d) => [d.endLng, d.endLat],
    getSourceColor: (d) => [...(CORRIDOR_COLORS[d.status] || CORRIDOR_COLORS.proposed), 180] as [number, number, number, number],
    getTargetColor: (d) => [...(CORRIDOR_COLORS[d.status] || CORRIDOR_COLORS.proposed), 180] as [number, number, number, number],
    getWidth: ARC_WIDTH,
    widthMinPixels: 1,
    widthMaxPixels: 4,
    greatCircle: true,
  });
}
