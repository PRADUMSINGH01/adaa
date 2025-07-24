// app/api/add-order/route.ts
import { NextRequest, NextResponse } from "next/server";
 import { db } from "@/server/firebase/firebase";
interface AddOrderBody {
  userId: string;
  amount: number;
  trackingId: string;
}

// Generates a random four‑digit string, e.g. "0827"
function generateSecureCode(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function POST(request: NextRequest) {
  try {
    const body: AddOrderBody = await request.json();
    const { userId, amount, trackingId } = body;

    if (!userId || typeof amount !== "number" || !trackingId) {
      return NextResponse.json(
        { error: "userId, amount (number), and trackingId are required" },
        { status: 400 }
      );
    }

    // Build the new order object
    const newOrder = {
      orderId: db.collection("_").doc().id,      // auto‑generated ID
      amount,
      trackingId,
      secureCode: generateSecureCode(),
      placedAt: admin.firestore.Timestamp.now(),
    };

    // Append to the 'orders' array
    await db.collection("Users")
      .doc(userId)
      .update({
        orders: admin.firestore.FieldValue.arrayUnion(newOrder),
      });

    return NextResponse.json({ success: true, order: newOrder }, { status: 200 });
  } catch (err: any) {
    console.error("Error in add-order route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
