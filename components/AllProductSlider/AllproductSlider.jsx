"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";

const ProductSlider = ({
  title = "Featured Collection",
  products = [],
  showRating = true,
  showWishlist = true,
  autoPlay = false,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [favorites, setFavorites] = useState(new Set());
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Configuration
  const CONFIG = {
    AUTO_PLAY_INTERVAL: 5000,
    SWIPE_THRESHOLD: 50,
    TRANSITION_DURATION: 500,
    BREAKPOINTS: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      large: 4,
    },
  };

  // Theme colors
  const colors = {
    primary: "#E07A5F",
    secondary: "#D57A7A",
    accent: "#8A9B6E",
    neutral: "#F5F0E6",
    dark: "#4A4A48",
    light: "#F8F5F2",
  };

  // Enhanced dummy product data
  const dummyProducts = [
    {
      id: 1,
      name: "Elegant Floral Kurti",
      price: 1299,
      originalPrice: 1899,
      discount: 32,
      image: "/api/placeholder/350/450",
      rating: 4.8,
      reviews: 128,
      category: "Traditional",
      colors: [colors.primary, colors.secondary, colors.accent],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      isBestSeller: false,
      fabric: "Cotton Silk",
    },
    {
      id: 2,
      name: "Designer Block Print",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      image: "/api/placeholder/350/450",
      rating: 4.6,
      reviews: 89,
      category: "Casual",
      colors: [colors.accent, colors.dark, colors.primary],
      sizes: ["XS", "S", "M", "L"],
      isNew: false,
      isBestSeller: true,
      fabric: "Pure Cotton",
    },
    {
      id: 3,
      name: "Minimalist Cotton Kurti",
      price: 699,
      originalPrice: 999,
      discount: 30,
      image: "/api/placeholder/350/450",
      rating: 4.9,
      reviews: 256,
      category: "Comfort",
      colors: [colors.neutral, colors.light, colors.dark],
      sizes: ["S", "M", "L", "XL", "XXL"],
      isNew: false,
      isBestSeller: false,
      fabric: "Organic Cotton",
    },
    {
      id: 4,
      name: "Festive Embroidered Kurti",
      price: 1899,
      originalPrice: 2499,
      discount: 24,
      image: "/api/placeholder/350/450",
      rating: 4.7,
      reviews: 342,
      category: "Festive",
      colors: [colors.primary, colors.secondary, "#8B5A3C"],
      sizes: ["S", "M", "L"],
      isNew: true,
      isBestSeller: true,
      fabric: "Silk Cotton",
    },
    {
      id: 5,
      name: "Contemporary Striped",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      image: "/api/placeholder/350/450",
      rating: 4.5,
      reviews: 167,
      category: "Modern",
      colors: [colors.dark, colors.accent, colors.neutral],
      sizes: ["XS", "S", "M", "L", "XL"],
      isNew: false,
      isBestSeller: false,
      fabric: "Linen Cotton",
    },
    {
      id: 6,
      name: "Bohemian Chic Kurti",
      price: 1099,
      originalPrice: 1599,
      discount: 31,
      image: "/api/placeholder/350/450",
      rating: 4.8,
      reviews: 203,
      category: "Boho",
      colors: [colors.accent, colors.primary, colors.secondary],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      isBestSeller: false,
      fabric: "Rayon",
    },
    {
      id: 7,
      name: "Classic Plain Kurti",
      price: 599,
      originalPrice: 899,
      discount: 33,
      image: "/api/placeholder/350/450",
      rating: 4.6,
      reviews: 145,
      category: "Basic",
      colors: [colors.light, colors.neutral, colors.dark],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      isNew: false,
      isBestSeller: true,
      fabric: "Cotton",
    },
    {
      id: 8,
      name: "Vintage Handloom",
      price: 1399,
      originalPrice: 1999,
      discount: 30,
      image: "/api/placeholder/350/450",
      rating: 4.9,
      reviews: 278,
      category: "Heritage",
      colors: [colors.primary, colors.accent, colors.secondary],
      sizes: ["S", "M", "L", "XL"],
      isNew: false,
      isBestSeller: true,
      fabric: "Handloom Cotton",
    },
  ];

  // Use provided products or dummy data
  const productData = products.length > 0 ? products : dummyProducts;

  // Calculate visible products based on screen size
  const calculateVisibleProducts = useCallback(() => {
    if (typeof window === "undefined") return CONFIG.BREAKPOINTS.desktop;
    const width = window.innerWidth;
    if (width < 640) return CONFIG.BREAKPOINTS.mobile;
    if (width < 1024) return CONFIG.BREAKPOINTS.tablet;
    if (width < 1280) return CONFIG.BREAKPOINTS.desktop;
    return CONFIG.BREAKPOINTS.large;
  }, []);

  // Navigation functions
  const canGoNext = currentIndex < productData.length - visibleProducts;
  const canGoPrev = currentIndex > 0;

  const nextSlide = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    } else if (autoPlay) {
      setCurrentIndex(0);
    }
  }, [canGoNext, autoPlay]);

  const prevSlide = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    } else if (autoPlay) {
      setCurrentIndex(productData.length - visibleProducts);
    }
  }, [canGoPrev, autoPlay, productData.length, visibleProducts]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > CONFIG.SWIPE_THRESHOLD;
    const isRightSwipe = distance < -CONFIG.SWIPE_THRESHOLD;

    if (isLeftSwipe && canGoNext) nextSlide();
    else if (isRightSwipe && canGoPrev) prevSlide();
  };

  // Wishlist handlers
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={i}
          className="w-4 h-4 fill-current"
          style={{ color: colors.primary }}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="w-4 h-4 text-gray-300" />
          <StarIcon
            className="w-4 h-4 fill-current absolute top-0 left-0"
            style={{ color: colors.primary, clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, CONFIG.AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  // Responsive effect
  useEffect(() => {
    const updateVisibleProducts = () => {
      const newVisible = calculateVisibleProducts();
      setVisibleProducts(newVisible);
      if (currentIndex >= productData.length - newVisible) {
        setCurrentIndex(Math.max(0, productData.length - newVisible));
      }
    };

    updateVisibleProducts();
    window.addEventListener("resize", updateVisibleProducts);
    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, [calculateVisibleProducts, currentIndex, productData.length]);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className={`py-16 ${className}`} style={{ backgroundColor: colors.light }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-10 rounded-lg mb-8 animate-pulse" style={{ backgroundColor: colors.neutral, width: "280px" }}></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(visibleProducts)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] rounded-2xl mb-4" style={{ backgroundColor: colors.neutral }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${className}`} style={{ backgroundColor: colors.light }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4" style={{ color: colors.dark }}>
              {title}
            </h2>
            <p className="text-lg font-poppins" style={{ color: colors.dark + "99" }}>
              Discover our carefully curated collection of premium kurtis
            </p>
          </div>
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Navigation Controls - Centered */}
          <div className="absolute inset-y-0 left-0 z-20 flex items-center -ml-6">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className="p-3 rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
              style={{
                backgroundColor: canGoPrev ? colors.primary : "rgba(255,255,255,0.8)",
                color: canGoPrev ? "white" : colors.dark,
              }}
              aria-label="Previous products"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 z-20 flex items-center -mr-6">
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className="p-3 rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
              style={{
                backgroundColor: canGoNext ? colors.primary : "rgba(255,255,255,0.8)",
                color: canGoNext ? "white" : colors.dark,
              }}
              aria-label="Next products"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          <div
            ref={sliderRef}
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(autoPlay)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
                width: `${(productData.length / visibleProducts) * 100}%`,
              }}
            >
              {productData.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / productData.length}%` }}
                >
                  <div className="group relative overflow-hidden rounded-2xl transition-all duration-500">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-poppins font-semibold text-white shadow-lg"
                            style={{ backgroundColor: colors.accent }}
                          >
                            New
                          </span>
                        )}
                        {product.isBestSeller && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-poppins font-semibold text-white shadow-lg"
                            style={{ backgroundColor: colors.secondary }}
                          >
                            Best Seller
                          </span>
                        )}
                        {product.discount > 0 && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-poppins font-semibold text-white shadow-lg"
                            style={{ backgroundColor: colors.primary }}
                          >
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      {showWishlist && (
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
                          style={{
                            backgroundColor: favorites.has(product.id)
                              ? colors.primary
                              : "rgba(255,255,255,0.9)",
                          }}
                          aria-label={`${favorites.has(product.id) ? "Remove from" : "Add to"} wishlist`}
                        >
                          {favorites.has(product.id) ? (
                            <HeartIconSolid className="w-5 h-5 text-white" />
                          ) : (
                            <HeartIcon className="w-5 h-5" style={{ color: colors.dark }} />
                          )}
                        </button>
                      )}

                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="mb-2">
                          <span
                            className="text-xs font-poppins font-medium uppercase tracking-wider"
                            style={{ color: colors.neutral }}
                          >
                            {product.category}
                          </span>
                        </div>

                        <h3
                          className="font-playfair font-semibold text-xl mb-3 leading-tight text-white"
                        >
                          {product.name}
                        </h3>

                        {/* Rating */}
                        {showRating && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              {renderStars(product.rating)}
                            </div>
                            <span
                              className="text-sm font-poppins text-white opacity-80"
                            >
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="text-xl font-playfair font-bold text-white"
                          >
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span
                              className="text-sm font-poppins line-through text-white opacity-70"
                            >
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Quick View Button */}
                        <Link
                          href={`/products/${product.id}`}
                          className="inline-block w-full py-3 rounded-xl font-poppins font-medium text-center transition-all duration-300 hover:scale-105 shadow-lg mt-2"
                          style={{
                            backgroundColor: colors.primary,
                            color: "white",
                          }}
                        >
                          Quick View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center mt-8 md:hidden">
          <div className="flex gap-2">
            {[...Array(Math.ceil(productData.length / visibleProducts))].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * visibleProducts)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      Math.floor(currentIndex / visibleProducts) === index
                        ? colors.primary
                        : colors.neutral,
                  }}
                  aria-label={`Go to page ${index + 1}`}
                />
              )
            )}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-poppins font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            style={{
              backgroundColor: colors.dark,
              color: "white",
            }}
          >
            Explore All Products
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;