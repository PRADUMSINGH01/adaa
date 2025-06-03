"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiTruck,
  FiRefreshCw,
  FiChevronRight,
  FiX,
  FiZoomIn,
  FiMinus,
  FiPlus,
  FiMapPin,
  FiEdit2,
} from "react-icons/fi";
import { useCart } from "@/app/CartContext";

// Theme configuration

export interface Product {
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

interface ProductDetailViewProps {
  product: Product;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formatted: string;
}

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-6 w-3/4 mb-4"></div>
    <div className="bg-gray-200 rounded-lg h-4 w-1/2 mb-6"></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="flex md:flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="w-full aspect-square bg-gray-200 rounded-xl"></div>
      </div>
      <div className="space-y-6">
        <div className="bg-gray-200 rounded-lg h-10 w-3/4 mb-4"></div>
        <div className="bg-gray-200 rounded-lg h-6 w-1/4 mb-3"></div>
        <div className="bg-gray-200 rounded-lg h-4 w-full mb-2"></div>
        <div className="bg-gray-200 rounded-lg h-4 w-5/6 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
          <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isBuying, setIsBuying] = useState(false);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    formatted: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, isInitialized } = useCart();
  const [adding, setAdding] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize edited address when user address is fetched
  useEffect(() => {
    if (userAddress) {
      setEditedAddress(userAddress);
    }
  }, [userAddress]);

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Calculate discount percentage
  const calculateDiscount = (): number => {
    if (product.discountPercentage) return product.discountPercentage;
    if (product.originalPrice > product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  };

  // Render star rating
  const renderRating = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(product.rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Add to cart function
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    if (product.stock === 0) {
      alert("This product is out of stock");
      return;
    }

    if (!isInitialized) return;

    const newItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.images[0],
    };

    setCartItems((prev) => {
      // Check if item already exists in cart
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingIndex > -1) {
        // Update quantity if exists
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        // Add new item
        return [...prev, newItem];
      }
    });

    console.log("Added to cart:", cartItems, newItem);
    alert(`${quantity} ${product.name} added to cart!`);
    setAdding(true);
    addToCart({
      ...newItem,
    });
    setTimeout(() => setAdding(false), 500);
  };

  // Get user's approximate address using browser geolocation
  const fetchUserAddress = async (): Promise<Address> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async () => {
          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1200));

            // Mock address data
            const address: Address = {
              street: "123 Fashion Street",
              city: "Mumbai",
              state: "Maharashtra",
              postalCode: "400001",
              country: "India",
              formatted:
                "123 Fashion Street, Mumbai, Maharashtra 400001, India",
            };

            resolve(address);
          } catch (error) {
            reject(error);
          }
        },
        () => {
          reject("Could not retrieve your location");
        }
      );
    });
  };

  // Simulate API call to fetch product details
  const fetchProductDetails = async (productId: string): Promise<Product> => {
    return new Promise((resolve) => {
      console.log(productId);
      setTimeout(() => {
        resolve({
          ...product,

          // Simulate additional details from API
          shippingInfo: "Free shipping for orders above ₹1999",
          returnPolicy: "30 days return policy",
        });
      }, 500);
    });
  };

  // Buy now function with address fetching and API simulation
  const handleBuyNow = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    if (product.stock === 0) {
      alert("This product is out of stock");
      return;
    }

    setIsBuying(true);

    try {
      // Step 1: Fetch product details from API
      const productDetails = await fetchProductDetails(product.id);
      console.log("Product details fetched:", productDetails);

      // Step 2: Fetch user address
      setIsFetchingAddress(true);
      const address = await fetchUserAddress();
      setUserAddress(address);
      setIsFetchingAddress(false);

      // Step 3: Show address confirmation
      setShowAddressModal(true);
    } catch (error) {
      console.error("Buy Now error:", error);
      alert(`Failed to process order: ${error}`);
      setIsFetchingAddress(false);
    } finally {
      setIsBuying(false);
    }
  };

  // Handle address input changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited address
  const saveEditedAddress = () => {
    // Format the address for display
    const formatted = `${editedAddress.street}, ${editedAddress.city}, ${editedAddress.state} ${editedAddress.postalCode}, ${editedAddress.country}`;

    setEditedAddress((prev) => ({
      ...prev,
      formatted,
    }));

    setUserAddress(editedAddress);
    setIsEditingAddress(false);
  };

  // Finalize purchase
  const confirmPurchase = () => {
    if (!userAddress) return;

    // In a real app, this would create an order
    const order = {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      address: editedAddress.formatted,
      total: product.price * quantity,
    };

    console.log("Order confirmed:", order);
    alert(
      `Order placed successfully!\nShipping to: ${editedAddress.formatted}`
    );
    setShowAddressModal(false);
  };

  const discount = calculateDiscount();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl bg-[#F8F5F2] min-h-screen">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-[#4A4A48]/80 font-poppins">
        <ol className="flex items-center flex-wrap space-x-1 md:space-x-2">
          <li>
            <a href="#" className="hover:text-[#E07A5F] transition-colors">
              Home
            </a>
          </li>
          <li>
            <FiChevronRight className="w-3 h-3 text-[#4A4A48]/60 mx-1" />
          </li>
          <li>
            <a href="#" className="hover:text-[#E07A5F] transition-colors">
              {product.category || "Clothing"}
            </a>
          </li>
          <li>
            <FiChevronRight className="w-3 h-3 text-[#4A4A48]/60 mx-1" />
          </li>
          <li className="text-[#4A4A48] font-medium truncate max-w-[120px] md:max-w-none">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col-reverse md:flex-row gap-6">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto py-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-lg transition-all ${
                  selectedImage === index
                    ? "ring-2 ring-[#E07A5F]"
                    : "ring-1 ring-gray-300 hover:ring-gray-400"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div
            ref={imageRef}
            className="relative w-full aspect-square bg-white rounded-xl shadow-sm overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-150"
              style={{
                transform: isZoomed
                  ? `scale(1.5) translate(${-zoomPosition.x / 3}%, ${
                      -zoomPosition.y / 3
                    }%)`
                  : "none",
              }}
              priority
            />

            <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
              {discount > 0 && (
                <span className="bg-[#E07A5F] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {discount}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="bg-[#8A9B6E] text-white px-3 py-1 rounded-full text-xs font-medium">
                  NEW ARRIVAL
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full shadow-md">
              <FiZoomIn className="w-5 h-5 text-[#4A4A48]" />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 font-poppins">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4A4A48] mb-3 font-playfair">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="flex items-center">
                <div className="flex">{renderRating()}</div>
                <span className="ml-2 text-[#4A4A48]/70">
                  ({product.reviews} reviews)
                </span>
              </div>
              {product.sku && (
                <span className="text-[#4A4A48]/50 text-sm">
                  SKU: {product.sku}
                </span>
              )}
            </div>

            <p className="text-[#4A4A48]/80 mb-6 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#4A4A48]">Brand:</span>
              <span className="text-[#4A4A48]/70">{product.brand}</span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2 py-3 border-y border-[#F5F0E6]">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#E07A5F]">
                ₹{product.price.toLocaleString()}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-[#4A4A48]/50 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[#E07A5F] font-bold">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {product.stock > 0 ? (
              <div className="text-[#8A9B6E] font-medium">
                In Stock ({product.stock} available)
              </div>
            ) : (
              <div className="text-[#D57A7A] font-medium">Out of Stock</div>
            )}
          </div>

          {/* Colors */}
          <div className="space-y-3 pt-2">
            <h3 className="font-semibold text-lg text-[#4A4A48]">Color:</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color
                      ? "border-[#E07A5F] ring-2 ring-[#E07A5F]/30"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${index + 1}`}
                >
                  {selectedColor === color && (
                    <div className="w-4 h-4 bg-white/80 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg text-[#4A4A48]">Size:</h3>
              <button className="text-[#E07A5F] text-sm hover:underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 border rounded-md transition-colors ${
                    selectedSize === size
                      ? "border-[#E07A5F] bg-[#E07A5F]/10 text-[#E07A5F] font-medium"
                      : "border-gray-300 hover:border-gray-500 text-[#4A4A48]/80"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-[#4A4A48]">Quantity:</h3>
            <div className="flex items-center w-fit border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 border-r border-gray-300 text-[#4A4A48]/80 hover:bg-[#F5F0E6] disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-6 py-2 text-[#4A4A48]">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((prev) => Math.min(product.stock, prev + 1))
                }
                className="px-4 py-2 border-l border-gray-300 text-[#4A4A48]/80 hover:bg-[#F5F0E6] disabled:opacity-50"
                disabled={quantity >= product.stock}
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={
                !selectedSize ||
                !selectedColor ||
                product.stock === 0 ||
                adding ||
                !isInitialized
              }
              className="flex items-center gap-2 px-8 py-3.5 bg-[#E07A5F] text-white rounded-lg hover:bg-[#D06A4F] transition-colors disabled:opacity-70 font-medium"
            >
              <FiShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize || !selectedColor || product.stock === 0}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#4A4A48] text-white rounded-lg hover:bg-[#3A3A38] transition-colors disabled:opacity-70 font-medium"
            >
              {isBuying ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Buy Now"
              )}
            </button>
            <button
              onClick={() => console.log("Add to wishlist")}
              className="p-3.5 border border-gray-300 rounded-lg hover:bg-[#F5F0E6] text-[#4A4A48]/70"
            >
              <FiHeart className="w-5 h-5" />
            </button>
            <button className="p-3.5 border border-gray-300 rounded-lg hover:bg-[#F5F0E6] text-[#4A4A48]/70">
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-[#F5F0E6]">
            <div className="flex items-start gap-3">
              <FiTruck className="w-6 h-6 text-[#E07A5F] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#4A4A48]">Free Shipping</h4>
                <p className="text-[#4A4A48]/70 text-sm">
                  {product.shippingInfo ||
                    "Free shipping on orders above ₹1999"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiRefreshCw className="w-6 h-6 text-[#E07A5F] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-[#4A4A48]">Easy Returns</h4>
                <p className="text-[#4A4A48]/70 text-sm">
                  {product.returnPolicy || "30 days return policy"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Tabs */}
      <div className="mt-16 bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-[#F5F0E6]">
          <nav className="flex space-x-8">
            {["description", "care", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 font-medium transition-colors ${
                  activeTab === tab
                    ? "text-[#E07A5F] border-b-2 border-[#E07A5F]"
                    : "text-[#4A4A48]/60 hover:text-[#4A4A48]"
                }`}
              >
                {tab === "description" && "Description"}
                {tab === "care" && "Care Instructions"}
                {tab === "reviews" && `Reviews (${product.reviews})`}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="space-y-5">
              <h3 className="text-xl font-semibold text-[#4A4A48] mb-4 font-playfair">
                Product Details
              </h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-[#E07A5F] rounded-full mt-2.5 mr-3"></span>
                    <span className="text-[#4A4A48]/80">{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-4">
                <span className="font-semibold text-[#4A4A48]">Fabric: </span>
                <span className="text-[#4A4A48]/80">{product.fabric}</span>
              </div>
            </div>
          )}

          {activeTab === "care" && product.careInstructions && (
            <div>
              <h3 className="text-xl font-semibold text-[#4A4A48] mb-4 font-playfair">
                Care Instructions
              </h3>
              <p className="text-[#4A4A48]/80 whitespace-pre-line">
                {product.careInstructions}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-xl font-semibold text-[#4A4A48] mb-4 font-playfair">
                Customer Reviews
              </h3>
              <div className="flex items-center mb-6">
                <div className="flex mr-3">{renderRating()}</div>
                <span className="text-[#4A4A48]/80">
                  {product.rating} out of 5
                </span>
              </div>
              <p className="text-[#4A4A48]/80">
                {product.reviews} customer reviews
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-[#4A4A48] mb-6 font-playfair">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-xl overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white p-2 z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-12 h-12 rounded overflow-hidden transition-opacity ${
                    selectedImage === index
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Address Confirmation Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#4A4A48] font-playfair">
                {isEditingAddress
                  ? "Edit Shipping Address"
                  : "Confirm Shipping Address"}
              </h3>
              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setIsEditingAddress(false);
                }}
                className="text-[#4A4A48] hover:text-[#E07A5F]"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {userAddress ? (
              <>
                {isEditingAddress ? (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A48] mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={editedAddress.street}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="123 Main St"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4A4A48] mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={editedAddress.city}
                          onChange={handleAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Mumbai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#4A4A48] mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={editedAddress.state}
                          onChange={handleAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Maharashtra"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4A4A48] mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={editedAddress.postalCode}
                          onChange={handleAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="400001"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#4A4A48] mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={editedAddress.country}
                          onChange={handleAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="India"
                        />
                      </div>
                    </div>

                    <button
                      onClick={saveEditedAddress}
                      className="w-full py-3 px-4 bg-[#E07A5F] text-white rounded-md hover:bg-[#D06A4F] mt-2"
                    >
                      Save Address
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-3 mb-6 p-4 bg-[#F5F0E6] rounded-lg relative">
                      <FiMapPin className="w-5 h-5 text-[#E07A5F] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-[#4A4A48]">
                            Shipping Address
                          </h4>
                          <button
                            onClick={() => setIsEditingAddress(true)}
                            className="text-[#E07A5F] flex items-center gap-1 text-sm"
                          >
                            <FiEdit2 className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                        <p className="text-[#4A4A48]">
                          {editedAddress.formatted}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-[#4A4A48] mb-2">
                        Order Summary
                      </h4>
                      <div className="border rounded-lg divide-y">
                        <div className="flex justify-between p-3">
                          <span className="text-[#4A4A48]/70">Product:</span>
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="flex justify-between p-3">
                          <span className="text-[#4A4A48]/70">Price:</span>
                          <span className="font-medium">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between p-3">
                          <span className="text-[#4A4A48]/70">Quantity:</span>
                          <span className="font-medium">{quantity}</span>
                        </div>
                        <div className="flex justify-between p-3">
                          <span className="text-[#4A4A48]/70">Shipping:</span>
                          <span className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between p-3 bg-[#F5F0E6] font-bold">
                          <span>Total:</span>
                          <span>
                            ₹{(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAddressModal(false)}
                        className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-[#4A4A48] hover:bg-[#F5F0E6]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={confirmPurchase}
                        className="flex-1 py-3 px-4 bg-[#4A4A48] text-white rounded-md hover:bg-[#3A3A38]"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center py-8">
                {isFetchingAddress ? (
                  <>
                    <div className="w-12 h-12 border-4 border-[#E07A5F] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#4A4A48]">Fetching your address...</p>
                  </>
                ) : (
                  <>
                    <p className="text-[#4A4A48] mb-4">
                      Could not retrieve address automatically
                    </p>
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="py-2 px-4 bg-[#E07A5F] text-white rounded-md hover:bg-[#D06A4F]"
                    >
                      Enter Address Manually
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
