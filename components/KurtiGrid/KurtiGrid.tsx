"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FiEye, FiX } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import WishListButton from "../wishlist/WishListButton";
import Image from "next/image";
import "swiper/css";
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
    document.body.style.overflow = "hidden";
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "";
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
        <span className="ml-1 text-xs text-gray-500">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <section className="bg-white py-8 md:py-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="mb-10 md:mb-14">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
            }}
            className="!pb-4"
          >
            {heroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={image}
                    alt={`Fashion Showcase ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 80vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <h1 className="text-center text-2xl md:text-3xl mb-12 text-gray-900 font-sans font-medium">
          Recommended For You
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5 lg:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl shadow-sm animate-pulse"
                >
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-t-xl" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-100 rounded mb-3 w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            : kurtis.map((kurti) => (
                <article
                  key={kurti.id}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Image container */}
                  <div className="relative aspect-[3/4]">
                    {/* Buttons placed above the image link */}
                    <div className="absolute top-3 right-3 flex gap-2 z-20">
                      <button
                        aria-label="Add to wishlist"
                        className="bg-white p-1.5 rounded-full hover:bg-gray-50 transition shadow-sm"
                      >
                        <WishListButton product={kurti} />
                      </button>
                      <button
                        aria-label="Quick view"
                        className="bg-white p-1.5 rounded-full hover:bg-gray-50 transition shadow-sm"
                        onClick={() => handleQuickView(kurti.id)}
                      >
                        <FiEye className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Image link */}
                    <Link href={`/Kurti/${kurti.id}`} className="block">
                      <KurtiCarousel images={kurti.images} />

                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-wrap gap-1 z-10">
                        {kurti.isNew && <Badge>New</Badge>}
                        {kurti.onSale && kurti.originalPrice && (
                          <Badge color="sale">
                            {calculateDiscount(
                              kurti.originalPrice,
                              kurti.price
                            )}
                            % Off
                          </Badge>
                        )}
                      </div>

                      {/* Color swatches */}
                      {kurti.colorsAvailable &&
                        kurti.colorsAvailable.length > 0 && (
                          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 z-10">
                            {kurti.colorsAvailable.map((color) => (
                              <ColorSwatch key={color} color={color} />
                            ))}
                          </div>
                        )}
                    </Link>
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    {kurti.brand && (
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {kurti.brand}
                      </p>
                    )}
                    <Link href={`/Kurti/${kurti.id}`}>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-2 hover:text-primary transition-colors">
                        {kurti.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <PriceDisplay
                        price={kurti.price}
                        originalPrice={kurti.originalPrice}
                      />
                      {renderStars(kurti.rating)}
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>

      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              aria-label="Close quick view"
            >
              <FiX className="h-5 w-5 text-gray-600" />
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      <div className="flex flex-col gap-4">
        <div
          ref={containerRef}
          className="relative w-full h-80 overflow-hidden rounded-lg bg-gray-50"
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
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              className={`relative h-20 rounded overflow-hidden border transition ${
                mainImage === img
                  ? "border-gray-700"
                  : "border-transparent hover:border-gray-400"
              }`}
              onClick={() => setMainImage(img)}
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

      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs text-gray-500 uppercase">
            {product.brand}
          </span>
          <h1 className="text-xl lg:text-2xl font-medium text-gray-900 mt-1">
            {product.name}
          </h1>
          <div className="mt-2">
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">Description</h3>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        </div>

        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition"
            >
              -
            </button>
            <span className="px-4 py-1 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition"
            >
              +
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-gray-900 text-white py-3 rounded hover:bg-black transition text-sm font-medium">
            Buy Now
          </button>
          <button className="flex-1 border border-gray-900 py-3 rounded hover:bg-gray-50 transition text-sm font-medium">
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
  color?: "sale";
  children: React.ReactNode;
}) => (
  <span
    className={`px-2 py-1 text-xs uppercase rounded ${
      color === "sale" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
    }`}
  >
    {children}
  </span>
);

const ColorSwatch = ({ color }: { color: string }) => (
  <div className="relative h-5 w-5 rounded-full border border-white shadow-sm">
    <span
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color }}
    />
  </div>
);

const PriceDisplay = ({
  price,
  originalPrice,
  size = "md",
}: {
  price: string;
  originalPrice?: string;
  size?: "md" | "lg";
}) => (
  <div className="flex items-baseline gap-2">
    <span
      className={`font-medium ${
        size === "lg" ? "text-xl text-gray-900" : "text-gray-900"
      }`}
    >
      {price}
    </span>
    {originalPrice && (
      <span className="text-sm text-gray-500 line-through">
        {originalPrice}
      </span>
    )}
  </div>
);

const Star = ({ type }: { type: "full" | "half" | "empty" }) => (
  <svg
    className="w-3 h-3 text-yellow-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
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
