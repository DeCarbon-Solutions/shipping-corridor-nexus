import { ScatterplotLayer } from "@deck.gl/layers";
import type { Port, LayerVisibility } from "@/types";
import { getPrimaryFuelColor } from "@/lib/data";
import { PORT_MARKER_RADIUS } from "@/lib/constants";

interface PortLayerProps {
  ports: Port[];
  layerVisibility: LayerVisibility;
  onPortClick: (port: Port) => void;
}

export function createPortLayer({ ports, layerVisibility, onPortClick }: PortLayerProps) {
  // Filter ports based on which fuel types are visible
  const filtered = ports.filter((port) => {
    const availableFuels = port.fuels.map((f) => f.fuelType);
    if (layerVisibility.biofuel && availableFuels.includes("biofuel")) return true;
    if (layerVisibility.methanol && availableFuels.includes("methanol")) return true;
    if (layerVisibility.ammonia && availableFuels.includes("ammonia")) return true;
    if (layerVisibility.lng && availableFuels.includes("lng")) return true;
    return false;
  });

  return new ScatterplotLayer<Port>({
    id: "port-layer",
    data: filtered,
    pickable: true,
    stroked: true,
    filled: true,
    radiusMinPixels: 4,
    radiusMaxPixels: 16,
    getPosition: (d) => [d.lng, d.lat],
    getRadius: PORT_MARKER_RADIUS,
    getFillColor: (d) => [...getPrimaryFuelColor(d), 200] as [number, number, number, number],
    getLineColor: (d) =>
      d.isGreenCorridor
        ? [34, 197, 94, 255]
        : [255, 255, 255, 80] as [number, number, number, number],
    getLineWidth: (d) => (d.isGreenCorridor ? 3 : 1),
    lineWidthMinPixels: 1,
    lineWidthMaxPixels: 3,
    onClick: ({ object }) => {
      if (object) onPortClick(object);
    },
    updateTriggers: {
      data: [
        layerVisibility.biofuel,
        layerVisibility.methanol,
        layerVisibility.ammonia,
        layerVisibility.lng,
      ],
    },
  });
}
