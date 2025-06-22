/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaCartArrowDown as Cart } from "react-icons/fa";

import "react-modern-drawer/dist/index.css";

export const Navbar = () => {
  const cartItems = useSelector((state: any) => state.cart.items); // Adjust type based on your RootState
  const totalCartCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 bg-white shadow-md z-10 p-4 flex justify-between items-center">
      <Link href="/" className="animate-bounce text-2xl font-bold">
        Logo
      </Link>
      <div className="hidden font-bold md:flex space-x-50">
        <div className=" relative group">
          <button className="hover:text-blue-600">Categories</button>
          <div className="absolute hidden group-hover:block bg-white shadow-lg p-4">
            <Link
              href="/products?category=Footwear"
              className="block py-1 hover:text-blue-600"
            >
              Footwear
            </Link>
            <Link
              href="/products?category=clothing"
              className="block py-1 hover:text-blue-600"
            >
              Clothing
            </Link>
          </div>
        </div>
        <Link href="/products" className=" hover:text-blue-600">
          Products
        </Link>
        <Link href="/cart" className="hover:text-blue-600">
          Cart
        </Link>
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Link href="/cart" className="flex items-center">
            <Cart size={30} />
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center -mt-2 -mr-2">
                {totalCartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
