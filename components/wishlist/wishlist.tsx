"use client";

import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { addToCart } from "@/server/AddToCart";
export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Floral Embroidered Kurti",
      price: 1499,
      image: "/",
      size: "M",
      color: "Red",
    },
    {
      id: 2,
      name: "Chikankari Cotton Kurti",
      price: 1299,
      image: "/",
      size: "L",
      color: "White",
    },
  ]);

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-light rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiHeart className="text-3xl text-primary" />
            <h2 className="font-playfair text-3xl font-bold text-dark">
              My Wishlist
            </h2>
          </div>

          {wishlist.length === 0 ? (
            <p className="font-poppins text-secondary">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}  
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-poppins font-medium text-dark text-lg">
                      {item.name}
                    </h3>
                    <p className="text-primary font-semibold">{item.price}</p>
                    <div className="flex gap-4 mt-3">
                      <button onClick={()=>addToCart(item,item.size,item.color)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-poppins text-sm">
                        <FiShoppingCart />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-poppins text-sm"
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
