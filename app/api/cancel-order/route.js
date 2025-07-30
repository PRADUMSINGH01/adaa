// app/api/update-tracking/route.js
import { db } from "@/server/firebase/firebase";
// app/api/update-tracking/route.js
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { email, orderId } = await req.json();
    console.log(email, orderId);
    if (!email || !orderId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const userRef = db.collection("Users").doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get current orders array
    const orders = userDoc.data().Orders || [];
    const orderIndex = orders.findIndex((order) => order.orderId === orderId);

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Create a copy of the specific order
    const updatedOrder = {
      ...orders[orderIndex],
      trackingStage: "cancelled",
      status: "cancelled",
    };

    // Create a new array with the updated order
    const updatedOrders = [...orders];
    updatedOrders[orderIndex] = updatedOrder;

    // Update the entire orders array
    await userRef.update({
      Orders: updatedOrders,
    });

    return NextResponse.json(
      { message: "Tracking ID updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tracking ID:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
