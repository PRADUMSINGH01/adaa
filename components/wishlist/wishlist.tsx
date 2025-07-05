"use client";

import React, { useEffect, useState } from "react";
import { FiHeart, FiTrash2, FiLoader } from "react-icons/fi";
import Image from "next/image";
import Loading from "@/app/loading";
import { useUserData } from "@/components/Context/UserContext";
import Link from "next/link";

interface WishlistItem {
  id: string;
  images: string[];
  name: string;
  price: string;
  discountPrice?: string;
  inStock?: boolean;
}

const UserWishlist: React.FC = () => {
  const { userData, loading } = useUserData();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!loading && userData?.wishlist) {
      setWishlist(userData.wishlist);
    }
  }, [userData, loading]);

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemove = (id: string) => {
    setIsProcessing(id);
    // Simulate API call
    setTimeout(() => {
      setWishlist(wishlist.filter((item) => item.id !== id));
      showNotification("success", "Item removed from wishlist");
      setIsProcessing(null);
    }, 800);
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
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
                <Link
                  href={`/products/${item.id}`}
                  className="flex flex-col h-full"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {item.inStock === false && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="bg-[#F5F0E6] px-2 py-1 rounded text-xs font-medium text-[#4A4A48]">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {item.discountPrice && (
                      <span className="absolute top-3 left-3 bg-[#E07A5F] text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-medium text-[#4A4A48] line-clamp-2 mb-2 text-sm sm:text-base">
                      {item.name}
                    </h3>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base sm:text-lg font-bold text-[#4A4A48]">
                          ₹{item.price}
                        </span>
                        {item.discountPrice && (
                          <span className="text-[#4A4A48]/60 line-through text-sm">
                            ₹{item.discountPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemove(item.id);
                          }}
                          disabled={isProcessing === item.id}
                          className={`p-2 sm:p-3 rounded-lg transition ${
                            isProcessing === item.id
                              ? "bg-[#F5F0E6] text-[#E07A5F] cursor-not-allowed"
                              : "bg-[#F5F0E6] hover:bg-[#E07A5F] text-[#4A4A48] hover:text-white"
                          }`}
                          aria-label="Remove item"
                        >
                          {isProcessing === item.id ? (
                            <FiLoader className="animate-spin" />
                          ) : (
                            <FiTrash2 className="text-sm sm:text-base" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
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

        @media (max-width: 640px) {
          .text-sm-responsive {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }

          .px-4-responsive {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default UserWishlist;
