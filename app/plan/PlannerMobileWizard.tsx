"use client";

import React, { useState } from "react";
import LoaderCinematic from "./components/LoaderCinematic";
import GoogleLoginModal from "./components/GoogleLoginModal";
import IconOption from "./components/IconOption";
import { useRouter } from "next/navigation";

const GROUP_OPTIONS = ["Solo", "Couple", "Family", "Friends", "Business"];
const VIBE_OPTIONS = [
  "Food",
  "Culture",
  "Nightlife",
  "Nature",
  "Photography",
  "Luxury",
  "Shopping",
  "Cafés",
  "Slow travel",
];
const PACE_OPTIONS = ["Slow", "Balanced", "Fast"];
const BUDGET_OPTIONS = ["Budget", "Mid-range", "Premium"];

const TOTAL_STEPS = 7;

export default function PlannerMobileWizard() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [group, setGroup] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [pace, setPace] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleVibe(v: string) {
    setVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  }

  function calculateDays() {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : null;
  }

  function next() {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else setShowLoginModal(true);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function handleLoginContinue() {
    setShowLoginModal(false);

    let days = calculateDays();
    if (!days) {
      days = 3; // same fallback for now
    }

    const params = new URLSearchParams({
      destination,
      description: notes,
      pace,
      days: String(days),
      types: vibes.join(","),
      interests: group,
    });

    setLoading(true);
    setTimeout(() => {
      router.push(`/itinerary?${params.toString()}`);
    }, 1500);
  }

  return (
    <div className="relative px-5 pb-16">
      {loading && <LoaderCinematic />}

      {/* progress */}
      <div className="pt-4 mb-6">
        <p className="text-[11px] text-slate-400 mb-2">
          Step {step} of {TOTAL_STEPS}
        </p>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* steps */}
      {step === 1 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Where are you going?</h1>
          <p className="text-xs text-slate-400 mb-3">
            Pick a city or region. You can change it later.
          </p>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Paris, Tokyo, New York..."
            className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">When are you going?</h1>
          <p className="text-xs text-slate-400 mb-3">
            You can skip this if you’re not sure yet.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Start date</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white text-black text-sm"
              />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-1">End date</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white text-black text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Who are you travelling with?</h1>
          <p className="text-xs text-slate-400 mb-3">
            We’ll shape the mood of your trip around this.
          </p>
          <div className="flex flex-wrap gap-2">
            {GROUP_OPTIONS.map((g) => (
              <IconOption
                key={g}
                label={g}
                selected={group === g}
                onClick={() => setGroup(g)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">What’s the vibe?</h1>
          <p className="text-xs text-slate-400 mb-3">
            Pick a few that feel like you.
          </p>
          <div className="flex flex-wrap gap-2">
            {VIBE_OPTIONS.map((v) => (
              <IconOption
                key={v}
                label={v}
                selected={vibes.includes(v)}
                onClick={() => toggleVibe(v)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">
            How fast do you like to travel?
          </h1>
          <p className="text-xs text-slate-400 mb-3">
            Slow and relaxed, or packed and energetic?
          </p>
          <div className="flex flex-wrap gap-2">
            {PACE_OPTIONS.map((p) => (
              <IconOption
                key={p}
                label={p}
                selected={pace === p}
                onClick={() => setPace(p)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Rough budget</h1>
          <p className="text-xs text-slate-400 mb-3">
            Just a sense of how you’d like to spend.
          </p>
          <div className="flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map((b) => (
              <IconOption
                key={b}
                label={b}
                selected={budget === b}
                onClick={() => setBudget(b)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">
            Anything else we should know?
          </h1>
          <p className="text-xs text-slate-400 mb-3">
            Design, coffee, rooftop bars, hidden gems…
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us a bit more about how you like to travel."
            className="w-full h-24 px-4 py-3 rounded-xl bg-white text-black text-sm resize-none"
          />
        </div>
      )}

      {/* footer navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 px-5 py-3 flex items-center justify-between gap-3">
        <button
          onClick={back}
          disabled={step === 1}
          className="px-4 py-2 rounded-full border border-white/30 text-xs text-slate-200 disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={next}
          className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-semibold text-white"
        >
          {step === TOTAL_STEPS ? "Build my trip →" : "Next"}
        </button>
      </div>

      <GoogleLoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onContinue={handleLoginContinue}
      />
    </div>
  );
}