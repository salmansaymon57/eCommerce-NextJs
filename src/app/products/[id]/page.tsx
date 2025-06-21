// app/products/[id]/page.tsx
"use client";
// import { useState } from "react";
import { Navbar } from "../../../../components/Navbar";
import { Footer } from "../../../../components/Footer";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import Carousel from "react-multi-carousel";
import { ProductCard } from "../../../../components/ProductCard";
import { FaStar } from "react-icons/fa";

const mockProduct = {
  id: "1",
  image: "/img1.jpg",
  name: "Nike Air Zoom",
  price: 120,
  discountPrice: 90,
  rating: 4.6,
  variants: [
    { size: "M", color: "Black", stock: 10 },
    { size: "L", color: "White", stock: 0 },
  ],
};

const mockRelated = [
  { id: "2", image: "/img2.jpg", name: "Smartphone", price: 699, rating: 4.8 },
];

export default function ProductDetail() {
  //   const [selectedImage, setSelectedImage] = useState(mockProduct.image);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
    tablet: { breakpoint: { max: 1199, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-8 md:flex">
        <div className="md:w-1/2">
          {/* <img
            src={selectedImage}
            alt={mockProduct.name}
            className="w-full h-96 object-cover"
          /> */}
          <div className="flex space-x-2 mt-2">
            {/* <img
              src="/img1.jpg"
              alt="thumbnail"
              className="w-16 h-16 object-cover cursor-pointer"
              onClick={() => setSelectedImage("/img1.jpg")}
            /> */}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold">{mockProduct.name}</h1>
          <div className="flex items-center my-2">
            <FaStar className="text-yellow-500" />{" "}
            <span>({mockProduct.rating})</span>
          </div>
          <div className="text-lg">
            <span className="font-bold">${mockProduct.discountPrice}</span>
            <span className="line-through text-gray-500 ml-2">
              ${mockProduct.price}
            </span>
          </div>
          <div className="my-4">
            <h4>Size</h4>
            <div className="flex space-x-2">
              {mockProduct.variants.map((v) => (
                <Button
                  key={v.size}
                  variant="secondary"
                  disabled={v.stock === 0}
                >
                  {v.size}
                </Button>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h4>Color</h4>
            <div className="flex space-x-2">
              {mockProduct.variants.map((v) => (
                <div
                  key={v.color}
                  className={`w-6 h-6 rounded-full bg-${v.color.toLowerCase()}-500`}
                ></div>
              ))}
            </div>
          </div>
          <Input type="text" name="quantity" />
          <div className="flex space-x-2 my-4">
            <Button variant="primary">Add to Cart</Button>
            <Button icon="wishlist" />
          </div>
          <div className="my-4">
            <h4>Delivery Info</h4>
            <Input type="text" name="zip" />
          </div>
          <div className="my-4">
            <h4>Product Description</h4>
            <p>Running shoes with responsive cushioning.</p>
          </div>
          <div className="my-4">
            <h4>Reviews</h4>
            <div className="border p-4">
              <p>
                User: Great shoes! <FaStar className="text-yellow-500" /> 5
              </p>
            </div>
          </div>
        </div>
      </main>
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4">Related Items</h2>
        <Carousel responsive={responsive}>
          {mockRelated.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Carousel>
      </section>
      <Footer />
    </div>
  );
}
