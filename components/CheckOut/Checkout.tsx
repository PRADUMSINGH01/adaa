// components/Checkout.tsx
"use client";

import { useState } from "react";
import { FiMapPin, FiTruck, FiCreditCard } from "react-icons/fi";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Address = {
  id: number;
  label: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

export default function Checkout() {
  // Sample saved addresses; replace with data from your user auth/profile
  const addresses: Address[] = [
    {
      id: 1,
      label: "Home",
      addressLine: "123 Kurta Lane",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 98765 43210",
    },
    {
      id: 2,
      label: "Office",
      addressLine: "456 Fashion Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      phone: "+91 91234 56789",
    },
  ];

  const [selectedAddressId, setSelectedAddressId] = useState<number>(
    addresses[0].id
  );

  // Sample cart items; replace with your cart state or context
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Floral Cotton Kurti",
      price: 999,
      quantity: 1,
      image: "/images/kurti1.jpg",
    },
    {
      id: 2,
      name: "Silk Embroidered Kurti",
      price: 1299,
      quantity: 2,
      image: "/images/kurti2.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 100;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );
    // TODO: send cartItems + selectedAddress to backend & trigger payment flow
    alert(
      `Order placed!\nShip to: ${selectedAddress?.label}, ${selectedAddress?.addressLine}, ${selectedAddress?.city}`
    );
  };

  return (
    <div className="min-h-screen bg-neutral p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-light rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Address Selection */}
          <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-dark flex items-center gap-2">
              <FiMapPin className="text-primary" /> Select Shipping Address
            </h2>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-1 w-4 h-4"
                  />
                  <div>
                    <p className="font-poppins text-dark font-medium">
                      {addr.label}
                    </p>
                    <p className="text-secondary text-sm">
                      {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                      {addr.pincode}
                    </p>
                    <p className="text-secondary text-sm">{addr.phone}</p>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-poppins hover:bg-primary/90"
            >
              <FiCreditCard />
              Place Order & Pay Now
            </button>
          </form>

          {/* Order Summary */}
          <div className="w-full md:w-80 bg-white border-l p-6 space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-dark flex items-center gap-2">
              <FiTruck className="text-primary" /> Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-poppins font-medium text-dark">
                      {item.name}
                    </p>
                    <p className="text-secondary text-sm">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-poppins font-semibold text-dark">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between font-poppins text-secondary">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-poppins text-secondary">
                <span>Shipping</span>
                <span>₹{shippingFee}</span>
              </div>
              <div className="flex justify-between font-poppins text-dark text-lg font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
