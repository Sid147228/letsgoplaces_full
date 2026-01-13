"use client";

import React from "react";
import NavBar from "../components/NavBar";
import PlannerDesktop from "./PlannerDesktop";
import PlannerMobileWizard from "./PlannerMobileWizard";
// import SaveTripButton from "@/components/SaveTripButton"; // ← Only needed if itinerary is rendered here

export default function PlanPage() {
  const isClient = typeof window !== "undefined";
  const isMobile = isClient ? window.innerWidth < 1024 : false;

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="pt-16">
        {isMobile ? (
          <PlannerMobileWizard />
        ) : (
          <PlannerDesktop />
        )}

        {/* 
          ⚠️ IMPORTANT:
          The SaveTripButton does NOT go here because this page does NOT have the trip data.
          It must be added INSIDE PlannerDesktop or PlannerMobileWizard,
          wherever the itinerary is actually displayed.
        */}
      </div>
    </div>
  );
}