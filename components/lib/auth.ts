// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/server/firebase/firebase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/Login",
    error: "/error",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      const userRef = db.collection("Users").doc(user.email);
      const doc = await userRef.get();

      if (!doc.exists) {
        // Create user in Firestore if not exists
        await userRef.set({
          name: user.name,
          email: user.email,
          image: user.image,
          wishList: [],
          Address: [],
          Orders: [],
          returns: [],
          createdAt: new Date().toISOString(),
        });
      }

      return true; // continue sign in
    },

    async jwt({ token, account }) {
      if (account?.access_token) token.accessToken = account.access_token;
      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) session.accessToken = token.accessToken;
      return session;
    },
  },
};
