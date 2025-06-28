// KurtiGrid.jsx
import React, { useEffect } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

export default function Similar({ kurtiData }) {
  return (
    <div className="bg-neutral min-h-screen py-8 px-4">
      {/* Section title */}
      <h2 className="text-2xl md:text-3xl font-playfair text-dark text-center mb-6">
        Our Kurti Collection
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {kurtiData.map((item) => (
          <div
            key={item.id}
            className="bg-light rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            {/* Image container */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              {/* Favorite icon */}
              <button
                className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100 transition"
                aria-label="Add to favorites"
              >
                <FiHeart className="text-primary w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
              {/* Name */}
              <h3 className="font-playfair text-lg text-dark mb-1 line-clamp-2">
                {item.name}
              </h3>
              {/* Price and rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-poppins font-semibold text-primary">
                  ₹{item.price}
                </span>
                <span className="flex items-center text-sm text-dark/70">
                  {/* Simple star indicator; you can replace with actual star icons if desired */}
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const fullStar = idx + 1 <= Math.floor(item.rating);
                    const halfStar =
                      !fullStar && idx < item.rating && item.rating % 1 >= 0.5;
                    return (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={fullStar || halfStar ? "#E07A5F" : "#ccc"}
                        className="w-4 h-4"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.377-2.455a1 1 0 00-1.176 0l-3.377 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
                      </svg>
                    );
                  })}
                  <span className="ml-1 font-poppins text-xs text-dark/70">
                    ({item.rating})
                  </span>
                </span>
              </div>

              {/* Spacer to push button to bottom */}
              <div className="mt-auto">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-light font-poppins font-semibold hover:bg-secondary transition"
                  aria-label="Add to cart"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
