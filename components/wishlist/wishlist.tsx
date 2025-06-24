"use client";

import React, { useEffect, useState } from "react";
import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import Loading from "@/app/loading";
import { useUserData } from "@/components/Context/UserContext";

// Define an interface for a wishlist item. Adjust fields as per your data model.
interface WishlistItem {
  id: string;
  images: string[]; // array of image URLs
  name: string;
  price: string;
  // ... any other fields
}

const UserWishlist: React.FC = () => {
  // Assume useUserData returns an object like:
  // { userData: { wishlist: WishlistItem[]; ... }, loading: boolean, refreshUserData: () => Promise<void> }
  // If your context also provides methods like removeFromWishlist or addToCart, you can destructure them here.
  const { userData, loading } = useUserData();

  // Local state for optimistic updates
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  // isProcessing holds an item ID that is currently being removed or added to cart, for disabling buttons

  // Initialize local wishlist once userData is loaded
  useEffect(() => {
    if (!loading && userData?.wishlist) {
      setWishlist(userData?.wishlist);
    }
  }, [loading, userData]);

  // Function to remove an item from wishlist
  const handleRemoveItem = async (id: string) => {
    // Prevent duplicate requests
    if (isProcessing === id) return;
    setIsProcessing(id);

    // Optimistic UI: remove from local state immediately
    const prevWishlist = wishlist;
    setWishlist(prevWishlist.filter((item) => item.id !== id));

    try {
      // Call your API to remove from wishlist
      // Adjust the endpoint and method as per your backend
      const res = await fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to remove item with id ${id}`);
      }

      // Optionally: show success feedback, e.g. toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      // Revert UI on failure
      setWishlist(prevWishlist);
      // Optionally: show error feedback, e.g. toast.error("Could not remove item. Please try again.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Function to add an item to cart
  const handleAddToCart = async (item: WishlistItem) => {
    const id = item.id;
    if (isProcessing === id) return;
    setIsProcessing(id);

    try {
      // Call your API to add to cart
      const res = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: id, quantity: 1 }),
      });
      if (!res.ok) {
        throw new Error(`Failed to add item ${id} to cart`);
      }
      // Optionally: after adding to cart, remove from wishlist?
      // If you want to remove from wishlist once added to cart, call handleRemoveItem here:
      // await handleRemoveItem(id);
      // Optionally: show success feedback, e.g. toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optionally: show error feedback, e.g. toast.error("Could not add to cart. Please try again.");
    } finally {
      setIsProcessing(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-neutral p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-light rounded-2xl shadow-xl overflow-hidden">
        <header className="flex items-center gap-3 px-6 py-4 border-b border-neutral">
          <FiHeart className="text-4xl text-primary" />
          <h1 className="font-playfair text-4xl font-bold text-dark">
            My Wishlist
          </h1>
        </header>
        <div className="p-6">
          {!wishlist || wishlist.length === 0 ? (
            <p className="font-poppins text-secondary text-center">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between h-52">
                    <div>
                      <h2 className="font-poppins font-semibold text-lg text-dark truncate">
                        {item.name}
                      </h2>
                      <p className="mt-2 font-playfair text-xl text-primary">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-4">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        disabled={isProcessing === item.id}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-poppins transition ${
                          isProcessing === item.id
                            ? "bg-primary/50 text-white cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove item"
                        disabled={isProcessing === item.id}
                        className={`p-2 rounded-lg transition ${
                          isProcessing === item.id
                            ? "bg-red-100 text-red-400 cursor-not-allowed"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserWishlist;
