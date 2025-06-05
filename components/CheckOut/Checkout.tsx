"use client";

import React, { useEffect } from "react";

// Define Razorpay types to avoid using 'any'
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const RazorpayButton = () => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const res = await fetch("/api/Payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 }),
    });

    const data = await res.json();

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: data.amount,
      currency: "INR",
      name: "Your Company",
      description: "Test Transaction",
      image: "/logo.png",
      order_id: data.id,
      handler: async function (response: RazorpayResponse) {
        const verifyRes = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const verifyData = await verifyRes.json();
        alert(verifyData.message);
      },
      theme: {
        color: "#E07A5F",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-[#E07A5F] hover:bg-[#D57A7A] text-[#F8F5F2] font-poppins py-2 px-6 rounded-2xl shadow-md transition-all"
    >
      Pay ₹500
    </button>
  );
};

export default RazorpayButton;
