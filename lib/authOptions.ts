import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // ⭐ FIXED
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Email + Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in");
        }

        // Check password
        if (!user.password) {
          throw new Error("Please log in using Google");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Attach DB user ID to token
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose DB user ID to session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async redirect() {
      return "/my-trips";
    },
  },

  session: {
    strategy: "jwt",
  },
};
