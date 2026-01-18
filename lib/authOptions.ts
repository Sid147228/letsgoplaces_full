import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Ensure the session always contains the real DB user ID
        session.user.id = user.id;
      }
      return session;
    },

    async jwt({ token, user }) {
      // When user logs in for the first time, attach DB user ID to token
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async redirect() {
      return "/my-trips";
    },
  },
};
