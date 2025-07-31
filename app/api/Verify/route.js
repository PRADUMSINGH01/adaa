// /app/api/verifypayment/route.js

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification details" },
        { status: 400 }
      );
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return NextResponse.json(
        {
          status: "success",
          message: "Payment verified successfully.",
          paymentId: razorpay_payment_id,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: "failure",
          message: "Payment verification failed. Signature mismatch.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
