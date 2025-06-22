// components/Navbar.tsx
"use client";
// import { useState } from "react";
import Link from "next/link";

import { Button } from "./Button";

import "react-modern-drawer/dist/index.css";

export const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-10 p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Logo
      </Link>
      <div className="hidden md:flex space-x-4">
        <div className="relative group">
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
        <Link href="/products" className="hover:text-blue-600">
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
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md p-2 hidden md:block"
        />
        <Button icon="search" />
        <Button icon="wishlist" />
        <Button icon="cart"></Button>
      </div>
    </nav>
  );
};
