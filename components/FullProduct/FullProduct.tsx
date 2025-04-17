// components/ProductPage.tsx
"use client";
import { useState, useRef } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiZoomIn,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";
import kurti1 from "@/app/(Images)/kurti.png";
import kurti2 from "@/app/(Images)/kurti.png";
import kurti3 from "@/app/(Images)/kurti.png";
import kurti4 from "@/app/(Images)/kurti.png";

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const productImages = [kurti1, kurti2, kurti3, kurti4];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !showZoom) return;

    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8">
      <div className="w-full mx-auto bg-light rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-12">
          {/* Image Gallery */}
          <div className="relative group">
            {/* Main Image Container */}
            <div
              ref={containerRef}
              className="relative aspect-square overflow-hidden rounded-xl cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
            >
              {/* Main Product Image */}
              <Image
                key={selectedImage}
                src={productImages[selectedImage]}
                alt="Designer Kurti"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />

              {/* Zoom Overlay */}
              <div
                className={`absolute inset-0 bg-no-repeat bg-[length:200%] transition-opacity duration-300 pointer-events-none ${
                  showZoom ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${productImages[selectedImage].src})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />

              {/* Zoom Indicator */}
              <div className="absolute bottom-4 left-4 bg-primary text-neutral px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <FiZoomIn className="w-4 h-4" />
                Hover to Zoom
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-secondary"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Kurti View ${index + 1}`}
                    fill
                    className="object-cover"
                    quality={50}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="font-playfair text-3xl font-bold text-dark">
              Embroidered Cotton Silk Kurti
            </h1>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-poppins font-bold text-secondary">
                ₹2,499
              </p>
              <p className="text-gray-400 line-through">₹3,299</p>
              <span className="bg-accent text-white px-2 py-1 rounded text-sm">
                25% off
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="font-poppins font-medium text-dark">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full font-poppins transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-neutral"
                        : "bg-white text-dark hover:bg-light"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-primary text-neutral py-4 rounded-xl font-poppins font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-3">
                <FiShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <button className="p-4 bg-white rounded-xl hover:bg-light transition-colors">
                <FiHeart className="w-6 h-6 text-secondary" />
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="space-y-4">
              <div className="border rounded-xl">
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "details" ? null : "details"
                    )
                  }
                  className="w-full p-4 flex items-center justify-between font-poppins text-dark"
                >
                  Product Details
                  <FiChevronRight
                    className={`transition-transform ${
                      openAccordion === "details" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openAccordion === "details" && (
                  <div className="p-4 pt-0 text-secondary space-y-2">
                    <p>
                      Handcrafted with pure cotton silk blend, featuring
                      intricate thread embroidery
                    </p>
                    <p>Care: Dry clean only</p>
                    <p>Fabric: 70% Cotton, 30% Silk</p>
                  </div>
                )}
              </div>

              <div className="border rounded-xl">
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "shipping" ? null : "shipping"
                    )
                  }
                  className="w-full p-4 flex items-center justify-between font-poppins text-dark"
                >
                  Shipping & Returns
                  <FiChevronRight
                    className={`transition-transform ${
                      openAccordion === "shipping" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="p-4 pt-0 text-secondary space-y-2">
                    <p>Free shipping on orders above ₹2999</p>
                    <p>Easy 15-day returns</p>
                    <p>Delivery in 5-7 business days</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="p-6 md:p-12 border-t">
          <h2 className="font-playfair text-2xl font-bold text-dark mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image
                    src={productImages[item % productImages.length]}
                    alt="Related Kurta"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-poppins font-medium text-dark">
                    Floral Print Kurta
                  </h3>
                  <p className="text-secondary">₹1,999</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
