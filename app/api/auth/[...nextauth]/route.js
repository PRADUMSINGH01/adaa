import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/server/firebase/firebase";
export const authOptions = {
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
      try {
        const userRef = db.collection("users").doc(user.id);
        const userDoc = await userRef.get();

        const userData = {
          name: user.name,
          email: user.email,
          updatedAt: new Date(),
        };

        if (!userDoc.exists) {
          userData.createdAt = new Date();
          userData.wishlist = [];
          userData.address = {};
        }

        await userRef.set(userData, { merge: true });
        return true;
      } catch (error) {
        console.error("Firestore error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "Login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
