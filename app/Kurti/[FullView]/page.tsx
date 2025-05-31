"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductDetailView from "@/components/FullView/ProductFullView";
import { Product } from "@/server/types";
import { FiLoader } from "react-icons/fi";

export default function KurtiDetailPage() {
  const params = useParams();
  const productId = params.FullView as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/ProductByID/${productId}`);

        const result = await response.json();
        console.log(result);
        setProduct(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // Render states
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light">
        <FiLoader className="animate-spin text-4xl text-primary" />
        <p className="mt-4 text-dark font-poppins text-lg">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light p-4">
        <div className="max-w-md text-center bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
            Product Unavailable
          </h2>
          <p className="text-dark font-poppins mb-6">
            {error ||
              "The product you're looking for doesn't exist or may have been removed."}
          </p>
          <a
            href="/kurti"
            className="px-6 py-3 bg-accent text-white rounded-full font-poppins hover:bg-[#7A8D5F] transition-colors"
          >
            Browse Kurtis Collection
          </a>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light p-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-playfair font-bold text-primary mb-4">
            Product Not Found
          </h2>
          <p className="text-dark font-poppins mb-6">
            We couldnt find the requested product in our collection.
          </p>
          <a
            href="/kurti"
            className="px-6 py-3 bg-primary text-white rounded-full font-poppins hover:bg-[#D2694F] transition-colors"
          >
            Return to Collection
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen">
      <ProductDetailView product={product} />
    </div>
  );
}
