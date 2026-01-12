"use client";

import React from "react";
import NavBar from "../components/NavBar";
import PlannerDesktop from "./PlannerDesktop";
import PlannerMobileWizard from "./PlannerMobileWizard";

export default function PlanPage() {
  const isClient = typeof window !== "undefined";
  const isMobile = isClient ? window.innerWidth < 1024 : false;

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="pt-16">
        {isMobile ? <PlannerMobileWizard /> : <PlannerDesktop />}
      </div>
    </div>
  );
}