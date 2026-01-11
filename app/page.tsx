import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black text-white font-sans">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.jpg"
            alt="Travel background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Travel Planning, Reimagined
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10">
            A calm, stylish travel companion that crafts beautiful itineraries for the way you travel.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full bg-white text-black placeholder-slate-500 text-sm w-full"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold text-sm"
            >
              Join Waitlist
            </button>
          </form>

          <p className="text-sm text-slate-400 mt-4">
            Or <a href="/plan" className="underline">try a sample trip</a>
          </p>
        </div>
      </section>

      {/* TRIP TYPES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          Trips, Tailored to You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Couples", img: "/couples.jpg" },
            { name: "Family", img: "/family.jpg" },
            { name: "Solo", img: "/solo.jpg" },
            { name: "Road Trip", img: "/roadtrip.jpg" },
          ].map((type) => (
            <div
              key={type.name}
              className="relative rounded-xl overflow-hidden group shadow-lg cursor-pointer"
            >
              <Image
                src={type.img}
                alt={type.name}
                width={500}
                height={500}
                className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-xl font-semibold">{type.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE ITINERARY */}
      <section className="bg-slate-900 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">
            A Glimpse of Your Next Adventure
          </h2>

          <div className="rounded-2xl overflow-hidden shadow-xl bg-white/5 border border-white/10 p-6 text-left">
            <Image
              src="/sample-paris.jpg"
              alt="Paris"
              width={1200}
              height={600}
              className="rounded-xl mb-6 object-cover"
            />

            <h3 className="text-2xl font-semibold mb-2">Paris — 5 Day Escape</h3>
            <p className="text-slate-300 mb-6">
              A curated blend of culture, food, and hidden gems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Day 1</p>
                <p className="text-slate-100">Montmartre, Seine cruise, wine tasting</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Day 2</p>
                <p className="text-slate-100">Louvre, Tuileries, rooftop dinner</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-xs mb-1">Day 3</p>
                <p className="text-slate-100">Versailles, garden picnic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
          Why Travelers Love LetsGoPlaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {[
            {
              icon: "🌙",
              title: "Calm & Curated",
              desc: "Thoughtful itineraries crafted with intention — no chaos, no overwhelm.",
            },
            {
              icon: "⚡",
              title: "Built in Seconds",
              desc: "Your perfect trip, generated instantly with beautiful structure.",
            },
            {
              icon: "🎨",
              title: "Stylish by Design",
              desc: "A modern, elegant interface that makes planning feel inspiring.",
            },
          ].map((f) => (
            <div key={f.title}>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Ready to Plan Your Next Adventure?
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Discover a calmer, smarter way to travel — powered by AI.
        </p>

        <a
          href="/plan"
          className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold text-lg"
        >
          Start Planning
        </a>
      </section>
    </main>
  );
}