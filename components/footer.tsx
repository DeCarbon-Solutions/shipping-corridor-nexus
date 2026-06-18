import { Linkedin, Mail, Github, GraduationCap } from "lucide-react";

const SUBSTACK_URL = 'https://cjenergy.substack.com/?r=3mcwnu&utm_campaign=pub-share-checklist';

export function Footer() {
  return (
    <footer id="contact" className="px-6 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Name & Title */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-foreground">
              Chase Ji, PhD, PMP
            </p>
            <p className="text-sm text-muted-foreground">
              Energy Transition Strategist | Analytics Architect
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/chenxiji/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="https://github.com/DeCarbon-Solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://scholar.google.com/citations?user=EtvSCS4AAAAJ&hl=en&oi=ao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              aria-label="Google Scholar"
            >
              <GraduationCap className="w-5 h-5" />
              <span className="hidden sm:inline">Scholar</span>
            </a>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              aria-label="Substack Newsletter"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
              <span className="hidden sm:inline">Newsletter</span>
            </a>
            <a
              href="mailto:chaseji@yahoo.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Chase Ji, PhD, PMP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
