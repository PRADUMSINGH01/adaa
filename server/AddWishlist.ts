import { db } from "./firebase/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function addToWishlist(
  userId: string = "NMONine4nmyeTgSnDyoS",
  product: { id: string; [key: string]: any } = { id: "one", brand: "heheheh" }
): Promise<void> {
  if (!userId) throw new Error("addToWishlist: userId is required");
  if (!product?.id) throw new Error("addToWishlist: product.id is required");

  const userRef = db.collection("Users").doc(userId);

  // 1. Fetch current wishlist
  const snap = await userRef.get();
  const data = snap.exists ? snap.data() : {};
  const wishlist: Array<{ id: string }> = Array.isArray(data?.wishlist)
    ? data.wishlist
    : [];

  // 2. Check for duplicate
  if (wishlist.some((item) => item.id === product.id)) {
    throw new Error(`Product with id="${product.id}" is already in wishlist`);
  }

  // 3. Add to wishlist
  // If doc already existed, use update(); otherwise set with merge
  if (snap.exists) {
    await userRef.update({
      wishlist: FieldValue.arrayUnion(product),
    });
  } else {
    await userRef.set(
      {
        wishlist: [product],
      },
      { merge: true }
    );
  }
}
