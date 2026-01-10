import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo + Wordmark */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="LetsGoPlaces Logo"
            width={34}
            height={34}
            priority
          />
          <span className="text-lg font-semibold tracking-wide text-white">
            LetsGoPlaces
          </span>
        </Link>

        {/* Right-side link */}
        <Link
          href="https://instagram.com/letsg0places"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-slate-300 hover:text-white transition"
        >
          Instagram ↗
        </Link>
      </div>
    </header>
  );
}