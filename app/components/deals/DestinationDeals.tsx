"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tag, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Deal {
  id: string;
  title: string;
  description: string;
  destination: string;
  deal_type: string;
  discount_text: string;
  price_from: number;
  currency: string;
  image_url: string;
  affiliate_url: string;
  partner: {
    name: string;
  };
}

interface DestinationDealsProps {
  destination: string;
  tripId?: string;
  limit?: number;
  className?: string;
}

export default function DestinationDeals({
  destination,
  tripId,
  limit = 3,
  className,
}: DestinationDealsProps) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDeals();
  }, [destination]);

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase
        .from("affiliate_deals")
        .select(`
          *,
          partner:affiliate_partners(name)
        `)
        .eq("is_active", true)
        .ilike("destination", `%${destination.split(",")[0]}%`)
        .limit(limit);

      if (error) throw error;

      if (!data || data.length === 0) {
        const { data: featuredData } = await supabase
          .from("affiliate_deals")
          .select(`
            *,
            partner:affiliate_partners(name)
          `)
          .eq("is_active", true)
          .eq("is_featured", true)
          .limit(limit);

        setDeals(featuredData || []);
      } else {
        setDeals(data);
      }
    } catch (err) {
      console.error("Error fetching deals:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDealClick = async (deal: Deal) => {
    try {
      await supabase.from("affiliate_clicks").insert({
        user_id: user?.id || null,
        deal_id: deal.id,
        trip_id: tripId || null,
        click_source: "itinerary",
        destination: deal.destination,
      });
    } catch (err) {
      console.error("Error tracking click:", err);
    }

    window.open(deal.affiliate_url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className={cn("space-y-3", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (deals.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2 text-lg">
          <Tag className="h-4 w-4 text-blue-400" />
          Recommended Deals
        </h3>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/deals" className="gap-1 flex items-center">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => handleDealClick(deal)}
          >
            <div className="h-16 w-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={
                  deal.image_url ||
                  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200"
                }
                alt={deal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
                  {deal.title}
                </h4>

                {deal.discount_text && (
                  <Badge variant="destructive" className="text-xs">
                    {deal.discount_text}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-gray-400 line-clamp-1">
                {deal.description}
              </p>

              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>via {deal.partner?.name}</span>

                {deal.price_from && (
                  <span className="font-medium text-white">
                    From {deal.currency} {deal.price_from}
                  </span>
                )}
              </div>
            </div>

            <ExternalLink className="h-4 w-4 text-gray-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}
