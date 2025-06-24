"use client";
import { useState, useEffect, useCallback } from "react";
import {
  FiGrid,
  FiList,
  FiHeart,
  FiEye,
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { BsFillLightningFill, BsChevronRight } from "react-icons/bs";
import { KurtiCarousel } from "../KurtiGrid/KurtiCaru";

// Type definitions
type AccordionSection = "price" | "colors" | "fabrics" | "flags";
type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

interface Product {
  id: string;
  rating: number;
  reviews: number;
  name: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  careInstructions?: string;
  fabric: string;
  shippingInfo?: string;
  returnPolicy?: string;
  details: string[];
  brand: string;
  category?: string;
  sku?: string;
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
}

interface FilterSectionProps {
  setShowMobileFilters: (show: boolean) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  openSections: Record<AccordionSection, boolean>;
  toggleSection: (section: AccordionSection) => void;
  maxPrice: number;
  priceRange: number;
  setPriceRange: (value: number) => void;
  selectedColors: string[];
  handleColorSelect: (color: string) => void;
  selectedFabrics: string[];
  handleFabricSelect: (fabric: string, checked: boolean) => void;
  isNewFilter: boolean;
  setIsNewFilter: (value: boolean) => void;
  isTrendingFilter: boolean;
  setIsTrendingFilter: (value: boolean) => void;
  availableColors: string[];
  availableFabrics: string[];
  clearAllFilters: () => void;
}

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

interface ColorOptionProps {
  color: string;
  selected: boolean;
  onSelect: () => void;
}

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductGrid({ params }: { params: string }) {
  // State management
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isNewFilter, setIsNewFilter] = useState(false);
  const [isTrendingFilter, setIsTrendingFilter] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableFabrics, setAvailableFabrics] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [openSections, setOpenSections] = useState<
    Record<AccordionSection, boolean>
  >({
    price: true,
    colors: false,
    fabrics: false,
    flags: false,
  });

  // Fetch products
  useEffect(() => {
    async function fetchKurti() {
      try {
        const response = await fetch("/api/fetchKurti");
        if (!response.ok) {
          console.error("Failed to fetch products", response.status);
          return;
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchKurti();
  }, []);

  // Initialize filters and options
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const computedMax = Math.max(...prices);
      setMaxPrice(computedMax);
      setPriceRange(computedMax);

      const colorsSet = new Set<string>();
      const fabricsSet = new Set<string>();
      products.forEach((p) => {
        p.colors.forEach((c) => colorsSet.add(c));
        fabricsSet.add(p.fabric);
      });
      setAvailableColors(Array.from(colorsSet));
      setAvailableFabrics(Array.from(fabricsSet));

      setFilteredProducts(products);
    }
  }, [products]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setPriceRange(maxPrice);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setIsNewFilter(false);
    setIsTrendingFilter(false);
    setOpenSections({
      price: true,
      colors: false,
      fabrics: false,
      flags: false,
    });
  }, [maxPrice]);

  // Apply filters and sorting
  useEffect(() => {
    if (products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    // Apply filters
    if (priceRange !== maxPrice) {
      filtered = filtered.filter((p) => p.price <= priceRange);
    }
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color))
      );
    }
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter((p) => selectedFabrics.includes(p.fabric));
    }
    if (isNewFilter) {
      filtered = filtered.filter((p) => p.isNew);
    }
    if (isTrendingFilter) {
      filtered = filtered.filter((p) => p.isTrending);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default: // featured
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [
    products,
    priceRange,
    maxPrice,
    selectedColors,
    selectedFabrics,
    isNewFilter,
    isTrendingFilter,
    sortOption,
  ]);

  // Handlers
  const handleBuyNow = (productId: string) => {
    console.log(`Buying product ${productId} now`);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log(`Added product ${productId} to wishlist`);
  };

  const handleViewFullProduct = (productId: string) => {
    window.open(`/Kurti/${productId}`, "_blank", "noopener,noreferrer");
  };

  const calculateDiscount = (
    original: number,
    current: number
  ): string | null => {
    if (original > current) {
      return `${Math.round(((original - current) / original) * 100)}% off`;
    }
    return null;
  };

  // Toggle accordion sections
  const toggleSection = (section: AccordionSection) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleColorSelect = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleFabricSelect = (fabric: string, checked: boolean) => {
    setSelectedFabrics((prev) =>
      checked ? [...prev, fabric] : prev.filter((f) => f !== fabric)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Mobile: Filter header */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 shadow-sm"
          >
            <FiFilter className="w-4 h-4" /> Filters
            {(selectedColors.length > 0 ||
              selectedFabrics.length > 0 ||
              isNewFilter ||
              isTrendingFilter ||
              priceRange < maxPrice) && (
              <span className="w-2 h-2 bg-primary rounded-full"></span>
            )}
          </button>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
            <div className="bg-white w-full max-w-md ml-auto h-full p-4 overflow-auto">
              <FilterSection
                setShowMobileFilters={setShowMobileFilters}
                sortOption={sortOption}
                setSortOption={setSortOption}
                openSections={openSections}
                toggleSection={toggleSection}
                maxPrice={maxPrice}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedColors={selectedColors}
                handleColorSelect={handleColorSelect}
                selectedFabrics={selectedFabrics}
                handleFabricSelect={handleFabricSelect}
                isNewFilter={isNewFilter}
                setIsNewFilter={setIsNewFilter}
                isTrendingFilter={isTrendingFilter}
                setIsTrendingFilter={setIsTrendingFilter}
                availableColors={availableColors}
                availableFabrics={availableFabrics}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-full md:w-72 sticky top-24 self-start">
          <FilterSection
            setShowMobileFilters={setShowMobileFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
            openSections={openSections}
            toggleSection={toggleSection}
            maxPrice={maxPrice}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedColors={selectedColors}
            handleColorSelect={handleColorSelect}
            selectedFabrics={selectedFabrics}
            handleFabricSelect={handleFabricSelect}
            isNewFilter={isNewFilter}
            setIsNewFilter={setIsNewFilter}
            isTrendingFilter={isTrendingFilter}
            setIsTrendingFilter={setIsTrendingFilter}
            availableColors={availableColors}
            availableFabrics={availableFabrics}
            clearAllFilters={clearAllFilters}
          />
        </aside>

        {/* Products Section */}
        <section className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              {params}
              <span className="text-gray-500 text-base font-normal ml-2">
                ({filteredProducts.length} products)
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-gray-700">
                {filteredProducts.length} products
              </div>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 transition-colors ${
                    isGridView
                      ? "bg-primary text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                  aria-label="Grid view"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 transition-colors ${
                    !isGridView
                      ? "bg-primary text-white"
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                  aria-label="List view"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active filters bar */}
          {(selectedColors.length > 0 ||
            selectedFabrics.length > 0 ||
            isNewFilter ||
            isTrendingFilter ||
            priceRange < maxPrice) && (
            <div className="mb-6 bg-white p-3 rounded-lg border border-gray-200 flex flex-wrap gap-2">
              <span className="text-sm text-gray-700">Active filters:</span>

              {priceRange < maxPrice && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Under ₹{priceRange}
                  <button
                    onClick={() => setPriceRange(maxPrice)}
                    className="ml-1.5 text-primary hover:text-primary/70"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedColors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {color}
                  <button
                    onClick={() =>
                      setSelectedColors(
                        selectedColors.filter((c) => c !== color)
                      )
                    }
                    className="ml-1.5 text-primary hover:text-primary/70"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedFabrics.map((fabric) => (
                <span
                  key={fabric}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {fabric}
                  <button
                    onClick={() =>
                      setSelectedFabrics(
                        selectedFabrics.filter((f) => f !== fabric)
                      )
                    }
                    className="ml-1.5 text-primary hover:text-primary/70"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {isNewFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  New Arrivals
                  <button
                    onClick={() => setIsNewFilter(false)}
                    className="ml-1.5 text-primary hover:text-primary/70"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {isTrendingFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Trending
                  <button
                    onClick={() => setIsTrendingFilter(false)}
                    className="ml-1.5 text-primary hover:text-primary/70"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="ml-auto text-sm text-gray-600 hover:text-primary flex items-center"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Listing */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <FiFilter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to find what you&apos;re looking
                  for
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`grid gap-6 ${
                  isGridView
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className={`group bg-white rounded-xl overflow-hidden relative border border-gray-200 hover:shadow-md transition-shadow ${
                      !isGridView ? "sm:flex" : ""
                    }`}
                  >
                    <div
                      className={`relative cursor-pointer ${
                        isGridView ? "aspect-square" : "sm:w-1/3"
                      }`}
                      onClick={() => handleViewFullProduct(product.id)}
                    >
                      <KurtiCarousel images={product.images} />
                      <div className="absolute top-3 left-3 right-3 flex justify-between">
                        {product.isNew && (
                          <span className="bg-accent text-white px-2.5 py-1 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                        {calculateDiscount(
                          product.originalPrice,
                          product.price
                        ) && (
                          <span className="bg-secondary text-white px-2.5 py-1 rounded-full text-xs font-medium">
                            {calculateDiscount(
                              product.originalPrice,
                              product.price
                            )}
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToWishlist(product.id);
                          }}
                          className="p-2.5 bg-white rounded-full text-gray-700 hover:text-primary transition-colors shadow-md"
                          aria-label="Add to wishlist"
                        >
                          <FiHeart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNow(product.id);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-sm font-medium shadow-md"
                        >
                          <BsFillLightningFill className="w-4 h-4" /> Buy Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFullProduct(product.id);
                          }}
                          className="p-2.5 bg-white rounded-full text-gray-700 hover:text-primary transition-colors shadow-md"
                          aria-label="View product"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className={`p-4 ${!isGridView ? "sm:w-2/3" : ""}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToWishlist(product.id)}
                          className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                          aria-label="Add to wishlist"
                        >
                          <FiHeart className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-gray-900">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-400 text-sm line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Sizes</p>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.map((size) => (
                              <span
                                key={size}
                                className="px-2 py-0.5 text-xs border border-gray-300 rounded"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Colors</p>
                          <div className="flex gap-1">
                            {product.colors.map((color, idx) => (
                              <span
                                key={idx}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-600">
                            Fabric:{" "}
                            <span className="font-medium">
                              {product.fabric}
                            </span>
                          </span>
                          <button
                            onClick={() => handleViewFullProduct(product.id)}
                            className="text-xs font-medium text-primary flex items-center"
                          >
                            View details{" "}
                            <BsChevronRight className="ml-1 w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing 1-{filteredProducts.length} of{" "}
                  {filteredProducts.length} products
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    ← Previous
                  </button>
                  <button className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    2
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    3
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

// FilterSection component with TypeScript types
const FilterSection = ({
  setShowMobileFilters,
  sortOption,
  setSortOption,
  openSections,
  toggleSection,
  maxPrice,
  priceRange,
  setPriceRange,
  selectedColors,
  handleColorSelect,
  selectedFabrics,
  handleFabricSelect,
  isNewFilter,
  setIsNewFilter,
  isTrendingFilter,
  setIsTrendingFilter,
  availableColors,
  availableFabrics,
  clearAllFilters,
}: FilterSectionProps) => (
  <div className="space-y-5 p-5 bg-neutral-50 rounded-xl border border-neutral-200 font-poppins shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
      <h2 className="text-xl font-bold text-dark font-playfair tracking-tight">
        Product Filters
      </h2>
      <button
        className="md:hidden text-secondary hover:text-primary transition-colors"
        onClick={() => setShowMobileFilters(false)}
        aria-label="Close filters"
      >
        <FiX className="w-6 h-6" />
      </button>
    </div>

    {/* Sorting */}
    <div className="pb-4">
      <label className="block text-base font-medium text-dark mb-2">
        Sort By
      </label>
      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="w-full py-2.5 pl-4 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary/70 focus:border-transparent bg-white text-dark text-sm transition-all"
        >
          <option value="featured">Featured Products</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">New Arrivals</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <FiChevronDown className="w-4 h-4 text-secondary" />
        </div>
      </div>
    </div>

    {/* Accordion Sections */}
    <div className="space-y-4">
      {/* Price Range */}
      <AccordionSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm text-secondary">
            <span>₹0</span>
            <span>₹{maxPrice}</span>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="mt-3 flex justify-between items-center bg-primary/5 p-3 rounded-md">
            <span className="text-sm text-secondary">Selected Range:</span>
            <span className="text-base font-medium text-dark">
              ₹0 - ₹{priceRange}
            </span>
          </div>
        </div>
      </AccordionSection>

      {/* Colors */}
      <AccordionSection
        title="Colors"
        isOpen={openSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        <div className="mt-4 grid grid-cols-4 gap-3">
          {availableColors.map((color) => (
            <ColorOption
              key={color}
              color={color}
              selected={selectedColors.includes(color)}
              onSelect={() => handleColorSelect(color)}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Fabrics */}
      <AccordionSection
        title="Fabrics"
        isOpen={openSections.fabrics}
        onToggle={() => toggleSection("fabrics")}
      >
        <div className="mt-4 space-y-3">
          {availableFabrics.map((fabric) => (
            <CheckboxOption
              key={fabric}
              label={fabric}
              checked={selectedFabrics.includes(fabric)}
              onChange={(e) => handleFabricSelect(fabric, e.target.checked)}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Tags */}
      <AccordionSection
        title="Special Tags"
        isOpen={openSections.flags}
        onToggle={() => toggleSection("flags")}
      >
        <div className="mt-4 space-y-3">
          <CheckboxOption
            label="New Arrivals"
            checked={isNewFilter}
            onChange={(e) => setIsNewFilter(e.target.checked)}
          />
          <CheckboxOption
            label="Trending Now"
            checked={isTrendingFilter}
            onChange={(e) => setIsTrendingFilter(e.target.checked)}
          />
        </div>
      </AccordionSection>
    </div>

    {/* Action Buttons */}
    <div className="pt-4 flex flex-col sm:flex-row gap-3">
      <button
        onClick={clearAllFilters}
        className="py-2.5 px-4 text-base font-medium text-dark border border-neutral-300 rounded-lg hover:bg-neutral-100 transition flex items-center justify-center"
      >
        Reset All
      </button>
      <button
        onClick={() => setShowMobileFilters(false)}
        className="py-2.5 px-4 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition md:hidden flex items-center justify-center"
      >
        Apply Filters
      </button>
    </div>
  </div>
);

// Reusable Accordion Component
const AccordionSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) => (
  <div className="border-b border-neutral-200 last:border-0 pb-4">
    <button
      className="w-full flex items-center justify-between py-2 text-left group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-base font-medium text-dark group-hover:text-primary transition-colors">
        {title}
      </span>
      {isOpen ? (
        <FiChevronUp className="w-5 h-5 text-secondary" />
      ) : (
        <FiChevronDown className="w-5 h-5 text-secondary" />
      )}
    </button>

    {isOpen && <div className="pt-3 animate-fadeIn">{children}</div>}
  </div>
);

// Reusable Color Option Component
const ColorOption = ({ color, selected, onSelect }: ColorOptionProps) => (
  <button
    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
      selected
        ? "border-primary shadow-sm bg-primary/10"
        : "border-neutral-300 hover:border-primary"
    }`}
    onClick={onSelect}
    aria-label={`Select ${color} color`}
  >
    <div
      className="w-5 h-5 rounded-full mb-1 border border-neutral-300"
      style={{ backgroundColor: color.toLowerCase() }}
    />
    <span
      className={`text-xs ${
        selected ? "text-primary font-medium" : "text-dark"
      }`}
    >
      {color}
    </span>
  </button>
);

// Reusable Checkbox Component
const CheckboxOption = ({ label, checked, onChange }: CheckboxOptionProps) => (
  <label className="flex items-center cursor-pointer group">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${
          checked
            ? "bg-primary border-primary"
            : "border-neutral-300 group-hover:border-primary"
        }`}
      >
        {checked && <FiCheck className="w-4 h-4 text-white" />}
      </div>
      <span className="ml-3 text-sm text-dark group-hover:text-primary transition-colors">
        {label}
      </span>
    </div>
  </label>
);
