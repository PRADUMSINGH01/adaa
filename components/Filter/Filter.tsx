"use client";
import { useState, useEffect } from "react";
import { FiFilter, FiX } from "react-icons/fi";

interface ProductFiltersProps {
  priceRange: number;
  setPriceRange: (value: number) => void;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFabrics: string[];
  setSelectedFabrics: React.Dispatch<React.SetStateAction<string[]>>;
  isNew: boolean;
  setIsNew: (value: boolean) => void;
  isTrending: boolean;
  setIsTrending: (value: boolean) => void;
  clearAllFilters: () => void;
}

export default function ProductFilters({
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedFabrics,
  setSelectedFabrics,
  isNew,
  setIsNew,
  isTrending,
  setIsTrending,
  clearAllFilters,
}: ProductFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Prevent body scroll when mobile filters are open
  useEffect(() => {
    document.body.style.overflow = isMobileFiltersOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileFiltersOpen]);

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
    <div className="relative">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-accent text-neutral p-4 rounded-full shadow-lg z-40"
        aria-label="Open filters"
      >
        <FiFilter className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsMobileFiltersOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 bg-white transform transition-transform duration-300 w-full max-w-xs md:w-64 h-full md:h-auto z-50 ${
          isMobileFiltersOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full overflow-y-auto p-6 bg-light md:bg-neutral">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-playfair text-xl font-bold text-dark">
              Filters
            </h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="md:hidden text-dark"
              aria-label="Close filters"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="font-poppins font-medium text-dark mb-4">
              Price Range
            </h4>
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-primary mb-2"
            />
            <div className="flex justify-between text-secondary text-sm">
              <span>₹0</span>
              <span>₹{priceRange.toLocaleString()}</span>
              <span>₹20,000</span>
            </div>
          </div>

          {/* Collection */}
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
                  aria-pressed={selectedColors.includes(color.name)}
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
                  aria-pressed={selectedFabrics.includes(fabric)}
                >
                  {fabric}
                </button>
              ))}
            </div>
          </div>

          {/* Clear All */}
          <button
            onClick={clearAllFilters}
            className="w-full py-3 bg-accent text-white rounded-lg font-poppins hover:bg-accent/90 mb-16"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
