import Image from "next/image";
import Link from "next/link";

// Banner image imports
import bag from "@/app/(Images)/couponTwo.png";
import office from "@/app/(Images)/couponOne.png";
import party from "@/app/(Images)/couponthree.png";
import casual from "@/app/(Images)/couponfour.png";

export default function ResponsiveImageGrid() {
  const images = [bag, office, party, casual];
  const links = ["New", "Old", "100%", "Casual"];

  return (
    <div className="relative w-full mx-auto mt-0 px-4 bg-gray-800">
      {/* Rain overlay */}
      <div className="pointer-events-none absolute inset-0 " />

      {/* Image grid */}
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        {images.map((src, idx) => (
          <Link key={idx} href={`/Kurties/${links[idx]}`}>
            <div className="overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
              <Image
                src={src}
                alt={`Banner ${idx + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-contain"
                priority={idx < 2}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* Tailwind config (tailwind.config.js):
module.exports = {
  theme: {
    extend: {
      keyframes: {
        rain: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      animation: {
        rain: 'rain 0.7s linear infinite',
      },
    },
  },
  plugins: [],
};
*/
