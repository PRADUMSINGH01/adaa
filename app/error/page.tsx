// app/auth/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages: Record<string, string> = {
  Signin: "Try signing in again.",
  OAuthSignin: "OAuth provider error.",
  OAuthCallback: "Error in OAuth callback.",
  OAuthCreateAccount: "Could not create account.",
  Callback: "Server callback error.",
  OAuthAccountNotLinked: "Account already linked.",
  EmailCreateAccount: "Could not create email account.",
  EmailSend: "Error sending email.",
  KeyNotFound: "Key not found.",
  SessionRequired: "Please sign in to access that page.",
  Default: "An unexpected error occurred.",
};

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error") ?? "Default";
  const message = errorMessages[error] ?? errorMessages.Default;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
      <p className="mb-6">{message}</p>
      <Link
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Sign In
      </Link>
    </div>
  );
}
