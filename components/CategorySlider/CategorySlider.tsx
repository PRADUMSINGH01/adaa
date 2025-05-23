"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import your images
import Kurti from "@/app/(Images)/kurti.png";
import cottonkurtiimage from "@/app/(Images)/cotton.png";
import office from "@/app/(Images)/office.png";
import party from "@/app/(Images)/party.png";
import printed from "@/app/(Images)/printed.png";
import embro from "@/app/(Images)/embro.png";

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
    <div
      className="relative py-16 px-4 overflow-hidden 
      bg-gradient-to-br from-light/90 via-[#FEFCF9] to-light/90
      shadow-[inset_0_0_80px_rgba(224,122,95,0.05)]"
    >
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
        }}
        className="!overflow-visible relative z-10"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="group relative flex flex-col items-center hover:transform hover:-translate-y-3 transition-all duration-500">
              {/* Decorative ring */}
              <div className="absolute inset-0 w-60 h-60 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-spin-slow"
                  style={{ clipPath: "inset(0 0 0 50%)" }}
                />
                <div
                  className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-spin-slow-reverse"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </div>

              {/* Image Container */}
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-secondary group-hover:border-secondary transition-all duration-300 shadow-xl">
                <Link href={`Kurties/${category.url}`} className="block h-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 25vw"
                  />
                </Link>
              </div>

              {/* Text Container */}
              <div className="mt-4 md:mt-5 text-center space-y-1.5 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-secondary/30 group-hover:bg-secondary transition-colors duration-500" />
                <h3 className="font-playfair font-bold text-dark text-xl md:text-2xl lg:text-[26px] leading-tight tracking-wide">
                  {category.name}
                </h3>
                <Link
                  href={`Kurties/${category.url}`}
                  className="inline-block text-sm md:text-[15px] text-secondary hover:text-dark font-poppins font-semibold underline-offset-4 hover:underline transition-colors"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div
          className="swiper-button-prev !text-secondary !left-4 after:!text-[36px] md:after:!text-[42px] !hidden md:!block 
          !top-[45%] !-translate-y-1/2 !w-auto !h-auto !mt-0 hover:!text-primary transition-colors"
        />
        <div
          className="swiper-button-next !text-secondary !right-4 after:!text-[36px] md:after:!text-[42px] !hidden md:!block 
          !top-[45%] !-translate-y-1/2 !w-auto !h-auto !mt-0 hover:!text-primary transition-colors"
        />
      </Swiper>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }

        @keyframes spin-slow-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 30s linear infinite;
        }

        .swiper-pagination {
          position: relative;
          margin-top: 3rem;
        }
        .swiper-pagination-bullet {
          width: 14px;
          height: 14px;
          margin: 0 8px;
          background-color: rgba(234, 122, 122, 0.3);
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background-color: #d57a7a;
          transform: scale(1.3);
          box-shadow: 0 2px 8px rgba(213, 122, 122, 0.3);
        }
      `}</style>
    </div>
  );
}
