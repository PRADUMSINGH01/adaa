// app/lib/session.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * Create a signed JWT session and write it into an HTTP-only cookie.
 * Must be run in a Server Component or Server Action.
 */
export async function createSession(userId: string) {
  // Ensure the JWT secret is set
  const jwtSecret = process.env.YOUR_JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("YOUR_JWT_SECRET environment variable is not set.");
  }

  // 1) Sign a JWT
  const token = jwt.sign(
    { sub: userId },
    jwtSecret, // Use the checked secret
    { expiresIn: "1d" } // Token expires in 1 day
  );

  // Get the cookie instance
  const cookieStore = await cookies();

  // 2) Write it into an HTTP-only cookie
  cookieStore.set({
    name: "session_token",
    value: token,
    httpOnly: true, // Not accessible from client-side JS
    path: "/", // Accessible from all paths
    // secure: true, // <-- enable in production (requires HTTPS)
    // sameSite: 'lax', // Recommended for CSRF protection
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });
}

// You might also want a function to get the session or delete it
/**
 * Get the user ID from the session cookie.
 * Must be run in a Server Component or Server Action.
 */
export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token");

  if (!sessionToken) {
    return null; // No session cookie found
  }

  const jwtSecret = process.env.YOUR_JWT_SECRET;
  if (!jwtSecret) {
    // This should ideally not happen if createSession was successful,
    // but good for robustness.
    console.error("YOUR_JWT_SECRET environment variable is not set.");
    return null;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(sessionToken.value, jwtSecret) as {
      sub: string;
    };
    return decoded.sub; // Return the user ID
  } catch (error) {
    console.error("Failed to verify session token:", error);
    // Invalid token, delete the cookie
    await deleteSession();
    return null;
  }
}

/**
 * Delete the session cookie.
 * Must be run in a Server Component or Server Action.
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}
