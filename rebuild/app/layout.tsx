import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "letsg0places | Your next adventure, beautifully planned",
  description: "Build a personal travel itinerary with Aero, your AI trip planner.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
