"use client";

import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-[0.18em] uppercase">
            LetsGoPlaces
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-slate-300">
          <Link href="/plan" className="hover:text-white transition-colors">
            Plan a trip
          </Link>
          <a href="#examples" className="hover:text-white transition-colors">
            Sample trips
          </a>
          <a href="#waitlist" className="hover:text-white transition-colors">
            Waitlist
          </a>
        </div>
      </nav>
    </header>
  );
}