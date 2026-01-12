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
            LetsGoPlaces is your calm, stylish travel companion that quietly builds
            beautiful itineraries for Paris, Tokyo, New York — and beyond.
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
              className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}