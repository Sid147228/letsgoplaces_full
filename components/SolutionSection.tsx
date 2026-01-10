export function SolutionSection() {
  const points = [
    {
      title: "Understands how you actually like to travel",
      body: "Share your mood, pace, non-negotiables, and budget. LetsGoPlaces learns your style instead of forcing you into a generic template."
    },
    {
      title: "Suggests destinations that fit your moment",
      body: "From Paris weekends to Tokyo deep dives and New York city breaks, get places that match your time, energy, and season."
    },
    {
      title: "Builds realistic, flexible itineraries",
      body: "No more overstuffed days. You get a balanced plan with space for slow mornings, spontaneous detours, and golden-hour views."
    },
    {
      title: "Adapts to weather and last-minute changes",
      body: "Rain in Paris or a heatwave in New York? Your plans adjust so your trip still feels intentional and well spent."
    },
    {
      title: "Works for every kind of traveler",
      body: "Solo travelers, couples, families, digital nomads, and weekend explorers all get tailored trips that respect their rhythm."
    }
  ];

  return (
    <section className="border-t border-white/10 bg-black px-4 py-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Meet LetsGoPlaces: your calm, smart AI travel companion.
          </h2>
          <p className="text-sm text-slate-300 sm:text-base">
            LetsGoPlaces turns your mood, time, and budget into thoughtful trips anywhere in the world. It feels less like using another booking tool, and more like messaging a well-travelled friend who knows exactly what you’ll love.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {points.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-zinc-950 p-4"
            >
              <h3 className="text-sm font-semibold text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}