// app/api/add-order/route.js
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase"; // your Admin SDK init
import { FieldValue } from "firebase-admin/firestore";

// helper to generate a 4‑digit secure code
function generateSecureCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function POST(request) {
  try {
    // parse the incoming JSON body
    const { cart, Address } = await request.json();

    const userId = "hs947518@gmail.com";
    if (!userId || !Array.isArray(cart) || !Address) {
      return NextResponse.json(
        { error: "Missing userId, cart array, or Address" },
        { status: 400 }
      );
    }

    // build the new orders array
    const newOrders = cart.map((item) => ({
      orderId: db.collection("Orders").doc().id,
      productName: item.name,
      price: item.price,
      productImage:
        item.image || "https://placehold.co/64x80/e2e8f0/e2e8f0?text=No+Image",
      orderDate: new Date().toISOString(),
      status: "processing",
      trackingStage: "processing",
      secureCode: generateSecureCode(),
      shippingAddress: Address,
    }));

    // get a reference to the user's document
    const userDocRef = db.collection("Users").doc(userId);

    // atomically append the new orders onto the Orders array
    await userDocRef.update({
      Orders: FieldValue.arrayUnion(...newOrders),
    });

    return NextResponse.json(
      { success: true, message: "Orders added successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in add-order route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
