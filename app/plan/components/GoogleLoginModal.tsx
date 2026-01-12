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
        <p className="text-sm font-medium mb-2">Sign in to save your trip</p>
        <p className="text-xs text-slate-300 mb-4">
          We’ll use your account to save this itinerary and let you revisit it later.
        </p>

        <button
          onClick={onContinue}
          className="w-full mb-3 px-4 py-2.5 rounded-full bg-white text-black text-xs font-semibold flex items-center justify-center gap-2"
        >
          {/* Google G Icon */}
          <svg className="w-4 h-4" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.23 9.21 3.25l6.85-6.85C35.9 2.38 30.3 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.01 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.57-.14-3.08-.39-4.5H24v9h12.65c-.55 2.97-2.2 5.49-4.65 7.19l7.98 6.19C44.52 38.62 46.1 31.94 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.54 28.41c-.48-1.42-.75-2.94-.75-4.41s.27-2.99.75-4.41l-7.98-6.19C.9 16.06 0 20.17 0 24c0 3.83.9 7.94 2.56 11.59l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.3 0 11.9-2.38 16.06-6.41l-7.98-6.19C29.71 37.77 26.54 39 24 39c-6.26 0-11.57-3.51-14.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <button
          onClick={onClose}
          className="w-full text-[11px] text-slate-300 mt-1"
        >
          Not now
        </button>

        <p className="text-[10px] text-slate-400 mt-3">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </div>
  );
}