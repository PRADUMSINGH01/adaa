// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// The same secret you set in NextAuth options
const secret = process.env.NEXTAUTH_SECRET;

/**
 * Middleware to protect routes and verify NextAuth JWT
 */
export async function middleware(req: NextRequest) {
  // Get NextAuth JWT token (will be null if not valid/absent)
  const token = await getToken({
    req,
    secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const { pathname } = req.nextUrl;

  // Define which paths are public
  const publicPaths = [
    "/",
    "/Login",
    "/error",
    "/api/auth/(.*)",
    "/_next/(.*)",
    "/favicon.ico",
  ];

  // If the request matches a public path, continue
  if (publicPaths.some((path) => new RegExp(`^${path}$`).test(pathname))) {
    return NextResponse.next();
  }

  // For any other route, require authentication
  if (!token) {
    // Redirect to login page, preserve callbackUrl
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/Login";
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow request
  return NextResponse.next();
}

// Apply middleware to all routes except static and public
export const config = {
  matcher: ["/User"],
};
