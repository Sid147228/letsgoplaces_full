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

          {/* OPTIONAL: Link to planner */}
          <Link
            href="/plan"
            className="mt-8 inline-block text-sm text-slate-300 underline underline-offset-4"
          >
            Or start planning a sample trip →
          </Link>
        </div>
      </section>

      {/* DESTINATIONS */}
     