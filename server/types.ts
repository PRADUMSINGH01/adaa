// types.ts
import { StaticImageData } from "next/image";
export interface CartItem {
  id: string; // Product ID
}
export interface wishlist {
  id: number; // Unique item ID
  name: string;
  price: string;
  images: string[];
}

export interface Address {
  name: string;
  Number: number;
  Address: string;
  city: string;

  landmark: string;

  pincode: number;
}

export interface Product {
  id: string; // Unique item ID
  rating: number;
  reviews: number;
  name: string;
  price: number;
  originalPrice: number;
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
  isNew?: boolean;
  isTrending?: boolean;
}

export interface Kurti {
  id: number;
  name: string;
  price: string;
  originalPrice?: string; // For showing a slash-through price on sale items
  image: StaticImageData | string; // Allow string for external URLs too if needed
  isNew?: boolean;
  onSale?: boolean;
  brand?: string; // Added brand for more detail
  rating?: number; // Added rating
  colorsAvailable?: string[]; // Example: ['Red', 'Blue', 'Green']
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

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    // Add more fields if needed
  }
}
