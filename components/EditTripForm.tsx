"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export default function EditTripForm({ trip }: { trip: any }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    destination: trip.destination,
    days: trip.days,
    pace: trip.pace || "",
    vibes: trip.vibes || "",
    groupType: trip.groupType || "",
    notes: trip.notes || "",
  });

  const [loading, setLoading] = useState(false);

  function updateField(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/trips/${trip.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      showToast("Trip updated successfully!", "success");
      router.push(`/trip/${trip.id}`);
    } else {
      showToast("Failed to update trip.", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="block text-sm mb-1">Destination</label>
        <input
          value={form.destination}
          onChange={(e) => updateField("destination", e.target.value)}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Days</label>
        <input
          type="number"
          value={form.days}
          onChange={(e) => updateField("days", Number(e.target.value))}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Pace</label>
        <input
          value={form.pace}
          onChange={(e) => updateField("pace", e.target.value)}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Vibes</label>
        <input
          value={form.vibes}
          onChange={(e) => updateField("vibes", e.target.value)}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Group Type</label>
        <input
          value={form.groupType}
          onChange={(e) => updateField("groupType", e.target.value)}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="w-full p-2 rounded bg-white/10 border border-white/20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
