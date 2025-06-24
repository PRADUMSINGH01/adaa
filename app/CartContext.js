"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart data", error);
        localStorage.removeItem("cart");
      }
    }
    setIsInitialized(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Add item to cart (with quantity merge)
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Destructure variant attributes from incoming product
      const { id, size, color, quantity: incomingQty } = product;
      const qtyToAdd = incomingQty || 1;

      // Find index of an existing cart item that matches id + size + color
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === id &&
          // If your cart items also store size/color, compare them:
          item.size === size &&
          item.color === color
      );

      if (existingIndex !== -1) {
        // Found an existing matching variant: increment quantity
        return prevCart.map((item, idx) => {
          if (idx === existingIndex) {
            return {
              ...item,
              quantity: (item.quantity || 0) + qtyToAdd,
            };
          }
          return item;
        });
      }

      // No matching variant found: add as a new entry
      return [
        ...prevCart,
        {
          ...product,
          // Ensure we store quantity explicitly
          quantity: qtyToAdd,
        },
      ];
    });
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Calculate total items
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        totalPrice,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
