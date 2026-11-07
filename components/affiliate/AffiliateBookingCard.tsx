import { ExternalLink, Hotel, Compass } from "lucide-react";

interface AffiliateBookingCardProps {
  type: "hotel" | "activity";
  name: string;
  description?: string;
  estimatedCost?: number;
  currency?: string;
  location?: string;
  tripId?: string;
  destination?: string;
  className?: string;
}

export function AffiliateBookingCard({ type, name, description, estimatedCost, currency = "USD", location, destination, className = "" }: AffiliateBookingCardProps) {
  const Icon = type === "hotel" ? Hotel : Compass;
  const search = encodeURIComponent(destination || location || name);
  const url = type === "hotel"
    ? `https://www.booking.com/searchresults.html?ss=${search}`
    : `https://www.getyourguide.com/s?q=${search}`;
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm ${className}`}>
      <Icon className="mb-4 h-7 w-7 text-teal-700" aria-hidden="true" />
      <h3 className="text-lg font-semibold">{name}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      {estimatedCost != null && <p className="mt-2 text-sm text-slate-600">Estimated cost: {currency} {estimatedCost}</p>}
      <a href={url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-900 px-5 py-3 text-sm font-semibold text-white">
        Search {type === "hotel" ? "stays" : "experiences"} <ExternalLink size={15} />
      </a>
      <p className="mt-3 text-xs text-slate-500">Search results are provided by an external website. Prices and availability are not verified by letsg0places.</p>
    </article>
  );
}
