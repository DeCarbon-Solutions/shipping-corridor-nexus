import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shipping Corridor Nexus",
  description:
    "Shipping Corridor Nexus — upload your fleet CSV to visualize GFI trajectory, green corridor route coverage, and IMO 2030/2050 compliance in one unified dashboard.",
  keywords: [
    "maritime",
    "shipping",
    "decarbonization",
    "alternative fuel",
    "green corridor",
    "bunkering",
    "LNG",
    "methanol",
    "ammonia",
    "biofuel",
    "IMO",
    "CII",
    "EEXI",
  ],
  openGraph: {
    title: "Shipping Corridor Nexus",
    description:
      "Explore global alternative fuel bunkering, vessel efficiency, and what-if fuel transition scenarios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-ocean-950 text-gray-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
