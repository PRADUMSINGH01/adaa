// src/lib/cart-utils.ts
// Define CartItem interface if not already defined elsewhere
interface CartItem {
  // Example properties, adjust as needed
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartOperationResult {
    success: boolean;
    error?: string;
    cart?: CartItem[];
  }


  const CART_KEY = 'cart';

  export class CartError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'CartError';
    }
  }
  
  const getSafeLocalStorage = (): Storage | null => {
    try {
      return typeof window !== 'undefined' ? window.localStorage : null;
    } catch (error) {
      console.error('LocalStorage access denied:', error);
      return null;
    }
  };
  
  const handleLocalStorageError = (error: unknown, operation: string): CartOperationResult => {
    console.error(`Cart ${operation} error:`, error);
    
    if (error instanceof CartError) {
      return { success: false, error: error.message };
    }
    
    if (error instanceof Error) {
      return { success: false, error: `Failed to ${operation} cart items` };
    }
    
    return { success: false, error: 'An unknown error occurred' };
  };
  
  export const getCart = (): CartOperationResult => {
    const storage = getSafeLocalStorage();
    if (!storage) return { success: false, error: 'LocalStorage not available' };
  
    try {
      const cartData = storage.getItem(CART_KEY);
      return { 
        success: true,
        cart: cartData ? JSON.parse(cartData) : []
      };
    } catch (error) {
      return handleLocalStorageError(error, 'retrieve');
    }
  };
  