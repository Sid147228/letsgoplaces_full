import { ExternalLink, Hotel, Compass, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

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

const affiliateLinks: Record<string, Record<string, { name: string; baseUrl: string }>> = {
  hotel: {
    primary: { name: "Booking.com", baseUrl: "https://www.booking.com/searchresults.html?ss=" },
    secondary: { name: "Expedia", baseUrl: "https://www.expedia.com/Hotel-Search?destination=" },
  },
  activity: {
    primary: { name: "Viator", baseUrl: "https://www.viator.com/searchResults/all?text=" },
    secondary: { name: "GetYourGuide", baseUrl: "https://www.getyourguide.com/s?q=" },
  },
};

export function AffiliateBookingCard({
  type,
  name,
  description,
  estimatedCost,
  currency = "USD",
  location,
  tripId,
  destination,
  className,
}: AffiliateBookingCardProps) {
  const { user } = useAuth();
  const Icon = type === "hotel" ? Hotel : Compass;
  const links = affiliateLinks[type];

  const handleBookClick = async (partner: "primary" | "secondary") => {
    const partnerInfo = links[partner];
    const searchQuery = encodeURIComponent(`${name} ${destination || location || ""}`);
    const affiliateUrl = `${partnerInfo.baseUrl}${searchQuery}`;

    // Track the click
    try {
      await supabase.from("affiliate_clicks" as any).insert({
        user_id: user?.id || null,
        trip_id: tripId || null,
        click_source: "itinerary",
        destination: destination || location,
      });
    } catch (error) {
      console.error("Error tracking affiliate click:", error);
    }

    // Open affiliate URL
    window.open(affiliateUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center",
            type === "hotel"
              ? "bg-ocean/10 text-ocean"
              : "bg-accent/10 text-accent"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm truncate">{name}</h4>
            <Badge variant="outline" className="text-xs shrink-0">
              {type === "hotel" ? "Stay" : "Experience"}
            </Badge>
          </div>

          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {description}
            </p>
          )}

          {estimatedCost && (
            <p className="text-xs text-muted-foreground mb-3">
              Est. cost: <span className="font-medium text-foreground">{currency} {estimatedCost}</span>
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleBookClick("primary")}
              className="text-xs h-8 gap-1"
            >
              Book on {links.primary.name}
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBookClick("secondary")}
              className="text-xs h-8 gap-1"
            >
              {links.secondary.name}
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
