// // pages/api/products/add.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { Product } from "@/server/types"; // Import your Product type
// import { db } from "@/server/firebase/firebase";

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const productData: Product = {
//       id: "F0005",
//       name: "Cotton pure Anarkali  Suit Set ",
//       rating: 4.5,
//       reviews: 0,
//       price: 1799,
//       originalPrice: 2499,
//       discountPercentage: 40,
//       images: [
//         "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-08%20at%206.25.52%20PM.jpeg?alt=media&token=35da323d-7c5f-4050-bd87-a31be19cf344",
//         "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-08%20at%206.25.55%20PM.jpeg?alt=media&token=d5e4523a-8c73-4e4a-8e83-df39550f92f4",
//         "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-08%20at%206.25.53%20PM.jpeg?alt=media&token=a20a227e-0453-42eb-a74a-0168a575d006",
//         "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/WhatsApp%20Image%202025-05-08%20at%206.25.52%20PM.jpeg?alt=media&token=35da323d-7c5f-4050-bd87-a31be19cf344",
//       ],
//       sizes: ["S", "M", "L", "XL", "XXL"],
//       colors: [""],
//       fabric: "100% Premium Cotton",
//       description:
//         "Add timeless elegance to your ethnic collection with this beautifully flared Anarkali Suit Set crafted in soft cotton. Featuring delicate detailing and a graceful silhouette, this set offers comfort and charm in equal measure. It is perfect for festive occasions, casual gatherings, or everyday sophistication.",
//       careInstructions:
//         "Gentle cold hand wash separately. Do not bleach. Line dry in shade. Warm iron on reverse side.",
//       shippingInfo:
//         "Free shipping on orders over ₹999. Ships within 2–4 business days.",
//       returnPolicy:
//         "Easy 7-day return & exchange — garment must be unworn with original tags attached.",
//       details: [
//         "Anarkali silhouette with pintuck detailing at yoke",
//         "Includes printed chiffon dupatta",
//         "Elasticated waistband palazzo pants",
//         "Round neckline with 3/4th sleeves",
//         "All-over Pink floral block print",
//       ],
//       brand: "Adaa",
//       category: "Women’s Ethnic Wear",
//       sku: "F0005-2025",
//       stock: 50,
//       seo: {
//         title: "Zengy Floral Anarkali Kurti & Palazzo Set – Mustard & Magenta",
//         description:
//           "Shop the Zengy Floral Block-Print Anarkali Kurti and Palazzo Set in Mustard Yellow and Magenta Pink. 100% cotton, soft dupatta, perfect for Indian festive wear.",
//         keywords: [
//           "block print kurti set",
//           "cotton anarkali kurti",
//           "ethnic palazzo set",
//           "Zengy kurtis",
//           "festive wear women",
//         ],
//       },
//     };
//     // Basic validation
//     if (!productData.id || !productData.name || !productData.price) {
//       return res.status(400).json({
//         error: "Missing required fields: id, name, or price",
//       });
//     }

//     // Create document reference with custom ID
//     const productRef = db.collection("Products").doc(productData.id.toString());

//     // Add to Firestore with timestamps
//     await productRef.set({
//       ...productData,
//     });

//     return {
//       success: true,
//       id: productRef.id,
//       message: "Product added successfully",
//     };
//   } catch (error: any) {
//     console.error("Error adding product:", error);
//     return {
//       error: "Failed to add product",
//       details: error.message,
//     };
//   }
// }

export async function GET() {
  return;
}
