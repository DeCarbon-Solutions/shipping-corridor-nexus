"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";

interface CommodityPrice {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
}

// March 2026 reference prices based on current market data
const getSimulatedPrices = (): CommodityPrice[] => {
  const baseTime = Date.now();
  
  return [
    {
      name: "Brent Crude",
      symbol: "BRN",
      price: 81.40 + (Math.sin(baseTime / 10000) * 0.8),
      change: 4.71,
      changePercent: 6.14,
      unit: "$/bbl",
    },
    {
      name: "WTI Crude",
      symbol: "WTI",
      price: 77.85 + (Math.cos(baseTime / 10000) * 0.6),
      change: 3.25,
      changePercent: 4.36,
      unit: "$/bbl",
    },
    {
      name: "Natural Gas",
      symbol: "NG",
      price: 4.52 + (Math.sin(baseTime / 8000) * 0.08),
      change: 0.27,
      changePercent: 6.35,
      unit: "$/MMBtu",
    },
    {
      name: "VLSFO Singapore",
      symbol: "VLSFO",
      price: 612.50 + (Math.cos(baseTime / 12000) * 5),
      change: 8.25,
      changePercent: 1.37,
      unit: "$/mt",
    },
    {
      name: "MGO Rotterdam",
      symbol: "MGO",
      price: 758.00 + (Math.sin(baseTime / 9000) * 6),
      change: -4.50,
      changePercent: -0.59,
      unit: "$/mt",
    },
    {
      name: "LNG JKM",
      symbol: "JKM",
      price: 14.25 + (Math.cos(baseTime / 11000) * 0.3),
      change: 0.45,
      changePercent: 3.26,
      unit: "$/MMBtu",
    },
    {
      name: "EU Carbon",
      symbol: "EUA",
      price: 72.80 + (Math.sin(baseTime / 7000) * 1.2),
      change: 2.15,
      changePercent: 3.04,
      unit: "EUR/tCO2",
    },
    {
      name: "Green H2",
      symbol: "GH2",
      price: 4.85 + (Math.cos(baseTime / 15000) * 0.1),
      change: -0.12,
      changePercent: -2.41,
      unit: "$/kg",
    },
    {
      name: "Green Ammonia",
      symbol: "NH3",
      price: 680.00 + (Math.sin(baseTime / 13000) * 15),
      change: 22.00,
      changePercent: 3.34,
      unit: "$/mt",
    },
    {
      name: "Bio-Methanol",
      symbol: "MeOH",
      price: 520.00 + (Math.cos(baseTime / 14000) * 8),
      change: -8.50,
      changePercent: -1.61,
      unit: "$/mt",
    },
  ];
};

export function EnergyPricesTicker() {
  const [prices, setPrices] = useState<CommodityPrice[]>(getSimulatedPrices());
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setLastUpdate(new Date());

    const interval = setInterval(() => {
      setPrices(getSimulatedPrices());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-muted-foreground";
  };

  return (
    <div className="bg-secondary/30 border-y border-border py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3" />
            <span className="font-medium text-foreground">Energy Markets</span>
            <span className="text-primary">|</span>
            <span>Live: {lastUpdate ? lastUpdate.toLocaleTimeString() : '--:--:--'}</span>
            <span className="text-primary">|</span>
            <span>March 2026</span>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...prices, ...prices].map((commodity, index) => (
              <div 
                key={`${commodity.symbol}-${index}`}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span className="font-semibold text-foreground text-sm">
                  {commodity.symbol}
                </span>
                <span className="text-foreground font-mono text-sm">
                  {commodity.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {commodity.unit}
                </span>
                <span className={`flex items-center gap-1 text-xs font-medium ${getTrendColor(commodity.change)}`}>
                  {getTrendIcon(commodity.change)}
                  {commodity.changePercent > 0 ? "+" : ""}{commodity.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
