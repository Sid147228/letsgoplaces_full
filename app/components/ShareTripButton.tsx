"use client";

import { useSession } from "next-auth/react";
import { useToast } from "@/app/components/ui/Toast";
import { useModal } from "@/app/context/ModalContext";
import { useState } from "react";

// ⭐ Define the Trip type used by this component
type Trip = {
  id: string;
  title: string;
  destination: string;
  days: number;
  publicId: string | null;
};

export default function ShareTripButton({ trip }: { trip: Trip }) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const { openSignIn } = useModal();
  const [loading, setLoading] = useState(false);

  async function ensurePublicId() {
    if (trip.publicId) return trip.publicId;

    try {
      setLoading(true);

      const res = await fetch(`/api/trips/${trip.id}/make-public`, {
        method: "POST",
      });

      if (!res.ok) {
        showToast("Unable to generate shareable link.", "error");
        return null;
      }

      const updated = await res.json();
      trip.publicId = updated.publicId; // mutate local trip object

      return updated.publicId;
    } catch (err) {
      showToast("Something went wrong.", "error");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    if (!session) {
      openSignIn();
      return;
    }

    const publicId = await ensurePublicId();
    if (!publicId) return;

    const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/trip/public/${publicId}`;

    try {
      const shareData = {
        title: `My trip to ${trip.destination}`,
        text: `Check out my ${trip.days}-day trip to ${trip.destination}!`,
        url: publicUrl,
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(publicUrl);
        showToast("Public link copied to clipboard!", "success");
      }
    } catch (err) {
      showToast("Unable to share this trip.", "error");
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="text-blue-500 underline text-sm disabled:opacity-50"
    >
      {loading ? "Preparing..." : "Share"}
    </button>
  );
}
