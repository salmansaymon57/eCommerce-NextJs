"use client";
import { useGetProductsQuery } from "../../../store/services/productsApi";
import { ProductCard } from "../../../components/ProductCard";
import { ReduxProviderWrapper } from "../../../components/ReduxProviderWrapper";
import { Navbar } from "../../../components/Navbar";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Child component to handle search params and product filtering
function ProductList() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const searchParams = useSearchParams();
  const category = searchParams?.get("category"); // Optional chaining for null safety

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Failed to load products</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} name={product.title} />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ReduxProviderWrapper>
      <div className="p-8">
        <Navbar />
        <h1 className="mt-4 text-3xl font-bold mb-6">All Products</h1>
        <Suspense fallback={<p>Loading search parameters...</p>}>
          <ProductList />
        </Suspense>
      </div>
    </ReduxProviderWrapper>
  );
}
