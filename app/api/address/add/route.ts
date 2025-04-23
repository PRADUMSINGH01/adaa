// app/api/user/address/route.ts
//import { getSession } from "next-auth/react";
import { db } from "@/server/firebase/firebase";
import { NextRequest, NextResponse } from "next/server";
//import { Session } from "next-auth";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface RequestBody {
  address: Address;
}

export async function POST(req: NextRequest) {
  try {
    const session = { user: { id: "1" } }; //await getSession({ req }) as (Session & { user: { id: string } ) | null;

    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Validate request body
    const body: RequestBody = await req.json();

    if (!body.address || typeof body.address !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid address format" },
        { status: 400 }
      );
    }

    // Update Firestore document
    const userRef = db.collection("users").doc(session.user.id);

    await userRef.update({
      address: body.address,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating address:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
