import React, { useState, useMemo, useEffect } from "react";
import { KurtiCarousel } from "../KurtiGrid/KurtiCaru";
import Link from "next/link";
import WishListButton from "@/components/wishlist/WishListButton";

// --- START: Icon Components ---
// FIX: Added the missing SVG icon components.
const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const MinusIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const ChevronDown = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
// --- END: Icon Components ---

const theme = {
  colors: {
    primary: "#8A6E6E",
    accent: "#3A3A3A",
    background: "#F9F8F7",
    surface: "#FFFFFF",
    secondaryText: "#707070",
    border: "#EAEAEA",
    sale: "#C94D4D",
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Poppins", sans-serif',
  },
  shadows: {
    card: "0 4px 12px rgba(0, 0, 0, 0.05)",
    modal: "0 20px 50px rgba(0, 0, 0, 0.15)",
    button: "0 4px 6px rgba(138, 110, 110, 0.15)",
  },
};

// --- Selection Modal ---
const SelectionModal = ({ product, onClose, onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!product) return null;

  const handleConfirm = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    onConfirm({
      productName: product.name,
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
      quantity,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="flex-grow overflow-y-auto">
            <p
              className="text-xs sm:text-sm uppercase tracking-widest"
              style={{ color: theme.colors.secondaryText }}
            >
              {product.category}
            </p>
            <h2
              className="text-xl sm:text-2xl md:text-3xl mt-1"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.accent,
              }}
            >
              {product.name}
            </h2>
            <div className="mt-3 md:mt-4 flex items-baseline gap-2">
              <p
                className="text-2xl md:text-3xl font-medium"
                style={{ color: theme.colors.accent }}
              >
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p
                  className="text-base md:text-lg line-through"
                  style={{ color: theme.colors.secondaryText }}
                >
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            {/* Color selection */}
            <div className="mt-6 md:mt-8">
              <h3
                className="text-xs sm:text-sm font-medium uppercase tracking-wider"
                style={{ color: theme.colors.secondaryText }}
              >
                Color
              </h3>
              <div className="flex items-center gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-7 h-7 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
                    style={{
                      backgroundColor: color,
                      borderColor:
                        selectedColor === color
                          ? theme.colors.primary
                          : "transparent",
                    }}
                  >
                    {selectedColor === color && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Size selection */}
            <div className="mt-6 md:mt-8">
              <h3
                className="text-xs sm:text-sm font-medium uppercase tracking-wider"
                style={{ color: theme.colors.secondaryText }}
              >
                Size
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-md border font-medium transition-colors duration-200"
                    style={{
                      backgroundColor:
                        selectedSize === size
                          ? theme.colors.accent
                          : theme.colors.surface,
                      borderColor:
                        selectedSize === size
                          ? theme.colors.accent
                          : theme.colors.border,
                      color:
                        selectedSize === size
                          ? theme.colors.surface
                          : theme.colors.accent,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Quantity & Add */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-4">
            <div
              className="flex items-center border rounded-md w-full sm:w-auto"
              style={{ borderColor: theme.colors.border }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 sm:p-3"
              >
                <MinusIcon />
              </button>
              <span className="px-3 sm:px-4 text-base sm:text-lg font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 sm:p-3"
              >
                <PlusIcon />
              </button>
            </div>
            <button
              onClick={handleConfirm}
              disabled={!selectedSize}
              className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-transform active:scale-[0.98]"
              style={{
                backgroundColor: theme.colors.primary,
                opacity: !selectedSize ? 0.5 : 1,
                boxShadow: theme.shadows.button,
              }}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Product Card ---
const ProductCard = ({ product }) => (
  <div className="group relative flex flex-col text-center">
    <div className="absolute top-2 right-2 z-40">
      <WishListButton product={product} />
    </div>
    <Link href={`Kurti/${product.Slug}`}>
      <div className="relative overflow-hidden rounded-lg">
        {/* FIX: Aligned wishlist button to the top-right corner */}

        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.isNew && (
            <span
              className="bg-white/80 text-[10px] font-semibold px-2 py-1 rounded-full"
              style={{ color: theme.colors.accent }}
            >
              NEW
            </span>
          )}
          {product.originalPrice && (
            <span
              className="bg-white/80 text-[10px] font-semibold px-2 py-1 rounded-full"
              style={{ color: theme.colors.sale }}
            >
              SALE
            </span>
          )}
        </div>
        <div className="w-full aspect-[3/4]">
          <KurtiCarousel images={product.images} />
        </div>
      </div>
      <div className="pt-3 md:pt-4 flex-grow flex flex-col">
        <h3
          className="text-sm md:text-base font-medium px-2 whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ color: theme.colors.accent }}
          title={product.name} // Show full name on hover
        >
          {product.name}
        </h3>

        <div className="mt-2 md:m-3 flex  items-baseline gap-2">
          <p className="text-base md:text-md font-semibold">₹{product.price}</p>
        </div>
      </div>
    </Link>
  </div>
);

// --- Notification ---
const Notification = ({ message, show }) => (
  <div
    className={`fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-lg py-3 px-6 transition-all duration-300 z-[60] ${
      show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
    }`}
    style={{
      color: theme.colors.accent,
      boxShadow: theme.shadows.modal,
    }}
  >
    <p className="font-medium text-sm sm:text-base">{message}</p>
  </div>
);

// --- Main App ---
export default function App() {
  const [kurties, setKurties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });
  const [visiblePages, setVisiblePages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 8;

  // Fetch + Cache
  useEffect(() => {
    const cacheKey = "kurties_cache";
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          // 24-hour cache
          setKurties(data);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cache", e);
        localStorage.removeItem(cacheKey);
      }
    }
    setLoading(true);
    fetch("/api/fetchKurti")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setKurties(data);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data })
        );
      })
      .catch((err) => setError("Failed to fetch products."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(kurties.map((p) => p.category))],
    [kurties]
  );

  const filteredSorted = useMemo(
    () =>
      [...kurties] // Create a shallow copy to avoid mutating the original array
        .filter(
          (p) => categoryFilter === "All" || p.category === categoryFilter
        )
        .sort((a, b) => {
          if (sortOption === "price-low") return a.price - b.price;
          if (sortOption === "price-high") return b.price - a.price;
          if (sortOption === "new")
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          return a.id - b.id; // Default "featured" sort
        }),
    [categoryFilter, sortOption, kurties]
  );

  useEffect(() => setVisiblePages(1), [categoryFilter, sortOption]);

  const currentProducts = useMemo(
    () => filteredSorted.slice(0, visiblePages * productsPerPage),
    [filteredSorted, visiblePages]
  );

  const showNotification = (msg) => {
    setNotification({ message: msg, show: true });
    setTimeout(() => setNotification({ message: "", show: false }), 3000);
  };

  const handleConfirmPurchase = (details) => {
    // FIX: Removed `setCart` as it was not defined in this component's state.
    // If you need a cart, you would typically manage it with Context or a state management library.
    // setCart((c) => [...c, details]);
    showNotification(`${details.productName} added to your bag!`);
  };

  const handleLoadMore = () => setVisiblePages((v) => v + 1);

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: theme.colors.primary }}
          ></div>
          <p className="mt-4" style={{ color: theme.colors.accent }}>
            Loading products...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: theme.colors.accent }}
          >
            Error Loading Products
          </h2>
          <p className="mb-4" style={{ color: theme.colors.secondaryText }}>
            {error} We're having trouble loading our collection. Please try
            again later.
          </p>
          <button
            className="py-2 px-6 rounded-lg font-medium"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.surface,
              boxShadow: theme.shadows.button,
            }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@400;500;600&display=swap');
        body {
          background-color: ${theme.colors.background};
          font-family: ${theme.fonts.body};
          color: ${theme.colors.accent};
          -webkit-tap-highlight-color: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="min-h-screen">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4 flex justify-between items-center">
            <h1
              className="text-xl font-medium"
              style={{ fontFamily: theme.fonts.heading }}
            >
              Kurtis Collection
            </h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 py-2 px-3 rounded-lg border"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.accent,
              }}
            >
              <span>Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Filters */}
          <div
            className={`mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start gap-4 transition-all duration-300 overflow-hidden ${
              showFilters ? "max-h-96" : "max-h-0 md:max-h-full"
            }`}
          >
            <div
              className="w-full md:w-auto overflow-x-auto scrollbar-hide border-b md:border-b-0 pb-2"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="flex">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCategoryFilter(cat);
                      if (window.innerWidth < 768) setShowFilters(false);
                    }}
                    className="relative px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap"
                    style={{
                      color:
                        categoryFilter === cat
                          ? theme.colors.accent
                          : theme.colors.secondaryText,
                    }}
                  >
                    {cat}
                    {categoryFilter === cat && (
                      <span
                        className="absolute bottom-0 left-0 w-full h-0.5"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <label
                htmlFor="sort-select"
                className="text-xs sm:text-sm whitespace-nowrap"
                style={{ color: theme.colors.secondaryText }}
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border rounded-md py-2 pl-2 pr-8 text-xs sm:text-sm font-medium w-full"
                style={{
                  color: theme.colors.accent,
                  borderColor: theme.colors.border,
                }}
              >
                <option value="featured">Featured</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          {/* Products Grid */}
          <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {currentProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </main>

          {/* Load More */}
          {currentProducts.length < filteredSorted.length && (
            <div className="mt-10 sm:mt-16 text-center">
              <button
                onClick={handleLoadMore}
                className="font-semibold py-3 px-8 rounded-lg transition-transform active:scale-[0.98]"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.surface,
                  boxShadow: theme.shadows.button,
                }}
              >
                Load More
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredSorted.length === 0 && !loading && (
            <div className="py-16 text-center col-span-full">
              <h3
                className="text-xl font-medium mb-2"
                style={{ fontFamily: theme.fonts.heading }}
              >
                No Products Found
              </h3>
              <p style={{ color: theme.colors.secondaryText }}>
                Try selecting a different category or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      <Notification message={notification.message} show={notification.show} />

      {selectedProduct && (
        <SelectionModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </>
  );
}
