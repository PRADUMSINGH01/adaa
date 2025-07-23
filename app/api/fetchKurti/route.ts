// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";

// GET: Fetch all products or single product
export async function GET() {
  try {
    // Get all products
    const snapshot = await db.collection("Products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// // POST: Create new product
// export async function POST(request: Request) {
//   try {
//     const productData: Product = await request.json();

//     // Add server timestamps
//     const newProduct = {
//       ...productData,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       published: false
//     };

//     const docRef = await db.collection('Products').add(newProduct);

//     return NextResponse.json(
//       { id: docRef.id, ...newProduct },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error creating product:', error);
//     return NextResponse.json(
//       { error: 'Failed to create product' },
//       { status: 500 }
//     );
//   }
// }

// // PUT: Update product
// export async function PUT(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
//     const updateData = await request.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Product ID required' },
//         { status: 400 }
//       );
//     }

//     const docRef = db.collection('Products').doc(id);
//     await docRef.update({
//       ...updateData,
//       updatedAt: new Date().toISOString()
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return NextResponse.json(
//       { error: 'Failed to update product' },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Remove product
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Product ID required' },
//         { status: 400 }
//       );
//     }

//     await db.collection('Products').doc(id).delete();
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete product' },
//       { status: 500 }
//     );
//   }
// }
