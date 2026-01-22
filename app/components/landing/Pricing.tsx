import SectionHeading from "@/components/ui/SectionHeading";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for casual travelers",
    features: ["3 trips per month", "Basic AI itineraries", "Save up to 5 trips", "Email support"],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "$12",
    desc: "For frequent travelers",
    popular: true,
    features: ["Unlimited trips", "Advanced AI personalization", "PDF export", "Priority support"],
    cta: "Start Free Trial"
  },
  {
    name: "Team",
    price: "$29",
    desc: "For groups & agencies",
    features: ["Everything in Pro", "5 team members", "Collaborative planning", "API access"],
    cta: "Contact Sales"
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <SectionHeading
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your travel style."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`p-8 rounded-xl shadow-sm bg-white border ${
              p.popular ? "border-black" : "border-gray-200"
            }`}
          >
            {p.popular && (
              <div className="text-xs bg-black text-white px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
            <p className="text-gray-600 mb-4">{p.desc}</p>
            <p className="text-4xl font-bold mb-6">{p.price}</p>

            <ul className="space-y-3 mb-6">
              {p.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-black" />
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900">
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
