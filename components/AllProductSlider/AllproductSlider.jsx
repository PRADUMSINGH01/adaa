import React, { useState, useMemo, useEffect } from 'react';

// --- Helper Components & Icons ---

// A more refined Heart icon for the wishlist
const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

// Checkmark icon for selections
const CheckIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
    </svg>
);


// --- Main App Data ---

// A more refined and cohesive theme
const theme = {
  colors: {
    primary: "#8A6E6E", // Muted, sophisticated brown
    accent: "#3A3A3A", // Dark, strong text and accents
    background: "#F9F8F7", // Soft, warm off-white
    surface: "#FFFFFF", // Crisp white for cards
    secondaryText: "#707070",
    border: "#EAEAEA",
    sale: "#C94D4D",
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Poppins", sans-serif',
  },
};

// Expanded product data to demonstrate pagination
const products = [
    { id: 1, name: "Linen Summer Dress", category: "Dresses", price: 89.99, originalPrice: 129.99, colors: ['#F5F0E6', '#D4B8A2', '#8D9A7A'], sizes: ['XS', 'S', 'M', 'L'], isNew: true, imageUrl: 'https://placehold.co/600x800/F5F0E6/3D405B?text=Dress' },
    { id: 2, name: "Cropped Denim Jacket", category: "Jackets", price: 65.50, originalPrice: null, colors: ['#A2B0D2', '#3D405B'], sizes: ['S', 'M', 'L'], isNew: false, imageUrl: 'https://placehold.co/600x800/A2B0D2/FFFFFF?text=Jacket' },
    { id: 3, name: "Fine-Knit Silk Blouse", category: "Tops", price: 45.99, originalPrice: null, colors: ['#FFFFFF', '#F8C8DC'], sizes: ['XS', 'S', 'M'], isNew: true, imageUrl: 'https://placehold.co/600x800/F8C8DC/3D405B?text=Blouse' },
    { id: 4, name: "Wide Leg Trousers", category: "Bottoms", price: 59.99, originalPrice: 79.99, colors: ['#3D405B', '#BEBDB8', '#8D9A7A'], sizes: ['S', 'M', 'L', 'XL'], isNew: false, imageUrl: 'https://placehold.co/600x800/BEBDB8/FFFFFF?text=Trousers' },
    { id: 5, name: "Chunky Knit Sweater", category: "Sweaters", price: 72.00, originalPrice: 90.00, colors: ['#E07A5F', '#F5F0E6', '#8D9A7A'], sizes: ['XS', 'S', 'M', 'L'], isNew: true, imageUrl: 'https://placehold.co/600x800/E07A5F/FFFFFF?text=Sweater' },
    { id: 6, name: "Floral Maxi Skirt", category: "Skirts", price: 49.99, originalPrice: null, colors: ['#D9534F', '#F5F0E6', '#8D9A7A'], sizes: ['S', 'M'], isNew: false, imageUrl: 'https://placehold.co/600x800/D9534F/FFFFFF?text=Skirt' },
    { id: 7, name: "Tailored Jumpsuit", category: "Jumpsuits", price: 78.50, originalPrice: 98.00, colors: ['#8D9A7A', '#3D405B', '#F5F0E6'], sizes: ['XS', 'S', 'M', 'L'], isNew: true, imageUrl: 'https://placehold.co/600x800/8D9A7A/FFFFFF?text=Jumpsuit' },
    { id: 8, name: "Cashmere Cardigan", category: "Sweaters", price: 95.00, originalPrice: 120.00, colors: ['#F5F0E6', '#BEBDB8', '#E07A5F'], sizes: ['M', 'L', 'XL'], isNew: false, imageUrl: 'https://placehold.co/600x800/BEBDB8/3D405B?text=Cardigan' },
    { id: 9, name: "Satin Midi Dress", category: "Dresses", price: 110.00, originalPrice: 150.00, colors: ['#3D405B', '#8A6E6E'], sizes: ['S', 'M', 'L'], isNew: true, imageUrl: 'https://placehold.co/600x800/3D405B/FFFFFF?text=Dress' },
    { id: 10, name: "High-Waist Shorts", category: "Bottoms", price: 45.00, originalPrice: null, colors: ['#F5F0E6', '#A2B0D2'], sizes: ['XS', 'S', 'M'], isNew: false, imageUrl: 'https://placehold.co/600x800/F5F0E6/3A3A3A?text=Shorts' },
    { id: 11, name: "Puff Sleeve Top", category: "Tops", price: 38.99, originalPrice: 45.00, colors: ['#FFFFFF', '#E07A5F'], sizes: ['S', 'M', 'L'], isNew: true, imageUrl: 'https://placehold.co/600x800/FFFFFF/3A3A3A?text=Top' },
    { id: 12, name: "Trench Coat", category: "Jackets", price: 135.00, originalPrice: 180.00, colors: ['#D4B8A2', '#3D405B'], sizes: ['S', 'M', 'L'], isNew: false, imageUrl: 'https://placehold.co/600x800/D4B8A2/FFFFFF?text=Coat' },
    { id: 13, name: "Ribbed Knit Skirt", category: "Skirts", price: 55.00, originalPrice: null, colors: ['#8A6E6E', '#3A3A3A'], sizes: ['XS', 'S', 'M'], isNew: true, imageUrl: 'https://placehold.co/600x800/8A6E6E/FFFFFF?text=Skirt' },
    { id: 14, name: "Cotton Poplin Shirt", category: "Tops", price: 42.00, originalPrice: null, colors: ['#FFFFFF', '#A2B0D2'], sizes: ['S', 'M', 'L', 'XL'], isNew: false, imageUrl: 'https://placehold.co/600x800/A2B0D2/3A3A3A?text=Shirt' },
    { id: 15, name: "Wool Blend Sweater", category: "Sweaters", price: 85.00, originalPrice: 110.00, colors: ['#BEBDB8', '#8A6E6E'], sizes: ['S', 'M', 'L'], isNew: false, imageUrl: 'https://placehold.co/600x800/BEBDB8/FFFFFF?text=Sweater' },
    { id: 16, name: "Pleated Trousers", category: "Bottoms", price: 68.00, originalPrice: 85.00, colors: ['#3A3A3A', '#F5F0E6'], sizes: ['XS', 'S', 'M'], isNew: true, imageUrl: 'https://placehold.co/600x800/3A3A3A/FFFFFF?text=Trousers' },
];

// --- Sub-Components ---

// Refined Modal for a premium selection experience
const SelectionModal = ({ product, onClose, onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return null;

  const handleConfirm = () => {
    if (!selectedColor || !selectedSize) {
      console.warn("Please select a color and size.");
      return;
    }
    onConfirm({
      productName: product.name,
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col md:flex-row overflow-hidden animate-slide-up-fast" onClick={(e) => e.stopPropagation()}>
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div>
            <p className="text-sm uppercase tracking-widest" style={{color: theme.colors.secondaryText}}>{product.category}</p>
            <h2 className="text-3xl mt-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.accent }}>{product.name}</h2>
            <div className="mt-2 flex items-baseline gap-3">
                <p className="text-2xl font-medium" style={{ color: theme.colors.accent }}>${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                    <p className="text-base line-through" style={{ color: theme.colors.secondaryText }}>${product.originalPrice.toFixed(2)}</p>
                )}
            </div>
          </div>
          
          <div className="flex-grow mt-6">
            <div>
              <h3 className="text-sm font-medium" style={{color: theme.colors.secondaryText}}>Color: <span className="font-semibold" style={{color: theme.colors.accent}}>{selectedColor}</span></h3>
              <div className="flex items-center gap-3 mt-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border transition-all duration-200 flex items-center justify-center`}
                    style={{ backgroundColor: color, borderColor: selectedColor === color ? theme.colors.primary : theme.colors.border }}
                    aria-label={`Select color ${color}`}
                  >
                    {selectedColor === color && <CheckIcon className="w-4 h-4" style={{color: theme.colors.primary}}/>}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium" style={{color: theme.colors.secondaryText}}>Size</h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1.5 rounded-md border text-sm font-medium transition-colors duration-200`}
                    style={{ 
                        backgroundColor: selectedSize === size ? theme.colors.accent : theme.colors.surface,
                        borderColor: selectedSize === size ? theme.colors.accent : theme.colors.border,
                        color: selectedSize === size ? theme.colors.surface : theme.colors.accent,
                     }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleConfirm}
              disabled={!selectedSize}
              className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Polished product card
const ProductCard = ({ product, onBuyNow }) => (
    <div className="group relative flex flex-col">
        <div className="relative overflow-hidden rounded-md">
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <span className="bg-white/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full" style={{ color: theme.colors.accent }}>NEW</span>
                )}
                {product.originalPrice && (
                     <span className="bg-white/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full" style={{ color: theme.colors.sale }}>SALE</span>
                )}
            </div>
            
            <div className="w-full h-96" style={{backgroundColor: theme.colors.border}}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <button 
                onClick={() => onBuyNow(product)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] bg-white/90 backdrop-blur-sm font-semibold py-2.5 px-4 rounded-lg shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                style={{ color: theme.colors.accent }}
             >
                Quick Add
            </button>
        </div>
        
        <div className="pt-4 text-left flex-grow flex flex-col">
            <div className="flex-grow">
                <h3 className="text-base font-medium" style={{ color: theme.colors.accent }}>{product.name}</h3>
                <p className="text-sm mt-1" style={{ color: theme.colors.secondaryText }}>{product.category}</p>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
                <p className="text-base font-semibold" style={{ color: theme.colors.primary }}>${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                    <p className="text-sm line-through" style={{ color: theme.colors.secondaryText }}>${product.originalPrice.toFixed(2)}</p>
                )}
            </div>
        </div>
    </div>
);

// Pagination component
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center gap-3 mt-16">
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center`}
                    style={{
                        backgroundColor: currentPage === number ? theme.colors.accent : 'transparent',
                        color: currentPage === number ? theme.colors.surface : theme.colors.accent,
                        border: `1px solid ${currentPage === number ? theme.colors.accent : theme.colors.border}`
                    }}
                >
                    {number}
                </button>
            ))}
        </nav>
    );
};

// --- Main App Component ---
export default function App() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], []);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
      .sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return a.id - b.id; // Default: featured
      });
  }, [categoryFilter, sortOption]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleConfirmPurchase = (details) => {
    console.log("--- Purchase Details ---");
    console.log(details);
    console.log("------------------------");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Poppins:wght@400;500;600&display=swap');
        .animate-fade-in-fast { animation: fadeIn 0.2s ease-out forwards; }
        .animate-slide-up-fast { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <div className="min-h-screen" style={{ backgroundColor: theme.colors.background, fontFamily: theme.fonts.body, color: theme.colors.accent }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.accent }}>
              Elegance Redefined
            </h1>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: theme.colors.secondaryText }}>
              Timeless pieces, ethically crafted for the modern wardrobe. Discover the new collection.
            </p>
          </header>

          <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-b" style={{borderColor: theme.colors.border}}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`relative px-1 py-3 text-sm font-medium transition-colors duration-300`}
                  style={{ color: categoryFilter === category ? theme.colors.accent : theme.colors.secondaryText }}
                >
                  {category}
                  {categoryFilter === category && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5" style={{backgroundColor: theme.colors.primary}}></span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm" style={{ color: theme.colors.secondaryText }}>Sort by:</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border-0 rounded-md py-1 pr-8 text-sm font-medium focus:ring-0 focus:outline-none"
                style={{ color: theme.colors.accent }}
              >
                <option value="featured">Featured</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
            ))}
          </main>

          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {selectedProduct && (
        <SelectionModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </>
  );
}
