// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/server/firebase/firebase";
// import { Product } from "./types";

// export async function addProduct() {
//   // Fixed: Removed array brackets since we're creating a single product
//   const productData: Product = {
//     id: 1,
//     rating: 4.5,
//     reviews: 328,
//     name: "Premium Cotton T-Shirt",
//     price: 29.99,
//     originalPrice: 39.99,
//     discountPercentage: 25,
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjyse60rqydt7natt6a8.png?alt=media&token=b8425d3b-06bc-4ed2-868a-e6f6d43babf9",
//       "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjytfs58a7qdy60taxcz.png?alt=media&token=f96e602f-1d0d-4852-8989-9e32702e4b66",
//       "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjyvf3r8z67kmt19t9wh.png?alt=media&token=33211ab3-0c98-4b9e-af02-03fb30b68f65",
//       "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/20250519_1111_Luxurious%20Handbag%20Showcase_simple_compose_01jvkgwjyvf3r8z67kmt19t9wh.png?alt=media&token=33211ab3-0c98-4b9e-af02-03fb30b68f65",
//     ],
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["White", "Black", "Navy"],
//     description:
//       "Soft premium cotton t-shirt with crew neck and short sleeves.",
//     careInstructions: "Machine wash cold with similar colors. Tumble dry low.",
//     fabric: "100% Organic Cotton",
//     shippingInfo: "Free shipping on orders over 599.00",
//     returnPolicy: "30-day hassle-free returns",
//     details: [
//       "Breathable cotton fabric",
//       "Regular fit",
//       "Double-needle stitching",
//     ],
//     brand: "EcoWear",
//     category: "Apparel",
//     sku: "EW-TS001",
//     stock: 150,
//     seo: {
//       title: "Premium Cotton T-Shirt | EcoWear",
//       description:
//         "Shop our premium organic cotton t-shirt for ultimate comfort and style.",
//     },
//   };

//   try {
//     // Create a document reference with custom ID (using product ID)
//     const productRef = doc(db, "Products", productData.id.toString());

//     // Use setDoc instead of addDoc to control document ID
//     await setDoc(productRef, {
//       ...productData,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//       published: true,
//     });

//     console.log("Product added with ID: ", productRef.id);
//     return productRef.id;
//   } catch (error) {
//     console.error("Error adding product: ", error);
//     throw error;
//   }
// }
