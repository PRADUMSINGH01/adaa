// types.ts
import { StaticImageData } from "next/image";

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
