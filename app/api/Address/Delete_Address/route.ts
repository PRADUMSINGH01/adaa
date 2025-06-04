// File: app/api/deleteAddress/route.ts

import { NextResponse } from "next/server";

import { db } from "@/server/firebase/firebase";

export async function DELETE(req: Request) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { searchParams } = new URL(req.url);
    const indexStr = searchParams.get("index");

    if (!indexStr) {
      return NextResponse.json(
        { error: "Address index required" },
        { status: 400 }
      );
    }

    const index = parseInt(indexStr);
    if (isNaN(index) || index < 0) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const userRef = db.collection("Users").doc("hs947518@gmail.com");
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    const addressArray = userData?.Address || [];

    if (index >= addressArray.length) {
      return NextResponse.json(
        { error: "Index out of bounds" },
        { status: 400 }
      );
    }

    addressArray.splice(index, 1); // Remove the item at the given index
    await userRef.update({ Address: addressArray });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
