// app/api/auth/verify/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/server/firebase/firebase";

export async function GET(request: Request) {
  try {
    const session = request.headers
      .get("Cookie")
      ?.split("session=")[1]
      ?.split(";")[0];

    if (!session) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    // Verify using Firebase Admin SDK
    const decodedClaims = await auth.verifySessionCookie(session, true);
    return NextResponse.json({ valid: true, uid: decodedClaims.uid });
  } catch (error) {
    return NextResponse.json({ valid: error }, { status: 401 });
  }
}
