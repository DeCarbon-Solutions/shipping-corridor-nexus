import Image from "next/image";
import { Lightbulb, Cpu, TrendingUp } from "lucide-react";

const aboutBlocks = [
  {
    icon: Lightbulb,
    title: "The Strategic Vision",
    subtitle: "The Bridge Between Data and Decision",
    description:
      "I operate at the critical intersection of global energy logistics and the energy transition. In an era defined by regulatory volatility and shifting fuel pathways, I help organizations move beyond \"reactive compliance\" and toward \"proactive strategy.\" My focus is not just on quantifying the transition, but on architecting the frameworks that allow leadership to navigate it with mathematical certainty.",
    accent: "text-yellow-400",
    bgAccent: "bg-yellow-500/10",
    borderAccent: "border-l-yellow-400",
  },
  {
    icon: Cpu,
    title: "The Technical Engine",
    subtitle: "AI-Driven Mathematical Optimization",
    description:
      "Leveraging a PhD-led foundation in energy systems engineering and advanced analytics, I specialize in AI-driven Mathematical Optimization. By deploying stochastic modeling and techno-economic frameworks, I translate complex data sets into high-fidelity \"Decision Intelligence.\" My approach bridges the gap between raw data and ROI, replacing static, annualized ESG reports with dynamic tools that recalibrate in real-time as market conditions shift.",
    accent: "text-blue-400",
    bgAccent: "bg-blue-500/10",
    borderAccent: "border-l-blue-400",
  },
  {
    icon: TrendingUp,
    title: "The Business Impact",
    subtitle: "Nine-Figure Strategic Compass",
    description:
      "Throughout my career, my deliverables have served as the strategic compass for nine-figure capital allocations. From optimizing $500M+ portfolio pivots to securing 100% regulatory adherence for thousand-vessel fleets, my work is measured by its impact on the bottom line. I don't just deliver reports; I deliver customized, dynamic applications that empower executives to de-risk investments and capture the \"Efficient Frontier\" of the low-carbon economy.",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
    borderAccent: "border-l-primary",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-20 bg-secondary/20 overflow-hidden">
      {/* Abstract background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Network nodes */}
        <circle cx="100" cy="100" r="8" fill="currentColor" className="text-primary" />
        <circle cx="300" cy="200" r="6" fill="currentColor" className="text-primary" />
        <circle cx="500" cy="100" r="8" fill="currentColor" className="text-primary" />
        <circle cx="700" cy="250" r="6" fill="currentColor" className="text-primary" />
        <circle cx="900" cy="150" r="8" fill="currentColor" className="text-primary" />
        <circle cx="1100" cy="200" r="6" fill="currentColor" className="text-primary" />
        <circle cx="200" cy="400" r="6" fill="currentColor" className="text-primary" />
        <circle cx="600" cy="450" r="8" fill="currentColor" className="text-primary" />
        <circle cx="1000" cy="400" r="6" fill="currentColor" className="text-primary" />
        
        {/* Connecting lines */}
        <path d="M100,100 Q200,150 300,200 T500,100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M500,100 Q600,175 700,250 T900,150" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M900,150 Q1000,175 1100,200" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M200,400 Q400,425 600,450 T1000,400" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        
        {/* Data flow arrows */}
        <path d="M300,200 L200,400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
        <path d="M700,250 L600,450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
        <path d="M900,150 L1000,400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-primary" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            ABOUT CHASE JI
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Bridge Between Data and Decision
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Architecting frameworks that transform energy market complexity into mathematical certainty.
          </p>
        </div>

        {/* Profile photo and intro */}
        <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
          <div className="relative">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/10">
              <Image
                src="/images/chase-ji-profile.jpg"
                alt="Chase Ji, PhD, PMP - Energy Transition Strategist"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-lg">
              <p className="text-primary font-semibold text-sm">Chase Ji, PhD, PMP</p>
              <p className="text-muted-foreground text-xs">Energy Transition Strategist</p>
            </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Transforming Regulatory Volatility into Strategic Advantage
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With a PhD in energy systems engineering and PMP certification, I combine deep technical expertise 
              with strategic business acumen. My mission is to help organizations navigate the complex landscape 
              of the energy transition with data-driven confidence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From IMO 2030/2050 compliance to FuelEU regulatory frameworks, I architect decision intelligence 
              systems that transform uncertainty into actionable strategy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {aboutBlocks.map((item, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-card border border-border border-l-4 ${item.borderAccent} hover:border-primary/50 transition-all duration-300`}
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.bgAccent} mb-6`}
              >
                <item.icon className={`w-7 h-7 ${item.accent}`} />
              </div>
              
              <p className={`text-sm font-medium ${item.accent} mb-2 uppercase tracking-wider`}>
                {item.title}
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {item.subtitle}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
