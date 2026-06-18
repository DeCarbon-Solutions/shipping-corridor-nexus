"use client";

import { ExternalLink, Ship, Route, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: Ship,
    title: "Fuel Supplier Decarbonization Decision Tool",
    description: "Optimize fuel pathways under IMO 2030/2040/2050 scenarios. Model enterprise asset portfolio with real-time carbon pricing.",
    url: "https://fuelsupplier.streamlit.app/",
    color: "bg-blue-600",
  },
  {
    icon: Route,
    title: "IMO Net Zero Framework Future Compliance Modeling",
    description: "Calculate and predict IMO GFI cost from 2028 to 2035 to support shipowner/fleet charterer decision making on fleet evolution.",
    url: "https://imo2025.streamlit.app/",
    color: "bg-emerald-600",
  },
  {
    icon: Coins,
    title: "Fuel Producer Investment Decision Making Optimization",
    description: "Simulate infrastructure investments for conventional/bio/e-fuels. Quantify NPV-at-Risk from upstream to downstream value chain.",
    url: "https://fuelstrategy.streamlit.app/",
    color: "bg-amber-600",
  },
];

export function DecisionTools() {
  return (
    <section id="tools" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-4">
            Declassified Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Live Decision Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive applications powering strategic capital allocation decisions.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Color Bar */}
              <div className={`h-1 ${tool.color}`} />

              <div className="p-6">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-6`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* CTA */}
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="w-full group-hover:border-blue-500 group-hover:text-blue-500"
                  >
                    Launch Tool
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
