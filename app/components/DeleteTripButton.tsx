"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export default function DeleteTripButton({ tripId }: { tripId: string }) {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  async function handleDelete() {
    setLoading(true);

    const res = await fetch(`/api/trips/${tripId}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (res.ok) {
      showToast("Trip deleted successfully", "success");
      router.push("/my-trips");
    } else {
      showToast("Failed to delete trip", "error");
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="px-4 py-2 rounded-full bg-red-600/80 text-white text-xs font-semibold hover:bg-red-600 transition"
      >
        Delete Trip
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-slate-300 text-sm">Are you sure you want to delete this trip?</p>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-semibold disabled:opacity-50"
        >
          {loading ? "Deleting…" : "Yes, delete"}
        </button>

        <button
          onClick={() => setConfirming(false)}
          className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
