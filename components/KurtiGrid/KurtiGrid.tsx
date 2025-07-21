"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import WishListButton from "../wishlist/WishListButton";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/autoplay";

import hero1 from "@/app/(Images)/banners/b.png";
import hero2 from "@/app/(Images)/banners/bb.png";
import hero3 from "@/app/(Images)/banners/bbb.png";
import { KurtiCarousel } from "./KurtiCaru";

type Kurti = {
  id: string;
  Sku: string;
  name: string;
  price: string;
  originalPrice?: string;
  images: string[];
  isNew?: boolean;
  onSale?: boolean;
  brand?: string;
  colorsAvailable?: string[];
};

export default function KurtiGrid() {
  const [kurtis, setKurties] = useState<Kurti[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const heroImages = [hero1, hero2, hero3];

  useEffect(() => {
    setLoading(true);
    fetch("/api/fetchKurti")
      .then((res) => res.json())
      .then((data: Kurti[]) => setKurties(data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-neutral py-12 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        {/* Hero Banner */}
        <div className="mb-0 p-1 bg-accent">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1.2 },
              1024: { slidesPerView: 1.8 },
            }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            {heroImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`Banner ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 85vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark/40 via-transparent to-dark/20" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Section Title */}
        <div className="text-center mb-16"></div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-light rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="aspect-[4/5] bg-gradient-to-br from-neutral to-light animate-pulse"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-neutral rounded animate-pulse"></div>
                    <div className="h-6 bg-neutral rounded animate-pulse w-3/4"></div>
                    <div className="flex space-x-2">
                      <div className="h-5 w-5 bg-neutral rounded-full animate-pulse"></div>
                      <div className="h-5 w-5 bg-neutral rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            : kurtis.slice(0, 4).map((kurti) => (
                <div
                  key={kurti.id}
                  className="group bg-light rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute top-4 right-4 z-20">
                      <WishListButton product={kurti} />
                    </div>

                    <Link href={`/Kurti/${kurti.Sku}`} className="block h-full">
                      <div className="relative h-full">
                        <KurtiCarousel images={kurti.images} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {kurti.isNew && (
                        <span className="bg-accent text-white px-3 py-1.5 text-xs font-semibold font-poppins rounded-full shadow-md">
                          New Arrival
                        </span>
                      )}
                      {kurti.onSale && kurti.originalPrice && (
                        <span className="bg-primary text-white px-3 py-1.5 text-xs font-semibold font-poppins rounded-full shadow-md">
                          {calculateDiscount(kurti.originalPrice, kurti.price)}%
                          Off
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <Link href={`/Kurti/${kurti.id}`}>
                      <h3 className="font-poppins text-lg font-semibold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {kurti.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-poppins text-xl font-bold text-dark">
                          ₹{kurti.price}
                        </span>
                        {kurti.originalPrice && (
                          <span className="font-poppins text-sm text-dark/50 line-through">
                            ₹{kurti.originalPrice}
                          </span>
                        )}
                      </div>
                      {kurti.onSale && kurti.originalPrice && (
                        <span className="font-poppins text-sm font-medium text-primary">
                          Save ₹
                          {calculateSavings(kurti.originalPrice, kurti.price)}
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    {kurti.colorsAvailable &&
                      kurti.colorsAvailable.length > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {kurti.colorsAvailable
                              .slice(0, 4)
                              .map((color, idx) => (
                                <div
                                  key={idx}
                                  className="h-6 w-6 rounded-full border-2 border-white shadow-md ring-1 ring-dark/10"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            {kurti.colorsAvailable.length > 4 && (
                              <div className="h-6 w-6 rounded-full bg-neutral border-2 border-white shadow-md ring-1 ring-dark/10 flex items-center justify-center">
                                <span className="text-xs font-medium text-dark">
                                  +{kurti.colorsAvailable.length - 4}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="font-poppins text-xs text-dark/60">
                            {kurti.colorsAvailable.length} colors
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              ))}
        </div>

        {/* Load More Button */}
        {!loading && kurtis.length > 0 && (
          <div className="text-center mt-16">
            <button className="font-poppins bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Helper Functions
function calculateDiscount(original: string, current: string) {
  const parseNum = (p: string) => parseFloat(p.replace(/[^0-9.]/g, "")) || 0;
  const orig = parseNum(original);
  const curr = parseNum(current);
  return orig > 0 ? Math.round(((orig - curr) / orig) * 100) : 0;
}

function calculateSavings(original: string, current: string) {
  const parseNum = (p: string) => parseFloat(p.replace(/[^0-9.]/g, "")) || 0;
  const orig = parseNum(original);
  const curr = parseNum(current);
  return orig > curr ? (orig - curr).toFixed(0) : "0";
}
