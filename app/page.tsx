import { Navigation } from "@/components/navigation";
import { EnergyPricesTicker } from "@/components/energy-prices-ticker";
import { HeroSection } from "@/components/hero-section";
import { MethodologySection } from "@/components/methodology-section";
import { DilemmaMatrix } from "@/components/dilemma-matrix";
import { DecisionTools } from "@/components/decision-tools";
import { ArchitectSection } from "@/components/architect-section";
import { IntelligenceDashboard } from "@/components/intelligence-dashboard";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <EnergyPricesTicker />
      </div>
      <HeroSection />
      <MethodologySection />
      <DilemmaMatrix />
      <DecisionTools />
      <ArchitectSection />
      <IntelligenceDashboard />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
