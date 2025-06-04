"use client";
import { useState, useEffect, useCallback } from "react";
import ProductFilters from "@/components/Filter/Filter";
import { FiGrid, FiList, FiHeart, FiEye } from "react-icons/fi";
import { BsFillLightningFill } from "react-icons/bs";

import { KurtiCarousel } from "../KurtiGrid/KurtiCaru";
//import { Product } from "@/server/types";
// Updated Product interface to match filter requirements
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice: number;
//   sizes: string[];
//   colors: { name: string; hex: string }[];
//   fabric: string;
//   isNew: boolean;
//   isTrending: boolean;
// }

// Generate products with varied properties
// const generateProducts = (): Product[] => {
//   const fabrics = ["Cotton", "Silk", "Linen", "Chiffon", "Georgette"];
//   const colors = [
//     { name: "Red", hex: "#E07A5F" },
//     { name: "Blue", hex: "#3D405B" },
//     { name: "Green", hex: "#8A9B6E" },
//     { name: "Pink", hex: "#D57A7A" },
//     { name: "Black", hex: "#4A4A48" },
//   ];

//   return Array.from({ length: 12 }, (_, i) => {
//     const fabric = fabrics[i % fabrics.length];
//     const productColors = [
//       colors[i % colors.length],
//       colors[(i + 2) % colors.length],
//     ];

//     return {
//       id: Math.random().toString(36).substring(2, 9),
//       name: `Minimal ${fabric} Kurta ${i + 1}`,
//       price: 2499 - (i % 5) * 100,
//       originalPrice: 3299,
//       sizes: ["S", "M", "L", "XL", "XXL"],
//       colors: productColors,
//       fabric,
//       isNew: i % 3 === 0,
//       isTrending: i % 4 === 0,
//     };
//   });
// };

export interface Product {
  id: string;
  rating: number;
  reviews: number;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  careInstructions?: string;
  fabric: string;
  shippingInfo?: string;
  returnPolicy?: string;
  details: string[];
  brand: string;
  category?: string;
  sku?: string;
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export default function ProductGrid({ params }: { params: string }) {
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [isTrending, setIsTrending] = useState(false);

  useEffect(() => {
    async function fetchKurti() {
      const response = await fetch("/api/fetchKurti");
      const products = await response.json();
      return setProducts(products);
    }
    fetchKurti();
  }, []);
  // Apply filters whenever filter states or products change
  useEffect(() => {
    // function deslugify(text: string) {
    //   return text.replace(/-/g, " ").toLowerCase();
    // }

    if (
      !priceRange &&
      selectedColors.length === 0 &&
      selectedFabrics.length === 0 &&
      !isNew &&
      !isTrending
    ) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      // Price filter
      if (priceRange && product.price > priceRange) return false;

      // Color filter
      if (
        selectedColors.length > 0 &&
        !product.colors.some((color) => selectedColors.includes(color))
      ) {
        return false;
      }

      // Fabric filter
      if (
        selectedFabrics.length > 0 &&
        !selectedFabrics.includes(product.fabric)
      ) {
        return false;
      }

      // New arrival filter
      if (isNew && !product.isNew) return false;

      // Trending filter
      if (isTrending && !product.isTrending) return false;

      return true;
    });

    setFilteredProducts(filtered);
  }, [
    products,
    priceRange,
    selectedColors,
    selectedFabrics,
    isNew,
    isTrending,
  ]);

  const handleBuyNow = (productId: string) => {
    console.log(`Buying product ${productId} now`);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Added product ${productId} to wishlist`);
  };

  const handleViewFullProduct = (productId: string) => {
    window.open(`/Kurti/${productId}`, "_blank", "noopener,noreferrer");
  };

  const calculateDiscount = (
    original: number,
    current: number
  ): string | null => {
    if (original > current) {
      return `(${Math.round(((original - current) / original) * 100)}% off)`;
    }
    return null;
  };

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setPriceRange(10000);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setIsNew(false);
    setIsTrending(false);
  }, []);

  return (
    <div className="min-h-screen bg-neutral">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Mobile Filters */}
        <div className="md:hidden">
          <ProductFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedFabrics={selectedFabrics}
            setSelectedFabrics={setSelectedFabrics}
            isNew={isNew}
            setIsNew={setIsNew}
            isTrending={isTrending}
            setIsTrending={setIsTrending}
            clearAllFilters={clearAllFilters}
          />
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-full md:w-64 sticky top-20 self-start">
          <ProductFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedFabrics={selectedFabrics}
            setSelectedFabrics={setSelectedFabrics}
            isNew={isNew}
            setIsNew={setIsNew}
            isTrending={isTrending}
            setIsTrending={setIsTrending}
            clearAllFilters={clearAllFilters}
          />
        </aside>

        {/* Products Section */}
        <section className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-light text-dark mb-4 sm:mb-0">
              {params}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded transition-shadow ${
                  isGridView ? "bg-primary text-white" : "bg-light text-dark"
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded transition-shadow ${
                  !isGridView ? "bg-primary text-white" : "bg-light text-dark"
                }`}
                aria-label="List view"
              >
                <FiList className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Product Listing */}
          <div
            className={`grid gap-6 ${
              isGridView
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group bg-light rounded-lg overflow-hidden relative hover:shadow-lg transition-shadow"
              >
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => handleViewFullProduct(product.id)}
                >
                  <KurtiCarousel images={product.images}></KurtiCarousel>
                  {product.isNew && (
                    <span className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded-full text-xs">
                      New
                    </span>
                  )}
                  {calculateDiscount(product.originalPrice, product.price) && (
                    <span className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded-full text-xs">
                      {calculateDiscount(product.originalPrice, product.price)}
                    </span>
                  )}
                  <div className="absolute inset-0  bg-black bg-opacity-30 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product.id);
                      }}
                      className="p-2 bg-white rounded-full text-dark hover:text-primary transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <FiHeart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product.id);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-sm"
                    >
                      <BsFillLightningFill className="w-4 h-4" /> Buy Now
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewFullProduct(product.id);
                      }}
                      className="p-2 bg-white rounded-full text-dark hover:text-primary transition-colors"
                      aria-label="View product"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-playfair text-base md:text-lg font-semibold text-dark truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-poppins text-secondary font-bold">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="font-poppins text-gray-400 text-sm line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Sizes:</span>
                    <div className="flex gap-1 flex-wrap">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-2 py-0.5 bg-gray-200 rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Colors:</span>
                    <div className="flex gap-1">
                      {product.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Fabric: {product.fabric}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="px-4 py-2 bg-light rounded hover:bg-light/80 transition">
              ← Previous
            </button>
            <span className="text-gray-500">Page 1 of 4</span>
            <button className="px-4 py-2 bg-light rounded hover:bg-light/80 transition">
              Next →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
