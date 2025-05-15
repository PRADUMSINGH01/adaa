// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import authOptions from "@/components/lib/auth";

const handler = NextAuth(authOptions);

// only these two are allowed in a Route Handler file:
export { handler as GET, handler as POST };
