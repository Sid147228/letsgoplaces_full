"use client";

import React from "react";

interface GoogleLoginModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function GoogleLoginModal({
  open,
  onClose,
  onContinue,
}: GoogleLoginModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-6 max-w-sm w-full">
        <p className="text-sm font-medium mb-2">
          Sign in to save your trip
        </p>
        <p className="text-xs text-slate-300 mb-4">
          We’ll use your account to save this itinerary and let you revisit it
          later.
        </p>
        <button
          onClick={onContinue}
          className="w-full mb-3 px-4 py-2.5 rounded-full bg-white text-black text-xs font-semibold"
        >
          Continue with Google
        </button>
        <button
          onClick={onClose}
          className="w-full text-[11px] text-slate-300 mt-1"
        >
          Not now
        </button>
        <p className="text-[10px] text-slate-400 mt-3">
          By continuing, you agree to our Terms and acknowledge our Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}