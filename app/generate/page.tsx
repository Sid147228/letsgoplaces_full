import { Suspense } from "react";
import GenerateTripPage from "./GenerateTripPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading…</div>}>
      <GenerateTripPage />
    </Suspense>
  );
}