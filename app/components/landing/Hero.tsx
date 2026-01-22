"use client";

import Button from "@/components/ui/Button";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-32 text-center">
      <div className="max-w-3xl mx-auto px-6">

        <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm mb-6">
          <Sparkles size={16} />
          AI‑Powered Travel Planning
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Plan Your Dream Adventure
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Create personalized travel itineraries in seconds. Our AI understands your
          preferences to craft the perfect journey.
        </p>

        <div className="flex justify-center gap-4">
          <Button onClick={() => signIn(undefined, { callbackUrl: "/generate" })}>
            Start Planning Free <ArrowRight size={18} />
          </Button>

          <Button className="bg-white text-black border hover:bg-gray-100">
            <PlayCircle size={18} /> Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
