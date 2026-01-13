"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

type TripPayload = {
  destination: string;
  days: number;
  pace: string;
  vibes: string;
  groupType: string;
  notes: string;
  itineraryJson: any;
};

export default function SaveTripButton({ trip }: { trip: TripPayload }) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!session) {
      signIn("google");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/trips/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });

    setLoading(false);

    if (res.ok) {
      setSaved(true);
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={saved || loading}
      className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold disabled:opacity-50"
    >
      {saved ? "Saved ✓" : loading ? "Saving…" : "Save Trip"}
    </button>
  );
}