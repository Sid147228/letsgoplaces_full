import DestinationDeals from "@/app/components/deals/DestinationDeals";
import { AffiliateBookingCard } from "@/components/affiliate/AffiliateBookingCard";

export default function DealsPage() {
  return (
    <main className="max-w-5xl mx-auto py-20 px-6 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold">Travel Deals & Offers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Save on hotels, activities, and tours from our trusted partners.
        </p>
      </div>

      {/* Featured Deals from Supabase */}
      <DestinationDeals destination="Featured" limit={6} />

      {/* Generic Affiliate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AffiliateBookingCard
          type="hotel"
          name="Best Hotel Deals"
          destination="Worldwide"
        />

        <AffiliateBookingCard
          type="activity"
          name="Top Activities & Experiences"
          destination="Worldwide"
        />
      </div>
    </main>
  );
}
