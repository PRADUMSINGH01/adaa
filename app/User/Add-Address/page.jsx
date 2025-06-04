"use client";
import React, { useState, useEffect } from "react";
import { Add_Address } from "@/server/AddAddress";
import { useRouter } from "next/navigation";

const AddressForm = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    Number: 0,
    Address: "",
    AddressName: "",
    city: "",
    landmark: "",
    pincode: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const res = await Add_Address(formData);
    if (res.success) {
      setShowAlert(true);
      if (window.history.length > 1) {
        router.back(); // Client-side navigation
      }
    } else {
      console.log("Address submitted:", res.msg);
    }

    setFormData({
      name: "",
      Number: 0,
      Address: "",
      AddressName: "",
      city: "",
      landmark: "",
      pincode: 0,
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F8F5F2" }}
    >
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
          <div
            className="flex items-center p-4 rounded-lg shadow-lg"
            style={{
              backgroundColor: "#8A9B6E",
              color: "#F8F5F2",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Address added successfully!</span>
          </div>
        </div>
      )}
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
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
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

            {/* <div className="space-y-1">
              <label
                className="block font-medium"
                style={{ color: "#4A4A48", fontFamily: "Poppins, sans-serif" }}
              >
                Address Name*
              </label>
              <input
                type="text"
                name="AddressName"
                value={formData.AddressName}
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
            </div> */}

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
              type="number"
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
              name="Address"
              value={formData.Address}
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
