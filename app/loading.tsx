// components/Loading.tsx
"use client";

import { FiLoader } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral">
      <FiLoader className="text-primary text-6xl animate-spin mb-6" />
      <h1 className="font-playfair text-4xl font-bold text-dark tracking-wider">
        Ada
      </h1>
    </div>
  );
}
