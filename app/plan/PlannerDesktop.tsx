"use client";

import React, { useState } from "react";
import LoaderCinematic from "./components/LoaderCinematic";
import GoogleLoginModal from "./components/GoogleLoginModal";
import TripSummary from "./components/TripSummary";
import IconOption from "./components/IconOption";
import SectionCard from "./components/SectionCard";
import { useRouter } from "next/navigation";

import {
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  SparklesIcon,
  BoltIcon,
  BanknotesIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

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

export default function PlannerDesktop() {
  const router = useRouter();

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

  function handleBuildClick() {
    setShowLoginModal(true);
  }

  function handleLoginContinue() {
    setShowLoginModal(false);

    let days = calculateDays();
    if (!days) days = 3;

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
    <div className="relative">
      {/* subtle noise background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.12] mix-blend-soft-light bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_50%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),_transparent_50%)]" />

      {loading && <LoaderCinematic />}

      <div className="relative max-w-6xl mx-auto px-6 pb-20 flex gap-8">
        {/* Left column */}
        <div className="flex-1 space-y-6 mt-6">
          <SectionCard
            title="Where do you want to go?"
            subtitle="Pick a city or region."
            icon={<MapPinIcon className="w-5 h-5" />}
          >
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Paris, Tokyo, New York..."
              className="w-full px-4 py-3 rounded-xl bg-white text-black text-sm"
            />
          </SectionCard>

          <SectionCard
            title="When are you planning to travel?"
            subtitle="You can skip this if you're not sure yet."
            icon={<CalendarIcon className="w-5 h-5" />}
          >
            <div className="grid grid-cols-2 gap-4">
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
          </SectionCard>

          <SectionCard
            title="Who are you traveling with?"
            subtitle="We'll shape the mood of your trip around this."
            icon={<UserGroupIcon className="w-5 h-5" />}
          >
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
          </SectionCard>

          <SectionCard
            title="What type of trip are you looking for?"
            subtitle="Pick a few that feel like you."
            icon={<SparklesIcon className="w-5 h-5" />}
          >
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
          </SectionCard>

          <SectionCard
            title="What pace do you prefer?"
            subtitle="Slow and relaxed, or packed and energetic?"
            icon={<BoltIcon className="w-5 h-5" />}
          >
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
          </SectionCard>

          <SectionCard
            title="What's your budget?"
            subtitle="Just a sense of how you'd like to spend."
            icon={<BanknotesIcon className="w-5 h-5" />}
          >
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
          </SectionCard>

          <SectionCard
            title="Any preferences or special notes?"
            subtitle="Design, coffee, rooftop bars, hidden gems…"
            icon={<PencilSquareIcon className="w-5 h-5" />}
          >
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us a bit more about how you like to travel."
              className="w-full h-24 px-4 py-3 rounded-xl bg-white text-black text-sm resize-none"
            />
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="w-[320px] hidden lg:block mt-6">
          <div className="sticky top-24">
            <TripSummary
              destination={destination}
              startDate={startDate}
              endDate={endDate}
              group={group}
              vibes={vibes}
              pace={pace}
              budget={budget}
              notes={notes}
            />

            <button
              onClick={handleBuildClick}
              className="w-full mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm"
            >
              Build my trip →
            </button>
          </div>
        </div>
      </div>

      <GoogleLoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onContinue={handleLoginContinue}
      />
    </div>
  );
}