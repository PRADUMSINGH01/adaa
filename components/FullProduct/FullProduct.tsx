// components/ProductPage.tsx
"use client";
import { useState, useRef } from "react";
import { FiHeart, FiShoppingCart, FiX, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import kurti1 from "@/app/(Images)/kurti.png";
import kurti2 from "@/app/(Images)/kurti.png";
import kurti3 from "@/app/(Images)/kurti.png";
import kurti4 from "@/app/(Images)/kurti.png";
import { addToCart } from "@/server/AddToCart";
interface Product {
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  careInstructions: string;
  fabric: string;
  shippingInfo: string;
  returnPolicy: string;
}

const productDetails: Product = {
  name: "Elegant Embroidered Kurti",
  price: 2499,
  originalPrice: 3299,
  discountPercentage: 25,
  images: [kurti1.src, kurti2.src, kurti3.src, kurti4.src],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["#E07A5F", "#D57A7A", "#8A9B6E", "#4A4E69"],
  description:
    "Handcrafted with a luxurious cotton silk blend, this kurti features intricate thread embroidery and a comfortable fit. Perfect for special occasions and everyday elegance.",
  careInstructions: "Dry clean only",
  fabric: "70% Cotton, 30% Silk",
  shippingInfo:
    "Free shipping on orders above ₹2999. Delivery in 5-7 business days.",
  returnPolicy: "Easy 15-day returns.",
};

export default function ProductPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !showZoom) return;

    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };


  const handleAddToCart = () => {

    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    }



    addToCart(productDetails,selectedColor ,selectedSize);
    alert("Item added to cart!");
  }


  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <div className="min-h-screen bg-neutral p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Gallery */}
          <div className="relative group">
            {/* Main Image Container */}
            <div
              ref={containerRef}
              className="relative aspect-square overflow-hidden rounded-lg cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleImageClick}
            >
              {/* Main Product Image */}
              <Image
                key={selectedImageIndex}
                src={productDetails.images[selectedImageIndex]}
                alt={productDetails.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
                style={{ cursor: showZoom ? "zoom-in" : "default" }}
              />

              {/* Zoom Overlay (Visible on hover) */}
              {showZoom && !isZoomed && (
                <div
                  className={`absolute inset-0 bg-no-repeat bg-[length:200%] transition-opacity duration-200 pointer-events-none opacity-100`}
                  style={{
                    backgroundImage: `url(${productDetails.images[selectedImageIndex]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {productDetails.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-secondary"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productDetails.name} - View ${index + 1}`}
                    fill
                    className="object-cover"
                    quality={50}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-5">
            <h1 className="font-playfair text-3xl font-semibold text-dark">
              {productDetails.name}
            </h1>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-poppins font-semibold text-secondary">
                ₹{productDetails.price.toLocaleString()}
              </p>
              {productDetails.originalPrice && (
                <p className="text-gray-400 line-through">
                  ₹{productDetails.originalPrice.toLocaleString()}
                </p>
              )}
              {productDetails.discountPercentage && (
                <span className="bg-accent text-white px-2 py-1 rounded text-sm">
                  {productDetails.discountPercentage}% off
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-poppins font-medium text-dark mb-2">
                Select Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {productDetails.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full cursor-pointer transition-shadow shadow-sm hover:shadow-md ${
                      selectedColor === color ? "ring-2 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Color: ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-poppins font-medium text-dark mb-2">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {productDetails.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full font-poppins transition-colors border ${
                      selectedSize === size
                        ? "border-primary text-primary"
                        : "border-gray-300 text-dark hover:border-secondary hover:text-secondary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
              onClick={()=>handleAddToCart()}
                className="flex-1 bg-primary text-white py-3 rounded-md font-poppins font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-3"
                disabled={!selectedSize || !selectedColor}
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 bg-white rounded-md hover:bg-gray-100 transition-colors border border-gray-300">
                <FiHeart className="w-5 h-5 text-secondary" />
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="space-y-3">
              <div className="border rounded-md">
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "details" ? null : "details"
                    )
                  }
                  className="w-full p-3 flex items-center justify-between font-poppins text-dark"
                >
                  Product Details
                  <FiChevronRight
                    className={`transition-transform ${
                      openAccordion === "details" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openAccordion === "details" && (
                  <div className="p-3 pt-0 text-secondary space-y-2">
                    <p>{productDetails.description}</p>
                    <p>Care: {productDetails.careInstructions}</p>
                    <p>Fabric: {productDetails.fabric}</p>
                  </div>
                )}
              </div>

              <div className="border rounded-md">
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "shipping" ? null : "shipping"
                    )
                  }
                  className="w-full p-3 flex items-center justify-between font-poppins text-dark"
                >
                  Shipping & Returns
                  <FiChevronRight
                    className={`transition-transform ${
                      openAccordion === "shipping" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="p-3 pt-0 text-secondary space-y-2">
                    <p>{productDetails.shippingInfo}</p>
                    <p>{productDetails.returnPolicy}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="p-8 border-t">
          <h2 className="font-playfair text-2xl font-semibold text-dark mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image
                    src={
                      productDetails.images[item % productDetails.images.length]
                    }
                    alt="Related Kurta"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-poppins font-medium text-dark text-sm truncate">
                    Similar Style Kurta
                  </h3>
                  <p className="text-secondary text-sm">
                    ₹{Math.floor(Math.random() * 2000 + 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center">
          <div className="relative max-w-3xl max-h-screen">
            <Image
              src={productDetails.images[selectedImageIndex]}
              alt={`${productDetails.name} - Full View`}
              className="object-contain max-h-[90vh] rounded-md"
              width={
                productDetails.images[selectedImageIndex] === kurti1.src
                  ? 800
                  : 600
              }
              height={
                productDetails.images[selectedImageIndex] === kurti1.src
                  ? 1200
                  : 900
              }
            />
            <button
              onClick={handleCloseZoom}
              className="absolute top-4 right-4 bg-white/50 rounded-full p-2 text-dark hover:bg-white/70 transition-colors"
              aria-label="Close Zoom"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
