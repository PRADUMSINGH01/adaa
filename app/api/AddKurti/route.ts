// pages/api/products/add.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/server/types"; // Import your Product type
import { db } from "@/server/firebase/firebase";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Product data is required" });
    }

    const productData: Product = {
      id: 2,
      name: "Floral Block-Print Anarkali Kurti & Palazzo Set",
      rating: 4.5,
      reviews: 0,
      price: 1899,
      originalPrice: 2499,
      discountPercentage: 24,
      images: [
        "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-27%20at%202.54.04%20PM.jpeg?alt=media&token=d91f9b80-fc8c-4a37-a997-1c5c141b9f68", // mustard front
        "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-27%20at%202.54.05%20PM.jpeg?alt=media&token=3e83c2e0-1a1a-4a37-ac17-86c4a19b4aa8", // mustard back/side
        "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-27%20at%202.54.06%20PM.jpeg?alt=media&token=ef56fc45-b488-4e96-b02b-df129d0cbe8d", // magenta front
        "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-27%20at%202.54.07%20PM.jpeg?alt=media&token=847c03c6-1cf6-48f9-a8bb-61328b7e503c", // magenta back/side
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Mustard Yellow", "Magenta Pink"],
      fabric: "100% Premium Cotton",
      description:
        "A flowy Anarkali kurti with all-over floral block prints, paired with matching palazzo pants and a soft cotton dupatta. Perfect for daytime festivities and casual gatherings.",
      careInstructions:
        "Gentle cold hand wash separately. Do not bleach. Line dry in shade. Warm iron on reverse side.",
      shippingInfo:
        "Free shipping on orders over ₹999. Ships within 2–4 business days.",
      returnPolicy:
        "Easy 7-day return & exchange — garment must be unworn with original tags attached.",
      details: [
        "Anarkali silhouette with pintuck detailing at yoke",
        "Includes printed chiffon dupatta",
        "Elasticated waistband palazzo pants",
        "Round neckline with 3/4th sleeves",
        "All-over white floral block print",
      ],
      brand: "Adaa",
      category: "Women’s Ethnic Wear",
      sku: "ZNGY-KRT-101",
      stock: 50,
      seo: {
        title: "Zengy Floral Anarkali Kurti & Palazzo Set – Mustard & Magenta",
        description:
          "Shop the Zengy Floral Block-Print Anarkali Kurti and Palazzo Set in Mustard Yellow and Magenta Pink. 100% cotton, soft dupatta, perfect for Indian festive wear.",
        keywords: [
          "block print kurti set",
          "cotton anarkali kurti",
          "ethnic palazzo set",
          "Zengy kurtis",
          "festive wear women",
        ],
      },
    };
    // Basic validation
    if (!productData.id || !productData.name || !productData.price) {
      return res.status(400).json({
        error: "Missing required fields: id, name, or price",
      });
    }

    // Create document reference with custom ID
    const productRef = db.collection("Products").doc(productData.id.toString());

    // Add to Firestore with timestamps
    await productRef.set({
      ...productData,
    });

    return res.status(201).json({
      success: true,
      id: productRef.id,
      message: "Product added successfully",
    });
  } catch (error: any) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      error: "Failed to add product",
      details: error.message,
    });
  }
}
