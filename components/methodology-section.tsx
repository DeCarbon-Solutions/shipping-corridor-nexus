"use client";

import Image from "next/image";

export function MethodologySection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-4">
            The Framework
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Forging a Profitable Path Through the{" "}
            <span className="text-blue-500">Impossible Trinity</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Navigate the convergence of physical constraints, regulatory volatility, and capital return requirements through mathematical optimization.
          </p>
        </div>

        {/* Impossible Trinity Image */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border shadow-2xl">
            <img
              src="/images/impossible-trinity.jpg"
              alt="The Impossible Trinity: Physical Constraints, Regulatory Volatility, and Capital Return converging through Mathematical Optimization"
              className="object-cover w-full h-full"
              style={{ display: 'block' }}
            />
          </div>
        </div>

        {/* Process Steps Below Image */}
        <div className="mt-16 grid md:grid-cols-5 gap-4">
          {[
            { step: "01", label: "Ingest Heterogeneous Data" },
            { step: "02", label: "AI-Driven Stochastic Modeling" },
            { step: "03", label: "Calculate Stranded Asset Premium" },
            { step: "04", label: "ROV Anchoring Framework" },
            { step: "05", label: "Board-Room Capital Allocation" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative p-4 bg-card/50 border border-border rounded-lg text-center"
            >
              {index < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-lime-400" />
              )}
              <div className="text-2xl font-bold text-blue-500/30 mb-2">
                {item.step}
              </div>
              <p className="text-xs text-muted-foreground leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
