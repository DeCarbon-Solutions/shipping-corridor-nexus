'use client';

import { useState } from 'react';
import NewsletterEmbed from '@/components/NewsletterEmbed';

const SUBSTACK_URL = 'https://chaseji.substack.com/?r=3mcwnu&utm_campaign=pub-share-checklist';

const newsletters = [
  {
    id: 'eu-ets',
    label: 'EU ETS & FuelEU',
    tag: 'Mar 2026',
    description: 'Carbon pricing meets fuel intensity standards',
    src: '/newsletters/eu_ets_fueleu_newsletter.html',
    color: 'blue' as const,
  },
  {
    id: 'imo',
    label: 'IMO Emissions',
    tag: 'Mar 2026',
    description: 'MARPOL Annex VI — NOx, SOx & GHG framework',
    src: '/newsletters/imo_emissions_newsletter.html',
    color: 'teal' as const,
  },
  {
    id: 'green-corridors', label: 'Green Corridors', tag: 'Mar 2026',
    description: 'Global corridor portfolio — 21 to 84 in three years',
    src: '/newsletters/green_shipping_corridor_newsletter.html', color: 'teal'
  },
  {
    id: 'fueleu-pooling', label: 'FuelEU Pooling', tag: 'Mar 2026',
    description: 'End-to-end pooling workflow — 8 phases, 4 hard deadlines',
    src: '/newsletters/fueleu_pooling_newsletter.html', color: 'blue'
  },
  {
    id: 'IMO-MEPC 84-Outcome', label: 'IMO MEPC 84', tag: 'April 2026',
    description: 'Will IMO NZF survive?',
    src: '/newsletters/CJ_MEPC84_Newsletter.html', color: 'gold'
  },
];

export function NewsletterSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="newsletters" className="py-16 px-6">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Energy Transition Newsletters
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Weekly insights on regulatory developments, carbon market movements,
          and strategic frameworks for the energy transition.
        </p>

        {/* Substack subscribe button */}
        <div className="flex justify-center">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
            Subscribe on Substack
          </a>
        </div>
      </div>

      {/* Issue tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 mb-6">
          {newsletters.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setActive(i)}
              className={`flex-1 text-left px-5 py-4 rounded-lg border transition-all ${active === i
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/[0.03] border-white/[0.08] text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{n.label}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${active === i
                  ? n.color === 'blue'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-teal-500/20 text-teal-400'
                  : 'bg-white/5 text-gray-600'
                  }`}>
                  {n.tag}
                </span>
              </div>
              <div className="text-xs text-gray-600">{n.description}</div>
            </button>
          ))}
        </div>

        {/* Newsletter iframe */}
        <NewsletterEmbed src={newsletters[active].src} />
      </div>

    </section>
  );
}

export default NewsletterSection;
