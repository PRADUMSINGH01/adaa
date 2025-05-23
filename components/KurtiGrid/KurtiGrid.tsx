"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FiHeart, FiEye } from "react-icons/fi";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import images
import hero1 from "@/app/(Images)/banners/canvaOne.png";
import hero2 from "@/app/(Images)/banners/canvatwo.jpg";
import hero3 from "@/app/(Images)/banners/summerr.png";
import hero4 from "@/app/(Images)/banners/summerrrr.png";
import kurtiImage from "@/app/(Images)/party.png";
import { KurtiCarousel } from "./KurtiCaru";

type Kurti = {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: StaticImageData | string;
  isNew?: boolean;
  onSale?: boolean;
  brand?: string;
  rating?: number;
  colorsAvailable?: string[];
};

export default function KurtiGrid() {
  const [kurtis] = useState<Kurti[]>([
    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },

    {
      id: 1,
      name: "Enchanted Rose Kurti",
      brand: "Aura Collections",
      price: "₹1,499",
      image: kurtiImage,
      isNew: true,
      rating: 4.5,
      colorsAvailable: ["#E07A5F", "#8A9B6E"],
    },
    // Add other 7 kurti objects here...
  ]);

  const heroImages = [hero1, hero2, hero3, hero4];

  const handleWishlist = (id: number) => console.log(`Wishlist: ${id}`);
  const handleQuickView = (id: number) => console.log(`Quick view: ${id}`);

  const renderStars = (rating?: number) => {
    if (!rating) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} type="full" />
        ))}
        {hasHalfStar && <Star key="half" type="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} type="empty" />
        ))}
        <span className="ml-1 text-sm text-secondary">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen py-20"
      style={{ backgroundColor: "#F8F5F2" }}
    >
      {/* Hero Carousel */}
      <div className="">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".hero-button-next",
            prevEl: ".hero-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-[16/9] mx-4 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image}
                  alt={`Fashion Showcase ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
              </div>
            </SwiperSlide>
          ))}

          <div className="hero-button-prev !text-secondary !left-4 after:!text-3xl" />
          <div className="hero-button-next !text-secondary !right-4 after:!text-3xl" />
        </Swiper>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {kurtis.map((kurti, index) => (
            <article
              key={index}
              className="group relative overflow-hidden bg-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent opacity-0 group-hover:transition-opacity z-10" />

                <KurtiCarousel />

                {/* Status Badges */}
                <div className="absolute left-4 top-4 flex gap-2 z-20">
                  {kurti.isNew && <Badge color="primary">New Arrival</Badge>}
                  {kurti.onSale && kurti.originalPrice && (
                    <Badge color="secondary">
                      {calculateDiscount(kurti.originalPrice, kurti.price)}% Off
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <IconButton onClick={() => handleWishlist(kurti.id)}>
                    <FiHeart className="h-5 w-5" />
                  </IconButton>
                  <IconButton onClick={() => handleQuickView(kurti.id)}>
                    <FiEye className="h-5 w-5" />
                  </IconButton>
                </div>

                {/* Color Swatches */}
                {kurti.colorsAvailable && (
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20">
                    {kurti.colorsAvailable.map((color) => (
                      <ColorSwatch key={color} color={color} name={color} />
                    ))}
                  </div>
                )}

                {/* Add to Cart Button */}
              </div>

              {/* Product Info */}
              <div className="p-6 bg-light relative z-20">
                <div className="mb-3">
                  {kurti.brand && (
                    <p className="font-poppins text-sm text-secondary uppercase tracking-widest mb-1">
                      {kurti.brand}
                    </p>
                  )}
                  <h3 className="font-playfair text-xl font-semibold text-dark mb-2">
                    {kurti.name}
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <PriceDisplay
                      price={kurti.price}
                      originalPrice={kurti.originalPrice}
                    />
                    {renderStars(kurti.rating)}
                  </div>

                  <SizePreview sizes={["S", "M", "L"]} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        .hero-button-prev,
        .hero-button-next,
        .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }

        .hero-button-prev:hover::after,
        .hero-button-next:hover::after {
          color: #d57a7a !important;
        }

        .swiper-pagination {
          bottom: 0 !important;
        }

        .swiper-pagination-bullet-active {
          transform: scale(1.3);
        }
      `}</style>
    </section>
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

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="relative h-6 w-6 rounded-full border-2 border-light shadow-lg transition-transform hover:scale-125">
    <span
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color }}
    />
    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-poppins text-xs bg-dark text-light px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {name}
    </span>
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
      {sizes.map((size) => (
        <span
          key={size}
          className="px-2 py-1 text-xs bg-light border border-secondary/20 rounded-md"
        >
          {size}
        </span>
      ))}
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

// Helper function
const calculateDiscount = (original: string, current: string) => {
  const cleanPrice = (price: string) => parseInt(price.replace(/\D/g, ""), 10);
  const originalPrice = cleanPrice(original);
  const currentPrice = cleanPrice(current);
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
