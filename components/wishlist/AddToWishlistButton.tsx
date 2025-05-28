// components/WishlistAlert.tsx
"use client";

import { useEffect } from "react";

type AlertType = "success" | "error";

interface WishlistAlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
}
export function WishlistAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed right-4 top-4 z-50 p-4 rounded-md shadow-lg ${
        type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {type === "success" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
        <span className="font-medium">{message}</span>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// components/AddToWishlistButton.tsx
("use client");

import { useState } from "react";

export function AddToWishlistButton({ product }: { product: any }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to add to wishlist");

      setAlertMessage(`${product.name} added to wishlist!`);
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage("Failed to add to wishlist");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>

      {showAlert && (
        <WishlistAlert
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}
