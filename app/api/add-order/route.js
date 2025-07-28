// app/api/add-order/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server/firebase/firebase";
import admin from "firebase-admin";

function generateSecureCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { cart, Address } = body;
    console.log(cart, Address);
    // if (!userId || typeof amount !== "number" || !trackingId) {
    //   return NextResponse.json(
    //     { error: "userId, amount (number), and trackingId are required" },
    //     { status: 400 }
    //   );
    // }
    cart.forEach((element) => {
      const newOrder = {
        orderId: db.collection("_").doc().id, // auto-generated ID
        ProductName: element.name,
        Price: element.price,
        secureCode: generateSecureCode(),
      };
      db.collection("Users")
        .doc("hs947518@gmail.com")
        .update({
          Orders: admin.firestore.FieldValue.arrayUnion(newOrder),
        });
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err) {
      console.error("Error in add-order route:", err.message);
    } else {
      console.error("Unknown error in add-order route:", err);
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
