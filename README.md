# 🌊 Green Shipping Corridor Dashboard

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Deck.gl](https://img.shields.io/badge/Deck.gl-9.1-blue)](https://deck.gl/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-ORG/green-shipping-corridor-dashboard)

**Interactive open-source dashboard for monitoring global maritime decarbonization, alternative fuel bunkering, and green shipping corridors.**

One single page. Zero backend. Zero API keys required. Deploy in under 3 minutes.

---

## What It Does

- **3D Globe Map** — Explore 30+ curated global bunkering ports color-coded by available alternative fuels (LNG, biofuel, green methanol, ammonia)
- **Green Corridor Routes** — Animated arcs showing 10 declared green shipping corridors worldwide
- **Vessel Overlay** — Toggle a layer of 30 sample vessels in Emission Control Areas, color-coded by CII rating (A–E)
- **What-If Calculator** — Drag sliders to simulate fuel mix transitions and see CO₂ reduction, cost delta, and IMO 2030/2050 compliance update in real time
- **Share Scenarios** — Copy a URL-encoded link of your fuel mix scenario — no account needed

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- npm or pnpm

### Install & Run

```bash
git clone https://github.com/YOUR-ORG/green-shipping-corridor-dashboard.git
cd green-shipping-corridor-dashboard
npm install
npm run dev
# Open http://localhost:3000
```

### Configure (Optional)

```bash
cp .env.example .env
# Optionally add NEXT_PUBLIC_MAPBOX_TOKEN for satellite basemap
# The app works out of the box with free Carto dark-matter tiles
```

---

## Deploy

### Option A: Vercel (Recommended — One Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-ORG/green-shipping-corridor-dashboard)

No environment variables needed. Click, wait ~60 seconds, done.

### Option B: Static Export

```bash
# Add output: 'export' to next.config.js
npm run build
# Deploy /out to any static host (Netlify, GitHub Pages, S3, Cloudflare Pages)
```

### Option C: Docker

```bash
docker build -t green-shipping-dashboard .
docker run -p 3000:3000 green-shipping-dashboard
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Map | Deck.gl + react-map-gl + MapLibre GL |
| Charts | Recharts |
| Animations | Framer Motion |
| State | React useState + URL params |
| Basemap | Carto dark-matter (free, no API key) |
| Hosting | Vercel (free tier) |

---

## Data

All data is **static JSON** bundled in `/public/data/`:

| File | Records | Description |
|------|---------|-------------|
| `ports.json` | 30 | Curated bunkering ports worldwide |
| `vessels.json` | 30 | Sample vessels with CII ratings |
| `corridors.json` | 10 | Green corridor routes |
| `fuel-factors.json` | 6 | Emission & cost factors per fuel type |

> **Note:** This is sample/seed data for demonstration purposes. See the iteration backlog for plans to integrate live AIS data and expand the port database.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single-page entry — assembles all sections
│   └── globals.css         # Dark maritime theme
├── components/
│   ├── globe/              # Deck.gl map + layer components
│   ├── panels/             # Port detail panel + vessel tooltip
│   ├── calculator/         # What-If sliders + charts + badges
│   ├── stats/              # Animated counters + sparklines
│   └── layout/             # Footer
├── lib/                    # Data loading, calculations, constants
└── types/                  # TypeScript interfaces
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

[MIT](LICENSE) — use it however you like.

---

## Acknowledgements

- Emission factors based on IMO GHG Study 2020 & ICCT Maritime data
- Port data curated from public sources (Global Maritime Forum, Getting to Zero Coalition)
- Built with [Deck.gl](https://deck.gl/), [Next.js](https://nextjs.org/), [Recharts](https://recharts.org/)
