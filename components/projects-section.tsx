import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, MapPin } from "lucide-react";

const projects = [
  {
    icon: TrendingUp,
    title: "AUTONOMOUS CAPITAL ALLOCATION ENGINE",
    challenge:
      "Balancing traditional Upstream returns against high-stakes Low-Carbon growth without eroding portfolio NPV.",
    approach:
      "Developed a proprietary optimization application that allows leadership to stress-test the 'Efficient Frontier' of their portfolio. Unlike a static memo, this tool provides live sensitivity analysis for nine-figure investments.",
    deliverable:
      "A custom Portfolio Decision App for real-time sensitivity analysis, moving beyond static annual strategy memos.",
    impact:
      "Optimized $500M+ in capital redeployment, maximizing risk-adjusted returns while securing a defensible decarbonization posture.",
    tags: ["Python", "SQL", "Excel"],
    accent: "border-l-emerald-500",
  },
  {
    icon: Shield,
    title: "FLEET EMISSIONS & COMPLIANCE COMMAND CENTER",
    challenge:
      "Mitigating multi-year compliance risks for a 1,000+ vessel fleet amidst shifting IMO regulations and opaque fuel supply chains.",
    approach:
      "Built a dynamic monitoring platform that predicts CII ratings under varying operational scenarios. It shifts the focus from annual reporting to daily operational optimization, preserving asset book value.",
    deliverable:
      "A Dynamic Compliance Dashboard that enables daily operational pivots to ensure 100% CII adherence.",
    impact:
      'Eliminated multi-million dollar penalty exposure and preserved vessel valuations by transitioning from "reporting" to "proactive optimization."',
    tags: ["Python", "SQL", "PowerBI"],
    accent: "border-l-blue-500",
  },
  {
    icon: MapPin,
    title: "GLOBAL SUPPLY CHAIN INVESTMENT PRIORITIZER",
    challenge:
      'Identifying the "Optimal Entry Point" for alternative fuel infrastructure investments to avoid stranded assets in a fragmented market.',
    approach:
      "Built a Techno-Economic Framework that scores global readiness against real-time supply-demand signals and fuel maturity curves.",
    deliverable:
      "A Dynamic Investment Roadmap Tool that recalibrates prioritization based on live policy shifts and fuel price volatility.",
    impact:
      "Synchronized a decade-long $100M+ CAPEX roadmap with market reality, ensuring infrastructure spend is perfectly aligned with asset readiness.",
    tags: ["Python", "SQL", "Excel"],
    accent: "border-l-amber-500",
  },
];

export function ProjectsSection() {
  return (
    <section className="px-4 py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            DRIVING ACTION FROM DATA: MY PROJECTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Case Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing my track record in alternative fuels, infrastructure readiness, 
            compliance, and market intelligence research.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 border-l-4 ${project.accent}`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Header */}
                <div className="lg:w-1/3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-secondary text-muted-foreground text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content Grid */}
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                      Strategic Challenge
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                      Optimization Approach
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.approach}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                      Live Deliverable
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.deliverable}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                      C-Suite Impact
                    </p>
                    <p className="text-foreground text-sm leading-relaxed font-medium">
                      {project.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
