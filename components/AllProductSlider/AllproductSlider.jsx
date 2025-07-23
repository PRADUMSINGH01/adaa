import React, { useState, useMemo, useEffect } from "react";
import { KurtiCarousel } from "../KurtiGrid/KurtiCaru";
// --- Helper Components & Icons ---
const HeartIcon = ({ className = "w-6 h-6", isFilled = false }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill={isFilled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);
const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
  </svg>
);
const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
const MinusIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

// --- Theme ---
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
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <div className="w-full md:w-1/2 h-80 md:h-auto bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="flex-grow">
            <p
              className="text-sm uppercase tracking-widest"
              style={{ color: theme.colors.secondaryText }}
            >
              {product.category}
            </p>
            <h2
              className="text-3xl lg:text-4xl mt-1"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.colors.accent,
              }}
            >
              {product.name}
            </h2>
            <div className="mt-4 flex items-baseline gap-3">
              <p
                className="text-3xl font-medium"
                style={{ color: theme.colors.accent }}
              >
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p
                  className="text-lg line-through"
                  style={{ color: theme.colors.secondaryText }}
                >
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            {/* Color selection */}
            <div className="mt-8">
              <h3
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: theme.colors.secondaryText }}
              >
                Color
              </h3>
              <div className="flex items-center gap-3 mt-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-8 h-8 rounded-full border-2 transition-all duration-200"
                    style={{
                      backgroundColor: color,
                      borderColor:
                        selectedColor === color
                          ? theme.colors.primary
                          : "transparent",
                    }}
                  >
                    {selectedColor === color && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Size selection */}
            <div className="mt-8">
              <h3
                className="text-sm font-medium uppercase tracking-wider"
                style={{ color: theme.colors.secondaryText }}
              >
                Size
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2 rounded-md border text-sm font-medium transition-colors duration-200"
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
          <div className="mt-8 flex items-center gap-4">
            <div
              className="flex items-center border rounded-md"
              style={{ borderColor: theme.colors.border }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3"
              >
                <MinusIcon />
              </button>
              <span className="px-4 text-lg font-medium">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="p-3">
                <PlusIcon />
              </button>
            </div>
            <button
              onClick={handleConfirm}
              disabled={!selectedSize}
              className="flex-1 text-white font-semibold py-3 px-4 rounded-lg"
              style={{
                backgroundColor: theme.colors.primary,
                opacity: !selectedSize ? 0.5 : 1,
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
const ProductCard = ({
  product,
  onQuickAdd,
  onToggleWishlist,
  isWishlisted,
}) => (
  <div className="group relative flex flex-col text-center">
    <div className="relative overflow-hidden rounded-md">
      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/60 rounded-full hover:text-red-500"
      >
        <HeartIcon
          isFilled={isWishlisted}
          className={isWishlisted ? "text-red-500" : ""}
        />
      </button>
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2 items-start">
        {product.isNew && (
          <span
            className="bg-white/80 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ color: theme.colors.accent }}
          >
            NEW
          </span>
        )}
        {product.originalPrice && (
          <span
            className="bg-white/80 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ color: theme.colors.sale }}
          >
            SALE
          </span>
        )}
      </div>
      <div className="w-full aspect-[3/4]">
        <KurtiCarousel images={product.images} />
      </div>
      <button
        onClick={() => onQuickAdd(product)}
        className=" z-50 absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] bg-white/90 py-2.5 px-4 rounded-lg opacity-0 group-hover:opacity-100"
      >
        Quick Add
      </button>
    </div>
    <div className="pt-4 flex-grow flex flex-col">
      <h3
        className="text-base font-medium"
        style={{ color: theme.colors.accent }}
      >
        {product.name}
      </h3>
      <div className="flex-grow mt-2 flex justify-center items-center gap-2">
        {product.colors.map((color) => (
          <span
            key={color}
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: color, borderColor: theme.colors.border }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center items-baseline gap-2">
        <p
          className="text-lg font-semibold"
          style={{ color: theme.colors.primary }}
        >
          ₹{product.price.toFixed(2)}
        </p>
        {product.originalPrice && (
          <p
            className="text-sm line-through"
            style={{ color: theme.colors.secondaryText }}
          >
            ₹{product.originalPrice.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  </div>
);

// --- Notification ---
const Notification = ({ message, show }) => (
  <div
    className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-lg py-3 px-6 transition-all duration-300 ${
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ color: theme.colors.accent }}
  >
    <p className="font-medium">{message}</p>
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
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    show: false,
  });
  const [visiblePages, setVisiblePages] = useState(1);
  const productsPerPage = 8;

  // Fetch + Cache
  useEffect(() => {
    const cacheKey = "kurties_cache";
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setKurties(data);
          return;
        }
      } catch {}
    }
    setLoading(true);
    fetch("/api/fetchKurti")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setKurties(data);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data })
        );
      })
      .catch((err) => setError("Fetch error"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(kurties.map((p) => p.category))],
    [kurties]
  );
  const filteredSorted = useMemo(
    () =>
      kurties
        .filter(
          (p) => categoryFilter === "All" || p.category === categoryFilter
        )
        .sort((a, b) => {
          if (sortOption === "price-low") return a.price - b.price;
          if (sortOption === "price-high") return b.price - a.price;
          if (sortOption === "new")
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
          return a.id - b.id;
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
  const handleToggleWishlist = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
    );
  const handleConfirmPurchase = (details) => {
    setCart((c) => [...c, details]);
    showNotification(`${details.productName} added to your bag!`);
  };
  const handleLoadMore = () => setVisiblePages((v) => v + 1);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@400;500;600&display=swap');
      `}</style>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: theme.colors.background,
          fontFamily: theme.fonts.body,
          color: theme.colors.accent,
        }}
      >
        <div className="container mx-auto px-4 py-16">
          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div
              className="flex flex-wrap justify-center gap-x-2 border-b"
              style={{ borderColor: theme.colors.border }}
            >
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setCategoryFilter(cat)}
                  className="relative px-3 py-3 text-sm font-medium"
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
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-sm"
                style={{ color: theme.colors.secondaryText }}
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border rounded-md py-1.5 pl-2 pr-8 text-sm font-medium"
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
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {currentProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickAdd={setSelectedProduct}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(prod.id)}
              />
            ))}
          </main>
          {/* Load More */}
          {currentProducts.length < filteredSorted.length && (
            <div className="mt-16 text-center">
              <button
                onClick={handleLoadMore}
                className="font-semibold py-3 px-8 rounded-lg"
                style={{
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.surface,
                }}
              >
                Load More
              </button>
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
