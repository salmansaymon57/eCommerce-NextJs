// components/ProductCard.tsx
"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Button } from "./Button";

type ProductCardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  isSale?: boolean;
  isNew?: boolean;
  category?: string;
  variants?: { size: string; color: string; stock: number }[];
};

export const ProductCard = ({
  id,
  image,
  name,
  price,
  discountPrice,
  isSale,
  isNew,
  category,
  variants,
}: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        image,
        variant: variants?.[0]
          ? `${variants[0].size}/${variants[0].color}`
          : "Default",
        quantity: 1,
        price: discountPrice || price,
      })
    );
    console.log(`Added ${name} to cart`);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300">
      {isSale && (
        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
          Sale
        </span>
      )}
      {isNew && (
        <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
          New
        </span>
      )}
      <Link href={`/products/${id}`}>
        <div className="relative">
          <img
            src={image || "/placeholder.jpg"}
            alt={name}
            className="w-full h-50 object-cover rounded-lg mb-4"
          />
          {category && (
            <span className="absolute bottom-2 left-2 bg-gray-800 text-white px-2 py-1 text-xs rounded">
              {category}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>
      </Link>
      <div className="flex items-center mb-2"></div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xl font-semibold text-gray-900">
            ${discountPrice || price}
          </span>
          {discountPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${price}
            </span>
          )}
        </div>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
