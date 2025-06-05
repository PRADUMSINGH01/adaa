// app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      return NextResponse.json({ message: "Payment verified successfully" });
    } else {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid signature, payment verification failed",
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error verifying payment" }),
      { status: 500 }
    );
  }
}
