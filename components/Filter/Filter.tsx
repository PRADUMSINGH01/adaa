// components/ProductFilters.tsx
"use client";
import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const colors = [
    { name: "Red", value: "#E07A5F" },
    { name: "Blue", value: "#3D405B" },
    { name: "Green", value: "#8A9B6E" },
    { name: "Pink", value: "#D57A7A" },
    { name: "Black", value: "#4A4A48" },
  ];

  const fabricTypes = ["Cotton", "Silk", "Linen", "Chiffon", "Georgette"];

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric)
        ? prev.filter((f) => f !== fabric)
        : [...prev, fabric]
    );
  };

  return (
    <div className="relative z-0">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-primary text-neutral p-4 rounded-full shadow-lg z-50"
      >
        <FiFilter className="w-6 h-6" />
      </button>

      {/* Filter Sidebar */}
      <div
        className={`fixed md:relative inset-0 md:inset-auto z-50 bg-white md:bg-transparent transform transition-transform duration-300 ${
          isMobileFiltersOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="w-80 md:w-64 h-screen md:h-auto overflow-y-auto p-6 md:p-0 bg-light md:bg-transparent">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-playfair text-xl font-bold text-dark">
              Filters
            </h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="md:hidden text-dark"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="font-poppins font-medium text-dark mb-4">
              Price Range
            </h4>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="20000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-secondary">
                <span>₹0</span>
                <span>₹{priceRange.toLocaleString()}</span>
                <span>₹20,000</span>
              </div>
            </div>
          </div>

          {/* New & Trending */}
          <div className="mb-8">
            <h4 className="font-poppins font-medium text-dark mb-4">
              Collection
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="w-5 h-5 accent-primary"
                />
                <span className="font-poppins">New Arrivals</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="w-5 h-5 accent-primary"
                />
                <span className="font-poppins">Trending Now</span>
              </label>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h4 className="font-poppins font-medium text-dark mb-4">Colors</h4>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColors.includes(color.name)
                      ? "scale-110 border-primary"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Fabric Type */}
          <div className="mb-8">
            <h4 className="font-poppins font-medium text-dark mb-4">
              Fabric Type
            </h4>
            <div className="flex flex-wrap gap-3">
              {fabricTypes.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => toggleFabric(fabric)}
                  className={`px-4 py-2 rounded-full font-poppins transition-colors ${
                    selectedFabrics.includes(fabric)
                      ? "bg-primary text-neutral"
                      : "bg-white text-dark hover:bg-light"
                  }`}
                >
                  {fabric}
                </button>
              ))}
            </div>
          </div>

          {/* Clear All */}
          <button
            onClick={() => {
              setPriceRange(10000);
              setSelectedColors([]);
              setSelectedFabrics([]);
              setIsNew(false);
              setIsTrending(false);
            }}
            className="w-full py-3 bg-accent text-white rounded-lg font-poppins hover:bg-accent/90"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
