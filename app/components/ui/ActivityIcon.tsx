"use client";

import {
  Utensils,
  MapPin,
  Camera,
  Landmark,
  Coffee,
  Footprints,
} from "lucide-react";

export function getActivityIcon(activity: string) {
  const lower = activity.toLowerCase();

  if (
    lower.includes("food") ||
    lower.includes("restaurant") ||
    lower.includes("eat") ||
    lower.includes("dinner") ||
    lower.includes("lunch")
  ) {
    return <Utensils size={16} className="text-slate-300" />;
  }

  if (lower.includes("walk") || lower.includes("stroll") || lower.includes("explore")) {
    return <Footprints size={16} className="text-slate-300" />;
  }

  if (lower.includes("museum") || lower.includes("art") || lower.includes("gallery")) {
    return <Landmark size={16} className="text-slate-300" />;
  }

  if (lower.includes("coffee") || lower.includes("cafe") || lower.includes("tea")) {
    return <Coffee size={16} className="text-slate-300" />;
  }

  if (
    lower.includes("photo") ||
    lower.includes("viewpoint") ||
    lower.includes("scenic") ||
    lower.includes("lookout")
  ) {
    return <Camera size={16} className="text-slate-300" />;
  }

  // Default icon
  return <MapPin size={16} className="text-slate-300" />;
}
