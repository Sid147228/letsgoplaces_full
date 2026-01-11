import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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

          {/* Right side “wizard preview” */}
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

      {/* TRIP STYLES */}
      <section id="trip-types" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Built for how you like to travel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {[
            { name: "Couples", line: "Slow mornings, late dinners, hidden corners.", img: "/couples.jpg" },
            { name: "Family", line: "Memorable days without the planning chaos.", img: "/family.jpg" },
            { name: "Solo", line: "Curated days, just for your pace.", img: "/solo.jpg" },
            { name: "Road trip", line: "Routes, stops, viewpoints, and coffee breaks.", img: "/roadtrip.jpg" },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="relative h-32">
                <Image src={t.img} alt={t.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1">
                  {t.name}
                </p>
                <p className="text-xs text-slate-300">{t.line}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-gradient-to-b from-black via-slate-950 to-black py-18 px-6 border-y border-white/10"
      >
        <div className="max-w-5xl mx-auto py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            A calmer way to plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
            {[
              {
                title: "Tell us your plan",
                desc: "Destination, dates, budget, vibe. Just the essentials — we handle the structure.",
              },
              {
                title: "AI builds your trip",
                desc: "Thoughtful, day‑by‑day itineraries with mornings, afternoons, and evenings that match your style.",
              },
              {
                title: "Tweak, save, go",
                desc: "Adjust what you like, save favorites, and head out with clarity instead of chaos.",
              },
            ].map((s, i) => (
              <div key={s.title}>
                <p className="text-xs text-slate-500 mb-2">Step 0{i + 1}</p>
                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE ITINERARIES */}
      <section id="examples" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Real trips, not generic lists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {[
            {
              city: "Paris",
              img: "/paris.jpg",
              days: "4 days",
              focus: "Art, cafés, golden hour walks.",
            },
            {
              city: "Tokyo",
              img: "/tokyo.jpg",
              days: "5 days",
              focus: "Food, neighborhoods, neon nights.",
            },
            {
              city: "New York",
              img: "/nyc.jpg",
              days: "3 days",
              focus: "Rooftops, parks, late‑night slices.",
            },
          ].map((c) => (
            <div
              key={c.city}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="relative h-36">
                <Image src={c.img} alt={c.city} fill className="object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.15em]">
                  {c.city} • {c.days}
                </p>
                <p className="text-xs text-slate-300">{c.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-18 px-6 border-t border-white/10 bg-black">
        <div className="max-w-3xl mx-auto py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to close your tabs?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mb-8 max-w-lg mx-auto">
            Join the early access list and be among the first to try a calmer, more stylish way to
            plan your trips — powered by AI.
          </p>
          <a
            href="/plan"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold text-sm"
          >
            Start a sample trip
          </a>
        </div>
      </section>
    </div>
  );
}