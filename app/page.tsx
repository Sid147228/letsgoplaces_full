import Link from "next/link";
import { ArrowRight, Compass, MapPin, Sparkles, WandSparkles } from "lucide-react";

const highlights = [
  { icon: Compass, title: "Made for your travel style", detail: "Tell us your interests, budget and pace. Aero helps shape the journey around you." },
  { icon: MapPin, title: "Beyond the obvious", detail: "Blend iconic sights with local neighbourhoods, food and lesser-known discoveries." },
  { icon: WandSparkles, title: "Plans that evolve", detail: "Refine your itinerary as your ideas change, without starting from scratch." },
];

export default function HomePage() {
  return (
    <div className="bg-[#f8f6f0] text-[#122b30]">
      <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-[#102c33] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,#245a60_0%,transparent_55%),linear-gradient(135deg,#102c33,#173d44_60%,#0b222b)]" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-10 top-40 h-72 w-72 rounded-full border border-white/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#e9d8aa]">
            <Sparkles size={15} /> Meet Aero, your AI travel companion
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl">
            Your next adventure, <span className="italic text-[#d9c38c]">beautifully planned.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            Discover hidden gems, create personalised itineraries and explore the world your way — with a little help from Aero.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/generate" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#e8d4a3] px-7 py-3 font-semibold text-[#183238] transition hover:bg-white">
              Plan my trip <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-7 py-3 font-medium text-white transition hover:bg-white/10">
              How it works
            </a>
          </div>
          <p className="mt-7 text-sm text-white/60">Thoughtful travel planning. More discovery, less research.</p>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#927b49]">A better way to explore</p>
          <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">The journey should feel as good as the destination.</h2>
          <p className="mt-5 text-lg text-[#54676a]">Aero brings your travel ideas together in one place, so you can spend less time searching and more time discovering.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, detail }, index) => (
            <article key={title} className="rounded-3xl border border-[#e5e4dc] bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f0eb] text-[#245c5d]"><Icon size={23} /></span>
                <span className="text-sm text-[#a6a49a]">0{index + 1}</span>
              </div>
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-4 leading-relaxed text-[#5b6a6c]">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e9eee8] px-6 py-20 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#47716e]">Let's go somewhere</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl sm:text-5xl">Every unforgettable trip starts with a plan.</h2>
          </div>
          <Link href="/generate" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#173e43] px-7 py-4 font-semibold text-white transition hover:bg-[#245c5d]">
            Start exploring <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
