import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/",     // If user tries to access protected page → send to homepage
    signOut: "/",    // After logout → homepage
    error: "/",      // Any auth error → homepage
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Always redirect to My Trips after login
      return "/my-trips";
    },
  },
};
