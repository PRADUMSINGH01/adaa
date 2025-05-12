// types.ts
export interface CartItem {
  id: string; // Unique item ID
  productId: number;
  name: string;
  price: number;
  image: string[];
  color: string;
  size: string;
  quantity: number;
  addedAt: number; // Timestamp
}

export interface Product {
  id: number; // Unique item ID
  rating: number;
  reviews: number;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  careInstructions?: string;
  fabric?: string;
  shippingInfo?: string;
  returnPolicy?: string;
  details: string[];
}
