"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiHeart, FiEye, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import addToWishlist from "@/server/AddWishlist";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import images
import hero1 from "@/app/(Images)/banners/canvaOne.png";
import hero2 from "@/app/(Images)/banners/canvatwo.jpg";
import hero3 from "@/app/(Images)/banners/summerr.png";
import hero4 from "@/app/(Images)/banners/summerrrr.png";
import { KurtiCarousel } from "./KurtiCaru";
// import { fetchLatestKurties } fromr "@/server/FetchKurti";

// type Product = {
//   images: StaticImageData[];
//   title: string;
//   price: number;
//   description: string;
//   sizes: string[];
// };

type Kurti = {
  id: number;
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

  const heroImages = [hero1, hero2, hero3, hero4];

  useEffect(() => {
    async function fetchKurti() {
      const response = await fetch("/api/fetchKurti");
      const products = await response.json();
      return setKurties(products);
    }
    fetchKurti();
  }, []);
  const handleQuickView = (id: number) => {
    const product = kurtis.find((k) => k.id === id);
    setSelectedProduct(product || null);
    setIsQuickViewOpen(true);
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
    <section className="min-h-screen py-8 md:py-12 lg:py-20 bg-[#F8F5F2]">
      {/* Hero Carousel */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 lg:mb-16">
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
              <div className="relative aspect-[16/9] mx-2 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
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

          <div className="hero-button-prev !text-secondary !left-2 lg:!left-4 after:!text-2xl lg:after:!text-3xl" />
          <div className="hero-button-next !text-secondary !right-2 lg:!right-4 after:!text-2xl lg:after:!text-3xl" />
        </Swiper>
      </div>

      {/* Product Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 lg:gap-8">
          {kurtis.map((kurti) => (
            <article
              key={kurti.id}
              className="group relative bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4]">
                <KurtiCarousel images={kurti.images} />

                {/* Status Badges */}
                <div className="absolute left-2 top-2 flex gap-1 z-20">
                  {kurti.isNew && <Badge color="primary">New</Badge>}
                  {kurti.onSale && kurti.originalPrice && (
                    <Badge color="secondary">
                      {calculateDiscount(kurti.originalPrice, kurti.price)}% Off
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <IconButton onClick={() => addToWishlist(kurti)}>
                    <FiHeart className="h-4 w-4 lg:h-5 lg:w-5" />
                  </IconButton>
                  <IconButton onClick={() => handleQuickView(kurti.id)}>
                    <FiEye className="h-4 w-4 lg:h-5 lg:w-5" />
                  </IconButton>
                </div>

                {/* Color Swatches */}
                {kurti.colorsAvailable && (
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
                  <SizePreview sizes={kurti.sizes} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* QuickView Modal */}
      {isQuickViewOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-4xl w-full h-[90vh] overflow-y-auto relative animate-fade-in">
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="sticky top-2 right-2 z-50 p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-all shadow-lg ml-auto m-2"
            >
              <FiX className="h-6 w-6" />
            </button>
            <QuickView product={selectedProduct} />
          </div>
        </div>
      )}
    </section>
  );
}

// QuickView Component
function QuickView({ product }: { product: Kurti }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-2 h-64 sm:h-80 lg:h-96">
        {product.images.map((img, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg group cursor-zoom-in"
          >
            <Image
              src={img}
              alt={`Product view ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 30vw"
            />
          </div>
        ))}
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-3 lg:gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold">{product.name}</h1>
        <p className="text-lg lg:text-xl text-primary">{product.price}</p>
        <p className="text-gray-600 text-sm lg:text-base">
          {product.description}
        </p>

        {/* Size Selection */}
        <div className="mt-2">
          <h3 className="text-base lg:text-lg font-semibold">Select Size</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm lg:text-base rounded-md border ${
                  selectedSize === size
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-2">
          <h3 className="text-base lg:text-lg font-semibold">Quantity</h3>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 border rounded-md text-sm lg:text-base"
            >
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 border rounded-md text-sm lg:text-base"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-primary text-white py-2 lg:py-3 rounded-md hover:bg-primary-dark text-sm lg:text-base">
            Buy Now
          </button>
          <button className="bg-secondary text-white py-2 lg:py-3 rounded-md hover:bg-secondary-dark text-sm lg:text-base">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components (Keep previous implementations with responsive classes)
// Badge, IconButton, ColorSwatch, PriceDisplay, SizePreview, Star components
// ... (Same as previous implementation with responsive text sizing and padding)

// Helper function
const calculateDiscount = (original: string, current: string) => {
  const cleanPrice = (price: string) => parseInt(price.replace(/\D/g, ""), 10);
  return Math.round(
    ((cleanPrice(original) - cleanPrice(current)) / cleanPrice(original)) * 100
  );
};
// Helper Components
const Badge = ({
  color,
  children,
}: {
  color: "primary" | "secondary";
  children: React.ReactNode;
}) => (
  <span
    className={`px-3 py-1 text-xs uppercase tracking-wide rounded-full shadow-md font-poppins ${
      color === "primary" ? "bg-primary" : "bg-secondary"
    } text-light`}
  >
    {children}
  </span>
);

const IconButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-2 bg-light/90 backdrop-blur-sm rounded-full hover:bg-primary transition-all shadow-lg hover:scale-110"
  >
    {children}
  </button>
);

const ColorSwatch = ({ color }: { color: string }) => (
  <div className="relative h-6 w-6 rounded-full border-2 border-light shadow-lg transition-transform hover:scale-125">
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
    <span className="font-poppins text-xl font-bold text-primary">{price}</span>
    {originalPrice && (
      <span className="font-poppins text-sm text-secondary/80 line-through">
        {originalPrice}
      </span>
    )}
  </div>
);

const SizePreview = ({ sizes }: { sizes: string[] }) => (
  <div className="flex items-center gap-2">
    <span className="font-poppins text-sm text-secondary">Sizes:</span>
    <div className="flex gap-1">
      {sizes.length > 0
        ? sizes.map((size) => (
            <span
              key={size}
              className="px-2 py-1 text-xs bg-light border border-secondary/20 rounded-md"
            >
              {size}
            </span>
          ))
        : ""}
    </div>
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

// // Helper function
// const calculateDiscount = (original: string, current: string) => {
//   const cleanPrice = (price: string) => parseInt(price.replace(/\D/g, ""), 10);
//   const originalPrice = cleanPrice(original);
//   const currentPrice = cleanPrice(current);
//   return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
// };
