"use client";

import React, { useEffect, useState } from "react";

interface RazorpayButtonProps {
  price: number;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay?: {
      new (options: any): { open: () => void };
    };
  }
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ price }) => {
  const [sdkReady, setSdkReady] = useState(false);

  // Load Razorpay checkout script
  useEffect(() => {
    if (window.Razorpay) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setSdkReady(true);
    script.onerror = () => console.error("Razorpay SDK failed to load.");
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!sdkReady || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your connection.");
      return;
    }

    try {
      // 1. Create order on server
      const res = await fetch("/api/Payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price}),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const orderData = await res.json();

      // 2. Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Your Company Name",
        description: "Purchase Description",
        image: "/logo.png",
        order_id: orderData.id,
        handler: async (response: RazorpayResponse) => {
          // 3. Verify on server
          const verifyRes = await fetch("/api/Verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if(verifyData.success){
            const AddNewOrder = await fetch('/api/add-order',{
              method :"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({userId:"hs947518@gmail.com", amount:500, trackingId:"Your_Tracking_Id"})
            })
          }
          alert(verifyData.message || "Payment successful!");
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#E07A5F",
        },
        // Only show card payments
        config: {
          display: {
            blocks: {
              card: {
                name: "Card Payments",
                instruments: [{ method: "card" }],
              },
            },
            sequence: ["card"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      };

      // 4. Open checkout
      const rzp = new (window.Razorpay as any)(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      alert(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!sdkReady}
      className={`py-2 px-6 rounded-2xl shadow-md font-poppins transition-all ${
        sdkReady
          ? "bg-[#E07A5F] hover:bg-[#D57A7A] text-[#F8F5F2]"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
    >
      {sdkReady ? `Pay ₹${price}` : "Loading..."}
    </button>
  );
};

export default RazorpayButton;
