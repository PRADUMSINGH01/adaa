// app/api/wishlist/remove/route.js

import { db } from "@/server/firebase/firebase";

export async function POST(req) {
  try {
    const { productId, userId } = await req.json();

    if (!productId) {
      return Response.json(
        { success: false, message: "Missing userId or productId" },
        { status: 400 }
      );
    }

    const productRef = db
      .collection("Users")
      .doc(userId)
      .collection("wishlist")
      .doc(productId);

    const productSnap = await productRef.get();

    if (!productSnap.exists) {
      return Response.json(
        { success: false, message: "Product not found in wishlist" },
        { status: 404 }
      );
    }

    await productRef.delete();

    return Response.json(
      { success: true, message: "Product removed from wishlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product:", error);
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
