// components/KurtiGrid.tsx
"use client";

import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useState } from "react";
import kurtii from "@/app/(Images)/kurti.png";

type Kurti = {
  id: number;
  name: string;
  price: string;
};

export default function KurtiGrid() {
  // Sample kurtis; replace with API or props
  const [kurtis] = useState<Kurti[]>([
    { id: 1, name: "Floral Print Kurti", price: "₹1,499" },
    { id: 2, name: "Embroidered Silk Kurti", price: "₹1,799" },
    { id: 3, name: "Boho Cotton Kurti", price: "₹1,299" },
    { id: 4, name: "Chikankari Kurti", price: "₹1,899" },
    { id: 5, name: "Geometric Print Kurti", price: "₹1,349" },
    { id: 6, name: "Tie-Dye Kurti", price: "₹1,599" },
    { id: 7, name: "Paisley A-Line Kurti", price: "₹1,699" },
    { id: 8, name: "Block Print Kurti", price: "₹1,399" },
  ]);

  const handleAddToCart = (id: number) => {
    console.log(`Add to cart: ${id}`);
  };
  const handleWishlist = (id: number) => {
    console.log(`Wishlist: ${id}`);
  };

  return (
    <section className="py-12 bg-neutral">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-playfair text-3xl font-bold text-dark mb-8 text-center">
          Explore Our Kurtis
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {kurtis.map((k, idx) => (
            <div
              key={k.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 group
                ${idx % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              <img
                src={kurtii.src}
                alt={k.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <h3 className="font-poppins text-white text-lg font-semibold">
                  {k.name}
                </h3>
                <p className="font-poppins text-primary text-md mb-2">
                  {k.price}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(k.id)}
                    className="bg-primary bg-opacity-90 hover:bg-opacity-100 text-white p-2 rounded-full"
                  >
                    <FiShoppingCart />
                  </button>
                  <button
                    onClick={() => handleWishlist(k.id)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-red-500 p-2 rounded-full"
                  >
                    <FiHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
