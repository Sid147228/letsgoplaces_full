"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xwkzvgrj", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-black text-white">
      {/* HERO SECTION */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 fade-in zoom-in">
            AI Trip Planning, Reimagined.
          </h1>

          <p className="text-lg text-slate-300 mb-8 fade-in">
            LetsGoPlaces is your calm, smart travel companion that builds perfect trips in seconds.
            Paris, Tokyo, New York — and beyond.
          </p>

          {/* EARLY ACCESS FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 fade-in mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full bg-white text-black w-72 placeholder:text-slate-500"
            />
            <button type="submit" className="btn-primary">
              Get Early Access
            </button>
          </form>

          {/* TEASER OR CONFIRMATION */}
          {submitted ? (
            <p className="mt-4 text-green-400 text-sm zoom-in">
              You're on the waitlist! ✨
            </p>
          ) : (
            <p className="mt-6 text-slate-300 text-sm zoom-in">
              Something exciting is coming… get on the waitlist.
            </p>
          )}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 fade-in">
          Dream Destinations, One Tap Away
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto fade-in">
          {["paris", "tokyo", "newyork"].map((city) => (
            <div
              key={city}
              className="relative rounded-xl overflow-hidden group border border-white/10"
            >
              <Image
                src={`/destinations/${city}.jpg`}
                alt={city}
                width={400}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-semibold capitalize">{city}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-slate-400 text-sm">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Image src="/logo.svg" alt="Logo" width={24} height={24} />
          <span>LetsGoPlaces</span>
        </div>

        <p>© 2026. Built for explorers. Crafted by AI.</p>

        <Link
          href="https://instagram.com/letsg0places"
          target="_blank"
          rel="noreferrer"
          className="block mt-2 text-white hover:underline"
        >
          Follow us on Instagram ↗
        </Link>
      </footer>
    </main>
  );
}