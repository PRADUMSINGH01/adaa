// /app/api/payment/route.js

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay instance with your keys.
// It's important to do this outside of the handler function
// so it's not re-created on every request.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Handles POST requests to /api/payment
export async function POST(request) {
  try {
    // The request body needs to be awaited and parsed as JSON.
    const { amount, currency = "INR" } = await request.json();

    if (!amount) {
      // Use NextResponse to send a JSON response with a 400 status.
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }

    // Razorpay expects the amount in the smallest currency unit.
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    // Create the order
    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }

    // Return the order details to the frontend.
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
