type Destination = {
  id: string;
  label: string;
  title: string;
  body: string;
  bgClass: string;
};

const destinations: Destination[] = [
  {
    id: "paris",
    label: "Paris · For dreamers and slow wanderers",
    title: "AI-crafted escapes in the city of light.",
    body: "Weekend for two, solo café days, or a long stay by the Seine—LetsGoPlaces designs Paris trips that blend architecture, river walks, and slow mornings exactly how you like them.",
    bgClass: "bg-[url('/paris-uhd.jpg')]"
  },
  {
    id: "tokyo",
    label: "Tokyo · Neon, temples, and quiet corners",
    title: "From Shibuya nights to sunrise shrines.",
    body: "Tell LetsGoPlaces your pace and mood—deep food exploration, quiet neighborhoods, or high-energy nights—and it builds a Tokyo itinerary that feels curated just for you.",
    bgClass: "bg-[url('/tokyo-uhd.jpg')]"
  },
  {
    id: "new-york",
    label: "New York · Skyline views and big energy",
    title: "Iconic city, zero planning spiral.",
    body: "First-time visit or your fifth trip back—LetsGoPlaces balances must-sees with local favorites, from sunrise in Brooklyn to late-night slices in the West Village.",
    bgClass: "bg-[url('/newyork-uhd.jpg')]"
  }
];

export function DestinationsSection() {
  return (
    <section className="border-t border-white/10 bg-black">
      {destinations.map((dest) => (
        <div
          key={dest.id}
          className={`relative flex min-h-[75vh] items-end overflow-hidden bg-cover bg-center`}
        >
          <div className={`absolute inset-0 ${dest.bgClass}`} />
          <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 pb-16">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
              {dest.label}
            </p>
            <h2 className="max-w-xl text-balance text-2xl font-semibold sm:text-3xl md:text-4xl">
              {dest.title}
            </h2>
            <p className="max-w-xl text-sm text-slate-100 sm:text-base">
              {dest.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}