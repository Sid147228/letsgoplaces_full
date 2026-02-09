"use client";

import { useSession } from "next-auth/react";
import { useToast } from "@/app/components/ui/Toast";
import { useModal } from "@/app/context/ModalContext";
import { useRouter } from "next/navigation";
import ShareTripButton from "@/app/components/ShareTripButton";

// ⭐ Define the Trip type used by this component
type Trip = {
  id: string;
  title: string;
  destination: string;
  days: number;
  publicId: string | null;
  heroImage?: string | null;
};

export default function TripActions({ trip }: { trip: Trip }) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const { openSignIn } = useModal();
  const router = useRouter();

  async function handleDuplicate() {
    if (!session) {
      openSignIn();
      return;
    }

    try {
      const res = await fetch(`/api/trips/${trip.id}/duplicate`, {
        method: "POST",
      });

      if (!res.ok) {
        showToast("Unable to duplicate trip.", "error");
        return;
      }

      const newTrip = await res.json();
      router.push(`/trip/${newTrip.id}`);
    } catch (err) {
      showToast("Something went wrong.", "error");
    }
  }

  return (
    <div className="flex gap-6 mt-4">
      {/* Public Share Button */}
      <ShareTripButton trip={trip} />

      {/* Duplicate Trip */}
      <button
        onClick={handleDuplicate}
        className="text-blue-500 underline text-sm"
      >
        Duplicate
      </button>
    </div>
  );
}
