"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/ui/Toast";
import { useModal } from "@/app/context/ModalContext";

export default function DeleteTripButton({ tripId }: { tripId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const { openSignIn } = useModal();

  async function handleDelete() {
    // If user is not logged in → open Sign-In modal
    if (!session) {
      openSignIn();
      return;
    }

    const confirmed = confirm("Are you sure you want to delete this trip?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/trips/${tripId}/delete`, {
        method: "DELETE",
      });

      if (!res.ok) {
        showToast("Failed to delete trip.", "error");
        return;
      }

      showToast("Trip deleted successfully.", "success");
      router.push("/my-trips");
    } catch (err) {
      showToast("Something went wrong.", "error");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 underline text-sm hover:text-red-300"
    >
      Delete Trip
    </button>
  );
}
