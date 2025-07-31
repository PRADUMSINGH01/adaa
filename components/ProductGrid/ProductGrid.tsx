"use client";
import { useState, useEffect, useCallback } from "react";
import { FiFilter, FiX, FiChevronUp, FiCheck } from "react-icons/fi";
import { KurtiCarousel } from "../KurtiGrid/KurtiCaru";

// --- CONSTANTS ---
const PRODUCTS_PER_PAGE = 20;

// --- TYPE DEFINITIONS (Unchanged) ---
type AccordionSection = "price" | "colors" | "fabrics" | "flags";
type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

interface Product {
  id: string;
  Slug: string;
  rating: number;
  reviews: number;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  fabric: string;
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

// --- MAIN COMPONENT: ProductGrid ---
// This version now includes a "Load More" button and pagination logic.
export default function ProductGrid({ params }: { params: string }) {
  // --- STATE ---
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState<Product[]>([]); // All products from API
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // All products that match filters
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [isNewFilter, setIsNewFilter] = useState(false);
  const [isTrendingFilter, setIsTrendingFilter] = useState(false);
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableFabrics, setAvailableFabrics] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  // New State for "Load More" functionality
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [openSections, setOpenSections] = useState<
    Record<AccordionSection, boolean>
  >({
    price: true,
    colors: true,
    fabrics: false,
    flags: false,
  });

  // --- DATA FETCHING & INITIALIZATION (Unchanged) ---
  useEffect(() => {
    async function fetchKurti() {
      try {
        const response = await fetch("/api/fetchKurti");
        const data: Product[] = await response.json();
        setProducts(data);
        setIsGridView(true);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchKurti();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const computedMax = Math.ceil(Math.max(...prices) / 1000) * 1000;
      setMaxPrice(computedMax);
      setPriceRange(computedMax);
      const colorsSet = new Set<string>();
      const fabricsSet = new Set<string>();
      products.forEach((p) => {
        p.colors.forEach((c) => colorsSet.add(c.toLowerCase()));
        fabricsSet.add(p.fabric);
      });
      setAvailableColors(Array.from(colorsSet));
      setAvailableFabrics(Array.from(fabricsSet));
    }
  }, [products]);

  // --- FILTERING AND SORTING LOGIC ---
  useEffect(() => {
    // This effect runs whenever filters or the base product list change.
    if (products.length === 0) return;

    // Start with all products
    let filtered = [...products];

    // Apply all filters
    if (priceRange !== maxPrice)
      filtered = filtered.filter((p) => p.price <= priceRange);
    if (selectedColors.length > 0)
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color.toLowerCase()))
      );
    if (selectedFabrics.length > 0)
      filtered = filtered.filter((p) => selectedFabrics.includes(p.fabric));
    if (isNewFilter) filtered = filtered.filter((p) => p.isNew);
    if (isTrendingFilter) filtered = filtered.filter((p) => p.isTrending);

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
        default:
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      }
    });

    // Update the full list of filtered products
    setFilteredProducts(filtered);

    // **IMPORTANT**: Reset the visible count to the initial page size
    // whenever the filters change, so the user starts from the top.
    setVisibleCount(PRODUCTS_PER_PAGE);
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

  // --- HANDLERS ---
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate a network delay for a smoother user experience
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + PRODUCTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 500);
  };

  const clearAllFilters = useCallback(() => {
    setPriceRange(maxPrice);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setIsNewFilter(false);
    setIsTrendingFilter(false);
  }, [maxPrice]);

  const handleViewFullProduct = (productId: string) =>
    window.open(`/Kurti/${productId}`, "_blank", "noopener,noreferrer");
  const toggleSection = (section: AccordionSection) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  const handleColorSelect = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  const handleFabricSelect = (fabric: string, checked: boolean) =>
    setSelectedFabrics((prev) =>
      checked ? [...prev, fabric] : prev.filter((f) => f !== fabric)
    );
  const hasActiveFilters =
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    isNewFilter ||
    isTrendingFilter ||
    priceRange < maxPrice;

  return (
    <div className="font-poppins bg-light text-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair tracking-tight">
              {params}
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-20">
            {/* --- Sidebar / Mobile Trigger --- */}
            <aside className="lg:w-72 shrink-0">
              <div className="lg:hidden flex justify-between items-center mb-6 pb-6 border-b border-neutral">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FiFilter /> Filter & Sort
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </button>
                <div className="text-sm text-dark/60">
                  {filteredProducts.length} Results
                </div>
              </div>
              <div className="hidden lg:block">
                <FilterSection
                  setShowMobileFilters={setShowMobileFilters}
                  {...{
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
                  }}
                />
              </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1">
              {/* Active filters bar (unchanged) */}
              {hasActiveFilters && (
                <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="text-sm font-medium mr-2">Applied:</h3>
                  {priceRange < maxPrice && (
                    <span className="inline-flex items-center text-sm text-dark/80">
                      Price: Under ₹{priceRange}
                      <button
                        onClick={() => setPriceRange(maxPrice)}
                        className="ml-1.5 hover:text-primary"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {selectedColors.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center text-sm text-dark/80 capitalize"
                    >
                      Color: {color}
                      <button
                        onClick={() => handleColorSelect(color)}
                        className="ml-1.5 hover:text-primary"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  {selectedFabrics.map((fabric) => (
                    <span
                      key={fabric}
                      className="inline-flex items-center text-sm text-dark/80"
                    >
                      {fabric}
                      <button
                        onClick={() => handleFabricSelect(fabric, false)}
                        className="ml-1.5 hover:text-primary"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  {isNewFilter && (
                    <span className="inline-flex items-center text-sm text-dark/80">
                      New
                      <button
                        onClick={() => setIsNewFilter(false)}
                        className="ml-1.5 hover:text-primary"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {isTrendingFilter && (
                    <span className="inline-flex items-center text-sm text-dark/80">
                      Trending
                      <button
                        onClick={() => setIsTrendingFilter(false)}
                        className="ml-1.5 hover:text-primary"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="text-sm font-medium text-primary/80 hover:text-primary underline ml-auto"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Product Listing */}
              {filteredProducts.length === 0 ? (
                <div className="w-full text-center py-20 border border-dashed border-neutral rounded-lg">
                  <h3 className="text-2xl font-playfair text-dark">
                    Nothing Matches Your Filters
                  </h3>
                  <p className="text-dark/60 mt-2">
                    Try removing some to see more beautiful products.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-y-12 ${
                      isGridView
                        ? "grid-cols-2 lg:grid-cols-3 gap-x-8"
                        : "grid-cols-1"
                    }`}
                  >
                    {/* **MODIFIED**: Slicing the array to show only visible products */}
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                      <article key={product.id} className="group relative">
                        <div
                          className="relative overflow-hidden cursor-pointer"
                          onClick={() => handleViewFullProduct(product.Slug)}
                        >
                          <div className="aspect-w-[4] aspect-h-[5] bg-neutral">
                            <KurtiCarousel images={product.images} />
                          </div>
                          {product.isNew && (
                            <span className="absolute top-3 left-3 bg-accent text-white px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide">
                              NEW
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="pt-4">
                          <h3 className="font-playfair text-lg text-dark leading-tight">
                            <a
                              href={`/Kurti/${product.Slug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleViewFullProduct(product.Slug);
                              }}
                              className="hover:text-primary transition-colors"
                            >
                              {product.name}
                            </a>
                          </h3>
                          <div className="mt-2 flex items-center gap-2 text-base">
                            <span className="font-semibold text-dark">
                              ₹{product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-dark/40 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                            {product.originalPrice > product.price && (
                              <span className="text-secondary font-medium text-sm">
                                (
                                {Math.round(
                                  ((product.originalPrice - product.price) /
                                    product.originalPrice) *
                                    100
                                )}
                                % off)
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* **NEW**: Load More Button and Progress Indicator */}
                  {visibleCount < filteredProducts.length && (
                    <div className="mt-16 text-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-8 py-3 bg-transparent border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait"
                      >
                        {isLoadingMore ? "Loading..." : "Load More"}
                      </button>
                      <p className="mt-4 text-sm text-dark/50">
                        Showing {visibleCount} of {filteredProducts.length}{" "}
                        products
                      </p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* --- Filter Drawer (Mobile) --- */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 bg-black/30 z-50 animate-fadeIn"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="absolute inset-y-0 left-0 bg-light w-full max-w-md shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterSection
              setShowMobileFilters={setShowMobileFilters}
              {...{
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
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// --- FilterSection Component (Unchanged) ---
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
  <div className="flex flex-col h-full font-poppins">
    <div className="flex items-center justify-between pb-4 mb-4">
      <h2 className="text-2xl font-playfair text-dark">Filter & Sort</h2>
      <button
        className="lg:hidden text-dark/50 hover:text-dark"
        onClick={() => setShowMobileFilters(false)}
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>

    <div className="flex-grow space-y-4 overflow-y-auto pr-2 -mr-4">
      <AccordionSection
        title="Sort By"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="pt-3 space-y-2">
          {/* Using custom radio-like buttons for a better feel */}
          <button
            onClick={() => setSortOption("featured")}
            className={`w-full text-left p-2 rounded-md text-sm ${
              sortOption === "featured"
                ? "bg-neutral font-semibold"
                : "hover:bg-neutral/50"
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setSortOption("price-low")}
            className={`w-full text-left p-2 rounded-md text-sm ${
              sortOption === "price-low"
                ? "bg-neutral font-semibold"
                : "hover:bg-neutral/50"
            }`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => setSortOption("price-high")}
            className={`w-full text-left p-2 rounded-md text-sm ${
              sortOption === "price-high"
                ? "bg-neutral font-semibold"
                : "hover:bg-neutral/50"
            }`}
          >
            Price: High to Low
          </button>
          <button
            onClick={() => setSortOption("newest")}
            className={`w-full text-left p-2 rounded-md text-sm ${
              sortOption === "newest"
                ? "bg-neutral font-semibold"
                : "hover:bg-neutral/50"
            }`}
          >
            Newest
          </button>
        </div>
      </AccordionSection>

      <AccordionSection
        title="Price Range"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="pt-4">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="mt-2 text-sm text-dark/60">
            Selected range:{" "}
            <span className="font-medium text-dark">₹0 - ₹{priceRange}</span>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title="Color"
        isOpen={openSections.colors}
        onToggle={() => toggleSection("colors")}
      >
        <div className="pt-4 grid grid-cols-6 gap-3">
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

      <AccordionSection
        title="Fabric"
        isOpen={openSections.fabrics}
        onToggle={() => toggleSection("fabrics")}
      >
        <div className="pt-4 space-y-3">
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

      <AccordionSection
        title="Tags"
        isOpen={openSections.flags}
        onToggle={() => toggleSection("flags")}
      >
        <div className="pt-4 space-y-3">
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

    <div className="pt-6 mt-auto border-t border-neutral flex items-center justify-between gap-3">
      <button
        onClick={clearAllFilters}
        className="py-3 px-5 text-sm font-medium text-dark/70 hover:text-dark"
      >
        Reset
      </button>
      <button
        onClick={() => setShowMobileFilters(false)}
        className="py-3 px-8 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm"
      >
        Show Results
      </button>
    </div>
  </div>
);

// --- Reusable Components (Unchanged) ---
const AccordionSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) => (
  <div className="border-b border-neutral/80">
    <button
      className="w-full flex items-center justify-between py-3 text-left group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-base font-medium text-dark group-hover:text-primary transition-colors">
        {title}
      </span>
      <FiChevronUp
        className={`w-5 h-5 text-dark/40 transition-transform duration-300 ${
          !isOpen && "rotate-180"
        }`}
      />
    </button>
    {isOpen && <div className="pb-4 animate-fadeIn">{children}</div>}
  </div>
);

const ColorOption = ({ color, selected, onSelect }: ColorOptionProps) => (
  <button
    onClick={onSelect}
    className={`w-8 h-8 rounded-full border border-dark/10 cursor-pointer transition-all duration-200 ring-offset-2 ring-offset-light ${
      selected ? "ring-2 ring-primary" : "hover:scale-110"
    }`}
    style={{ backgroundColor: color }}
    title={color}
  ></button>
);

const CheckboxOption = ({ label, checked, onChange }: CheckboxOptionProps) => (
  <label className="flex items-center cursor-pointer group text-sm">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <div className="w-5 h-5 flex items-center justify-center rounded border border-dark/30 peer-checked:bg-primary peer-checked:border-primary transition-all duration-200 group-hover:border-primary">
      <FiCheck
        className={`w-4 h-4 text-white transition-opacity ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
    <span className="ml-3 text-dark/80 peer-checked:text-dark transition-colors">
      {label}
    </span>
  </label>
);
