// app/api/payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt } = body;

    const generatedReceipt = receipt || crypto.randomBytes(8).toString("hex");

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: generatedReceipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      receipt: generatedReceipt,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to create Razorpay order" }),
      { status: 500 }
    );
  }
}
