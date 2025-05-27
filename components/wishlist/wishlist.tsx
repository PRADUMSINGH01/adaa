"use client";

import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/loading";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch("/api/GetUser"); // Changed to more appropriate endpoint
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlist(data.wishList); // Assuming API returns { wishlist: [...] }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load wishlist"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []); // Added empty dependency array

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral p-8 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-light rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiHeart className="text-3xl text-primary" />
            <h2 className="font-playfair text-3xl font-bold text-dark">
              My Wishlist
            </h2>
          </div>

          {wishlist.length === 0 ? (
            <p className="font-poppins text-secondary">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-poppins font-medium text-dark text-lg truncate">
                      {item.name}
                    </h3>
                    <p className="text-primary font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <button
                        onClick={() => console.log("Add to cart:", item.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-poppins text-sm transition-colors"
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
