// components/TrendingProducts.tsx
"use client";
import { useGetProductsQuery } from "../store/services/productsApi";
import { ProductCard } from "./ProductCard";
import { CarouselWrapper } from "./CarouselWrapper";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
  tablet: { breakpoint: { max: 1199, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
};

export const TrendingProducts = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();

  return (
    <section className="p-8">
      <h2 className="animate-pulse text-2xl font-bold mb-4">
        Trending Products
      </h2>
      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Failed to load products</p>}
      {!isLoading && !error && (
        <CarouselWrapper responsive={responsive}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} name={product.title} />
          ))}
        </CarouselWrapper>
      )}
    </section>
  );
};
