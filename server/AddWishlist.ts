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
      throw new Error("Failed to add to wishlist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    window.location.href = "/Login";
  }
}
export default addToWishlist;
