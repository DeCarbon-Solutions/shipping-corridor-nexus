import { ExternalLink, BookOpen, FileText, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const publications = [
  {
    type: "Journal",
    title: "A data-driven study of IMO compliant fuel emissions with consideration of black carbon aerosols",
    venue: "Ocean Engineering",
    year: "2020",
    citations: 67,
    icon: BookOpen,
  },
  {
    type: "Journal",
    title: "Post-combustion carbon capture for tank to propeller via process modeling and simulation",
    venue: "Journal of CO2 Utilization",
    year: "2021",
    citations: 56,
    icon: BookOpen,
  },
  {
    type: "Journal",
    title: "Predicting flammability-leading properties for liquid aerosol safety via machine learning",
    venue: "Process Safety and Environmental Protection",
    year: "2021",
    citations: 39,
    icon: BookOpen,
  },
  {
    type: "Journal",
    title: "Risk informed floating storage and re-gasification unit (FSRU) location selection for local natural gas supply",
    venue: "Ocean Engineering",
    year: "2023",
    citations: 18,
    icon: BookOpen,
  },
  {
    type: "Industry Report",
    title: "Potential of Hydrogen as Fuel for Shipping",
    venue: "European Maritime Safety Agency (EMSA)",
    year: "2023",
    citations: null,
    icon: Award,
  },
  {
    type: "Industry Report",
    title: "Feasibility study of future energy options for Great Lakes shipping",
    venue: "International Council on Clean Transportation (ICCT)",
    year: "2024",
    citations: null,
    icon: Award,
  },
  {
    type: "Conference",
    title: "Holistic Sustainability and Cost Evaluation for Green Shipping Corridor Framework-based Alternative Marine Fuels",
    venue: "SNAME Maritime Convention",
    year: "2023",
    citations: null,
    icon: FileText,
  },
  {
    type: "Conference",
    title: "Promising Marine Alternative Fuel Pathways with Consideration of Well to Wake Emissions and Costs",
    venue: "AIChE Global Congress on Process Safety",
    year: "2025",
    citations: null,
    icon: FileText,
  },
];

export function PublicationsSection() {
  return (
    <section id="publications" className="relative px-4 py-20 bg-secondary/20 overflow-hidden">
      {/* Background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.015]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Book/document shapes */}
        <rect x="50" y="100" width="80" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <line x1="60" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="60" y1="150" x2="110" y2="150" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="60" y1="170" x2="115" y2="170" stroke="currentColor" strokeWidth="1" className="text-primary" />
        
        <rect x="1070" y="400" width="80" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <line x1="1080" y1="430" x2="1140" y2="430" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="1080" y1="450" x2="1130" y2="450" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <line x1="1080" y1="470" x2="1135" y2="470" stroke="currentColor" strokeWidth="1" className="text-primary" />
        
        {/* Citation network */}
        <circle cx="600" cy="100" r="6" fill="currentColor" className="text-primary" />
        <circle cx="500" cy="200" r="4" fill="currentColor" className="text-primary" />
        <circle cx="700" cy="200" r="4" fill="currentColor" className="text-primary" />
        <circle cx="450" cy="300" r="4" fill="currentColor" className="text-primary" />
        <circle cx="550" cy="300" r="4" fill="currentColor" className="text-primary" />
        <circle cx="650" cy="300" r="4" fill="currentColor" className="text-primary" />
        <circle cx="750" cy="300" r="4" fill="currentColor" className="text-primary" />
        <path d="M600,100 L500,200 M600,100 L700,200" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M500,200 L450,300 M500,200 L550,300" stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d="M700,200 L650,300 M700,200 L750,300" stroke="currentColor" strokeWidth="1" className="text-primary" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            PUBLICATIONS & THOUGHT LEADERSHIP
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industrial Thought Leadership Whitepapers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Peer-reviewed research and industry publications advancing the science of maritime decarbonization and energy transition strategy.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">20+</p>
              <p className="text-sm text-muted-foreground">Publications</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">400+</p>
              <p className="text-sm text-muted-foreground">Citations</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">EMSA</p>
              <p className="text-sm text-muted-foreground">& ICCT Reports</p>
            </div>
          </div>
          
          <Button 
            asChild 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            <a 
              href="https://scholar.google.com/citations?user=EtvSCS4AAAAJ&hl=en&oi=ao" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              View Full Profile on Google Scholar
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <pub.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {pub.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{pub.year}</span>
                    {pub.citations && (
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {pub.citations} citations
                      </span>
                    )}
                  </div>
                  <h3 className="text-foreground font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{pub.venue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
