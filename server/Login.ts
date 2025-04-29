// app/lib/auth.ts
import bcrypt from 'bcrypt';

/**
 * Compare a plain-text password against a bcrypt hash.
 * Must be run on the server (never bundle this into client code).
 */
export async function checkPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  // bcrypt.compare will return true if they match
  return bcrypt.compare(plainPassword, hashedPassword);
}
