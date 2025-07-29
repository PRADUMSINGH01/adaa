// app/api/users/[email]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";

interface FirebaseError extends Error {
  code: string;
  message: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - No active session" },
        { status: 401 }
      );
    }

    const userEmail = "hs947518@gmail.com"; //session.user.email;

    // Use UID instead of email for document ID
    const userDoc = await db.collection("Users").doc(userEmail).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({
      ...userData,
    });
  } catch (error: unknown) {
    console.error("User profile fetch error:", error);

    // Type-safe error handling
    if (typeof error === "object" && error !== null) {
      const firebaseError = error as FirebaseError;

      if (firebaseError.code) {
        switch (firebaseError.code) {
          case "auth/user-not-found":
            return NextResponse.json(
              { error: "Account not found" },
              { status: 404 }
            );
          case "auth/invalid-email":
            return NextResponse.json(
              { error: "Invalid email format" },
              { status: 400 }
            );
        }
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
