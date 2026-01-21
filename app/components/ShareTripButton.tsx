"use client";

import { useSession } from "next-auth/react";
import { useToast } from "@/app/components/ui/Toast";
import { useModal } from "@/app/context/ModalContext";

export default function ShareTripButton({ trip }) {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const { openSignIn } = useModal();

  function handleShare() {
    // If user is not logged in → open Sign-In modal
    if (!session) {
      openSignIn();
      return;
    }

    try {
      const shareData = {
        title: `My trip to ${trip.destination}`,
        text: `Check out my ${trip.days}-day trip to ${trip.destination}!`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/trip/${trip.id}`,
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
        showToast("Link copied to clipboard!", "success");
      }
    } catch (err) {
      showToast("Unable to share this trip.", "error");
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-blue-500 underline text-sm"
    >
      Share
    </button>
  );
}
