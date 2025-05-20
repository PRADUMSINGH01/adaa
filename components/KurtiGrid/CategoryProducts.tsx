"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import kurti1 from "@/app/(Images)/embro.png";
import kurti2 from "@/app/(Images)/office.png";
import kurti3 from "@/app/(Images)/party.png";
import kurti4 from "@/app/(Images)/printed.png";

interface KurtiCardProps {
  title: string;
  price: number;
  category: string;
  isWishlisted?: boolean;
  loopInterval?: number; // milliseconds before switching images
}

// Static array of imported images
const STATIC_IMAGES = [kurti1, kurti2, kurti3, kurti4];

export default function KurtiCard({
  title,
  price,
  category,
  isWishlisted = false,
  loopInterval = 3000,
}: KurtiCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (STATIC_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATIC_IMAGES.length);
    }, loopInterval);
    return () => clearInterval(timer);
  }, [loopInterval]);

  return (
    <article className="group relative flex flex-col bg-neutral-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[360px] h-[360px] mx-auto">
      {/* Image Section */}
      <div className="relative h-[70%] w-full bg-light-50">
        <Image
          src={STATIC_IMAGES[currentIndex]}
          alt={`${title} image ${currentIndex + 1}`}
          fill
          className="object-cover object-center transition-opacity duration-300 hover:opacity-90"
          sizes="(max-width: 640px) 50vw, 260px"
          priority={false}
        />

        {/* Slider Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {STATIC_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors focus:outline-none ${
                currentIndex === idx ? "bg-pink-500" : "bg-pink-200"
              }`}
              aria-label={`Show image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Wishlist Badge */}
        <button
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 p-2 bg-light/80 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-primary/20 z-10"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isWishlisted
                ? "text-primary fill-primary"
                : "text-dark/80 fill-transparent"
            }`}
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between h-[30%]">
        <h3 className="font-poppins text-dark text-sm font-medium line-clamp-2 leading-snug mb-2">
          {title}
        </h3>
        <div className="flex justify-between items-center">
          <p className="font-playfair text-primary text-2xl font-semibold tracking-tight">
            ₹{price.toLocaleString()}
          </p>
          <span className="font-poppins text-accent text-xs bg-accent/10 px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
    </article>
  );
}
