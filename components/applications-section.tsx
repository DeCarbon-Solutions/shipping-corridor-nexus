import { Button } from "@/components/ui/button";
import { ExternalLink, Fuel, Ship, Route } from "lucide-react";

const applications = [
  {
    icon: Fuel,
    title: "Fuel Supplier Intelligence",
    description:
      "Comprehensive fuel supplier database and analytics platform. Track alternative fuel availability, pricing trends, and supply chain readiness across global bunkering networks.",
    url: "https://fuelsupplier.streamlit.app/",
    features: ["Supplier Database", "Pricing Analytics", "Supply Chain Mapping"],
    accent: "from-emerald-500/20 to-emerald-500/5",
    borderAccent: "hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Ship,
    title: "IMO 2025 Compliance Tracker",
    description:
      "Real-time monitoring and analysis tool for IMO 2025 regulatory compliance. Track fleet emissions, CII ratings, and decarbonization pathway progress against international maritime regulations.",
    url: "https://imo2025.streamlit.app/",
    features: ["CII Monitoring", "Emissions Tracking", "Regulatory Alerts"],
    accent: "from-blue-500/20 to-blue-500/5",
    borderAccent: "hover:border-blue-500/50",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Route,
    title: "Fuel Strategy Optimizer",
    description:
      "Multi-objective optimization platform for maritime fuel strategy decisions. Model transition pathways, compare fuel alternatives, and optimize capital allocation across fleet portfolios.",
    url: "https://fuelstrategy.streamlit.app/",
    features: ["Pathway Modeling", "Cost-Benefit Analysis", "Portfolio Optimization"],
    accent: "from-amber-500/20 to-amber-500/5",
    borderAccent: "hover:border-amber-500/50",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
];

export function ApplicationsSection() {
  return (
    <section className="relative px-4 py-20 overflow-hidden">
      {/* Abstract background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* App window outlines */}
        <rect x="100" y="100" width="200" height="150" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <rect x="500" y="80" width="200" height="150" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <rect x="900" y="100" width="200" height="150" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        {/* Connection lines */}
        <path d="M300,175 Q400,175 500,155" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
        <path d="M700,155 Q800,175 900,175" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
        {/* Data flow indicators */}
        <circle cx="400" cy="165" r="4" fill="currentColor" className="text-primary" />
        <circle cx="800" cy="165" r="4" fill="currentColor" className="text-primary" />
        {/* Chart elements */}
        <path d="M130,200 L170,180 L210,190 L250,160 L270,170" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M530,180 L570,200 L610,170 L650,190 L670,160" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M930,190 L970,170 L1010,185 L1050,155 L1070,165" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            LIVE DECISION TOOLS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Customized Applications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore interactive applications built to transform complex energy and maritime data into actionable strategic intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl bg-card border border-border ${app.borderAccent} transition-all duration-300 overflow-hidden`}
            >
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${app.accent} opacity-50`} />

              <div className="relative p-6 flex flex-col h-full">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${app.iconBg} mb-5`}>
                  <app.icon className={`w-7 h-7 ${app.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {app.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                  {app.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {app.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="inline-flex px-2.5 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={app.url} target="_blank" rel="noopener noreferrer">
                    Launch Application
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
