// types.ts
export interface CartItem {
    id: string; // Unique item ID
    productId: number;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    quantity: number;
    addedAt: number; // Timestamp
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    // ... other product properties
  }