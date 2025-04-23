// app/api/products/route.ts
import { db } from "@/server/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { NextResponse } from "next/server";

const PAGE_SIZE = 10;

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: Date;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lastId = searchParams.get("lastId");
  const category = searchParams.get("category");

  try {
    let q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (lastId) {
      const lastDoc = await getDoc(doc(db, "products", lastId));
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const products: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    return NextResponse.json({
      products,
      lastId: products.length > 0 ? products[products.length - 1].id : null,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
