import { wishlist } from "./types";
async function addToWishlist(product: wishlist) {
  try {
    const response = await fetch("/api/AddwishList/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      return { success: false, msg: "Product not added " };
    }

    return { success: true, msg: "Product added " };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, msg: "Product not added " };
  }
}
export default addToWishlist;
