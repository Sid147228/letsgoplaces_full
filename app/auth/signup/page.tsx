"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }

      setMessage(
        "Account created! Check your email to verify your account before signing in."
      );

      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoading(false);
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Create your LetsGoPlaces account
        </h1>

        {message && (
          <div className="mb-4 text-sm text-blue-700 bg-blue-50 p-3 rounded">
            {message}
          </div>
        )}

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="mt-1 w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Google Sign-Up */}
        <button
          onClick={() => signIn("google")}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <img src="/google-icon.svg" alt="" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-black font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
