import { Sparkles, MapPin, Calendar, Wallet } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Sparkles,
    title: "AI‑Powered Itineraries",
    desc: "Personalized day‑by‑day plans crafted by advanced travel intelligence."
  },
  {
    icon: MapPin,
    title: "Smart Recommendations",
    desc: "Discover hidden gems, local favorites, and must‑see attractions."
  },
  {
    icon: Calendar,
    title: "Flexible Planning",
    desc: "Adjust dates, swap activities, and customize your trip effortlessly."
  },
  {
    icon: Wallet,
    title: "Budget Optimization",
    desc: "Set your budget and let AI optimize your entire journey."
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-24 bg-white">
      <SectionHeading
        title="Everything You Need to Plan Perfect Trips"
        subtitle="From AI itineraries to budget tracking, LetsGoPlaces makes travel effortless."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-lg mb-4">
              <f.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
