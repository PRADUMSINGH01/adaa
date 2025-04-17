// components/NewArrivals.tsx
"use client";

import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useState } from "react";
import kurtiiImg from "@/app/(Images)/kurti.png";
export default function NewArrivals() {
  // Sample data; replace with API or props
  const [arrivals] = useState([
    {
      id: 1,
      name: "Pastel Floral Kurti",
      price: "₹1,799",
      image: "/images/new1.jpg",
    },
    {
      id: 2,
      name: "Embroidered Rayon Kurti",
      price: "₹1,999",
      image: "/images/new2.jpg",
    },
    {
      id: 3,
      name: "Boho Print Kurti",
      price: "₹1,599",
      image: "/images/new3.jpg",
    },
    {
      id: 4,
      name: "Solid A-line Kurti",
      price: "₹1,299",
      image: "/images/new4.jpg",
    },
    {
      id: 5,
      name: "Chikankari Cotton Kurti",
      price: "₹1,849",
      image: "/images/new5.jpg",
    },
    {
      id: 6,
      name: "Floral Midi Kurti",
      price: "₹2,099",
      image: "/images/new6.jpg",
    },
  ]);

  const handleAddToCart = (id: number) => {
    // TODO: add to cart logic
    console.log(`Add to cart: ${id}`);
  };

  const handleWishlist = (id: number) => {
    // TODO: add to wishlist logic
    console.log(`Add to wishlist: ${id}`);
  };

  return (
    <section className="py-12 bg-neutral">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl font-bold text-dark mb-8 text-center">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {arrivals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
            >
              <div className="relative">
                <img
                  src={kurtiiImg.src}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-2 left-2 bg-primary text-white px-2 py-1 text-xs font-poppins rounded">
                  New
                </span>
                <button
                  onClick={() => handleWishlist(item.id)}
                  className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiHeart />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-poppins text-lg font-medium text-dark">
                  {item.name}
                </h3>
                <p className="text-primary font-semibold font-poppins">
                  {item.price}
                </p>
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="w-full flex items-center justify-center gap-2 mt-3 bg-primary text-white px-4 py-2 rounded-lg font-poppins hover:bg-primary/90"
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
