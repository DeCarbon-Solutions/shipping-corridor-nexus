"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-foreground opacity-[0.03]"/>
        </svg>
      </div>
      
      {/* Geometric accent elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-blue-600/10 rotate-45 opacity-30" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-blue-600/5 rotate-12 opacity-20" />
      <div className="absolute top-1/3 left-1/6 w-32 h-32 border border-blue-600/10 -rotate-12 opacity-20" />
      
      {/* Abstract Energy Triangle Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <svg viewBox="0 0 400 400" className="w-[800px] h-[800px]">
          {/* Outer triangle */}
          <polygon 
            points="200,40 360,320 40,320" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-blue-500"
          />
          {/* Inner triangle */}
          <polygon 
            points="200,100 300,280 100,280" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-lime-400"
          />
          {/* Center arrow */}
          <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="2" className="text-lime-400" />
          <polygon points="350,200 330,190 330,210" fill="currentColor" className="text-lime-400" />
        </svg>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-transparent" />
      
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-balance">
          <span className="text-foreground">Navigating Critical Energy Transition:</span>
          <br />
          <span className="text-blue-500">Architectural Clarity</span>
          <span className="text-foreground"> Where Physical Constraints and Regulatory Volatility Collide.</span>
        </h1>
        
        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed text-pretty">
          De-risking nine-figure capital allocations through high-fidelity TEA and AI-driven mathematical optimization.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#newsletters">
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold tracking-wide"
            >
              Subscribe to CJ&apos;s Newsletter
            </Button>
          </a>
          <a href="#tools">
            <Button 
              variant="outline" 
              size="lg"
              className="border-border text-foreground hover:bg-secondary font-semibold tracking-wide group"
            >
              View Decision Tools
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
