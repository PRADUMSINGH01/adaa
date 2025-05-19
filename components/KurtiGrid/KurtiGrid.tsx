"use client";

import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi"; // Added FiEye for Quick View
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import kurtii from "@/app/(Images)/party.png"; // Assuming this path is correct

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

export default function KurtiGrid() {
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

  const handleAddToCart = (id: number) => console.log(`Add to cart: ${id}`);
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
      className="py-16 bg-gradient-to-br from-[#FDF6E9] to-[#F5F0E6] min-h-screen" // Softer gradient background
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-playfair font-bold"
            style={{ color: "#6D5D4B" }}
          >
            Discover Your Next Statement Piece
          </h2>
          <p className="mt-3 text-lg font-poppins" style={{ color: "#8B796A" }}>
            Handpicked kurtis for the modern woman who values elegance and
            comfort.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {kurtis.map((kurti) => (
            <article
              key={kurti.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4.2] overflow-hidden">
                {" "}
                {/* Slightly taller aspect ratio */}
                <Image
                  src={kurti.image}
                  alt={kurti.name}
                  width={600}
                  height={850} // Adjusted height for new aspect ratio
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {/* Badges - More stylized */}
                <div className="absolute top-3 right-0 flex flex-col gap-2 items-end">
                  {kurti.isNew && (
                    <span
                      className="px-4 py-1.5 text-xs font-poppins font-semibold tracking-wider uppercase shadow-md"
                      style={{
                        backgroundColor: "#A0D2DB", // Soft Teal
                        color: "#2A3D45", // Darker Teal for text
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%)", // Angled edge
                      }}
                    >
                      New
                    </span>
                  )}
                  {kurti.onSale && (
                    <span
                      className="px-4 py-1.5 text-xs font-poppins font-semibold tracking-wider uppercase shadow-md"
                      style={{
                        backgroundColor: "#E5989B", // Soft Coral
                        color: "#5E3C3D", // Darker Coral for text
                        clipPath:
                          "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)", // Another angled edge
                      }}
                    >
                      Sale
                    </span>
                  )}
                </div>
                {/* Quick View Teaser - Appears on hover over image area */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out cursor-pointer"
                  onClick={() => handleQuickView(kurti.id)}
                >
                  <FiEye className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-2 text-center">
                {kurti.brand && (
                  <p
                    className="font-poppins text-xs uppercase tracking-wider"
                    style={{ color: "#B0A89D" }}
                  >
                    {kurti.brand}
                  </p>
                )}
                <h3
                  className="font-playfair text-lg font-bold leading-tight" // Slightly smaller for balance
                  style={{ color: "#4A4A48" }}
                >
                  {kurti.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <p
                    className="font-poppins text-xl font-semibold" // Bolder price
                    style={{ color: "#D57A7A" }} // Warm, inviting price color
                  >
                    {kurti.price}
                  </p>
                  {kurti.onSale && kurti.originalPrice && (
                    <p
                      className="font-poppins text-sm line-through"
                      style={{ color: "#A0A0A0" }}
                    >
                      {kurti.originalPrice}
                    </p>
                  )}
                </div>
                {renderStars(kurti.rating)}
                {kurti.colorsAvailable && kurti.colorsAvailable.length > 0 && (
                  <div className="pt-1 flex justify-center space-x-1.5">
                    {kurti.colorsAvailable.slice(0, 3).map(
                      (
                        color // Show max 3 colors
                      ) => (
                        <span
                          key={color}
                          title={color}
                          className="block w-3 h-3 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: color
                              .toLowerCase()
                              .replace(/\s+/g, ""),
                          }}
                        ></span>
                      )
                    )}
                    {kurti.colorsAvailable.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{kurti.colorsAvailable.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons - Revealed on card hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-white/70 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(kurti.id)}
                    className="flex items-center justify-center flex-1 gap-2 px-4 py-3 rounded-lg font-poppins font-medium text-sm transition-all duration-300 ease-in-out group/btn"
                    style={{
                      backgroundColor: "#E07A5F", // Main action color
                      color: "#F8F5F2",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#D57A7A")
                    } // Darker on hover
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#E07A5F")
                    }
                  >
                    <FiShoppingCart className="text-lg transform transition-transform duration-300 group-hover/btn:scale-110" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlist(kurti.id)}
                    className="p-3 rounded-lg border transition-all duration-300 ease-in-out group/btn"
                    style={{
                      borderColor: "#B0A89D", // Softer border
                      color: "#6D5D4B", // Darker text for contrast
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#6D5D4B";
                      e.currentTarget.style.color = "#F8F5F2";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#6D5D4B";
                    }}
                  >
                    <FiHeart className="text-lg transform transition-transform duration-300 group-hover/btn:scale-110" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
