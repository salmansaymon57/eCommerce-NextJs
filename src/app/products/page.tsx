// app/products/page.tsx
"use client";
import { useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { Input } from "../../../components/Input";
import { ProductCard } from "../../../components/ProductCard";
import Drawer from "react-modern-drawer";
import { Button } from "../../../components/Button";

const mockProducts = [
  {
    id: "1",
    image: "../../../public/file.svg",
    name: "Nike Air Zoom",
    price: 120,
    rating: 4.6,
    isSale: true,
  },
  { id: "2", image: "/img2.jpg", name: "Smartphone", price: 699, rating: 4.8 },
];

export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8 flex">
        <aside className="hidden md:block w-64 mr-4">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <h4>Brand</h4>
            <Input type="checkbox" name="Nike" />
            <Input type="checkbox" name="Adidas" />
          </div>
          <div className="mb-4">
            <h4>Price Range</h4>
            <input type="range" min="0" max="1000" className="w-full" />
          </div>
          <div className="mb-4">
            <h4>Color</h4>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-black rounded-full"></div>
              <div className="w-6 h-6 bg-white border rounded-full"></div>
            </div>
          </div>
        </aside>
        <div className="flex-grow">
          <div className="flex justify-between mb-4">
            <Input
              type="select"
              name="sort"
              options={[
                "Price Low to High",
                "Price High to Low",
                "Best Selling",
              ]}
            />
            <Button onClick={() => setIsFilterOpen(true)}>Filters</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <Button variant="secondary">Prev</Button>
            <Button variant="primary">1</Button>
            <Button variant="secondary">Next</Button>
          </div>
        </div>
      </main>
      <Footer />
      <Drawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        direction="left"
      >
        <div className="p-4">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <h4>Brand</h4>
            <Input type="checkbox" name="Nike" />
            <Input type="checkbox" name="Adidas" />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
