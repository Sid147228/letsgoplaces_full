import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Export authConfig so other API routes (like /api/trips) can import it
export { authConfig };

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };