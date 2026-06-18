"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Dilemmas", href: "#dilemmas" },
  { label: "Live Decision Tools", href: "#tools" },
  { label: "About Chase", href: "#architect" },
  { label: "Publications & Media", href: "#intelligence" },
  { label: "Newsletters", href: "#newsletters" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Chase Ji, PhD, PMP
            </span>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              Energy Transition Strategist
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href="#newsletters">
              <Button 
                size="sm" 
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              >
                Subscribe the latest energy transition newsletters
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-6 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#newsletters">
                <Button 
                  size="sm" 
                  className="bg-blue-600 text-white hover:bg-blue-700 font-semibold w-full mt-2"
                >
                  Subscribe the latest energy transition newsletters
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
