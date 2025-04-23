// app/products/page.tsx
"use client";
import { useState } from "react";
import ProductFilters from "@/components/Filter/Filter";
import { FiGrid, FiList, FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { BsFillLightningFill } from "react-icons/bs";
import Image from "next/image";
import kurtiimg from "@/app/(Images)/kurti.png";

const products = Array(12).fill({
  id: Math.random().toString(36).substring(7), // Unique ID for each product
  name: "Minimal Cotton Kurta",
  price: 2499,
  sizes: ["S", "M", "L", "XL", "XXL"],
  originalPrice: 3299,
  colors: ["#E07A5F", "#D57A7A", "#8A9B6E"],
  fabric: "Cotton",
  isNew: true,
});

export default function ProductGrid() {
  const [isGridView, setIsGridView] = useState(true);

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
    // Implement your add to cart logic here
  };

  const handleBuyNow = (productId: string) => {
    console.log(`Buying product ${productId} now`);
    // Implement your buy now logic here
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Added product ${productId} to wishlist`);
    // Implement your add to wishlist logic here
  };

  const handleViewFullProduct = (productId: string) => {
    const productUrl = `/Kurti/${productId}`; // Construct the product URL
    window.open(productUrl, "_blank", "noopener,noreferrer");
  };

  const calculateDiscount = (originalPrice: number, price: number) => {
    if (originalPrice > price) {
      const discountPercentage = Math.round(
        ((originalPrice - price) / originalPrice) * 100
      );
      return `(${discountPercentage}% off)`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-7xl mx-auto px-4 py-8 flex md:gap-8">
        {/* Filters - Sticky on larger screens */}
        <div className="w-full md:w-64 z-20 sticky top-20 self-start">
          <ProductFilters />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="font-playfair text-3xl md:text-4xl font-light text-dark mb-2">
              Modern Ethnic Wear
            </h1>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 ${isGridView ? "text-primary" : "text-dark"}`}
              >
                <FiGrid className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 ${!isGridView ? "text-primary" : "text-dark"}`}
              >
                <FiList className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          <div
            className={`grid ${
              isGridView ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
            } gap-6`}
          >
            {products.map((product, index) => (
              <article
                key={index}
                className="group bg-light rounded-lg overflow-hidden relative hover:shadow-md transition-shadow"
              >
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => handleViewFullProduct(product.id)}
                >
                  <Image
                    src={kurtiimg.src}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs">
                      New
                    </div>
                  )}
                  {calculateDiscount(product.originalPrice, product.price) && (
                    <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs">
                      {calculateDiscount(product.originalPrice, product.price)}
                    </div>
                  )}
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleAddToWishlist(product.id)}
                      className="p-2 bg-light rounded-full text-dark hover:text-primary transition-colors"
                      aria-label="Add to Wishlist"
                    >
                      <FiHeart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleBuyNow(product.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-light rounded-full hover:bg-primary-dark transition-colors"
                    >
                      <BsFillLightningFill className="w-5 h-5" /> Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="p-2 bg-light rounded-full text-dark hover:text-primary transition-colors"
                      aria-label="Add to Cart"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleViewFullProduct(product.id)}
                      className="p-2 bg-light rounded-full text-dark hover:text-primary transition-colors"
                      aria-label="View Full Product"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-playfair text-lg font-normal text-dark truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3">
                    <span className="font-poppins text-secondary font-semibold">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="font-poppins text-gray-400 text-sm line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-poppins text-sm text-gray-600">
                      Sizes:
                    </span>
                    <div className="flex gap-1">
                      {product.sizes.map((size: string, i: number) => (
                        <span
                          key={i}
                          className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-200 rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-poppins text-sm text-gray-600">
                      Colors:
                    </span>
                    <div className="flex gap-1">
                      {product.colors.map((color: string, i: number) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 text-dark hover:text-primary transition-colors">
              ← Previous
            </button>
            <span className="px-4 py-2 text-gray-400">Page 1 of 4</span>
            <button className="px-4 py-2 text-dark hover:text-primary transition-colors">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
