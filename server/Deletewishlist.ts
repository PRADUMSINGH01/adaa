import { db } from "./firebase/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function removeFromWishlist(
  userId: string = "NMONine4nmyeTgSnDyoS",
  productId: string = "one"
): Promise<void> {
  if (!userId) throw new Error("removeFromWishlist: userId is required");
  if (!productId) throw new Error("removeFromWishlist: productId is required");

  const userRef = db.collection("Users").doc(userId);

  // 1. Fetch current wishlist
  const snap = await userRef.get();
  if (!snap.exists) {
    throw new Error(`User ${userId} not found`);
  }
  const data = snap.data()!;
  const wishlist: Array<{ id: string; [key: string]: any }> = Array.isArray(
    data.wishlist
  )
    ? data.wishlist
    : [];

  // 2. Check that the product exists
  const exists = wishlist.some((item) => item.id === productId);
  if (!exists) {
    throw new Error(`Product with id="${productId}" is not in wishlist`);
  }

  // 3. Filter it out
  const updatedList = wishlist.filter((item) => item.id !== productId);

  // 4. Write back (merge to preserve other fields)
  await userRef.set({ wishlist: updatedList }, { merge: true });
}
