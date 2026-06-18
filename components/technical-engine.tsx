"use client";

import { useState } from "react";

const tools = [
  {
    name: "Python",
    category: "Programming",
    description: "Advanced analytics, ML/AI, optimization algorithms",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
      </svg>
    ),
  },
  {
    name: "MATLAB",
    category: "Engineering",
    description: "Mathematical modeling, signal processing, simulation",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 21L1 12l6-3 4.5 6L19 3l4 6-8 12H4.5zM12 15l-3-4-3 1.5 3 6h6l4.5-6.75L17 7l-5 8z"/>
      </svg>
    ),
  },
  {
    name: "SQL",
    category: "Database",
    description: "Data warehousing, complex queries, ETL pipelines",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-5c0 .5-2.13 2-6 2s-6-1.5-6-2V9.77c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V12z"/>
      </svg>
    ),
  },
  {
    name: "Excel",
    category: "Analysis",
    description: "Financial modeling, VBA automation, pivot analysis",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.17 3H7.83C6.82 3 6 3.82 6 4.83v1.67H3c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h3v1.67c0 1.01.82 1.83 1.83 1.83h13.34c1.01 0 1.83-.82 1.83-1.83V4.83C23 3.82 22.18 3 21.17 3zM4 16.5v-7h4v7H4zm17 1.67c0 .46-.37.83-.83.83H7.83c-.46 0-.83-.37-.83-.83V4.83c0-.46.37-.83.83-.83h13.34c.46 0 .83.37.83.83v13.34z"/>
        <path d="M9 8h3v2H9zm5 0h3v2h-3zm-5 4h3v2H9zm5 0h3v2h-3z"/>
      </svg>
    ),
  },
  {
    name: "Tableau",
    category: "Visualization",
    description: "Interactive dashboards, executive reporting",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 1v4h-4v2h4v4h2V7h4V5h-4V1h-2zm-6 8v4H1v2h4.5v4h2v-4H12v-2H7.5V9h-2zm12 0v4H13v2h4.5v4h2v-4H24v-2h-4.5V9h-2zm-6 8v4h-4v2h4v4h2v-4h4v-2h-4v-4h-2z"/>
      </svg>
    ),
  },
  {
    name: "Power BI",
    category: "Visualization",
    description: "Real-time dashboards, DAX analytics, enterprise BI",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 2h4c.55 0 1 .45 1 1v18c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1zM4 10h4c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V11c0-.55.45-1 1-1zm12-4h4c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1z"/>
      </svg>
    ),
  },
  {
    name: "GAMS/AMPL",
    category: "Optimization",
    description: "Mathematical programming, energy system optimization",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Plexos",
    category: "Simulation",
    description: "Energy market simulation, capacity planning",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
      </svg>
    ),
  },
  {
    name: "Snowflake",
    category: "Cloud Data",
    description: "Cloud data warehousing, scalable analytics",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Azure",
    category: "Cloud",
    description: "Cloud infrastructure, ML services, data pipelines",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.05 4.24L6.56 18.05a.5.5 0 00.46.7h7.93l2.77-6.62L13.05 4.24zM8.58 18.75l4.53-8.91 3.61 8.91H8.58zm8.75-14.5L9.7 12.14l6.86 6.36h4.43l-3.66-14.25z"/>
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "Cloud",
    description: "Scalable computing, S3, Lambda, SageMaker",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.76 8.67c0 .32.04.58.1.78.08.2.17.42.3.66.05.08.07.16.07.23 0 .1-.06.2-.18.3l-.6.4c-.09.06-.17.09-.25.09-.1 0-.2-.05-.29-.14-.14-.16-.26-.33-.36-.5-.1-.17-.2-.37-.3-.62-.76.9-1.72 1.35-2.86 1.35-.82 0-1.47-.23-1.94-.7-.48-.46-.72-1.08-.72-1.85 0-.82.29-1.48.87-1.99.58-.5 1.35-.76 2.32-.76.32 0 .65.02 1 .08.34.05.7.13 1.06.23v-.7c0-.74-.15-1.25-.46-1.55-.31-.3-.84-.44-1.6-.44-.35 0-.7.04-1.07.13-.37.09-.72.2-1.06.35-.16.07-.27.11-.34.13-.07.02-.12.03-.16.03-.14 0-.21-.1-.21-.31v-.47c0-.16.02-.28.07-.35.05-.07.14-.14.29-.21.35-.18.76-.33 1.25-.45.48-.13 1-.19 1.54-.19 1.18 0 2.04.27 2.58.8.53.53.8 1.34.8 2.43v3.2zm-3.95 1.48c.31 0 .63-.06.97-.17.34-.12.64-.33.9-.63.15-.19.27-.4.34-.64.07-.24.11-.53.11-.87v-.42c-.27-.07-.55-.13-.85-.17-.3-.04-.59-.06-.87-.06-.63 0-1.1.12-1.4.37-.3.25-.45.6-.45 1.06 0 .43.11.75.34.97.22.23.54.34.95.34zm7.82 1.06c-.18 0-.3-.03-.38-.1-.08-.06-.15-.2-.21-.38l-2.32-7.62c-.06-.19-.09-.32-.09-.38 0-.15.07-.24.22-.24h.9c.19 0 .32.03.39.1.08.06.14.2.2.38l1.66 6.53 1.54-6.53c.05-.19.11-.32.19-.38.08-.07.22-.1.4-.1h.73c.19 0 .32.03.4.1.08.06.15.2.19.38l1.56 6.61 1.71-6.61c.06-.19.13-.32.2-.38.08-.07.21-.1.39-.1h.85c.15 0 .23.08.23.24 0 .05-.01.1-.02.16-.01.06-.03.14-.07.24l-2.38 7.62c-.06.19-.13.32-.21.38-.08.07-.21.1-.38.1h-.79c-.19 0-.32-.03-.4-.1-.08-.07-.15-.2-.19-.39l-1.52-6.36-1.51 6.35c-.05.19-.11.32-.19.39-.08.07-.22.1-.4.1h-.79zm12.52.27c-.49 0-.98-.06-1.45-.18-.47-.12-.84-.25-1.1-.4-.16-.09-.27-.19-.3-.28-.04-.09-.06-.19-.06-.29v-.49c0-.21.08-.31.23-.31.06 0 .12.01.18.03.06.02.15.06.25.1.34.15.71.27 1.1.36.4.09.79.13 1.19.13.63 0 1.12-.11 1.46-.34.34-.22.52-.55.52-.97 0-.29-.09-.53-.27-.72-.18-.19-.52-.37-1.01-.52l-1.45-.45c-.73-.23-1.27-.57-1.6-1.02-.33-.44-.5-.93-.5-1.47 0-.42.09-.8.28-1.13.18-.33.43-.62.74-.86.31-.24.67-.42 1.08-.55.41-.12.85-.18 1.31-.18.23 0 .47.01.71.04.25.03.48.07.71.12.22.05.43.11.63.18.2.07.36.14.48.21.16.09.28.18.34.28.07.09.1.21.1.35v.45c0 .21-.08.32-.23.32-.08 0-.21-.04-.38-.12-.57-.26-1.21-.38-1.93-.38-.57 0-1.02.09-1.33.28-.31.18-.47.47-.47.86 0 .29.1.53.3.73.2.2.57.39 1.11.56l1.42.45c.72.23 1.24.55 1.56.96.32.41.47.87.47 1.39 0 .43-.09.83-.26 1.18-.17.35-.42.66-.73.92-.31.27-.69.47-1.13.61-.45.16-.94.23-1.48.23z"/>
      </svg>
    ),
  },
  {
    name: "Streamlit",
    category: "Apps",
    description: "Rapid prototyping, interactive decision apps",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11.25h-13L12 6.5z"/>
      </svg>
    ),
  },
];

const categories = ["All", "Programming", "Engineering", "Database", "Analysis", "Visualization", "Optimization", "Simulation", "Cloud Data", "Cloud", "Apps"];

export function TechnicalEngine() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <section className="relative px-4 py-20 overflow-hidden">
      {/* Background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M60 0 L0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#techGrid)" />
        <circle cx="200" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.3" />
        <circle cx="1000" cy="450" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.3" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-wider mb-3">
            THE TECHNICAL ENGINE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tools & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit powering AI-driven mathematical optimization, data analytics, and decision intelligence systems.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300"
            >
              <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                {tool.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground text-center mb-1">
                {tool.name}
              </h3>
              <p className="text-xs text-primary/80 font-medium">
                {tool.category}
              </p>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 w-48">
                <p className="text-xs text-muted-foreground text-center">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <p className="text-3xl font-bold text-primary mb-1">12+</p>
            <p className="text-sm text-muted-foreground">Core Tools</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <p className="text-3xl font-bold text-primary mb-1">15+</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <p className="text-3xl font-bold text-primary mb-1">PhD</p>
            <p className="text-sm text-muted-foreground">Advanced Analytics</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <p className="text-3xl font-bold text-primary mb-1">PMP</p>
            <p className="text-sm text-muted-foreground">Project Management</p>
          </div>
        </div>
      </div>
    </section>
  );
}
