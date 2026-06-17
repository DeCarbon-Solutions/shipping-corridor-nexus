"use client";

import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-ocean-950/80 border-t border-ocean-800/30 px-4 py-2 flex items-center justify-between text-[10px] text-gray-600 z-20">
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-gray-500">Green Shipping Corridor Dashboard</span>
        <span>·</span>
        <span>MIT License</span>
        <span>·</span>
        <span>Sample data for demonstration</span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <Github className="w-3 h-3" />
          <span>GitHub</span>
        </a>
        <a
          href="https://www.imo.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span>IMO Data</span>
        </a>
      </div>
    </footer>
  );
}
