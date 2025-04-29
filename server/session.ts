// app/lib/session.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

/**
 * Create a signed JWT session and write it into an HTTP-only cookie.
 * Must be run in a Server Component or Server Action.
 */
export async function createSession(userId: string) {
  // 1) Sign a JWT (you must set NEXTAUTH_SECRET or YOUR_JWT_SECRET in env)
  const cook = await cookies();
  const token = jwt.sign(
    { sub: userId },
    process.env.YOUR_JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  // 2) Write it into a cookie that’s HTTP-only (not accessible from JS)
  cook().set({
    name: 'session_token',
    value: token,
    httpOnly: true,
    path: '/',
    // secure: true,  // <-- enable in prod
    // sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });
}
