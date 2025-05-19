import { db } from "./firebase/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { Product } from "@/server/types"; // Assuming Product interface is available in server/types

// Define the structure we expect in the database wishlist array
type WishlistItemInDB = number; // Store just the product ID as a number

export async function addToWishlist(
  userId: string,
  product: { id: Product["id"] } // We only need the id from the product object
): Promise<void> {
  // Basic validation
  if (!userId) {
    console.error("addToWishlist: userId is required");
    throw new Error("Authentication error: userId is required");
  }
  if (!product?.id) {
    console.error("addToWishlist: product.id is required");
    throw new Error("Invalid product data: product ID is missing");
  }

  const userRef = db.collection("Users").doc(userId);

  try {
    // Fetch the user document
    const snap = await userRef.get();
    const data = snap.exists ? snap.data() : {};

    // Get the current wishlist array, defaulting to empty array if it doesn't exist or is not an array
    // We expect the wishlist to be an array of numbers (product IDs)
    const wishlist: WishlistItemInDB[] = Array.isArray(data?.wishlist)
      ? (data.wishlist as WishlistItemInDB[]) // Cast to our expected type
      : [];

    // Check for duplicate using the product ID (number comparison)
    if (wishlist.some((itemId) => itemId === product.id)) {
      console.warn(
        `Product with id="${product.id}" is already in wishlist for user "${userId}"`
      );
      // Optionally throw an error or return early if duplicates are not allowed
      return; // Product is already there, do nothing
    }

    // Add ONLY the product ID to the wishlist array
    // FieldValue.arrayUnion is the correct way to add an item to an array field atomically
    await userRef.update({
      wishlist: FieldValue.arrayUnion(product.id),
    });

    console.log(
      `Product id="${product.id}" added to wishlist for user "${userId}"`
    );
  } catch (error) {
    console.error(
      `Error adding product id="${product.id}" to wishlist for user "${userId}":`,
      error
    );
    throw new Error(
      `Failed to add product to wishlist: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// --- Example usage (for testing/demonstration, remove in production) ---
// async function exampleUsage() {
//     const testUserId = "some_user_id"; // Replace with a real user ID
//     const testProduct = { id: 123, name: "Example Bag", ... }; // Use a Product object or just { id: number }

//     try {
//         await addToWishlist(testUserId, { id: testProduct.id });
//         console.log("addToWishlist successful (hopefully!)");
//     } catch (e) {
//         console.error("addToWishlist failed:", e);
//     }
// }

// exampleUsage();
