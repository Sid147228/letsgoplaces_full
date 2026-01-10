export function ProblemSection() {
  const items = [
    "Too many tabs, blogs, and maps open at once.",
    "Hours of research for a trip you might not even book.",
    "Weather, budget, and time never quite lining up.",
    "Generic itineraries that don’t feel like you at all.",
    "Trips that end up rushed, chaotic, or just “fine”."
  ];

  return (
    <section className="border-t border-white/10 bg-black px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Planning a trip shouldn’t feel like a second job.
        </h2>
        <p className="text-sm text-slate-300 sm:text-base">
          If you’ve ever spent your evenings buried in tabs, blogs, and spreadsheets just to plan a few days away, you’re not alone. Most tools are built to sell flights and hotels—not to help you design a trip that actually feels like you.
        </p>

        <ul className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
          {items.map((text) => (
            <li
              key={text}
              className="flex items-start gap-2 rounded-3xl border border-white/10 bg-zinc-950 p-4"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}