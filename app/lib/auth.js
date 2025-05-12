// app/lib/auth.js
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/server/firebase/firebase";

/**
 * Keep this file free of any route‑handler exports.
 */
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userRef = db.collection("users").doc(user.id);
      const userDoc = await userRef.get();
      const data = {
        name: user.name,
        email: user.email,
        updatedAt: new Date(),
      };
      if (!userDoc.exists) {
        data.createdAt = new Date();
        data.wishlist = [];
        data.address = {};
      }
      await userRef.set(data, { merge: true });
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: { signIn: "/login", error: "/auth/error" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
