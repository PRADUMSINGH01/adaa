// components/CategorySlider.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Kurti from "@/app/(Images)/kurti.png";
import cottonkurtiimage from "@/app/(Images)/cotton.png";
import office from "@/app/(Images)/office.png";
import party from "@/app/(Images)/party.png";
import printed from "@/app/(Images)/printed.png";
import embro from "@/app/(Images)/embro.png";

import Link from "next/link";
const categories = [
  { name: "Office wear", url: "Office-wear", image: office },
  { name: "Cotton Kurtis", url: "Cotton-Kurties", image: cottonkurtiimage },
  { name: "Party Wear", url: "Party-Kurties", image: party },
  { name: "Casual Wear", url: "Casual-Kurties", image: Kurti },
  { name: "Printed", url: "Printed-Kurties", image: printed },
  { name: "Embroidered", url: "Embroidered-Kurties", image: embro },
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
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-secondary/20 hover:border-secondary transition-all duration-300">
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
