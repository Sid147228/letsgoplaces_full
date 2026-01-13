import Google from "next-auth/providers/google";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

export default authConfig;