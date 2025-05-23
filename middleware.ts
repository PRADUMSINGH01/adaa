// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const session = request.cookies.get("session")?.value;

  // Public paths
  const publicPaths = ["/Login", "/signup", "/"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Verify session through API route
  try {
    const verifyRes = await fetch(new URL("/api/auth/verify", request.url), {
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (!verifyRes.ok) throw new Error("Unauthorized");

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/Login", request.url));
    response.cookies.delete("session");
    return response;
  }
}

export const config = {
  matcher: ["/User/:path*"],
};
