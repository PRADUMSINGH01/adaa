// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";

export async function GET() {
  const productId = "F0003";

  try {
    const docRef = db.collection("Products").doc(productId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: doc.data() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
