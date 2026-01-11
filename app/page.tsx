import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Paris"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Plan Your Dream Trip in Seconds
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            A calm, smart travel companion that builds beautiful itineraries for Paris, Tokyo, New York — and beyond.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full bg-white text-black placeholder-slate-500 text-sm w-full"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm"
            >
              Join Waitlist
            </button>
          </form>

          <p className="text-sm text-slate-400 mt-4">
            Or try a sample trip → <a href="/plan" className="underline">Start planning</a>
          </p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">
          Dream Destinations, One Tap Away
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Paris", img: "/paris.jpg" },
            { name: "Tokyo", img: "/tokyo.jpg" },
            { name: "New York", img: "/nyc.jpg" },
          ].map((city) => (
            <div
              key={city.name}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={city.img}
                alt={city.name}
                width={500}
                height={500}
                className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-xl font-semibold">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">
            How LetsGoPlaces Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-xl font-semibold mb-2">Tell Us Your Plan</h3>
              <p className="text-slate-400">
                Destination, dates, budget, travel style — we take care of the rest.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">AI Builds Your Trip</h3>
              <p className="text-slate-400">
                A calm, thoughtful itinerary crafted just for you in seconds.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Explore & Enjoy</h3>
              <p className="text-slate-400">
                Beautiful day-by-day plans with morning, afternoon, and evening suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Ready to Plan Your Next Adventure?
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Join thousands of travelers discovering a calmer, smarter way to explore the world.
        </p>

        <a
          href="/plan"
          className="px-8 py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg"
        >
          Start Planning
        </a>
      </section>
    </main>
  );
}