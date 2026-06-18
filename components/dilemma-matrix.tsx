"use client";

import { Scale, Shield, Target, Crosshair, LineChart } from "lucide-react";

const dilemmas = [
  {
    icon: Scale,
    title: "Capital Allocation Reality",
    pain: "Justify $500M+ pivot",
    fix: "Quantify Stranded Asset Premium. Defend WACC.",
    bgImage: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
  },
  {
    icon: Shield,
    title: "Scope 3 Data Sovereignty",
    pain: "Fragmented supply chain emissions",
    fix: "MACC Contract Defense for procurement.",
    bgImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
  },
  {
    icon: Target,
    title: "Pilot Scaling",
    pain: "Scaling hydrogen pilots without CAPEX overruns",
    fix: "Physical Failure Mode Digitization. Bridge hard engineering with finance.",
    bgImage: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
  },
  {
    icon: Crosshair,
    title: "Strategic Whiplash",
    pain: "Committing to ammonia/methanol vs waiting",
    fix: "Real Options Valuation (ROV) Anchoring. Math justification to wait or strike.",
    bgImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    icon: LineChart,
    title: "KPI Arbitrator",
    pain: "Safety vs Finance vs Compliance",
    fix: "Cross-Departmental Financial Optimization. Link safety to cash flow.",
    bgImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
  },
];

export function DilemmaMatrix() {
  return (
    <section id="dilemmas" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-4">
            The Dilemma Matrix
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Where Transition Strategy Usually Fails
          </h2>
          <p className="text-lg text-muted-foreground">
            And How We Fix It
          </p>
        </div>

        {/* Cards Grid - Wide Cards */}
        <div className="space-y-6">
          {dilemmas.map((dilemma, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-border transition-all duration-300 hover:border-blue-500/50"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${dilemma.bgImage})` }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
              
              {/* Content */}
              <div className="relative p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 md:w-1/4">
                  <div className="w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0">
                    <dilemma.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {dilemma.title}
                  </h3>
                </div>
                
                {/* Pain Point */}
                <div className="md:w-1/4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">The Pain</p>
                  <p className="text-sm text-foreground/80">
                    {dilemma.pain}
                  </p>
                </div>
                
                {/* Resolution */}
                <div className="md:w-1/2">
                  <p className="text-xs text-blue-500 uppercase tracking-wider mb-1">The Fix</p>
                  <p className="text-sm text-foreground font-medium">
                    {dilemma.fix}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
