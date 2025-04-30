// components/CategorySlider.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Kurti from "@/app/(Images)/kurti.png";
import Link from "next/link";
const categories = [
  { name: "Silk Kurtis",url:'Silk-Kurties', image: Kurti },
  { name: "Cotton Kurtis", url:'Cotton-Kurties',image: Kurti },
  { name: "Party Wear", url:'Party-Kurties',image: Kurti },
  { name: "Casual Wear", url:'Casual-Kurties',image: Kurti },
  { name: "Printed",url:'Printed-Kurties', image: Kurti },
  { name: "Embroidered", url:'Embroidered-Kurties',image: Kurti },
];

export default function CategorySlider() {
  return (
    <div className="relative py-12 px-4 bg-light z-0 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-secondary/30 ",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-secondary",
        }}
        className="!overflow-visible"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="relative group">
              {/* Category Name Above Image */}
              <h3 className="text-center mb-4 font-playfair font-semibold text-dark text-xl">
                {category.name}
              </h3>

              {/* Image Container */}
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-secondary/20 hover:border-secondary transition-all duration-300">
             <Link href={`Kurties/${category.url}`}>
             
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev !text-secondary !left-0 after:!text-3xl"></div>
        <div className="swiper-button-next !text-secondary !right-0 after:!text-3xl"></div>
      </Swiper>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination {
          @apply relative mt-8;
        }
        .swiper-pagination-bullet {
          @apply w-4 h-4 mx-2 transition-all;
        }
        .swiper-pagination-bullet-active {
          @apply scale-125;
        }
      `}</style>
    </div>
  );
}
