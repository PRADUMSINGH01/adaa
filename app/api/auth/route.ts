// app/api/auth/route.ts
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { auth, db } from "@/server/firebase/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Missing authentication token" },
        { status: 400 }
      );
    }

    // Verify ID token and create session cookie
    const decodedToken = await auth.verifyIdToken(token);
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(token, { expiresIn });

    // Generate CSRF token
    const csrfToken = randomBytes(32).toString("hex");
    const csrfExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    const csrfExpirationDate = new Date(csrfExpires);

    // Get user data and update Firestore
    const firebaseUser = await auth.getUser(decodedToken.uid);
    const userRef = db.collection("User").doc(firebaseUser.uid);

    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const now = new Date();

      if (!userDoc.exists) {
        transaction.set(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          provider: firebaseUser.providerData[0]?.providerId,
          createdAt: FieldValue.serverTimestamp(),
          lastLogin: FieldValue.serverTimestamp(),
          roles: ["user"],
          wishlist: [],
          csrfTokens: [{ token: csrfToken, expires: csrfExpirationDate }],
        });
      } else {
        const existingTokens = userDoc.data()?.csrfTokens || [];

        // Filter out expired tokens
        const validTokens = existingTokens.filter(
          (t: { token: string; expires: Date }) => t.expires > now
        );

        transaction.update(userRef, {
          csrfTokens: [
            ...validTokens,
            { token: csrfToken, expires: csrfExpirationDate },
          ],
          lastLogin: FieldValue.serverTimestamp(),
        });
      }
    });

    // Create response with cookies
    const response = NextResponse.json({
      success: true,
      user: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      },
    });

    response.cookies.set({
      name: "session",
      value: sessionCookie,

      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiresIn,
      path: "/",
    });

    response.cookies.set({
      name: "csrf_token",
      value: csrfToken,

      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Authentication Error:", error);
    const status =
      error instanceof Error && error.message.includes("auth/") ? 401 : 500;

    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
