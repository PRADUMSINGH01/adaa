// src/components/AddressSelector.tsx
"use client";
import React, { useState } from "react";
import { FiMapPin, FiCheck } from "react-icons/fi";

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

interface AddressSelectorProps {
  addresses: Address[];
  onSelect: (address: Address) => void;

  onSetDefault: (id: string) => void;
  selectedAddressId?: string;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  onSelect,

  onSetDefault,
  selectedAddressId,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 relative transition-all duration-200 cursor-pointer hover:border-primary hover:shadow-sm ${
              selectedAddressId === address.id
                ? "border-primary border-2 bg-primary/5"
                : "border-gray-300"
            }`}
            onClick={() => onSelect(address)}
          >
            {address.isDefault && (
              <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Default
              </span>
            )}

            <div className="flex items-start mb-2">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FiMapPin className="text-primary text-lg" />
              </div>
              <div>
                <h3 className="font-semibold">{address.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                <p className="text-gray-600 text-sm">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-gray-600 text-sm">{address.country}</p>
                <p className="text-gray-600 text-sm mt-1">
                  Phone: {address.phone}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-3 gap-2">
              {!address.isDefault && (
                <>
                  <button
                    className="text-gray-500 hover:text-green-600 transition-colors p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetDefault(address.id);
                    }}
                    aria-label="Set as default"
                  >
                    <FiCheck size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSelector;
