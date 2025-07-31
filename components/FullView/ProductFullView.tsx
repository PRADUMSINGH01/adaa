// components/ProductDetailView.tsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiTruck,
  FiRefreshCw,
  FiChevronRight,
  FiX,
  FiZoomIn,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { useCart } from "@/app/CartContext";
import { useRouter } from "next/navigation"; // or next/router
import Toast from "../Alerts/NotificationToast";
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
  colors: string[]; // assuming CSS color strings
  description: string;
  careInstructions?: string;
  fabric: string;
  shippingInfo?: string;
  returnPolicy?: string;
  details: string[];
  brand?: string;
  category?: string;
  sku?: string;
  stock: number;
  isNew?: boolean;
}

// Props: product is fully provided
interface ProductDetailViewProps {
  product: Product;
}

const tabs = ["description", "care", "reviews"] as const;

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selections & actions
  // Initialize from product.sizes/colors; if arrays are empty, default to empty string
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const { addToCart, isInitialized } = useCart();

  // Tabs
  const [activeTab, setActiveTab] = useState<
    "description" | "care" | "reviews"
  >("description");

  // Live region message
  const [liveMessage, setLiveMessage] = useState("");

  // Accessibility: trap focus in modal, close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Discount calculation
  const discount = useMemo(() => {
    if (product.discountPercentage) return product.discountPercentage;
    if (product.originalPrice > product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  }, [product.discountPercentage, product.originalPrice, product.price]);

  // Rating stars
  const stars = useMemo(() => {
    const rounded = Math.round(product.rating);
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rounded ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        aria-hidden="true"
      />
    ));
  }, [product.rating]);

  // Handle add to cart
  const handleAddToCart = () => {
    try {
      if (!selectedSize || !selectedColor) {
        setLiveMessage("Please select size and color.");
        return;
      }
      if (product.stock === 0) {
        setLiveMessage("Out of stock.");
        return;
      }
      if (!isInitialized) {
        setLiveMessage("Cart is initializing, please wait.");
        return;
      }
      setAdding(true);
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        quantity,
        image: product.images[0],
      };
      addToCart(newItem);
      setLiveMessage(`${quantity} ${product.name} added to cart.`);
      setToastType("success");
      setToastMessage("Product added successfully");
      setTimeout(() => setAdding(false), 500);
    } catch (error) {
      setToastType("error");
      setToastMessage(`Failed to add product ${error}`);
    }
  };

  // // Handle buy now
  // const handleBuyNow = async () => {
  //   if (!selectedSize || !selectedColor) {
  //     setLiveMessage("Please select size and color.");
  //     return;
  //   }
  //   if (product.stock === 0) {
  //     setLiveMessage("Out of stock.");
  //     return;
  //   }
  //   setIsBuying(true);
  //   try {
  //     router.push(
  //       `/checkout?productId=${encodeURIComponent(
  //         product.id
  //       )}&size=${encodeURIComponent(selectedSize)}&color=${encodeURIComponent(
  //         selectedColor
  //       )}&qty=${quantity}`
  //     );
  //   } catch (err) {
  //     console.error(err);
  //     setLiveMessage("Failed to proceed to buy. Please try again.");
  //   } finally {
  //     setIsBuying(false);
  //   }
  // };

  // Zoom handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          url: typeof window !== "undefined" ? window.location.href : "",
        })
        .catch((err) => {
          console.error("Share failed:", err);
        });
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => setLiveMessage("Product URL copied to clipboard."))
        .catch(() => setLiveMessage("Failed to copy URL."));
    }
  };

  // Wishlist handler placeholder
  const handleWishlist = () => {
    setLiveMessage("Wishlist feature coming soon.");
  };

  // --- RENDER ---




  useEffect(()=>{
 async  function simialproduct(color:string){
const res = await fetch('/api/Similar' ,{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({color}),
})
console.log(res)
return true
}
simialproduct("red")
  },[])
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl min-h-screen">
      {/* Live region for announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        duration={3000}
        onClose={() => setToastMessage("")}
        position="top-right"
      />

      {/* Breadcrumb */}
      <nav
        className="mb-4 text-sm text-gray-600 font-poppins"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center flex-wrap gap-1 md:gap-2">
          <li>
            <Link href="/" className="hover:text-[#E07A5F]">
              Home
            </Link>
          </li>
          <li>
            <FiChevronRight
              className="w-3 h-3 text-gray-400 mx-1"
              aria-hidden="true"
            />
          </li>
          {product.category && (
            <>
              <li>
                <a
                  href={`/category/${encodeURIComponent(product.category)}`}
                  className="hover:text-[#E07A5F]"
                >
                  {product.category}
                </a>
              </li>
              <li>
                <FiChevronRight
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                />
              </li>
            </>
          )}
          <li
            className="text-gray-800 font-medium truncate max-w-[120px] md:max-w-none"
            aria-current="page"
          >
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 ${
                  selectedImage === index
                    ? "ring-2 ring-[#E07A5F]"
                    : "ring-1 ring-gray-300 hover:ring-gray-400"
                }`}
                aria-label={`Select image ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div
            ref={imageRef}
            className="relative w-full aspect-square bg-white rounded-xl shadow-sm overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsModalOpen(true);
            }}
            aria-label="Open image in modal"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-150"
              style={{
                transform: isZoomed
                  ? `scale(1.5) translate(${-zoomPosition.x / 3}%,${
                      -zoomPosition.y / 3
                    }%)`
                  : "none",
              }}
              priority={selectedImage === 0}
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
              {discount > 0 && (
                <span className="bg-[#E07A5F] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  NEW
                </span>
              )}
            </div>
            {/* Zoom icon */}
            <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-md">
              <FiZoomIn className="w-5 h-5 text-gray-700" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5 font-poppins">
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center">
                <div
                  className="flex"
                  aria-label={`Rating: ${product.rating} out of 5`}
                >
                  {stars}
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  ({product.reviews} reviews)
                </span>
              </div>
              {product.sku && (
                <span className="text-gray-500 text-sm">
                  SKU: {product.sku}
                </span>
              )}
            </div>
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Brand:</span>
              <span className="text-gray-600">{product.brand}</span>
            </div>
          )}

          {/* Price & Stock */}
          <div className="space-y-2 py-3 border-y border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#E07A5F]">
                ₹{product.price.toLocaleString()}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[#E07A5F] font-medium">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            {product.stock > 0 ? (
              <div className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </div>
            ) : (
              <div className="text-red-600 font-medium">Out of Stock</div>
            )}
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="font-medium text-gray-800">Color:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => {
                  const isLight =
                    /^#?([fF]{6}|[Ff]{3})$/.test(color) ||
                    color.toLowerCase() === "white";
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all focus:outline-none ${
                        selectedColor === color
                          ? "border-[#E07A5F] ring-2 ring-[#E07A5F]/30"
                          : isLight
                          ? "border-gray-300 hover:border-gray-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    >
                      {selectedColor === color && (
                        <div className="w-3 h-3 bg-white/80 rounded-full m-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Size:</h3>
                <button
                  className="text-[#E07A5F] text-sm hover:underline"
                  onClick={() => {
                    setLiveMessage("Size guide coming soon.");
                  }}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors text-sm focus:outline-none focus:ring-2 ${
                      selectedSize === size
                        ? "border-[#E07A5F] bg-[#E07A5F]/10 text-[#E07A5F] font-medium"
                        : "border-gray-300 hover:border-gray-500 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800">Quantity:</h3>
            <div className="flex items-center w-fit border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                className="px-3 py-2 border-r border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-gray-800 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((p) => Math.min(product.stock, p + 1))
                }
                className="px-3 py-2 border-l border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={
                !selectedSize ||
                !selectedColor ||
                product.stock === 0 ||
                adding ||
                !isInitialized
              }
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E07A5F] text-white rounded-lg hover:bg-[#D06A4F] transition-colors disabled:opacity-70 font-medium flex-1 min-w-[150px]"
            >
              <FiShoppingCart className="w-5 h-5" aria-hidden="true" />
              {adding ? "Adding..." : "Add to Cart"}
            </button>
            {/* <button
              onClick={handleBuyNow}
              disabled={
                !selectedSize ||
                !selectedColor ||
                product.stock === 0 ||
                isBuying
              }
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 font-medium flex-1 min-w-[150px]"
            >
              {isBuying ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Buy Now"
              )}
            </button> */}
            <div className="flex gap-2 w-full md:w-auto justify-center">
              <button
                onClick={handleWishlist}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 flex-1 max-w-[50px]"
                aria-label="Add to wishlist"
              >
                <FiHeart className="w-5 h-5 mx-auto" aria-hidden="true" />
              </button>
              <button
                onClick={handleShare}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 flex-1 max-w-[50px]"
                aria-label="Share product"
              >
                <FiShare2 className="w-5 h-5 mx-auto" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <FiTruck
                className="w-5 h-5 text-[#E07A5F] mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <h4 className="font-medium text-gray-800">Free Shipping</h4>
                <p className="text-gray-600 text-sm">
                  {product.shippingInfo ||
                    "Free shipping on orders above ₹1999"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiRefreshCw
                className="w-5 h-5 text-[#E07A5F] mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <h4 className="font-medium text-gray-800">Easy Returns</h4>
                <p className="text-gray-600 text-sm">
                  {product.returnPolicy || "30 days return policy"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex min-w-max" aria-label="Product details tabs">
            {tabs.map((tab) => {
              const label =
                tab === "description"
                  ? "Description"
                  : tab === "care"
                  ? "Care Instructions"
                  : `Reviews (${product.reviews})`;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as (typeof tabs)[number])}
                  className={`py-3 px-5 font-medium text-sm md:text-base transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "text-[#E07A5F] border-b-2 border-[#E07A5F]"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  aria-selected={activeTab === tab}
                  role="tab"
                  id={`tab-${tab}`}
                  aria-controls={`tabpanel-${tab}`}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-5 md:p-6">
          {activeTab === "description" && (
            <div
              role="tabpanel"
              id="tabpanel-description"
              aria-labelledby="tab-description"
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Product Details
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#E07A5F] rounded-full mt-2 mr-2" />
                    <span className="text-gray-600">{d}</span>
                  </li>
                ))}
              </ul>
              <div>
                <span className="font-medium text-gray-800">Fabric: </span>
                <span className="text-gray-600">{product.fabric}</span>
              </div>
            </div>
          )}
          {activeTab === "care" && (
            <div role="tabpanel" id="tabpanel-care" aria-labelledby="tab-care">
              {product.careInstructions ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Care Instructions
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {product.careInstructions}
                  </p>
                </>
              ) : (
                <p className="text-gray-600">No care instructions available.</p>
              )}
            </div>
          )}
          {activeTab === "reviews" && (
            <div
              role="tabpanel"
              id="tabpanel-reviews"
              aria-labelledby="tab-reviews"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Customer Reviews
              </h3>
              {/* Overall rating */}
              <div className="flex items-center mb-5">
                <div className="flex mr-3">{stars}</div>
                <span className="text-gray-600">{product.rating} out of 5</span>
              </div>
              <p className="text-gray-600 mb-4">
                {product.reviews} customer reviews
              </p>
              {/* TODO: fetch and render individual reviews */}
              <p className="text-gray-500 italic">
                Reviews will be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* TODO: fetch related products, here placeholders */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={(e) => {
            // close if clicking backdrop
            if ((e.target as HTMLElement).classList.contains("fixed")) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-xl overflow-hidden">
            <button
              className="absolute top-3 right-3 text-white p-2 z-10 bg-black/50 rounded-full focus:outline-none focus:ring-2"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close image modal"
            >
              <FiX className="w-6 h-6" aria-hidden="true" />
            </button>
            <div className="relative w-full h-full aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} large view`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-10 h-10 rounded overflow-hidden transition-opacity flex-shrink-0 focus:outline-none focus:ring-2 ${
                    selectedImage === i
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  aria-label={`Select image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
