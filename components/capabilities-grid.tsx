import Image from "next/image";
import {
  DollarSign,
  Shield,
  Route,
  Brain,
  AlertTriangle,
  Zap,
} from "lucide-react";

const capabilities = [
  {
    icon: DollarSign,
    title: "Strategic Capital Allocation & Portfolio Hedging",
    focus: "Protecting ROI in multi-billion dollar low-carbon transitions.",
    pitch:
      "Engineering risk-adjusted models for hybrid energy assets. I utilize stochastic stress-testing to ensure financial resilience against volatile carbon markets and fluctuating commodity spreads.",
    outcomes: ["CapEx Optimization", "NPV-at-Risk", "Revenue Stack Diversification"],
    image: "/images/dashboard-analytics.jpg",
  },
  {
    icon: Shield,
    title: "Regulatory Arbitrage & Market Design Defense",
    focus: "Navigating the global policy shift into a competitive moat.",
    pitch:
      "Translating Net-Zero frameworks and regional carbon taxes into strategic advantages. I specialize in cross-border lifecycle analysis to generate compliance surpluses and capture green premiums.",
    outcomes: ["Policy Risk Mitigation", "Carbon Credit Optimization", "Regulatory Moat Construction"],
    image: "/images/regulatory-compliance.jpg",
  },
  {
    icon: Route,
    title: "Dynamic Energy Systems Pathfinding",
    focus: "Real-time recalibration of Net-Zero infrastructure roadmaps.",
    pitch:
      "Building multi-objective optimization models that adjust transition timelines based on real-time cost curves for Hydrogen, CCS, and Long-Duration Storage.",
    outcomes: ["Technology Readiness (TRL) Tracking", "Asset Agility", "Grid-Edge Intelligence"],
    image: "/images/energy-infrastructure.jpg",
  },
  {
    icon: Brain,
    title: "Decision Intelligence (DI) & Governance Architecture",
    focus: 'Moving from "Static ESG Reports" to "Real-Time Executive Governance."',
    pitch:
      "Architecting DI ecosystems that transform fragmented utility and market data into interactive governance views, enabling C-suites to pivot strategies as fast as markets move.",
    outcomes: ["Executive Command Centers", "Real-time Latency Reduction", "Data-Driven Governance"],
    image: "/images/strategic-planning.jpg",
  },
  {
    icon: AlertTriangle,
    title: "Stranded Asset & Resilience Modeling",
    focus: 'Quantifying the "Economic Expiry" of fossil-heavy portfolios.',
    pitch:
      "Developing quantitative valuation models to assess the risk of premature asset retirement. I protect portfolios from sudden valuation drops caused by technological disruption or strict emissions caps.",
    outcomes: ["Stranded Asset Mitigation", "Life-cycle Asset Value (LAV) Analysis"],
    image: "/images/optimization-modeling.jpg",
  },
  {
    icon: Zap,
    title: "Prescriptive Analytics & Digital Twin",
    focus: "Mathematical certainty in daily energy system execution.",
    pitch:
      "Moving beyond descriptive analytics to prescriptive execution. I model system-wide data to deliver optimal instructions for load balancing, storage dispatch, and carbon-intensity protection through real-time digital twin simulations.",
    outcomes: ["Operational De-risking", "Efficiency Yield", "Prescriptive Execution"],
    image: "/images/digital-twin.jpg",
  },
];

// Background pattern SVGs for each capability
function CapitalAllocationBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <path d="M50,150 L100,100 L150,130 L200,80 L250,120 L300,70 L350,110" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <circle cx="100" cy="100" r="6" fill="currentColor" className="text-primary" />
      <circle cx="200" cy="80" r="6" fill="currentColor" className="text-primary" />
      <circle cx="300" cy="70" r="6" fill="currentColor" className="text-primary" />
      <rect x="80" y="200" width="40" height="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <rect x="140" y="180" width="40" height="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <rect x="200" y="160" width="40" height="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <rect x="260" y="140" width="40" height="120" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
    </svg>
  );
}

function RegulatoryBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <circle cx="200" cy="150" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <circle cx="200" cy="150" r="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <line x1="200" y1="70" x2="200" y2="230" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <line x1="120" y1="150" x2="280" y2="150" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <path d="M50,50 L100,50 L100,80 L50,80 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <path d="M300,50 L350,50 L350,80 L300,80 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <path d="M50,220 L100,220 L100,250 L50,250 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <path d="M300,220 L350,220 L350,250 L300,250 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
    </svg>
  );
}

function PathfindingBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <path d="M50,250 Q100,200 150,220 T250,180 T350,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <circle cx="50" cy="250" r="8" fill="currentColor" className="text-primary" />
      <circle cx="150" cy="220" r="6" fill="currentColor" className="text-primary" />
      <circle cx="250" cy="180" r="6" fill="currentColor" className="text-primary" />
      <circle cx="350" cy="100" r="8" fill="currentColor" className="text-primary" />
      <polygon points="320,60 350,80 380,60 380,100 350,120 320,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
      <line x1="100" y1="50" x2="150" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
    </svg>
  );
}

function GovernanceBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect x="50" y="50" width="120" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <rect x="230" y="50" width="120" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <rect x="140" y="170" width="120" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <line x1="110" y1="130" x2="170" y2="170" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <line x1="290" y1="130" x2="230" y2="170" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <circle cx="200" cy="150" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
    </svg>
  );
}

function StrandedAssetBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <path d="M50,200 Q100,180 150,190 T250,150 T350,50" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray="8,4" />
      <polygon points="100,250 130,200 160,250" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <polygon points="250,220 280,170 310,220" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <circle cx="350" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <line x1="340" y1="40" x2="360" y2="60" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <line x1="360" y1="40" x2="340" y2="60" stroke="currentColor" strokeWidth="2" className="text-primary" />
    </svg>
  );
}

function DigitalTwinBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <ellipse cx="200" cy="150" rx="150" ry="100" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <ellipse cx="200" cy="150" rx="100" ry="66" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <ellipse cx="200" cy="150" rx="50" ry="33" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <line x1="200" y1="50" x2="200" y2="250" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <line x1="50" y1="150" x2="350" y2="150" stroke="currentColor" strokeWidth="1" className="text-primary" />
      <circle cx="200" cy="150" r="8" fill="currentColor" className="text-primary" />
      <circle cx="280" cy="120" r="4" fill="currentColor" className="text-primary" />
      <circle cx="120" cy="180" r="4" fill="currentColor" className="text-primary" />
    </svg>
  );
}

const backgroundComponents = [
  CapitalAllocationBg,
  RegulatoryBg,
  PathfindingBg,
  GovernanceBg,
  StrandedAssetBg,
  DigitalTwinBg,
];

export function CapabilitiesGrid() {
  return (
    <section id="insights" className="relative px-4 py-20 overflow-hidden">
      {/* Section background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.015]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0,200 Q300,180 600,220 T1200,180" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" />
        <path d="M0,400 Q400,380 800,420 T1200,400" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <path d="M0,600 Q200,620 500,580 T1200,620" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            EXPERT & SIGNATURE CAPABILITIES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strategic Functions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            High-stakes strategic blocks for energy transition optimization, ESG compliance, and infrastructure de-risking.
          </p>
        </div>

        {/* 3x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => {
            const BgComponent = backgroundComponents[index];
            return (
              <div
                key={index}
                className="group relative rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Background pattern specific to this capability */}
                <BgComponent />
                
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden z-10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                </div>
                
                <div className="relative z-10 p-6 flex flex-col flex-grow">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                    {item.title}
                  </h3>

                  {/* Focus */}
                  <p className="text-sm text-primary font-medium mb-3">
                    {item.focus}
                  </p>

                  {/* Pitch */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                    {item.pitch}
                  </p>

                  {/* Core Outcomes */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Core Outcomes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.outcomes.map((outcome, outcomeIndex) => (
                        <span
                          key={outcomeIndex}
                          className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
