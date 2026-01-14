"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthBar() {
  const { data: session, status } = useSession();

  return (
    <div className="w-full flex justify-end px-4 py-2 text-sm text-white/80 bg-black">
      {status === "loading" && <span>Checking session…</span>}

      {status === "unauthenticated" && (
        <button
          onClick={() => signIn("google")}
          className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"
        >
          Sign in with Google
        </button>
      )}

      {status === "authenticated" && (
        <div className="flex items-center gap-3">
          <span>{session.user?.name || session.user?.email}</span>
          <button
            onClick={() => signOut()}
            className="rounded-full border border-white/20 px-3 py-1 hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}