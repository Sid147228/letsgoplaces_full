export function getDestinationImage(destination: string) {
  const lower = destination.toLowerCase();

  if (lower.includes("paris")) return "/images/destinations/paris.jpg";
  if (lower.includes("tokyo")) return "/images/destinations/tokyo.jpg";
  if (lower.includes("new york")) return "/images/destinations/newyork.jpg";
  if (lower.includes("london")) return "/images/destinations/london.jpg";
  if (lower.includes("bali")) return "/images/destinations/bali.jpg";

  // Fallback
  return "/images/destinations/default.jpg";
}
