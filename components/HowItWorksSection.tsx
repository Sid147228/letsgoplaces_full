const steps = [
  {
    step: "Step 1",
    title: "Tell us your mood and basics",
    body: "Share where you’re starting from, your dates, budget, who you’re traveling with, and how you want the trip to feel.",
    icon: "🌍"
  },
  {
    step: "Step 2",
    title: "AI plans your trip in seconds",
    body: "LetsGoPlaces explores options, balances trade-offs, and drafts a realistic itinerary tuned to your style and constraints.",
    icon: "✨"
  },
  {
    step: "Step 3",
    title: "You just go and enjoy",
    body: "Follow the plan, tweak what you like, and finally experience a trip that feels easy, intentional, and memorable.",
    icon: "🧳"
  }
];

export function HowItWorksSection() {
  return (
    <section className="border-t border-white/10 bg-black px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            How LetsGoPlaces will work.
          </h2>
          <p className="mx-auto max-w-xl text-sm text-slate-300 sm:text-base">
            No dashboards. No complicated forms. Just a simple, conversational flow that understands you and quietly handles the hard parts in the background.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.step}
              className="flex flex-col rounded-3xl border border-white/10 bg-zinc-950 p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                <span>{step.step}</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-xl">
                <span aria-hidden>{step.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-50">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}