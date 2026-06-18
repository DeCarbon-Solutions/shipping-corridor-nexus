import { Mic2, MapPin, Calendar, ExternalLink } from "lucide-react";

const speakingEngagements = [
  {
    title: "Promising Marine Alternative Fuel Pathways with Consideration of Well to Wake Emissions and Costs",
    event: "AIChE 2025 Spring Meeting & 21st Global Congress on Process Safety",
    location: "Dallas, TX",
    date: "April 2025",
    type: "Conference",
  },
  {
    title: "Exploring the potential of eFuels in marine and shipping",
    event: "Hydrogen and Carbon Capture Technology Expo North America",
    location: "Houston, TX",
    date: "June 2024",
    type: "Conference",
  },
  {
    title: "Holistic Sustainability and Cost Evaluation for Green Shipping Corridor Framework-based Alternative Marine Fuels",
    event: "SNAME Maritime Convention",
    location: "San Diego, CA",
    date: "September 2023",
    type: "Conference",
  },
  {
    title: "Life Cycle Analysis for Promising Alternative Fuels with Consideration of Green Shipping Corridors",
    event: "Hydrogen Technology Expo",
    location: "Houston, TX",
    date: "June 2023",
    type: "Conference",
  },
  {
    title: "LCA for Alternative Marine Fuels: Ammonia As a Marine Fuel",
    event: "Advanced Bioeconomy Leadership Conference 2023",
    location: "Washington DC",
    date: "March 2023",
    type: "Conference",
  },
  {
    title: "Ammonia As a Marine Fuel - Bunkering Operation and Dispersion Simulations",
    event: "Ammonia Energy Association Conference 2022",
    location: "Phoenix, AZ",
    date: "November 2022",
    type: "Conference",
  },
];

export function SpeakingSection() {
  return (
    <section id="speaking" className="relative px-4 py-20 bg-background overflow-hidden">
      {/* Background pattern - podium/microphone shapes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Microphone shapes */}
        <ellipse cx="100" cy="150" rx="20" ry="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <line x1="100" y1="185" x2="100" y2="280" stroke="currentColor" strokeWidth="3" className="text-primary" />
        <ellipse cx="100" cy="290" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />

        <ellipse cx="1100" cy="450" rx="20" ry="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
        <line x1="1100" y1="485" x2="1100" y2="550" stroke="currentColor" strokeWidth="3" className="text-primary" />

        {/* Sound waves */}
        <path d="M140,120 Q160,150 140,180" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
        <path d="M155,100 Q185,150 155,200" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />
        <path d="M170,80 Q210,150 170,220" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" />

        {/* Audience dots */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={400 + (i % 5) * 80}
            cy={450 + Math.floor(i / 5) * 40}
            r="4"
            fill="currentColor"
            className="text-primary"
          />
        ))}
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            SPEAKING & MEDIA
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conference Presentations & Industry Talks
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights on maritime decarbonization, alternative fuels, and energy transition strategy at leading industry events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {speakingEngagements.map((engagement, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-xl border transition-all duration-300 ${engagement.type === "Upcoming"
                  ? "bg-primary/5 border-primary/30 hover:border-primary"
                  : "bg-card border-border hover:border-primary/50"
                }`}
            >
              {engagement.type === "Upcoming" && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    UPCOMING
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${engagement.type === "Upcoming" ? "bg-primary/20" : "bg-secondary"
                  }`}>
                  <Mic2 className={`w-6 h-6 ${engagement.type === "Upcoming" ? "text-primary" : "text-muted-foreground"}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {engagement.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {engagement.event}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {engagement.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {engagement.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Interested in having me speak at your event?
          </p>
          <a
            href="mailto:chaseji@yahoo.com?subject=Speaking Inquiry"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
