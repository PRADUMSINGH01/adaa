// src/app/Checkout/address/page.tsx
"use client";
import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";

// Sample address data
const initialAddresses = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "(555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe (Work)",
    address: "456 Business Ave",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    country: "United States",
    phone: "(555) 987-6543",
    isDefault: false,
  },
];

const AddressPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E6] font-poppins text-[#4A4A48]">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 font-playfair flex items-center">
            <FiMapPin className="mr-3 text-primary" />
            Shipping Address
          </h1>

          <>
            <p className="text-gray-600 mb-6">
              Select a delivery address or add a new one. Your order will be
              shipped to this address.
            </p>
          </>
        </div>
      </main>
    </div>
  );
};

// // AddressForm component (simplified for this example)
// const AddressForm = ({ address, onSave, onCancel }: any) => {
//   // Form implementation would go here
//   return (
//     <div className="bg-gray-50 p-6 rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">
//         {address ? "Edit Address" : "Add New Address"}
//       </h2>
//       <p className="text-gray-500 mb-6">Form would appear here...</p>
//       <div className="flex justify-end gap-3">
//         <button
//           onClick={onCancel}
//           className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() =>
//             onSave({
//               id: address?.id || "new",
//               name: "New Address",
//               // ...other fields
//             })
//           }
//           className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
//         >
//           Save Address
//         </button>
//       </div>
//     </div>
//   );
// };

export default AddressPage;
