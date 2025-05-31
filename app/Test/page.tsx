"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiShoppingCart,
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowLeft,
  FiCreditCard,
} from "react-icons/fi";

// Theme configuration
const theme = {
  primary: "#E07A5F",
  secondary: "#D57A7A",
  accent: "#8A9B6E",
  neutral: "#F5F0E6",
  dark: "#4A4A48",
  light: "#F8F5F2",
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [shippingOption, setShippingOption] = useState("standard");

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate shipping cost
  const shippingCost = shippingOption === "express" ? 5.99 : 0;

  // Calculate discount
  const discount = subtotal * appliedDiscount;

  // Calculate total
  const total = subtotal - discount + shippingCost;

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string, color: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Apply discount
  const applyDiscount = () => {
    if (discountCode === "SUMMER10") {
      setAppliedDiscount(0.1); // 10% discount
    } else if (discountCode === "WELCOME15") {
      setAppliedDiscount(0.15); // 15% discount
    } else {
      alert("Invalid discount code");
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  // Place order
  const placeOrder = () => {
    alert("Order placed successfully!");
    setCartItems([]);
    setIsCheckingOut(false);
    setIsCartOpen(false);
  };

  // Sample products for demonstration
  const sampleProducts: CartItem[] = [
    {
      id: "1",
      name: "Linen Blend Blazer",
      price: 89.99,
      color: "#4A4A48",
      size: "M",
      quantity: 1,
      image: "/blazer.jpg",
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      color: "#8A9B6E",
      size: "S",
      quantity: 2,
      image: "/tshirt.jpg",
    },
    {
      id: "3",
      name: "Wool Blend Sweater",
      price: 65.99,
      color: "#E07A5F",
      size: "L",
      quantity: 1,
      image: "/sweater.jpg",
    },
  ];

  return (
    <div className="font-poppins">
      {/* Cart Floating Button */}

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Cart Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-[#F8F5F2] shadow-xl">
                {/* Cart Header */}
                <div className="flex items-center justify-between px-4 py-6 sm:px-6 bg-white border-b border-[#F5F0E6]">
                  <h2 className="text-xl font-bold text-[#4A4A48] font-playfair">
                    Your Shopping Cart
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[#4A4A48]/70 hover:text-[#E07A5F]"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {isCheckingOut ? (
                  // Checkout View
                  <div className="flex-1 overflow-y-auto">
                    <div className="px-4 py-6 sm:px-6">
                      <button
                        onClick={() => setIsCheckingOut(false)}
                        className="flex items-center text-[#4A4A48] hover:text-[#E07A5F] mb-6"
                      >
                        <FiArrowLeft className="mr-2" />
                        Back to Cart
                      </button>

                      <h3 className="text-xl font-bold text-[#4A4A48] font-playfair mb-6">
                        Checkout
                      </h3>

                      {/* Shipping Address */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-[#4A4A48] mb-3">
                          Shipping Address
                        </h4>
                        <div className="bg-white p-4 rounded-lg border border-[#F5F0E6]">
                          <p className="text-[#4A4A48]">Jane Smith</p>
                          <p className="text-[#4A4A48]">123 Fashion Street</p>
                          <p className="text-[#4A4A48]">New York, NY 10001</p>
                          <p className="text-[#4A4A48]">United States</p>
                          <button className="mt-3 text-[#E07A5F] hover:underline text-sm">
                            Edit Address
                          </button>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-[#4A4A48] mb-3">
                          Payment Method
                        </h4>
                        <div className="bg-white p-4 rounded-lg border border-[#F5F0E6]">
                          <div className="flex items-center">
                            <FiCreditCard className="text-[#4A4A48] mr-3" />
                            <div>
                              <p className="text-[#4A4A48] font-medium">
                                Visa ending in 1234
                              </p>
                              <p className="text-[#4A4A48]/70 text-sm">
                                Expires 12/2025
                              </p>
                            </div>
                            <button className="ml-auto text-[#E07A5F] hover:underline text-sm">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="border-t border-[#F5F0E6] pt-6">
                        <h4 className="font-semibold text-[#4A4A48] mb-4">
                          Order Summary
                        </h4>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-[#4A4A48]/70">Subtotal</span>
                            <span className="text-[#4A4A48]">
                              ${subtotal.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-[#4A4A48]/70">Shipping</span>
                            <span className="text-[#4A4A48]">
                              {shippingCost > 0
                                ? `$${shippingCost.toFixed(2)}`
                                : "Free"}
                            </span>
                          </div>

                          {appliedDiscount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-[#4A4A48]/70">
                                Discount ({appliedDiscount * 100}%)
                              </span>
                              <span className="text-[#8A9B6E]">
                                -${discount.toFixed(2)}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between pt-3 border-t border-[#F5F0E6] font-bold">
                            <span className="text-[#4A4A48]">Total</span>
                            <span className="text-[#4A4A48]">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={placeOrder}
                          className="w-full py-3.5 bg-[#4A4A48] text-white rounded-lg hover:bg-[#3A3A38] transition-colors font-medium"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Cart Items View
                  <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full py-12 px-4">
                        <FiShoppingCart className="w-16 h-16 text-[#4A4A48]/30 mb-6" />
                        <h3 className="text-xl font-bold text-[#4A4A48] mb-2 font-playfair">
                          Your cart is empty
                        </h3>
                        <p className="text-[#4A4A48]/70 mb-8 text-center">
                          Looks like you haven't added anything to your cart yet
                        </p>
                        <button
                          onClick={() => {
                            // Add sample products for demo
                            sampleProducts.forEach(addToCart);
                          }}
                          className="px-6 py-3 bg-[#E07A5F] text-white rounded-lg hover:bg-[#D06A4F]"
                        >
                          Add Sample Items
                        </button>
                      </div>
                    ) : (
                      <div className="px-4 py-6 sm:px-6">
                        {/* Cart Items */}
                        <ul className="divide-y divide-[#F5F0E6]">
                          {cartItems.map((item) => (
                            <li
                              key={`${item.id}-${item.color}-${item.size}`}
                              className="py-6"
                            >
                              <div className="flex">
                                {/* Product Image */}
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[#F5F0E6] bg-white">
                                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                                </div>

                                {/* Product Info */}
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div className="flex justify-between">
                                    <div>
                                      <h3 className="font-medium text-[#4A4A48]">
                                        {item.name}
                                      </h3>
                                      <div className="flex items-center mt-1">
                                        <span className="text-sm text-[#4A4A48]/70">
                                          Size: {item.size}
                                        </span>
                                        <span className="mx-2 text-[#4A4A48]/30">
                                          |
                                        </span>
                                        <span className="text-sm text-[#4A4A48]/70 flex items-center">
                                          Color:{" "}
                                          <span
                                            className="ml-1 w-4 h-4 rounded-full border border-[#F5F0E6] inline-block"
                                            style={{
                                              backgroundColor: item.color,
                                            }}
                                          ></span>
                                        </span>
                                      </div>
                                    </div>

                                    <button
                                      onClick={() =>
                                        removeFromCart(
                                          item.id,
                                          item.color,
                                          item.size
                                        )
                                      }
                                      className="text-[#4A4A48]/50 hover:text-[#D57A7A]"
                                    >
                                      <FiTrash2 className="w-5 h-5" />
                                    </button>
                                  </div>

                                  <div className="flex flex-1 items-end justify-between">
                                    <p className="text-[#4A4A48] font-medium mt-2">
                                      ${item.price.toFixed(2)}
                                    </p>

                                    <div className="flex items-center border border-[#F5F0E6] rounded-md">
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.color,
                                            item.size,
                                            item.quantity - 1
                                          )
                                        }
                                        className="px-3 py-1 text-[#4A4A48]/70 hover:bg-[#F5F0E6]"
                                        disabled={item.quantity <= 1}
                                      >
                                        <FiMinus className="w-4 h-4" />
                                      </button>
                                      <span className="px-3 text-[#4A4A48]">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.color,
                                            item.size,
                                            item.quantity + 1
                                          )
                                        }
                                        className="px-3 py-1 text-[#4A4A48]/70 hover:bg-[#F5F0E6]"
                                      >
                                        <FiPlus className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* Discount Code */}
                        <div className="border-t border-[#F5F0E6] pt-6">
                          <h3 className="font-semibold text-[#4A4A48] mb-3">
                            Discount Code
                          </h3>
                          <div className="flex">
                            <input
                              type="text"
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value)}
                              placeholder="Enter discount code"
                              className="flex-1 px-4 py-2 border border-[#F5F0E6] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#E07A5F]"
                            />
                            <button
                              onClick={applyDiscount}
                              className="px-4 py-2 bg-[#4A4A48] text-white rounded-r-lg hover:bg-[#3A3A38]"
                            >
                              Apply
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-[#4A4A48]/70">
                            Try codes:{" "}
                            <span className="font-medium">SUMMER10</span> or{" "}
                            <span className="font-medium">WELCOME15</span>
                          </div>
                        </div>

                        {/* Shipping Options */}
                        <div className="border-t border-[#F5F0E6] pt-6">
                          <h3 className="font-semibold text-[#4A4A48] mb-3">
                            Shipping Options
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="standard-shipping"
                                name="shipping"
                                checked={shippingOption === "standard"}
                                onChange={() => setShippingOption("standard")}
                                className="h-4 w-4 border-[#4A4A48] text-[#E07A5F] focus:ring-[#E07A5F]"
                              />
                              <label
                                htmlFor="standard-shipping"
                                className="ml-3 text-[#4A4A48]"
                              >
                                Standard Shipping (Free)
                                <span className="block text-sm text-[#4A4A48]/70">
                                  3-5 business days
                                </span>
                              </label>
                            </div>

                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="express-shipping"
                                name="shipping"
                                checked={shippingOption === "express"}
                                onChange={() => setShippingOption("express")}
                                className="h-4 w-4 border-[#4A4A48] text-[#E07A5F] focus:ring-[#E07A5F]"
                              />
                              <label
                                htmlFor="express-shipping"
                                className="ml-3 text-[#4A4A48]"
                              >
                                Express Shipping ($5.99)
                                <span className="block text-sm text-[#4A4A48]/70">
                                  1-2 business days
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="border-t border-[#F5F0E6] pt-6">
                          <h3 className="font-semibold text-[#4A4A48] mb-4">
                            Order Summary
                          </h3>

                          <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                              <span className="text-[#4A4A48]/70">
                                Subtotal
                              </span>
                              <span className="text-[#4A4A48]">
                                ${subtotal.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-[#4A4A48]/70">
                                Shipping
                              </span>
                              <span className="text-[#4A4A48]">
                                {shippingCost > 0
                                  ? `$${shippingCost.toFixed(2)}`
                                  : "Free"}
                              </span>
                            </div>

                            {appliedDiscount > 0 && (
                              <div className="flex justify-between">
                                <span className="text-[#4A4A48]/70">
                                  Discount ({appliedDiscount * 100}%)
                                </span>
                                <span className="text-[#8A9B6E]">
                                  -${discount.toFixed(2)}
                                </span>
                              </div>
                            )}

                            <div className="flex justify-between pt-3 border-t border-[#F5F0E6] font-bold">
                              <span className="text-[#4A4A48]">Total</span>
                              <span className="text-[#4A4A48]">
                                ${total.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={handleCheckout}
                            className="w-full py-3.5 bg-[#E07A5F] text-white rounded-lg hover:bg-[#D06A4F] transition-colors font-medium"
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
