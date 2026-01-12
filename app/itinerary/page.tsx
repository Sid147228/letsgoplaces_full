import { Suspense } from "react";
import ItineraryClient from "./ItineraryClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading…</div>}>
      <ItineraryClient />
    </Suspense>
  );
}