/* eslint-disable @next/next/no-img-element */
// src/app/products/[id]/page.tsx
"use client";
import { useGetProductByIdQuery } from "../../../../store/services/productsApi";
import { ReduxProviderWrapper } from "../../../../components/ReduxProviderWrapper";
import { useParams } from "next/navigation";
import { Navbar } from "../../../../components/Navbar";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  return (
    <ReduxProviderWrapper>
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        {isLoading && <p>Loading product details...</p>}
        {error && (
          <p className="text-red-500">Failed to load product details</p>
        )}
        {!isLoading && !error && product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-2xl font-semibold mb-2">
                ${product.discountPrice || product.price}
                {product.discountPrice && (
                  <span className="text-gray-500 line-through ml-2">
                    ${product.price}
                  </span>
                )}
              </p>
              <p className="text-yellow-500 mb-2">
                Rating: {product.rating} / 5
              </p>
              <p className="mb-4">{product.description}</p>
              <h3 className="text-xl font-semibold mb-2">Variants:</h3>
              <ul className="list-disc pl-5 mb-4">
                {product.variants.map((variant, index) => (
                  <li key={index}>
                    Size: {variant.size}, Color: {variant.color}, Stock:{" "}
                    {variant.stock}
                  </li>
                ))}
              </ul>
              {product.isSale && <p className="text-green-600">On Sale!</p>}
              {product.isNew && <p className="text-blue-600">New Arrival!</p>}
            </div>
          </div>
        )}
        {!isLoading && !error && !product && (
          <p className="text-red-500">Product not found</p>
        )}
      </div>
    </ReduxProviderWrapper>
  );
}
