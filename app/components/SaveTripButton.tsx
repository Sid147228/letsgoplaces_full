"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/components/ui/Toast";

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
  const router = useRouter();
  const { showToast } = useToast();

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    // If user is not logged in → trigger Google login
    if (!session) {
      signIn("google");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
      });

      if (!res.ok) {
        showToast("Something went wrong while saving your trip.", "error");
        throw new Error("Failed to save trip");
      }

      setSaved(true);
      showToast("Trip saved to My Trips!", "success");

      // Redirect to My Trips after saving
      router.push("/my-trips");
    } catch (err) {
      showToast("Something went wrong while saving your trip.", "error");
    } finally {
      setLoading(false);
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
