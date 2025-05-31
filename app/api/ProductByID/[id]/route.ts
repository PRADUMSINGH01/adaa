// app/api/ProductByID/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";

export async function GET(request: NextRequest) {
  try {
    // Extract product ID from URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const productId = pathSegments[pathSegments.length - 1];

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const docRef = db.collection("Products").doc(productId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
