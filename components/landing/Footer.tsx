import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 px-6">

        <div>
          <h3 className="text-white font-semibold mb-3">LetsGoPlaces</h3>
          <p className="text-sm mb-4">
            Plan your perfect journey with AI‑powered itineraries.
          </p>
          <div className="flex gap-3">
            <Twitter size={20} />
            <Instagram size={20} />
            <Linkedin size={20} />
            <Github size={20} />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>Features</li>
            <li>Pricing</li>
            <li>Trip Planner</li>
            <li>Mobile App</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Travel Guides</li>
            <li>API Docs</li>
            <li>Status</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Cookies</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} LetsGoPlaces. All rights reserved.
      </div>
    </footer>
  );
}
