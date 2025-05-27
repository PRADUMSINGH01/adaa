// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/lib/auth";
import { FieldValue } from "firebase-admin/firestore";

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  // Add other product properties as needed
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user UID from Firebase Auth
    const userEmail = session.user.email;
    const user = await db.collection("Users").doc(userEmail).get();
    if (!user.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate request body
    const productData: Product = await request.json();
    if (!productData.productId || !productData.name || !productData.price) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    // Add product to wishlist subcollection
    const wishlistRef = db
      .collection("Users")
      .doc(userEmail)
      .collection("WishList")
      .doc(productData.productId);

    await wishlistRef.set(
      {
        ...productData,
        addedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    console.log(productData);
    return NextResponse.json(
      { success: true, product: productData },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error adding to wishlist:", error);

    // Handle Firestore errors
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
