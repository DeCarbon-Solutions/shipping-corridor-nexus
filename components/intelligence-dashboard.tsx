"use client";

import { ExternalLink, MapPin, Mic } from "lucide-react";

const publications = [
  {
    title: "Potential of Hydrogen as Fuel for Shipping",
    journal: "European Maritime Safety Agency (EMSA)"
  },
  {
    title: "Feasibility study of future energy options for Great Lakes shipping",
    journal: "International Council on Clean Transportation (ICCT)"
  },
  {
    title: "A data-driven study of IMO compliant fuel emissions with consideration of black carbon aerosols",
    journal: "Ocean Engineering",
  },
  {
    title: "Post-combustion carbon capture for tank to propeller via process modeling and simulation",
    journal: "Journal of CO2 Utilization",
  },
  {
    title: "Predicting flammability-leading properties for liquid aerosol safety via machine learning",
    journal: "Process Safety and Environmental Protection",
  },
];

const speaking = [
  { event: "AIChE Annual Conference 2025", location: "Dallas, TX" },
  { event: "Hydrogen and Carbon Capture Technology Expo North America 2024", location: "Houston, TX" },
  { event: "SNAME Maritime Convention 2023", location: "San Diego, CA" },
  { event: "Advanced Bioeconomy Leadership Conference 2023", location: "Washington DC" },
  { event: "Ammonia Energy Conference 2022", location: "Phoenix, AZ" },
];

export function IntelligenceDashboard() {
  return (
    <section id="intelligence" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-500 font-semibold tracking-widest uppercase mb-4">
            Intelligence Dashboard
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Publications, Media & Conferences
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Core Publications */}
          <div className="p-8 bg-card border border-border rounded-lg">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-6 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Core Publications
            </h3>
            <ul className="space-y-6">
              {publications.map((pub, index) => (
                <li key={index} className="border-l-2 border-border pl-4 hover:border-blue-500 transition-colors">
                  <p className="text-foreground font-medium leading-relaxed">
                    {pub.title}
                  </p>
                  <p className="text-sm text-blue-500 mt-1 italic">
                    {pub.journal}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href="https://scholar.google.com/citations?user=EtvSCS4AAAAJ&hl=en&oi=ao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-sm text-blue-500 hover:underline font-medium"
            >
              View full Google Scholar dossier
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Speaking & Engagements */}
          <div className="p-8 bg-card border border-border rounded-lg">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-6 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Speaking & Engagements
            </h3>
            <ul className="space-y-4">
              {speaking.map((event, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Mic className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium">
                      {event.event}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
