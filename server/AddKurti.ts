// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/server/firebase/firebase";

// export async function addProduct() {
//   const productData = [
//     {
//       productId: "kurti_001",
//       sku: "KURT-COT-FLRL",
//       name: "Cotton Floral Printed A-Line Kurti",
//       description:
//         "Comfortable pure cotton kurti with floral print, round neck, and short sleeves. Perfect for daily wear.",
//       price: 799.0,
//       salePrice: 599.0,
//       images: [
//         "https://picsum.photos/400/600?image=1001",
//         "https://picsum.photos/400/600?image=1002",
//       ],
//       categoryIds: ["cat_ethnic", "cat_casual"],
//       stockCount: 150,
//       attributes: {
//         fabric: "100% Cotton",
//         sleeveLength: "Short",
//         pattern: "Floral Print",
//         occasion: "Casual/Daily Wear",
//         sizes: ["S", "M", "L", "XL"],
//         colors: ["Sky Blue", "Mustard Yellow", "Rose Pink"],
//         careInstructions: "Machine wash cold, dry in shade",
//       },
//       ratings: {
//         average: 4.5,
//         count: 234,
//       },
//       createdAt: "2024-03-15T09:00:00Z",
//       updatedAt: "2024-05-20T14:30:00Z",
//       published: true,
//     },
//     {
//       productId: "kurti_002",
//       sku: "KURT-SILK-EMBR",
//       name: "Silk Embroidered Anarkali Kurti",
//       description:
//         "Festive silk kurti with zari embroidery, full sleeves, and flowing Anarkali silhouette",
//       price: 2499.0,
//       salePrice: 1999.0,
//       images: [
//         "https://picsum.photos/400/600?image=1003",
//         "https://picsum.photos/400/600?image=1004",
//       ],
//       categoryIds: ["cat_ethnic", "cat_festive"],
//       stockCount: 75,
//       attributes: {
//         fabric: "Pure Silk",
//         sleeveLength: "Full",
//         pattern: "Zari Embroidery",
//         occasion: "Wedding/Festive",
//         sizes: ["M", "L", "XL"],
//         colors: ["Maroon", "Royal Blue"],
//         dupatta: "Includes matching organza dupatta",
//       },
//       ratings: {
//         average: 4.7,
//         count: 189,
//       },
//       createdAt: "2024-04-10T10:15:00Z",
//       updatedAt: "2024-05-18T16:45:00Z",
//       published: true,
//     },
//     {
//       productId: "kurti_003",
//       sku: "KURT-LIN-SLUB",
//       name: "Linen Straight Cut Kurti with Slub Texture",
//       description:
//         "Premium linen kurti with natural slub texture, V-neck, and 3/4 sleeves",
//       price: 1299.0,
//       salePrice: null,
//       images: [
//         "https://picsum.photos/400/600?image=1005",
//         "https://picsum.photos/400/600?image=1006",
//       ],
//       categoryIds: ["cat_casual", "cat_premium"],
//       stockCount: 200,
//       attributes: {
//         fabric: "Pure Linen",
//         sleeveLength: "3/4",
//         pattern: "Solid Color",
//         occasion: "Office/Casual",
//         sizes: ["S", "M", "L"],
//         colors: ["Beige", "Sage Green", "Terracotta"],
//       },
//       ratings: {
//         average: 4.6,
//         count: 156,
//       },
//       createdAt: "2024-02-22T08:00:00Z",
//       updatedAt: "2024-05-19T11:20:00Z",
//       published: true,
//     },
//     {
//       productId: "kurti_004",
//       sku: "KURT-GEO-DES",
//       name: "Designer Georgette Kurti Set",
//       description:
//         "Party wear georgette kurti with sequin work, palazzo pants, and matching dupatta",
//       price: 3499.0,
//       salePrice: 2999.0,
//       images: [
//         "https://picsum.photos/400/600?image=1007",
//         "https://picsum.photos/400/600?image=1008",
//       ],
//       categoryIds: ["cat_designer", "cat_party"],
//       stockCount: 50,
//       attributes: {
//         fabric: "Georgette",
//         sleeveLength: "Cap Sleeves",
//         pattern: "Sequin Embroidery",
//         occasion: "Party Wear",
//         sizes: ["S", "M", "L"],
//         colors: ["Black", "Navy Blue"],
//         setIncludes: ["Kurti", "Palazzo", "Dupatta"],
//       },
//       ratings: {
//         average: 4.8,
//         count: 98,
//       },
//       createdAt: "2024-05-01T07:30:00Z",
//       updatedAt: "2024-05-21T09:15:00Z",
//       published: true,
//     },
//     {
//       productId: "kurti_005",
//       sku: "KURT-MAXI-PRINT",
//       name: "Rayon Printed Maxi Kurti",
//       description:
//         "Breezy full-length rayon kurti with digital print, side slits, and keyhole neck",
//       price: 899.0,
//       salePrice: 699.0,
//       images: [
//         "https://picsum.photos/400/600?image=1009",
//         "https://picsum.photos/400/600?image=1010",
//       ],
//       categoryIds: ["cat_casual"],
//       stockCount: 180,
//       attributes: {
//         fabric: "Rayon",
//         sleeveLength: "Sleeveless",
//         pattern: "Abstract Digital Print",
//         occasion: "Casual Outings",
//         sizes: ["M", "L", "XL"],
//         colors: ["Multicolor", "Indigo Blue"],
//       },
//       ratings: {
//         average: 4.4,
//         count: 204,
//       },
//       createdAt: "2024-01-14T12:00:00Z",
//       updatedAt: "2024-05-17T15:00:00Z",
//       published: true,
//     },
//   ];
//   try {
//     const docRef = await addDoc(collection(db, "Products"), {
//       ...productData,
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//       published: true,
//     });

//     console.log("Product added with ID: ", docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding product: ", error);
//     throw error;
//   }
// }
