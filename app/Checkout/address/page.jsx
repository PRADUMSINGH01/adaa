// src/app/Checkout/address/page.tsx
"use client";
import React, { useState } from "react";
import { FiMapPin, FiUser, FiPhone, FiHome } from "react-icons/fi";
import Link from "next/link";

const AddressPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    saveAddress: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] font-poppins text-[#4A4A48]">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 font-playfair">
            Shipping Address
          </h1>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex gap-4">
              <div className="relative flex-1">
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="relative flex-1">
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Street Address
              </label>
              <div className="relative">
                <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  placeholder="123 Main St"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Apartment, Suite, etc. (Optional)
              </label>
              <input
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                placeholder="Apt #456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select State</option>
                {/* Add state options here */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center mt-2">
              <input
                type="checkbox"
                name="saveAddress"
                checked={formData.saveAddress}
                onChange={handleChange}
                className="mr-2"
                id="saveAddress"
              />
              <label htmlFor="saveAddress" className="text-sm">
                Save this address for future purchases
              </label>
            </div>
          </form>

          <div className="mt-8 flex justify-between">
            <Link
              href="/Cart"
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Cart
            </Link>
            <Link
              href="/Checkout/payment"
              className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue to Payment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddressPage;
