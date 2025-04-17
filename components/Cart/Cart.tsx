// components/Cart.tsx
"use client";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Floral Cotton Kurti",
      price: 999,
      image: "/images/kurti1.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Silk Embroidered Kurti",
      price: 1299,
      image: "/images/kurti2.jpg",
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8 text-black">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="font-playfair text-3xl font-bold text-dark mb-6 flex items-center gap-2">
          <FiShoppingCart className="text-primary" />
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-secondary font-poppins">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-light p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-dark">
                      {item.name}
                    </h3>
                    <p className="text-primary font-poppins">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <h3 className="font-poppins text-xl font-semibold text-dark">
                Total: ₹{total}
              </h3>
              <Link
                href={"/Checkout"}
                className="bg-primary text-white px-6 py-2 rounded-lg font-poppins hover:bg-primary/90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
