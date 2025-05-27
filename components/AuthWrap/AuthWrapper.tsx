// app/components/AuthWrapper.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

interface AuthWrapperProps {
  children: ReactNode;
  /**
   * Optional: path to redirect to on unauthenticated.
   * Defaults to NextAuth’s built-in signIn (`/api/auth/signin?callbackUrl=…`)
   */
  redirectTo?: string;
}

export default function AuthWrapper({
  children,
  redirectTo,
}: AuthWrapperProps) {
  const { status } = useSession();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      const base = redirectTo ?? "/Login";
      // Pass current path as callback so user returns here after sign-in
      router.replace(base);
    }
  }, [status, router, path, redirectTo]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading…</p>
      </div>
    );
  }

  // Once status === "authenticated", render children
  return <>{children}</>;
}
