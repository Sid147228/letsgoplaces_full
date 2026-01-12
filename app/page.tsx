import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-slate-950 to-black">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
            AI TRIP PLANNING, REIMAGINED
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Smarter than{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              endless tabs
            </span>
            , calmer than spreadsheets.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            LetsGoPlaces is your calm, stylish travel companion that quietly
            builds beautiful itineraries for Paris, Tokyo, New York — and beyond.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mb-4">
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

          <p className="text-sm text-slate-400">
            No spam, just early access. Or{" "}
            <a href="/plan" className="underline">
              try a sample trip →
            </a>
          </p>
        </div>
      </section>

      {/* TRIP STYLES — Vertical rectangular cards */}
      <section id="trip-types" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center">
          Built for how you like to travel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Couples",
              line: "Slow mornings, late dinners, hidden corners.",
              img: "/couples.jpg",
              slug: "paris",
            },
            {
              name: "Family",
              line: "Memorable days without the planning chaos.",
              img: "/family.jpg",
              slug: "newyork",
            },
            {
              name: "Solo",
              line: "Curated days, just for your pace.",
              img: "/solo.jpg",
              slug: "tokyo",
            },
            {
              name: "Road trip",
              line: "Routes, stops, viewpoints, and coffee breaks.",
              img: "/roadtrip.jpg",
              slug: "newyork",
            },
          ].map((t) => (
            <a
              key={t.name}
              href={`/sample/${t.slug}`}
              className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer block"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-1">
                  {t.name}
                </p>
                <p className="text-sm text-slate-300">{t.line}</p>
              </div>
            </a>
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
                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE ITINERARIES — Vertically stacked clickable cards */}
      <section id="examples" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Real trips, not generic lists
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              city: "Paris",
              img: "/paris.jpg",
              days: "4 days",
              focus: "Art, cafés, golden hour walks.",
              slug: "paris",
            },
            {
              city: "Tokyo",
              img: "/tokyo.jpg",
              days: "5 days",
              focus: "Food, neighborhoods, neon nights.",
              slug: "tokyo",
            },
            {
              city: "New York",
              img: "/nyc.jpg",
              days: "3 days",
              focus: "Rooftops, parks, late‑night slices.",
              slug: "newyork",
            },
          ].map((c) => (
            <a
              key={c.city}
              href={`/sample/${c.slug}`}
              className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 block hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={c.img}
                  alt={c.city}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase tracking-[0.15em]">
                  {c.city} • {c.days}
                </p>
                <p className="text-xs text-slate-300">{c.focus}</p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA below cards */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Click any of the above to see what a sample itinerary looks like →
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-18 px-6 border-t border-white/10 bg-black">
        <div className="max-w-3xl mx-auto py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to close your tabs?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mb-8 max-w-lg mx-auto">
            Join the early access list and be among the first to try a calmer,
            more stylish way to plan your trips — powered by AI.
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