import React from 'react';

interface Product {
  id: number;
  imageUrl: string;
  productUrl: string;
  altText: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductImageGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length !== 8) {
    console.warn('Component expects exactly 8 products');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <a 
            key={product.id}
            href={product.productUrl}
            className="block group transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none"
            aria-label={`View ${product.altText}`}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
              <img
                src={product.imageUrl}
                alt={product.altText}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                loading="lazy"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGrid;