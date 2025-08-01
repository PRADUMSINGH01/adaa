"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/CartContext"; // Adjust path as needed
import { useRouter } from "next/navigation";
interface RazorpayButtonProps {
  price: number;
  Address: string[];
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  theme?: {
    color: string;
  };
  config?: {
    display: {
      blocks: {
        card: {
          name: string;
          instruments: { method: string }[];
        };
      };
      sequence: string[];
      preferences: {
        show_default_blocks: boolean;
      };
    };
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ price, Address }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();

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
      // 1. Create order
      const res = await fetch("/api/Payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price }),
      });

      if (!res.ok) throw new Error("Failed to create Razorpay order");
      const orderData = await res.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Your Company Name",
        description: "Purchase Description",
        image: "/logo.png",
        order_id: orderData.id,
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await fetch("/api/Verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.status === "success") {
            // Save order to DB
            const res = await fetch("/api/add-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: session?.user.email,
                cart,
                Address,
              }),
            });
            if (res.status === 200) {
              clearCart();
              router.push("/Order_Completed");
            }
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#E07A5F",
        },
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

      const rzp = new window.Razorpay!(options);
      rzp.open();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Payment error:", err.message);
        alert(err.message);
      } else {
        console.error("Unknown error:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!sdkReady && Address.length === 0}
      className={`py-2 px-6 rounded-2xl shadow-md font-poppins transition-all w-full ${
        sdkReady
          ? "bg-[#E07A5F] hover:bg-[#D57A7A] text-[#F8F5F2]"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
    >
      {sdkReady ? `Pay ₹ ${price}` : "Loading..."}
    </button>
  );
};

export default RazorpayButton;
