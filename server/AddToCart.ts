// cart-utils.ts
import { CartItem, Product } from "./types";

const CART_KEY = "cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (
  product: Product,
  selectedColor: string,
  selectedSize: string
): { success: boolean; error?: string } => {
  try {
    const cart = getCart();

    // Generate unique item ID based on product and options
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;

    // Check if item already exists in cart
    const existingItem = cart.find(
      (item) =>
        item.productId === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += 1;
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
        addedAt: Date.now(),
      };
      cart.push(newItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // Optional: Dispatch cart update event
    window.dispatchEvent(new Event("cart-updated"));

    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      error: "Failed to add item to cart. Please try again.",
    };
  }
};
export const updateCartItemQuantity = (
  itemId: string,
  newQuantity: number
): { success: boolean; error?: string } => {
  try {
    if (newQuantity < 1 || !Number.isInteger(newQuantity)) {
      return { success: false, error: "Invalid quantity" };
    }

    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return { success: false, error: "Item not found in cart" };
    }

    const updatedCart = cart.map((item, index) =>
      index === itemIndex ? { ...item, quantity: newQuantity } : item
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));

    return { success: true };
  } catch (error) {
    console.error("Error updating cart:", error);
    return {
      success: false,
      error: "Failed to update item quantity. Please try again.",
    };
  }
};

export const removeFromCart = (
  itemId: string
): { success: boolean; error?: string } => {
  try {
    const cart = getCart();
    const initialLength = cart.length;
    const updatedCart = cart.filter((item) => item.id !== itemId);

    if (updatedCart.length === initialLength) {
      return { success: false, error: "Item not found in cart" };
    }

    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));

    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      error: "Failed to remove item from cart. Please try again.",
    };
  }
};

export const clearCart = (): void => {
  try {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
