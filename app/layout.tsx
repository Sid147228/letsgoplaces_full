export const dynamic = "force-dynamic";

import "./globals.css";
import type { Metadata } from "next";

// Correct paths based on your folder structure
import SessionProvider from "@/app/components/SessionProvider";
import NavBar from "@/app/components/NavBar";
import { ToastProvider } from "@/app/components/ui/Toast";
import { ModalProvider } from "@/app/context/ModalContext";
import SignInModal from "@/app/components/SignInModal";

import { AuthProvider } from "@/app/context/AuthContext"; // corrected path

export const metadata: Metadata = {
  title: "LetsGoPlaces – Calm, Smart Travel Planning",
  description:
    "A calm, stylish travel companion that quietly builds beautiful itineraries for the way you travel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        {/* Supabase Auth Provider */}
        <AuthProvider>
          {/* NextAuth Session Provider */}
          <SessionProvider>
            <ToastProvider>
              <ModalProvider>
                <div className="min-h-screen flex flex-col">

                  {/* Global NavBar */}
                  <NavBar />

                  {/* Page content */}
                  <main className="flex-1">{children}</main>

                  {/* Footer */}
                  <footer className="border-t border-white/10 bg-black/90">
                    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                      <p>
                        © {new Date().getFullYear()} LetsGoPlaces. All rights reserved.
                      </p>
                      <p>Built for travelers who prefer calm over chaos.</p>
                    </div>
                  </footer>

                </div>

                {/* Global Sign-In Modal */}
                <SignInModal />
              </ModalProvider>
            </ToastProvider>
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
