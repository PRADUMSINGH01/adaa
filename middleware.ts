// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  if (!token && request.nextUrl.pathname.startsWith("/Checkout")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  // if (!token && request.nextUrl.pathname.startsWith("/User")) {
  //   return NextResponse.redirect(new URL("/Login", request.url));
  // }

  return NextResponse.next();
}
export const config = {
  matcher: ["/:path*", "/User/:path*"],
};
