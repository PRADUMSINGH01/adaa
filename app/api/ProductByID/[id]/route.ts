import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";

export async function GET(request: NextRequest) {
  try {
    // Extract slug from URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const slug = decodeURIComponent(pathSegments[pathSegments.length - 1]);

    if (!slug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    // Query the collection where slug equals the given slug
    const querySnapshot = await db
      .collection("Products")
      .where("Slug", "==", slug)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const doc = querySnapshot.docs[0];

    return NextResponse.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch product by slug" },
      { status: 500 }
    );
  }
}
