// File: app/api/deleteAddress/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";
import { db } from "@/server/firebase/firebase";

// 1) Define your Address shape
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  // …add any additional address fields here
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const indexStr = searchParams.get("index");
    if (!indexStr) {
      return NextResponse.json(
        { error: "Address index required" },
        { status: 400 }
      );
    }
    const index = parseInt(indexStr, 10);
    if (isNaN(index) || index < 0) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const userEmail = session.user.email;
    const userRef = db.collection("Users").doc(userEmail);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2) Safely cast to Address[]
    const data = userSnap.data();
    const addressArray: Address[] = Array.isArray(data?.Address)
      ? (data.Address as Address[])
      : [];

    if (index >= addressArray.length) {
      return NextResponse.json(
        { error: "Index out of bounds" },
        { status: 400 }
      );
    }

    addressArray.splice(index, 1);
    await userRef.update({ Address: addressArray });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
