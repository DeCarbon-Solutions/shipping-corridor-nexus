"use client";

import Image from "next/image";
import { GraduationCap, Target, Cpu, Globe } from "lucide-react";

const dossier = [
  {
    icon: GraduationCap,
    label: "Credentials",
    items: ["PhD in Energy Systems Engineering", "Decision Scientist", "LCA Expert", "PMP", "MIT Sustainability and Strategy Certified"],
  },
  {
    icon: Target,
    label: "Track Record",
    items: ["$100M+ Projects", "20+ Papers", "400+ Citations", "90+ Top Journal Reviews", "Guest Chief Editor of Top Sustainability Journal"],
  },
  {
    icon: Cpu,
    label: "Tech Engine",
    items: ["Stochastic Programming", "Real Options Valuation", "Python/SQL Data Governance", "AI Agentic Skill/MCP Developer", "Supervised/Unsupervised Machine Learning Projection"],
  },
  {
    icon: Globe,
    label: "Industry Footprint",
    items: ["EMSA Contributor", "ICCT Advisor", "ABS Annual Outlook Lead Author", "Marquis Who's Who"],
  },
];

export function ArchitectSection() {
  return (
    <section id="architect" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-4">
            The Architect
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            About Chase
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Small Portrait + Quote (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            {/* Small Circular Portrait */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-border mb-6">
              <img
                src="/images/chase-ji-profile.jpg"
                alt="Chase Ji, PhD, PMP"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote */}
            <blockquote className="text-lg font-medium text-foreground leading-relaxed italic max-w-sm">
              &quot;I am not selling green dreams; I am building financial shields for core assets.&quot;
            </blockquote>
            <cite className="block mt-4 text-sm text-blue-500 not-italic font-semibold">
              — Chase Ji, PhD
            </cite>
          </div>

          {/* Right: Dossier Sidebar (3 cols) */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-6">
              {dossier.map((section, index) => (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <section.icon className="w-5 h-5 text-blue-500" />
                    <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {section.label}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
