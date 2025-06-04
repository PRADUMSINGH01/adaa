// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

import { Address } from "@/server/types";

export async function POST(request: Request) {
  try {
    // 1. Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch user document reference
    const userEmail = session.user.email;
    const userRef = db.collection("Users").doc(userEmail);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Validate request body
    const productData: Address = await request.json();
    if (!productData.pincode || !productData.name || !productData.Address) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    // 4. Run a transaction to safely update the wishlist array
    await db.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(userRef);
      const userData = userSnap.data() as { Address?: Address[] } | undefined;
      const currentWishlist = Array.isArray(userData?.Address)
        ? userData!.Address!
        : [];

      if (
        currentWishlist.some(
          (item) =>
            item.landmark === productData.landmark &&
            item.pincode === productData.pincode
        )
      ) {
        throw new Error("Address already in list");
      }

      transaction.update(userRef, {
        // IMPORTANT: field name must match exactly the one you read from (e.g. "wishlist")
        Address: FieldValue.arrayUnion({
          name: productData.name,
          phone: productData.Number,
          address: productData.Address,
          city: productData.city,
          landmark: productData.landmark,
          pincode: productData.pincode,
        }),
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    // 5. Return success
    return NextResponse.json(
      { success: true, product: productData },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding to wishlist:", err);

    if (err instanceof Error) {
      if (err.message === "Product already in wishlist") {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
