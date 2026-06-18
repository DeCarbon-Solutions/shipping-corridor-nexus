"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const caseStudies = [
  {
    title: "Fleet Decarbonization Strategy",
    context: "Global shipping conglomerate facing IMO 2030 compliance deadlines with a 200+ vessel fleet.",
    math: "max sum(ROI_i * w_i) - lambda * Risk_regulatory",
    impact: "$500M+ Optimized",
    impactDetail: "Portfolio allocation across LNG, methanol, and battery-hybrid pathways",
  },
  {
    title: "Green Corridor Financial Modeling",
    context: "Multinational energy company evaluating hydrogen bunkering infrastructure investments.",
    math: "min LCOH subject to: demand_t >= supply_t, capex <= budget",
    impact: "+18% NPV Alignment",
    impactDetail: "Justified $120M CAPEX through real options valuation framework",
  },
  {
    title: "Carbon Credit Arbitrage Framework",
    context: "Fortune 500 manufacturer needing Scope 3 emissions reduction roadmap for SEC disclosure.",
    math: "min sum(MAC_i * abatement_i) s.t. sum(abatement_i) >= target",
    impact: "100% Audit Compliance",
    impactDetail: "MACC curve development across 12 procurement categories",
  },
];

export function ROIOutcomes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary font-semibold tracking-widest uppercase mb-4">
            Verified ROI Outcomes
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Declassified Intelligence
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`border rounded-lg transition-all duration-300 ${
                openIndex === index 
                  ? "border-primary bg-card shadow-lg shadow-primary/5" 
                  : "border-border bg-card/50 hover:border-border/80"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {study.title}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Expanded Content */}
              {openIndex === index && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Context */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Context
                    </p>
                    <p className="text-sm text-foreground">{study.context}</p>
                  </div>

                  {/* The Math */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      The Math
                    </p>
                    <div className="p-4 bg-background border border-border rounded font-mono text-sm text-muted-foreground">
                      {study.math}
                    </div>
                  </div>

                  {/* Impact */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      The Impact
                    </p>
                    <p className="text-3xl font-bold text-primary mb-2">
                      {study.impact}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {study.impactDetail}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
