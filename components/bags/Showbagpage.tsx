"use client";
import { useState, useEffect } from "react";
import { Product } from "@/server/types";
import Image from "next/image";
import {
  FunnelIcon,
  XMarkIcon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  ArrowsPointingOutIcon,
  MinusIcon, // Added for Quantity
  PlusIcon, // Added for Quantity
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon,
  ShoppingCartIcon as CartSolidIcon,
} from "@heroicons/react/24/solid";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   images: string[];
//   description: string;
//   sku: string;
//   stock: number;
//   colors: string[]; // Ensure this has color hex values
//   brand: string;
//   fabric: string;
//   rating: number;
// }

interface FilterState {
  price: number;
  colors: string[];
  brands: string[];
  fabrics: string[];
  rating: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

const ITEMS_PER_PAGE = 6; // Adjusted for better grid display, can be 8 too
const MAX_PRICE = 1000;

// --- Same product data as before, ensure image paths and colors are correct ---
const products: Product[] = [
  {
    id: 1,
    name: "Vintage Leather Tote",
    brand: "Vintage Luxe",
    category: "totes",
    price: 249.99,
    originalPrice: 349.99,
    discountPercentage: 28.6,
    rating: 4.7,
    reviews: 128,
    sku: "BGT-001",
    stock: 15,
    images: [
      "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjyse60rqydt7natt6a8.png?alt=media&token=b8425d3b-06bc-4ed2-868a-e6f6d43babf9",
      "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjytfs58a7qdy60taxcz.png?alt=media&token=f96e602f-1d0d-4852-8989-9e32702e4b66",
      "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjyvf3r8z67kmt19t9wh.png?alt=media&token=33211ab3-0c98-4b9e-af02-03fb30b68f65",
    ],
    sizes: ["Small", "Medium", "Large"],
    colors: ["#E07A5F", "#4A4A48", "#8B4513"],
    description:
      "Crafted from premium full-grain leather with solid brass hardware, the Vintage Leather Tote blends timeless style with everyday practicality. Spacious interior, structured silhouette, and reinforced handles make it the perfect companion from office to weekend getaway.",
    careInstructions:
      "Wipe clean with a soft, dry cloth. Condition leather quarterly with a quality leather conditioner. Keep away from direct heat and prolonged sunlight.",
    fabric: "100% Full-Grain Leather",
    shippingInfo:
      "Free standard shipping in India (3–5 business days). International shipping rates calculated at checkout.",
    returnPolicy:
      "30-day hassle-free returns. Item must be unworn, tags attached, and in original packaging. Return shipping covered by customer.",
    details: [
      "Dimensions: 14” W × 11” H × 5” D",
      "Interior slip pocket and zippered pocket",
      "Reinforced leather handles with 9” drop",
      "Brass zip closure and hardware",
      "Fits up to a 13” laptop",
    ],
    seo: {
      title: "Vintage Leather Tote | Premium Full-Grain Leather Handbag",
      description:
        "Shop the Vintage Leather Tote by Vintage Luxe—crafted from full-grain leather with brass hardware. Spacious, stylish, and durable. Free shipping available.",
      keywords: [
        "vintage leather tote",
        "full grain leather handbag",
        "women's leather tote",
        "premium leather bag",
        "Vintage Luxe tote",
      ],
    },
  },
];

const FiltersPanel = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}) => {
  const availableColors = Array.from(
    new Set(products.flatMap((p) => p.colors))
  ).slice(0, 10); // Show a selection
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
  const fabrics = Array.from(new Set(products.map((p) => p.fabric))).sort();
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div
      className={`fixed inset-0 z-40 bg-dark/70 backdrop-blur-md transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } md:static md:z-auto md:bg-transparent md:backdrop-blur-none md:opacity-100 md:visible md:w-72 lg:w-80`}
    >
      <div
        className={`absolute top-0 left-0 h-full w-full max-w-xs sm:max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:shadow-none md:w-full md:h-auto md:p-0`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h3 className="font-playfair text-2xl text-dark">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 text-dark hover:text-primary rounded-full hover:bg-neutral/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            aria-label="Close filters"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <h3 className="hidden md:block font-playfair text-2xl text-dark mb-6 pb-2 border-b border-neutral">
          Filters
        </h3>

        <div className="space-y-8 md:h-[calc(100vh-220px)] md:overflow-y-auto md:pr-3 md:scrollbar-thin md:scrollbar-thumb-neutral-300 md:scrollbar-track-transparent hover:md:scrollbar-thumb-neutral-400">
          {/* Price Filter */}
          <div>
            <h4 className="font-poppins font-semibold text-dark mb-3 pb-2 border-b border-neutral-200">
              Price Range
            </h4>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                value={filters.price}
                onChange={(e) =>
                  setFilters({ ...filters, price: parseInt(e.target.value) })
                }
                className="w-full accent-primary h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Price range slider"
              />
              <div className="flex justify-between text-sm font-poppins text-dark/80">
                <span>$0</span>
                <span className="font-medium text-primary">
                  ${filters.price}
                </span>
              </div>
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <h4 className="font-poppins font-semibold text-dark mb-3 pb-2 border-b border-neutral-200">
              Colors
            </h4>
            <div className="flex flex-wrap gap-3">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      colors: filters.colors.includes(color)
                        ? filters.colors.filter((c) => c !== color)
                        : [...filters.colors, color],
                    })
                  }
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    filters.colors.includes(color)
                      ? "border-primary ring-2 ring-primary ring-offset-1 scale-105"
                      : "border-neutral hover:border-dark/50"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Filter by color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="font-poppins font-semibold text-dark mb-3 pb-2 border-b border-neutral-200">
              Brands
            </h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 text-dark/90 font-poppins cursor-pointer hover:text-primary transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        brands: e.target.checked
                          ? [...filters.brands, brand]
                          : filters.brands.filter((b) => b !== brand),
                      })
                    }
                    className="w-4 h-4 accent-primary text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary focus:ring-offset-0"
                  />
                  <span className="group-hover:font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div>
            <h4 className="font-poppins font-semibold text-dark mb-3 pb-2 border-b border-neutral-200">
              Fabrics
            </h4>
            <div className="flex flex-wrap gap-2">
              {fabrics.map((fabric) => (
                <button
                  key={fabric}
                  type="button"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      fabrics: filters.fabrics.includes(fabric)
                        ? filters.fabrics.filter((f) => f !== fabric)
                        : [...filters.fabrics, fabric],
                    })
                  }
                  className={`px-4 py-1.5 rounded-full font-poppins text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    filters.fabrics.includes(fabric)
                      ? "bg-primary text-light shadow-sm"
                      : "bg-neutral/70 text-dark hover:bg-neutral hover:shadow-sm"
                  }`}
                >
                  {fabric}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-poppins font-semibold text-dark mb-3 pb-2 border-b border-neutral-200">
              Rating
            </h4>
            <div className="space-y-1.5">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      rating: filters.rating === rating ? 0 : rating,
                    })
                  }
                  className={`flex items-center gap-2 text-dark/90 w-full p-2 rounded-md hover:bg-neutral/60 transition-colors group ${
                    filters.rating === rating ? "bg-neutral/50" : ""
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
                  aria-label={`Filter by ${rating} stars and up`}
                >
                  {[...Array(5)].map((_, i) =>
                    i < rating ? (
                      <StarSolidIcon
                        key={i}
                        className={`w-5 h-5 transition-colors ${
                          filters.rating === rating
                            ? "text-accent"
                            : "text-accent/70 group-hover:text-accent"
                        }`}
                      />
                    ) : (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 transition-colors ${
                          filters.rating === rating
                            ? "text-neutral-400"
                            : "text-neutral-300 group-hover:text-neutral-400"
                        }`}
                      />
                    )
                  )}
                  <span className="text-sm font-poppins group-hover:text-dark">
                    & Up
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({
  product,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  isInCart,
  onQuickView,
}: {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (id: number) => void;
  onAddToCart: (product: Product, quantity: number) => void; // Modified to pass product and quantity
  isInCart: boolean;
  onQuickView: (product: Product) => void;
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isHovered && product.images.length > 1) {
      intervalId = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % product.images.length);
      }, 2500); // Slightly faster image rotation
    } else if (!isHovered) {
      setActiveImage(0); // Reset to first image when not hovered
    }
    return () => clearInterval(intervalId);
  }, [isHovered, product.images.length]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent quick view or other parent events
    if (product.stock > 0) {
      onAddToCart(product, 1); // Add 1 quantity by default from card
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      className="relative group/card overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-white flex flex-col justify-between cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleQuickView} // Open quick view on card click
      tabIndex={0}
    >
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        {product.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`${product.name} image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-contain rounded-t-xl transition-opacity duration-700 ease-in-out ${
              index === activeImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Gradient overlay for better text visibility if needed, or remove if images are light */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" /> */}

        <div className="absolute top-3 right-3 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={handleWishlistToggle}
            className="p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-secondary hover:text-light transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isWishlisted ? (
              <HeartSolidIcon className="w-5 h-5 text-secondary" />
            ) : (
              <HeartIcon className="w-5 h-5 text-dark/70" />
            )}
          </button>

          <button
            type="button"
            onClick={handleQuickView}
            className="p-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-accent hover:text-light transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
            aria-label="Quick view"
          >
            <ArrowsPointingOutIcon className="w-5 h-5 text-dark/70" />
          </button>
        </div>
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-dark/70 text-light text-xs font-semibold px-2.5 py-1 rounded-full">
            SOLD OUT
          </div>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-3 left-3 bg-secondary/80 text-light text-xs font-semibold px-2.5 py-1 rounded-full">
            LOW STOCK
          </div>
        )}
      </div>

      <div className="p-4_5 flex flex-col flex-grow">
        <h3
          className="font-playfair text-xl text-dark mb-1.5 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="font-poppins text-dark/60 text-xs mb-2 uppercase tracking-wide">
          {product.brand}
        </p>

        <div className="mt-auto">
          {" "}
          {/* Pushes price and button to the bottom */}
          <div className="flex justify-between items-center mb-3">
            <p className="font-poppins text-primary text-xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) =>
                i < product.rating ? (
                  <StarSolidIcon key={i} className="w-4 h-4 text-accent" />
                ) : (
                  <StarIcon key={i} className="w-4 h-4 text-neutral-300" />
                )
              )}
              <span className="text-xs text-dark/60 ml-1">
                ({product.rating})
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isInCart || product.stock === 0}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-poppins text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed
              ${
                isInCart
                  ? "bg-accent text-light focus:ring-accent/70"
                  : product.stock === 0
                  ? "bg-neutral text-dark/50 focus:ring-neutral"
                  : "bg-primary text-light hover:bg-primary/90 focus:ring-primary"
              }`}
          >
            {isInCart ? (
              <CartSolidIcon className="w-5 h-5" />
            ) : (
              <ShoppingCartIcon className="w-5 h-5" />
            )}
            <span>
              {product.stock === 0
                ? "Out of Stock"
                : isInCart
                ? "Added to Cart"
                : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted, // Added
  onWishlistToggle, // Added
  cartItems, // Added to check if item is in cart
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: (id: number) => boolean; // Added
  onWishlistToggle: (id: number) => void; // Added
  cartItems: Array<{ id: number; quantity: number }>; // Added
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
      // Find the item in the cart to pre-fill quantity if it exists
      const cartItem = cartItems.find((item) => item.id === product.id);
      setQuantity(cartItem ? cartItem.quantity : 1);
    }
  }, [product, cartItems]);

  if (!isOpen || !product) return null;

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + amount, product.stock)));
  };

  const handleModalAddToCart = () => {
    if (product.stock > 0) {
      onAddToCart(product, quantity);
      // Optionally close the modal or show a confirmation
      // onClose();
    }
  };

  const handleModalWishlistToggle = () => {
    onWishlistToggle(product.id);
  };

  return (
    <div className="fixed inset-0 bg-dark/70 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row relative max-h-[90vh] overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-5 md:right-5 z-10 p-2 text-dark/70 hover:text-primary rounded-full hover:bg-neutral/50 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close quick view"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 p-4 md:p-6 flex flex-col items-center justify-center bg-neutral-50 rounded-l-xl">
          <div className="relative w-full aspect-square max-h-[400px] md:max-h-full">
            <Image
              src={product.images[currentImageIndex]}
              alt={`${product.name} image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary
                    ${
                      index === currentImageIndex
                        ? "bg-primary scale-125"
                        : "bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 md:p-8 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
          <h2 className="font-playfair text-3xl lg:text-4xl text-dark leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center justify-between">
            <p className="font-poppins text-2xl lg:text-3xl text-primary font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) =>
                i < product.rating ? (
                  <StarSolidIcon key={i} className="w-5 h-5 text-accent" />
                ) : (
                  <StarIcon key={i} className="w-5 h-5 text-neutral-300" />
                )
              )}
              <span className="text-sm text-dark/70">
                ({product.rating} Review{product.rating === 1 ? "" : "s"})
              </span>
            </div>
          </div>

          <p className="font-poppins text-dark/80 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-poppins pt-2">
            <div>
              <h4 className="font-semibold text-dark">Brand:</h4>
              <p className="text-dark/80">{product.brand}</p>
            </div>
            <div>
              <h4 className="font-semibold text-dark">Fabric:</h4>
              <p className="text-dark/80">{product.fabric}</p>
            </div>
            <div>
              <h4 className="font-semibold text-dark">SKU:</h4>
              <p className="text-dark/80">{product.sku}</p>
            </div>
            <div>
              <h4 className="font-semibold text-dark">Availability:</h4>
              <p
                className={`font-medium ${
                  product.stock > 0
                    ? product.stock > 5
                      ? "text-accent"
                      : "text-secondary"
                    : "text-neutral-500"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of Stock"}
              </p>
            </div>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div>
              <h4 className="font-poppins font-semibold text-dark mb-1.5 text-sm">
                Colors:
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-6 h-6 rounded-full border border-neutral-300"
                    title={color}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          {product.stock > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4 items-stretch">
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2.5 text-dark/70 hover:text-primary disabled:opacity-50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded-l-md"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span
                  className="px-4 py-2 text-dark font-medium w-12 text-center"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2.5 text-dark/70 hover:text-primary disabled:opacity-50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded-r-md"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleModalAddToCart}
                disabled={product.stock === 0} // Disabled if out of stock
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-poppins font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed
                    ${
                      isInCart
                        ? "bg-accent text-light focus:ring-accent/70" // Different style if already in cart
                        : "bg-primary text-light hover:bg-primary/90 focus:ring-primary"
                    }`}
              >
                {product.stock === 0 ? (
                  <ShoppingCartIcon className="w-5 h-5" /> // Still show cart icon even if out of stock
                ) : isInCart ? (
                  <CartSolidIcon className="w-5 h-5" />
                ) : (
                  <ShoppingCartIcon className="w-5 h-5" />
                )}
                <span>
                  {product.stock === 0
                    ? "Out of Stock"
                    : isInCart
                    ? "Update Cart" // Indicate quantity is being updated
                    : "Add to Cart"}
                </span>
              </button>
            </div>
          )}
          {product.stock === 0 && (
            <p className="font-poppins text-lg text-secondary font-semibold pt-4">
              Currently Out of Stock
            </p>
          )}

          <button
            type="button"
            onClick={handleModalWishlistToggle}
            className="w-full flex items-center justify-center gap-2 mt-3 px-6 py-3 rounded-lg font-poppins text-sm font-medium border border-neutral-300 text-dark/80 hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          >
            {isWishlisted(product.id) ? (
              <HeartSolidIcon className="w-5 h-5 text-secondary" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            <span>
              {isWishlisted(product.id)
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const PaginationControls = ({
  pagination,
  onPageChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-12 md:mt-16">
    <button
      type="button"
      onClick={() => onPageChange(pagination.currentPage - 1)}
      disabled={pagination.currentPage === 1}
      className="px-5 py-2.5 bg-white border border-neutral-300 text-dark/80 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 text-sm font-medium"
    >
      Previous
    </button>

    <span className="font-poppins text-sm text-dark/70 px-3 py-2 bg-neutral-100 rounded-md">
      Page {pagination.currentPage} of {pagination.totalPages}
    </span>

    <button
      type="button"
      onClick={() => onPageChange(pagination.currentPage + 1)}
      disabled={pagination.currentPage === pagination.totalPages}
      className="px-5 py-2.5 bg-white border border-neutral-300 text-dark/80 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 text-sm font-medium"
    >
      Next
    </button>
  </div>
);

const BagsCollection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    price: MAX_PRICE,
    colors: [],
    brands: [],
    fabrics: [],
    rating: 0,
  });
  const [wishlist, setWishlist] = useState<number[]>([]);
  // Cart now stores {id, quantity}
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: Math.ceil(products.length / ITEMS_PER_PAGE),
  });
  const [apiState, setApiState] = useState<ApiResponse<Product[]>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setApiState((prev) => ({ ...prev, loading: true, error: null }));
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API
      try {
        setApiState({ data: products, loading: false, error: null });
      } catch (error) {
        setApiState({
          data: [],
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch products",
        });
      }
    };
    fetchProducts();
  }, []);

  // Apply filters and pagination
  const filteredProducts = apiState.data.filter((product) => {
    const priceMatch = product.price <= filters.price;
    const colorMatch =
      filters.colors.length === 0 ||
      product.colors.some((color) => filters.colors.includes(color));
    const brandMatch =
      filters.brands.length === 0 || filters.brands.includes(product.brand);
    const fabricMatch =
      filters.fabrics.length === 0 || filters.fabrics.includes(product.fabric);
    const ratingMatch =
      filters.rating === 0 || product.rating >= filters.rating;

    return priceMatch && colorMatch && brandMatch && fabricMatch && ratingMatch;
  });

  useEffect(() => {
    // Reset pagination when filters change
    setPagination({
      currentPage: 1,
      totalPages: Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
    });
  }, [filteredProducts.length]);

  const paginatedProducts = filteredProducts.slice(
    (pagination.currentPage - 1) * ITEMS_PER_PAGE,
    pagination.currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    }
  };

  const handleWishlistToggle = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // This function now handles adding a product with a specific quantity
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Item already in cart, update quantity
        // Ensure quantity does not exceed stock
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock
        );
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // Item not in cart, add it
        // Ensure quantity does not exceed stock (though modal handles this, card adds 1)
        const newQuantity = Math.min(quantity, product.stock);
        if (newQuantity > 0) {
          return [...prevCart, { id: product.id, quantity: newQuantity }];
        } else {
          // Cannot add if stock is 0
          return prevCart;
        }
      }
    });
  };

  const isProductWishlisted = (id: number) => wishlist.includes(id);
  const isProductInCart = (id: number) => cart.some((item) => item.id === id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8 md:mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl text-dark">
          Bags Collection
        </h1>
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className="md:hidden p-2 text-dark hover:text-primary rounded-full hover:bg-neutral/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          aria-label="Show filters"
        >
          <FunnelIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Panel (Desktop & Mobile Modal) */}
        <FiltersPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Product Grid */}
        <div className="flex-1">
          {apiState.loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-pulse">
              {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                <div
                  key={index}
                  className="bg-neutral-100 rounded-xl shadow-lg h-96"
                ></div>
              ))}
            </div>
          )}

          {apiState.error && (
            <div className="text-center text-secondary font-poppins text-lg">
              Error: {apiState.error}
            </div>
          )}

          {!apiState.loading && !apiState.error && (
            <>
              {paginatedProducts.length === 0 ? (
                <div className="text-center text-dark/70 font-poppins text-lg">
                  No products match your filter criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={isProductWishlisted(product.id)}
                      onWishlistToggle={handleWishlistToggle}
                      onAddToCart={handleAddToCart} // Pass the modified handler
                      isInCart={isProductInCart(product.id)}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              )}

              {filteredProducts.length > ITEMS_PER_PAGE && (
                <PaginationControls
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart} // Pass the modified handler
        isWishlisted={isProductWishlisted}
        onWishlistToggle={handleWishlistToggle}
        cartItems={cart} // Pass cart items to check if product is in cart in modal
      />
    </div>
  );
};

export default BagsCollection;
