// components/ProductCard.tsx
"use client";
import { FaStar } from "react-icons/fa";
import { Button } from "./Button";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  isSale?: boolean;
  isNew?: boolean;
};

export const ProductCard = ({
  id,
  name,
  price,
  discountPrice,
  rating,
  isSale,
  isNew,
}: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      {/* <img src={image} alt={name} className="w-full h-48 object-cover mb-2" /> */}
      {isSale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs">
          Sale
        </span>
      )}
      {isNew && (
        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs">
          New
        </span>
      )}
      <Link href={`/products/${id}`}>
        <h3 className="text-lg font-semibold">{name}</h3>
      </Link>

      <div className="flex items-center my-1">
        <span className="text-yellow-500 flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </span>
        <span className="ml-2 text-sm">({rating})</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold">${discountPrice || price}</span>
          {discountPrice && (
            <span className="line-through text-gray-500 ml-2">${price}</span>
          )}
        </div>
        <Button icon="wishlist" />
      </div>
      <Button
        variant="primary"
        onClick={() => console.log(`Add ${id} to cart`)}
      >
        Add to Cart
      </Button>
    </div>
  );
};
