"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
type Slide = {
  src: string;
};

export function KurtiCarousel({ images }: { images: string[] }) {
  const slides: Slide[] = [
    { src: images[0] },
    { src: images[1] },
    { src: images[2] },
    { src: images[3] },
  ];
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;

    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playing, total]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    // Reset interval when manually navigating
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);
  };

  return (
    <div
      className="relative aspect-[3/4] group bg-gray-100 rounded-xl overflow-hidden"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      {/* Slides */}
      <div className="h-full w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map(({ src }, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-full h-full"
              style={{ minWidth: "100%" }}
            >
              <Image
                src={src}
                alt={"alt"}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="(max-width: 568px) 80vw, 50vw"
                onError={(e) => {
                  console.error("Failed to load:", e.currentTarget.src);
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`block h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "w-6 bg-primary" : "w-2 bg-secondary/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
