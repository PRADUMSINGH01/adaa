// app/api/wishlist/remove/route.js

import { db } from "@/server/firebase/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req) {
  try {
    const { productId, userId } = await req.json();

    // 1) validate inputs
    if (!userId || !productId) {
      return Response.json(
        { success: false, message: "Missing userId or productId" },
        { status: 400 }
      );
    }

    const userRef = db.collection("Users").doc(userId);
    const userSnap = await userRef.get();

    // 2) make sure user exists
    if (!userSnap.exists) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const wishlist = userSnap.data().wishlist || {};

    // 3) check that the product is actually in the wishlist object
    if (!Object.prototype.hasOwnProperty.call(wishlist, productId)) {
      return Response.json(
        { success: false, message: "Product not found in wishlist" },
        { status: 404 }
      );
    }

    // 4) delete just that key from the wishlist map
    await userRef.update({
      [`wishlist.${productId}`]: FieldValue.delete(),
    });

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
