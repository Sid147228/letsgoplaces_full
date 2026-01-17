"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          LetsGoPlaces
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/plan" className="hover:text-slate-300">Plan a trip</Link>
          <Link href="/sample-trips" className="hover:text-slate-300">Sample trips</Link>
          <Link href="/waitlist" className="hover:text-slate-300">Waitlist</Link>

          {session ? (
            <>
              <Link href="/my-trips" className="hover:text-slate-300">My Trips</Link>
              <button
                onClick={() => signOut()}
                className="text-slate-400 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 space-y-4 text-sm animate-fadeIn">
          <Link href="/plan" onClick={() => setOpen(false)} className="block">Plan a trip</Link>
          <Link href="/sample-trips" onClick={() => setOpen(false)} className="block">Sample trips</Link>
          <Link href="/waitlist" onClick={() => setOpen(false)} className="block">Waitlist</Link>

          {session ? (
            <>
              <Link href="/my-trips" onClick={() => setOpen(false)} className="block">
                My Trips
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="text-slate-400"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                signIn("google");
              }}
              className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
