import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-black text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Dream Adventure?</h2>
      <p className="text-gray-300 mb-8">
        Join thousands of travelers using LetsGoPlaces to plan smarter.
      </p>

      <Button onClick={() => signIn(undefined, { callbackUrl: "/generate" })}>
        Start Planning Free <ArrowRight size={18} />
      </Button>
    </section>
  );
}
