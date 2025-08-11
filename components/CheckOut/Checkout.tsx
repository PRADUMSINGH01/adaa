"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/CartContext"; // Adjust path as needed
import { useRouter } from "next/navigation";
import logo from "@/app/(Images)/logo.png";
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
  // The 'config' property is no longer needed here
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

    // Ensure an address is selected before proceeding
    if (Address.length === 0) {
      alert("Please select a shipping address.");
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
        name: "Navaa.store",
        description: "Purchase Description",
        image: `${logo}`, // Make sure this path is correct in your public folder
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
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          contact: "", // You can prefill this if you have the user's phone number
        },
        theme: {
          color: "#E07A5F",
        },
        // REMOVED: The 'config' block that restricted payment to 'card' only.
        // Razorpay will now show all available payment methods by default.
      };

      const rzp = new window.Razorpay(options);
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
      // Corrected disabled logic: button is disabled if SDK is not ready OR if no address is selected.
      disabled={!sdkReady || Address.length === 0}
      className={`py-2 px-6 rounded-2xl shadow-md font-poppins transition-all w-full ${
        sdkReady && Address.length > 0
          ? "bg-[#E07A5F] hover:bg-[#D57A7A] text-[#F8F5F2]"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
    >
      {sdkReady ? `Pay ₹ ${price}` : "Loading..."}
    </button>
  );
};

export default RazorpayButton;
