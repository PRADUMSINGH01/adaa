// types.ts
export interface CartItem {
  id: number; // Unique item ID
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
  fabric: string;
  shippingInfo?: string;
  returnPolicy?: string;
  details: string[];
  brand: string;
  category?: string;
  sku?: string;
  stock: number;
  seo?: object;
}
// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}
