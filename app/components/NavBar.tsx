"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

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

          <Link href="/my-trips" className="hover:text-white transition-colors">
            My Trips
          </Link>

          <a href="#examples" className="hover:text-white transition-colors">
            Sample trips
          </a>

          <a href="#waitlist" className="hover:text-white transition-colors">
            Waitlist
          </a>

          {/* Auth Controls */}
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-slate-400">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="hover:text-white transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
