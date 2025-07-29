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

    // Validate the incoming request body
    if (!userId) {
      return NextResponse.json(
        {
          error:
            "Invalid request body. userId, cart, and Address are required.",
        },
        { status: 400 }
      );
    }

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
    const userDocRef = db.collection("Users").doc("hs947518@gmail.com");

    // Atomically add the new order objects to the 'Orders' array
    // The FieldValue.arrayUnion can take multiple arguments
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
