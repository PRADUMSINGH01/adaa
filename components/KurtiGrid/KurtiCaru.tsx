"use client";
import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import hero1 from "@/app/(Images)/banners/canvaOne.png";
import hero2 from "@/app/(Images)/banners/canvatwo.jpg";
import hero3 from "@/app/(Images)/banners/summerr.png";
import hero4 from "@/app/(Images)/banners/summerrrr.png";
export function KurtiCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const images = [hero1, hero2, hero3, hero4];
  // Debugging: Log images array

  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  // Fallback for broken images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log(isAutoPlaying);
    console.error("Image failed to load:", e.currentTarget.src);
    e.currentTarget.style.display = "none";
  };

  return (
    <div className="relative aspect-[3/4] group bg-gray-100 rounded-xl overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
              style={{ minWidth: "100%" }} // Ensure full width
            >
              {/* Image Wrapper */}
              <div className="relative w-full h-full">
                {image ? (
                  <Image
                    src={image}
                    alt={`Kurti view ${index + 1}`}
                    fill
                    className="object-cover" // Change to object-contain if you want full image visible
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    quality={90}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image not available</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <FiChevronLeft className="h-6 w-6 text-dark" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20"
      >
        <FiChevronRight className="h-6 w-6 text-dark" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-6 bg-primary" : "w-2 bg-secondary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
