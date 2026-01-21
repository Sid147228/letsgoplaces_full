"use client";

import { signIn } from "next-auth/react";
import { useModal } from "@/app/context/ModalContext";

export default function SignInModal() {
  const { showSignIn, closeSignIn } = useModal();

  if (!showSignIn) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Sign in to continue</h2>
        <p className="text-slate-600 text-sm mb-6">
          You need to be signed in to save, share, or export trips.
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-black text-white py-2 rounded-lg mb-3"
        >
          Continue with Google
        </button>

        <button
          onClick={() => signIn()}
          className="w-full border py-2 rounded-lg"
        >
          Sign in with Email
        </button>

        <button
          onClick={closeSignIn}
          className="mt-4 text-sm text-slate-500 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
