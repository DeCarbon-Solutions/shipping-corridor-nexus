"use client";

import { useState, useEffect } from "react";
import type { Port, Vessel, GreenCorridor } from "@/types";
import { loadPorts, loadVessels, loadCorridors } from "@/lib/data";
import NexusDashboard from "@/components/nexus/NexusDashboard";

export default function Page() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [corridors, setCorridors] = useState<GreenCorridor[]>([]);

  useEffect(() => {
    loadPorts().then(setPorts).catch(console.error);
    loadVessels().then(setVessels).catch(console.error);
    loadCorridors().then(setCorridors).catch(console.error);
  }, []);

  return <NexusDashboard ports={ports} vessels={vessels} corridors={corridors} />;
}
