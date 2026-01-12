import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy + CTA */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
              AI TRIP PLANNING, REIMAGINED
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-5">
              Smarter than{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                endless tabs
              </span>
              , calmer than spreadsheets.
            </h1>
            <p className="text-sm md:text-base text-slate-300 mb-6 max-w-xl">
              LetsGoPlaces is your calm, stylish travel companion that quietly builds
              beautiful itineraries for Paris, Tokyo, New York — and beyond.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full bg-white text-black placeholder-slate-500 text-sm w-full"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold text-sm"
              >
                Join waitlist
              </button>
            </form>
            <p className="text-xs text-slate-400">
              No spam, just early access. Or{" "}
              <a href="/plan" className="underline">
                try a sample trip →
              </a>
            </p>
          </div>

          {/* Right: Trip setup preview card */}
          <div className="w-full">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur shadow-xl text-xs space-y-4 max-w-md ml-auto">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-300 text-[11px]">Trip setup</p>
                <span className="text-[10px] text-slate-500">Preview</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    Where are you going?
                  </label>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 rounded-full bg-white text-black text-[11px]">
                      Paris
                    </button>
                    <button className="px-3 py-2 rounded-full bg-white/10 text-[11px]">
                      Tokyo
                    </button>
                    <button className="px-3 py-2 rounded-full bg-white/10 text-[11px]">
                      New York
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">
                      Start date
                    </label>
                    <div className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
                      12 Apr 2026
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">
                      End date
                    </label>
                    <div className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-300">
                      17 Apr 2026
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">
                    Travel style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Slow & scenic", "Food‑first", "Nightlife", "Family‑friendly"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-200"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-[10px] text-slate-400 mb-1">
                    Example day in Paris
                  </p>
                  <p className="text-[11px] text-slate-200">
                    Morning: Slow café breakfast near the Seine. Afternoon: Louvre & Tuileries.
                    Evening: Rooftop drinks with Eiffel views.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP STYLES — Updated to long rectangular cards */}
      <section id="trip-types" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center">
          Built for how you like to travel
        </h2>

        <div className="space-y-6">
          {[
            {
              name: "Couples",
              line: "Slow mornings, late dinners, hidden corners.",
              img: "/couples.jpg",
            },
            {
              name: "Family",
              line: "Memorable days without the planning chaos.",
              img: "/family.jpg",
            },
            {
              name: "Solo",
              line: "Curated days, just for your pace.",
              img: "/solo.jpg",
            },
            {
              name: "Road trip",
              line: "Routes, stops, viewpoints, and coffee breaks.",
              img: "/roadtrip.jpg",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="group relative flex items-center gap-6 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-4 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1">
                  {t.name}
                </p>
                <p className="text-sm text-slate-300">{t.line}</p>
              </div>
              <div className="absolute inset-0 pointer-events-none group-hover:ring-1 group-hover:ring-blue-500/30 rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}