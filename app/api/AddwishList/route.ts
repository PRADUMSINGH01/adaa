// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

import { wishlist } from "@/server/types";

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user document reference
    const userEmail = session.user.email;
    const userRef = db.collection("Users").doc(userEmail);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate request body
    const productData: wishlist = await request.json();
    if (!productData.id || !productData.name || !productData.price) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    // Transaction to safely update wishlist
    await db.runTransaction(async (transaction) => {
      const userData = (await transaction.get(userRef)).data()!;
      const currentWishlist = userData.wishlist || [];

      // Check for existing product
      if (
        currentWishlist.some((item: wishlist) => item.id === productData.id)
      ) {
        throw new Error("Product already in wishlist");
      }

      // Add new product with timestamp
      transaction.update(userRef, {
        wishlist: [
          ...currentWishlist,
          {
            id: productData.id,
            name: productData.name,
            image: productData.images,
            addedAt: FieldValue.serverTimestamp(),
          },
        ],
      });
    });

    return NextResponse.json(
      { success: true, product: productData },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error adding to wishlist:", error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message === "Product already in wishlist") {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
