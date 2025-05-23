"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Import high-quality images (minimum 3840px width recommended for 4K)
import banner1 from "@/app/(Images)/banners/canvatwo.jpg";
import banner2 from "@/app/(Images)/banners/canvaOne.png";
import banner3 from "@/app/(Images)/banners/canvaOne.png";
import banner4 from "@/app/(Images)/banners/canvaOne.png";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use different high-quality images for each slide
  const slides = [
    { img: banner1, alt: "Summer Collection Kurti 1" },
    { img: banner2, alt: "Summer Collection Kurti 2" },
    { img: banner3, alt: "Summer Collection Kurti 3" },
    { img: banner4, alt: "Summer Collection Kurti 4" },
  ];

  // Configuration
  const AUTO_PLAY_INTERVAL = 7000;
  const SWIPE_THRESHOLD = 50;
  const ASPECT_RATIO = 16 / 9; // 16:9 aspect ratio for wide banners

  // Calculate height based on aspect ratio
  const calculateHeight = () => {
    if (typeof window === "undefined") return "60vh";
    const width = window.innerWidth;
    return `${width / ASPECT_RATIO}px`;
  };

  // Slide navigation
  const navigate = (direction) => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      direction === "next"
        ? (prev + 1) % slides.length
        : prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  // Touch handling
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const delta = touchStart - touchEnd;

    if (delta > SWIPE_THRESHOLD) navigate("next");
    if (delta < -SWIPE_THRESHOLD) navigate("prev");
  };

  // Auto-play with pause on interaction
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      className="relative w-full bg-gray-100"
      style={{ height: calculateHeight() }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides container */}
      <div
        className="relative w-full h-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.img}
                alt={slide.alt}
                priority={index === 0}
                quality={90} // Increase image quality
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                className="object-cover object-center" // Better image cropping
                style={{
                  objectPosition: "center top", // Focus on important parts of image
                }}
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() => navigate("prev")}
          className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all shadow-lg hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-8 h-8 text-gray-900" />
        </button>
        <button
          onClick={() => navigate("next")}
          className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all shadow-lg hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-8 h-8 text-gray-900" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
