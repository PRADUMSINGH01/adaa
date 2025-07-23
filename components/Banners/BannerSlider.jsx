"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// Import high-quality images
import banner1 from "@/app/(Images)/banners/canvatwo.jpg";
import banner2 from "@/app/(Images)/banners/new.png";
import banner3 from "@/app/(Images)/banners/canvatwo.jpg";
import banner4 from "@/app/(Images)/banners/summerrrr.png";

/**
 * Professional Hero Slider Component
 * Features:
 * - Fully responsive design
 * - Touch/swipe support for mobile
 * - Auto-play with pause on hover
 * - Keyboard navigation
 * - Accessibility compliant
 * - Optimized performance
 */
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Slider configuration
  const CONFIG = {
    AUTO_PLAY_INTERVAL: 4000,
    SWIPE_THRESHOLD: 50,
    TRANSITION_DURATION: 600,
    ASPECT_RATIOS: {
      mobile: 4 / 3,
      tablet: 16 / 10,
      desktop: 16 / 9,
    },
  };

  // Slide data with optimized alt text and metadata
  const slides = [
    {
      img: "",
      alt: "Summer Collection Kurti - Elegant Traditional Wear",
      title: "Summer Collection",
      description: "Discover our elegant traditional wear collection",
    },
    {
      img: "",
      alt: "Premium Kurti Collection - Contemporary Designs",
      title: "Premium Collection",
      description: "Contemporary designs for modern lifestyle",
    },
    {
      img: "",
      alt: "Designer Kurti Range - Festive & Casual Wear",
      title: "Designer Range",
      description: "Perfect for festive and casual occasions",
    },
  ];

  // Calculate responsive dimensions
  const calculateDimensions = useCallback(() => {
    if (typeof window === "undefined") return { width: 0, height: 0 };

    const width = window.innerWidth;
    let aspectRatio;

    if (width <= 768) {
      aspectRatio = CONFIG.ASPECT_RATIOS.mobile;
    } else if (width <= 1024) {
      aspectRatio = CONFIG.ASPECT_RATIOS.tablet;
    } else {
      aspectRatio = CONFIG.ASPECT_RATIOS.desktop;
    }

    const height = Math.min(width / aspectRatio, window.innerHeight * 0.8);

    return { width, height };
  }, []);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);

    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > CONFIG.SWIPE_THRESHOLD;
    const isRightSwipe = distance < -CONFIG.SWIPE_THRESHOLD;

    if (isLeftSwipe) {
      nextSlide();
      setIsAutoPlaying(false);
    } else if (isRightSwipe) {
      prevSlide();
      setIsAutoPlaying(false);
    }

    // Resume auto-play after swipe
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        setIsAutoPlaying(false);
      } else if (e.key === "ArrowRight") {
        nextSlide();
        setIsAutoPlaying(false);
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    },
    [nextSlide, prevSlide]
  );

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, CONFIG.AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Responsive dimensions effect
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(calculateDimensions());
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [calculateDimensions]);

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("keydown", handleKeyDown);
    return () => slider.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Preload next image for performance
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const nextImage = new window.Image();
    nextImage.src = slides[nextIndex].img.src;
  }, [currentSlide, slides]);

  if (isLoading) {
    return (
      <div
        className="w-full bg-gray-200 animate-pulse flex items-center justify-center"
        style={{ height: dimensions.height || "60vh" }}
      >
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <section
      ref={sliderRef}
      className="relative w-full bg-gray-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ height: dimensions.height || "60vh" }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
      aria-live="polite"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-${
              CONFIG.TRANSITION_DURATION
            } ease-in-out ${
              index === currentSlide
                ? "opacity-100 z-10 transform scale-100"
                : "opacity-0 z-0 transform scale-105"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <Link
              href={`/Kurties/${slide.alt.replace(/\s+/g, "-").toLowerCase()}`}
              className="block w-full h-full group focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`View ${slide.title}`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={slide.img}
                  alt={slide.alt}
                  priority={index === 0}
                  quality={85}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    objectPosition: "center center",
                    filter: index === currentSlide ? "none" : "brightness(0.8)",
                  }}
                  onLoad={() => {
                    if (index === 0) setIsLoading(false);
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white z-20">
                  {/* <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {slide.title}
                  </h2> */}
                  {/* <p className="text-sm md:text-lg opacity-90 drop-shadow-md">
                    {slide.description}
                  </p> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous slide"
          disabled={isLoading}
        >
          <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
        </button>

        <button
          onClick={nextSlide}
          className="p-2 md:p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next slide"
          disabled={isLoading}
        >
          <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentSlide
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-20">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Screen Reader Status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {slides.length}:{" "}
        {slides[currentSlide].title}
      </div>
    </section>
  );
};

export default HeroSlider;
