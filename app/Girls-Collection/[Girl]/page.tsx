"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    size: string[];
    color: string;
    fabric: string;
    rating: number;
    inStock: boolean;
    discount?: number;
}

export default function GirlProductPage() {
    const params = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const category = params.Girl as string;

    // Filter state
    const [filters, setFilters] = useState({
        brands: [] as string[],
        sizes: [] as string[],
        colors: [] as string[],
        fabrics: [] as string[],
        minPrice: 0,
        maxPrice: Infinity,
        rating: null as number | null,
        inStock: false,
    });

    const [sortOption, setSortOption] = useState('featured');

    // Mobile accordion state
    const [openSection, setOpenSection] = useState<string | null>(null);

    useEffect(() => {
        // Enhanced mock data
        const mockProducts: Product[] = [
            {
                id: 1,
                name: "Girl's Summer Dress",
                price: 29.99,
                image: "/images/dress1.jpg",
                category: "dresses",
                brand: "Sunny Style",
                size: ["S", "M", "L"],
                color: "Blue",
                fabric: "Cotton",
                rating: 4.5,
                inStock: true,
                discount: 20
            },
            {
                id: 2,
                name: "Designer Jeans",
                price: 59.99,
                image: "/images/jeans1.jpg",
                category: "pants",
                brand: "Denim Days",
                size: ["M", "L", "XL"],
                color: "Black",
                fabric: "Denim",
                rating: 4.2,
                inStock: false
            },
            // Add more mock products
        ];

        setProducts(mockProducts);
        
        const prices = mockProducts.map(p => p.price);
        setFilters(prev => ({
            ...prev,
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices),
        }));
    }, [category]);

    // Available filter options
    const filterOptions = useMemo(() => ({
        brands: [...new Set(products.map(p => p.brand))],
        sizes: [...new Set(products.flatMap(p => p.size))].sort(),
        colors: [...new Set(products.map(p => p.color))],
        fabrics: [...new Set(products.map(p => p.fabric))],
        priceRange: [Math.min(...products.map(p => p.price)), Math.max(...products.map(p => p.price))],
        ratings: [4, 3, 2, 1]
    }), [products]);

    // Filtered and sorted products
    const filteredProducts = useMemo(() => {
        const filtered = products.filter(product => {
            const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
            const matchesSize = filters.sizes.length === 0 || product.size.some(s => filters.sizes.includes(s));
            const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.color);
            const matchesFabric = filters.fabrics.length === 0 || filters.fabrics.includes(product.fabric);
            const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
            const matchesRating = !filters.rating || product.rating >= filters.rating;
            const matchesStock = !filters.inStock || product.inStock;

            return matchesBrand && matchesSize && matchesColor && matchesFabric && 
                   matchesPrice && matchesRating && matchesStock;
        });

        // Sorting logic
        switch(sortOption) {
            case 'priceLowHigh':
                return [...filtered].sort((a, b) => a.price - b.price);
            case 'priceHighLow':
                return [...filtered].sort((a, b) => b.price - a.price);
            case 'rating':
                return [...filtered].sort((a, b) => b.rating - a.rating);
            case 'newest':
                return [...filtered].reverse(); // Assuming newer products are at end
            default:
                return filtered;
        }
    }, [products, filters, sortOption]);

    const toggleSection = (section: string) => {
        setOpenSection(prev => prev === section ? null : section);
    };

    const clearAllFilters = () => {
        setFilters({
            brands: [],
            sizes: [],
            colors: [],
            fabrics: [],
            minPrice: filterOptions.priceRange[0],
            maxPrice: filterOptions.priceRange[1],
            rating: null,
            inStock: false,
        });
    };

    const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="border-b border-[#D7D4CD] py-4">
            <button 
                className="flex justify-between items-center w-full"
                onClick={() => toggleSection(title)}
            >
                <h3 className="font-poppins font-semibold text-[#4A4A48]">{title}</h3>
                <span className="text-[#8A9B6E]">{openSection === title ? '−' : '+'}</span>
            </button>
            {openSection === title && <div className="mt-4 space-y-2">{children}</div>}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F0E6]">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-playfair text-4xl text-[#4A4A48]">{category} Collection</h1>
                    <div className="flex gap-4 items-center">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="hidden md:block bg-[#F8F5F2] px-4 py-2 rounded border border-[#D7D4CD]"
                        >
                            <option value="featured">Featured</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                        <button
                            className="md:hidden bg-[#8A9B6E] text-white px-4 py-2 rounded"
                            onClick={() => setIsMobileFiltersOpen(true)}
                        >
                            Filters
                        </button>
                    </div>
                </div>

                {/* Mobile Filters Drawer */}
                <div className={`fixed inset-0 z-50 bg-white transform ${
                    isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out p-6 overflow-y-auto`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-playfair text-2xl text-[#4A4A48]">Filters</h2>
                        <button 
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="text-[#4A4A48] hover:text-[#D57A7A]"
                        >
                            ✕
                        </button>
                    </div>

                    <FilterSection title="Sort By">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full bg-[#F8F5F2] px-4 py-2 rounded border border-[#D7D4CD]"
                        >
                            <option value="featured">Featured</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="rating">Customer Rating</option>
                            <option value="newest">Newest Arrivals</option>
                        </select>
                    </FilterSection>

                    {/* Filter Sections */}
                    <FilterSection title="Brand">
                        {filterOptions.brands.map(brand => (
                            <label key={brand} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={filters.brands.includes(brand)}
                                    onChange={(e) => {
                                        const newBrands = e.target.checked
                                            ? [...filters.brands, brand]
                                            : filters.brands.filter(b => b !== brand);
                                        setFilters(prev => ({ ...prev, brands: newBrands }));
                                    }}
                                    className="text-[#8A9B6E] rounded border-[#D7D4CD]"
                                />
                                <span className="font-poppins text-[#4A4A48]">{brand}</span>
                            </label>
                        ))}
                    </FilterSection>

                    <FilterSection title="Price">
                        <div className="flex flex-col space-y-4">
                            <div className="flex space-x-4">
                                <input
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        minPrice: Number(e.target.value)
                                    }))}
                                    className="w-1/2 p-2 border border-[#D7D4CD] rounded"
                                />
                                <input
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters(prev => ({
                                        ...prev,
                                        maxPrice: Number(e.target.value)
                                    }))}
                                    className="w-1/2 p-2 border border-[#D7D4CD] rounded"
                                />
                            </div>
                            <input
                                type="range"
                                min={filterOptions.priceRange[0]}
                                max={filterOptions.priceRange[1]}
                                value={filters.maxPrice}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev,
                                    maxPrice: Number(e.target.value)
                                }))}
                                className="w-full"
                            />
                        </div>
                    </FilterSection>

                    <FilterSection title="Size">
                        <div className="grid grid-cols-2 gap-2">
                            {filterOptions.sizes.map(size => (
                                <label key={size} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.sizes.includes(size)}
                                        onChange={(e) => {
                                            const newSizes = e.target.checked
                                                ? [...filters.sizes, size]
                                                : filters.sizes.filter(s => s !== size);
                                            setFilters(prev => ({ ...prev, sizes: newSizes }));
                                        }}
                                        className="text-[#8A9B6E] rounded border-[#D7D4CD]"
                                    />
                                    <span className="font-poppins text-[#4A4A48]">{size}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="Color">
                        <div className="grid grid-cols-3 gap-2">
                            {filterOptions.colors.map(color => (
                                <label 
                                    key={color} 
                                    className="flex items-center space-x-2 p-2 rounded border border-[#D7D4CD]"
                                    style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.colors.includes(color)}
                                        onChange={(e) => {
                                            const newColors = e.target.checked
                                                ? [...filters.colors, color]
                                                : filters.colors.filter(c => c !== color);
                                            setFilters(prev => ({ ...prev, colors: newColors }));
                                        }}
                                        className="text-[#8A9B6E] rounded border-[#D7D4CD]"
                                    />
                                    <span className="font-poppins text-[#4A4A48] capitalize">{color}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    <FilterSection title="Customer Rating">
                        {filterOptions.ratings.map(rating => (
                            <label key={rating} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.rating === rating}
                                    onChange={() => setFilters(prev => ({
                                        ...prev,
                                        rating: prev.rating === rating ? null : rating
                                    }))}
                                    className="text-[#8A9B6E] rounded border-[#D7D4CD]"
                                />
                                <span className="font-poppins text-[#4A4A48]">
                                    {rating}+ Stars
                                </span>
                            </label>
                        ))}
                    </FilterSection>

                    <FilterSection title="Availability">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.inStock}
                                onChange={(e) => setFilters(prev => ({
                                    ...prev,
                                    inStock: e.target.checked
                                }))}
                                className="text-[#8A9B6E] rounded border-[#D7D4CD]"
                            />
                            <span className="font-poppins text-[#4A4A48]">Show in-stock only</span>
                        </label>
                    </FilterSection>

                    <div className="mt-6 flex gap-4">
                        <button
                            className="w-1/2 bg-[#8A9B6E] text-white font-poppins py-2 px-4 rounded 
                                    hover:bg-[#D57A7A] transition-colors duration-300"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        >
                            View Results
                        </button>
                        <button
                            className="w-1/2 bg-[#D7D4CD] text-[#4A4A48] font-poppins py-2 px-4 rounded 
                                    hover:bg-[#E07A5F] transition-colors duration-300"
                            onClick={clearAllFilters}
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Filters */}
                    <div className="hidden md:block w-72 bg-[#F8F5F2] p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-playfair text-2xl text-[#4A4A48]">Filters</h2>
                            <button
                                onClick={clearAllFilters}
                                className="text-[#E07A5F] font-poppins hover:text-[#8A9B6E]"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Desktop Filter Sections - Similar to mobile but without accordion */}
                        <div className="space-y-6">
                            {/* Price Filter */}
                            <div className="border-b border-[#D7D4CD] pb-4">
                                <h3 className="font-poppins font-semibold text-[#4A4A48] mb-3">Price</h3>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex space-x-4">
                                        <input
                                            type="number"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters(prev => ({
                                                ...prev,
                                                minPrice: Number(e.target.value)
                                            }))}
                                            className="w-1/2 p-2 border border-[#D7D4CD] rounded"
                                        />
                                        <input
                                            type="number"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters(prev => ({
                                                ...prev,
                                                maxPrice: Number(e.target.value)
                                            }))}
                                            className="w-1/2 p-2 border border-[#D7D4CD] rounded"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min={filterOptions.priceRange[0]}
                                        max={filterOptions.priceRange[1]}
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            maxPrice: Number(e.target.value)
                                        }))}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Add other filter sections similarly */}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-grow">
        
{/* Product Grid */}
<div className="flex-grow">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
            <div 
                key={product.id}
                className="group bg-[#F8F5F2] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out"
            >
                {/* Product Card Content */}
                <Link 
                    href={`/Girls-Collection/FullView/${product.id}`}  // Update with your actual URL structure
                    className="block relative"
                >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden rounded-t-xl">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        
                        {/* Product Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                            {product.discount && (
                                <span className="bg-[#E07A5F] text-white px-3 py-1 text-xs font-poppins font-medium rounded-full">
                                    {product.discount}% OFF
                                </span>
                            )}
                            {!product.inStock && (
                                <span className="bg-[#4A4A48] text-white px-3 py-1 text-xs font-poppins font-medium rounded-full">
                                    PRE-ORDER
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <h3 className="font-poppins font-semibold text-[#4A4A48] text-lg line-clamp-2">
                                {product.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                                <svg 
                                    className="w-4 h-4 text-[#E07A5F]" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span className="font-poppins text-sm text-[#8A9B6E]">
                                    {product.rating.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center gap-2">
                            <p className="font-poppins font-semibold text-[#4A4A48] text-lg">
                                ${product.price.toFixed(2)}
                            </p>
                            {product.discount && (
                                <span className="font-poppins text-sm text-[#8A9B6E] line-through">
                                    ${(product.price / (1 - product.discount/100)).toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>

                {/* Interactive Elements */}
                <div className="p-4 pt-0 space-y-3">
                    {/* Size Preview */}
                    <div className="flex flex-wrap gap-2">
                        {product.size.slice(0, 4).map((size) => (
                            <span 
                                key={size}
                                className="px-2 py-1 text-xs font-poppins bg-[#F5F0E6] text-[#4A4A48] rounded-md"
                            >
                                {size}
                            </span>
                        ))}
                        {product.size.length > 4 && (
                            <span className="text-xs text-[#8A9B6E] font-poppins">
                                +{product.size.length - 4} more
                            </span>
                        )}
                    </div>

                    {/* Add to Cart */}
                    <button 
                        className="w-full flex items-center justify-center gap-2 bg-[#8A9B6E] hover:bg-[#76875F] text-white font-poppins py-3 px-4 rounded-lg 
                                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!product.inStock}
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle add to cart logic
                        }}
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span>
                            {product.inStock ? 'Add to Bag' : 'Notify Me'}
                        </span>
                    </button>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button 
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Handle wishlist logic
                            }}
                        >
                            <svg className="w-5 h-5 text-[#4A4A48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
</div>

                </div>
            </div>
        </div>
    );
}