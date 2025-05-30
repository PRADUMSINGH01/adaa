import Image from "next/image";
import summer from "@/app/(Images)/banners/summer.png";
import bag from "@/app/(Images)/banners/bag.png";

import office from "@/app/(Images)/banners/new.png";

import party from "@/app/(Images)/banners/enthic.png";

const ResponsiveImageGrid = () => {
  const images = [summer, bag, office, party];

  return (
    <div className="w-full mx-auto  mt-2">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative aspect-square w-full h-full overflow-hidden  transition-transform duration-300 "
          >
            <Image
              src={src}
              alt={`Grid image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2} // Optional: prioritize loading first two images
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveImageGrid;
