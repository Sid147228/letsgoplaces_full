import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.jpg"
            alt="City at night"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
              AI TRIP PLANNING, REIMAGINED
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              A calm way to plan
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                your next trip.
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-xl">
              LetsGoPlaces is your stylish travel companion that quietly builds
              thoughtful itineraries for Paris, Tokyo, New York — and everywhere in between.
            </p>

            <div className="space-y-4">
              <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md md:max-w-lg">
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
                Or{" "}
                <a href="/plan" className="underline">
                  try planning a sample trip
                </a>{" "}
                in under a minute.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur shadow-xl max-w-md mx-auto">
              <p className="text-xs text-slate-400 mb-2">Sample itinerary</p>
              <h2 className="text-lg font-semibold mb-3">Tokyo – 4 days, food & city lights</h2>
              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <p className="text-slate-400 uppercase text-[10px] mb-1">Day 1 – Arrival & Shibuya</p>
                  <p>Check into a calm hotel near Shinjuku. Evening walk through Shibuya Crossing and a quiet izakaya nearby.</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-[10px] mb-1">Day 2 – Neighborhoods</p>
                  <p>Slow morning in Daikanyama, coffee and bookstores. Afternoon in Harajuku, evening at an omakase counter.</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-[10px] mb-1">Day 3 – Culture & Contrast</p>
                  <p>Asakusa temples, Sumida River walk, rooftop cocktails in Roppongi at night.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP TYPES */}
      <section id="trip-types" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Crafted for every kind of trip
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Couples", img: "/couples.jpg", tagline: "Slow mornings, late dinners." },
            { name: "Family", img: "/family.jpg", tagline: "Memories without the chaos." },
            { name: "Solo", img: "/solo.jpg", tagline: "Curated days, at your own pace." },
            { name: "Road Trip", img: "/roadtrip.jpg", tagline: "Routes, stops, and scenic pauses." },
          ].map((type) => (
            <div
              key={type.name}
              className="relative rounded-xl overflow-hidden group bg-white/5 border border-white/10"
            >
              <div className="relative h-40">
                <Image
                  src={type.img}
                  alt={type.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-1">{type.name}</h3>
                <p className="text-xs text-slate-400">{type.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gradient-to-b from-black via-slate-950 to-black py-20 px-6">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">
            A calmer way to plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🧭",
                title: "Share your vibe",
                desc: "Destination, dates, budget, pace — just a few details and your style of travel.",
              },
              {
                icon: "✨",
                title: "We shape your days",
                desc: "AI builds a thoughtful, structured itinerary with mornings, afternoons, and evenings.",
              },
              {
                icon: "📍",
                title: "Tweak, save, go",
                desc: "Edit what you like, save what you love, and head out with clarity.",
              },
            ].map((step) => (
              <div key={step.title} className="text-sm">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE CITY STRIP */}
      <section id="sample" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Paris, Tokyo, New York — and beyond
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {[
            { name: "Paris", img: "/paris.jpg", line: "Cafés, galleries, and golden-hour walks." },
            { name: "Tokyo", img: "/tokyo.jpg", line: "Neon nights, quiet mornings, ramen stops." },
            { name: "New York", img: "/nyc.jpg", line: "Rooftops, parks, and late-night slices." },
          ].map((city) => (
            <div key={city.name} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <div className="relative h-40">
                <Image
                  src={city.img}
                  alt={city.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-1">{city.name}</h3>
                <p className="text-xs text-slate-400">{city.line}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 border-t border-white/10 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to feel good about planning again?
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Join the early access list and be among the first to try a calmer, more stylish way to plan your trips.
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