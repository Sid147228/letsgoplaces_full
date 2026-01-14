"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function GenerateTripPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleGenerateTrip = async () => {
    if (!session) {
      signIn("google");
      return;
    }

    setLoading(true);

    // Replace with your actual trip generation logic
    const response = await fetch("/api/generate-trip", {
      method: "POST",
      body: JSON.stringify({
        destination: "Tokyo",
        days: 5,
        budget: "medium",
        style: "adventure",
        userId: session.user.id, // ✅ now available
      }),
    });

    const data = await response.json();
    console.log("Generated trip:", data);

    setLoading(false);
  };

  return (
    <div>
      <h1>Build My Itinerary</h1>
      {/* Your form inputs here */}
      <button onClick={handleGenerateTrip} disabled={loading}>
        {loading ? "Generating..." : "Generate Trip"}
      </button>
    </div>
  );
}