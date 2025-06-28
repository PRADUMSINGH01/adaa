import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";

interface SimilarRequest {
  color: string;
  size: string;
}

interface Product {
  id: string;
  // add other known product fields here, e.g.:
  // name: string;
  // price: number;
  // colors: string[];
  // sizes: string[];
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  // 1. Ensure JSON
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Expected application/json content-type" },
      { status: 415 }
    );
  }

  // 2. Parse & validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("color" in body) ||
    !("size" in body)
  ) {
    return NextResponse.json(
      { error: 'Body must be an object with "color" and "size" fields' },
      { status: 400 }
    );
  }

  const { color, size } = body as SimilarRequest;
  if (
    typeof color !== "string" ||
    typeof size !== "string" ||
    !color.trim() ||
    !size.trim()
  ) {
    return NextResponse.json(
      { error: '"color" and "size" must be non-empty strings' },
      { status: 400 }
    );
  }

  try {
    // 3. Build query
    const productsRef = db.collection("Products");
    const query = productsRef
      .where("colors", "array-contains", color.trim())
      .where("sizes", "array-contains", size.trim());

    // 4. Fetch matching products
    const snapshot = await query.get();

    const products: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in POST /api/Similar:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
