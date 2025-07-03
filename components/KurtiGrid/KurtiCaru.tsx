"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export function KurtiCarousel({ images }: { images?: string[] }) {
  // Normalize images to an array so hooks run unconditionally
  const imgs = Array.isArray(images) ? images : [];
  const total = imgs.length;

  // State & refs: always declared
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // For swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50; // px

  // Clear the existing interval
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start autoplay interval
  const startTimer = useCallback(() => {
    clearTimer();
    if (total > 0) {
      intervalRef.current = window.setInterval(() => {
        setCurrent((prev) => (prev + 1) % total);
      }, 3000);
    }
  }, [clearTimer, total]);

  // Effect to manage autoplay
  useEffect(() => {
    if (playing && total > 0) {
      startTimer();
    } else {
      clearTimer();
    }
    // Cleanup on unmount or when dependencies change
    return () => {
      clearTimer();
    };
  }, [playing, startTimer, clearTimer, total]);

  // Reset current index if images change length
  useEffect(() => {
    if (current >= total) {
      setCurrent(0);
    }
  }, [total, current]);

  // Manual navigation to a specific index
  const goTo = (idx: number) => {
    let newIdx = idx;
    if (idx < 0) {
      newIdx = total - 1;
    } else if (idx >= total) {
      newIdx = 0;
    }
    setCurrent(newIdx);
    // Restart timer if autoplay is on
    if (playing) {
      startTimer();
    }
  };

  // Prev / Next handlers
  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setPlaying(false); // pause autoplay on interaction
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
          // swiped left => next
          goNext();
        } else {
          // swiped right => prev
          goPrev();
        }
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setPlaying(true); // resume autoplay after swipe
  };

  // If no images, render placeholder
  if (total === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-gray-100"
      // Pause autoplay on hover (desktop) or when focus/touch starts
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides container */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {imgs.map((src, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-full h-0"
              style={{ paddingTop: "125%" }} // 4:5 aspect ratio
            >
              <Image
                src={src}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
                // Only priority for the first image
                priority={idx === 0}
                sizes="(max-width: 640px) 100vw, 50vw"
                onError={(e) => {
                  console.error("Failed to load:", e.currentTarget.src);
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next buttons */}

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {imgs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`
              h-3 rounded-full transition-all duration-300 cursor-pointer
              ${idx === current ? "w-8 bg-primary" : "w-3 bg-secondary/30"}
            `}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
