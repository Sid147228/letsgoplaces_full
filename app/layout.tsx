import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider"; // ✅ Add this

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
        <SessionProvider> {/* ✅ Wrap everything */}
          <div className="min-h-screen flex flex-col">
            {/* NAVBAR */}
            <header className="border-b border-white/10 bg-black/80 backdrop-blur">
              <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-lg font-semibold tracking-tight">
                  Lets<span className="text-blue-400">Go</span>Places
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
                  <a href="#how-it-works" className="hover:text-white">
                    How it works
                  </a>
                  <a href="#trip-types" className="hover:text-white">
                    Trip styles
                  </a>
                  <a href="#examples" className="hover:text-white">
                    Examples
                  </a>
                  <a
                    href="/plan"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold"
                  >
                    Start planning
                  </a>
                </div>
              </nav>
            </header>

            <main className="flex-1">{children}</main>

            {/* FOOTER */}
            <footer className="border-t border-white/10 bg-black/90">
              <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <p>© {new Date().getFullYear()} LetsGoPlaces. All rights reserved.</p>
                <p>Built for travelers who prefer calm over chaos.</p>
              </div>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}