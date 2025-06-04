import { Address } from "./types";
export async function Add_Address(Address: Address) {
  try {
    const response = await fetch("/api/Address/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Address),
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
