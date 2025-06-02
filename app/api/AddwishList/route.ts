// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

import { wishlist } from "@/server/types";

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
    const productData: wishlist = await request.json();
    if (!productData.id || !productData.name || !productData.price) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    // 4. Run a transaction to safely update the wishlist array
    await db.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(userRef);
      const userData = userSnap.data() as { wishlist?: wishlist[] } | undefined;
      const currentWishlist = Array.isArray(userData?.wishlist)
        ? userData!.wishlist!
        : [];

      // 4a. Check if an item with the same `id` already exists
      if (currentWishlist.some((item) => item.id === productData.id)) {
        throw new Error("Product already in wishlist");
      }

      // 4b. Append the new product into the existing array via arrayUnion
      transaction.update(userRef, {
        // IMPORTANT: field name must match exactly the one you read from (e.g. "wishlist")
        wishlist: FieldValue.arrayUnion({
          id: productData.id,
          name: productData.name,
          price: productData.price,
          // If you want to store multiple images, make sure `productData.images` is an array
          image: productData.images ?? null,
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
