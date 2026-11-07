import Link from "next/link";

interface DestinationDealsProps {
  destination: string;
  tripId?: string;
  limit?: number;
  className?: string;
}

/** Partner deals are intentionally disabled until a verified feed and approval are configured. */
export default function DestinationDeals({ destination, className = "" }: DestinationDealsProps) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-900 ${className}`}>
      <h2 className="text-lg font-semibold">Explore options in {destination}</h2>
      <p className="mt-2 text-sm text-slate-600">Verified travel deals are coming soon. For now, you can search accommodation and experiences separately.</p>
      <Link href="/generate" className="mt-4 inline-block text-sm font-semibold text-teal-800 underline">Plan another trip</Link>
    </section>
  );
}
