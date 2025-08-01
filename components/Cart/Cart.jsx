// src/app/cart/page.tsx (or your CartPage file)
"use client";
import React, { useState, useEffect } from "react";
import { useUserData } from "@/components/Context/UserContext";
import { useRouter } from "next/navigation";
import RazorpayButton from "../CheckOut/Checkout";
import Link from "next/link";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

import {
  FiShoppingBag,
  FiX,
  FiPlus,
  FiMinus,
  FiTruck,
  FiArrowLeft,
  FiTag,
  FiImage,
  // FiUser // Example for placeholder
} from "react-icons/fi";
import { useCart } from "@/app/CartContext"; // Adjust path as needed
import Image from "next/image";

const CartPage = () => {
  const { userData, loading } = useUserData();
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    itemCount,
    clearCart,
    isInitialized,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [address, setaddress] = useState(null);
  const [Alert, setAlert] = useState(false);

  const subtotal = totalPrice;
  const freeShippingThreshold = 50;
  const shipping =
    itemCount > 0 &&
    subtotal - discount < freeShippingThreshold &&
    subtotal - discount > 0
      ? 5.99
      : 0;
  const taxRate = 0.08;
  const tax = Math.max(0, subtotal - discount) * taxRate;
  const total = Math.max(0, subtotal - discount) + shipping + tax;

  useEffect(() => {
    if (
      userData &&
      Array.isArray(userData.Address) &&
      userData.Address.length > 0
    ) {
      setaddress(userData.Address[0]);
    } else if (userData) {
      setTimeout(() => {
        setAlert(true);
      }, 300);
    }
  }, [address]);

  const handleApplyCoupon = () => {
    // ... (your existing coupon logic)
    if (couponCode.toUpperCase() === "SAVE10") {
      const calculatedDiscount = subtotal * 0.1;
      setDiscount(calculatedDiscount);
      setCouponMessage(
        `Coupon "SAVE10" applied! -$${calculatedDiscount.toFixed(2)}`
      );
    } else if (couponCode.toUpperCase() === "FREESHIP") {
      const potentialShippingCost =
        itemCount > 0 && subtotal < freeShippingThreshold ? 5.99 : 0;
      if (potentialShippingCost > 0) {
        setDiscount(potentialShippingCost);
        setCouponMessage(
          `Coupon "FREESHIP" applied! Shipping is now effectively free.`
        );
      } else {
        setDiscount(0);
        setCouponMessage("Shipping is already free or cart is empty.");
      }
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  const removeAppliedCoupon = () => {
    setDiscount(0);
    setCouponCode("");
    setCouponMessage("");
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-dark font-poppins">Loading your cart...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F5F0E6] font-poppins text-[#4A4A48]">
      {/* Updated Header with Progress Bar */}
      {Alert && (
        <div
          role="alert"
          className="flex items-start z-50 bg-white border-l-4 border-red-500 p-4 shadow-lg rounded-md space-x-3 animate-fade-in fixed top-4 right-4 max-w-sm"
        >
          <FaExclamationCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-600">Address Required</p>
            <p className="text-sm text-gray-600">
              Please add an address before placing your order.
            </p>
          </div>
          <button
            onClick={() => setAlert(false)}
            aria-label="Dismiss"
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
      )}
      <header className="bg-white shadow-sm  top-0 z-50 py-3 h-30">
        <div className="container mx-auto px-2.5 sm:px-4 flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/" // Link to homepage or main shopping area
            className="flex items-center text-primary hover:text-primary/80 transition-colors text-[10px] xxs:text-xs sm:text-sm whitespace-nowrap py-1"
            title="Continue Shopping"
          >
            <FiArrowLeft className="mr-1 xxs:mr-1.5 h-3.5 w-3.5 xxs:h-4 xxs:w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Back to Shop</span>
            <span className="sm:hidden">Shop</span>
          </Link>

          {/* Optional: Placeholder for user icon or other actions */}
          <div className="w-auto flex justify-end py-1">
            {/* <Link href="/profile"><FiUser className="h-5 w-5 text-gray-500 hover:text-primary"/></Link> */}
          </div>
        </div>
      </header>

      <div className="h-full bg-[#F5F0E6] font-poppins text-[#4A4A48]">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <>
              <div className=" flex flex-col justify-between items-center ">
                <p className="text-gray-600 mb-6">
                  Select a delivery address. Your order will be deliver to this
                  address.
                </p>
                <Link
                  href="/User/Add-Address"
                  className="inline-block py-3 px-6 mb-3 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-[#D57A7A] transition"
                >
                  Add New Address
                </Link>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userData && userData?.Address?.length > 0 ? (
                    userData.Address.map((address, index) => (
                      <div
                        key={index}
                        className={`group border rounded-xl p-5 bg-white shadow-sm relative transition-all duration-300 cursor-pointer hover:border-primary/60 hover:shadow-md ${"border-primary border-2 bg-primary/5"}`}
                        onClick={() => setaddress(address)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A8.966 8.966 0 0112 15c2.02 0 3.877.67 5.303 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <div className="text-sm text-dark space-y-1">
                            <h3 className="font-semibold text-base leading-snug">
                              {address.name}
                            </h3>

                            <p className="text-muted text-sm leading-tight">
                              <span className="font-medium"> </span>{" "}
                              {address.Address},{" "}
                            </p>
                            <p className="text-muted text-sm leading-tight">
                              <span className="font-medium">City : </span>{" "}
                              {address.city},{" "}
                            </p>

                            <p className="text-muted text-sm leading-tight">
                              <span className="font-medium">Pincode :</span>{" "}
                              {address.pincode},
                            </p>
                            <p className="text-muted text-sm leading-tight">
                              {address.landmark},
                            </p>
                            <p className="text-muted text-sm">
                              {address.country}
                            </p>
                            <p className="text-muted text-sm">
                              <span className="font-medium">Phone:</span>{" "}
                              {address.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <Link
                        href="/User/Add-Address"
                        className="inline-block py-3 px-6 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-[#D57A7A] transition"
                      >
                        Add New Address
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          </div>
        </main>
        {/* Shipping Address  */}

        {userData.Address.length > 1 ? (
          <main className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-6 font-playfair flex items-center">
                Delivery Address
              </h1>

              <>
                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className={`group border rounded-xl p-5 bg-white shadow-sm relative transition-all duration-300 cursor-pointer hover:border-primary/60 hover:shadow-md ${"border-primary border-2 bg-primary/5"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 rounded-full p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.121 17.804A8.966 8.966 0 0112 15c2.02 0 3.877.67 5.303 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="text-sm text-dark space-y-1">
                          <h3 className="font-semibold text-base leading-snug">
                            {address?.name}
                          </h3>

                          <p className="text-muted text-sm leading-tight">
                            <span className="font-medium"> </span>{" "}
                            {address?.Address}
                          </p>
                          <p className="text-muted text-sm leading-tight">
                            <span className="font-medium">City : </span>{" "}
                            {address?.city}
                          </p>

                          <p className="text-muted text-sm leading-tight">
                            <span className="font-medium">Pincode :</span>{" "}
                            {address?.pincode}
                          </p>
                          <p className="text-muted text-sm leading-tight">
                            {address?.landmark}
                          </p>
                          <p className="text-muted text-sm">
                            {address?.country}
                          </p>
                          <p className="text-muted text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {address?.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </main>
        ) : (
          ""
        )}
      </div>
      {/* Main Content (Your existing cart layout) */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title section (optional, as progress bar indicates "Shopping Cart") */}
          {/* You might want to keep this for SEO or as a main page heading */}
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 font-playfair">
              Your Shopping Cart
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Verify your items and proceed to the next step.
            </p>
          </div>

          {cart.length === 0 ? (
            // ... (your existing empty cart JSX)
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 text-center">
              <FiShoppingBag className="mx-auto text-4xl sm:text-5xl text-gray-300 mb-5" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2 font-playfair">
                Your cart is empty!
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Add some amazing products to get started.
              </p>
              <Link
                href="/"
                className="inline-block bg-primary text-white py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            // ... (your existing cart items and order summary JSX)
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Cart Items */}
              <div className="lg:w-[60%] xl:w-2/3 mb-6 lg:mb-0">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Desktop Headers */}
                  <div className="hidden md:grid grid-cols-12 gap-x-4 bg-gray-50 text-[#4A4A48] text-xs font-semibold py-3 px-4 border-b">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="border-b last:border-b-0 transition-all duration-300 hover:bg-gray-50/30"
                    >
                      <div className="p-3 sm:p-4 grid grid-cols-12 gap-x-3 sm:gap-x-4 items-center">
                        {/* Product Details & Image */}
                        <div className="col-span-12 sm:col-span-6 flex gap-3 sm:gap-4 items-center">
                          <div className="flex-shrink-0 bg-slate-100 rounded-md w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="object-contain w-full h-full"
                              />
                            ) : (
                              <FiImage className="text-gray-400 w-8 h-8 sm:w-10 sm:h-10" />
                            )}
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3
                              className="font-semibold font-playfair text-sm sm:text-base leading-tight truncate"
                              title={item.name}
                            >
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              SKU: {item.sku || "N/A"}
                            </p>
                            {item.color && item.size && (
                              <div className="flex gap-1.5 mt-0.5 text-xs text-gray-500">
                                <span>{item.color}</span>
                                <span className="text-gray-300">|</span>
                                <span>{item.size}</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.size, item.color)
                            }
                            className="hidden sm:block ml-auto text-gray-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <FiX size={18} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="col-span-4 sm:col-span-2 pt-2 sm:pt-0 text-left sm:text-center">
                          <span className="sm:hidden text-xs font-medium text-gray-400 block mb-0.5">
                            Price
                          </span>
                          <span className="text-xs sm:text-sm font-medium">
                            {item.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-5 sm:col-span-2 pt-2 sm:pt-0 flex flex-col sm:items-center">
                          <span className="sm:hidden text-xs font-medium text-gray-400 block mb-0.5">
                            Qty
                          </span>
                          <div className="flex items-center border rounded overflow-hidden self-start sm:self-center">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className={`px-2 py-1 bg-gray-100 transition-colors text-base ${
                                item.quantity > 1
                                  ? "hover:bg-gray-200 text-gray-700"
                                  : "opacity-50 cursor-not-allowed text-gray-400"
                              }`}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="px-2.5 py-1 text-xs sm:text-sm font-medium text-center w-8">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-base"
                              aria-label="Increase quantity"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Item Subtotal */}
                        <div className="col-span-3 sm:col-span-2 pt-2 sm:pt-0 text-right">
                          <span className="sm:hidden text-xs font-medium text-gray-400 block mb-0.5">
                            Total
                          </span>
                          <span className="font-semibold text-xs sm:text-sm">
                            {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Mobile Remove Button */}
                        <div className="col-span-12 sm:hidden text-right mt-2 -mb-1 ">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-xs flex items-center hover:text-red-700 transition-colors ml-auto p-1"
                            aria-label="Remove item"
                          >
                            <FiX className="mr-0.5 h-3 w-3" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 border-t">
                    <button
                      onClick={clearCart}
                      className="w-full sm:w-auto text-red-500 hover:text-red-700 transition-colors font-medium flex items-center justify-center text-xs sm:text-sm py-2 px-3 border border-red-300 rounded-md hover:bg-red-50"
                    >
                      <FiX className="mr-1.5 h-4 w-4" /> Clear Cart
                    </button>
                    <Link
                      href="/"
                      className="w-full sm:w-auto text-center text-primary hover:text-primary/80 transition-colors font-medium text-xs sm:text-sm py-2 px-3 border border-primary rounded-md hover:bg-primary/5"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {itemCount > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 mt-4 sm:mt-6 flex items-center gap-3">
                    <div className="bg-primary bg-opacity-10 p-2 sm:p-2.5 rounded-lg flex-shrink-0">
                      <FiTruck className="text-primary text-lg sm:text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-primary">
                        {subtotal - discount >= freeShippingThreshold
                          ? "You've got Free Shipping!"
                          : "Unlock Free Shipping"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {subtotal - discount < freeShippingThreshold
                          ? `Add $${(
                              freeShippingThreshold -
                              (subtotal - discount)
                            ).toFixed(2)} more for free shipping.`
                          : "Your order qualifies for free shipping!"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:w-[50%] ">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-20">
                  <h2 className="text-lg sm:text-xl font-bold mb-4 font-playfair border-b pb-2.5">
                    Order Summary
                  </h2>

                  {/* Coupon Code Section */}
                  <div className="mb-5">
                    <label
                      htmlFor="couponCode"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                    >
                      Have a coupon?
                    </label>
                    <div className="flex items-stretch gap-2">
                      <input
                        type="text"
                        id="couponCode"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon"
                        className="flex-grow px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-xs sm:text-sm"
                        disabled={discount > 0}
                      />
                      {!discount > 0 ? (
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-gray-600 text-white px-3 sm:px-4 py-1.5 rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium flex items-center whitespace-nowrap"
                          disabled={!couponCode.trim()}
                        >
                          <FiTag className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                          Apply
                        </button>
                      ) : (
                        <button
                          onClick={removeAppliedCoupon}
                          className="bg-red-500 text-white px-3 sm:px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors text-xs sm:text-sm font-medium flex items-center"
                          aria-label="Remove coupon"
                        >
                          <FiX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      )}
                    </div>
                    {couponMessage && (
                      <p
                        className={`mt-1.5 text-xs ${
                          discount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>{subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 && itemCount > 0
                          ? "Free"
                          : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                      <span>{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between font-bold text-sm sm:text-base text-primary">
                      <span>Order Total</span>
                      <span className="text-base sm:text-lg">
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    {/* Link to Address page */}

                    <RazorpayButton
                      price={total.toFixed(2)}
                      Address={address}
                    />

                    <p className="text-center text-xs text-gray-500 mt-3">
                      By placing your order, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>
                      .
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t">
                    <h3 className="font-semibold text-xs sm:text-sm mb-1.5 text-gray-700">
                      We Accept
                    </h3>
                    <div className="flex space-x-1.5 sm:space-x-2 flex-wrap gap-y-1">
                      {" "}
                      {/* Added flex-wrap and gap-y for payment icons */}
                      {["Visa", "MC", "Amex", "PayPal", "GPay"].map(
                        (
                          method // Added GPay for wrapping example
                        ) => (
                          <div
                            key={method}
                            className="bg-gray-100 border border-gray-300 rounded w-10 h-6 sm:w-12 sm:h-7 flex items-center justify-center text-gray-500 text-[10px] sm:text-xs"
                          >
                            {method}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#4A4A48] text-white py-8 sm:py-10 mt-10 sm:mt-12">
        {/* ... (your existing footer JSX) ... */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-playfair text-lg sm:text-xl font-bold mb-3">
                Navaa.store
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Premium quality fashion for the modern individual.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3">Shop</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3">Help</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping & Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3">
                Newsletter
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-2.5">
                Subscribe for updates and exclusive offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-2.5 py-1.5 rounded-l-md text-xs sm:text-sm w-full text-gray-800 focus:ring-primary focus:border-primary border-gray-300"
                  aria-label="Email for newsletter"
                />
                <button className="bg-primary text-white px-3 py-1.5 rounded-r-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-5 sm:pt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Navaa.store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
