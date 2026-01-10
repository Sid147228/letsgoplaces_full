import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "LetsGoPlaces – AI Trip Planner Coming Soon",
  description:
    "LetsGoPlaces is your AI-powered travel companion that creates personalized trips anywhere in the world in seconds.",
  metadataBase: new URL("https://letsgoplaces.co.uk"),
  openGraph: {
    title: "LetsGoPlaces – AI Trip Planner Coming Soon",
    description:
      "Plan perfect trips in Paris, Tokyo, New York and beyond with a calm, smart AI travel companion.",
    url: "https://letsgoplaces.co.uk",
    siteName: "LetsGoPlaces",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LetsGoPlaces – AI Travel Companion"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LetsGoPlaces – AI Trip Planner Coming Soon",
    description:
      "Your AI travel companion for stress-free trips worldwide.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-slate-50 antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}