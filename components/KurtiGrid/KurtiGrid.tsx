"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiEye, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import WishListButton from "../wishlist/WishListButton";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import hero1 from "@/app/(Images)/banners/new.png";
import hero2 from "@/app/(Images)/banners/canvatwo.jpg";
import hero3 from "@/app/(Images)/banners/summerr.png";
import hero4 from "@/app/(Images)/banners/summerrrr.png";
import { KurtiCarousel } from "./KurtiCaru";
import Link from "next/link";

type Kurti = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  images: string[];
  isNew?: boolean;
  onSale?: boolean;
  brand?: string;
  rating?: number;
  colorsAvailable?: string[];
  sizes: string[];
  description: string;
};

export default function KurtiGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Kurti | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [kurtis, setKurties] = useState<Kurti[]>([]);
  const [loading, setLoading] = useState(false);
  const heroImages = [hero1, hero2, hero3, hero4];

  useEffect(() => {
    async function fetchKurti() {
      setLoading(true);
      try {
        const response = await fetch("/api/fetchKurti");
        const products = await response.json();
        setKurties(products);
      } catch (err) {
        console.error("Error fetching kurtis:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchKurti();
    return () => {
      setKurties([]);
    };
  }, []);

  const handleQuickView = (id: string) => {
    const product = kurtis.find((k) => k.id === id) || null;
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
    // Optionally disable background scroll:
    document.body.style.overflow = "hidden";
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = ""; // restore
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            type={
              rating >= i + 1 ? "full" : rating >= i + 0.5 ? "half" : "empty"
            }
          />
        ))}
        <span className="ml-1 text-sm text-secondary">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <section className="bg-[#F8F5F2] py-8 md:py-12 lg:py-20">
      {/* Container */}
      <div className="mx-auto w-full px-4">
        {/* Hero Carousel */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <Link href={"/"}>
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".hero-button-next",
                prevEl: ".hero-button-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 2.5 },
              }}
              className="!pb-12"
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-[16/9] mx-2 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={image}
                      alt={`Fashion Showcase ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 80vw"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
                  </div>
                </SwiperSlide>
              ))}

              <button
                className="hero-button-prev !text-secondary !left-2 lg:!left-4 after:!text-2xl lg:after:!text-3xl absolute top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white/70 rounded-full p-1"
                aria-label="Previous hero slide"
              />
              <button
                className="hero-button-next !text-secondary !right-2 lg:!right-4 after:!text-2xl lg:after:!text-3xl absolute top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white/70 rounded-full p-1"
                aria-label="Next hero slide"
              />
            </Swiper>
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl md:text-3xl mb-10 text-primary font-poppins font-semibold">
          Recommended For You
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {loading
            ? // Skeleton loader
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow animate-pulse"
                >
                  {/* Image skeleton */}
                  <div className="relative aspect-[3/4] bg-gray-200 rounded-t-2xl" />

                  {/* Badges skeleton */}
                  <div className="absolute left-2 top-2 flex gap-1 z-20">
                    <div className="bg-gray-300 rounded-full w-12 h-5" />
                    <div className="bg-gray-300 rounded-full w-12 h-5" />
                  </div>

                  {/* Quick actions skeleton */}
                  <div className="absolute right-2 top-2 flex gap-1 z-20">
                    <div className="bg-gray-300 rounded-full w-8 h-8" />
                    <div className="bg-gray-300 rounded-full w-8 h-8" />
                  </div>

                  {/* Color swatches skeleton */}
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 z-20">
                    <div className="bg-gray-300 rounded-full w-6 h-6" />
                    <div className="bg-gray-300 rounded-full w-6 h-6" />
                    <div className="bg-gray-300 rounded-full w-6 h-6" />
                  </div>

                  {/* Product info skeleton */}
                  <div className="p-4 lg:p-6">
                    <div className="mb-2">
                      <div className="bg-gray-300 rounded h-3 w-1/4 mb-2" />
                      <div className="bg-gray-300 rounded h-4 w-3/4 mb-1" />
                      <div className="bg-gray-300 rounded h-4 w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <div className="bg-gray-300 rounded h-4 w-10" />
                          <div className="bg-gray-300 rounded h-4 w-10" />
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className="bg-gray-300 rounded h-4 w-4"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-300 rounded h-4 w-full" />
                    </div>
                  </div>
                </div>
              ))
            : // Actual product list
              kurtis.map((kurti) => (
                <article
                  key={kurti.id}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  {/* Image & badges */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
                    <Link href={`/Kurti/${kurti.id}`} key={kurti.id}>
                      <KurtiCarousel images={kurti.images} />
                    </Link>

                    {/* Status Badges */}
                    <div className="absolute left-2 top-2 flex flex-wrap gap-1 z-20">
                      {kurti.isNew && <Badge color="primary">New</Badge>}
                      {kurti.onSale && kurti.originalPrice && (
                        <Badge color="secondary">
                          {calculateDiscount(kurti.originalPrice, kurti.price)}%
                          Off
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <button
                        aria-label="Add to wishlist"
                        className="bg-white/80 p-2 rounded-full hover:bg-accent transition"
                      >
                        <WishListButton product={kurti} />
                      </button>
                      <button
                        aria-label="Quick view"
                        className="bg-white/80 p-2 rounded-full hover:bg-accent transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuickView(kurti.id);
                        }}
                      >
                        <FiEye className="h-5 w-5 text-dark" />
                      </button>
                    </div>

                    {/* Color Swatches */}
                    {kurti.colorsAvailable &&
                      kurti.colorsAvailable.length > 0 && (
                        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 z-20">
                          {kurti.colorsAvailable.map((color) => (
                            <ColorSwatch key={color} color={color} />
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 lg:p-6">
                    <div className="mb-2">
                      {kurti.brand && (
                        <p className="text-xs lg:text-sm text-secondary uppercase tracking-wide mb-1">
                          {kurti.brand}
                        </p>
                      )}
                      <h3 className="text-base lg:text-lg font-semibold text-dark line-clamp-2">
                        {kurti.name}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <PriceDisplay
                          price={kurti.price}
                          originalPrice={kurti.originalPrice}
                        />
                        {renderStars(kurti.rating)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>

      {/* QuickView Modal */}
      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <button
              onClick={closeQuickView}
              className="absolute top-3 right-3 z-50 p-2 bg-white/90 rounded-full hover:bg-gray-100 transition shadow"
              aria-label="Close quick view"
            >
              <FiX className="h-6 w-6 text-dark" />
            </button>
            <QuickView
              product={selectedProduct}
              closeQuickView={closeQuickView}
            />
          </div>
        </div>
      )}
    </section>
  );
}

// QuickView Component with Image Zoom
function QuickView({
  product,
}: {
  product: Kurti;
  closeQuickView: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: "center" });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
      {/* Left: Image Gallery */}
      <div className="flex flex-col gap-4">
        <div
          ref={containerRef}
          className="relative w-full h-80 md:h-96 overflow-hidden rounded-lg cursor-zoom-in bg-gray-100"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomStyle({ backgroundPosition: "center" })}
        >
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center transition-all duration-100"
            style={{
              backgroundImage: `url(${mainImage})`,
              ...zoomStyle,
              backgroundSize: "200%",
            }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              className={`relative h-20 rounded-md overflow-hidden border-2 transition ${
                mainImage === img
                  ? "border-primary"
                  : "border-transparent hover:border-secondary/70"
              }`}
              onClick={() => setMainImage(img)}
              aria-label={`Select image ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-dark">
          {product.name}
        </h1>
        <p className="text-xl lg:text-2xl font-semibold text-primary">
          {product.price}
        </p>
        <p className="text-gray-600 text-sm lg:text-base">
          {product.description}
        </p>

        {/* Quantity Selector */}
        <div className="mt-2">
          <h3 className="text-base lg:text-lg font-semibold text-dark">
            Quantity
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded-md text-base hover:bg-gray-100 transition"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 py-1 text-base">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded-md text-base hover:bg-gray-100 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button className="flex-1 bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition text-base">
            Buy Now
          </button>
          <button className="flex-1 bg-secondary text-white py-3 rounded-md hover:bg-secondary-dark transition text-base">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const Badge = ({
  color,
  children,
}: {
  color: "primary" | "secondary";
  children: React.ReactNode;
}) => (
  <span
    className={`px-2 py-1 text-xs uppercase tracking-wide rounded-full shadow font-poppins ${
      color === "primary" ? "bg-primary text-white" : "bg-secondary text-white"
    }`}
  >
    {children}
  </span>
);

const ColorSwatch = ({ color }: { color: string }) => (
  <div className="relative h-6 w-6 rounded-full border-2 border-white shadow transition-transform hover:scale-110">
    <span
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color }}
    />
  </div>
);

const PriceDisplay = ({
  price,
  originalPrice,
}: {
  price: string;
  originalPrice?: string;
}) => (
  <div className="flex items-baseline gap-2">
    <span className="font-poppins text-lg lg:text-xl font-bold text-primary">
      {price}
    </span>
    {originalPrice && (
      <span className="font-poppins text-sm text-secondary/70 line-through">
        {originalPrice}
      </span>
    )}
  </div>
);

const Star = ({ type }: { type: "full" | "half" | "empty" }) => (
  <svg className="w-4 h-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
    {type === "full" && (
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    )}
    {type === "half" && (
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545zM10 12.4V0L7.539 4.955l-5.472.795 3.956 3.855-.933 5.445L10 12.4z" />
    )}
    {type === "empty" && (
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    )}
  </svg>
);

const calculateDiscount = (original: string, current: string) => {
  const cleanPrice = (price: string) =>
    parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
  const orig = cleanPrice(original);
  const curr = cleanPrice(current);
  if (orig <= 0) return 0;
  return Math.round(((orig - curr) / orig) * 100);
};
