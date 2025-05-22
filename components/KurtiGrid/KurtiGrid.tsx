"use client";

import { FiHeart, FiEye } from "react-icons/fi"; // Added FiEye for Quick View
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import kurtii from "@/app/(Images)/party.png"; // Assuming this path is correct

export default function KurtiGrid() {
  type Kurti = {
    id: number;
    name: string;
    price: string;
    originalPrice?: string; // For showing a slash-through price on sale items
    image: StaticImageData | string; // Allow string for external URLs too if needed
    isNew?: boolean;
    onSale?: boolean;
    brand?: string; // Added brand for more detail
    rating?: number; // Added rating
    colorsAvailable?: string[]; // Example: ['Red', 'Blue', 'Green']
  };

  const [kurtis] = useState<Kurti[]>([
    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtii,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["Pastel Pink", "Mint Green"],
    },
    {
      id: 2,
      name: "Midnight Bloom Silk Kurti",
      brand: "Luxe Threads",
      price: "₹1,799",
      originalPrice: "₹2,199",
      image: kurtii,
      onSale: true,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Bohemian Rhapsody Cotton Kurti",
      brand: "Free Spirit",
      price: "₹1,299",
      image: kurtii,
      rating: 4.2,
      colorsAvailable: ["Terracotta", "Olive"],
    },
    {
      id: 4,
      name: "Moonlit Chikankari Kurti",
      brand: "Heirloom Craft",
      price: "₹1,899",
      image: kurtii,
      isNew: true,
      rating: 4.7,
    },
    {
      id: 5,
      name: "Geometric Goddess Kurti",
      brand: "Modern Muse",
      price: "₹1,349",
      image: kurtii,
      rating: 4.0,
    },
    {
      id: 6,
      name: "Sunset Tie-Dye Kurti",
      brand: "Boho Chic",
      price: "₹1,599",
      originalPrice: "₹1,899",
      image: kurtii,
      onSale: true,
      rating: 4.6,
      colorsAvailable: ["Coral Blush", "Lavender Sky"],
    },
    {
      id: 7,
      name: "Paisley Dream A-Line Kurti",
      brand: "Ethnic Echoes",
      price: "₹1,699",
      image: kurtii,
      rating: 4.3,
    },
    {
      id: 8,
      name: "Jaipur Garden Block Print Kurti",
      brand: "Artisanal Weaves",
      price: "₹1,399",
      image: kurtii,
      isNew: true,
      rating: 4.9,
      colorsAvailable: ["Indigo", "Marigold"],
    },
  ]);

  // const handleAddToCart = (id: number) => console.log(`Add to cart: ${id}`);
  const handleWishlist = (id: number) => console.log(`Wishlist: ${id}`);
  const handleQuickView = (id: number) => console.log(`Quick view: ${id}`);

  // Helper to render stars
  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {halfStar && (
          <svg
            key="half"
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545zM10 12.4V0L7.539 4.955l-5.472.795 3.956 3.855-.933 5.445L10 12.4z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-500">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen bg-neutral"
      style={{ backgroundColor: "#F5F0E6" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Minimal Header */}
        <div className="mb-16 text-center">
          <h2 className="font-playfair text-4xl font-medium text-dark mb-2">
            Modern Kurti Collection
          </h2>
          <p className="font-poppins text-lg text-secondary max-w-xl mx-auto">
            Contemporary designs meeting traditional craftsmanship
          </p>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {kurtis.map((kurti) => (
            <article
              key={kurti.id}
              className="group relative overflow-hidden bg-light rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] top-3">
                <Image
                  src={kurti.image}
                  alt={kurti.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-103"
                />

                {/* Status Badges */}
                <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                  {kurti.isNew && (
                    <span className="font-poppins px-3 py-1 text-xs uppercase tracking-wide bg-primary text-light rounded-full">
                      New
                    </span>
                  )}
                  {kurti.onSale && (
                    <span className="font-poppins px-3 py-1 text-xs uppercase tracking-wide bg-secondary text-light rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Color Swatches */}
                {kurti.colorsAvailable && (
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {kurti.colorsAvailable.map((color) => (
                      <div
                        key={color}
                        className="relative h-6 w-6 rounded-full border-2 border-light shadow-md transition-transform hover:scale-110"
                        style={{ backgroundColor: color.toLowerCase() }}
                      >
                        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-poppins text-xs bg-dark text-light px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleWishlist(kurti.id)}
                    className="p-2 bg-light/80 backdrop-blur-sm rounded-full hover:bg-accent transition-colors"
                  >
                    <FiHeart className="h-5 w-5 text-dark hover:text-light" />
                  </button>
                  <button
                    onClick={() => handleQuickView(kurti.id)}
                    className="p-2 bg-light/80 backdrop-blur-sm rounded-full hover:bg-accent transition-colors"
                  >
                    <FiEye className="h-5 w-5 text-dark hover:text-light" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-playfair text-xl font-medium text-dark mb-1">
                    {kurti.name}
                  </h3>
                  {kurti.brand && (
                    <p className="font-poppins text-sm text-secondary uppercase tracking-wide">
                      {kurti.brand}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-poppins text-xl font-semibold text-primary">
                      {kurti.price}
                    </span>
                    {kurti.originalPrice && (
                      <span className="font-poppins text-sm text-secondary line-through">
                        {kurti.originalPrice}
                      </span>
                    )}
                  </div>
                  {renderStars(kurti.rating)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// // Enhanced Star Rating Component
// const renderStars = (rating?: number) => {
//   if (!rating) return null;
//   return (
//     <div className="flex items-center gap-1">
//       {[...Array(5)].map((_, i) => (
//         <svg
//           key={i}
//           className={`w-4 h-4 ${
//             i < rating ? "text-accent" : "text-secondary/30"
//           }`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ))}
//     </div>
//   );
// };
