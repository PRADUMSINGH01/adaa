"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import kurti from '@/app/(Images)/kurti.png'
import { addToCart } from '@/server/AddToCart';
interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  details: string[];
}

export default function FullViewPage() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [isMobileZoomed, setIsMobileZoomed] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);









    function HandleAddtocart(){
      if (!selectedSize || !selectedColor) {
        alert("Please select size and color");
        return;
      }
      const result = addToCart(product, selectedColor, selectedSize);
      if (result.success) {
        alert("Added to cart successfully");
      } else {
        alert(result.error);
      }
    }
       
  // Mock product data
  const product: Product = {
    id: 1,
    name: "Floral Print Cotton Kurti",
    price: 49.99,
    images: Array(4).fill("/images/kurti.jpg"), // Replace with actual images
    sizes: ["S", "M", "L", "XL"],
    colors: ["#4A4A48", "#E07A5F", "#8A9B6E", "#D7D4CD"],
    description: "Beautiful handcrafted cotton kurti with intricate floral embroidery",
    rating: 4.5,
    reviews: 128,
    details: [
      "100% Premium Cotton",
      "Hand Block Print",
      "Machine Wash Cold",
      "Semi-Stitched Length: 50 inches"
    ]
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMobileZoom = () => {
    if (window.innerWidth >= 1024) return;
    setIsMobileZoomed(!isMobileZoomed);
  };

  useEffect(() => {
    if (showZoom && zoomRef.current) {
      zoomRef.current.style.backgroundPosition = `${zoomPosition.x}% ${zoomPosition.y}%`;
    }
  }, [zoomPosition, showZoom]);

  return (
    <div className="min-h-screen bg-[#F5F0E6] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-4 order-2 lg:order-1 overflow-x-auto pb-2 lg:pb-0">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative h-20 w-20 min-w-[5rem] rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === index 
                        ? 'border-[#8A9B6E]' 
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={kurti.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div 
                className="relative aspect-square bg-white rounded-xl shadow-lg overflow-hidden order-1 lg:order-2"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
                ref={imgRef}
                onClick={handleMobileZoom}
              >
                <Image
                  src={kurti.src}
                  alt={product.name}
                  fill
                  className="object-contain cursor-crosshair"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Desktop Zoom */}
                {showZoom && (
                  <div className="hidden lg:block">
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `url(${kurti.src})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '200%',
                        opacity: 0.5
                      }}
                    />
                    <div 
                      className="absolute w-64 h-64 bg-white/30 border-2 border-[#8A9B6E] pointer-events-none"
                      style={{
                        left: `${zoomPosition.x}%`,
                        top: `${zoomPosition.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  </div>
                )}

                {/* Mobile Zoom Modal */}
                {isMobileZoomed && (
                  <div 
                    className="fixed inset-0 z-50 bg-white lg:hidden"
                    onClick={() => setIsMobileZoomed(false)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={kurti.src}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="font-playfair text-3xl lg:text-4xl text-[#4A4A48]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < product.rating ? 'text-[#E07A5F]' : 'text-[#D7D4CD]'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="font-poppins text-[#8A9B6E]">
                {product.reviews} Reviews
              </span>
            </div>

            <p className="text-2xl lg:text-3xl font-poppins font-semibold text-[#4A4A48]">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-[#4A4A48] font-poppins">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-poppins font-semibold text-lg text-[#4A4A48]">
                Color: {selectedColor && <span className="font-normal">{selectedColor}</span>}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-[#8A9B6E] scale-110' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-poppins font-semibold text-lg text-[#4A4A48]">
                Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-full font-poppins transition-all ${
                      selectedSize === size
                        ? 'bg-[#8A9B6E] text-white'
                        : 'bg-[#F8F5F2] text-[#4A4A48] hover:bg-[#D7D4CD]'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl text-[#4A4A48]">
                Product Details
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                {product.details.map((detail, i) => (
                  <li 
                    key={i}
                    className="font-poppins text-[#4A4A48]"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Bag */}
            <button
              disabled={!selectedSize || !selectedColor}
              onClick={() => {HandleAddtocart()}}
              className={`w-full py-4 font-poppins text-lg rounded-xl transition-all ${
                selectedSize && selectedColor
                  ? 'bg-[#8A9B6E] hover:bg-[#76875F] text-white'
                  : 'bg-[#D7D4CD] text-[#4A4A48] cursor-not-allowed'
              }`}
            >
              {selectedSize && selectedColor ? 'Add to Bag' : 'Select Size & Color'}
            </button>
          </div>
        </div>

        {/* Additional Images */}
        <div className="mt-16">
          <h2 className="font-playfair text-2xl lg:text-3xl text-[#4A4A48] mb-8">
            Style Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <div 
                key={index}
                className="relative aspect-square bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Style detail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}