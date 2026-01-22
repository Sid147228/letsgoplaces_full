import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Adventure Traveler • San Francisco",
    quote: "LetsGoPlaces planned our entire Japan trip in minutes. Every detail was perfect."
  },
  {
    name: "Marcus Rodriguez",
    role: "Digital Nomad • Lisbon",
    quote: "The AI actually understands my travel style. Nothing else comes close."
  },
  {
    name: "Emma Thompson",
    role: "Family Vacationer • London",
    quote: "Planning family trips used to be stressful. Now it's effortless."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <SectionHeading
        title="Loved by Travelers Worldwide"
        subtitle="Join thousands who’ve discovered the joy of AI‑powered trip planning."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-yellow-500" />)}
            </div>
            <p className="text-gray-700 mb-4">“{t.quote}”</p>
            <p className="font-semibold">{t.name}</p>
            <p className="text-gray-500 text-sm">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
