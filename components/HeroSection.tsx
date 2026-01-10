import Link from "next/link";
import { CTAButton } from "./CTAButton";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Ultra HD cinematic background – you can swap to a UHD world/airplane / abstract travel image */}
      <div className="pointer-events-none absolute inset-0">
        <div className="h-full w-full bg-hero-glow opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,23,42,0.4)_0,transparent_55%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.8)_0,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
          Coming soon · AI trip planner for real travelers
        </p>

        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Your AI travel companion
          <span className="block text-brand">for stress-free trips worldwide.</span>
        </h1>

        <p className="mt-4 max-w-xl text-balance text-sm text-slate-300 sm:text-base">
          LetsGoPlaces creates personalized trips for you in seconds—across Paris, Tokyo, New York and anywhere else you want to explore. No spreadsheets. No overwhelm. Just thoughtful itineraries that match your mood, time, and budget.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="#early-access" className="w-full sm:w-auto">
            <CTAButton className="w-full sm:w-auto">
              Get early access
            </CTAButton>
          </a>

          <Link
            href="https://instagram.com/letsg0places"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            <CTAButton variant="ghost" className="w-full sm:w-auto gap-2">
              <span>Follow on Instagram</span>
              <span aria-hidden>↗</span>
            </CTAButton>
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Be the first to try LetsGoPlaces when we launch. No spam—just early access and real travel inspiration.
        </p>
      </div>
    </section>
  );
}