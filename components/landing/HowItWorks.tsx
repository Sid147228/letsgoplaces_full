import { MapPin, Sparkles, Plane, PartyPopper } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { icon: MapPin, title: "Choose Your Destination", desc: "Tell us where you're going and when." },
  { icon: Sparkles, title: "Share Your Preferences", desc: "Budget, interests, travel style — we adapt to you." },
  { icon: Plane, title: "Get Your Itinerary", desc: "AI crafts a personalized day‑by‑day plan." },
  { icon: PartyPopper, title: "Enjoy Your Trip", desc: "Save, edit, share, and explore with confidence." }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <SectionHeading
        title="How It Works"
        subtitle="A simple, powerful way to plan unforgettable trips."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {steps.map((s, i) => (
          <div key={i} className="text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center bg-black text-white rounded-full mb-4">
              <s.icon size={26} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
