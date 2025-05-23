"use client";

import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import hero1 from "@/app/(Images)/banners/canvaOne.png";
import hero2 from "@/app/(Images)/banners/canvatwo.jpg";
import hero3 from "@/app/(Images)/banners/summerr.png";
import hero4 from "@/app/(Images)/banners/summerrrr.png";

type Slide = {
  src: StaticImageData;
  alt: string;
};

export function KurtiCarousel() {
  const slides: Slide[] = [
    { src: hero1, alt: "Kurti style 1" },
    { src: hero2, alt: "Kurti style 2" },
    { src: hero3, alt: "Kurti style 3" },
    { src: hero4, alt: "Kurti style 4" },
  ];
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (!playing) return;
  //   window.setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % total);
  //   }, 3000);
  //   return () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //   };
  // }, [playing, total]);

  const goTo = (idx: number) => {
    console.log("Pagination clicked:", total, playing, idx);
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPlaying(true);
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
          {slides.map(({ src, alt }, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-full h-full"
              style={{ minWidth: "100%" }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* Pagination as real links */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {slides.map(({ src }, idx) => (
          <a
            key={idx}
            href={src.src}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => goTo(idx)}
            className={`
              block
              h-2
              rounded-full
              transition-all
              duration-300
              ${idx === current ? "w-6 bg-primary" : "w-2 bg-secondary/30"}
            `}
            aria-label={`Open image ${idx + 1} and go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
