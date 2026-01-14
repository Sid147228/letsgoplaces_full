"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function GenerateTripPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleGenerateTrip = async () => {
    // 1) If not logged in, go to Google
    if (!session) {
      await signIn("google");
      return;
    }

    // 2) If logged in, run your generate-trip logic
    setLoading(true);

    // TODO: replace this with your real form values
    const response = await fetch("/api/generate-trip", {
      method: "POST",
      body: JSON.stringify({
        destination: "Tokyo",
        days: 5,
        budget: "medium",
        style: "adventure",
        userId: session.user.id, // will exist after our TS config
      }),
    });

    const data = await response.json();
    console.log("Generated trip:", data);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Temporary auth/debug bar at the top */}
      <div className="w-full flex justify-between items-center px-4 py-2 text-sm bg-white/5">
        <div>
          Status:{" "}
          <span className="font-mono">
            {status} {session ? `(logged in as ${session.user?.email})` : ""}
          </span>
        </div>

        <div className="flex gap-2">
          {!session && (
            <button
              onClick={() => signIn("google")}
              className="rounded-full border border-white/30 px-3 py-1 text-xs hover:bg-white/10"
            >
              Sign in with Google
            </button>
          )}
          {session && (
            <button
              onClick={() => signOut()}
              className="rounded-full border border-white/30 px-3 py-1 text-xs hover:bg-white/10"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Your existing build UI can stay below */}
      <main className="p-6">
        <h1 className="text-2xl mb-4">Build My Itinerary</h1>
        {/* your form fields here */}

        <button
          onClick={handleGenerateTrip}
          disabled={loading}
          className="mt-4 rounded-full bg-white text-black px-6 py-2 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </main>
    </div>
  );
}