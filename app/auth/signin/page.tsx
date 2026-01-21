"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const verified = searchParams.get("verified");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (verified) {
      setMessage("Your email has been verified. You can now sign in.");
    }
  }, [verified]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setMessage(res.error);
    } else {
      window.location.href = "/my-trips";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Sign in to LetsGoPlaces
        </h1>

        {message && (
          <div className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        {/* Email + Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <img src="/google-icon.svg" alt="" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-black font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
