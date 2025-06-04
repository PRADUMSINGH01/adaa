"use client";
import React, { useState } from "react";
import { Add_Address } from "@/server/AddAddress";
const AddressForm = () => {
  const [formData, setFormData] = useState({
    addressName: "",
    phone: "",
    pincode: "",
    address: "",
    landmark: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const res = Add_Address(formData);
    if (res.success) {
      console.log("Address submitted:", res.msg);
    } else {
      console.log("Address submitted:", res.msg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F8F5F2" }}
    >
      <div
        className="w-full max-w-2xl rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundColor: "#F5F0E6" }}
      >
        <div
          className="py-4 text-center"
          style={{ backgroundColor: "#E07A5F" }}
        >
          <h1
            className="text-2xl font-bold"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "#F8F5F2",
            }}
          >
            Add New Address
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address Name */}
            <div className="space-y-1">
              <label
                className="block font-medium"
                style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
              >
                Address Name*
              </label>
              <input
                type="text"
                name="addressName"
                value={formData.addressName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                style={{
                  backgroundColor: "#F8F5F2",
                  borderColor: "#D57A7A",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4A4A48",
                  "--tw-ring-color": "#8A9B6E",
                }}
                placeholder="e.g., Home, Office"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label
                className="block font-medium"
                style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
              >
                Phone*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                style={{
                  backgroundColor: "#F8F5F2",
                  borderColor: "#D57A7A",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4A4A48",
                  "--tw-ring-color": "#8A9B6E",
                }}
                placeholder="Mobile number"
              />
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-1">
            <label
              className="block font-medium"
              style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
            >
              Pincode*
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
              style={{
                backgroundColor: "#F8F5F2",
                borderColor: "#D57A7A",
                fontFamily: "Poppins, sans-serif",
                color: "#4A4A48",
                "--tw-ring-color": "#8A9B6E",
              }}
              placeholder="Postal code"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label
              className="block font-medium"
              style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
            >
              Address*
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
              style={{
                backgroundColor: "#F8F5F2",
                borderColor: "#D57A7A",
                fontFamily: "Poppins, sans-serif",
                color: "#4A4A48",
                "--tw-ring-color": "#8A9B6E",
              }}
              placeholder="Full address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Landmark */}
            <div className="space-y-1">
              <label
                className="block font-medium"
                style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
              >
                Landmark
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                style={{
                  backgroundColor: "#F8F5F2",
                  borderColor: "#D57A7A",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4A4A48",
                  "--tw-ring-color": "#8A9B6E",
                }}
                placeholder="Nearby location"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label
                className="block font-medium"
                style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
              >
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                style={{
                  backgroundColor: "#F8F5F2",
                  borderColor: "#D57A7A",
                  fontFamily: "Poppins, sans-serif",
                  color: "#4A4A48",
                  "--tw-ring-color": "#8A9B6E",
                }}
                placeholder="City name"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 font-bold rounded-lg transition duration-300"
              style={{
                backgroundColor: "#E07A5F",
                fontFamily: "Poppins, sans-serif",
                color: "#F8F5F2",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#D57A7A")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#E07A5F")}
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
