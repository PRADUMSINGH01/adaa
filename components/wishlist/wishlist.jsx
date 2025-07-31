"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiHeart, FiTrash2, FiLoader, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import Loading from "@/app/loading";
import { useUserData } from "@/components/Context/UserContext";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserWishlist = () => {
  const router = useRouter();
  const { userData, loading } = useUserData();
  const [wishlist, setWishlist] = useState([]);
  const [isProcessing, setIsProcessing] = useState({});
  const [notification, setNotification] = useState(null);
  const { data: session } = useSession();

  const userId = session?.user.email;

  useEffect(() => {
    if (!loading && userData?.wishlist) {
      setWishlist(userData.wishlist);
    }
  }, [userData, loading]);

  useEffect(() => {
    const onWishlistUpdate = () => {
      router.refresh();
    };
    window.addEventListener("wishlistUpdated", onWishlistUpdate);
    return () => {
      window.removeEventListener("wishlistUpdated", onWishlistUpdate);
    };
  }, [router]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemove = async (id, userId) => {
    setIsProcessing({ [id]: "removing" });
    try {
      await fetch("/api/RemoveFromwishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          userId: userId,
        }),
      });
    } catch (err) {
      showNotification("error", "Failed to remove item");
    } finally {
      setIsProcessing({});
    }
  };

  const handleMoveToCart = async (id) => {
    setIsProcessing({ [id]: "moving" });
    try {
      await new Promise((res) => setTimeout(res, 800));
      showNotification("success", "Item moved to cart");
      // In real app, we would call API to move item to cart
    } catch (err) {
      showNotification("error", "Failed to move to cart");
    } finally {
      setIsProcessing({});
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-[#F8F5F2] py-4 sm:py-8 px-4 font-poppins">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-start space-x-3 ${
            notification.type === "success"
              ? "bg-[#8A9B6E] border-l-4 border-[#6E7F58]"
              : "bg-[#D57A7A] border-l-4 border-[#B85C5C]"
          }`}
          style={{
            minWidth: "300px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            animation: "slideIn 0.3s ease-out, fadeOut 0.5s ease 2.5s forwards",
          }}
        >
          <div
            className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${
              notification.type === "success"
                ? "bg-[#6E7F58] text-white"
                : "bg-[#B85C5C] text-white"
            }`}
          >
            {notification.type === "success" ? (
              <FiHeart className="h-5 w-5" />
            ) : (
              <FiTrash2 className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-white text-base">
              {notification.type === "success" ? "Success!" : "Notice"}
            </p>
            <p className="mt-1 text-[#F5F0E6] text-sm">
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-[#F5F0E6] hover:text-white transition-colors"
            aria-label="Close notification"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="flex items-center gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm">
          <div className="bg-[#E07A5F]/10 p-2 rounded-full">
            <FiHeart className="text-2xl text-[#E07A5F]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#4A4A48] font-playfair">
              My Wishlist
            </h1>
            <p className="text-[#4A4A48]/70 text-sm">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </p>
          </div>
        </header>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
            <div className="bg-[#F5F0E6] p-6 rounded-full mb-6">
              <FiHeart className="text-4xl text-[#E07A5F]" />
            </div>
            <h2 className="text-lg font-medium text-[#4A4A48] mb-2 font-playfair">
              Your wishlist is empty
            </h2>
            <p className="text-[#4A4A48]/60 text-center mb-6 max-w-md">
              Start saving your favorite items to see them all in one place
            </p>
            <Link href="/products">
              <button className="bg-[#E07A5F] hover:bg-[#C86A50] text-white px-5 py-2.5 rounded-lg transition font-medium">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-[#4A4A48]/10 overflow-hidden flex flex-col transition-all hover:shadow-md"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Link href={`/Kurti/${item.Slug}`}>
                    <Image
                      src={item.images[0] || "/placeholder-image.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>
                  {item.inStock === false && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-[#F5F0E6] px-2 py-1 rounded text-xs font-medium text-[#4A4A48]">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {item.discountPrice && (
                    <span className="absolute top-3 left-3 bg-[#E07A5F] text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round(
                        ((item.price - item.discountPrice) / item.price) * 100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <p className="text-xs text-[#4A4A48]/60 mb-1">
                      SKU: {item.sku}
                    </p>
                    <Link href={`/products/${item.sku}`}>
                      <h3 className="font-medium text-[#4A4A48] line-clamp-2 hover:text-[#E07A5F] transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      {item.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-[#4A4A48]">
                            ₹{item.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-[#4A4A48]/60 line-through text-sm">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-[#4A4A48]">
                          ₹{item.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(item.id, userId);
                        }}
                        disabled={isProcessing[item.id]}
                        className={`p-3 rounded-lg transition flex-1 flex items-center justify-center ${
                          isProcessing[item.id] === "removing"
                            ? "bg-[#F5F0E6] text-[#E07A5F]"
                            : "bg-[#F5F0E6] hover:bg-[#D57A7A] text-[#4A4A48] hover:text-white"
                        }`}
                        aria-label="Remove item"
                      >
                        {isProcessing[item.id] === "removing" ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiTrash2 className="text-sm sm:text-base" />
                        )}
                        <span className="ml-2 text-xs hidden sm:inline">
                          Remove
                        </span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleMoveToCart(item.id);
                        }}
                        disabled={isProcessing[item.id] || !item.inStock}
                        className={`p-3 rounded-lg transition flex-1 flex items-center justify-center ${
                          isProcessing[item.id] === "moving"
                            ? "bg-[#F5F0E6] text-[#8A9B6E]"
                            : item.inStock
                            ? "bg-[#F5F0E6] hover:bg-[#8A9B6E] text-[#4A4A48] hover:text-white"
                            : "bg-[#F5F0E6] text-[#4A4A48]/30 cursor-not-allowed"
                        }`}
                        aria-label="Move to cart"
                      >
                        {isProcessing[item.id] === "moving" ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiShoppingCart className="text-sm sm:text-base" />
                        )}
                        <span className="ml-2 text-xs hidden sm:inline">
                          {item.inStock ? "Move to Cart" : "Unavailable"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default UserWishlist;
