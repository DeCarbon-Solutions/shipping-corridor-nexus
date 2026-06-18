import { AlertTriangle, Lightbulb, Rocket, ArrowRight } from "lucide-react";

const advantages = [
  {
    icon: AlertTriangle,
    step: "01",
    label: "The Problem",
    title: "Static Reporting",
    description:
      "Most organizations rely on annualized ESG reports that are outdated the moment they are published. Static data cannot navigate volatile markets, leaving executives blind to real-time risks and opportunities.",
    accent: "text-red-400",
    bgAccent: "bg-red-500/10",
    borderAccent: "border-red-500/30",
  },
  {
    icon: Lightbulb,
    step: "02",
    label: "The Solution",
    title: "Dynamic Optimization",
    description:
      'I deploy Stochastic Optimization and AI to quantify the "What-If." Translating uncertainty into mathematically optimal, actionable strategies that adapt as market conditions evolve in real-time.',
    accent: "text-yellow-400",
    bgAccent: "bg-yellow-500/10",
    borderAccent: "border-yellow-500/30",
  },
  {
    icon: Rocket,
    step: "03",
    label: "The Deliverables",
    title: "Decision Apps & Digital Twins",
    description:
      "Not a PDF, but Customized Decision Apps, Real-Time Platforms, and Digital Twin Dashboards that update dynamically as market prices, fuel pathways, and regulations shift.",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
    borderAccent: "border-primary/30",
  },
];

export function BridgeAdvantage() {
  return (
    <section className="px-4 py-20 bg-secondary/30 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            WHY OPTIMIZATION TRUMPS REPORTING
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The &quot;Bridge&quot; Advantage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to transforming energy market uncertainty into board-room action.
          </p>
        </div>

        {/* Workflow visualization */}
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-primary/20 -translate-y-1/2 z-0" />
          <div className="hidden md:flex absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-background border-2 border-yellow-500/50 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
          <div className="hidden md:flex absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 z-10">
            <div className="w-8 h-8 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
            {advantages.map((item, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-card border-2 ${item.borderAccent} hover:border-primary/50 transition-all duration-300`}
              >
                {/* Step number badge */}
                <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full ${item.bgAccent} border-2 ${item.borderAccent} flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${item.accent}`}>{item.step}</span>
                </div>

                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.bgAccent} mb-6 mt-2`}
                >
                  <item.icon className={`w-7 h-7 ${item.accent}`} />
                </div>
                
                <p className={`text-sm font-medium ${item.accent} mb-2 uppercase tracking-wider`}>
                  {item.label}
                </p>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Mobile arrow indicator */}
                {index < 2 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center rotate-90">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
