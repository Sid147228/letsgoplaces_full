import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import AuthBar from "@/components/AuthBar";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "LetsGoPlaces – Calm, Smart Travel Planning",
  description:
    "A calm, stylish travel companion that quietly builds beautiful itineraries for the way you travel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <SessionProvider>
          {/* Top auth bar (login/logout) */}
          <AuthBar />

          <div className="min-h-screen flex flex-col">
            {/* Global NavBar visible on every page */}
            <NavBar />

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black/90">
              <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <p>
                  © {new Date().getFullYear()} LetsGoPlaces. All rights
                  reserved.
                </p>
                <p>Built for travelers who prefer calm over chaos.</p>
              </div>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
