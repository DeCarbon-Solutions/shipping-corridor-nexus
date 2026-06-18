"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export function GatewaySection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 px-6 bg-secondary/60">
      <div className="max-w-2xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          The Compliance Advantage:{" "}
          <span className="text-primary">Strategic Briefing</span>
        </h2>

        {/* Copy */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Weekly executive briefings on proprietary TEA methodologies and regulatory arbitrage. 
          No noise, just data.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-primary">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Intelligence unlocked. Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <Button 
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Unlock Intelligence
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
