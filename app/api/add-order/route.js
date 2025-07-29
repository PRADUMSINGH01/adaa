// app/api/add-order/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";

function generateSecureCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, cart, Address } = body;

    // Create a new order object for each item in the cart
    const newOrders = cart.map((item) => ({
      orderId: db.collection("Orders").doc().id, // Generate a unique ID
      ProductName: item.name,
      price: item.price, // Standardized to lowercase 'p'
      ProductImage:
        item.images[0] || "https://placehold.co/64x80/e2e8f0/e2e8f0?text=.", // Add a placeholder
      orderDate: new Date().toISOString(),
      status: "processing", // Initial status of the order
      trackingStage: "processing", // Initial tracking stage
      secureCode: generateSecureCode(),
      shippingAddress: Address, // Attach the shipping address to the order
    }));

    // Get a reference to the user's document
    const userDocRef = db.collection("Users").doc(userId);
    await userDocRef.update({
      Orders: getFirestore().FieldValue.arrayUnion(...newOrders),
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
